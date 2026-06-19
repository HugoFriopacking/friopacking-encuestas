import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import encuestas from '../encuestas/index.js'
import { supabase } from '../lib/supabase.js'

const scaleColor = (val) => {
  if (val <= 2) return { bg: '#fef2f2', border: '#fca5a5', text: '#dc2626', active: '#dc2626' }
  if (val <= 4) return { bg: '#fff7ed', border: '#fdba74', text: '#ea580c', active: '#ea580c' }
  if (val === 5) return { bg: '#fefce8', border: '#fde047', text: '#ca8a04', active: '#ca8a04' }
  if (val <= 7) return { bg: '#f0fdf4', border: '#86efac', text: '#16a34a', active: '#16a34a' }
  return { bg: '#ecfdf5', border: '#6ee7b7', text: '#059669', active: '#059669' }
}

export default function Encuesta() {
  const { id } = useParams()
  const navigate = useNavigate()
  const encuesta = encuestas.find((e) => e.id === id)
  const [respuestas, setRespuestas] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  if (!encuesta) {
    return (
      <div style={s.page}>
        <div style={s.notFound}>
          <div style={s.notFoundIcon}>🔍</div>
          <h2 style={{ fontSize: 22, color: 'var(--navy)', marginBottom: 12, fontWeight: 900 }}>Evaluación no encontrada</h2>
          <button onClick={() => navigate('/')} style={s.btnSecondary}>← Volver al inicio</button>
        </div>
      </div>
    )
  }

  function handleChange(preguntaId, valor) {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: valor }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const faltantes = encuesta.preguntas.filter((p) => p.requerida && !respuestas[p.id])
    if (faltantes.length > 0) {
      setError(`Faltan ${faltantes.length} campo${faltantes.length > 1 ? 's' : ''} obligatorio${faltantes.length > 1 ? 's' : ''} por completar.`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setEnviando(true)
    try {
      const { error: sbError } = await supabase.from('respuestas').insert({
        encuesta_id: encuesta.id,
        encuesta_titulo: encuesta.titulo,
        respuestas,
        enviado_en: new Date().toISOString(),
      })
      if (sbError) throw sbError
      navigate('/gracias', { state: { titulo: encuesta.titulo } })
    } catch (err) {
      setError('Error al enviar. Intenta de nuevo.')
      console.error(err)
    } finally {
      setEnviando(false)
    }
  }

  const totalPreguntas = encuesta.preguntas.filter(p => p.tipo === 'escala').length
  const respondidas = encuesta.preguntas.filter(p => p.tipo === 'escala' && respuestas[p.id]).length
  const progreso = totalPreguntas > 0 ? Math.round((respondidas / totalPreguntas) * 100) : 0

  return (
    <div style={s.page}>
      {/* HEADER */}
      <header style={s.header}>
        <div style={s.headerInner}>
          <button onClick={() => navigate('/')} style={s.backBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Inicio
          </button>
          <img src="/logo-oscuro.png" alt="Grupo Friopacking" style={s.logo} />
        </div>

        {/* Progress bar */}
        {totalPreguntas > 0 && (
          <div style={s.progressWrap}>
            <div style={s.progressInner}>
              <div style={{ ...s.progressBar, width: `${progreso}%` }} />
            </div>
            <span style={s.progressLabel}>{respondidas}/{totalPreguntas} respondidas</span>
          </div>
        )}
      </header>

      <main style={s.main}>
        {/* Encabezado */}
        <div style={s.encuestaHeader}>
          <div style={s.encuestaHeaderLeft}>
            <div style={s.encuestaTag}>
              {encuesta.respondedor === 'interno' ? '👷 Personal interno' : '🏗 Contratistas'}
            </div>
            <h1 style={s.title}>{encuesta.titulo}</h1>
            <p style={s.desc}>{encuesta.descripcion}</p>
          </div>
          {encuesta.leyenda && (
            <div style={s.leyenda}>
              <div style={s.leyendaTitle}>Escala de calificación</div>
              <div style={s.leyendaItems}>
                <div style={s.leyendaItem}><span style={{ ...s.leyendaBadge, background: '#fee2e2', color: '#dc2626' }}>1</span> Muy malo</div>
                <div style={s.leyendaItem}><span style={{ ...s.leyendaBadge, background: '#fef9c3', color: '#ca8a04' }}>5</span> Regular</div>
                <div style={s.leyendaItem}><span style={{ ...s.leyendaBadge, background: '#d1fae5', color: '#059669' }}>10</span> Muy bueno</div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div style={s.errorMsg}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {encuesta.preguntas.map((pregunta, idx) => (
            <div key={pregunta.id} style={s.preguntaCard}>
              <div style={s.preguntaHeader}>
                <div style={s.preguntaNum}>{idx + 1}</div>
                <label style={s.preguntaLabel}>
                  {pregunta.texto}
                  {pregunta.requerida && <span style={s.requerida}> *</span>}
                </label>
              </div>

              {pregunta.tipo === 'texto' && (
                <input
                  type="text"
                  style={s.input}
                  value={respuestas[pregunta.id] || ''}
                  onChange={(e) => handleChange(pregunta.id, e.target.value)}
                  placeholder="Escribe aquí..."
                />
              )}

              {pregunta.tipo === 'escala' && (
                <div style={s.escalaWrap}>
                  <div style={s.escalaRow}>
                    {Array.from({ length: pregunta.max - pregunta.min + 1 }, (_, i) => i + pregunta.min).map((val) => {
                      const col = scaleColor(val)
                      const isActive = respuestas[pregunta.id] === val
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleChange(pregunta.id, val)}
                          style={{
                            ...s.escalaBtn,
                            borderColor: isActive ? col.active : col.border,
                            color: isActive ? 'white' : col.text,
                            background: isActive ? col.active : col.bg,
                            transform: isActive ? 'scale(1.15)' : 'scale(1)',
                            boxShadow: isActive ? `0 4px 12px ${col.active}55` : 'none',
                          }}
                        >
                          {val}
                        </button>
                      )
                    })}
                  </div>
                  <div style={s.escalaEtiquetas}>
                    <span>😞 {pregunta.etiquetas[pregunta.min]}</span>
                    <span>{pregunta.etiquetas[pregunta.max]} 😊</span>
                  </div>
                </div>
              )}

              {pregunta.tipo === 'opcion_multiple' && (
                <div style={s.opciones}>
                  {pregunta.opciones.map((op) => (
                    <label key={op} style={{
                      ...s.opcionLabel,
                      background: respuestas[pregunta.id] === op ? 'var(--teal-light)' : 'var(--gray-50)',
                      borderColor: respuestas[pregunta.id] === op ? 'var(--teal)' : 'var(--gray-300)',
                    }}>
                      <input type="radio" name={pregunta.id} value={op}
                        checked={respuestas[pregunta.id] === op}
                        onChange={() => handleChange(pregunta.id, op)}
                        style={{ accentColor: 'var(--teal)', width: 18, height: 18 }}
                      />
                      {op}
                    </label>
                  ))}
                </div>
              )}

              {pregunta.tipo === 'si_no' && (
                <div style={s.siNoWrap}>
                  {['Sí', 'No'].map((op) => (
                    <label key={op} style={{
                      ...s.siNoBtn,
                      background: respuestas[pregunta.id] === op ? 'var(--navy)' : 'white',
                      color: respuestas[pregunta.id] === op ? 'white' : 'var(--navy)',
                      borderColor: respuestas[pregunta.id] === op ? 'var(--navy)' : 'var(--gray-300)',
                    }}>
                      <input type="radio" name={pregunta.id} value={op}
                        checked={respuestas[pregunta.id] === op}
                        onChange={() => handleChange(pregunta.id, op)}
                        style={{ display: 'none' }}
                      />
                      {op}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button type="submit" disabled={enviando} style={{ ...s.btnSubmit, opacity: enviando ? 0.7 : 1 }}>
            {enviando ? (
              <>Enviando evaluación...</>
            ) : (
              <>
                Enviar evaluación
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: 'var(--gray-50)' },
  header: { background: 'var(--navy)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.2)' },
  headerInner: {
    maxWidth: 780, margin: '0 auto', padding: '14px 28px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  backBtn: {
    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
    color: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 800,
    fontFamily: 'Nunito, sans-serif', padding: '8px 14px', borderRadius: 8,
    display: 'flex', alignItems: 'center', gap: 6,
  },
  logo: { height: 38, objectFit: 'contain' },
  progressWrap: {
    maxWidth: 780, margin: '0 auto', padding: '0 28px 12px',
    display: 'flex', alignItems: 'center', gap: 12,
  },
  progressInner: {
    flex: 1, height: 5, background: 'rgba(255,255,255,0.15)',
    borderRadius: 3, overflow: 'hidden',
  },
  progressBar: {
    height: '100%', background: 'var(--teal)',
    borderRadius: 3, transition: 'width 0.3s ease',
  },
  progressLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 700, whiteSpace: 'nowrap' },

  main: { maxWidth: 780, margin: '0 auto', padding: '32px 28px 80px' },

  encuestaHeader: {
    background: 'white', borderRadius: 'var(--radius)', padding: '28px',
    marginBottom: 24, boxShadow: 'var(--shadow)',
    border: '1.5px solid var(--gray-100)',
    display: 'flex', flexDirection: 'column', gap: 20,
  },
  encuestaHeaderLeft: {},
  encuestaTag: {
    display: 'inline-block', background: 'var(--teal-light)', color: 'var(--teal-dark)',
    fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: 20,
    marginBottom: 12, letterSpacing: '0.04em',
  },
  title: { fontSize: 26, fontWeight: 900, color: 'var(--navy)', marginBottom: 8, lineHeight: 1.2 },
  desc: { color: 'var(--gray-500)', fontSize: 15, fontWeight: 600, lineHeight: 1.6 },
  leyenda: {
    background: 'var(--gray-50)', borderRadius: 10, padding: '16px 20px',
    border: '1.5px solid var(--gray-100)',
  },
  leyendaTitle: { fontSize: 12, fontWeight: 800, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 },
  leyendaItems: { display: 'flex', gap: 20, flexWrap: 'wrap' },
  leyendaItem: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: 'var(--gray-700)' },
  leyendaBadge: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 6, fontWeight: 900, fontSize: 13 },

  preguntaCard: {
    background: 'white', borderRadius: 'var(--radius)', padding: '24px 28px',
    marginBottom: 14, boxShadow: 'var(--shadow)',
    border: '1.5px solid var(--gray-100)',
  },
  preguntaHeader: { display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 18 },
  preguntaNum: {
    minWidth: 30, height: 30, background: 'var(--navy)', color: 'white',
    borderRadius: 8, fontSize: 13, fontWeight: 900,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  preguntaLabel: { fontWeight: 800, color: 'var(--gray-700)', fontSize: 16, lineHeight: 1.5, flex: 1 },
  requerida: { color: 'var(--teal-dark)', fontWeight: 900 },

  input: {
    width: '100%', border: '2px solid var(--gray-300)', borderRadius: 10,
    padding: '13px 16px', fontSize: 16, fontFamily: 'Nunito, sans-serif',
    outline: 'none', color: 'var(--gray-900)', fontWeight: 600,
    background: 'var(--gray-50)',
  },

  escalaWrap: {},
  escalaRow: { display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 10 },
  escalaBtn: {
    width: 50, height: 50, border: '2px solid',
    borderRadius: 10, cursor: 'pointer',
    fontSize: 16, fontWeight: 900, fontFamily: 'Nunito, sans-serif',
    transition: 'all 0.15s',
  },
  escalaEtiquetas: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: 12, color: 'var(--gray-500)', fontWeight: 700,
  },

  opciones: { display: 'flex', flexDirection: 'column', gap: 10 },
  opcionLabel: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '12px 16px', borderRadius: 10, border: '2px solid',
    cursor: 'pointer', fontSize: 15, fontWeight: 700, transition: 'all 0.15s',
  },

  siNoWrap: { display: 'flex', gap: 12 },
  siNoBtn: {
    flex: 1, padding: '14px', border: '2px solid', borderRadius: 10,
    cursor: 'pointer', fontSize: 16, fontWeight: 900, fontFamily: 'Nunito, sans-serif',
    textAlign: 'center', transition: 'all 0.15s',
  },

  errorMsg: {
    background: '#fef2f2', color: '#dc2626', border: '2px solid #fecaca',
    borderRadius: 10, padding: '14px 18px', fontSize: 15, marginBottom: 20,
    fontWeight: 700, display: 'flex', gap: 8, alignItems: 'center',
  },
  btnSubmit: {
    background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)',
    color: 'white', border: 'none', borderRadius: 12,
    padding: '17px 32px', fontSize: 17, fontWeight: 900,
    cursor: 'pointer', width: '100%', marginTop: 16,
    fontFamily: 'Nunito, sans-serif',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    boxShadow: '0 4px 16px rgba(27,45,107,0.3)',
  },
  btnSecondary: {
    background: 'none', border: '2px solid var(--gray-300)',
    borderRadius: 10, padding: '12px 24px', cursor: 'pointer',
    fontSize: 15, color: 'var(--gray-700)', fontWeight: 800,
    fontFamily: 'Nunito, sans-serif',
  },
  notFound: { textAlign: 'center', padding: '80px 24px' },
  notFoundIcon: { fontSize: 48, marginBottom: 16 },
}

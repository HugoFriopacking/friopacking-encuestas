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
          <h2 style={{ fontSize: 20, color: 'var(--navy)', marginBottom: 12, fontWeight: 900 }}>Evaluación no encontrada</h2>
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
      {/* HEADER sticky */}
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
        {totalPreguntas > 0 && (
          <div style={s.progressWrap}>
            <div style={s.progressInner}>
              <div style={{ ...s.progressBar, width: `${progreso}%` }} />
            </div>
            <span style={s.progressLabel}>{respondidas}/{totalPreguntas}</span>
          </div>
        )}
      </header>

      <main style={s.main}>
        {/* Encabezado encuesta */}
        <div style={s.encuestaHeader}>
          <div style={s.encuestaTag}>
            {encuesta.respondedor === 'interno' ? '👷 Personal interno' : '🏗 Contratistas'}
          </div>
          <h1 style={s.title}>{encuesta.titulo}</h1>
          <p style={s.desc}>{encuesta.descripcion}</p>
          {encuesta.leyenda && (
            <div style={s.leyenda}>
              <div style={s.leyendaTitle}>Escala de calificación</div>
              <div style={s.leyendaItems}>
                <div style={s.leyendaItem}><span style={{ ...s.leyendaBadge, background: '#fee2e2', color: '#dc2626' }}>1</span>Muy malo</div>
                <div style={s.leyendaItem}><span style={{ ...s.leyendaBadge, background: '#fef9c3', color: '#ca8a04' }}>5</span>Regular</div>
                <div style={s.leyendaItem}><span style={{ ...s.leyendaBadge, background: '#d1fae5', color: '#059669' }}>10</span>Muy bueno</div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div style={s.errorMsg}>⚠️ {error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {encuesta.preguntas.map((pregunta, idx) => (
            <div key={pregunta.id} style={s.preguntaCard}>
              <div style={s.preguntaHeader}>
                <div style={s.preguntaNum}>{idx + 1}</div>
                <div style={s.preguntaLabel}>
                  {pregunta.texto}
                  {pregunta.requerida && <span style={s.requerida}> *</span>}
                </div>
              </div>

              {pregunta.tipo === 'texto' && (
                <input
                  type="text"
                  style={s.input}
                  value={respuestas[pregunta.id] || ''}
                  onChange={(e) => handleChange(pregunta.id, e.target.value)}
                  placeholder="Escribe aquí..."
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
              )}

              {pregunta.tipo === 'escala' && (
                <div>
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
                            transform: isActive ? 'scale(1.12)' : 'scale(1)',
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
                        style={{ accentColor: 'var(--teal)', width: 20, height: 20, flexShrink: 0 }}
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

          <button type="submit" disabled={enviando}
            style={{ ...s.btnSubmit, opacity: enviando ? 0.7 : 1 }}>
            {enviando ? 'Enviando...' : 'Enviar evaluación →'}
          </button>
        </form>
      </main>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', minHeight: '100dvh', background: 'var(--gray-50)' },

  header: {
    background: 'var(--navy)', position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 2px 20px rgba(0,0,0,0.2)',
    // Safe area for iOS notch
    paddingTop: 'env(safe-area-inset-top)',
  },
  headerInner: {
    maxWidth: 780, margin: '0 auto', padding: '14px 20px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  backBtn: {
    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
    color: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 800,
    fontFamily: 'Nunito, sans-serif', padding: '9px 14px', borderRadius: 8,
    display: 'flex', alignItems: 'center', gap: 6,
    // Larger touch target
    minHeight: 44,
  },
  logo: { height: 36, objectFit: 'contain', maxWidth: 160 },
  progressWrap: {
    maxWidth: 780, margin: '0 auto', padding: '0 20px 10px',
    display: 'flex', alignItems: 'center', gap: 10,
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

  main: {
    maxWidth: 780, margin: '0 auto',
    padding: '24px 16px 100px',
    // Safe area for iOS home indicator
    paddingBottom: 'calc(80px + env(safe-area-inset-bottom))',
  },

  encuestaHeader: {
    background: 'white', borderRadius: 'var(--radius)', padding: '22px 20px',
    marginBottom: 16, boxShadow: 'var(--shadow)',
    border: '1.5px solid var(--gray-100)',
    borderLeft: '5px solid var(--teal)',
  },
  encuestaTag: {
    display: 'inline-block', background: 'var(--teal-light)', color: 'var(--teal-dark)',
    fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: 20, marginBottom: 10,
  },
  title: { fontSize: 22, fontWeight: 900, color: 'var(--navy)', marginBottom: 6, lineHeight: 1.25 },
  desc: { color: 'var(--gray-500)', fontSize: 14, fontWeight: 600, lineHeight: 1.6, marginBottom: 14 },
  leyenda: {
    background: 'var(--gray-50)', borderRadius: 10, padding: '14px 16px',
    border: '1.5px solid var(--gray-100)',
  },
  leyendaTitle: {
    fontSize: 11, fontWeight: 800, color: 'var(--gray-500)',
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10,
  },
  leyendaItems: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  leyendaItem: {
    display: 'flex', alignItems: 'center', gap: 7,
    fontSize: 13, fontWeight: 700, color: 'var(--gray-700)',
  },
  leyendaBadge: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 26, height: 26, borderRadius: 6, fontWeight: 900, fontSize: 12, flexShrink: 0,
  },

  preguntaCard: {
    background: 'white', borderRadius: 'var(--radius)', padding: '20px 18px',
    marginBottom: 12, boxShadow: 'var(--shadow)',
    border: '1.5px solid var(--gray-100)',
  },
  preguntaHeader: { display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 },
  preguntaNum: {
    minWidth: 28, height: 28, background: 'var(--navy)', color: 'white',
    borderRadius: 7, fontSize: 13, fontWeight: 900,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  preguntaLabel: { fontWeight: 800, color: 'var(--gray-700)', fontSize: 15, lineHeight: 1.5, flex: 1 },
  requerida: { color: 'var(--teal-dark)', fontWeight: 900 },

  input: {
    width: '100%', border: '2px solid var(--gray-300)', borderRadius: 10,
    padding: '14px 16px', fontSize: 16, fontFamily: 'Nunito, sans-serif',
    outline: 'none', color: 'var(--gray-900)', fontWeight: 600,
    background: 'var(--gray-50)', WebkitAppearance: 'none',
  },

  escalaRow: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 },
  escalaBtn: {
    // Minimum 44px touch target for mobile
    width: 44, height: 44, border: '2px solid',
    borderRadius: 10, cursor: 'pointer',
    fontSize: 15, fontWeight: 900, fontFamily: 'Nunito, sans-serif',
    transition: 'all 0.15s', flexShrink: 0,
  },
  escalaEtiquetas: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: 12, color: 'var(--gray-500)', fontWeight: 700,
  },

  opciones: { display: 'flex', flexDirection: 'column', gap: 10 },
  opcionLabel: {
    display: 'flex', alignItems: 'center', gap: 12,
    // Minimum 44px touch target
    padding: '14px 16px', borderRadius: 10, border: '2px solid',
    cursor: 'pointer', fontSize: 15, fontWeight: 700, transition: 'all 0.15s',
    minHeight: 44,
  },

  siNoWrap: { display: 'flex', gap: 12 },
  siNoBtn: {
    flex: 1, padding: '14px', border: '2px solid', borderRadius: 10,
    cursor: 'pointer', fontSize: 16, fontWeight: 900,
    fontFamily: 'Nunito, sans-serif', textAlign: 'center',
    transition: 'all 0.15s', minHeight: 50,
  },

  errorMsg: {
    background: '#fef2f2', color: '#dc2626', border: '2px solid #fecaca',
    borderRadius: 10, padding: '14px 16px', fontSize: 15, marginBottom: 16, fontWeight: 700,
  },
  btnSubmit: {
    background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)',
    color: 'white', border: 'none', borderRadius: 14,
    padding: '18px 32px', fontSize: 17, fontWeight: 900,
    cursor: 'pointer', width: '100%', marginTop: 16,
    fontFamily: 'Nunito, sans-serif',
    boxShadow: '0 4px 16px rgba(27,45,107,0.3)',
    // Large touch target
    minHeight: 56,
  },
  btnSecondary: {
    background: 'none', border: '2px solid var(--gray-300)',
    borderRadius: 10, padding: '12px 24px', cursor: 'pointer',
    fontSize: 15, color: 'var(--gray-700)', fontWeight: 800,
    fontFamily: 'Nunito, sans-serif', minHeight: 44,
  },
  notFound: { textAlign: 'center', padding: '60px 20px' },
  notFoundIcon: { fontSize: 48, marginBottom: 16 },
}

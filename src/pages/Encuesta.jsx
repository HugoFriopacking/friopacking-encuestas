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

const ICONOS = {
  operaciones: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="5" width="4" height="16" rx="1"/><rect x="17" y="8" width="4" height="13" rx="1"/>
      <line x1="2" y1="21" x2="22" y2="21"/>
    </svg>
  ),
  logistica: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  finanzas: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
      <line x1="6" y1="15" x2="10" y2="15"/>
    </svg>
  ),
  frioteam: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <polyline points="9 5 12 2 15 5"/>
      <polyline points="9 19 12 22 15 19"/>
      <polyline points="5 9 2 12 5 15"/>
      <polyline points="19 9 22 12 19 15"/>
    </svg>
  ),
  hermetica: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      <circle cx="12" cy="16" r="1.5"/>
    </svg>
  ),
  ingenieria: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="16" y2="17"/>
    </svg>
  ),
}

const ICONO_CHECK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

function parseSecciones(preguntas) {
  const result = []
  let current = null
  for (const p of preguntas) {
    if (p.tipo === 'seccion') {
      current = { id: p.id, texto: p.texto, icono: p.icono || 'operaciones', preguntas: [] }
      result.push(current)
    } else if (current) {
      current.preguntas.push(p)
    }
  }
  return result
}

function PreguntaEscala({ pregunta, num, respuestas, handleChange }) {
  return (
    <div style={s.preguntaCard}>
      <div style={s.preguntaHeader}>
        <div style={s.preguntaNum}>{num}</div>
        <div style={s.preguntaLabel}>
          {pregunta.texto}
          {pregunta.requerida && <span style={s.requerida}> *</span>}
        </div>
      </div>
      <div style={s.escalaRow}>
        {Array.from({ length: pregunta.max - pregunta.min + 1 }, (_, i) => i + pregunta.min).map((val) => {
          const col = scaleColor(val)
          const isActive = respuestas[pregunta.id] === val
          return (
            <button key={val} type="button" onClick={() => handleChange(pregunta.id, val)}
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
        <span>{pregunta.etiquetas[pregunta.min]}</span>
        <span>{pregunta.etiquetas[pregunta.max]}</span>
      </div>
    </div>
  )
}

export default function Encuesta() {
  const { id } = useParams()
  const navigate = useNavigate()
  const encuesta = encuestas.find((e) => e.id === id)
  const [respuestas, setRespuestas] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [modalSeccion, setModalSeccion] = useState(null)

  if (!encuesta) {
    return (
      <div style={s.page}>
        <div style={s.notFound}>
          <div style={s.notFoundIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#BFC5CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 20, color: '#376B9E', marginBottom: 12, fontWeight: 700 }}>Evaluación no encontrada</h2>
          <button onClick={() => navigate('/')} style={s.btnSecondary}>← Volver al inicio</button>
        </div>
      </div>
    )
  }

  function handleChange(preguntaId, valor) {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: valor }))
  }

  async function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault()
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

  // ─── MODO SECCIONES ───────────────────────────────────────────────────────
  if (encuesta.modo === 'secciones') {
    const secciones = parseSecciones(encuesta.preguntas)

    function seccionCompleta(sec) {
      return sec.preguntas.filter(p => p.requerida).every(p => respuestas[p.id])
    }

    const totalRespondidas = secciones.reduce((acc, sec) =>
      acc + sec.preguntas.filter(p => p.requerida && respuestas[p.id]).length, 0)
    const totalPreguntas = secciones.reduce((acc, sec) =>
      acc + sec.preguntas.filter(p => p.requerida).length, 0)
    const todasCompletas = secciones.every(sec => seccionCompleta(sec))
    const progreso = totalPreguntas > 0 ? Math.round((totalRespondidas / totalPreguntas) * 100) : 0

    return (
      <div style={s.page}>
        <header style={s.header}>
          <div style={s.headerInner}>
            <button onClick={() => navigate('/')} style={s.backBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Inicio
            </button>
            <img src="/logo-oscuro.png" alt="Grupo Friopacking" style={s.logo} />
          </div>
          <div style={s.progressWrap}>
            <div style={s.progressInner}>
              <div style={{ ...s.progressBar, width: `${progreso}%` }} />
            </div>
            <span style={s.progressLabel}>{totalRespondidas}/{totalPreguntas}</span>
          </div>
        </header>

        <main style={s.main}>
          <div style={s.encuestaHeader}>
            <span style={s.encuestaTag}>Contratistas</span>
            <h1 style={s.title}>{encuesta.titulo}</h1>
            <p style={s.desc}>{encuesta.descripcion}</p>
            <div style={s.leyenda}>
              <div style={s.leyendaTitle}>Escala de calificación</div>
              <div style={s.leyendaItems}>
                <div style={s.leyendaItem}><span style={{ ...s.leyendaBadge, background: '#fee2e2', color: '#dc2626' }}>1</span>Muy malo</div>
                <div style={s.leyendaItem}><span style={{ ...s.leyendaBadge, background: '#fef9c3', color: '#ca8a04' }}>5</span>Regular</div>
                <div style={s.leyendaItem}><span style={{ ...s.leyendaBadge, background: '#d1fae5', color: '#059669' }}>10</span>Muy bueno</div>
              </div>
            </div>
          </div>

          {error && <div style={s.errorMsg}>{error}</div>}

          <div style={s.seccionesGrid}>
            {secciones.map(sec => {
              const completa = seccionCompleta(sec)
              const resp = sec.preguntas.filter(p => p.requerida && respuestas[p.id]).length
              const total = sec.preguntas.filter(p => p.requerida).length
              return (
                <button key={sec.id} type="button" onClick={() => setModalSeccion(sec)} style={{
                  ...s.seccionCard,
                  background: completa ? '#f0fdf9' : 'white',
                  borderColor: completa ? '#34d399' : '#D4DADF',
                  borderLeftColor: completa ? '#059669' : '#376B9E',
                }}>
                  <div style={{
                    ...s.seccionCardIconBox,
                    background: completa ? '#d1fae5' : '#E7F1FA',
                    color: completa ? '#059669' : '#376B9E',
                  }}>
                    {ICONOS[sec.icono] || ICONOS.operaciones}
                  </div>
                  <div style={{
                    ...s.seccionCardTitulo,
                    color: completa ? '#065f46' : '#376B9E',
                  }}>
                    {sec.texto}
                  </div>
                  <div style={s.seccionCardFooter}>
                    <span style={{
                      fontSize: 12, fontWeight: 700,
                      color: completa ? '#059669' : '#5C7C93',
                    }}>
                      {completa ? 'Completado' : `${resp} de ${total} preguntas`}
                    </span>
                    {completa && ICONO_CHECK}
                  </div>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!todasCompletas || enviando}
            style={{
              ...s.btnSubmit,
              opacity: (!todasCompletas || enviando) ? 0.4 : 1,
              cursor: (!todasCompletas || enviando) ? 'not-allowed' : 'pointer',
            }}
          >
            {enviando ? 'Enviando...' : 'Enviar evaluación'}
          </button>
        </main>

        {/* Modal de sección */}
        {modalSeccion && (
          <div style={s.modalOverlay} onClick={() => setModalSeccion(null)}>
            <div style={s.modalBox} onClick={e => e.stopPropagation()}>
              <div style={s.modalHeader}>
                <div style={{ ...s.seccionCardIconBox, background: '#E7F1FA', color: '#376B9E', flexShrink: 0 }}>
                  {ICONOS[modalSeccion.icono] || ICONOS.operaciones}
                </div>
                <h2 style={s.modalTitulo}>{modalSeccion.texto}</h2>
                <button type="button" onClick={() => setModalSeccion(null)} style={s.modalClose}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div style={s.modalBody}>
                {modalSeccion.preguntas.map((pregunta, idx) => (
                  <PreguntaEscala
                    key={pregunta.id}
                    pregunta={pregunta}
                    num={idx + 1}
                    respuestas={respuestas}
                    handleChange={handleChange}
                  />
                ))}
              </div>
              <div style={s.modalFooter}>
                <button type="button" onClick={() => setModalSeccion(null)} style={s.modalBtnCerrar}>
                  Cerrar sección
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ─── MODO NORMAL ──────────────────────────────────────────────────────────
  const totalPreguntas = encuesta.preguntas.filter(p => p.tipo === 'escala').length
  const respondidas = encuesta.preguntas.filter(p => p.tipo === 'escala' && respuestas[p.id]).length
  const progreso = totalPreguntas > 0 ? Math.round((respondidas / totalPreguntas) * 100) : 0

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.headerInner}>
          <button onClick={() => navigate('/')} style={s.backBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
        <div style={s.encuestaHeader}>
          <span style={s.encuestaTag}>
            {encuesta.respondedor === 'interno' ? 'Personal interno' : 'Contratistas'}
          </span>
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

        {error && <div style={s.errorMsg}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {(() => {
            let numPregunta = 0
            return encuesta.preguntas.map((pregunta) => {
              if (pregunta.tipo === 'seccion') {
                return (
                  <div key={pregunta.id} style={s.seccionHeader}>
                    <div style={s.seccionLinea} />
                    <span style={s.seccionTitulo}>{pregunta.texto}</span>
                    <div style={s.seccionLinea} />
                  </div>
                )
              }
              numPregunta++
              const num = numPregunta
              return (
                <div key={pregunta.id} style={s.preguntaCard}>
                  <div style={s.preguntaHeader}>
                    <div style={s.preguntaNum}>{num}</div>
                    <div style={s.preguntaLabel}>
                      {pregunta.texto}
                      {pregunta.requerida && <span style={s.requerida}> *</span>}
                    </div>
                  </div>

                  {pregunta.tipo === 'texto' && (
                    <input type="text" style={s.input}
                      value={respuestas[pregunta.id] || ''}
                      onChange={(e) => handleChange(pregunta.id, e.target.value)}
                      placeholder="Escribe aquí..."
                      autoComplete="off" autoCorrect="off" spellCheck="false"
                    />
                  )}

                  {pregunta.tipo === 'escala' && (
                    <div>
                      <div style={s.escalaRow}>
                        {Array.from({ length: pregunta.max - pregunta.min + 1 }, (_, i) => i + pregunta.min).map((val) => {
                          const col = scaleColor(val)
                          const isActive = respuestas[pregunta.id] === val
                          return (
                            <button key={val} type="button" onClick={() => handleChange(pregunta.id, val)}
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
                        <span>{pregunta.etiquetas[pregunta.min]}</span>
                        <span>{pregunta.etiquetas[pregunta.max]}</span>
                      </div>
                    </div>
                  )}

                  {pregunta.tipo === 'opcion_multiple' && (
                    <div style={s.opciones}>
                      {pregunta.opciones.map((op) => (
                        <label key={op} style={{
                          ...s.opcionLabel,
                          background: respuestas[pregunta.id] === op ? '#E7F1FA' : '#F5F7F8',
                          borderColor: respuestas[pregunta.id] === op ? '#376B9E' : '#D4DADF',
                        }}>
                          <input type="radio" name={pregunta.id} value={op}
                            checked={respuestas[pregunta.id] === op}
                            onChange={() => handleChange(pregunta.id, op)}
                            style={{ accentColor: '#376B9E', width: 18, height: 18, flexShrink: 0 }}
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
                          background: respuestas[pregunta.id] === op ? '#376B9E' : 'white',
                          color: respuestas[pregunta.id] === op ? 'white' : '#376B9E',
                          borderColor: respuestas[pregunta.id] === op ? '#376B9E' : '#D4DADF',
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
              )
            })
          })()}

          <button type="submit" disabled={enviando}
            style={{ ...s.btnSubmit, opacity: enviando ? 0.7 : 1 }}>
            {enviando ? 'Enviando...' : 'Enviar evaluación'}
          </button>
        </form>
      </main>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', minHeight: '100dvh', background: '#EEF1F3' },

  header: {
    background: '#376B9E', position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
    paddingTop: 'env(safe-area-inset-top)',
  },
  headerInner: {
    maxWidth: 820, margin: '0 auto', padding: '13px 20px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  backBtn: {
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)',
    color: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 700,
    fontFamily: 'Manrope, sans-serif', padding: '8px 14px', borderRadius: 8,
    display: 'flex', alignItems: 'center', gap: 6, minHeight: 40,
    letterSpacing: '0.01em',
  },
  logo: { height: 34, objectFit: 'contain', maxWidth: 160 },
  progressWrap: {
    maxWidth: 820, margin: '0 auto', padding: '0 20px 10px',
    display: 'flex', alignItems: 'center', gap: 10,
  },
  progressInner: {
    flex: 1, height: 4, background: 'rgba(255,255,255,0.12)',
    borderRadius: 2, overflow: 'hidden',
  },
  progressBar: {
    height: '100%', background: '#B9DED8',
    borderRadius: 2, transition: 'width 0.35s ease',
  },
  progressLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 700, whiteSpace: 'nowrap' },

  main: {
    maxWidth: 820, margin: '0 auto',
    padding: '24px 16px',
    paddingBottom: 'calc(80px + env(safe-area-inset-bottom))',
  },

  encuestaHeader: {
    background: 'white', borderRadius: 12, padding: '22px 20px',
    marginBottom: 20, boxShadow: '0 1px 8px rgba(55,107,158,0.07)',
    border: '1px solid #D4DADF',
    borderLeft: '4px solid #B9DED8',
  },
  encuestaTag: {
    display: 'inline-block',
    background: '#376B9E', color: 'white',
    fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 4,
    letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12,
  },
  title: { fontFamily: 'Inter, sans-serif', fontSize: 20, fontWeight: 700, color: '#376B9E', marginBottom: 6, lineHeight: 1.25 },
  desc: { color: '#5C7C93', fontSize: 14, fontWeight: 600, lineHeight: 1.6, marginBottom: 14 },
  leyenda: {
    background: '#F5F7F8', borderRadius: 8, padding: '12px 14px',
    border: '1px solid #D4DADF',
  },
  leyendaTitle: {
    fontSize: 10, fontWeight: 800, color: '#5C7C93',
    textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10,
  },
  leyendaItems: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  leyendaItem: {
    display: 'flex', alignItems: 'center', gap: 7,
    fontSize: 13, fontWeight: 700, color: '#475569',
  },
  leyendaBadge: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 24, height: 24, borderRadius: 5, fontWeight: 900, fontSize: 11, flexShrink: 0,
  },

  // ── Sección cards ──
  seccionesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
    gap: 12, marginBottom: 24,
  },
  seccionCard: {
    border: '1.5px solid',
    borderLeft: '4px solid',
    borderRadius: 12,
    padding: '18px 16px',
    display: 'flex', flexDirection: 'column',
    gap: 10, cursor: 'pointer',
    fontFamily: 'Manrope, sans-serif',
    textAlign: 'left',
    boxShadow: '0 2px 8px rgba(55,107,158,0.06)',
    transition: 'box-shadow 0.15s, transform 0.1s',
  },
  seccionCardIconBox: {
    width: 42, height: 42, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  seccionCardTitulo: {
    fontSize: 13, fontWeight: 900, lineHeight: 1.4, flex: 1,
  },
  seccionCardFooter: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 2,
  },

  // ── Modal ──
  modalOverlay: {
    position: 'fixed', inset: 0, zIndex: 200,
    background: 'rgba(10,18,40,0.6)',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    backdropFilter: 'blur(4px)',
  },
  modalBox: {
    background: 'white',
    borderRadius: '18px 18px 0 0',
    width: '100%', maxWidth: 680,
    maxHeight: '92vh',
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 -8px 40px rgba(10,18,40,0.25)',
  },
  modalHeader: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '16px 18px',
    borderBottom: '1px solid #D4DADF',
    flexShrink: 0,
  },
  modalTitulo: {
    fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700, color: '#376B9E',
    flex: 1, lineHeight: 1.3,
  },
  modalClose: {
    background: '#f1f5f9', border: 'none', borderRadius: 7,
    width: 34, height: 34, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, color: '#5C7C93', fontFamily: 'Manrope, sans-serif',
  },
  modalBody: {
    overflowY: 'auto', flex: 1,
    padding: '14px 14px 4px',
    WebkitOverflowScrolling: 'touch',
  },
  modalFooter: {
    padding: '14px 16px',
    paddingBottom: 'calc(14px + env(safe-area-inset-bottom))',
    borderTop: '1px solid #D4DADF',
    flexShrink: 0,
  },
  modalBtnCerrar: {
    background: '#376B9E',
    color: 'white', border: 'none', borderRadius: 10,
    padding: '15px', fontSize: 15, fontWeight: 800,
    cursor: 'pointer', width: '100%',
    fontFamily: 'Manrope, sans-serif', minHeight: 50,
    letterSpacing: '0.01em',
  },

  // ── Sección header (modo lineal) ──
  seccionHeader: {
    display: 'flex', alignItems: 'center', gap: 12,
    margin: '28px 0 12px',
  },
  seccionLinea: { flex: 1, height: 1, background: '#cbd5e1', borderRadius: 1 },
  seccionTitulo: {
    fontSize: 11, fontWeight: 900, color: '#376B9E',
    textTransform: 'uppercase', letterSpacing: '0.08em',
    whiteSpace: 'nowrap', padding: '0 4px',
  },

  preguntaCard: {
    background: 'white', borderRadius: 10, padding: '18px 16px',
    marginBottom: 10, boxShadow: '0 1px 6px rgba(55,107,158,0.06)',
    border: '1px solid #D4DADF',
  },
  preguntaHeader: { display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 14 },
  preguntaNum: {
    minWidth: 26, height: 26, background: '#376B9E', color: 'white',
    borderRadius: 6, fontSize: 12, fontWeight: 900,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  preguntaLabel: { fontWeight: 700, color: '#334155', fontSize: 14, lineHeight: 1.55, flex: 1 },
  requerida: { color: '#B9DED8', fontWeight: 900 },

  input: {
    width: '100%', border: '1.5px solid #D4DADF', borderRadius: 8,
    padding: '13px 14px', fontSize: 15, fontFamily: 'Manrope, sans-serif',
    outline: 'none', color: '#1e293b', fontWeight: 600,
    background: '#F5F7F8', WebkitAppearance: 'none',
  },

  escalaRow: { display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 7 },
  escalaBtn: {
    width: 42, height: 42, border: '2px solid',
    borderRadius: 8, cursor: 'pointer',
    fontSize: 14, fontWeight: 900, fontFamily: 'Manrope, sans-serif',
    transition: 'all 0.12s', flexShrink: 0,
  },
  escalaEtiquetas: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: 11, color: '#5C7C93', fontWeight: 700,
  },

  opciones: { display: 'flex', flexDirection: 'column', gap: 8 },
  opcionLabel: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '12px 14px', borderRadius: 8, border: '1.5px solid',
    cursor: 'pointer', fontSize: 14, fontWeight: 700, transition: 'all 0.12s',
    minHeight: 44,
  },

  siNoWrap: { display: 'flex', gap: 10 },
  siNoBtn: {
    flex: 1, padding: '13px', border: '1.5px solid', borderRadius: 8,
    cursor: 'pointer', fontSize: 15, fontWeight: 800,
    fontFamily: 'Manrope, sans-serif', textAlign: 'center',
    transition: 'all 0.12s', minHeight: 48,
  },

  errorMsg: {
    background: '#fef2f2', color: '#dc2626', border: '1.5px solid #fecaca',
    borderRadius: 8, padding: '13px 14px', fontSize: 14, marginBottom: 16, fontWeight: 700,
  },
  btnSubmit: {
    background: 'linear-gradient(135deg, #376B9E 0%, #5F8FBF 100%)',
    color: 'white', border: 'none', borderRadius: 11,
    padding: '17px 32px', fontSize: 16, fontWeight: 900,
    width: '100%', marginTop: 8,
    fontFamily: 'Manrope, sans-serif',
    boxShadow: '0 4px 14px rgba(55,107,158,0.28)',
    minHeight: 54, letterSpacing: '0.01em',
  },
  btnSecondary: {
    background: 'none', border: '1.5px solid #D4DADF',
    borderRadius: 8, padding: '11px 22px', cursor: 'pointer',
    fontSize: 14, color: '#475569', fontWeight: 700,
    fontFamily: 'Manrope, sans-serif', minHeight: 42,
  },
  notFound: { textAlign: 'center', padding: '60px 20px' },
  notFoundIcon: { marginBottom: 16, display: 'flex', justifyContent: 'center' },
}

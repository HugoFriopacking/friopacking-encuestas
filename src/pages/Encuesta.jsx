import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import encuestas from '../encuestas/index.js'
import { supabase } from '../lib/supabase.js'
import './Encuesta.css'

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
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'var(--color-success)' }} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const MENSAJE_SALIR = '¿Seguro que quieres salir? Se perderán tus respuestas.'

// Solo afecta el color del botón seleccionado; el valor guardado sigue siendo el número.
function tierEscala(val) {
  if (val <= 4) return 'bajo'
  if (val <= 6) return 'medio'
  return 'alto'
}

function hayRespuestas(respuestas) {
  return Object.values(respuestas).some((v) => (Array.isArray(v) ? v.length > 0 : v !== '' && v != null))
}

function LeyendaEscala({ encuesta }) {
  if (!encuesta.leyendaTiers && !encuesta.leyenda) return null
  const tiers = encuesta.leyendaTiers || [
    { rango: '1', texto: 'Muy malo', bg: 'var(--color-score-low)', color: 'var(--color-on-score)' },
    { rango: '5–6', texto: 'Regular', bg: 'var(--color-score-mid)', color: 'var(--color-text)' },
    { rango: '10', texto: 'Muy bueno', bg: 'var(--color-score-high)', color: 'var(--color-on-score)' },
  ]
  return (
    <div style={s.leyenda}>
      <div style={s.leyendaTitle}>Escala de calificación</div>
      <div style={s.leyendaItems}>
        {tiers.map((t) => (
          <div key={t.rango} style={s.leyendaItem}>
            <span style={{ ...s.leyendaBadge, background: t.bg, color: t.color }}>{t.rango}</span>
            {t.texto}
          </div>
        ))}
      </div>
    </div>
  )
}

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

// Una página por área. Las preguntas previas a la primera área (p. ej. supervisor, obra)
// van al inicio de la primera página. Sin áreas, toda la encuesta es una sola página.
function construirPaginas(preguntas) {
  const preambulo = []
  const paginas = []
  let actual = null
  for (const p of preguntas) {
    if (p.tipo === 'seccion') {
      actual = { seccion: p, preambulo: [], preguntas: [] }
      paginas.push(actual)
    } else if (actual) {
      actual.preguntas.push(p)
    } else {
      preambulo.push(p)
    }
  }
  if (paginas.length === 0) return [{ seccion: null, preambulo: [], preguntas: preambulo }]
  paginas[0].preambulo = preambulo
  return paginas
}

function BotonesEscala({ pregunta, valor, onSelect, labelId }) {
  const valores = Array.from({ length: pregunta.max - pregunta.min + 1 }, (_, i) => i + pregunta.min)
  const tieneValor = typeof valor === 'number'

  function onKeyDown(e, val) {
    const pasos = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let siguiente = null
    if (e.key in pasos) siguiente = val + pasos[e.key]
    else if (e.key === 'Home') siguiente = pregunta.min
    else if (e.key === 'End') siguiente = pregunta.max
    if (siguiente === null) return
    e.preventDefault()
    if (siguiente > pregunta.max) siguiente = pregunta.min
    if (siguiente < pregunta.min) siguiente = pregunta.max
    onSelect(siguiente)
    e.currentTarget.parentElement.querySelector(`[data-valor="${siguiente}"]`)?.focus()
  }

  return (
    <div className="escala-grid" role="radiogroup" aria-labelledby={labelId} aria-required={pregunta.requerida || undefined}>
      {valores.map((val) => {
        const activo = valor === val
        const extremo = val === pregunta.min || val === pregunta.max ? pregunta.etiquetas?.[val] : null
        return (
          <button key={val} type="button" role="radio" aria-checked={activo}
            aria-label={extremo ? `${val}, ${extremo}` : String(val)}
            tabIndex={activo || (!tieneValor && val === pregunta.min) ? 0 : -1}
            className="escala-btn" data-valor={val} data-tier={tierEscala(val)}
            onClick={() => onSelect(val)}
            onKeyDown={(e) => onKeyDown(e, val)}
          >
            {val}
          </button>
        )
      })}
    </div>
  )
}

function EtiquetasEscala({ pregunta }) {
  return (
    <div style={s.escalaEtiquetas} aria-hidden="true">
      <span>{pregunta.etiquetas[pregunta.min]}</span>
      <span>{pregunta.etiquetas[pregunta.max]}</span>
    </div>
  )
}

function Asterisco() {
  return <span style={s.requerida} aria-hidden="true"> *</span>
}

function PreguntaEscala({ pregunta, num, respuestas, handleChange }) {
  const labelId = `lbl-${pregunta.id}`
  return (
    <div style={s.preguntaCard}>
      <div style={s.preguntaHeader}>
        <div style={s.preguntaNum}>{num}</div>
        <div style={s.preguntaLabel} id={labelId}>
          {pregunta.texto}
          {pregunta.requerida && <Asterisco />}
        </div>
      </div>
      <BotonesEscala pregunta={pregunta} valor={respuestas[pregunta.id]} labelId={labelId}
        onSelect={(val) => handleChange(pregunta.id, val)} />
      <EtiquetasEscala pregunta={pregunta} />
    </div>
  )
}

function EncabezadoArea({ seccion }) {
  return (
    <div style={s.areaHeader}>
      <h2 style={s.areaTitulo}>{seccion.texto}</h2>
      {seccion.descripcion && <p style={s.areaDesc}>{seccion.descripcion}</p>}
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
  const [otroActivo, setOtroActivo] = useState({})
  const [comboQuery, setComboQuery] = useState({})
  const [comboOpen, setComboOpen] = useState({})
  const [pagina, setPagina] = useState(0)
  const [pendientes, setPendientes] = useState([])

  useEffect(() => {
    // "instant" para que el CSS global (scroll-behavior: smooth) no anime el salto entre áreas.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pagina])

  useEffect(() => {
    if (!hayRespuestas(respuestas)) return
    const alSalir = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', alSalir)
    return () => window.removeEventListener('beforeunload', alSalir)
  }, [respuestas])

  if (!encuesta) {
    return (
      <div style={s.page} className="encuesta-page">
        <div style={s.notFound}>
          <div style={s.notFoundIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'var(--color-text-muted)' }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 20, color: 'var(--color-brand-dark)', marginBottom: 12, fontWeight: 700 }}>Evaluación no encontrada</h2>
          <button onClick={() => navigate('/')} style={s.btnSecondary} className="encuesta-btn-secondary">← Volver al inicio</button>
        </div>
      </div>
    )
  }

  if (!encuesta.activa) {
    return (
      <div style={s.page} className="encuesta-page">
        <div style={s.notFound}>
          <div style={s.notFoundIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'var(--color-text-muted)' }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 20, color: 'var(--color-brand-dark)', marginBottom: 12, fontWeight: 700 }}>Esta evaluación ya no está disponible</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 14, fontWeight: 600, marginBottom: 20, maxWidth: 320 }}>
            El período para responder "{encuesta.titulo}" ha finalizado.
          </p>
          <button onClick={() => navigate('/')} style={s.btnSecondary} className="encuesta-btn-secondary">← Volver al inicio</button>
        </div>
      </div>
    )
  }

  function handleChange(preguntaId, valor) {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: valor }))
  }

  function handleToggleMulti(preguntaId, opcion) {
    setRespuestas((prev) => {
      const actual = Array.isArray(prev[preguntaId]) ? prev[preguntaId] : []
      const nuevo = actual.includes(opcion) ? actual.filter((o) => o !== opcion) : [...actual, opcion]
      return { ...prev, [preguntaId]: nuevo }
    })
  }

  function preguntaRespondida(p) {
    if (p.tipo === 'seleccion_multiple') return Array.isArray(respuestas[p.id]) && respuestas[p.id].length > 0
    return !!respuestas[p.id]
  }

  async function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault()
    setError(null)
    const faltantes = encuesta.preguntas.filter((p) => p.requerida && !preguntaRespondida(p))
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

  function irAInicio() {
    if (hayRespuestas(respuestas) && !window.confirm(MENSAJE_SALIR)) return
    navigate('/')
  }

  const botonInicio = (
    <button type="button" onClick={irAInicio} style={s.backBtn} className="encuesta-header-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      Inicio
    </button>
  )

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
      <div style={s.page} className="encuesta-page">
        <div className="encuesta-blob encuesta-blob-1" />
        <div className="encuesta-blob encuesta-blob-2" />
        <header style={s.header}>
          <div style={s.headerInner}>
            {botonInicio}
            <img src="/logo-oscuro.png" alt="Grupo Friopacking" style={s.logo} />
          </div>
          <div style={s.progressWrap}>
            <div style={s.progressInner} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progreso} aria-label="Progreso de la evaluación">
              <div style={{ ...s.progressBar, width: `${progreso}%` }} />
            </div>
            <span style={s.progressLabel}>{progreso}%</span>
          </div>
        </header>

        <main style={s.main}>
          <div style={s.encuestaHeader}>
            <span style={s.encuestaTag}>Contratistas</span>
            <h1 style={s.title}>{encuesta.titulo}</h1>
            {encuesta.descripcion && <p style={s.desc}>{encuesta.descripcion}</p>}
            <LeyendaEscala encuesta={encuesta} />
          </div>

          {error && <div style={s.errorMsg} role="alert">{error}</div>}

          <div style={s.seccionesGrid}>
            {secciones.map(sec => {
              const completa = seccionCompleta(sec)
              const resp = sec.preguntas.filter(p => p.requerida && respuestas[p.id]).length
              const total = sec.preguntas.filter(p => p.requerida).length
              return (
                <button key={sec.id} type="button" className="option-card" onClick={() => setModalSeccion(sec)} style={{
                  ...s.seccionCard,
                  background: completa ? 'var(--color-success-bg)' : 'var(--color-surface)',
                  borderColor: completa ? 'var(--color-success-border)' : 'var(--color-border)',
                  borderLeftColor: completa ? 'var(--color-success)' : 'var(--color-brand)',
                }}>
                  <div style={{
                    ...s.seccionCardIconBox,
                    background: completa ? 'var(--color-success-bg)' : 'var(--color-brand-soft)',
                    color: completa ? 'var(--color-success)' : 'var(--color-brand)',
                  }}>
                    {ICONOS[sec.icono] || ICONOS.operaciones}
                  </div>
                  <div style={{
                    ...s.seccionCardTitulo,
                    color: completa ? 'var(--color-success)' : 'var(--color-brand-dark)',
                  }}>
                    {sec.texto}
                  </div>
                  <div style={s.seccionCardFooter}>
                    <span style={{
                      fontSize: 12, fontWeight: 700,
                      color: completa ? 'var(--color-success)' : 'var(--color-text-muted)',
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
            className="submit-btn-anim encuesta-btn-primary"
            onClick={handleSubmit}
            disabled={!todasCompletas || enviando}
            style={s.btnSubmit}
          >
            {enviando ? 'Enviando...' : 'Enviar evaluación'}
          </button>
        </main>

        {/* Modal de sección */}
        {modalSeccion && (
          <div style={s.modalOverlay} onClick={() => setModalSeccion(null)}>
            <div style={s.modalBox} onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-seccion-titulo">
              <div style={s.modalHeader}>
                <div style={{ ...s.seccionCardIconBox, background: 'var(--color-brand-soft)', color: 'var(--color-brand)', flexShrink: 0 }}>
                  {ICONOS[modalSeccion.icono] || ICONOS.operaciones}
                </div>
                <h2 style={s.modalTitulo} id="modal-seccion-titulo">{modalSeccion.texto}</h2>
                <button type="button" onClick={() => setModalSeccion(null)} style={s.modalClose} aria-label="Cerrar sección">
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
                <button type="button" onClick={() => setModalSeccion(null)} style={s.modalBtnCerrar} className="encuesta-btn-primary">
                  Cerrar sección
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ─── MODO NORMAL: una área por página ─────────────────────────────────────
  const paginas = construirPaginas(encuesta.preguntas)
  const tieneAreas = paginas[0].seccion !== null
  const paginaActual = paginas[Math.min(pagina, paginas.length - 1)]
  const esUltima = pagina >= paginas.length - 1
  const preguntasPagina = [...paginaActual.preambulo, ...paginaActual.preguntas]
  const faltantesPagina = preguntasPagina.filter((p) => p.requerida && !preguntaRespondida(p))

  const numeros = {}
  encuesta.preguntas.filter((p) => p.tipo !== 'seccion').forEach((p, i) => { numeros[p.id] = i + 1 })

  const totalPreguntas = encuesta.preguntas.filter(p => p.tipo !== 'seccion').length
  const respondidas = encuesta.preguntas.filter(p => p.tipo !== 'seccion' && preguntaRespondida(p)).length
  const progreso = totalPreguntas > 0 ? Math.round((respondidas / totalPreguntas) * 100) : 0

  function marcarPendientes() {
    setPendientes(faltantesPagina.map((p) => p.id))
    const primera = document.getElementById(`pregunta-${faltantesPagina[0].id}`)
    if (primera) {
      primera.scrollIntoView({ behavior: 'smooth', block: 'center' })
      primera.querySelector('button, input, select')?.focus({ preventScroll: true })
    }
  }

  function irSiguiente() {
    if (faltantesPagina.length > 0) {
      marcarPendientes()
      return
    }
    setPendientes([])
    setPagina((p) => Math.min(p + 1, paginas.length - 1))
  }

  function irAnterior() {
    setPendientes([])
    setPagina((p) => Math.max(p - 1, 0))
  }

  function enviar() {
    if (faltantesPagina.length > 0) {
      marcarPendientes()
      return
    }
    handleSubmit()
  }

  const errorEnvio = error && !error.startsWith('Faltan')

  function renderPregunta(pregunta) {
    const num = numeros[pregunta.id]
    const labelId = `lbl-${pregunta.id}`
    const pendiente = pendientes.includes(pregunta.id) && !preguntaRespondida(pregunta)
    return (
      <div key={pregunta.id} id={`pregunta-${pregunta.id}`} className="pregunta-card-anim"
        style={{
          ...s.preguntaCard,
          ...(pendiente ? s.preguntaPendiente : {}),
          // La tarjeta con el buscador abierto sube de capa para que su lista no quede
          // debajo de la tarjeta siguiente (incluso mientras corre la animación de entrada).
          ...(comboOpen[pregunta.id] ? { position: 'relative', zIndex: 30 } : {}),
          animationDelay: `${Math.min(num, 12) * 0.05}s`,
        }}>
        <div style={s.preguntaHeader}>
          <div style={s.preguntaNum}>{num}</div>
          <div style={s.preguntaLabel} id={labelId}>
            {pregunta.texto}
            {pregunta.requerida && <Asterisco />}
          </div>
        </div>

        {pregunta.tipo === 'texto' && (
          <input type="text" style={s.input} className="encuesta-input"
            aria-labelledby={labelId} aria-required={pregunta.requerida || undefined}
            value={respuestas[pregunta.id] || ''}
            onChange={(e) => handleChange(pregunta.id, e.target.value)}
            placeholder={pregunta.placeholder || 'Escribe aquí...'}
            autoComplete="off" autoCorrect="off" spellCheck="false"
          />
        )}

        {pregunta.tipo === 'escala' && (
          <div>
            <BotonesEscala pregunta={pregunta} valor={respuestas[pregunta.id]} labelId={labelId}
              onSelect={(val) => handleChange(pregunta.id, val)} />
            <EtiquetasEscala pregunta={pregunta} />
          </div>
        )}

        {pregunta.tipo === 'lista_desplegable' && (
          <div>
            <select
              style={s.select}
              className="encuesta-input"
              aria-labelledby={labelId}
              aria-required={pregunta.requerida || undefined}
              value={otroActivo[pregunta.id] ? '__otro__' : (respuestas[pregunta.id] || '')}
              onChange={(e) => {
                const val = e.target.value
                if (val === '__otro__') {
                  setOtroActivo((prev) => ({ ...prev, [pregunta.id]: true }))
                  handleChange(pregunta.id, '')
                } else {
                  setOtroActivo((prev) => ({ ...prev, [pregunta.id]: false }))
                  handleChange(pregunta.id, val)
                }
              }}
            >
              <option value="" disabled>Selecciona una opción...</option>
              {pregunta.opcionesAgrupadas
                ? pregunta.opcionesAgrupadas.map((grupo) => (
                  <optgroup key={grupo.proyecto} label={grupo.proyecto}>
                    {grupo.nombres.map((op) => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </optgroup>
                ))
                : pregunta.opciones.map((op) => (
                  <option key={op} value={op}>{op}</option>
                ))}
              {pregunta.opcionesAgrupadas && (
                <option value="__otro__">Otro (no está en la lista)</option>
              )}
            </select>
            {otroActivo[pregunta.id] && (
              <input type="text" style={{ ...s.input, marginTop: 8 }} className="encuesta-input"
                aria-label="Nombre del supervisor"
                value={respuestas[pregunta.id] || ''}
                onChange={(e) => handleChange(pregunta.id, e.target.value)}
                placeholder="Escribe el nombre del supervisor..."
                autoComplete="off" autoCorrect="off" spellCheck="false"
                autoFocus
              />
            )}
          </div>
        )}

        {pregunta.tipo === 'combo_busqueda' && (
          <div>
            {!otroActivo[pregunta.id] ? (
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  style={s.input}
                  className="encuesta-input"
                  role="combobox"
                  aria-labelledby={labelId}
                  aria-required={pregunta.requerida || undefined}
                  aria-autocomplete="list"
                  aria-expanded={!!comboOpen[pregunta.id]}
                  aria-controls={`lista-${pregunta.id}`}
                  value={comboQuery[pregunta.id] !== undefined ? comboQuery[pregunta.id] : (respuestas[pregunta.id] || '')}
                  onChange={(e) => {
                    const texto = e.target.value
                    setComboQuery((prev) => ({ ...prev, [pregunta.id]: texto }))
                    setComboOpen((prev) => ({ ...prev, [pregunta.id]: true }))
                    handleChange(pregunta.id, '')
                  }}
                  onFocus={() => setComboOpen((prev) => ({ ...prev, [pregunta.id]: true }))}
                  onBlur={() => setTimeout(() => setComboOpen((prev) => ({ ...prev, [pregunta.id]: false })), 150)}
                  placeholder="Busca el nombre..."
                  autoComplete="off" autoCorrect="off" spellCheck="false"
                />
                {comboOpen[pregunta.id] && (
                  <div style={s.comboLista} role="listbox" id={`lista-${pregunta.id}`}>
                    {pregunta.opciones
                      .filter((op) => op.toLowerCase().includes((comboQuery[pregunta.id] || '').toLowerCase()))
                      .slice(0, 30)
                      .map((op) => (
                        <div key={op} style={s.comboItem} role="option" aria-selected={respuestas[pregunta.id] === op}
                          onMouseDown={() => {
                            handleChange(pregunta.id, op)
                            setComboQuery((prev) => ({ ...prev, [pregunta.id]: op }))
                            setComboOpen((prev) => ({ ...prev, [pregunta.id]: false }))
                          }}
                        >
                          {op}
                        </div>
                      ))}
                    <div style={{ ...s.comboItem, ...s.comboItemOtro }} role="option" aria-selected={false}
                      onMouseDown={() => {
                        setOtroActivo((prev) => ({ ...prev, [pregunta.id]: true }))
                        setComboQuery((prev) => ({ ...prev, [pregunta.id]: '' }))
                        handleChange(pregunta.id, '')
                        setComboOpen((prev) => ({ ...prev, [pregunta.id]: false }))
                      }}
                    >
                      Otro (no está en la lista)
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <input type="text" style={s.input} className="encuesta-input"
                  aria-labelledby={labelId}
                  aria-required={pregunta.requerida || undefined}
                  value={respuestas[pregunta.id] || ''}
                  onChange={(e) => handleChange(pregunta.id, e.target.value)}
                  placeholder="Escribe el nombre del supervisor..."
                  autoComplete="off" autoCorrect="off" spellCheck="false"
                  autoFocus
                />
                <button type="button" style={s.comboVolver}
                  onClick={() => {
                    setOtroActivo((prev) => ({ ...prev, [pregunta.id]: false }))
                    handleChange(pregunta.id, '')
                    setComboQuery((prev) => ({ ...prev, [pregunta.id]: '' }))
                  }}
                >
                  ← Elegir de la lista
                </button>
              </div>
            )}
          </div>
        )}

        {pregunta.tipo === 'opcion_multiple' && (
          <div style={s.opcionesGrid} role="radiogroup" aria-labelledby={labelId} aria-required={pregunta.requerida || undefined}>
            {pregunta.opciones.map((op) => {
              const activo = respuestas[pregunta.id] === op
              return (
                <label key={op} className="option-card" style={{
                  ...s.opcionCard,
                  background: activo ? 'var(--color-brand-soft)' : 'var(--color-surface)',
                  borderColor: activo ? 'var(--color-brand)' : 'var(--color-border)',
                }}>
                  <input type="radio" name={pregunta.id} value={op}
                    checked={activo}
                    onChange={() => handleChange(pregunta.id, op)}
                    style={{ accentColor: 'var(--color-brand)', width: 18, height: 18, flexShrink: 0 }}
                  />
                  <span style={s.opcionTexto}>{op}</span>
                </label>
              )
            })}
          </div>
        )}

        {pregunta.tipo === 'seleccion_multiple' && (
          <div style={s.opcionesGrid} role="group" aria-labelledby={labelId}>
            {pregunta.opciones.map((op) => {
              const seleccionado = Array.isArray(respuestas[pregunta.id]) && respuestas[pregunta.id].includes(op)
              return (
                <label key={op} className="option-card" style={{
                  ...s.opcionCard,
                  background: seleccionado ? 'var(--color-accent-soft)' : 'var(--color-surface)',
                  borderColor: seleccionado ? 'var(--color-accent-text)' : 'var(--color-border)',
                }}>
                  <input type="checkbox" name={pregunta.id} value={op}
                    checked={seleccionado}
                    onChange={() => handleToggleMulti(pregunta.id, op)}
                    style={{ accentColor: 'var(--color-accent-text)', width: 18, height: 18, flexShrink: 0 }}
                  />
                  <span style={s.opcionTexto}>{op}</span>
                </label>
              )
            })}
          </div>
        )}

        {pregunta.tipo === 'si_no' && (
          <div style={s.siNoWrap} role="radiogroup" aria-labelledby={labelId}>
            {['Sí', 'No'].map((op) => (
              <label key={op} style={{
                ...s.siNoBtn,
                background: respuestas[pregunta.id] === op ? 'var(--color-brand)' : 'var(--color-surface)',
                color: respuestas[pregunta.id] === op ? 'var(--color-on-brand)' : 'var(--color-brand)',
                borderColor: respuestas[pregunta.id] === op ? 'var(--color-brand)' : 'var(--color-border)',
              }}>
                <input type="radio" name={pregunta.id} value={op}
                  checked={respuestas[pregunta.id] === op}
                  onChange={() => handleChange(pregunta.id, op)}
                  className="visually-hidden"
                />
                {op}
              </label>
            ))}
          </div>
        )}

        {pendiente && <p style={s.pendienteMsg}>Responde esta pregunta para continuar.</p>}
      </div>
    )
  }

  return (
    <div style={s.page} className="encuesta-page">
      <div className="encuesta-blob encuesta-blob-1" />
      <div className="encuesta-blob encuesta-blob-2" />
      <header style={s.header}>
        <div style={s.headerInner}>
          {botonInicio}
          <img src="/logo-oscuro.png" alt="Grupo Friopacking" style={s.logo} />
        </div>
        {totalPreguntas > 0 && (
          <div style={s.progressWrap}>
            <div style={s.progressInner} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progreso} aria-label="Progreso de la evaluación">
              <div style={{ ...s.progressBar, width: `${progreso}%` }} />
            </div>
            <span style={s.progressLabel}>
              {tieneAreas && `Área ${pagina + 1} de ${paginas.length} · `}{progreso}%
            </span>
          </div>
        )}
      </header>

      <main style={s.main}>
        <div style={s.encuestaHeader}>
          <span style={s.encuestaTag}>
            {encuesta.respondedor === 'interno' ? 'Personal interno' : 'Contratistas'}
          </span>
          <h1 style={s.title}>{encuesta.titulo}</h1>
          {pagina === 0 && encuesta.descripcion && <p style={s.desc}>{encuesta.descripcion}</p>}
          <LeyendaEscala encuesta={encuesta} />
        </div>

        {error && !errorEnvio && <div style={s.errorMsg} role="alert">{error}</div>}

        <form onSubmit={(e) => e.preventDefault()} noValidate>
          {paginaActual.preambulo.map(renderPregunta)}
          {paginaActual.seccion && <EncabezadoArea seccion={paginaActual.seccion} />}
          {paginaActual.preguntas.map(renderPregunta)}

          {errorEnvio && (
            <div style={s.errorEnvio} role="alert">
              <strong style={s.errorEnvioTitulo}>No pudimos enviar tus respuestas.</strong>
              <span>Revisa tu conexión e inténtalo de nuevo. Tus respuestas siguen guardadas en esta página.</span>
            </div>
          )}

          <div style={s.navEncuesta}>
            {pagina > 0 && (
              <button type="button" onClick={irAnterior} style={s.btnAnterior} className="encuesta-nav-btn encuesta-btn-secondary" disabled={enviando}>
                Anterior
              </button>
            )}
            {!esUltima ? (
              <button type="button" onClick={irSiguiente} className="encuesta-nav-btn submit-btn-anim encuesta-btn-primary"
                aria-disabled={faltantesPagina.length > 0}
                style={s.btnSiguiente}>
                Siguiente
              </button>
            ) : (
              <button type="button" onClick={enviar} className="encuesta-nav-btn submit-btn-anim encuesta-btn-primary"
                disabled={enviando}
                aria-disabled={faltantesPagina.length > 0}
                style={s.btnSiguiente}>
                {enviando ? 'Enviando...' : 'Enviar evaluación'}
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', minHeight: '100dvh', background: 'var(--color-bg)', position: 'relative' },

  header: {
    background: 'var(--color-brand)', position: 'sticky', top: 0, zIndex: 100,
    boxShadow: 'var(--shadow-header)',
    paddingTop: 'env(safe-area-inset-top)',
  },
  headerInner: {
    maxWidth: 820, margin: '0 auto', padding: '10px 20px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  backBtn: {
    background: 'none', border: 'none',
    color: 'var(--color-on-brand)', cursor: 'pointer', fontSize: 14, fontWeight: 700,
    fontFamily: 'Manrope, sans-serif', padding: '10px 6px', borderRadius: 8,
    display: 'flex', alignItems: 'center', gap: 6, minHeight: 44, minWidth: 44,
  },
  logo: { height: 34, objectFit: 'contain', maxWidth: 160 },
  // Franja blanca a todo el ancho bajo el header: la sombra extiende el fondo y clip-path recorta arriba/abajo
  progressWrap: {
    maxWidth: 820, margin: '0 auto', padding: '10px 20px',
    display: 'flex', alignItems: 'center', gap: 12,
    background: 'var(--color-surface)',
    boxShadow: '0 0 0 100vmax var(--color-surface)',
    clipPath: 'inset(0 -100vmax)',
  },
  progressInner: {
    flex: 1, height: 7, background: 'var(--color-border)',
    borderRadius: 4, overflow: 'hidden',
  },
  progressBar: {
    height: '100%', background: 'var(--color-accent)',
    borderRadius: 4, transition: 'width 0.35s ease',
  },
  progressLabel: { fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 700, whiteSpace: 'nowrap' },

  main: {
    maxWidth: 820, margin: '0 auto',
    padding: '24px 16px',
    paddingBottom: 'calc(80px + env(safe-area-inset-bottom))',
    position: 'relative', zIndex: 1,
  },

  encuestaHeader: {
    background: 'var(--color-surface)', borderRadius: 22, padding: '24px 22px',
    marginBottom: 20, boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--color-border)',
    borderLeft: '4px solid var(--color-accent)',
  },
  encuestaTag: {
    display: 'inline-block',
    background: 'var(--color-brand)', color: 'var(--color-on-brand)',
    fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 4,
    letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12,
  },
  title: { fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 700, color: 'var(--color-brand-dark)', marginBottom: 6, lineHeight: 1.2, letterSpacing: '-0.01em' },
  desc: { color: 'var(--color-text-muted)', fontSize: 14, fontWeight: 600, lineHeight: 1.6, marginBottom: 14 },
  leyenda: {
    background: 'var(--color-surface-muted)', borderRadius: 8, padding: '12px 14px',
    border: '1px solid var(--color-border)', marginTop: 10,
  },
  leyendaTitle: {
    fontSize: 10, fontWeight: 800, color: 'var(--color-text-muted)',
    textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10,
  },
  leyendaItems: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  leyendaItem: {
    display: 'flex', alignItems: 'center', gap: 7,
    fontSize: 13, fontWeight: 700, color: 'var(--color-text)',
  },
  leyendaBadge: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minWidth: 24, height: 24, padding: '0 6px', borderRadius: 5, fontWeight: 900, fontSize: 11, flexShrink: 0,
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
    borderRadius: 20,
    padding: '18px 16px',
    display: 'flex', flexDirection: 'column',
    gap: 10, cursor: 'pointer',
    fontFamily: 'Manrope, sans-serif',
    textAlign: 'left',
    boxShadow: 'var(--shadow-card)',
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
    background: 'var(--color-overlay)',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    backdropFilter: 'blur(4px)',
  },
  modalBox: {
    background: 'var(--color-surface)',
    borderRadius: '18px 18px 0 0',
    width: '100%', maxWidth: 680,
    maxHeight: '92vh',
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-modal)',
  },
  modalHeader: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '16px 18px',
    borderBottom: '1px solid var(--color-border)',
    flexShrink: 0,
  },
  modalTitulo: {
    fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--color-brand-dark)',
    flex: 1, lineHeight: 1.3,
  },
  modalClose: {
    background: 'var(--color-bg)', border: 'none', borderRadius: 7,
    width: 44, height: 44, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, color: 'var(--color-text-muted)', fontFamily: 'Manrope, sans-serif',
  },
  modalBody: {
    overflowY: 'auto', flex: 1,
    padding: '14px 14px 4px',
    WebkitOverflowScrolling: 'touch',
  },
  modalFooter: {
    padding: '14px 16px',
    paddingBottom: 'calc(14px + env(safe-area-inset-bottom))',
    borderTop: '1px solid var(--color-border)',
    flexShrink: 0,
  },
  // Colores en Encuesta.css (.encuesta-btn-primary)
  modalBtnCerrar: {
    borderRadius: 10,
    padding: '15px', fontSize: 15, fontWeight: 800,
    width: '100%',
    fontFamily: 'Manrope, sans-serif', minHeight: 50,
    letterSpacing: '0.01em',
  },

  // ── Encabezado de área ──
  areaHeader: {
    background: 'var(--color-brand)', borderRadius: 18, padding: '14px 18px',
    margin: '8px 0 12px',
  },
  areaTitulo: {
    fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--color-on-brand)',
    textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1.35, margin: 0,
  },
  areaDesc: { color: 'var(--color-on-brand)', opacity: 0.92, fontSize: 12, fontWeight: 600, lineHeight: 1.5, marginTop: 4 },

  preguntaCard: {
    background: 'var(--color-surface)', borderRadius: 18, padding: '20px 18px',
    marginBottom: 12, boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--color-border)',
    borderLeft: '4px solid var(--color-accent)',
    scrollMarginTop: 120,
  },
  preguntaPendiente: {
    border: '2px solid var(--color-required)',
    borderLeft: '4px solid var(--color-required)',
    boxShadow: '0 0 0 4px var(--color-error-border)',
  },
  pendienteMsg: { color: 'var(--color-error-text)', fontSize: 13, fontWeight: 700, marginTop: 10 },
  preguntaHeader: { display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 14 },
  preguntaNum: {
    minWidth: 26, height: 26, background: 'var(--color-brand)', color: 'var(--color-on-brand)',
    borderRadius: 6, fontSize: 12, fontWeight: 900,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  preguntaLabel: { fontWeight: 700, color: 'var(--color-text)', fontSize: 14, lineHeight: 1.55, flex: 1 },
  requerida: { color: 'var(--color-required)', fontWeight: 900 },

  input: {
    width: '100%', border: '1.5px solid var(--color-border)', borderRadius: 14,
    padding: '13px 14px', fontSize: 15, fontFamily: 'Manrope, sans-serif',
    color: 'var(--color-text)', fontWeight: 600,
    background: 'var(--color-surface-muted)', WebkitAppearance: 'none',
  },
  select: {
    width: '100%', border: '1.5px solid var(--color-border)', borderRadius: 14,
    padding: '13px 14px', fontSize: 15, fontFamily: 'Manrope, sans-serif',
    color: 'var(--color-text)', fontWeight: 600,
    background: 'var(--color-surface-muted)', minHeight: 48, cursor: 'pointer',
  },
  comboLista: {
    position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 20,
    background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', borderRadius: 14,
    boxShadow: 'var(--shadow-hover)',
    maxHeight: 220, overflowY: 'auto', padding: 6,
  },
  comboItem: {
    padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
    fontSize: 14, fontWeight: 600, color: 'var(--color-text)',
  },
  comboItemOtro: {
    color: 'var(--color-brand)', fontWeight: 800, borderTop: '1px solid var(--color-border)', marginTop: 4, paddingTop: 12,
  },
  comboVolver: {
    background: 'none', border: 'none', color: 'var(--color-text-muted)', fontWeight: 700,
    fontSize: 13, fontFamily: 'Manrope, sans-serif', cursor: 'pointer',
    padding: '10px 2px', minHeight: 44, textDecoration: 'underline',
  },

  escalaEtiquetas: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 700,
  },

  opcionesGrid: {
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  opcionCard: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '12px 14px', borderRadius: 18, border: '1.5px solid',
    cursor: 'pointer', minHeight: 56,
  },
  opcionTexto: { fontSize: 14, fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.35 },

  siNoWrap: { display: 'flex', gap: 10 },
  siNoBtn: {
    flex: 1, padding: '13px', border: '1.5px solid', borderRadius: 16,
    cursor: 'pointer', fontSize: 15, fontWeight: 800,
    fontFamily: 'Manrope, sans-serif', textAlign: 'center',
    transition: 'all 0.12s', minHeight: 48,
  },

  errorMsg: {
    background: 'var(--color-error-bg)', color: 'var(--color-error-text)', border: '1.5px solid var(--color-error-border)',
    borderRadius: 8, padding: '13px 14px', fontSize: 14, marginBottom: 16, fontWeight: 700,
  },
  errorEnvio: {
    display: 'flex', flexDirection: 'column', gap: 4,
    background: 'var(--color-error-bg)', color: 'var(--color-error-text)', border: '1.5px solid var(--color-error-border)',
    borderRadius: 14, padding: '14px 16px', fontSize: 14, fontWeight: 600, lineHeight: 1.5,
    margin: '8px 0 4px',
  },
  errorEnvioTitulo: { fontWeight: 800, fontSize: 15 },
  navEncuesta: { display: 'flex', gap: 10, marginTop: 12 },
  // Los colores, bordes, cursor y estado desactivado de los botones viven en
  // Encuesta.css (.encuesta-btn-primary / .encuesta-btn-secondary).
  btnSiguiente: {
    flex: 1,
    borderRadius: 16,
    padding: '16px 24px', fontSize: 16, fontWeight: 900,
    fontFamily: 'Manrope, sans-serif',
    minHeight: 54, letterSpacing: '0.01em',
  },
  btnAnterior: {
    flex: '0 0 auto',
    borderRadius: 16,
    padding: '16px 18px', fontSize: 16, fontWeight: 800,
    fontFamily: 'Manrope, sans-serif',
    minHeight: 54,
  },
  btnSubmit: {
    borderRadius: 16,
    padding: '17px 32px', fontSize: 16, fontWeight: 900,
    width: '100%', marginTop: 8,
    fontFamily: 'Manrope, sans-serif',
    minHeight: 54, letterSpacing: '0.01em',
  },
  btnSecondary: {
    borderRadius: 8, padding: '11px 22px',
    fontSize: 14, fontWeight: 700,
    fontFamily: 'Manrope, sans-serif', minHeight: 44,
  },
  notFound: { textAlign: 'center', padding: '60px 20px' },
  notFoundIcon: { marginBottom: 16, display: 'flex', justifyContent: 'center' },
}

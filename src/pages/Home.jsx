import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { encuestasActivas } from '../encuestas/index.js'
import { temaDe, TEMAS_ORDEN } from '../encuestas/temas.js'
import { atributosFoto, fotoAleatoria } from '../lib/fotosObra.js'
import './Home.css'

// Cambia este PIN cuando quieras
const PIN_ACCESO = '2025'

const tagColors = {
  interno: { bg: '#E7F1FA', color: '#376B9E' },
  externo: { bg: '#E9F5F3', color: '#3F7A70' },
  ambos:   { bg: '#EEF0F2', color: '#5F8FBF' },
}

// Orden de aparición de los grupos por mes (más reciente primero)
const MES_ORDEN = ['Octubre', 'Septiembre', 'Agosto', 'Julio', 'Junio']

// Duración estimada solo visual (no viene de la base de datos): ~15s por pregunta de escala.
function estimarDuracion(escalaCount) {
  if (escalaCount === 0) return null
  if (escalaCount <= 10) return '3–5 min'
  if (escalaCount <= 15) return '5–7 min'
  if (escalaCount <= 20) return '7–9 min'
  return '10+ min'
}

function agruparPorMes(encuestas) {
  const grupos = {}
  encuestas.forEach((enc) => {
    const mes = enc.mes || 'Otras'
    if (!grupos[mes]) grupos[mes] = []
    grupos[mes].push(enc)
  })
  const ordenadas = [
    ...MES_ORDEN.filter((m) => grupos[m]),
    ...Object.keys(grupos).filter((m) => !MES_ORDEN.includes(m)),
  ]
  // Dentro de cada mes, la última subida va primero (las subidas juntas conservan su orden)
  return ordenadas.map((mes) => ({
    mes,
    encuestas: [...grupos[mes]].sort((a, b) => (b.publicada || '').localeCompare(a.publicada || '')),
  }))
}

const formatoFecha = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'short' })

function fechaSubida(enc) {
  return enc.publicada ? formatoFecha.format(new Date(enc.publicada)).replace('.', '') : null
}

// Filtros de la portada. Viven en la URL (?q=&resp=&area=&mes=) para poder compartir un enlace filtrado,
// y se copian en sessionStorage para recuperarlos al volver desde una encuesta con el botón Inicio.
const FILTROS_VACIOS = { q: '', resp: '', area: '', mes: '' }
const CLAVE_FILTROS = 'fp_filtros'

const RESPONDE = [
  { valor: '', label: 'Todas' },
  { valor: 'interno', label: 'Personal interno', corto: 'Internas' },
  { valor: 'externo', label: 'Contratistas' },
]

// Sin tildes ni mayúsculas: "logistica" encuentra "Logística"
function normalizar(texto) {
  return (texto || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

const textoBusqueda = new Map(encuestasActivas.map((enc) => [
  enc.id, normalizar(`${enc.titulo} ${enc.descripcion || ''} ${temaDe(enc)} ${enc.mes || ''}`),
]))

function filtrar(encuestas, filtros) {
  const palabras = normalizar(filtros.q).split(/\s+/).filter(Boolean)
  return encuestas.filter((enc) =>
    (!filtros.resp || enc.respondedor === filtros.resp) &&
    (!filtros.area || temaDe(enc) === filtros.area) &&
    (!filtros.mes || (enc.mes || 'Otras') === filtros.mes) &&
    palabras.every((p) => textoBusqueda.get(enc.id).includes(p)),
  )
}

const TEMAS = TEMAS_ORDEN.filter((t) => encuestasActivas.some((enc) => temaDe(enc) === t))
const MESES = agruparPorMes(encuestasActivas).map((g) => g.mes)

export default function Home() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [acceso, setAcceso] = useState(() => {
    return sessionStorage.getItem('fp_acceso') === PIN_ACCESO
  })

  function handleSubmit(e) {
    e.preventDefault()
    if (pin === PIN_ACCESO) {
      sessionStorage.setItem('fp_acceso', PIN_ACCESO)
      setAcceso(true)
      setError(false)
    } else {
      setError(true)
      setPin('')
    }
  }

  if (!acceso) {
    return (
      <div style={s.page}>
        <div style={s.bg} />
        <div style={s.card}>
          <img src="/logo-claro.png" alt="Grupo Friopacking" style={s.logo} />
          <h1 style={s.title}>Portal de Evaluaciones</h1>
          <p style={s.subtitle}>Ingresa el PIN de acceso</p>

          <form onSubmit={handleSubmit} style={s.form}>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(false) }}
              placeholder="••••"
              maxLength={8}
              style={{ ...s.pinInput, borderColor: error ? '#dc2626' : 'var(--gray-300)' }}
              autoFocus
            />
            {error && <p style={s.errorMsg}>PIN incorrecto. Intenta de nuevo.</p>}
            <button type="submit" style={s.btn}>Ingresar</button>
          </form>

          <p style={s.hint}>¿No tienes el PIN? Contacta al área de SSOMA.</p>
        </div>
      </div>
    )
  }

  return <Portada />
}

function Portada() {
  const [params, setParams] = useSearchParams()
  // Foto de obra al azar en el encabezado; cambia en cada visita
  const [foto] = useState(fotoAleatoria)
  const filtros = Object.fromEntries(Object.keys(FILTROS_VACIOS).map((k) => [k, params.get(k) || '']))
  const hayFiltros = Object.values(filtros).some(Boolean)
  const visibles = filtrar(encuestasActivas, filtros)

  useEffect(() => {
    if (params.toString()) return
    try {
      const guardados = sessionStorage.getItem(CLAVE_FILTROS)
      if (guardados) setParams(new URLSearchParams(guardados), { replace: true })
    } catch { /* sin sessionStorage se empieza sin filtros */ }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function aplicar(nuevos) {
    const limpios = new URLSearchParams()
    Object.entries(nuevos).forEach(([k, v]) => { if (v) limpios.set(k, v) })
    setParams(limpios, { replace: true })
    try { sessionStorage.setItem(CLAVE_FILTROS, limpios.toString()) } catch { /* opcional */ }
  }

  const cambiarFiltro = (clave, valor) => aplicar({ ...filtros, [clave]: valor })
  const limpiarFiltros = () => aplicar(FILTROS_VACIOS)
  // Cuántas encuestas quedarían al elegir esa opción, con el resto de filtros como están
  const conteo = (clave, valor) => filtrar(encuestasActivas, { ...filtros, [clave]: valor }).length

  return (
    <div style={s.pageLight}>
      <header style={s.header}>
        <div style={s.headerBg} />
        <div className="home-header-inner">
          <img src="/logo-oscuro.png" alt="Grupo Friopacking" className="home-header-logo" />
          <div className="home-header-right">
            <Link to="/resultados" style={s.headerResultados} className="home-header-link">Resultados</Link>
            <div style={s.headerPill} className="home-portal-pill">Portal de Evaluaciones</div>
            <span style={s.headerIniciales} className="home-header-iniciales">H. M. P.</span>
          </div>
        </div>
      </header>

      <div style={s.hero} className="home-hero">
        <img className="home-hero-foto" {...atributosFoto(foto, '100vw')} fetchPriority="high" />
        <div className="home-hero-velo" />
        <div className="home-hero-inner">
          <h1 style={s.heroTitle} className="home-hero-title">Evaluaciones</h1>
          <p style={s.heroSub} className="home-hero-sub">Selecciona una evaluación para comenzar. Tus respuestas son confidenciales.</p>
          <div style={s.heroBadge} className="home-hero-badge">
            <span style={s.heroDot} />
            {encuestasActivas.length} disponible{encuestasActivas.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="home-toolbar">
        <div className="home-toolbar-inner">
          <div className="home-search">
            <svg className="home-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search" className="home-search-input"
              aria-label="Buscar evaluación"
              placeholder="Buscar por nombre o área…"
              value={filtros.q}
              onChange={(e) => cambiarFiltro('q', e.target.value)}
              autoComplete="off" spellCheck="false"
            />
            {filtros.q && (
              <button type="button" className="home-search-clear" aria-label="Borrar búsqueda"
                onClick={() => cambiarFiltro('q', '')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="home-filtros">
            <div className="home-seg" role="group" aria-label="Quién responde">
              {RESPONDE.map((op) => (
                <button key={op.valor} type="button" className="home-seg-btn"
                  aria-pressed={filtros.resp === op.valor}
                  onClick={() => cambiarFiltro('resp', op.valor)}>
                  {op.corto
                    ? <><span className="home-seg-largo">{op.label}</span><span className="home-seg-corto">{op.corto}</span></>
                    : op.label}
                  <span className="home-seg-count">{conteo('resp', op.valor)}</span>
                </button>
              ))}
            </div>

            <label className="home-select">
              <span className="home-select-label">Área evaluada</span>
              <select value={filtros.area} onChange={(e) => cambiarFiltro('area', e.target.value)}>
                <option value="">Todas</option>
                {TEMAS.map((t) => (
                  <option key={t} value={t}>{t} ({conteo('area', t)})</option>
                ))}
              </select>
            </label>

            <label className="home-select">
              <span className="home-select-label">Mes</span>
              <select value={filtros.mes} onChange={(e) => cambiarFiltro('mes', e.target.value)}>
                <option value="">Todos</option>
                {MESES.map((m) => (
                  <option key={m} value={m}>{m} ({conteo('mes', m)})</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <main className="home-main">
        <div className="home-resumen" aria-live="polite">
          <span>
            {hayFiltros
              ? `${visibles.length} de ${encuestasActivas.length} evaluaciones`
              : `${encuestasActivas.length} evaluaciones`}
          </span>
          {hayFiltros && (
            <button type="button" className="home-limpiar" onClick={limpiarFiltros}>Limpiar filtros</button>
          )}
        </div>

        {visibles.length === 0 && (
          <div className="home-empty">
            <p className="home-empty-title">Ninguna evaluación coincide</p>
            <p className="home-empty-text">
              {filtros.q ? `No encontramos “${filtros.q}” con los filtros elegidos. ` : ''}
              Prueba con otra palabra o quita algún filtro.
            </p>
            <button type="button" className="home-empty-btn" onClick={limpiarFiltros}>Ver todas las evaluaciones</button>
          </div>
        )}

        {(() => {
          const grupos = agruparPorMes(visibles)
          return grupos.map(({ mes, encuestas }) => (
            <section key={mes} className="home-mes-section" aria-labelledby={`mes-${mes}`}>
              <div className="home-mes-heading">
                <h2 id={`mes-${mes}`} style={s.mesBadge} className="home-mes-badge">{mes}</h2>
                <span style={s.mesCount}>{encuestas.length} {encuestas.length === 1 ? 'evaluación' : 'evaluaciones'}</span>
              </div>
              <div className="home-grid">
                {encuestas.map((enc) => {
                  const tag = tagColors[enc.respondedor] || tagColors.ambos
                  // Se muestran todas las preguntas (no solo las de escala) para que una encuesta sin escala
                  // no aparezca como "Próximamente"; la duración se sigue estimando con las de escala.
                  const totalPreguntas = enc.preguntas.filter(p => p.tipo !== 'seccion').length
                  const escalaCount = enc.preguntas.filter(p => p.tipo === 'escala').length
                  const duracion = totalPreguntas > 0 ? estimarDuracion(Math.max(escalaCount, 1)) : null
                  return (
                    <Link key={enc.id} to={`/encuesta/${enc.id}`} style={s.cardLink} className="home-card home-card-link">
                      <div style={s.cardTop}>
                        <span style={{ ...s.cardTag, background: tag.bg, color: tag.color }}>
                          {enc.respondedor === 'interno' ? 'Personal interno' : enc.respondedor === 'externo' ? 'Contratistas' : 'Ambos'}
                        </span>
                        <span className="home-card-tema">{temaDe(enc)}</span>
                      </div>
                      <h3 style={s.cardTitle} className="home-card-title">{enc.titulo}</h3>
                      {enc.descripcion
                        ? <p style={s.cardDesc} className="home-card-desc">{enc.descripcion}</p>
                        : <div style={{ flex: 1 }} />}
                      <div style={s.cardFooter}>
                        <span style={s.cardMeta}>
                          {totalPreguntas > 0 ? `${totalPreguntas} preguntas${duracion ? ` · ${duracion}` : ''}` : 'Próximamente'}
                          {fechaSubida(enc) && ` · Subida el ${fechaSubida(enc)}`}
                        </span>
                        <div style={s.cardCta} className="home-card-cta">
                          Iniciar evaluación
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          ))
        })()}
      </main>

      <footer style={s.footer}>
        <img src="/logo-oscuro.png" alt="Grupo Friopacking" style={s.footerLogo} />
        <p style={s.footerText}>© {new Date().getFullYear()} Grupo Friopacking — H. M. P.</p>
      </footer>
    </div>
  )
}

const s = {
  // LOGIN
  page: {
    minHeight: '100vh', minHeight: '100dvh',
    background: 'linear-gradient(135deg, #25496B 0%, #376B9E 60%, #5F8FBF 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '24px 20px', position: 'relative', overflow: 'hidden',
    paddingTop: 'calc(24px + env(safe-area-inset-top))',
    paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
  },
  bg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 30% 70%, rgba(185,222,216,0.12) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  card: {
    background: 'white', borderRadius: 20, padding: '44px 28px',
    textAlign: 'center', maxWidth: 400, width: '100%',
    boxShadow: '0 24px 80px rgba(0,0,0,0.3)', position: 'relative',
  },
  logo: { height: 40, objectFit: 'contain', marginBottom: 24, opacity: 0.85, maxWidth: '100%' },
  title: { fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 700, color: '#376B9E', marginBottom: 6 },
  subtitle: { color: '#4D6478', fontSize: 15, fontWeight: 600, marginBottom: 28 },
  form: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 },
  pinInput: {
    width: '100%', border: '2px solid', borderRadius: 12,
    padding: '16px', fontSize: 24, fontFamily: 'Manrope, sans-serif',
    fontWeight: 900, textAlign: 'center', outline: 'none',
    letterSpacing: '0.3em', color: '#376B9E', background: '#EEF1F3',
    minHeight: 56,
  },
  errorMsg: { color: '#dc2626', fontSize: 14, fontWeight: 700, margin: '0' },
  btn: {
    background: 'linear-gradient(135deg, #376B9E 0%, #5F8FBF 100%)',
    color: 'white', border: 'none', borderRadius: 12,
    padding: '16px', fontSize: 16, fontWeight: 900,
    cursor: 'pointer', fontFamily: 'Manrope, sans-serif',
    boxShadow: '0 4px 16px rgba(55,107,158,0.3)', minHeight: 52,
  },
  hint: { color: '#BFC5CC', fontSize: 13, fontWeight: 600 },

  // HOME
  pageLight: { minHeight: '100vh', minHeight: '100dvh', background: '#EEF1F3', display: 'flex', flexDirection: 'column' },
  header: { background: '#376B9E', position: 'relative', overflow: 'hidden' },
  headerBg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 80% 50%, rgba(185,222,216,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  headerPill: {
    background: 'rgba(185,222,216,0.22)', color: '#B9DED8',
    fontSize: 11, fontWeight: 800,
    borderRadius: 20, letterSpacing: '0.08em', textTransform: 'uppercase',
    border: '1px solid rgba(185,222,216,0.35)', padding: '5px 12px',
  },
  headerIniciales: {
    color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 700,
    letterSpacing: '0.04em',
  },
  headerResultados: {
    color: 'white', fontSize: 12, fontWeight: 700,
    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
    padding: '6px 12px', borderRadius: 20,
  },
  hero: {
    background: 'linear-gradient(135deg, #25496B 0%, #376B9E 50%, #5F8FBF 100%)',
  },
  heroTitle: { fontFamily: 'Inter, sans-serif', fontWeight: 700, color: 'white', lineHeight: 1.15 },
  heroSub: { color: 'rgba(255,255,255,0.75)', fontWeight: 600, maxWidth: 520, lineHeight: 1.55 },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)',
    fontWeight: 700, borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.15)',
  },
  heroDot: {
    width: 8, height: 8, borderRadius: '50%', background: '#B9DED8',
    display: 'inline-block', boxShadow: '0 0 8px #B9DED8',
  },
  mesBadge: {
    fontFamily: 'Inter, sans-serif', fontWeight: 700, color: 'white',
    textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap',
    background: 'linear-gradient(135deg, #376B9E 0%, #5F8FBF 100%)',
    borderRadius: 20,
  },
  mesCount: { fontSize: 12, color: '#4D6478', fontWeight: 700 },
  cardLink: {
    background: 'white',
    boxShadow: '0 4px 20px rgba(55,107,158,0.10)', border: '1.5px solid rgba(55,107,158,0.07)',
    display: 'flex', flexDirection: 'column', cursor: 'pointer',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTag: { fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 20 },
  cardTitle: { fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#376B9E', marginBottom: 6, lineHeight: 1.3 },
  cardDesc: { color: '#4D6478', fontWeight: 600, lineHeight: 1.55, flex: 1 },
  cardFooter: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 10, marginTop: 6 },
  cardMeta: { fontSize: 12, color: '#4D6478', fontWeight: 700 },
  cardCta: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: '#376B9E', color: 'white',
    fontWeight: 800, borderRadius: 10,
  },
  footer: {
    background: '#376B9E', padding: '24px 20px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
  },
  footerLogo: { height: 32, objectFit: 'contain', opacity: 0.75 },
  footerText: { color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600 },
}

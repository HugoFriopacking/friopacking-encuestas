import { useState } from 'react'
import { Link } from 'react-router-dom'
import { encuestasActivas } from '../encuestas/index.js'
import './Home.css'

// Cambia este PIN cuando quieras
const PIN_ACCESO = '2025'

const tagColors = {
  interno: { bg: '#E7F1FA', color: '#376B9E' },
  externo: { bg: '#E9F5F3', color: '#3F7A70' },
  ambos:   { bg: '#EEF0F2', color: '#5F8FBF' },
}

// Orden de aparición de los grupos por mes (más reciente primero)
const MES_ORDEN = ['Agosto', 'Julio', 'Junio']

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
  return ordenadas.map((mes) => ({ mes, encuestas: grupos[mes] }))
}

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

      <div style={s.hero}>
        <div className="home-hero-inner">
          <h1 style={s.heroTitle} className="home-hero-title">Evaluaciones</h1>
          <p style={s.heroSub} className="home-hero-sub">Selecciona una evaluación para comenzar. Tus respuestas son confidenciales.</p>
          <div style={s.heroBadge} className="home-hero-badge">
            <span style={s.heroDot} />
            {encuestasActivas.length} disponible{encuestasActivas.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <main className="home-main">
        {(() => {
          const grupos = agruparPorMes(encuestasActivas)
          let contador = 0
          return grupos.map(({ mes, encuestas }) => (
            <section key={mes} className="home-mes-section">
              <div className="home-mes-heading">
                <span style={s.mesBadge} className="home-mes-badge">{mes}</span>
                <span style={s.mesCount}>{encuestas.length} evaluación{encuestas.length !== 1 ? 'es' : ''}</span>
              </div>
              <div className="home-grid">
                {encuestas.map((enc) => {
                  contador++
                  const num = contador
                  const tag = tagColors[enc.respondedor] || tagColors.ambos
                  const escalaCount = enc.preguntas.filter(p => p.tipo === 'escala').length
                  const duracion = estimarDuracion(escalaCount)
                  return (
                    <Link key={enc.id} to={`/encuesta/${enc.id}`} style={s.cardLink} className="home-card home-card-link">
                      <div style={s.cardTop}>
                        <span style={{ ...s.cardTag, background: tag.bg, color: tag.color }}>
                          {enc.respondedor === 'interno' ? 'Personal interno' : enc.respondedor === 'externo' ? 'Contratistas' : 'Ambos'}
                        </span>
                        <span style={s.cardNum}>#{String(num).padStart(2,'0')}</span>
                      </div>
                      <h2 style={s.cardTitle} className="home-card-title">{enc.titulo}</h2>
                      <p style={s.cardDesc} className="home-card-desc">{enc.descripcion}</p>
                      <div style={s.cardFooter}>
                        <span style={s.cardMeta}>
                          {escalaCount > 0 ? `${escalaCount} preguntas${duracion ? ` · ${duracion}` : ''}` : 'Próximamente'}
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
  cardNum: { fontSize: 11, fontWeight: 800, color: '#9AA5B1' },
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

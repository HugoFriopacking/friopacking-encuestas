import { useLocation, useNavigate } from 'react-router-dom'
import encuestas from '../encuestas/index.js'
import { atributosFoto, fotoPorNumero } from '../lib/fotosObra.js'

export default function Gracias() {
  const location = useLocation()
  const navigate = useNavigate()
  const encuesta = encuestas.find((e) => e.titulo === location.state?.titulo)
  // Solo se afirma el anonimato si la encuesta no pide el nombre de quien responde.
  const anonima = encuesta ? !encuesta.preguntas.some((p) => p.id === 'nombre') : false
  // La misma foto de obra que se vio al abrir la encuesta (solo en las de obra), velada por el degradado de marca
  const foto = fotoPorNumero(location.state?.foto)

  return (
    <div style={s.page} className="encuesta-page">
      {foto && <>
        <img {...atributosFoto(foto, '100vw')} style={{ ...s.foto, objectPosition: foto.pos }} />
        <div style={s.velo} />
      </>}
      <div style={s.bg} />
      <main style={s.card}>
        <picture>
          <source srcSet="/logo-oscuro.png" media="(prefers-color-scheme: dark)" />
          <img src="/logo-claro.png" alt="Grupo Friopacking" style={s.logo} />
        </picture>
        <div style={s.iconWrap} aria-hidden="true">
          <div style={s.iconRing} />
          <div style={s.icon}>✓</div>
        </div>
        {/* Una encuesta puede definir su propio cierre con `gracias: { titulo, mensaje }`. */}
        <h1 style={s.title}>{encuesta?.gracias?.titulo || '¡Gracias por tu tiempo!'}</h1>
        <p style={s.msg}>
          {encuesta?.gracias?.mensaje || (anonima
            ? 'Tus respuestas son anónimas y nos ayudarán a mejorar el servicio entre áreas.'
            : 'Tus respuestas nos ayudarán a mejorar.')}
        </p>
        <button onClick={() => navigate('/')} style={s.btn} className="encuesta-nav-btn encuesta-btn-primary">Volver al inicio</button>
      </main>
    </div>
  )
}

const s = {
  page: {
    minHeight: '100vh', minHeight: '100dvh',
    background: 'linear-gradient(135deg, var(--color-hero-from) 0%, var(--color-hero-to) 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '24px 20px',
    position: 'relative', overflow: 'hidden',
    paddingTop: 'calc(24px + env(safe-area-inset-top))',
    paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
  },
  foto: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
  // Degradado de marca encima de la foto: la tarjeta blanca sigue siendo lo que se lee
  velo: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg, var(--color-hero-from) 0%, var(--color-hero-to) 100%)',
    opacity: 0.82,
  },
  bg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 30% 70%, var(--color-hero-glow) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  card: {
    background: 'var(--color-surface)', borderRadius: 20, padding: '40px 28px',
    textAlign: 'center', maxWidth: 420, width: '100%',
    boxShadow: 'var(--shadow-dialog)',
    position: 'relative',
  },
  logo: { height: 40, objectFit: 'contain', marginBottom: 26, maxWidth: '100%' },
  iconWrap: { position: 'relative', width: 72, height: 72, margin: '0 auto 22px' },
  iconRing: {
    position: 'absolute', inset: -6, borderRadius: '50%',
    border: '2px solid var(--color-highlight)', opacity: 0.5,
  },
  icon: {
    width: 72, height: 72,
    background: 'var(--color-highlight)',
    color: 'var(--color-on-highlight)', borderRadius: '50%', fontSize: 30, fontWeight: 900,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: 'var(--shadow-raised)',
  },
  title: { fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 700, color: 'var(--color-heading)', marginBottom: 10, lineHeight: 1.2 },
  msg: { color: 'var(--color-text-muted)', fontSize: 15, lineHeight: 1.7, marginBottom: 26, fontWeight: 600 },
  // Colores en Encuesta.css (.encuesta-btn-primary)
  btn: {
    borderRadius: 12,
    padding: '16px 32px', fontSize: 16, fontWeight: 900,
    fontFamily: 'Manrope, sans-serif', width: '100%',
    minHeight: 52,
  },
}

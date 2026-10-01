import { useLocation, useNavigate } from 'react-router-dom'
import encuestas from '../encuestas/index.js'

export default function Gracias() {
  const location = useLocation()
  const navigate = useNavigate()
  const encuesta = encuestas.find((e) => e.titulo === location.state?.titulo)
  // Solo se afirma el anonimato si la encuesta no pide el nombre de quien responde.
  const anonima = encuesta ? !encuesta.preguntas.some((p) => p.id === 'nombre') : false

  return (
    <div style={s.page} className="encuesta-page">
      <div style={s.bg} />
      <main style={s.card}>
        <img src="/logo-claro.png" alt="Grupo Friopacking" style={s.logo} />
        <div style={s.iconWrap} aria-hidden="true">
          <div style={s.iconRing} />
          <div style={s.icon}>✓</div>
        </div>
        <h1 style={s.title}>¡Gracias por tu tiempo!</h1>
        <p style={s.msg}>
          {anonima
            ? 'Tus respuestas son anónimas y nos ayudarán a mejorar el servicio entre áreas.'
            : 'Tus respuestas nos ayudarán a mejorar.'}
        </p>
        <button onClick={() => navigate('/')} style={s.btn} className="encuesta-nav-btn encuesta-btn-primary">Volver al inicio</button>
      </main>
    </div>
  )
}

const s = {
  page: {
    minHeight: '100vh', minHeight: '100dvh',
    background: 'linear-gradient(135deg, var(--color-brand-dark) 0%, var(--color-brand) 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '24px 20px',
    position: 'relative', overflow: 'hidden',
    paddingTop: 'calc(24px + env(safe-area-inset-top))',
    paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
  },
  bg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 30% 70%, var(--color-accent-glow) 0%, transparent 60%)',
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
    border: '2px solid var(--color-accent)', opacity: 0.5,
  },
  icon: {
    width: 72, height: 72,
    background: 'var(--color-brand)',
    color: 'var(--color-on-brand)', borderRadius: '50%', fontSize: 30, fontWeight: 900,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: 'var(--shadow-raised)',
  },
  title: { fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 700, color: 'var(--color-brand-dark)', marginBottom: 10, lineHeight: 1.2 },
  msg: { color: 'var(--color-text-muted)', fontSize: 15, lineHeight: 1.7, marginBottom: 26, fontWeight: 600 },
  // Colores en Encuesta.css (.encuesta-btn-primary)
  btn: {
    borderRadius: 12,
    padding: '16px 32px', fontSize: 16, fontWeight: 900,
    fontFamily: 'Manrope, sans-serif', width: '100%',
    minHeight: 52,
  },
}

import { useLocation, useNavigate } from 'react-router-dom'

export default function Gracias() {
  const location = useLocation()
  const navigate = useNavigate()
  const titulo = location.state?.titulo || 'la evaluación'

  return (
    <div style={s.page}>
      <div style={s.bg} />
      <div style={s.card}>
        <div style={s.iconWrap}>
          <div style={s.iconRing} />
          <div style={s.icon}>✓</div>
        </div>
        <h1 style={s.title}>¡Gracias por tu respuesta!</h1>
        <p style={s.msg}>
          Tu evaluación <strong style={{ color: 'var(--navy)' }}>{titulo}</strong> fue registrada correctamente.
        </p>
        <div style={s.divider} />
        <img src="/logo-claro.png" alt="Grupo Friopacking" style={s.logo} />
        <button onClick={() => navigate('/')} style={s.btn}>Volver al inicio</button>
      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: '100vh', minHeight: '100dvh',
    background: 'linear-gradient(135deg, #132050 0%, #1B2D6B 60%, #243a8a 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '24px 20px',
    position: 'relative', overflow: 'hidden',
    paddingTop: 'calc(24px + env(safe-area-inset-top))',
    paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
  },
  bg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 30% 70%, rgba(62,200,180,0.15) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  card: {
    background: 'white', borderRadius: 20, padding: '44px 28px',
    textAlign: 'center', maxWidth: 420, width: '100%',
    boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
    position: 'relative',
  },
  iconWrap: { position: 'relative', width: 72, height: 72, margin: '0 auto 24px' },
  iconRing: {
    position: 'absolute', inset: -6, borderRadius: '50%',
    border: '2px solid var(--teal)', opacity: 0.3,
  },
  icon: {
    width: 72, height: 72,
    background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)',
    color: 'white', borderRadius: '50%', fontSize: 30, fontWeight: 900,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(62,200,180,0.4)',
  },
  title: { fontSize: 24, fontWeight: 900, color: 'var(--navy)', marginBottom: 10, lineHeight: 1.2 },
  msg: { color: 'var(--gray-500)', fontSize: 15, lineHeight: 1.7, marginBottom: 24, fontWeight: 600 },
  divider: { height: 1, background: 'var(--gray-100)', marginBottom: 22 },
  logo: { height: 36, objectFit: 'contain', marginBottom: 22, opacity: 0.85, maxWidth: '100%' },
  btn: {
    background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)',
    color: 'white', border: 'none', borderRadius: 12,
    padding: '16px 32px', fontSize: 16, fontWeight: 900,
    cursor: 'pointer', fontFamily: 'Nunito, sans-serif', width: '100%',
    boxShadow: '0 4px 16px rgba(27,45,107,0.3)', minHeight: 52,
  },
}

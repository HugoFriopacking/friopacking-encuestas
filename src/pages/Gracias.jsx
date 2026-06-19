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
        <p style={s.msg}>Tu evaluación <strong style={{ color: 'var(--navy)' }}>{titulo}</strong> fue registrada correctamente.</p>
        <div style={s.divider} />
        <img src="/logo-claro.png" alt="Grupo Friopacking" style={s.logo} />
        <button onClick={() => navigate('/')} style={s.btn}>
          Volver al inicio
        </button>
      </div>
    </div>
  )
}

const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 60%, var(--navy-mid) 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    position: 'relative', overflow: 'hidden',
  },
  bg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 30% 70%, rgba(62,200,180,0.15) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  card: {
    background: 'white', borderRadius: 20, padding: '52px 44px',
    textAlign: 'center', maxWidth: 460, width: '100%',
    boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
    position: 'relative',
  },
  iconWrap: { position: 'relative', width: 80, height: 80, margin: '0 auto 28px' },
  iconRing: {
    position: 'absolute', inset: -6, borderRadius: '50%',
    border: '2px solid var(--teal)', opacity: 0.3,
  },
  icon: {
    width: 80, height: 80, background: 'linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%)',
    color: 'white', borderRadius: '50%', fontSize: 34, fontWeight: 900,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(62,200,180,0.4)',
  },
  title: { fontSize: 26, fontWeight: 900, color: 'var(--navy)', marginBottom: 12, lineHeight: 1.2 },
  msg: { color: 'var(--gray-500)', fontSize: 16, lineHeight: 1.7, marginBottom: 28, fontWeight: 600 },
  divider: { height: 1, background: 'var(--gray-100)', marginBottom: 24 },
  logo: { height: 40, objectFit: 'contain', marginBottom: 24, opacity: 0.85 },
  btn: {
    background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)',
    color: 'white', border: 'none', borderRadius: 12,
    padding: '14px 32px', fontSize: 16, fontWeight: 900,
    cursor: 'pointer', fontFamily: 'Nunito, sans-serif', width: '100%',
    boxShadow: '0 4px 16px rgba(27,45,107,0.3)',
  },
}

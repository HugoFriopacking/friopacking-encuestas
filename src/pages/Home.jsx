import { useNavigate } from 'react-router-dom'

export default function Home() {
  return (
    <div style={s.page}>
      <div style={s.bg} />
      <div style={s.card}>
        <img src="/logo-oscuro.png" alt="Grupo Friopacking" style={s.logo} />
        <div style={s.iconWrap}>
          <span style={s.lockIcon}>🔒</span>
        </div>
        <h1 style={s.title}>Acceso restringido</h1>
        <p style={s.msg}>
          Para acceder a tu evaluación, utiliza el enlace específico que te fue proporcionado por tu supervisor o el área de SSOMA.
        </p>
        <div style={s.divider} />
        <p style={s.hint}>¿No tienes tu enlace? Contacta al área responsable.</p>
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
  },
  bg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 30% 70%, rgba(62,200,180,0.12) 0%, transparent 60%)',
    pointerEvents: 'none',
  },
  card: {
    background: 'white', borderRadius: 20, padding: '40px 28px',
    textAlign: 'center', maxWidth: 420, width: '100%',
    boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
    position: 'relative',
  },
  logo: { height: 40, objectFit: 'contain', marginBottom: 24, opacity: 0.85, maxWidth: '100%' },
  iconWrap: { marginBottom: 16 },
  lockIcon: { fontSize: 44 },
  title: { fontSize: 22, fontWeight: 900, color: '#1B2D6B', marginBottom: 12, lineHeight: 1.2 },
  msg: { color: '#6b7a99', fontSize: 15, lineHeight: 1.7, fontWeight: 600, marginBottom: 20 },
  divider: { height: 1, background: '#e8ecf5', marginBottom: 16 },
  hint: { color: '#c8cfe0', fontSize: 13, fontWeight: 600 },
}

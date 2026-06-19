import { useLocation, useNavigate } from 'react-router-dom'

export default function Gracias() {
  const location = useLocation()
  const navigate = useNavigate()
  const titulo = location.state?.titulo || 'la evaluación'

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>✓</div>
        <h1 style={styles.title}>¡Gracias por tu respuesta!</h1>
        <p style={styles.msg}>Tu evaluación <strong>{titulo}</strong> fue enviada correctamente.</p>
        <button onClick={() => navigate('/')} style={styles.btn}>Volver al inicio</button>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh', background: 'var(--gray-50)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  card: {
    background: 'white', borderRadius: 'var(--radius)', padding: '48px 40px',
    boxShadow: 'var(--shadow)', textAlign: 'center', maxWidth: 420, width: '100%',
  },
  icon: {
    width: 64, height: 64, background: 'var(--teal)', color: 'white',
    borderRadius: '50%', fontSize: 28, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 24px',
  },
  title: { fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 },
  msg: { color: 'var(--gray-500)', fontSize: 15, lineHeight: 1.6, marginBottom: 28 },
  btn: {
    background: 'var(--navy)', color: 'white', border: 'none',
    borderRadius: 8, padding: '12px 28px', fontSize: 14, fontWeight: 600,
    cursor: 'pointer',
  },
}

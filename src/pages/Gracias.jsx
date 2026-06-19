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
        <img src="/logo-claro.png" alt="Grupo Friopacking" style={styles.logo} />
        <button onClick={() => navigate('/')} style={styles.btn}>Volver al inicio</button>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh', background: 'var(--navy)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  card: {
    background: 'white', borderRadius: 16, padding: '52px 44px',
    textAlign: 'center', maxWidth: 440, width: '100%',
    boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
  },
  icon: {
    width: 72, height: 72, background: 'var(--teal)', color: 'white',
    borderRadius: '50%', fontSize: 32, fontWeight: 900,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 24px',
  },
  title: { fontSize: 26, fontWeight: 900, color: 'var(--navy)', marginBottom: 12 },
  msg: { color: 'var(--gray-500)', fontSize: 16, lineHeight: 1.6, marginBottom: 28, fontWeight: 600 },
  logo: { height: 44, objectFit: 'contain', marginBottom: 28 },
  btn: {
    background: 'var(--navy)', color: 'white', border: 'none',
    borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 800,
    cursor: 'pointer', fontFamily: 'Nunito, sans-serif', width: '100%',
  },
}

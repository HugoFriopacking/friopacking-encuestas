import { Link } from 'react-router-dom'
import encuestas from '../encuestas/index.js'

export default function Home() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logoArea}>
            <div style={styles.logoIcon}>❄</div>
            <div>
              <div style={styles.logoText}>Grupo Friopacking</div>
              <div style={styles.logoSub}>Portal de Evaluaciones</div>
            </div>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Evaluaciones disponibles</h1>
        <p style={styles.subtitle}>Selecciona la evaluación que debes completar</p>

        <div style={styles.grid}>
          {encuestas.map((enc) => (
            <Link key={enc.id} to={`/encuesta/${enc.id}`} style={styles.card}>
              <div style={styles.cardTag}>
                {enc.respondedor === 'interno' ? 'Personal interno' : enc.respondedor === 'externo' ? 'Clientes' : 'Ambos'}
              </div>
              <h2 style={styles.cardTitle}>{enc.titulo}</h2>
              <p style={styles.cardDesc}>{enc.descripcion}</p>
              <div style={styles.cardFooter}>
                <span style={styles.cardCount}>{enc.preguntas.length} preguntas</span>
                <span style={styles.cardArrow}>Iniciar →</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--gray-50)' },
  header: { background: 'var(--navy)', padding: '0' },
  headerInner: { maxWidth: 800, margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center' },
  logoArea: { display: 'flex', alignItems: 'center', gap: 14 },
  logoIcon: { fontSize: 32, color: 'var(--teal)' },
  logoText: { color: 'white', fontWeight: 700, fontSize: 18, lineHeight: 1.2 },
  logoSub: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 },
  main: { maxWidth: 800, margin: '0 auto', padding: '40px 24px' },
  title: { fontSize: 26, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 },
  subtitle: { color: 'var(--gray-500)', fontSize: 15, marginBottom: 32 },
  grid: { display: 'grid', gap: 16 },
  card: {
    background: 'white', borderRadius: 'var(--radius)', padding: '24px',
    boxShadow: 'var(--shadow)', border: '1.5px solid transparent',
    display: 'block', transition: 'border-color 0.15s, box-shadow 0.15s',
    cursor: 'pointer',
    ':hover': { borderColor: 'var(--teal)' },
  },
  cardTag: {
    display: 'inline-block', background: 'var(--teal-light)', color: 'var(--navy)',
    fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
    marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em',
  },
  cardTitle: { fontSize: 17, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 },
  cardDesc: { color: 'var(--gray-500)', fontSize: 14, lineHeight: 1.5, marginBottom: 16 },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardCount: { fontSize: 13, color: 'var(--gray-500)' },
  cardArrow: { fontSize: 14, fontWeight: 600, color: 'var(--teal)' },
}

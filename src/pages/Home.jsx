import { Link } from 'react-router-dom'
import { encuestasActivas } from '../encuestas/index.js'

export default function Home() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <img src="/logo-oscuro.png" alt="Grupo Friopacking" style={styles.logo} />
          <div style={styles.headerSubtitle}>Portal de Evaluaciones</div>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Evaluaciones disponibles</h1>
        <p style={styles.subtitle}>Selecciona la evaluación que debes completar</p>

        <div style={styles.grid}>
          {encuestasActivas.map((enc) => (
            <Link key={enc.id} to={`/encuesta/${enc.id}`} style={styles.card}>
              <div style={styles.cardTag}>
                {enc.respondedor === 'interno' ? 'Personal interno' : enc.respondedor === 'externo' ? 'Contratistas' : 'Ambos'}
              </div>
              <h2 style={styles.cardTitle}>{enc.titulo}</h2>
              <p style={styles.cardDesc}>{enc.descripcion}</p>
              <div style={styles.cardFooter}>
                <span style={styles.cardCount}>
                  {enc.preguntas.filter(p => p.tipo === 'escala').length > 0
                    ? `${enc.preguntas.filter(p => p.tipo === 'escala').length} preguntas de evaluación`
                    : 'Próximamente'}
                </span>
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
  headerInner: {
    maxWidth: 860, margin: '0 auto', padding: '20px 28px',
    display: 'flex', alignItems: 'center', gap: 20, flexDirection: 'column',
  },
  logo: { height: 56, objectFit: 'contain' },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: 600,
    letterSpacing: '0.04em', textTransform: 'uppercase',
  },
  main: { maxWidth: 860, margin: '0 auto', padding: '44px 28px 60px' },
  title: { fontSize: 30, fontWeight: 900, color: 'var(--navy)', marginBottom: 8 },
  subtitle: { color: 'var(--gray-500)', fontSize: 17, marginBottom: 36, fontWeight: 600 },
  grid: { display: 'grid', gap: 20 },
  card: {
    background: 'white', borderRadius: 'var(--radius)', padding: '28px',
    boxShadow: 'var(--shadow)', border: '2px solid transparent',
    display: 'block', transition: 'border-color 0.15s',
    cursor: 'pointer',
  },
  cardTag: {
    display: 'inline-block', background: 'var(--teal-light)', color: 'var(--navy)',
    fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: 20,
    marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em',
  },
  cardTitle: { fontSize: 20, fontWeight: 900, color: 'var(--navy)', marginBottom: 8 },
  cardDesc: { color: 'var(--gray-500)', fontSize: 15, lineHeight: 1.6, marginBottom: 20, fontWeight: 600 },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardCount: { fontSize: 14, color: 'var(--gray-500)', fontWeight: 600 },
  cardArrow: { fontSize: 15, fontWeight: 800, color: 'var(--teal)' },
}

import { Link } from 'react-router-dom'
import { encuestasActivas } from '../encuestas/index.js'

const tagColors = {
  interno: { bg: '#e8f0fe', color: '#1B2D6B' },
  externo: { bg: '#e6f9f6', color: '#1a7a6e' },
  ambos:   { bg: '#fef3e2', color: '#92400e' },
}

export default function Home() {
  return (
    <div style={s.page}>

      {/* HEADER */}
      <header style={s.header}>
        <div style={s.headerBg} />
        <div style={s.headerInner}>
          <img src="/logo-oscuro.png" alt="Grupo Friopacking" style={s.logo} />
          <div style={s.headerPill}>Portal de Evaluaciones</div>
        </div>
      </header>

      {/* HERO */}
      <div style={s.hero}>
        <div style={s.heroInner}>
          <h1 style={s.heroTitle}>Evaluaciones de Desempeño</h1>
          <p style={s.heroSub}>Selecciona la evaluación que debes completar. Tus respuestas son confidenciales.</p>
          <div style={s.heroBadge}>
            <span style={s.heroDot} />
            {encuestasActivas.length} evaluación{encuestasActivas.length !== 1 ? 'es' : ''} disponible{encuestasActivas.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* CARDS */}
      <main style={s.main}>
        <div style={s.grid}>
          {encuestasActivas.map((enc, i) => {
            const tag = tagColors[enc.respondedor] || tagColors.ambos
            const escalaCount = enc.preguntas.filter(p => p.tipo === 'escala').length
            return (
              <Link key={enc.id} to={`/encuesta/${enc.id}`} style={s.card}>
                <div style={s.cardTop}>
                  <span style={{ ...s.cardTag, background: tag.bg, color: tag.color }}>
                    {enc.respondedor === 'interno' ? '👷 Personal interno' : enc.respondedor === 'externo' ? '🏗 Contratistas' : '👥 Ambos'}
                  </span>
                  <span style={s.cardNum}>#{String(i+1).padStart(2,'0')}</span>
                </div>
                <h2 style={s.cardTitle}>{enc.titulo}</h2>
                <p style={s.cardDesc}>{enc.descripcion}</p>
                <div style={s.cardDivider} />
                <div style={s.cardFooter}>
                  <div style={s.cardMeta}>
                    <span style={s.cardMetaItem}>
                      <span style={s.metaIcon}>📋</span>
                      {escalaCount > 0 ? `${escalaCount} preguntas` : 'Próximamente'}
                    </span>
                    {enc.leyenda && (
                      <span style={s.cardMetaItem}>
                        <span style={s.metaIcon}>⭐</span>
                        Escala 1–10
                      </span>
                    )}
                  </div>
                  <div style={s.cardCta}>
                    Iniciar
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={s.footer}>
        <img src="/logo-claro.png" alt="Grupo Friopacking" style={s.footerLogo} />
        <p style={s.footerText}>© {new Date().getFullYear()} Grupo Friopacking — Uso interno</p>
      </footer>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: 'var(--gray-50)', display: 'flex', flexDirection: 'column' },

  // Header
  header: { background: 'var(--navy)', position: 'relative', overflow: 'hidden' },
  headerBg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 80% 50%, rgba(62,200,180,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  headerInner: {
    maxWidth: 900, margin: '0 auto', padding: '18px 32px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    position: 'relative',
  },
  logo: { height: 48, objectFit: 'contain' },
  headerPill: {
    background: 'rgba(62,200,180,0.18)', color: 'var(--teal)',
    fontSize: 12, fontWeight: 800, padding: '6px 16px',
    borderRadius: 20, letterSpacing: '0.08em', textTransform: 'uppercase',
    border: '1px solid rgba(62,200,180,0.3)',
  },

  // Hero
  hero: {
    background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 50%, var(--navy-mid) 100%)',
    paddingBottom: 48,
  },
  heroInner: { maxWidth: 900, margin: '0 auto', padding: '44px 32px 0' },
  heroTitle: {
    fontSize: 36, fontWeight: 900, color: 'white',
    lineHeight: 1.15, marginBottom: 12,
    textShadow: '0 2px 12px rgba(0,0,0,0.2)',
  },
  heroSub: {
    fontSize: 17, color: 'rgba(255,255,255,0.72)', fontWeight: 600,
    maxWidth: 540, lineHeight: 1.6, marginBottom: 24,
  },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)',
    fontSize: 13, fontWeight: 700, padding: '7px 16px', borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.15)',
  },
  heroDot: {
    width: 8, height: 8, borderRadius: '50%',
    background: 'var(--teal)', display: 'inline-block',
    boxShadow: '0 0 8px var(--teal)',
  },

  // Cards
  main: {
    maxWidth: 900, margin: '-28px auto 0', padding: '0 32px 60px',
    flex: 1, position: 'relative', zIndex: 1,
  },
  grid: { display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))' },
  card: {
    background: 'white', borderRadius: 'var(--radius)', padding: '28px',
    boxShadow: 'var(--shadow)', border: '1.5px solid rgba(27,45,107,0.07)',
    display: 'flex', flexDirection: 'column', gap: 0,
    transition: 'transform 0.18s, box-shadow 0.18s, border-color 0.18s',
    cursor: 'pointer',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTag: {
    fontSize: 12, fontWeight: 800, padding: '5px 12px',
    borderRadius: 20, letterSpacing: '0.03em',
  },
  cardNum: { fontSize: 12, fontWeight: 800, color: 'var(--gray-300)', letterSpacing: '0.05em' },
  cardTitle: { fontSize: 20, fontWeight: 900, color: 'var(--navy)', marginBottom: 8, lineHeight: 1.3 },
  cardDesc: { fontSize: 14, color: 'var(--gray-500)', fontWeight: 600, lineHeight: 1.6, marginBottom: 20, flex: 1 },
  cardDivider: { height: 1, background: 'var(--gray-100)', marginBottom: 16 },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardMeta: { display: 'flex', gap: 14 },
  cardMetaItem: { fontSize: 13, color: 'var(--gray-500)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 },
  metaIcon: { fontSize: 14 },
  cardCta: {
    display: 'flex', alignItems: 'center', gap: 6,
    background: 'var(--navy)', color: 'white',
    fontSize: 13, fontWeight: 800, padding: '8px 16px',
    borderRadius: 8, letterSpacing: '0.02em',
  },

  // Footer
  footer: {
    background: 'var(--navy)', padding: '28px 32px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
  },
  footerLogo: { height: 36, objectFit: 'contain', opacity: 0.85 },
  footerText: { color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600 },
}

import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import encuestas from '../encuestas/index.js'
import { supabase } from '../lib/supabase.js'
import { scaleColor } from '../lib/escalaColor.js'

const NOMBRE_CAMPO = {
  supervisor: 'supervisores',
  contratista: 'contratistas',
  lider: 'líderes',
}

function agruparEncuestasPorMes(lista) {
  const grupos = new Map()
  lista.forEach((enc) => {
    const mes = enc.mes || 'Otras'
    if (!grupos.has(mes)) grupos.set(mes, [])
    grupos.get(mes).push(enc)
  })
  return Array.from(grupos.entries())
}

export default function Resultados() {
  const [encuestaId, setEncuestaId] = useState(encuestas[encuestas.length - 1]?.id || '')
  const [filas, setFilas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const encuesta = encuestas.find((e) => e.id === encuestaId)

  useEffect(() => {
    if (!encuestaId) return
    let cancelado = false
    setLoading(true)
    setError(null)
    supabase
      .from('respuestas')
      .select('*')
      .eq('encuesta_id', encuestaId)
      .order('enviado_en', { ascending: false })
      .then(({ data, error: sbError }) => {
        if (cancelado) return
        if (sbError) {
          setError('No se pudieron cargar los resultados.')
          setFilas([])
        } else {
          setFilas(data || [])
        }
        setLoading(false)
      })
    return () => { cancelado = true }
  }, [encuestaId])

  const stats = useMemo(() => {
    if (!encuesta) return null
    const preguntasEscala = encuesta.preguntas.filter((p) => p.tipo === 'escala')
    const preguntasAbiertas = encuesta.preguntas.filter((p) => p.tipo === 'texto' && p.requerida === false)
    const totalRespuestas = filas.length

    const valoresGenerales = []
    const porPregunta = preguntasEscala.map((p) => {
      const valores = filas.map((f) => f.respuestas?.[p.id]).filter((v) => typeof v === 'number')
      valoresGenerales.push(...valores)
      const promedio = valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : null
      return { id: p.id, texto: p.texto, promedio, cantidad: valores.length }
    })

    const promedioGeneral = valoresGenerales.length
      ? valoresGenerales.reduce((a, b) => a + b, 0) / valoresGenerales.length
      : null

    let ranking = null
    if (encuesta.campoEvaluado) {
      const grupos = new Map()
      filas.forEach((f) => {
        const crudo = f.respuestas?.[encuesta.campoEvaluado]
        const nombre = (crudo || '').toString().trim() || 'Sin especificar'
        if (!grupos.has(nombre)) grupos.set(nombre, [])
        grupos.get(nombre).push(f)
      })
      ranking = Array.from(grupos.entries())
        .map(([nombre, filasGrupo]) => {
          const valores = []
          filasGrupo.forEach((f) => preguntasEscala.forEach((p) => {
            const v = f.respuestas?.[p.id]
            if (typeof v === 'number') valores.push(v)
          }))
          const promedio = valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0
          return { nombre, cantidad: filasGrupo.length, promedio }
        })
        .sort((a, b) => b.promedio - a.promedio)
    }

    const comentarios = preguntasAbiertas.map((p) => ({
      id: p.id,
      texto: p.texto,
      respuestas: filas
        .map((f) => ({
          valor: (f.respuestas?.[p.id] || '').toString().trim(),
          evaluado: encuesta.campoEvaluado ? f.respuestas?.[encuesta.campoEvaluado] : null,
        }))
        .filter((r) => r.valor),
    }))

    return { totalRespuestas, promedioGeneral, porPregunta, ranking, comentarios }
  }, [encuesta, filas])

  const gruposEncuestas = agruparEncuestasPorMes(encuestas)

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.headerInner}>
          <Link to="/" style={s.backBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Inicio
          </Link>
          <img src="/logo-oscuro.png" alt="Grupo Friopacking" style={s.logo} />
        </div>
      </header>

      <main style={s.main}>
        <h1 style={s.title}>Resultados y ranking</h1>
        <p style={s.subtitle}>Promedios y ranking según las respuestas recibidas en cada evaluación.</p>

        <div style={s.selectorWrap}>
          <label style={s.selectorLabel}>Encuesta</label>
          <select style={s.select} value={encuestaId} onChange={(e) => setEncuestaId(e.target.value)}>
            {gruposEncuestas.map(([mes, lista]) => (
              <optgroup key={mes} label={mes}>
                {lista.map((enc) => (
                  <option key={enc.id} value={enc.id}>{enc.titulo}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {loading && <p style={s.info}>Cargando resultados...</p>}
        {error && <p style={s.errorMsg}>{error}</p>}

        {!loading && !error && stats && (
          <>
            <div style={s.statsRow}>
              <div style={s.statCard}>
                <div style={s.statValue}>{stats.totalRespuestas}</div>
                <div style={s.statLabel}>Respuestas recibidas</div>
              </div>
              {stats.promedioGeneral != null && (
                <div style={s.statCard}>
                  <div style={{ ...s.statValue, color: scaleColor(stats.promedioGeneral).text }}>
                    {stats.promedioGeneral.toFixed(1)}
                  </div>
                  <div style={s.statLabel}>Promedio general (de 10)</div>
                </div>
              )}
            </div>

            {stats.totalRespuestas === 0 && (
              <div style={s.empty}>Aún no hay respuestas registradas para esta evaluación.</div>
            )}

            {stats.ranking && stats.ranking.length > 0 && (
              <section style={s.section}>
                <h2 style={s.sectionTitle}>
                  Ranking — {NOMBRE_CAMPO[encuesta.campoEvaluado] || 'evaluados'}
                </h2>
                <div style={s.barList}>
                  {stats.ranking.map((r, i) => {
                    const col = scaleColor(r.promedio)
                    return (
                      <div key={r.nombre} style={s.barRow}>
                        <div style={s.barRowTop}>
                          <span style={s.barRank}>#{i + 1}</span>
                          <span style={s.barName}>{r.nombre}</span>
                          <span style={s.barCount}>{r.cantidad} resp.</span>
                          <span style={{ ...s.barValue, color: col.text }}>{r.promedio.toFixed(1)}</span>
                        </div>
                        <div style={s.barTrack}>
                          <div style={{ ...s.barFill, width: `${r.promedio * 10}%`, background: col.active }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {stats.porPregunta.length > 0 && (
              <section style={s.section}>
                <h2 style={s.sectionTitle}>Promedio por pregunta</h2>
                <div style={s.barList}>
                  {stats.porPregunta.map((p, i) => {
                    if (p.promedio == null) return null
                    const col = scaleColor(p.promedio)
                    return (
                      <div key={p.id} style={s.barRow}>
                        <div style={s.barRowTop}>
                          <span style={s.barQNum}>{i + 1}</span>
                          <span style={s.barQTexto}>{p.texto}</span>
                          <span style={{ ...s.barValue, color: col.text }}>{p.promedio.toFixed(1)}</span>
                        </div>
                        <div style={s.barTrack}>
                          <div style={{ ...s.barFill, width: `${p.promedio * 10}%`, background: col.active }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {stats.comentarios.some((c) => c.respuestas.length > 0) && (
              <section style={s.section}>
                <h2 style={s.sectionTitle}>Comentarios abiertos</h2>
                {stats.comentarios.filter((c) => c.respuestas.length > 0).map((c) => (
                  <div key={c.id} style={s.comentarioBloque}>
                    <div style={s.comentarioPregunta}>{c.texto}</div>
                    <div style={s.comentarioLista}>
                      {c.respuestas.map((r, i) => (
                        <div key={i} style={s.comentarioCard}>
                          <p style={s.comentarioTexto}>"{r.valor}"</p>
                          {r.evaluado && <span style={s.comentarioMeta}>{r.evaluado}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', minHeight: '100dvh', background: '#EEF1F3' },
  header: {
    background: '#376B9E', position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
    paddingTop: 'env(safe-area-inset-top)',
  },
  headerInner: {
    maxWidth: 900, margin: '0 auto', padding: '13px 20px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  backBtn: {
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)',
    color: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 700,
    fontFamily: 'Manrope, sans-serif', padding: '8px 14px', borderRadius: 8,
    display: 'flex', alignItems: 'center', gap: 6, minHeight: 40,
    letterSpacing: '0.01em',
  },
  logo: { height: 34, objectFit: 'contain', maxWidth: 160 },

  main: { maxWidth: 820, margin: '0 auto', padding: '28px 16px 60px' },
  title: { fontFamily: 'Inter, sans-serif', fontSize: 24, fontWeight: 700, color: '#376B9E', marginBottom: 6 },
  subtitle: { color: '#5C7C93', fontSize: 14, fontWeight: 600, marginBottom: 20, lineHeight: 1.6 },

  selectorWrap: { marginBottom: 24 },
  selectorLabel: {
    display: 'block', fontSize: 11, fontWeight: 800, color: '#5C7C93',
    textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8,
  },
  select: {
    width: '100%', border: '1.5px solid #D4DADF', borderRadius: 8,
    padding: '13px 14px', fontSize: 15, fontFamily: 'Manrope, sans-serif',
    outline: 'none', color: '#1e293b', fontWeight: 600,
    background: 'white', minHeight: 48, cursor: 'pointer',
  },

  info: { color: '#5C7C93', fontSize: 14, fontWeight: 600 },
  errorMsg: {
    background: '#fef2f2', color: '#dc2626', border: '1.5px solid #fecaca',
    borderRadius: 8, padding: '13px 14px', fontSize: 14, fontWeight: 700,
  },
  empty: {
    background: 'white', borderRadius: 10, padding: '20px', textAlign: 'center',
    color: '#5C7C93', fontSize: 14, fontWeight: 600, border: '1px solid #D4DADF',
  },

  statsRow: { display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' },
  statCard: {
    background: 'white', borderRadius: 12, padding: '18px 22px', flex: '1 1 160px',
    boxShadow: '0 2px 10px rgba(55,107,158,0.08)', border: '1px solid #D4DADF',
  },
  statValue: { fontFamily: 'Inter, sans-serif', fontSize: 30, fontWeight: 700, color: '#376B9E', lineHeight: 1.1 },
  statLabel: { fontSize: 12, color: '#5C7C93', fontWeight: 700, marginTop: 4 },

  section: {
    background: 'white', borderRadius: 14, padding: '20px 18px',
    marginBottom: 20, border: '1px solid #D4DADF',
    boxShadow: '0 2px 10px rgba(55,107,158,0.06)',
  },
  sectionTitle: {
    fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 700, color: '#376B9E',
    marginBottom: 16, textTransform: 'capitalize',
  },

  barList: { display: 'flex', flexDirection: 'column', gap: 14 },
  barRow: {},
  barRowTop: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 },
  barRank: { fontSize: 12, fontWeight: 800, color: '#BFC5CC', minWidth: 22 },
  barName: { fontSize: 14, fontWeight: 700, color: '#1e293b', flex: 1 },
  barCount: { fontSize: 11, color: '#5C7C93', fontWeight: 700, whiteSpace: 'nowrap' },
  barQNum: {
    minWidth: 20, height: 20, background: '#D4DADF', color: '#376B9E',
    borderRadius: 5, fontSize: 11, fontWeight: 800,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  barQTexto: { fontSize: 13, fontWeight: 600, color: '#1e293b', flex: 1, lineHeight: 1.4 },
  barValue: { fontSize: 14, fontWeight: 800, whiteSpace: 'nowrap' },
  barTrack: { height: 8, background: '#EEF1F3', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4, transition: 'width 0.3s ease' },

  comentarioBloque: { marginBottom: 18 },
  comentarioPregunta: { fontSize: 13, fontWeight: 700, color: '#376B9E', marginBottom: 8 },
  comentarioLista: { display: 'flex', flexDirection: 'column', gap: 8 },
  comentarioCard: {
    background: '#F5F7F8', borderRadius: 8, padding: '10px 12px',
    border: '1px solid #D4DADF',
  },
  comentarioTexto: { fontSize: 13, color: '#334155', fontWeight: 600, lineHeight: 1.55, fontStyle: 'italic' },
  comentarioMeta: { fontSize: 11, color: '#5C7C93', fontWeight: 700, display: 'block', marginTop: 6 },
}

import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import encuestas from '../encuestas/index.js'
import { supabase } from '../lib/supabase.js'

export default function Encuesta() {
  const { id } = useParams()
  const navigate = useNavigate()
  const encuesta = encuestas.find((e) => e.id === id)

  const [respuestas, setRespuestas] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  if (!encuesta) {
    return (
      <div style={styles.page}>
        <div style={styles.notFound}>
          <h2 style={{ fontSize: 22, color: 'var(--navy)', marginBottom: 16 }}>Encuesta no encontrada</h2>
          <button onClick={() => navigate('/')} style={styles.btnBack}>← Volver al inicio</button>
        </div>
      </div>
    )
  }

  function handleChange(preguntaId, valor) {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: valor }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const faltantes = encuesta.preguntas.filter((p) => p.requerida && !respuestas[p.id])
    if (faltantes.length > 0) {
      setError('Por favor completa todos los campos obligatorios.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setEnviando(true)
    try {
      const { error: sbError } = await supabase.from('respuestas').insert({
        encuesta_id: encuesta.id,
        encuesta_titulo: encuesta.titulo,
        respuestas: respuestas,
        enviado_en: new Date().toISOString(),
      })
      if (sbError) throw sbError
      navigate('/gracias', { state: { titulo: encuesta.titulo } })
    } catch (err) {
      setError('Ocurrió un error al enviar. Por favor intenta de nuevo.')
      console.error(err)
    } finally {
      setEnviando(false)
    }
  }

  const preguntasEscala = encuesta.preguntas.filter(p => p.tipo === 'escala')

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <button onClick={() => navigate('/')} style={styles.backBtn}>← Inicio</button>
          <img src="/logo-oscuro.png" alt="Grupo Friopacking" style={styles.logo} />
        </div>
      </header>

      <main style={styles.main}>
        {/* Encabezado encuesta */}
        <div style={styles.encuestaHeader}>
          <h1 style={styles.title}>{encuesta.titulo}</h1>
          <p style={styles.desc}>{encuesta.descripcion}</p>

          {/* Leyenda */}
          {encuesta.leyenda && (
            <div style={styles.leyenda}>
              <span style={styles.leyendaIcon}>ℹ</span>
              <span><strong>Escala de calificación:</strong> {encuesta.leyenda}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div style={styles.errorMsg}>{error}</div>}

          {encuesta.preguntas.map((pregunta, idx) => (
            <div key={pregunta.id} style={styles.preguntaCard}>
              <label style={styles.preguntaLabel}>
                <span style={styles.preguntaNum}>{idx + 1}</span>
                {pregunta.texto}
                {pregunta.requerida && <span style={styles.requerida}> *</span>}
              </label>

              {pregunta.tipo === 'texto' && (
                <input
                  type="text"
                  style={styles.input}
                  value={respuestas[pregunta.id] || ''}
                  onChange={(e) => handleChange(pregunta.id, e.target.value)}
                  placeholder="Escribe aquí..."
                />
              )}

              {pregunta.tipo === 'escala' && (
                <div>
                  <div style={styles.escalaRow}>
                    {Array.from({ length: pregunta.max - pregunta.min + 1 }, (_, i) => i + pregunta.min).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleChange(pregunta.id, val)}
                        style={{
                          ...styles.escalaBtn,
                          ...(respuestas[pregunta.id] === val ? styles.escalaBtnActive : {}),
                          ...(val === 1 || val === 2 ? styles.escalaBtnBad : {}),
                          ...(val === 3 || val === 4 ? styles.escalaBtnLow : {}),
                          ...(val === 5 ? styles.escalaBtnMid : {}),
                          ...(val === 6 || val === 7 ? styles.escalaBtnGood : {}),
                          ...(val >= 8 ? styles.escalaBtnGreat : {}),
                          ...(respuestas[pregunta.id] === val ? styles.escalaBtnActive : {}),
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div style={styles.escalaEtiquetas}>
                    <span>😞 {pregunta.etiquetas[pregunta.min]}</span>
                    <span>{pregunta.etiquetas[pregunta.max]} 😊</span>
                  </div>
                </div>
              )}

              {pregunta.tipo === 'opcion_multiple' && (
                <div style={styles.opciones}>
                  {pregunta.opciones.map((op) => (
                    <label key={op} style={styles.opcionLabel}>
                      <input
                        type="radio"
                        name={pregunta.id}
                        value={op}
                        checked={respuestas[pregunta.id] === op}
                        onChange={() => handleChange(pregunta.id, op)}
                        style={styles.radio}
                      />
                      {op}
                    </label>
                  ))}
                </div>
              )}

              {pregunta.tipo === 'si_no' && (
                <div style={styles.opciones}>
                  {['Sí', 'No'].map((op) => (
                    <label key={op} style={styles.opcionLabel}>
                      <input
                        type="radio"
                        name={pregunta.id}
                        value={op}
                        checked={respuestas[pregunta.id] === op}
                        onChange={() => handleChange(pregunta.id, op)}
                        style={styles.radio}
                      />
                      {op}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          {error && <div style={styles.errorMsg}>{error}</div>}

          <button type="submit" disabled={enviando} style={styles.btnSubmit}>
            {enviando ? 'Enviando...' : 'Enviar evaluación'}
          </button>
        </form>
      </main>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--gray-50)' },
  header: { background: 'var(--navy)' },
  headerInner: {
    maxWidth: 760, margin: '0 auto', padding: '16px 28px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  backBtn: {
    background: 'none', border: 'none', color: 'rgba(255,255,255,0.75)',
    cursor: 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'Nunito, sans-serif', padding: 0,
  },
  logo: { height: 40, objectFit: 'contain' },
  main: { maxWidth: 760, margin: '0 auto', padding: '36px 28px 80px' },
  encuestaHeader: {
    background: 'white', borderRadius: 'var(--radius)', padding: '28px',
    marginBottom: 28, boxShadow: 'var(--shadow)',
    borderLeft: '5px solid var(--teal)',
  },
  title: { fontSize: 24, fontWeight: 900, color: 'var(--navy)', marginBottom: 8 },
  desc: { color: 'var(--gray-500)', fontSize: 16, fontWeight: 600, marginBottom: 16 },
  leyenda: {
    background: 'var(--teal-light)', borderRadius: 8, padding: '12px 16px',
    fontSize: 14, color: 'var(--navy)', display: 'flex', gap: 8, alignItems: 'flex-start',
    fontWeight: 600,
  },
  leyendaIcon: { fontSize: 16, flexShrink: 0 },
  preguntaCard: {
    background: 'white', borderRadius: 'var(--radius)', padding: '24px 28px',
    marginBottom: 16, boxShadow: 'var(--shadow)',
  },
  preguntaLabel: {
    display: 'flex', alignItems: 'flex-start', gap: 12,
    fontWeight: 800, color: 'var(--gray-700)', fontSize: 16,
    marginBottom: 18, lineHeight: 1.5,
  },
  preguntaNum: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minWidth: 28, height: 28, background: 'var(--navy)', color: 'white',
    borderRadius: '50%', fontSize: 13, fontWeight: 800, flexShrink: 0, marginTop: 1,
  },
  requerida: { color: 'var(--teal)', fontWeight: 900 },
  input: {
    width: '100%', border: '2px solid var(--gray-300)', borderRadius: 8,
    padding: '12px 16px', fontSize: 16, fontFamily: 'Nunito, sans-serif',
    outline: 'none', color: 'var(--gray-900)', fontWeight: 600,
  },
  opciones: { display: 'flex', flexDirection: 'column', gap: 12 },
  opcionLabel: {
    display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
    fontSize: 16, color: 'var(--gray-700)', fontWeight: 600,
  },
  radio: { accentColor: 'var(--teal)', width: 18, height: 18 },
  escalaRow: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  escalaBtn: {
    width: 52, height: 52, border: '2px solid var(--gray-300)',
    borderRadius: 10, background: 'white', cursor: 'pointer',
    fontSize: 17, fontWeight: 800, color: 'var(--gray-700)',
    transition: 'all 0.15s', fontFamily: 'Nunito, sans-serif',
  },
  escalaBtnBad: { borderColor: '#fca5a5', color: '#ef4444' },
  escalaBtnLow: { borderColor: '#fdba74', color: '#f97316' },
  escalaBtnMid: { borderColor: '#fde68a', color: '#d97706' },
  escalaBtnGood: { borderColor: '#86efac', color: '#16a34a' },
  escalaBtnGreat: { borderColor: '#6ee7b7', color: '#059669' },
  escalaBtnActive: {
    background: 'var(--navy)', color: 'white !important',
    borderColor: 'var(--navy)', transform: 'scale(1.1)',
  },
  escalaEtiquetas: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: 13, color: 'var(--gray-500)', marginTop: 10, fontWeight: 700,
  },
  errorMsg: {
    background: '#fef2f2', color: '#dc2626', border: '2px solid #fecaca',
    borderRadius: 10, padding: '14px 18px', fontSize: 15, marginBottom: 20, fontWeight: 700,
  },
  btnSubmit: {
    background: 'var(--navy)', color: 'white', border: 'none',
    borderRadius: 10, padding: '16px 32px', fontSize: 17, fontWeight: 800,
    cursor: 'pointer', width: '100%', marginTop: 12,
    fontFamily: 'Nunito, sans-serif', letterSpacing: '0.02em',
  },
  btnBack: {
    background: 'none', border: '2px solid var(--gray-300)',
    borderRadius: 8, padding: '10px 20px', cursor: 'pointer',
    fontSize: 15, color: 'var(--gray-700)', fontWeight: 700, marginTop: 16,
  },
  notFound: { textAlign: 'center', padding: '80px 24px' },
}

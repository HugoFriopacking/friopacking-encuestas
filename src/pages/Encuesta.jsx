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
          <h2>Encuesta no encontrada</h2>
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

    // Validar requeridas
    const faltantes = encuesta.preguntas
      .filter((p) => p.requerida && !respuestas[p.id])
      .map((p) => p.texto)

    if (faltantes.length > 0) {
      setError(`Por favor completa los campos obligatorios.`)
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

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <button onClick={() => navigate('/')} style={styles.backBtn}>← Inicio</button>
          <div style={styles.logoText}>Grupo Friopacking</div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.encuestaHeader}>
          <h1 style={styles.title}>{encuesta.titulo}</h1>
          <p style={styles.desc}>{encuesta.descripcion}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {encuesta.preguntas.map((pregunta, idx) => (
            <div key={pregunta.id} style={styles.preguntaCard}>
              <label style={styles.preguntaLabel}>
                <span style={styles.preguntaNum}>{idx + 1}</span>
                {pregunta.texto}
                {pregunta.requerida && <span style={styles.requerida}> *</span>}
              </label>

              {pregunta.tipo === 'texto' && (
                <textarea
                  style={styles.textarea}
                  rows={3}
                  value={respuestas[pregunta.id] || ''}
                  onChange={(e) => handleChange(pregunta.id, e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                />
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
                        }}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div style={styles.escalaEtiquetas}>
                    <span>{pregunta.etiquetas[pregunta.min]}</span>
                    <span>{pregunta.etiquetas[pregunta.max]}</span>
                  </div>
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
  header: { background: 'var(--navy)', padding: '0' },
  headerInner: {
    maxWidth: 700, margin: '0 auto', padding: '16px 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  backBtn: {
    background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)',
    cursor: 'pointer', fontSize: 14, padding: 0,
  },
  logoText: { color: 'white', fontWeight: 700, fontSize: 15 },
  main: { maxWidth: 700, margin: '0 auto', padding: '32px 24px 60px' },
  encuestaHeader: {
    background: 'white', borderRadius: 'var(--radius)', padding: '24px',
    marginBottom: 24, boxShadow: 'var(--shadow)',
    borderLeft: '4px solid var(--teal)',
  },
  title: { fontSize: 22, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 },
  desc: { color: 'var(--gray-500)', fontSize: 14 },
  preguntaCard: {
    background: 'white', borderRadius: 'var(--radius)', padding: '20px 24px',
    marginBottom: 16, boxShadow: 'var(--shadow)',
  },
  preguntaLabel: {
    display: 'block', fontWeight: 600, color: 'var(--gray-700)',
    fontSize: 15, marginBottom: 14, lineHeight: 1.4,
  },
  preguntaNum: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 24, height: 24, background: 'var(--teal-light)', color: 'var(--navy)',
    borderRadius: '50%', fontSize: 12, fontWeight: 700, marginRight: 10,
  },
  requerida: { color: 'var(--teal)', fontWeight: 700 },
  textarea: {
    width: '100%', border: '1.5px solid var(--gray-300)', borderRadius: 8,
    padding: '10px 14px', fontSize: 14, fontFamily: 'Inter, sans-serif',
    resize: 'vertical', outline: 'none', color: 'var(--gray-900)',
  },
  opciones: { display: 'flex', flexDirection: 'column', gap: 10 },
  opcionLabel: {
    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
    fontSize: 14, color: 'var(--gray-700)',
  },
  radio: { accentColor: 'var(--teal)', width: 16, height: 16 },
  escalaRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  escalaBtn: {
    width: 48, height: 48, border: '1.5px solid var(--gray-300)',
    borderRadius: 8, background: 'white', cursor: 'pointer',
    fontSize: 16, fontWeight: 600, color: 'var(--gray-700)',
    transition: 'all 0.15s',
  },
  escalaBtnActive: {
    background: 'var(--navy)', color: 'white',
    borderColor: 'var(--navy)',
  },
  escalaEtiquetas: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: 12, color: 'var(--gray-500)', marginTop: 8,
  },
  errorMsg: {
    background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
    borderRadius: 8, padding: '12px 16px', fontSize: 14, marginBottom: 16,
  },
  btnSubmit: {
    background: 'var(--navy)', color: 'white', border: 'none',
    borderRadius: 8, padding: '14px 32px', fontSize: 15, fontWeight: 600,
    cursor: 'pointer', width: '100%', marginTop: 8,
  },
  btnBack: {
    background: 'none', border: '1.5px solid var(--gray-300)',
    borderRadius: 8, padding: '10px 20px', cursor: 'pointer',
    fontSize: 14, color: 'var(--gray-700)', marginTop: 16,
  },
  notFound: { textAlign: 'center', padding: '80px 24px' },
}

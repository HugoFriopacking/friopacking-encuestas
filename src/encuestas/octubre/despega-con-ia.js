// Formulario de inscripción a la capacitación interna "Despega con IA" (La Central de IA).
// No es anónimo: pide nombre y empresa para reservar el cupo.
const encuesta = {
  id: 'despega-con-ia-inscripcion',
  titulo: 'Despega con IA — Inscripción',
  descripcion: 'Capacitación interna sobre el uso práctico de Claude y ChatGPT en el trabajo diario. Completa este formulario para reservar tu cupo.',
  respondedor: 'interno',
  activa: true,
  mes: 'Octubre',
  gracias: {
    titulo: '¡Listo, tu cupo está reservado!',
    mensaje: 'Gracias por inscribirte en Despega con IA. Te enviaremos la fecha y los detalles de la capacitación.',
  },
  preguntas: [
    { id: 'nombre', tipo: 'texto', texto: 'Nombre y apellido', requerida: true },
    {
      id: 'empresa', tipo: 'lista_desplegable', texto: 'Empresa', requerida: true,
      opciones: ['Friopacking Perú', 'Frioteam', 'Hermética', 'Smartcold', 'Friopacking Colombia', 'Friopacking México', 'Otra'],
    },
    {
      id: 'frecuencia_ia', tipo: 'opcion_multiple', texto: '¿Con qué frecuencia usas herramientas de IA en tu trabajo?', requerida: true,
      opciones: ['Nunca', 'Alguna vez', 'Semanal', 'Diario'],
    },
    {
      id: 'herramientas', tipo: 'seleccion_multiple', texto: '¿Qué herramientas has usado? (Elección múltiple)', requerida: true,
      opciones: ['ChatGPT', 'Claude', 'Copilot', 'Gemini', 'Ninguna', 'Otra'],
    },
    {
      id: 'licencia', tipo: 'opcion_multiple', texto: '¿Tienes licencia corporativa asignada?', requerida: true,
      opciones: ['Sí, de Claude', 'Sí, de ChatGPT', 'Ambas', 'No', 'No sé'],
    },
    {
      id: 'nivel_ia', tipo: 'escala', texto: '¿Cómo calificas tu nivel con IA?', requerida: true,
      min: 1, max: 10, etiquetas: { 1: 'Nunca la he usado', 10: 'La uso con soltura' },
    },
  ],
}

export default encuesta

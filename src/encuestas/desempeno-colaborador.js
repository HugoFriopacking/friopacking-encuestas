const encuesta = {
  id: 'desempeno-colaborador',
  titulo: 'Evaluación de Desempeño — Colaborador',
  descripcion: 'Autoevaluación de desempeño para colaboradores de Friopacking',
  respondedor: 'interno',
  preguntas: [
    { id: 'nombre', tipo: 'texto', texto: '¿Cuál es tu nombre completo?', requerida: true },
    {
      id: 'zona', tipo: 'opcion_multiple', texto: '¿En qué zona trabajas?', requerida: true,
      opciones: ['Norte — Trujillo', 'Centro — Lima', 'Sur — Ica'],
    },
    {
      id: 'cumplimiento_tareas', tipo: 'escala',
      texto: '¿Cómo evalúas tu cumplimiento de tareas y responsabilidades?',
      requerida: true, min: 1, max: 5, etiquetas: { 1: 'Muy bajo', 5: 'Excelente' },
    },
    {
      id: 'trabajo_equipo', tipo: 'escala',
      texto: '¿Cómo evalúas tu trabajo en equipo y colaboración?',
      requerida: true, min: 1, max: 5, etiquetas: { 1: 'Muy bajo', 5: 'Excelente' },
    },
    {
      id: 'puntualidad', tipo: 'escala',
      texto: '¿Cómo evalúas tu puntualidad y asistencia?',
      requerida: true, min: 1, max: 5, etiquetas: { 1: 'Muy bajo', 5: 'Excelente' },
    },
    {
      id: 'iniciativa', tipo: 'escala',
      texto: '¿Con qué frecuencia tomas iniciativa para resolver problemas?',
      requerida: true, min: 1, max: 5, etiquetas: { 1: 'Nunca', 5: 'Siempre' },
    },
    { id: 'logros', tipo: 'texto', texto: '¿Cuál consideras tu principal logro en este período?', requerida: false },
    { id: 'mejora', tipo: 'texto', texto: '¿En qué área te gustaría mejorar o recibir capacitación?', requerida: false },
  ],
}
export default encuesta

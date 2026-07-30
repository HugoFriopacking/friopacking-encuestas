const encuesta = {
  id: 'contratistas-friopacking-julio',
  titulo: 'Grupo Friopacking (Julio)',
  descripcion: 'Evaluación de los contratistas hacia las áreas de Grupo Friopacking',
  respondedor: 'externo',
  activa: true,
  mes: 'Julio',
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'Gerencia de Operaciones y PMO', icono: 'operaciones' },
    { id: 'p1', tipo: 'escala', texto: '¿Qué tan claro fue el alcance del proyecto comunicado antes de iniciar los trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2', tipo: 'escala', texto: '¿Qué tan adecuada fue la planificación del cronograma del proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3', tipo: 'escala', texto: '¿Qué tan oportuno fue el seguimiento al avance de los trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4', tipo: 'escala', texto: '¿Qué tan efectiva fue la coordinación entre Grupo Friopacking y su empresa durante el proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p5', tipo: 'escala', texto: '¿Qué tan oportuna fue la toma de decisiones ante los problemas presentados en obra?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Ingeniería', icono: 'ingenieria' },
    { id: 'p6', tipo: 'escala', texto: '¿Qué tan clara fue la información técnica entregada para ejecutar los trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p7', tipo: 'escala', texto: '¿Qué tan oportunas fueron las respuestas de Ingeniería ante las consultas técnicas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8', tipo: 'escala', texto: '¿Qué tan confiables fueron los planos entregados para la ejecución del proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p9', tipo: 'escala', texto: '¿Qué tan adecuadas fueron las soluciones técnicas propuestas ante los problemas encontrados en obra?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Logística', icono: 'logistica' },
    { id: 'p10', tipo: 'escala', texto: '¿Qué tan oportuna fue la entrega de los materiales requeridos para ejecutar los trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p11', tipo: 'escala', texto: '¿Qué tan clara fue la información proporcionada sobre las fechas de entrega?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿Qué tan adecuada fue la atención de los materiales faltantes o incompletos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p13', tipo: 'escala', texto: '¿Qué tan buena fue la condición de los materiales o equipos recibidos en obra?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Administración y Finanzas', icono: 'finanzas' },
    { id: 'p14', tipo: 'escala', texto: '¿Qué tan claros fueron los requisitos documentarios solicitados al contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿Qué tan eficiente fue la revisión de las valorizaciones presentadas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p16', tipo: 'escala', texto: '¿Qué tan oportunas fueron las respuestas a las consultas relacionadas con los pagos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's5', tipo: 'seccion', texto: 'Hermética', icono: 'hermetica' },
    { id: 'p17', tipo: 'escala', texto: '¿En qué medida la calidad de las puertas Hermética instaladas cumple con el estándar esperado por el cliente final?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's6', tipo: 'seccion', texto: 'Frioteam', icono: 'frioteam' },
    { id: 'p18', tipo: 'escala', texto: '¿En qué medida la calidad de los trabajos realizados por Frioteam mejora la percepción del proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p19', tipo: 'escala', texto: '¿Qué tanto la programación de las actividades de Frioteam evita interferencias con sus trabajos en campo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's7', tipo: 'seccion', texto: 'Pregunta abierta', icono: 'operaciones' },
    { id: 'p20', tipo: 'texto', texto: '¿Qué debería mejorar Grupo Friopacking para facilitar el trabajo de los contratistas?', requerida: false },
  ],
}
export default encuesta

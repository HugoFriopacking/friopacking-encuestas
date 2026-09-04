const encuesta = {
  id: 'contratistas-friopacking-agosto',
  titulo: 'Grupo Friopacking (Agosto)',
  descripcion: 'Evaluación de los contratistas sobre la coordinación, atención, soporte y cumplimiento de las áreas de Grupo Friopacking.',
  respondedor: 'externo',
  activa: true,
  mes: 'Agosto',
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'PMO / Gestión de Proyectos', icono: 'operaciones' },
    { id: 'p1', tipo: 'escala', texto: '¿Cómo califica la claridad de las indicaciones brindadas por PMO para ejecutar sus actividades?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2', tipo: 'escala', texto: '¿Cómo califica la coordinación realizada por PMO antes del inicio de los trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3', tipo: 'escala', texto: '¿Cómo califica el seguimiento de PMO durante la ejecución del servicio?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4', tipo: 'escala', texto: '¿Cómo califica la capacidad de PMO para resolver consultas o inconvenientes durante el proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p5', tipo: 'escala', texto: '¿Cómo califica la planificación de actividades, tiempos y prioridades comunicadas por PMO?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Administración y Finanzas', icono: 'finanzas' },
    { id: 'p6', tipo: 'escala', texto: '¿Cómo califica la claridad de los requisitos administrativos solicitados para prestar el servicio?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p7', tipo: 'escala', texto: '¿Cómo califica la atención recibida ante consultas sobre órdenes de compra, facturación o pagos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8', tipo: 'escala', texto: '¿Cómo califica el cumplimiento de los plazos administrativos relacionados con su servicio?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Ingeniería', icono: 'ingenieria' },
    { id: 'p9', tipo: 'escala', texto: '¿Cómo califica la claridad de la información técnica entregada por Ingeniería?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p10', tipo: 'escala', texto: '¿Cómo califica la disponibilidad de Ingeniería para resolver consultas técnicas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p11', tipo: 'escala', texto: '¿Cómo califica la precisión de los planos, especificaciones o requerimientos técnicos entregados?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿Cómo califica la coordinación de Ingeniería para evitar reprocesos durante la ejecución del servicio?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Logística', icono: 'logistica' },
    { id: 'p13', tipo: 'escala', texto: '¿Cómo califica la disponibilidad oportuna de materiales, equipos o recursos necesarios para su servicio?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p14', tipo: 'escala', texto: '¿Cómo califica la calidad de los materiales que se entregan?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿Cómo califica la atención de Logística ante consultas o incidencias relacionadas con materiales?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p16', tipo: 'escala', texto: '¿Cómo califica el cumplimiento de Logística en los tiempos acordados para atender requerimientos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's5', tipo: 'seccion', texto: 'Frioteam', icono: 'frioteam' },
    { id: 'p17', tipo: 'escala', texto: '¿Cómo califica la coordinación de Frioteam durante trabajos de puesta en marcha o mantenimientos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p18', tipo: 'escala', texto: '¿Cómo califica el soporte técnico brindado por Frioteam durante la ejecución del servicio?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p19', tipo: 'escala', texto: '¿Cómo califica la comunicación de Frioteam sobre condiciones técnicas, restricciones o requerimientos del servicio?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's6', tipo: 'seccion', texto: 'Hermética', icono: 'hermetica' },
    { id: 'p20', tipo: 'escala', texto: '¿Cómo califica el cumplimiento de Hermética respecto a los tiempos de entrega de los bienes solicitados?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
  ],
}
export default encuesta

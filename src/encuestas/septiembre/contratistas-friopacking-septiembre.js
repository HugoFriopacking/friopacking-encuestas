const encuesta = {
  id: 'contratistas-friopacking-septiembre',
  titulo: 'Grupo Friopacking (Septiembre)',
  descripcion: 'Evaluación de los contratistas hacia las áreas de Grupo Friopacking',
  respondedor: 'externo',
  activa: true,
  mes: 'Septiembre',
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'PMO / Gestión de Proyectos', icono: 'operaciones' },
    { id: 'p1', tipo: 'escala', texto: '¿Cómo califica la claridad de las indicaciones brindadas por PMO para ejecutar sus actividades?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2', tipo: 'escala', texto: '¿Cómo califica la coordinación y organización realizada por PMO antes del inicio de los trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3', tipo: 'escala', texto: '¿Cómo califica el seguimiento realizado por PMO durante la ejecución del servicio?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4', tipo: 'escala', texto: '¿Cómo califica la rapidez y efectividad de PMO para resolver consultas, inconvenientes o bloqueos durante el proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p5', tipo: 'escala', texto: '¿Cómo califica la planificación y comunicación de actividades, tiempos y prioridades por parte de PMO?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Administración y Finanzas', icono: 'finanzas' },
    { id: 'p6', tipo: 'escala', texto: '¿Cómo califica la claridad de los requisitos y procedimientos administrativos solicitados para prestar el servicio?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p7', tipo: 'escala', texto: '¿Cómo califica la atención y orientación recibida ante consultas sobre órdenes de compra, facturación o pagos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8', tipo: 'escala', texto: '¿Cómo califica el cumplimiento de los plazos administrativos y de pago acordados relacionados con su servicio?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Ingeniería', icono: 'ingenieria' },
    { id: 'p9', tipo: 'escala', texto: '¿Cómo califica la claridad y suficiencia de la información técnica entregada por Ingeniería para ejecutar correctamente los trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p10', tipo: 'escala', texto: '¿Cómo califica la disponibilidad y rapidez de respuesta de Ingeniería ante consultas técnicas durante la ejecución?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p11', tipo: 'escala', texto: '¿Cómo califica la precisión y consistencia de los planos, especificaciones y requerimientos técnicos entregados?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿Cómo califica la coordinación entre Ingeniería y el contratista para prevenir errores, incompatibilidades o retrabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Logística', icono: 'logistica' },
    { id: 'p13', tipo: 'escala', texto: '¿Cómo califica la disponibilidad oportuna de materiales, equipos y recursos necesarios para ejecutar sus trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p14', tipo: 'escala', texto: '¿Cómo califica la calidad y conformidad de los materiales o equipos entregados respecto a lo solicitado?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿Cómo califica la atención y capacidad de respuesta de Logística ante consultas, faltantes o incidencias con materiales?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p16', tipo: 'escala', texto: '¿Cómo califica el cumplimiento de Logística en las fechas y tiempos acordados para atender los requerimientos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's5', tipo: 'seccion', texto: 'Frioteam', icono: 'frioteam' },
    { id: 'p17', tipo: 'escala', texto: '¿Cómo califica la imagen y percepción profesional que proyecta Frioteam como empresa especializada en servicios técnicos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p18', tipo: 'escala', texto: '¿Cómo califica la percepción sobre la capacidad técnica y experiencia de Frioteam en los servicios que ofrece?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p19', tipo: 'escala', texto: '¿Cómo califica la percepción sobre la calidad y confiabilidad de los servicios ofrecidos por Frioteam?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's6', tipo: 'seccion', texto: 'Hermética', icono: 'hermetica' },
    { id: 'p20', tipo: 'escala', texto: '¿Cómo califica la imagen y percepción sobre la calidad y confiabilidad de los productos y servicios ofrecidos por Hermética?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
  ],
}
export default encuesta

const encuesta = {
  id: 'contratistas-friopacking',
  titulo: 'Contratistas — Grupo Friopacking',
  descripcion: 'Evaluación de los contratistas hacia las áreas de Grupo Friopacking',
  respondedor: 'externo',
  activa: true,
  modo: 'secciones',
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'Gerencia de Operaciones y PMO', icono: '📊' },
    { id: 'p1',  tipo: 'escala', texto: '¿Qué tan clara considera la planificación general de los proyectos (cronograma, hitos, secuencia de frentes) que recibe a través del supervisor de obra?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2',  tipo: 'escala', texto: '¿Qué tan realistas y cumplibles son los plazos y hitos de obra que se le exigen, considerando la planificación definida por la gerencia de operaciones y PMO?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3',  tipo: 'escala', texto: '¿En qué medida las decisiones de la gerencia de operaciones y PMO ayudan a destrabar problemas que afectan el avance de sus partidas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4',  tipo: 'escala', texto: '¿Qué tan claros y ordenados son los cambios de alcance, adicionales o replanteos que se le informan en obra como resultado de las decisiones de la gerencia de operaciones y PMO?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p5',  tipo: 'escala', texto: '¿En qué medida la información que le llega sobre prioridades, secuencia de actividades y coordinación con otros contratistas le permite planificar adecuadamente sus recursos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Logística', icono: '🚚' },
    { id: 'p6',  tipo: 'escala', texto: '¿Qué tan oportunas considera las entregas de materiales y equipos en obra, tomando en cuenta lo que llega efectivamente a su frente de trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p7',  tipo: 'escala', texto: '¿En qué medida la disponibilidad real de materiales y equipos en obra le permite cumplir los plazos que le exige el supervisor?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8',  tipo: 'escala', texto: '¿Qué tan adecuado es el estado y la calidad de los materiales y equipos que encuentra en obra para ejecutar sus partidas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p9',  tipo: 'escala', texto: '¿En qué medida la gestión interna de logística reduce tiempos muertos en su frente de trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p10', tipo: 'escala', texto: '¿Qué tanto siente que los problemas de materiales y equipos en obra se gestionan y corrigen en plazos razonables para no afectar significativamente su avance?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Administración y Finanzas', icono: '💼' },
    { id: 'p11', tipo: 'escala', texto: '¿Qué tan claras le resultan, a través de los contratos, órdenes de servicio y comunicaciones que recibe, las condiciones comerciales y de pago?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿En qué medida los plazos de pago se cumplen de forma consistente en los proyectos donde participa?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p13', tipo: 'escala', texto: '¿En qué medida la gestión de facturas por parte de la empresa (recepción, revisión, observaciones y conformidad) se realiza de manera ágil y sin generar retrasos innecesarios en sus cobros?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Frioteam', icono: '❄️' },
    { id: 'p14', tipo: 'escala', texto: '¿En qué medida la calidad de las puestas en marcha y trabajos de mantenimiento realizados por Frioteam impacta positivamente en la percepción de calidad del proyecto en el que usted participa?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿Qué tanto la programación y ejecución de las actividades de Frioteam (arranques, pruebas, ajustes) evita retrabajos o interferencias con sus trabajos en campo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's5', tipo: 'seccion', texto: 'Hermética', icono: '🚪' },
    { id: 'p16', tipo: 'escala', texto: '¿En qué medida la calidad de las puertas Hermética instaladas en los proyectos (acabados, funcionamiento, cierre, estanqueidad) está alineada con el estándar que el cliente final espera y que usted percibe en obra?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's6', tipo: 'seccion', texto: 'Ingeniería', icono: '📐' },
    { id: 'p17', tipo: 'escala', texto: '¿Qué tan claros y aplicables a la realidad de obra son los planos y detalles constructivos que recibe indirectamente (a través del supervisor o los documentos entregados en campo)?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p18', tipo: 'escala', texto: '¿En qué medida la información técnica emitida por el área de Ingeniería (planos revisados, memorias, criterios de diseño) se mantiene consistente a lo largo del proyecto y evita cambios frecuentes que afecten su programación de trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p19', tipo: 'escala', texto: '¿Qué tanto percibe que los diseños consideran las condiciones reales de obra (espacios, interferencias, accesos), reduciendo la necesidad de replanteos y trabajos improvisados?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p20', tipo: 'escala', texto: '¿En qué medida la documentación técnica que llega a obra (planos actualizados, isométricos, detalles, especificaciones) minimiza retrabajos en sus partidas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
  ],
}
export default encuesta

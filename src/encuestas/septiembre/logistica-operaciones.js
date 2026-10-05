const encuesta = {
  id: 'logistica-operaciones-octubre',
  titulo: 'Logística y Operaciones: ¿vamos al mismo ritmo?',
  descripcion: 'Logística evalúa su trabajo con Operaciones: qué funciona y qué podemos mejorar juntos. Responde según tu experiencia actual; es anónima y toma unos 5 minutos.',
  respondedor: 'interno',
  activa: true,
  mes: 'Septiembre',
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'Planificación y organización', icono: 'operaciones' },
    { id: 'p1', tipo: 'escala', texto: '¿Cómo calificas la anticipación con la que Operaciones comunica sus necesidades a Logística?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2', tipo: 'escala', texto: '¿Cómo calificas la claridad de los requerimientos enviados por Operaciones?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3', tipo: 'escala', texto: '¿Qué tan completa es la información que Operaciones proporciona para atender sus requerimientos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4', tipo: 'escala', texto: '¿Qué tan bien coordina Operaciones con Logística la viabilidad de los plazos antes de asumir compromisos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p5', tipo: 'escala', texto: '¿Qué tan adecuada es la priorización de las solicitudes de Operaciones según su urgencia e impacto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Cumplimiento y calidad del trabajo', icono: 'operaciones' },
    { id: 'p6', tipo: 'escala', texto: '¿Cómo calificas el cumplimiento de los plazos acordados por parte de Operaciones?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p7', tipo: 'escala', texto: '¿Cómo calificas la calidad del trabajo de Operaciones en las actividades que afectan los procesos logísticos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8', tipo: 'escala', texto: '¿Qué tan bien cumple Operaciones los procedimientos acordados entre ambas áreas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p9', tipo: 'escala', texto: '¿Qué tan eficaz es Operaciones para prevenir errores bajo su responsabilidad que generan reprocesos en Logística?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p10', tipo: 'escala', texto: '¿Cómo calificas el cumplimiento de los compromisos asumidos por Operaciones en reuniones de coordinación?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Comunicación y colaboración', icono: 'operaciones' },
    { id: 'p11', tipo: 'escala', texto: '¿Cómo calificas la rapidez de respuesta de Operaciones a las consultas de Logística?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿Qué tan oportunamente comunica Operaciones los cambios en fechas, prioridades o requerimientos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p13', tipo: 'escala', texto: '¿Qué tan útil es la información que brinda Operaciones sobre el avance de los asuntos pendientes entre ambas áreas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p14', tipo: 'escala', texto: '¿Cómo calificas la disposición de Operaciones para encontrar soluciones conjuntas con Logística?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿Cómo calificas el trato respetuoso y profesional del equipo de Operaciones hacia Logística?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Solución de problemas y mejora continua', icono: 'operaciones' },
    { id: 'p16', tipo: 'escala', texto: '¿Qué tan oportunamente actúa Operaciones para resolver las incidencias bajo su responsabilidad que afectan a Logística?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p17', tipo: 'escala', texto: '¿Qué tan efectivas son las soluciones de Operaciones para evitar que los problemas se repitan?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p18', tipo: 'escala', texto: '¿Qué tan bien incorpora Operaciones la retroalimentación de Logística para mejorar su desempeño?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p19', tipo: 'escala', texto: '¿Cómo calificas el cumplimiento de las acciones de mejora acordadas por Operaciones?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p20', tipo: 'escala', texto: 'En general, ¿cómo calificas actualmente el desempeño del área de Operaciones en su relación de trabajo con Logística?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
  ],
}
export default encuesta

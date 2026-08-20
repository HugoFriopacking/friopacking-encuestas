const encuesta = {
  id: 'contratistas-supervisores-agosto',
  titulo: 'Supervisores (Agosto)',
  descripcion: 'Evaluación de los contratistas hacia los supervisores de obra',
  respondedor: 'externo',
  activa: true,
  mes: 'Agosto',
  campoEvaluado: 'supervisor',
  leyendaTiers: [
    { rango: '1-3', texto: 'Deficiente / Muy malo', bg: '#fef2f2', color: '#dc2626' },
    { rango: '4-6', texto: 'Regular / Por mejorar', bg: '#fefce8', color: '#ca8a04' },
    { rango: '7-8', texto: 'Bueno / Aceptable', bg: '#f0fdf4', color: '#22c55e' },
    { rango: '9-10', texto: 'Excelente / Muy bueno', bg: '#ecfdf5', color: '#15803d' },
  ],
  preguntas: [
    { id: 'supervisor', tipo: 'texto', texto: 'Supervisor a evaluar', requerida: true },
    { id: 'obra', tipo: 'texto', texto: 'Obra', requerida: true },

    { id: 's1', tipo: 'seccion', texto: 'Planificación y Coordinación de Obra', icono: 'operaciones' },
    { id: 'p1', tipo: 'escala', texto: '¿Qué tan oportuna y adecuada fue la liberación de frentes de trabajo para el inicio y desarrollo de sus actividades?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2', tipo: 'escala', texto: '¿Cómo evalúa la gestión del supervisor para asegurar la disponibilidad de puntos de energía, accesos y facilidades operativas en campo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3', tipo: 'escala', texto: '¿Qué tan realista y bien coordinada fue la programación de cronogramas para evitar cruces o interferencias entre contratistas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4', tipo: 'escala', texto: '¿Cómo califica la anticipación y gestión del supervisor frente a la entrega de materiales o equipos a cargo de Friopacking?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p5', tipo: 'escala', texto: '¿Qué tan efectiva fue la coordinación de maniobras e izajes de equipos principales (chillers, evaporadores, compresores, paneles)?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Comunicación y Gestión de Incidencias', icono: 'logistica' },
    { id: 'p6', tipo: 'escala', texto: '¿Cómo evalúa la claridad en las instrucciones operativas y la transmisión de planos/alcances del proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p7', tipo: 'escala', texto: '¿Qué tan rápido y efectivo fue el tiempo de respuesta del supervisor ante sus consultas o requerimientos técnicos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8', tipo: 'escala', texto: '¿Cómo califica la capacidad del supervisor para resolver imprevistos o bloqueos que detenían el avance del trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p9', tipo: 'escala', texto: '¿Qué tan fluida y accesible fue la comunicación diaria con el supervisor durante el desarrollo de la obra?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p10', tipo: 'escala', texto: '¿Cómo evalúa la claridad y oportunidad en la notificación de modificaciones o cambios en el diseño/proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Liderazgo y Relación Profesional', icono: 'ingenieria' },
    { id: 'p11', tipo: 'escala', texto: '¿Cómo califica el nivel de respeto, profesionalismo y trato constructivo recibido por parte del supervisor hacia su personal?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿Qué tan imparcial y objetivo fue el supervisor al gestionar desacuerdos o reclamos presentados en campo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p13', tipo: 'escala', texto: '¿Cómo evalúa la disposición del supervisor para facilitar el trabajo y colaborar activamente en la productividad de la obra?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p14', tipo: 'escala', texto: '¿Qué tan receptivo fue el supervisor para escuchar e incorporar sugerencias operativas formuladas por su equipo técnico?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿Cómo califica el compromiso y la puntualidad del supervisor en las reuniones de coordinación y seguimiento?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Calidad Técnica y Criterio de Aceptación', icono: 'finanzas' },
    { id: 'p16', tipo: 'escala', texto: '¿Qué tan claras y precisas fueron las especificaciones técnicas solicitadas para los trabajos (aislamiento, tuberías, sellados, etc.)?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p17', tipo: 'escala', texto: '¿Cómo evalúa la agilidad y oportunidad del supervisor para realizar la revisión y liberación de sus avances de obra?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p18', tipo: 'escala', texto: '¿Qué tan consistente y justo fue el criterio de inspección aplicado por el supervisor en las entregas de trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p19', tipo: 'escala', texto: '¿Cómo califica la calidad de la retroalimentación técnica recibida cuando se identificó alguna observación o trabajo no conforme?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p20', tipo: 'escala', texto: '¿Qué tanto dominio y conocimiento técnico demostró el supervisor sobre los procesos y normas de montaje en refrigeración industrial?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
  ],
}
export default encuesta

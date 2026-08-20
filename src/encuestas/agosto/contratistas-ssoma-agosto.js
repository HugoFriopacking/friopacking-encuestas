const encuesta = {
  id: 'contratistas-ssoma-agosto',
  titulo: 'SSOMA (Agosto)',
  descripcion: 'Evaluación de los contratistas hacia los supervisores SSOMA de Friopacking, sobre seguridad, orden y prevención en obra.',
  respondedor: 'externo',
  activa: true,
  mes: 'Agosto',
  campoEvaluado: 'supervisor',
  leyenda: '1 = Muy malo / Deficiente · 10 = Muy bueno / Excelente',
  preguntas: [
    { id: 'supervisor', tipo: 'texto', texto: 'Supervisor SSOMA a evaluar', requerida: true },
    { id: 'obra', tipo: 'texto', texto: 'Obra', requerida: true },

    { id: 's1', tipo: 'seccion', texto: 'Tramitación y Gestión Documental SSOMA', icono: 'finanzas' },
    { id: 'p1', tipo: 'escala', texto: '¿Qué tan claro explica el supervisor los requisitos para completar y aprobar los permisos de trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2', tipo: 'escala', texto: '¿Qué tan rápido revisa y libera los permisos de trabajo, sin dejar de cumplir los controles de seguridad?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3', tipo: 'escala', texto: '¿Qué tan bien orienta al contratista para completar el IPERC continuo antes y durante el trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4', tipo: 'escala', texto: '¿Qué tan útiles y claras son las charlas de 5 minutos antes de iniciar las actividades?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p5', tipo: 'escala', texto: '¿Qué tan ordenado es el supervisor al revisar los documentos y requisitos de seguridad antes de iniciar un trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Supervisión y Criterio Preventivo en Campo', icono: 'operaciones' },
    { id: 'p6', tipo: 'escala', texto: '¿Qué tan seguido el supervisor realiza inspecciones de seguridad en campo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p7', tipo: 'escala', texto: '¿Qué tan bien identifica a tiempo riesgos, actos inseguros o condiciones peligrosas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8', tipo: 'escala', texto: '¿Qué tan acertado es el supervisor al decidir si un trabajo puede continuar, debe corregirse o debe detenerse por seguridad?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p9', tipo: 'escala', texto: '¿Qué tan bien explica una observación de seguridad para que el trabajador entienda qué debe corregir y por qué?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p10', tipo: 'escala', texto: '¿Qué tan útiles y prácticas son las soluciones que propone el supervisor cuando encuentra un riesgo o problema de seguridad?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Gestión de Riesgos Críticos en Refrigeración', icono: 'ingenieria' },
    { id: 'p11', tipo: 'escala', texto: '¿Qué tan bien controla la seguridad en los trabajos en altura, como uso de arnés, línea de vida, andamios y puntos de anclaje?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿Qué tan bien controla la seguridad durante los izajes y movimiento de cargas con grúas, tecles u otros equipos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p13', tipo: 'escala', texto: '¿Qué tan bien verifica las condiciones de seguridad antes y durante los trabajos en espacios confinados?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p14', tipo: 'escala', texto: '¿Qué tan bien verifica que se aplique el bloqueo y etiquetado de energía (LOTO) antes de intervenir equipos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿Qué tan bien controla los riesgos relacionados con el manejo de refrigerantes y productos químicos, como amoníaco (NH₃) o CO₂?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Comunicación, Soporte y Liderazgo SSOMA', icono: 'frioteam' },
    { id: 'p16', tipo: 'escala', texto: '¿Qué tan disponible está el supervisor para apoyar y orientar en campo cuando el contratista lo necesita?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p17', tipo: 'escala', texto: '¿Qué tan rápido responde ante consultas, permisos, observaciones o riesgos de seguridad?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p18', tipo: 'escala', texto: '¿Qué tan clara es su comunicación sobre los riesgos, controles y medidas de seguridad que deben cumplirse?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p19', tipo: 'escala', texto: '¿Qué tan respetuoso y profesional es el supervisor en su trato con el personal contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p20', tipo: 'escala', texto: '¿Qué tan bien promueve el supervisor una cultura de seguridad, motivando a reportar riesgos y detener trabajos inseguros?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
  ],
}
export default encuesta

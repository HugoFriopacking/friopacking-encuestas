const encuesta = {
  id: 'ssoma-contratistas-agosto',
  titulo: 'SSOMA — Contratistas (Agosto)',
  descripcion: 'Evaluación del área SSOMA hacia los contratistas: seguridad, salud ocupacional, medio ambiente, orden, disciplina operativa y prevención de riesgos.',
  respondedor: 'interno',
  activa: true,
  mes: 'Agosto',
  campoEvaluado: 'contratista',
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 'contratista', tipo: 'texto', texto: 'Contratista a evaluar', requerida: true },
    { id: 'obra', tipo: 'texto', texto: 'Obra', requerida: true },

    { id: 's1', tipo: 'seccion', texto: 'Gestión Documentaria y Cumplimiento Previo', icono: 'finanzas' },
    { id: 'p1', tipo: 'escala', texto: '¿Cómo califica el cumplimiento del contratista en la entrega oportuna de la documentación SSOMA requerida antes del inicio de sus actividades?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2', tipo: 'escala', texto: '¿Cómo califica la calidad y consistencia de la documentación SSOMA presentada por el contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3', tipo: 'escala', texto: '¿Cómo califica el cumplimiento del contratista respecto a permisos, formatos, procedimientos y requisitos previos para ejecutar trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4', tipo: 'escala', texto: '¿Cómo califica la disposición del contratista para corregir observaciones documentarias en los plazos solicitados?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Seguridad en la Ejecución del Trabajo', icono: 'operaciones' },
    { id: 'p5', tipo: 'escala', texto: '¿Cómo califica el cumplimiento del contratista en el uso correcto de equipos de protección personal durante sus actividades?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p6', tipo: 'escala', texto: '¿Cómo califica el cumplimiento del contratista respecto a los procedimientos de trabajo seguro establecidos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p7', tipo: 'escala', texto: '¿Cómo califica el nivel de control del contratista frente a riesgos críticos antes y durante la ejecución del trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8', tipo: 'escala', texto: '¿Cómo califica el orden y la disciplina del personal contratista durante la ejecución de sus actividades?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p9', tipo: 'escala', texto: '¿Cómo califica la supervisión interna del contratista para asegurar que su personal trabaje de forma segura?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Herramientas, Equipos y Condiciones de Trabajo', icono: 'ingenieria' },
    { id: 'p10', tipo: 'escala', texto: '¿Cómo califica el estado de las herramientas, equipos, máquinas o implementos utilizados por el contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p11', tipo: 'escala', texto: '¿Cómo califica el cumplimiento del contratista en la inspección previa de herramientas, equipos y áreas de trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿Cómo califica la capacidad del contratista para identificar y reportar condiciones inseguras antes de iniciar sus labores?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p13', tipo: 'escala', texto: '¿Cómo califica el mantenimiento del orden y limpieza en el área de trabajo asignada al contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Salud Ocupacional y Conducta Preventiva', icono: 'logistica' },
    { id: 'p14', tipo: 'escala', texto: '¿Cómo califica el cumplimiento del contratista respecto a las condiciones de salud, aptitud y control de su personal para realizar las actividades asignadas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿Cómo califica la participación del personal contratista en charlas, inducciones, capacitaciones o reuniones SSOMA?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p16', tipo: 'escala', texto: '¿Cómo califica la actitud preventiva del personal contratista frente a riesgos, observaciones o recomendaciones de SSOMA?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's5', tipo: 'seccion', texto: 'Medio Ambiente', icono: 'hermetica' },
    { id: 'p17', tipo: 'escala', texto: '¿Cómo califica el cumplimiento del contratista en la segregación, manejo y disposición adecuada de residuos generados durante sus actividades?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p18', tipo: 'escala', texto: '¿Cómo califica el cuidado del contratista para evitar derrames, contaminación, desperdicio de materiales o impactos ambientales?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's6', tipo: 'seccion', texto: 'Reporte, Comunicación y Mejora', icono: 'frioteam' },
    { id: 'p19', tipo: 'escala', texto: '¿Cómo califica la comunicación del contratista ante incidentes, actos inseguros, condiciones inseguras u observaciones detectadas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p20', tipo: 'escala', texto: '¿Cómo califica la capacidad del contratista para implementar acciones correctivas y evitar la repetición de observaciones SSOMA?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
  ],
}
export default encuesta

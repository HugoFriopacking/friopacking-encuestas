const encuesta = {
  id: 'contratistas-ssoma-julio',
  titulo: 'SSOMA (Julio)',
  descripcion: 'Evaluación de los contratistas hacia los supervisores SSOMA',
  respondedor: 'externo',
  activa: true,
  mes: 'Julio',
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 'supervisor', tipo: 'texto', texto: 'Supervisor SSOMA a evaluar', requerida: true },
    { id: 'obra', tipo: 'texto', texto: 'Obra', requerida: true },

    { id: 's1', tipo: 'seccion', texto: 'Inducción y comunicación', icono: 'operaciones' },
    { id: 'p1', tipo: 'escala', texto: '¿Qué tan claro es el supervisor SSOMA al explicar los requisitos de seguridad antes de iniciar la obra?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2', tipo: 'escala', texto: '¿Qué tan claro es al comunicar cambios, restricciones o nuevas medidas SSOMA durante la ejecución?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3', tipo: 'escala', texto: '¿Qué tan efectiva es su comunicación con el residente, capataz o responsable de la contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4', tipo: 'escala', texto: '¿Qué tan útil es la retroalimentación que brinda para corregir observaciones SSOMA?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p5', tipo: 'escala', texto: '¿Qué tan respetuosa y profesional es su forma de comunicar correcciones o llamados de atención?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Supervisión en campo', icono: 'logistica' },
    { id: 'p6', tipo: 'escala', texto: '¿Qué tan frecuente es la presencia del supervisor SSOMA en campo durante la ejecución de los trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p7', tipo: 'escala', texto: '¿Qué tan bien identifica riesgos críticos asociados a la actividad que realiza la contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8', tipo: 'escala', texto: '¿Qué tan efectivo es al verificar el uso correcto de EPP en campo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p9', tipo: 'escala', texto: '¿Qué tan bien supervisa el cumplimiento de procedimientos, permisos de trabajo y controles operativos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p10', tipo: 'escala', texto: '¿Qué tan buen criterio demuestra al supervisar trabajos de alto riesgo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Gestión y respuesta SSOMA', icono: 'ingenieria' },
    { id: 'p11', tipo: 'escala', texto: '¿Qué tan rápido responde ante actos o condiciones inseguras detectadas en obra?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿Qué tan bien verifica que las medidas preventivas se implementen realmente?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p13', tipo: 'escala', texto: '¿Qué tan efectivo es al resolver dudas técnicas relacionadas con SSOMA?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p14', tipo: 'escala', texto: '¿Qué tan bien gestiona situaciones de presión por avance sin comprometer la seguridad?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿Qué tan consistente es al aplicar criterios de seguridad a todos los contratistas por igual?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Control documental', icono: 'finanzas' },
    { id: 'p16', tipo: 'escala', texto: '¿Qué tan oportuno es en la revisión y aprobación de documentos SSOMA del contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p17', tipo: 'escala', texto: '¿Qué tan ordenada y completa es la trazabilidad de observaciones, no conformidades y acciones correctivas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's5', tipo: 'seccion', texto: 'Cultura preventiva y evaluación global', icono: 'hermetica' },
    { id: 'p18', tipo: 'escala', texto: '¿Qué tan bien promueve una cultura preventiva más que una cultura de sanción?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p19', tipo: 'escala', texto: '¿Qué evaluación global le daría al desempeño del supervisor SSOMA en esta obra?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p20', tipo: 'texto', texto: '¿Qué debería mejorar el supervisor SSOMA para facilitar el cumplimiento de seguridad en obra?', requerida: false },
  ],
}
export default encuesta

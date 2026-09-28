const encuesta = {
  id: 'contratistas-ssoma-septiembre',
  titulo: 'SSOMA (Septiembre)',
  descripcion: 'Evaluación del desempeño de los supervisores de Seguridad, Salud Ocupacional y Medio Ambiente (SSOMA) desde la experiencia directa de los contratistas.',
  respondedor: 'externo',
  activa: true,
  mes: 'Septiembre',
  campoEvaluado: 'supervisor',
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 'supervisor', tipo: 'texto', texto: 'Supervisor SSOMA a evaluar', requerida: true },
    { id: 'obra', tipo: 'texto', texto: 'Obra', requerida: true },

    { id: 's1', tipo: 'seccion', texto: 'Comunicación y orientación preventiva', icono: 'operaciones' },
    { id: 'p1', tipo: 'escala', texto: '¿Qué tan claramente comunica las normas y requisitos de seguridad antes de iniciar los trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2', tipo: 'escala', texto: '¿Qué tan comprensibles son las indicaciones de seguridad que brinda durante la ejecución de las actividades?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3', tipo: 'escala', texto: '¿Con qué oportunidad comunica los cambios, nuevos riesgos o restricciones que pueden afectar el trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4', tipo: 'escala', texto: '¿Qué tan dispuesto está a responder consultas y aclarar dudas relacionadas con seguridad, salud ocupacional y medio ambiente?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Identificación y control de riesgos', icono: 'ingenieria' },
    { id: 'p5', tipo: 'escala', texto: '¿Qué tan bien identifica los peligros y riesgos presentes en el área de trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p6', tipo: 'escala', texto: '¿Qué tan adecuadas son las medidas de control que propone para realizar los trabajos de manera segura?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p7', tipo: 'escala', texto: '¿Qué tan bien verifica que el análisis de riesgos, permisos y documentos de seguridad correspondan al trabajo que realmente se realizará?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8', tipo: 'escala', texto: '¿Qué tan oportunamente actúa cuando identifica una condición o comportamiento inseguro?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Supervisión y cumplimiento en campo', icono: 'logistica' },
    { id: 'p9', tipo: 'escala', texto: '¿Qué tan constante es su presencia y seguimiento durante los trabajos de mayor riesgo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p10', tipo: 'escala', texto: '¿Qué tan rigurosamente verifica el uso correcto de los equipos de protección personal?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p11', tipo: 'escala', texto: '¿Qué tan bien supervisa el cumplimiento de los procedimientos y estándares de seguridad establecidos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿Qué tan coherente es al aplicar las normas de seguridad a todos los contratistas y trabajadores por igual?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Prevención, incidentes y emergencias', icono: 'hermetica' },
    { id: 'p13', tipo: 'escala', texto: '¿Qué tan efectivas son las acciones preventivas que realiza para evitar accidentes o incidentes?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p14', tipo: 'escala', texto: '¿Qué tan rápida y adecuadamente responde ante una emergencia, incidente o situación de riesgo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿Qué tan bien orienta al contratista sobre el reporte de incidentes, actos inseguros y condiciones inseguras?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p16', tipo: 'escala', texto: '¿Qué tan adecuado es el seguimiento que realiza a las observaciones, incidentes y acciones correctivas hasta su cierre?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's5', tipo: 'seccion', texto: 'Liderazgo, trato y gestión SSOMA', icono: 'frioteam' },
    { id: 'p17', tipo: 'escala', texto: '¿Qué tan respetuoso y profesional es su trato hacia el personal contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p18', tipo: 'escala', texto: '¿Qué tan receptivo es frente a las observaciones, sugerencias o preocupaciones de seguridad planteadas por los contratistas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p19', tipo: 'escala', texto: '¿Qué tan bien promueve una cultura de prevención, en lugar de limitarse únicamente a sancionar o corregir?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p20', tipo: 'escala', texto: '¿Qué tan bien coordina con Operaciones y otras áreas para que los trabajos se realicen de forma segura y sin retrasos innecesarios?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
  ],
}
export default encuesta

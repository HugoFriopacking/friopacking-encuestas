// EV-03 · Ingeniería evalúa a Operaciones. Anónima: no pide datos del evaluador.
const ETIQUETAS = { 1: 'Muy deficiente', 10: 'Excelente' }
const escala = (id, texto) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas: ETIQUETAS })

const encuesta = {
  id: 'ingenieria-operaciones-octubre',
  titulo: 'De Ingeniería a Operaciones: del diseño a la ejecución',
  descripcion: 'Ingeniería evalúa a Operaciones: cómo se ejecuta, comunica y documenta lo diseñado. Responde según tu experiencia; es anónima y toma unos 5 minutos.',
  respondedor: 'interno',
  activa: true,
  mes: 'Octubre',
  leyendaTiers: [
    { rango: '1', texto: 'Muy deficiente' },
    { rango: '10', texto: 'Excelente' },
  ],
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'Planificación y coordinación', icono: 'operaciones' },
    escala('p1', 'Operaciones participa en las revisiones de ingeniería antes de iniciar la ejecución.'),
    escala('p2', 'Operaciones planifica la ejecución sobre la ingeniería aprobada y en su última revisión.'),
    escala('p3', 'Operaciones coordina con anticipación las visitas o el soporte técnico de Ingeniería en campo.'),
    escala('p4', 'Operaciones cumple los plazos acordados para entregar información de campo (levantamientos, mediciones).'),

    { id: 's2', tipo: 'seccion', texto: 'Comunicación', icono: 'operaciones' },
    escala('p5', 'Operaciones comunica oportunamente las interferencias o diferencias entre los planos y la realidad en campo.'),
    escala('p6', 'Las consultas técnicas de Operaciones son claras y vienen con sustento (fotos, medidas, ubicación).'),
    escala('p7', 'Operaciones informa a Ingeniería los cambios realizados en campo respecto al diseño.'),
    escala('p8', 'Operaciones registra formalmente los acuerdos técnicos (RFI, actas, correos).'),

    { id: 's3', tipo: 'seccion', texto: 'Calidad y cumplimiento', icono: 'ingenieria' },
    escala('p9', 'Operaciones ejecuta los trabajos según planos, especificaciones y memorias de cálculo.'),
    escala('p10', 'Operaciones respeta los procedimientos de montaje, pruebas y puesta en marcha definidos.'),
    escala('p11', 'Operaciones no modifica el diseño sin la aprobación de Ingeniería.'),
    escala('p12', 'Operaciones entrega información as-built completa y confiable para cerrar la ingeniería.'),

    { id: 's4', tipo: 'seccion', texto: 'Solución de problemas y toma de decisiones', icono: 'ingenieria' },
    escala('p13', 'Operaciones propone soluciones técnicas viables cuando encuentra problemas en campo.'),
    escala('p14', 'Operaciones consulta a Ingeniería antes de decidir sobre temas técnicos fuera de su alcance.'),
    escala('p15', 'Operaciones levanta a tiempo las observaciones técnicas de Ingeniería.'),
    escala('p16', 'Operaciones comparte con Ingeniería lecciones aprendidas que permiten mejorar futuros diseños.'),

    { id: 's5', tipo: 'seccion', texto: 'Relación profesional y soporte', icono: 'operaciones' },
    escala('p17', 'Operaciones valora y toma en cuenta el criterio técnico de Ingeniería.'),
    escala('p18', 'Operaciones trata con respeto al personal de Ingeniería y mantiene una relación colaborativa.'),
    escala('p19', 'Operaciones está disponible para las reuniones de coordinación técnica.'),
    escala('p20', 'Operaciones e Ingeniería actúan como un solo equipo frente al cliente.'),
  ],
}

export default encuesta

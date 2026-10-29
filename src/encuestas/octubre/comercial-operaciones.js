// EV-04 · Comercial evalúa a Operaciones. Anónima: no pide datos del evaluador.
const ETIQUETAS = { 1: 'Muy deficiente', 10: 'Excelente' }
const escala = (id, texto) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas: ETIQUETAS })

const encuesta = {
  id: 'comercial-operaciones-octubre',
  titulo: 'Lo que Comercial vende, Operaciones lo cumple',
  descripcion: 'Comercial evalúa a Operaciones: cumplimiento de lo vendido y relación con el cliente. Responde según tu experiencia; es anónima y toma unos 4 minutos.',
  respondedor: 'interno',
  activa: true,
  mes: 'Octubre',
  publicada: '2026-10-29T12:54',  // fecha en que se subió al portal (orden en la portada)
  leyendaTiers: [
    { rango: '1', texto: 'Muy deficiente' },
    { rango: '10', texto: 'Excelente' },
  ],
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'Comunicación', icono: 'operaciones' },
    escala('p1', '¿Operaciones mantiene informado a Comercial sobre el avance de los proyectos de sus clientes?'),
    escala('p2', '¿Operaciones alerta oportunamente las desviaciones de plazo, costo o alcance que afectan al cliente?'),
    escala('p3', '¿Operaciones informa a Comercial los requerimientos, comentarios o inquietudes del cliente recibidos en campo?'),
    escala('p4', '¿La comunicación de Operaciones con el cliente es coherente con lo acordado comercialmente?'),

    { id: 's2', tipo: 'seccion', texto: 'Calidad y cumplimiento', icono: 'ingenieria' },
    escala('p5', '¿Operaciones entrega lo vendido con la calidad comprometida en la propuesta?'),
    escala('p6', '¿Operaciones comunica a Comercial, antes de ejecutarlos, los trabajos fuera del alcance contratado que requieren una cotización o aprobación adicional?'),
    escala('p7', '¿Operaciones entrega a tiempo la documentación de cierre (actas, conformidad, dossier) que permite facturar?'),

    { id: 's3', tipo: 'seccion', texto: 'Solución de problemas y toma de decisiones', icono: 'ingenieria' },
    escala('p8', '¿Operaciones propone alternativas viables cuando lo vendido no puede ejecutarse tal como se ofreció?'),
    escala('p9', '¿Operaciones involucra a Comercial en las decisiones que afectan la relación con el cliente?'),
    escala('p10', '¿Operaciones identifica oportunidades de negocio en campo y las comparte con Comercial?'),

    { id: 's4', tipo: 'seccion', texto: 'Relación profesional y soporte', icono: 'operaciones' },
    escala('p11', '¿Operaciones proyecta una imagen profesional del Grupo ante el cliente?'),
    escala('p12', 'Ante un problema que requiere la participación de ambas áreas, ¿Operaciones cumple las acciones que acuerda con Comercial para resolverlo?'),
    escala('p13', '¿Operaciones está disponible para acompañar a Comercial en visitas técnicas o reuniones con clientes?'),
    escala('p14', '¿Operaciones confirma con Comercial el cierre de los compromisos asumidos para atender las observaciones del cliente?'),
  ],
}

export default encuesta

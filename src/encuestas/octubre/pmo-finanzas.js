// EV-05 · PMO evalúa a Adm. y Finanzas en dos partes: Servicios (OS y facturas) y Adm. y Finanzas. Anónima: no pide datos del evaluador.
// `area` separa las dos partes en Resultados.
const ETIQUETAS = { 1: 'Muy deficiente', 10: 'Excelente' }
const escala = (area) => (id, texto) => ({ id, tipo: 'escala', area, texto, requerida: true, min: 1, max: 10, etiquetas: ETIQUETAS })
const servicios = escala('Servicios')
const finanzas = escala('Adm. y Finanzas')

const encuesta = {
  id: 'pmo-finanzas-octubre',
  titulo: 'Finanzas que impulsan proyectos: la mirada de PMO',
  descripcion: 'PMO evalúa a Servicios (órdenes de servicio y facturas) y a Administración y Finanzas (pagos, fondos y soporte a los proyectos). Responde según tu experiencia; es anónima y toma unos 5 minutos.',
  respondedor: 'interno',
  activa: true,
  mes: 'Octubre',
  publicada: '2026-10-29T12:54',  // fecha en que se subió al portal (orden en la portada)
  leyendaTiers: [
    { rango: '1', texto: 'Muy deficiente' },
    { rango: '10', texto: 'Excelente' },
  ],
  preguntas: [
    // Parte A · Servicios
    { id: 's1', tipo: 'seccion', texto: 'Servicios · Planificación y coordinación', icono: 'finanzas' },
    servicios('p1', '¿Servicios emite las órdenes de servicio dentro del plazo acordado, una vez recibido el requerimiento completo y aprobado?'),
    servicios('p2', '¿Servicios procesa las facturas de contratistas a tiempo para que entren en la programación de pagos?'),

    { id: 's2', tipo: 'seccion', texto: 'Servicios · Comunicación', icono: 'finanzas' },
    servicios('p3', '¿Servicios informa con claridad los requisitos para emitir una OS y para procesar una factura (conformidad, valorización, documentos)?'),
    servicios('p4', '¿Servicios mantiene informado a PMO sobre el estado de las OS y facturas en trámite?'),

    { id: 's3', tipo: 'seccion', texto: 'Servicios · Calidad y cumplimiento', icono: 'finanzas' },
    servicios('p5', '¿Las órdenes de servicio se emiten sin errores (alcance, montos, condiciones, proveedor) respecto al requerimiento?'),
    servicios('p6', '¿Los reportes de costos de servicios por proyecto que emite Servicios llegan a tiempo y son confiables?'),

    { id: 's4', tipo: 'seccion', texto: 'Servicios · Solución de problemas y toma de decisiones', icono: 'finanzas' },
    servicios('p7', 'Cuando una factura u OS es observada, ¿Servicios indica con rapidez qué se debe corregir y quién debe gestionarlo?'),
    servicios('p8', '¿Servicios atiende con agilidad las OS urgentes debidamente justificadas?'),

    { id: 's5', tipo: 'seccion', texto: 'Servicios · Relación profesional y soporte', icono: 'finanzas' },
    servicios('p9', '¿Servicios trata con respeto y cordialidad al personal de PMO y a los supervisores?'),
    servicios('p10', '¿Servicios está disponible para orientar a PMO y supervisores en la gestión de OS y facturas?'),

    // Parte B · Adm. y Finanzas
    { id: 's6', tipo: 'seccion', texto: 'Adm. y Finanzas · Planificación y coordinación', icono: 'operaciones' },
    finanzas('p11', '¿Adm. y Finanzas programa los pagos de acuerdo con el cronograma y flujo de caja de los proyectos?'),
    finanzas('p12', '¿Adm. y Finanzas asigna a tiempo los fondos (anticipos, caja chica, entregas a rendir) que requieren los proyectos?'),

    { id: 's7', tipo: 'seccion', texto: 'Adm. y Finanzas · Comunicación', icono: 'operaciones' },
    finanzas('p13', '¿Adm. y Finanzas avisa oportunamente los retrasos o restricciones de caja que afectan a los proyectos?'),
    finanzas('p14', '¿Adm. y Finanzas responde a tiempo las consultas de PMO sobre estados de pago y saldos?'),

    { id: 's8', tipo: 'seccion', texto: 'Adm. y Finanzas · Calidad y cumplimiento', icono: 'ingenieria' },
    finanzas('p15', '¿Adm. y Finanzas ejecuta los pagos en las fechas confirmadas a PMO?'),

    { id: 's9', tipo: 'seccion', texto: 'Adm. y Finanzas · Solución de problemas y toma de decisiones', icono: 'ingenieria' },
    finanzas('p16', '¿Adm. y Finanzas atiende con agilidad los pagos urgentes debidamente justificados?'),
    finanzas('p17', '¿Adm. y Finanzas resuelve con rapidez las observaciones a rendiciones de gastos?'),

    { id: 's10', tipo: 'seccion', texto: 'Adm. y Finanzas · Relación profesional y soporte', icono: 'operaciones' },
    finanzas('p18', '¿Adm. y Finanzas trata al personal de PMO con respeto y cordialidad?'),
    finanzas('p19', '¿Adm. y Finanzas entiende la dinámica y las urgencias propias de los proyectos?'),
  ],
}

export default encuesta

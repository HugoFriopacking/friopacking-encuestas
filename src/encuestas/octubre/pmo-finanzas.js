// EV-05 · PMO evalúa a Adm. y Finanzas. Anónima: no pide datos del evaluador.
const ETIQUETAS = { 1: 'Muy deficiente', 10: 'Excelente' }
const escala = (id, texto) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas: ETIQUETAS })

const encuesta = {
  id: 'pmo-finanzas-octubre',
  titulo: 'Finanzas que impulsan proyectos: la mirada de PMO',
  descripcion: 'PMO evalúa a Administración y Finanzas: pagos, fondos, costos y soporte a los proyectos. Responde según tu experiencia; es anónima y toma unos 5 minutos.',
  respondedor: 'interno',
  activa: true,
  mes: 'Octubre',
  publicada: '2026-10-29T12:54',  // fecha en que se subió al portal (orden en la portada)
  leyendaTiers: [
    { rango: '1', texto: 'Muy deficiente' },
    { rango: '10', texto: 'Excelente' },
  ],
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'Planificación y coordinación', icono: 'operaciones' },
    escala('p1', 'Adm. y Finanzas programa los pagos de acuerdo con el cronograma y flujo de caja de los proyectos.'),
    escala('p2', 'Adm. y Finanzas asigna a tiempo los fondos (anticipos, caja chica, entregas a rendir) que requieren los proyectos.'),
    escala('p3', 'Adm. y Finanzas coordina con PMO el presupuesto y la apertura de centros de costo de cada proyecto.'),
    escala('p4', 'Adm. y Finanzas cumple los plazos acordados para pagar a proveedores y contratistas de proyectos.'),

    { id: 's2', tipo: 'seccion', texto: 'Comunicación', icono: 'operaciones' },
    escala('p5', 'Adm. y Finanzas comunica con claridad los requisitos y plazos para pagos, rendiciones y facturación.'),
    escala('p6', 'Adm. y Finanzas avisa oportunamente los retrasos o restricciones de caja que afectan a los proyectos.'),
    escala('p7', 'Adm. y Finanzas responde a tiempo las consultas de PMO sobre estados de pago, saldos y facturas.'),
    escala('p8', 'Adm. y Finanzas comparte oportunamente información de costos reales por proyecto.'),

    { id: 's3', tipo: 'seccion', texto: 'Calidad y cumplimiento', icono: 'ingenieria' },
    escala('p9', 'Los reportes de costos y ejecución presupuestal de proyectos son confiables y precisos.'),
    escala('p10', 'Adm. y Finanzas registra los gastos en el centro de costo o proyecto que corresponde.'),
    escala('p11', 'Adm. y Finanzas aplica sus políticas y procedimientos de forma consistente en todos los proyectos.'),
    escala('p12', 'Adm. y Finanzas emite la facturación de hitos a tiempo una vez recibida la conformidad del cliente.'),

    { id: 's4', tipo: 'seccion', texto: 'Solución de problemas y toma de decisiones', icono: 'ingenieria' },
    escala('p13', 'Adm. y Finanzas atiende con agilidad los pagos urgentes debidamente justificados.'),
    escala('p14', 'Adm. y Finanzas propone alternativas (priorización, financiamiento, adelantos) ante restricciones de caja.'),
    escala('p15', 'Adm. y Finanzas resuelve con rapidez las observaciones a documentos y rendiciones.'),
    escala('p16', 'Adm. y Finanzas decide con criterio, equilibrando el control con la continuidad de los proyectos.'),

    { id: 's5', tipo: 'seccion', texto: 'Relación profesional y soporte', icono: 'operaciones' },
    escala('p17', 'Adm. y Finanzas trata al personal de PMO con respeto y cordialidad.'),
    escala('p18', 'Adm. y Finanzas está disponible cuando PMO necesita resolver un tema financiero.'),
    escala('p19', 'Adm. y Finanzas entiende la dinámica y las urgencias propias de los proyectos.'),
    escala('p20', 'Adm. y Finanzas actúa como socio estratégico de PMO y no solo como área de control.'),
  ],
}

export default encuesta

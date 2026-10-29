// EV-06 · Logística evalúa a Adm. y Finanzas. Anónima: no pide datos del evaluador.
const ETIQUETAS = { 1: 'Muy deficiente', 10: 'Excelente' }
const escala = (id, texto) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas: ETIQUETAS })

const encuesta = {
  id: 'logistica-finanzas-octubre',
  titulo: 'Finanzas que mueven la Logística',
  descripcion: 'Logística evalúa a Administración y Finanzas: pagos a proveedores, facturas y coordinación. Responde según tu experiencia; es anónima y toma unos 5 minutos.',
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
    escala('p1', '¿Adm. y Finanzas incorpora en la programación de pagos las fechas pactadas en las órdenes de compra que cuentan con documentación y aprobaciones completas?'),
    escala('p2', '¿Adm. y Finanzas asigna a tiempo los adelantos que requieren los proveedores para atender los pedidos?'),
    escala('p3', '¿Adm. y Finanzas coordina con Logística la programación periódica de pagos?'),
    escala('p4', '¿Adm. y Finanzas ejecuta los pagos en las fechas confirmadas a Logística, una vez completados los requisitos establecidos?'),

    { id: 's2', tipo: 'seccion', texto: 'Comunicación', icono: 'operaciones' },
    escala('p5', '¿Adm. y Finanzas confirma oportunamente a Logística los pagos realizados (constancias)?'),
    escala('p6', '¿Adm. y Finanzas avisa con anticipación cuando un pago se va a postergar?'),
    escala('p7', '¿Adm. y Finanzas comunica con claridad los requisitos documentarios para pagar (factura, guía, conformidad, OC)?'),
    escala('p8', '¿Adm. y Finanzas responde con rapidez las consultas sobre el estado de las facturas?'),

    { id: 's3', tipo: 'seccion', texto: 'Calidad y cumplimiento', icono: 'ingenieria' },
    escala('p9', '¿Adm. y Finanzas registra correctamente las facturas y órdenes de compra?'),
    escala('p10', 'Cuando una observación tributaria afecta un pago, ¿Adm. y Finanzas indica a Logística qué debe corregirse y quién debe gestionarlo?'),
    escala('p11', '¿Adm. y Finanzas gestiona a tiempo los pagos vinculados a importaciones (fletes, aduanas, cartas de crédito)?'),
    escala('p12', '¿Adm. y Finanzas aplica las políticas de pago de forma consistente y transparente?'),

    { id: 's4', tipo: 'seccion', texto: 'Solución de problemas y toma de decisiones', icono: 'ingenieria' },
    escala('p13', 'Ante una solicitud de pago urgente debidamente sustentada, ¿Adm. y Finanzas comunica dentro del plazo acordado si puede atenderla y, cuando corresponde, propone una alternativa?'),
    escala('p14', '¿Adm. y Finanzas apoya a Logística en negociar condiciones de crédito con los proveedores?'),
    escala('p15', '¿Adm. y Finanzas resuelve con rapidez las diferencias y observaciones en facturas?'),
    escala('p16', 'Cuando los fondos disponibles no permiten atender todos los pagos previstos, ¿Adm. y Finanzas coordina con Logística la priorización según el impacto en el abastecimiento?'),

    { id: 's5', tipo: 'seccion', texto: 'Relación profesional y soporte', icono: 'operaciones' },
    escala('p17', '¿Adm. y Finanzas trata al personal de Logística con respeto y cordialidad?'),
    escala('p18', '¿Adm. y Finanzas está disponible cuando Logística necesita resolver un tema de pagos?'),
    escala('p19', 'Ante un pago vencido reportado por Logística, ¿Adm. y Finanzas informa su estado y confirma el siguiente paso para atenderlo?'),
    escala('p20', '¿Adm. y Finanzas cumple los acuerdos de atención que establece con Logística para resolver problemas de pago que afectan el abastecimiento?'),
  ],
}

export default encuesta

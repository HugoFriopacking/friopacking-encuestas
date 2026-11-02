// Operaciones evalúa a las áreas y empresas de Grupo Friopacking. Anónima: no pide datos del evaluador.
// Una página por área; `area` agrupa las preguntas en el ranking de Resultados.
const ETIQUETAS = { 1: 'Muy deficiente', 10: 'Excelente' }

const AREAS = [
  {
    nombre: 'SSOMA', area: 'SSOMA', icono: 'operaciones',
    preguntas: [
      'SSOMA coordina con anticipación inspecciones, capacitaciones y requisitos de seguridad, sin afectar la programación de los trabajos.',
      'SSOMA comunica de forma clara y oportuna los cambios en normas, procedimientos y requisitos de seguridad.',
      'Los procedimientos, permisos y documentos de seguridad que entrega SSOMA son claros y aplicables en campo.',
      'Ante incidentes u observaciones, SSOMA propone soluciones prácticas que permiten continuar el trabajo de forma segura.',
      'SSOMA acompaña y asesora en campo con trato respetuoso, y no se limita a fiscalizar.',
    ],
  },
  {
    nombre: 'Logística', area: 'Logística', icono: 'logistica',
    preguntas: [
      'Logística programa compras y despachos alineados al cronograma de los trabajos.',
      'Logística informa a tiempo el estado de los pedidos, las demoras o los cambios en las fechas de entrega.',
      'Los materiales, equipos y herramientas llegan completos, en buen estado y según lo solicitado.',
      'Ante faltantes o urgencias, Logística encuentra alternativas rápidas, como otros proveedores, reemplazos o nuevas rutas.',
      'Logística atiende oportunamente los requerimientos de Operaciones y brinda orientación cuando surgen necesidades no programadas.',
    ],
  },
  {
    nombre: 'Ingeniería', area: 'Ingeniería', icono: 'ingenieria',
    preguntas: [
      'Ingeniería entrega planos, diseños y especificaciones con tiempo suficiente para planificar la ejecución.',
      'Ingeniería explica con claridad los alcances técnicos y comunica a tiempo los cambios de diseño.',
      'Los diseños de Ingeniería son técnicamente correctos, completos y ejecutables en campo.',
      'Ingeniería resuelve con rapidez las consultas técnicas y los problemas de diseño que surgen en obra.',
      'Ingeniería considera la experiencia y las sugerencias de Operaciones al diseñar.',
    ],
  },
  {
    nombre: 'PMO', area: 'PMO', icono: 'operaciones',
    preguntas: [
      'PMO elabora cronogramas realistas y coordina adecuadamente los recursos entre áreas.',
      'PMO mantiene informado a Operaciones sobre el avance, las prioridades y los cambios de los proyectos.',
      'PMO hace un seguimiento efectivo del cumplimiento de hitos, alcances y compromisos.',
      'Ante desviaciones o conflictos entre áreas, PMO toma decisiones o escala a tiempo.',
      'La gestión de PMO facilita el trabajo de Operaciones en lugar de sumarle carga administrativa.',
    ],
  },
  {
    nombre: 'Comercial', area: 'Comercial', icono: 'operaciones',
    preguntas: [
      'Comercial coordina con Operaciones antes de comprometer plazos, alcances o condiciones con el cliente.',
      'Comercial transmite de forma completa y clara los requerimientos del cliente al inicio del proyecto.',
      'Lo que vende Comercial es técnicamente viable y coincide con lo que Operaciones debe ejecutar.',
      'Ante reclamos o cambios del cliente, Comercial gestiona soluciones en conjunto con Operaciones.',
      'Comercial respalda a Operaciones frente al cliente y mantiene un trato colaborativo.',
    ],
  },
  {
    nombre: 'Administración y Finanzas', area: 'Administración y Finanzas', icono: 'finanzas',
    preguntas: [
      'Adm. y Finanzas gestiona pagos, fondos y presupuestos con anticipación para no retrasar los trabajos.',
      'Adm. y Finanzas explica con claridad los procedimientos, requisitos y plazos administrativos, como rendiciones, viáticos y aprobaciones.',
      'Adm. y Finanzas procesa correctamente y en plazo los pagos a proveedores, los reembolsos y las rendiciones.',
      'Ante urgencias o casos excepcionales, Adm. y Finanzas ofrece alternativas ágiles sin descuidar el control.',
      'Adm. y Finanzas atiende con trato cordial y disposición para orientar.',
    ],
  },
  {
    nombre: 'Frioteam: servicios técnicos', area: 'Frioteam', icono: 'frioteam',
    preguntas: [
      'Frioteam programa y ejecuta los servicios técnicos en las fechas coordinadas con Operaciones.',
      'Frioteam informa con claridad el diagnóstico, los trabajos realizados y las recomendaciones de cada servicio.',
      'Los servicios técnicos de Frioteam se ejecutan bien desde la primera vez, sin necesidad de volver a intervenir.',
      'Ante fallas o emergencias, Frioteam responde con rapidez y da soluciones efectivas.',
      'El personal técnico de Frioteam coordina bien en campo y mantiene un trato colaborativo con Operaciones.',
    ],
  },
  {
    nombre: 'Hermética: puertas y rampas herméticas', area: 'Hermética', icono: 'hermetica',
    preguntas: [
      'Hermética fabrica y entrega las puertas y rampas en las fechas comprometidas con el cronograma de obra.',
      'Hermética confirma medidas y especificaciones antes de fabricar, y avisa a tiempo cualquier cambio o demora.',
      'Las puertas y rampas cumplen las medidas, los acabados y la hermeticidad especificados.',
      'Ante ajustes, fallas u observaciones en la instalación o en garantía, Hermética atiende con rapidez.',
      'Hermética muestra disposición y un trato colaborativo con Operaciones como empresa del grupo.',
    ],
  },
  {
    nombre: 'Smartcold: unidades condensadoras', area: 'Smartcold', icono: 'frioteam',
    preguntas: [
      'Smartcold entrega las unidades condensadoras en las fechas comprometidas con el cronograma de obra.',
      'Smartcold informa a tiempo el estado de los pedidos y entrega la información técnica de los equipos, como fichas y manuales.',
      'Las unidades condensadoras llegan según lo especificado en modelo y capacidad, y en buen estado.',
      'Ante fallas en el arranque, la operación o la garantía, Smartcold brinda soporte técnico rápido.',
      'Smartcold muestra disposición y un trato colaborativo con Operaciones como empresa del grupo.',
    ],
  },
  {
    nombre: 'Servicios: órdenes de servicio y facturación', area: 'Servicios', icono: 'finanzas',
    preguntas: [
      'Servicios informa con claridad los requisitos y documentos que se necesitan para emitir órdenes de servicio y tramitar la facturación, y comunica el estado de cada solicitud.',
      'Las órdenes de servicio y la facturación se procesan correctamente (alcance, montos y datos) y no requieren correcciones posteriores.',
      'Ante observaciones o trabas en una orden de servicio o en la facturación, Servicios propone soluciones ágiles sin descuidar el control.',
      'Servicios atiende con trato cordial y orienta a Operaciones cuando surgen dudas sobre el proceso.',
    ],
  },
]

// Las preguntas se numeran p1–p49 de corrido, como en el documento original.
let n = 0
const preguntas = AREAS.flatMap((a, i) => [
  { id: `s${i + 1}`, tipo: 'seccion', texto: a.nombre, icono: a.icono },
  ...a.preguntas.map((texto) => ({
    id: `p${++n}`, tipo: 'escala', area: a.area, texto, requerida: true, min: 1, max: 10, etiquetas: ETIQUETAS,
  })),
])

const encuesta = {
  id: 'operaciones-areas-soporte-noviembre',
  titulo: 'El soporte que Operaciones merece',
  descripcion: 'Operaciones evalúa a las áreas y empresas de Grupo Friopacking: SSOMA, Logística, Ingeniería, PMO, Comercial, Adm. y Finanzas, Frioteam, Hermética, Smartcold y Servicios. Es anónima.',
  respondedor: 'interno',
  activa: true,
  mes: 'Noviembre',
  publicada: '2026-11-02T10:00',  // fecha en que se subió al portal (orden en la portada)
  leyendaTiers: [
    { rango: '1', texto: 'Muy deficiente' },
    { rango: '10', texto: 'Excelente' },
  ],
  preguntas,
}

export default encuesta

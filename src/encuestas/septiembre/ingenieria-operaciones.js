// Ingeniería evalúa a Operaciones: qué tan fiel es la obra a lo diseñado. Anónima: no pide datos del evaluador.
const ETIQUETAS = { 1: 'Muy deficiente', 10: 'Excelente' }
const escala = (id, texto, etiquetas = ETIQUETAS) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas })

const encuesta = {
  id: 'ingenieria-operaciones',
  titulo: '¿Se construyó como se diseñó?',
  descripcion: 'Ingeniería evalúa a Operaciones: cómo se interpreta, ejecuta y documenta lo diseñado. Responde según tu experiencia actual; es anónima y toma unos 5 minutos.',
  respondedor: 'interno',
  activa: true,
  mes: 'Septiembre',
  leyendaTiers: [
    { rango: '1', texto: 'Muy deficiente' },
    { rango: '10', texto: 'Excelente' },
  ],
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'Comprensión de la información técnica', icono: 'ingenieria' },
    escala('p1', '¿Qué tan bien interpreta Operaciones los planos, especificaciones y documentación técnica que entrega Ingeniería?'),
    escala('p2', '¿Qué tan bien revisa Operaciones la información técnica antes de iniciar los trabajos?'),
    escala('p3', '¿Qué tan a tiempo avisa Operaciones a Ingeniería cuando encuentra errores, dudas o información faltante en los planos?'),
    escala('p4', '¿Con qué frecuencia trabaja Operaciones con la versión vigente de los planos aprobados por Ingeniería, y no con versiones antiguas?', { 1: 'Nunca', 10: 'Siempre' }),

    { id: 's2', tipo: 'seccion', texto: 'Planificación y preparación', icono: 'operaciones' },
    escala('p5', '¿Cómo califica la planificación de Operaciones antes de iniciar los trabajos?'),
    escala('p6', '¿Con cuánta anticipación solicita Operaciones las definiciones técnicas que necesita para ejecutar?'),
    escala('p7', '¿Qué tan bien verifica Operaciones que los materiales y equipos cumplan las especificaciones técnicas antes de instalarlos?'),
    escala('p8', '¿Qué tan bien respeta Operaciones la secuencia de ejecución y las consideraciones técnicas definidas por Ingeniería?'),

    { id: 's3', tipo: 'seccion', texto: 'Calidad y cumplimiento de la ejecución', icono: 'operaciones' },
    escala('p9', '¿Qué tan fiel es la ejecución de Operaciones a los planos y especificaciones aprobadas?'),
    escala('p10', '¿Qué tan bien evita Operaciones errores de ejecución que generen retrabajos?'),
    escala('p11', '¿Con qué rapidez levanta Operaciones las observaciones técnicas detectadas durante la ejecución?'),
    escala('p12', '¿Cómo califica el cumplimiento de Operaciones con los plazos acordados para los trabajos?'),

    { id: 's4', tipo: 'seccion', texto: 'Comunicación y gestión de cambios', icono: 'operaciones' },
    escala('p13', '¿Qué tan a tiempo avisa Operaciones a Ingeniería cuando surgen problemas, interferencias o desviaciones durante la obra?'),
    escala('p14', '¿Qué tan bien coordina Operaciones con Ingeniería antes de modificar lo establecido en los planos?'),
    escala('p15', '¿Qué tan bien implementa Operaciones las soluciones técnicas definidas por Ingeniería?'),
    escala('p16', '¿Qué tan completa es la información de campo que entrega Operaciones sobre cambios y condiciones reales de obra (as-built)?'),

    { id: 's5', tipo: 'seccion', texto: 'Pruebas, puesta en marcha y mejora continua', icono: 'ingenieria' },
    escala('p17', '¿Cómo califica la ejecución de las pruebas técnicas según los protocolos definidos por Ingeniería? Por ejemplo, pruebas de hermeticidad, vacío o eléctricas.'),
    escala('p18', '¿Cómo califica el desempeño de Operaciones durante la puesta en marcha y el arranque de los sistemas?'),
    escala('p19', '¿Qué tan completa es la documentación de pruebas y protocolos que entrega Operaciones al cierre del proyecto?'),
    escala('p20', '¿Qué tan útiles son los aportes de Operaciones, como observaciones de constructibilidad o lecciones aprendidas, para mejorar la ingeniería de futuros proyectos?'),
  ],
}

export default encuesta

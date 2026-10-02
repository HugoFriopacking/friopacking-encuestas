// Operaciones (cliente interno) evalúa a las 6 áreas de soporte. Anónima: no pide datos del evaluador.
// Cada área repite las 7 preguntas comunes (A1–A7) para poder compararlas entre sí,
// más sus preguntas específicas (B1–B13). A7 (satisfacción global) va al final de cada área
// y funciona como control: el índice ISCI se calcula con A1–A6 + B.

const ACUERDO = { 1: 'Totalmente en desacuerdo', 10: 'Totalmente de acuerdo' }
const SATISFACCION = { 1: 'Muy insatisfecho', 10: 'Muy satisfecho' }

const COMUNES = [
  { n: 'a1', texto: 'El área responde y entrega en los plazos acordados.' },
  { n: 'a2', texto: 'Lo que entrega el área es correcto y no requiere rehacerse.' },
  { n: 'a3', texto: 'El área informa con claridad el estado de las solicitudes, sin que tenga que perseguirla.' },
  { n: 'a4', texto: 'El equipo muestra disposición para ayudar y entender las necesidades de Operaciones.' },
  { n: 'a5', texto: 'Cuando surge un problema, el área propone soluciones y no solo traslada el problema.' },
  { n: 'a6', texto: 'El soporte del área contribuye a que Operaciones cumpla sus objetivos (plazos, costos, calidad).' },
]
const GLOBAL = { n: 'a7', texto: 'En general, ¿qué tan satisfecho estás con el servicio de esta área?' }

const AREAS = [
  {
    clave: 'pmo', nombre: 'PMO', icono: 'operaciones',
    especificas: [
      { n: 'b1', texto: 'La PMO brinda lineamientos claros (formatos, hitos, reportes) que facilitan la gestión del proyecto en campo.' },
      { n: 'b2', texto: 'La información que la PMO solicita a Operaciones es útil y no duplica reportes que ya existen.' },
    ],
  },
  {
    clave: 'logistica', nombre: 'Logística', icono: 'logistica',
    especificas: [
      { n: 'b3', texto: 'Los materiales y equipos llegan completos, en buen estado y en la fecha requerida.' },
      { n: 'b4', texto: 'Puedo conocer el estado de un despacho o requerimiento sin tener que llamar varias veces.' },
    ],
  },
  {
    clave: 'capital_humano', nombre: 'Capital Humano', icono: 'operaciones',
    especificas: [
      { n: 'b5', texto: 'Los requerimientos de personal se cubren en el plazo y con el perfil solicitado.' },
      { n: 'b6', texto: 'Las consultas sobre planillas, beneficios o procesos del personal se resuelven con rapidez.' },
    ],
  },
  {
    clave: 'ssoma', nombre: 'SSOMA', icono: 'operaciones',
    especificas: [
      { n: 'b7', texto: 'Los requisitos de seguridad son claros y aplicables a la realidad de campo.' },
      { n: 'b8', texto: 'Las inducciones, autorizaciones y permisos de trabajo se gestionan sin retrasar la operación.' },
    ],
  },
  {
    clave: 'ingenieria', nombre: 'Ingeniería', icono: 'ingenieria',
    especificas: [
      { n: 'b9', texto: 'Los diseños, planos y especificaciones llegan completos y son ejecutables en campo.' },
      { n: 'b10', texto: 'Los cambios de ingeniería se comunican a tiempo y con su impacto en la obra.' },
    ],
  },
  {
    clave: 'comercial', nombre: 'Comercial (Presupuestos y Arquitectura)', icono: 'finanzas',
    especificas: [
      { n: 'b11', texto: 'Presupuestos: los presupuestos son realistas y consideran el alcance completo que Operaciones debe ejecutar.' },
      { n: 'b12', texto: 'Arquitectura: las propuestas de arquitectura son ejecutables y se coordinan con Operaciones antes de comprometerse con el cliente.' },
      { n: 'b13', texto: 'El traspaso del proyecto de Comercial a Operaciones incluye toda la información necesaria para arrancar.' },
    ],
  },
]

const escala = (id, texto, etiquetas) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas })

const encuesta = {
  id: 'operaciones-areas-soporte-octubre',
  titulo: 'Operaciones a áreas de soporte (Octubre)',
  descripcion: 'Esta encuesta busca conocer cómo percibes hoy el servicio que Operaciones recibe de las áreas de soporte de Grupo Friopacking. Es anónima y toma unos 10 minutos. Tus respuestas se usarán para definir planes de mejora en cada área.',
  respondedor: 'interno',
  activa: true,
  mes: 'Octubre',
  leyendaTiers: [
    { rango: '1', texto: 'Totalmente en desacuerdo / Muy insatisfecho', bg: 'var(--color-score-low)', color: 'var(--color-on-score)' },
    { rango: '5–6', texto: 'Neutral', bg: 'var(--color-score-mid)', color: 'var(--color-text)' },
    { rango: '10', texto: 'Totalmente de acuerdo / Muy satisfecho', bg: 'var(--color-score-high)', color: 'var(--color-on-score)' },
  ],
  preguntas: AREAS.flatMap((area) => [
    { id: `s_${area.clave}`, tipo: 'seccion', texto: area.nombre, icono: area.icono },
    ...COMUNES.map((q) => escala(`${area.clave}_${q.n}`, q.texto, ACUERDO)),
    ...area.especificas.map((q) => escala(`${area.clave}_${q.n}`, q.texto, ACUERDO)),
    escala(`${area.clave}_${GLOBAL.n}`, GLOBAL.texto, SATISFACCION),
  ]),
}

export default encuesta

// Operaciones (cliente interno) evalúa a las 5 áreas de soporte. Anónima: no pide datos del evaluador.
// Cada área repite las 6 preguntas comunes (A1–A6), redactadas con el nombre del área,
// para poder compararlas entre sí, más sus preguntas específicas (B1–B13).

const ACUERDO = { 1: 'Totalmente en desacuerdo', 10: 'Totalmente de acuerdo' }

// `area` es el nombre corto que se usa dentro del enunciado (p. ej. "PMO", "Logística").
const COMUNES = [
  { n: 'a1', texto: (area) => `${area} responde y entrega en los plazos acordados.` },
  { n: 'a2', texto: (area) => `Lo que entrega ${area} es correcto y no requiere rehacerse.` },
  { n: 'a3', texto: (area) => `${area} informa con claridad el estado de las solicitudes, sin que tenga que insistir.` },
  { n: 'a4', texto: (area) => `El equipo de ${area} muestra disposición para ayudar y entender las necesidades de Operaciones.` },
  { n: 'a5', texto: (area) => `Cuando surge un problema, ${area} propone soluciones y no solo traslada el problema.` },
  { n: 'a6', texto: (area) => `El soporte de ${area} contribuye a que Operaciones cumpla sus objetivos (plazos, costos, calidad).` },
]

const AREAS = [
  {
    clave: 'pmo', nombre: 'PMO', corto: 'PMO', icono: 'operaciones',
    especificas: [
      { n: 'b1', texto: 'PMO brinda lineamientos claros (formatos, hitos, reportes) que facilitan la gestión del proyecto en campo.' },
      { n: 'b2', texto: 'La información que PMO solicita a Operaciones es útil y no duplica reportes que ya existen.' },
    ],
  },
  {
    clave: 'logistica', nombre: 'Logística', corto: 'Logística', icono: 'logistica',
    especificas: [
      { n: 'b3', texto: 'Los materiales y equipos que envía Logística llegan completos, en buen estado y en la fecha requerida.' },
      { n: 'b4', texto: 'Puedo conocer el estado de un despacho o requerimiento de Logística sin tener que llamar varias veces.' },
    ],
  },
  {
    clave: 'capital_humano', nombre: 'Capital Humano', corto: 'Capital Humano', icono: 'operaciones',
    especificas: [
      { n: 'b5', texto: 'Capital Humano cubre los requerimientos de personal en el plazo y con el perfil solicitado.' },
      { n: 'b6', texto: 'Capital Humano resuelve con rapidez las consultas sobre planillas, beneficios o procesos del personal.' },
    ],
  },
  {
    clave: 'ingenieria', nombre: 'Ingeniería', corto: 'Ingeniería', icono: 'ingenieria',
    especificas: [
      { n: 'b9', texto: 'Los diseños, planos y especificaciones de Ingeniería llegan completos y son ejecutables en campo.' },
      { n: 'b10', texto: 'Ingeniería comunica a tiempo los cambios y su impacto en la obra.' },
    ],
  },
  {
    clave: 'comercial', nombre: 'Comercial (Presupuestos y Arquitectura)', corto: 'Comercial', icono: 'finanzas',
    especificas: [
      { n: 'b11', texto: 'Los presupuestos de Comercial son realistas y consideran el alcance completo que Operaciones debe ejecutar.' },
      { n: 'b12', texto: 'Las propuestas de arquitectura de Comercial son ejecutables y se coordinan con Operaciones antes de comprometerse con el cliente.' },
      { n: 'b13', texto: 'El traspaso del proyecto de Comercial a Operaciones incluye toda la información necesaria para arrancar.' },
    ],
  },
]

const escala = (id, texto) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas: ACUERDO })

const encuesta = {
  id: 'operaciones-areas-soporte-octubre',
  titulo: 'El soporte que Operaciones merece',
  descripcion: 'Califica el servicio que recibes de PMO, Logística, Capital Humano, Ingeniería y Comercial. Es anónima, toma unos 8 minutos y servirá para definir mejoras en cada área.',
  respondedor: 'interno',
  activa: true,
  mes: 'Septiembre',
  leyendaTiers: [
    { rango: '1', texto: 'Totalmente en desacuerdo' },
    { rango: '5–6', texto: 'Neutral' },
    { rango: '10', texto: 'Totalmente de acuerdo' },
  ],
  preguntas: AREAS.flatMap((area) => [
    { id: `s_${area.clave}`, tipo: 'seccion', texto: area.nombre, icono: area.icono },
    ...COMUNES.map((q) => escala(`${area.clave}_${q.n}`, q.texto(area.corto))),
    ...area.especificas.map((q) => escala(`${area.clave}_${q.n}`, q.texto)),
  ]),
}

export default encuesta

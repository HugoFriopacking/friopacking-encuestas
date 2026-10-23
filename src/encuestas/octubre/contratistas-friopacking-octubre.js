// Los contratistas evalúan a las áreas y empresas de Grupo Friopacking.
// Las secciones son temas y mezclan áreas, así que cada pregunta indica su `area`:
// Resultados la usa para el ranking consolidado "Grupo Friopacking (por área)".
// Los nombres de área coinciden con las secciones de las encuestas de meses anteriores.
const PMO = 'PMO / Gestión de Proyectos'
const ADM = 'Administración y Finanzas'
const ING = 'Ingeniería'
const LOG = 'Logística'
const FRIOTEAM = 'Frioteam'
const HERMETICA = 'Hermética'

const escala = (id, area, texto) => ({
  id, tipo: 'escala', area, texto, requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' },
})

const encuesta = {
  id: 'contratistas-friopacking-octubre',
  titulo: 'Tu Opinión Construye: Evaluación de Contratistas a Grupo Friopacking',
  descripcion: 'Califica tu experiencia como contratista con las áreas y empresas de Grupo Friopacking: PMO, Ingeniería, Logística, Administración y Finanzas, Frioteam y Hermética.',
  respondedor: 'externo',
  activa: true,
  mes: 'Octubre',
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'Planificación y coordinación', icono: 'operaciones' },
    escala('p1', PMO, '¿Cómo califica la anticipación con la que la PMO le comunica el cronograma de trabajo?'),
    escala('p2', PMO, '¿Cómo califica la coordinación de la PMO para que su trabajo no se cruce ni se retrase por otras empresas o áreas?'),
    escala('p3', LOG, '¿Cómo califica el cumplimiento de Logística en entregar los materiales y equipos en la fecha y cantidad acordadas?'),
    escala('p4', ING, '¿Cómo califica la puntualidad de Ingeniería en entregar los planos y la información técnica necesaria para empezar el trabajo?'),

    { id: 's2', tipo: 'seccion', texto: 'Comunicación', icono: 'operaciones' },
    escala('p5', PMO, '¿Cómo califica el registro y seguimiento que hace la PMO de los acuerdos tomados en reuniones?'),
    escala('p6', ING, '¿Cómo califica la claridad y rapidez con que Ingeniería responde sus consultas técnicas?'),
    escala('p7', LOG, '¿Cómo califica la información que le da Logística sobre el estado y la fecha de llegada de los materiales?'),
    escala('p8', ADM, '¿Cómo califica la claridad con que Administración y Finanzas le explica los requisitos para valorizar, facturar y cobrar?'),

    { id: 's3', tipo: 'seccion', texto: 'Calidad y cumplimiento', icono: 'ingenieria' },
    escala('p9', ING, '¿Cómo califica qué tan completos y claros son los planos y especificaciones técnicas que recibe de Ingeniería?'),
    escala('p10', LOG, '¿Cómo califica el estado en que recibe los materiales y la documentación que los acompaña?'),
    escala('p11', FRIOTEAM, '¿Cómo califica la percepción sobre la calidad y confiabilidad de los servicios ofrecidos por Frioteam?'),
    escala('p12', HERMETICA, '¿Cómo califica la imagen y percepción sobre la calidad y confiabilidad de los productos y servicios ofrecidos por Hermética?'),

    { id: 's4', tipo: 'seccion', texto: 'Solución de problemas y toma de decisiones', icono: 'ingenieria' },
    escala('p13', PMO, '¿Cómo califica la rapidez y el criterio de la PMO para tomar decisiones cuando surgen imprevistos?'),
    escala('p14', LOG, '¿Cómo califica las alternativas que ofrece Logística cuando faltan materiales o hay retrasos?'),
    escala('p15', ING, '¿Cómo califica la rapidez de Ingeniería para resolver cambios o errores en los planos y dejarlos por escrito?'),
    escala('p16', FRIOTEAM, '¿Cómo califica la percepción sobre la capacidad técnica y experiencia de Frioteam en los servicios que ofrece?'),

    { id: 's5', tipo: 'seccion', texto: 'Relación profesional y soporte', icono: 'operaciones' },
    escala('p17', PMO, '¿Cómo califica el trato respetuoso, justo y profesional que recibe de la PMO?'),
    escala('p18', FRIOTEAM, '¿Cómo califica la imagen y percepción profesional que proyecta Frioteam como empresa especializada en servicios técnicos?'),
    escala('p19', ADM, '¿Cómo califica el cumplimiento de los pagos dentro de los plazos acordados en la orden de servicio?'),
    escala('p20', ADM, '¿Cómo califica la atención de Administración y Finanzas para resolver consultas u observaciones relacionadas con la facturación y los pagos?'),
  ],
}

export default encuesta

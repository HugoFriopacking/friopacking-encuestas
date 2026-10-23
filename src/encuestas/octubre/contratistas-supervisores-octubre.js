import { supervisoresPorProyecto } from '../../lib/supervisores.js'

// Los contratistas evalúan a los supervisores de obra. Las preguntas son afirmaciones,
// por eso la escala va de "Totalmente en desacuerdo" a "Totalmente de acuerdo".
const ACUERDO = { 1: 'Totalmente en desacuerdo', 10: 'Totalmente de acuerdo' }
const escala = (id, texto) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas: ACUERDO })

const encuesta = {
  id: 'contratistas-supervisores-octubre',
  titulo: 'Construyendo Juntos | Supervisores',
  descripcion: 'Evalúa el desempeño de los supervisores de obra desde tu experiencia como contratista. Indica qué tan de acuerdo estás con cada afirmación.',
  respondedor: 'externo',
  activa: true,
  mes: 'Octubre',
  campoEvaluado: 'supervisor',
  leyendaTiers: [
    { rango: '1', texto: 'Totalmente en desacuerdo' },
    { rango: '5–6', texto: 'Neutral' },
    { rango: '10', texto: 'Totalmente de acuerdo' },
  ],
  preguntas: [
    { id: 'supervisor', tipo: 'lista_desplegable', texto: 'Supervisor a evaluar', requerida: true, opcionesAgrupadas: supervisoresPorProyecto },
    { id: 'obra', tipo: 'texto', texto: 'Obra', requerida: true },

    { id: 's1', tipo: 'seccion', texto: 'Planificación y coordinación', icono: 'operaciones' },
    escala('p1', 'Comunica con anticipación el alcance, cronograma y prioridades de los trabajos.'),
    escala('p2', 'Coordina oportunamente accesos, permisos y frentes de trabajo para que el contratista pueda ejecutar sin paralizaciones.'),
    escala('p3', 'Cumple los plazos de entrega de frentes, revisiones y liberaciones que le corresponden.'),
    escala('p4', 'Cumple los compromisos y acuerdos que asume frente al contratista.'),

    { id: 's2', tipo: 'seccion', texto: 'Comunicación', icono: 'operaciones' },
    escala('p5', 'Las instrucciones que da son claras, completas y sin contradicciones.'),
    escala('p6', 'Gestiona oportunamente la disponibilidad de planos, especificaciones e información técnica necesaria para ejecutar los trabajos.'),
    escala('p7', 'Atiende y canaliza oportunamente las consultas técnicas del contratista, evitando retrasos innecesarios.'),
    escala('p8', 'Deja por escrito (cuaderno de obra, correo, actas) los cambios y acuerdos importantes.'),

    { id: 's3', tipo: 'seccion', texto: 'Calidad y cumplimiento', icono: 'ingenieria' },
    escala('p9', 'Verifica los trabajos con criterios técnicos claros y conocidos de antemano.'),
    escala('p10', 'Exige el cumplimiento de las normas técnicas, especificaciones del proyecto y requisitos del cliente.'),
    escala('p11', 'Exige y da ejemplo en el cumplimiento de las normas de seguridad (SSOMA) en obra.'),
    escala('p12', 'Realiza inspecciones, pruebas y liberaciones siguiendo los procedimientos establecidos y en el momento oportuno.'),

    { id: 's4', tipo: 'seccion', texto: 'Solución de problemas y toma de decisiones', icono: 'ingenieria' },
    escala('p13', 'Actúa con rapidez ante imprevistos o problemas en obra.'),
    escala('p14', 'Toma decisiones técnicas fundamentadas, oportunas y coherentes con las condiciones de obra.'),
    escala('p15', 'Propone alternativas viables cuando surge un impedimento.'),
    escala('p16', 'Escala oportunamente a Friopacking los temas que están fuera de su alcance.'),

    { id: 's5', tipo: 'seccion', texto: 'Relación profesional y soporte', icono: 'operaciones' },
    escala('p17', 'Trata al personal del contratista con respeto y profesionalismo.'),
    escala('p18', 'Es imparcial y justo al evaluar el trabajo del contratista.'),
    escala('p19', 'Está disponible y es fácil de contactar cuando el contratista lo necesita.'),
    escala('p20', 'Revisa y aprueba metrados, valorizaciones y conformidades de servicio en plazos razonables.'),
  ],
}

export default encuesta

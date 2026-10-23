import { supervisoresSsoma } from '../../lib/supervisoresSsoma.js'

// Los contratistas evalúan a los supervisores SSOMA. Las preguntas son afirmaciones,
// por eso la escala va de "Totalmente en desacuerdo" a "Totalmente de acuerdo".
const ACUERDO = { 1: 'Totalmente en desacuerdo', 10: 'Totalmente de acuerdo' }
const escala = (id, texto) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas: ACUERDO })

const encuesta = {
  id: 'contratistas-ssoma-octubre',
  titulo: 'Construyendo Juntos | SSOMA',
  descripcion: 'Evalúa el desempeño de los supervisores SSOMA desde tu experiencia como contratista. Indica qué tan de acuerdo estás con cada afirmación.',
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
    { id: 'supervisor', tipo: 'combo_busqueda', texto: 'Supervisor SSOMA a evaluar', requerida: true, opciones: supervisoresSsoma },
    { id: 'obra', tipo: 'texto', texto: 'Obra', requerida: true },

    { id: 's1', tipo: 'seccion', texto: 'Planificación y coordinación', icono: 'operaciones' },
    escala('p1', 'Comunica con anticipación los requisitos SSOMA para el ingreso a obra (documentación, exámenes médicos, SCTR, inducción).'),
    escala('p2', 'Coordina oportunamente inducciones, charlas, permisos e inspecciones, procurando una ejecución ordenada y segura de los trabajos.'),
    escala('p3', 'Cumple los plazos de revisión de documentos, aprobación de permisos (PETAR, ATS) y habilitación de personal.'),
    escala('p4', 'Cumple los compromisos y acuerdos que asume con el contratista.'),

    { id: 's2', tipo: 'seccion', texto: 'Comunicación', icono: 'operaciones' },
    escala('p5', 'Explica con claridad los estándares, procedimientos y reglas SSOMA aplicables a la obra.'),
    escala('p6', 'Informa a tiempo cualquier cambio en los requisitos SSOMA de Friopacking o del cliente.'),
    escala('p7', 'Responde en plazos razonables las consultas sobre documentación, permisos y procedimientos.'),
    escala('p8', 'Deja por escrito las observaciones, acuerdos y compromisos (actas, informes de inspección, correo).'),

    { id: 's3', tipo: 'seccion', texto: 'Calidad y cumplimiento', icono: 'ingenieria' },
    escala('p9', 'Revisa documentos e inspecciona en campo con criterios técnicos claros y consistentes.'),
    escala('p10', 'Comunica y aplica de manera consistente los requisitos legales y estándares SSOMA correspondientes a los trabajos del contratista.'),
    escala('p11', 'Verifica en campo el uso de EPP, la señalización y el control de condiciones de riesgo.'),
    escala('p12', 'Verifica que se cumplan los procedimientos de trabajo (IPERC, ATS, PETAR) y de manejo ambiental.'),

    { id: 's4', tipo: 'seccion', texto: 'Solución de problemas y toma de decisiones', icono: 'ingenieria' },
    escala('p13', 'Actúa con rapidez ante incidentes, actos o condiciones inseguras.'),
    escala('p14', 'Toma decisiones oportunas y fundamentadas para detener o reanudar trabajos según los riesgos identificados y las medidas de control establecidas.'),
    escala('p15', 'Propone medidas correctivas viables que permiten continuar con seguridad.'),
    escala('p16', 'Reporta y escala oportunamente los incidentes, y hace seguimiento al cierre de observaciones.'),

    { id: 's5', tipo: 'seccion', texto: 'Relación profesional y soporte', icono: 'operaciones' },
    escala('p17', 'Trata al personal del contratista con respeto y profesionalismo, promoviendo la prevención y el cumplimiento de las normas de seguridad.'),
    escala('p18', 'Es imparcial y aplica los mismos criterios a todos los contratistas.'),
    escala('p19', 'Está disponible en obra y es fácil de contactar cuando se le necesita.'),
    escala('p20', 'Orienta oportunamente al contratista sobre los requisitos documentarios SSOMA y los trámites de habilitación del personal.'),
  ],
}

export default encuesta

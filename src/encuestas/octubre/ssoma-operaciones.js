// EV-01 · SSOMA evalúa a Operaciones. Anónima: no pide datos del evaluador.
const ETIQUETAS = { 1: 'Muy deficiente', 10: 'Excelente' }
const escala = (id, texto) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas: ETIQUETAS })

const encuesta = {
  id: 'ssoma-operaciones-octubre',
  titulo: 'Operaciones seguras: la mirada de SSOMA',
  descripcion: 'SSOMA evalúa a Operaciones: seguridad, cumplimiento y trabajo conjunto en campo. Responde según tu experiencia; es anónima y toma unos 5 minutos.',
  respondedor: 'interno',
  activa: true,
  mes: 'Octubre',
  leyendaTiers: [
    { rango: '1', texto: 'Muy deficiente' },
    { rango: '10', texto: 'Excelente' },
  ],
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'Planificación y coordinación', icono: 'operaciones' },
    escala('p1', 'Operaciones incluye los requisitos de seguridad (IPERC, ATS, PETAR) en la planificación de sus trabajos antes de iniciarlos.'),
    escala('p2', 'Operaciones solicita con anticipación la revisión o aprobación de SSOMA para los trabajos de alto riesgo.'),
    escala('p3', 'Operaciones coordina con SSOMA la inducción y acreditación del personal y contratistas antes de su ingreso a obra.'),
    escala('p4', 'Operaciones prevé y dispone a tiempo los EPP, equipos y recursos de seguridad que requiere cada trabajo.'),

    { id: 's2', tipo: 'seccion', texto: 'Comunicación', icono: 'operaciones' },
    escala('p5', 'Operaciones reporta a SSOMA de forma inmediata los incidentes, accidentes y casi-accidentes.'),
    escala('p6', 'Operaciones informa con anticipación los cambios de alcance, frente o personal que modifican las condiciones de seguridad.'),
    escala('p7', 'Operaciones responde con oportunidad las observaciones y consultas de SSOMA.'),
    escala('p8', 'Operaciones difunde a su personal y contratistas las alertas, lecciones aprendidas y disposiciones de SSOMA.'),

    { id: 's3', tipo: 'seccion', texto: 'Calidad y cumplimiento', icono: 'ingenieria' },
    escala('p9', 'El personal de Operaciones usa correctamente el EPP y cumple los estándares de seguridad en campo.'),
    escala('p10', 'Operaciones completa de forma correcta y a tiempo la documentación SSOMA (ATS, permisos de trabajo, checklists, registros).'),
    escala('p11', 'Operaciones cumple las normas ambientales en sus frentes de trabajo (residuos, orden y limpieza, derrames).'),
    escala('p12', 'Operaciones exige y verifica que sus contratistas cumplan los requisitos SSOMA.'),

    { id: 's4', tipo: 'seccion', texto: 'Solución de problemas y toma de decisiones', icono: 'ingenieria' },
    escala('p13', 'Operaciones detiene los trabajos ante una condición insegura, sin priorizar el plazo sobre la seguridad.'),
    escala('p14', 'Operaciones implementa a tiempo las acciones correctivas derivadas de inspecciones e investigaciones.'),
    escala('p15', 'Operaciones participa activamente en la investigación de incidentes y en el análisis de sus causas.'),
    escala('p16', 'Operaciones escala oportunamente a SSOMA los riesgos que no puede controlar en campo.'),

    { id: 's5', tipo: 'seccion', texto: 'Relación profesional y soporte', icono: 'operaciones' },
    escala('p17', 'Operaciones recibe las observaciones de SSOMA con apertura, sin verlas como un obstáculo para el trabajo.'),
    escala('p18', 'Operaciones da facilidades a SSOMA para realizar inspecciones, auditorías y charlas en campo.'),
    escala('p19', 'Las jefaturas y supervisores de Operaciones dan el ejemplo con su compromiso con la seguridad.'),
    escala('p20', 'Operaciones trata a SSOMA como un aliado para ejecutar los trabajos de forma segura.'),
  ],
}

export default encuesta

// EV-07 · Grupo Friopacking evalúa a Capital Humano. Anónima: no pide datos del evaluador.
const ETIQUETAS = { 1: 'Muy deficiente', 10: 'Excelente' }
const escala = (id, texto, nota) => ({
  id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas: ETIQUETAS,
  ...(nota && { nota, noAplica: true }),
})

const encuesta = {
  id: 'grupo-capital-humano-octubre',
  titulo: 'El Capital Humano que el Grupo necesita',
  descripcion: 'El Grupo Friopacking evalúa a Capital Humano: selección, planilla, comunicación y trato al personal. Algunas preguntas son solo para jefaturas o para quienes participaron en un caso: si no te corresponden, marca «No aplica». Es anónima y toma unos 5 minutos.',
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
    escala('p1', '¿Capital Humano presenta candidatos dentro del plazo definido con el área solicitante?', 'Solo jefaturas que utilizaron este servicio. Si no es tu caso, marca «No aplica».'),
    escala('p2', '¿Capital Humano organiza oportunamente la inducción del personal nuevo?'),
    escala('p3', '¿Capital Humano acuerda con las jefaturas un plan de capacitación basado en las necesidades identificadas de sus equipos?', 'Solo jefaturas que utilizaron este servicio. Si no es tu caso, marca «No aplica».'),
    escala('p4', '¿Capital Humano cumple las fechas que comunica para las etapas de evaluación de desempeño bajo su responsabilidad?', 'Solo jefaturas que utilizaron este servicio. Si no es tu caso, marca «No aplica».'),

    { id: 's2', tipo: 'seccion', texto: 'Comunicación', icono: 'operaciones' },
    escala('p5', '¿Capital Humano comunica con claridad las políticas, beneficios y procedimientos internos?'),
    escala('p6', '¿Capital Humano comunica los cambios que afectan al personal e indica qué debe hacer el colaborador y desde cuándo aplican?'),
    escala('p7', '¿Capital Humano responde con rapidez las consultas de los colaboradores?'),
    escala('p8', '¿Los comunicados de Capital Humano permiten identificar con claridad qué información o acción corresponde al colaborador y a quién acudir para resolver dudas?'),

    { id: 's3', tipo: 'seccion', texto: 'Calidad y cumplimiento', icono: 'ingenieria' },
    escala('p9', 'En el período evaluado, ¿mis remuneraciones y beneficios se abonaron en las fechas informadas y sin errores pendientes de regularización?'),
    escala('p10', '¿Capital Humano gestiona las renovaciones de contratos y coberturas del personal dentro de los plazos establecidos, cuando recibe oportunamente la información y las aprobaciones requeridas?', 'Solo responsables con acceso a los registros del proceso. Si no es tu caso, marca «No aplica».'),
    escala('p11', '¿Los candidatos presentados por Capital Humano cumplen los requisitos del perfil acordado con el área solicitante?', 'Solo jefaturas que utilizaron este servicio. Si no es tu caso, marca «No aplica».'),
    escala('p12', '¿Capital Humano emite boletas, certificados y constancias correctos y a tiempo?'),

    { id: 's4', tipo: 'seccion', texto: 'Solución de problemas y toma de decisiones', icono: 'ingenieria' },
    escala('p13', 'Cuando he solicitado su intervención en un conflicto laboral, ¿Capital Humano ha escuchado mi versión y explicado los pasos de atención?', 'Solo si participaste en el caso o proceso. Si no es tu caso, marca «No aplica».'),
    escala('p14', 'Cuando se identifican problemas de rotación o ausentismo, ¿Capital Humano acuerda con la jefatura acciones de atención y realiza seguimiento de su avance?', 'Solo jefaturas que utilizaron este servicio. Si no es tu caso, marca «No aplica».'),
    escala('p15', '¿Capital Humano asesora adecuadamente a las jefaturas en decisiones de gestión de personas?', 'Solo jefaturas que utilizaron este servicio. Si no es tu caso, marca «No aplica».'),
    escala('p16', '¿Capital Humano resuelve con agilidad las incidencias en planilla, vacaciones o beneficios?'),

    { id: 's5', tipo: 'seccion', texto: 'Relación profesional y soporte', icono: 'operaciones' },
    escala('p17', '¿Capital Humano trata a los colaboradores con respeto y empatía?'),
    escala('p18', 'En mis gestiones con Capital Humano, ¿la información personal o sensible se ha tratado mediante canales privados y con las personas necesarias para atender el caso?'),
    escala('p19', '¿Capital Humano es accesible y cercano para los colaboradores de todas las empresas y sedes?'),
    escala('p20', '¿Capital Humano comunica las acciones acordadas a partir de las evaluaciones de clima laboral y reporta su avance?', 'Solo si participaste en el caso o proceso. Si no es tu caso, marca «No aplica».'),
  ],
}

export default encuesta

// Evaluación de desempeño de Capital Humano por parte de los colaboradores. Anónima: no pide datos del evaluador.
const ETIQUETAS = { 1: 'Muy deficiente', 10: 'Excelente' }
const escala = (id, texto) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas: ETIQUETAS })

const encuesta = {
  id: 'capital-humano-septiembre',
  titulo: 'Evaluación de Desempeño – Capital Humano',
  descripcion: 'Esta encuesta es anónima. Las respuestas se analizan de forma consolidada.',
  respondedor: 'interno',
  activa: true,
  mes: 'Septiembre',
  leyendaTiers: [
    { rango: '1', texto: 'Muy deficiente' },
    { rango: '10', texto: 'Excelente' },
  ],
  preguntas: [
    { id: 's1', tipo: 'seccion', texto: 'Atención y soporte', icono: 'operaciones' },
    escala('p1', '¿Cómo califica la atención y disposición de Capital Humano cuando realiza una consulta o solicitud?'),
    escala('p2', '¿Cómo califica el tiempo de respuesta de Capital Humano a sus solicitudes?'),
    escala('p3', '¿Qué tan clara y precisa es la información que recibe de Capital Humano?'),
    escala('p4', '¿Cómo califica el seguimiento de sus solicitudes hasta que quedan resueltas?'),

    { id: 's2', tipo: 'seccion', texto: 'Planilla y beneficios', icono: 'finanzas' },
    escala('p5', '¿Qué tan exacta es su planilla en pagos, descuentos y boletas?'),
    escala('p6', '¿Cómo califica la atención a sus consultas sobre remuneración, CTS, gratificaciones u otros beneficios?'),
    escala('p7', '¿Cómo califica la gestión de sus vacaciones, permisos y licencias?'),
    escala('p8', '¿Cómo califica la emisión de constancias, certificados y otros documentos laborales?'),

    { id: 's3', tipo: 'seccion', texto: 'Comunicación y clima laboral', icono: 'operaciones' },
    escala('p9', '¿Qué tan bien comunica Capital Humano las políticas, procedimientos y normas internas?'),
    escala('p10', '¿Con cuánta anticipación comunica Capital Humano los cambios o actividades que le afectan?'),
    escala('p11', '¿Cómo califica la coordinación de Capital Humano con su área?'),
    escala('p12', '¿Cómo califica las acciones de Capital Humano para mejorar el clima laboral y el bienestar de los colaboradores?'),

    { id: 's4', tipo: 'seccion', texto: 'Trato y confianza', icono: 'hermetica' },
    escala('p13', '¿Qué tan respetuoso y profesional es el trato del equipo de Capital Humano?'),
    escala('p14', '¿Qué tan empático es Capital Humano frente a su situación o necesidades?'),
    escala('p15', '¿Qué tanta confianza le genera Capital Humano en el manejo confidencial de su información?'),
    escala('p16', '¿Qué tan imparcial es Capital Humano al atender situaciones o conflictos?'),

    { id: 's5', tipo: 'seccion', texto: 'Desarrollo y gestión del talento', icono: 'ingenieria' },
    escala('p17', '¿Cómo califica las oportunidades de capacitación que Capital Humano le ofrece para su desarrollo profesional?'),
    escala('p18', '¿Cómo califica la gestión de Capital Humano para cubrir los puestos vacantes con personal adecuado?'),
    escala('p19', '¿Cómo califica la inducción que recibió al ingresar a la empresa?'),
    escala('p20', '¿Cómo califica la gestión de Capital Humano en los procesos de evaluación de desempeño?'),
  ],
}

export default encuesta

// EV-02 · Logística evalúa a Operaciones. Anónima: no pide datos del evaluador.
const ETIQUETAS = { 1: 'Muy deficiente', 10: 'Excelente' }
const escala = (id, texto) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 10, etiquetas: ETIQUETAS })

const encuesta = {
  id: 'logistica-operaciones-cadena-octubre',
  titulo: 'Logística y Operaciones: trabajando en cadena',
  descripcion: 'Logística evalúa a Operaciones: requerimientos, entregas y coordinación de abastecimiento. Responde según tu experiencia; es anónima y toma unos 5 minutos.',
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
    escala('p1', '¿Operaciones entrega sus requerimientos de materiales, equipos y servicios con la anticipación necesaria para gestionarlos?'),
    escala('p2', '¿Operaciones planifica sus necesidades según el cronograma del proyecto, evitando pedidos de urgencia?'),
    escala('p3', '¿Operaciones coordina con anticipación las fechas, lugar y condiciones de entrega en obra?'),
    escala('p4', '¿Operaciones comunica la programación de despachos y traslados con tiempo suficiente para asignar transporte?'),

    { id: 's2', tipo: 'seccion', texto: 'Comunicación', icono: 'operaciones' },
    escala('p5', '¿Los requerimientos de Operaciones son claros y completos (especificaciones, cantidades, unidades, marcas)?'),
    escala('p6', '¿Operaciones informa oportunamente los cambios o cancelaciones de sus requerimientos?'),
    escala('p7', '¿Operaciones confirma la recepción de materiales y reporta a tiempo faltantes o daños?'),
    escala('p8', '¿Operaciones responde con rapidez las consultas de Logística sobre especificaciones o alternativas?'),

    { id: 's3', tipo: 'seccion', texto: 'Calidad y cumplimiento', icono: 'ingenieria' },
    escala('p9', '¿Operaciones sigue el procedimiento formal de solicitud y aprobación de requerimientos?'),
    escala('p10', '¿Operaciones devuelve sobrantes, herramientas y equipos en buen estado y en los plazos acordados?'),
    escala('p11', '¿Operaciones cuida y almacena adecuadamente los materiales y equipos en obra?'),
    escala('p12', '¿Operaciones firma y entrega a tiempo las guías, conformidades y actas que sustentan las entregas?'),

    { id: 's4', tipo: 'seccion', texto: 'Solución de problemas y toma de decisiones', icono: 'ingenieria' },
    escala('p13', '¿Operaciones evalúa con agilidad las alternativas que propone Logística ante falta de stock o retrasos?'),
    escala('p14', '¿Operaciones decide oportunamente cuando hay que elegir entre plazo, costo y especificación?'),
    escala('p15', '¿Operaciones busca soluciones junto con Logística ante imprevistos, en lugar de solo trasladar el problema?'),
    escala('p16', '¿Operaciones escala los problemas de abastecimiento a tiempo y por el canal adecuado?'),

    { id: 's5', tipo: 'seccion', texto: 'Relación profesional y soporte', icono: 'operaciones' },
    escala('p17', '¿Operaciones trata con respeto y cordialidad al personal de Logística?'),
    escala('p18', '¿Operaciones comprende los tiempos de proveedores, transporte e importaciones?'),
    escala('p19', '¿Operaciones está disponible para validar o atender a Logística cuando se le necesita?'),
    escala('p20', '¿Operaciones reconoce el aporte de Logística al resultado de los proyectos?'),
  ],
}

export default encuesta

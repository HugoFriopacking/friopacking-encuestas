const encuesta = {
  id: 'contratistas-supervisores-julio',
  titulo: 'Contratistas — Supervisores — Julio',
  descripcion: 'Evaluación de los contratistas hacia los supervisores de obra',
  respondedor: 'externo',
  activa: true,
  mes: 'Julio',
  modo: 'secciones',
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 'supervisor', tipo: 'texto', texto: 'Supervisor a evaluar', requerida: true },
    { id: 'obra', tipo: 'texto', texto: 'Obra', requerida: true },

    { id: 's1', tipo: 'seccion', texto: 'Planificación y coordinación', icono: 'operaciones' },
    { id: 'p1', tipo: 'escala', texto: '¿El supervisor comunica claramente el alcance de los trabajos asignados al contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2', tipo: 'escala', texto: '¿El supervisor informa oportunamente las prioridades y la secuencia de actividades del proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3', tipo: 'escala', texto: '¿El supervisor proporciona a tiempo los planos, especificaciones e información técnica necesarios para ejecutar los trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4', tipo: 'escala', texto: '¿El supervisor coordina adecuadamente las actividades del contratista con otros frentes de trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p5', tipo: 'escala', texto: '¿El supervisor gestiona de manera eficiente las interferencias que pueden afectar la ejecución de los trabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p6', tipo: 'escala', texto: '¿El supervisor comunica con anticipación los cambios de alcance, prioridades o condiciones del proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Seguimiento y cumplimiento', icono: 'logistica' },
    { id: 'p7', tipo: 'escala', texto: '¿El supervisor realiza un seguimiento constante al avance físico de los trabajos contratados?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8', tipo: 'escala', texto: '¿El supervisor identifica oportunamente las desviaciones respecto al cronograma, metas o compromisos establecidos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p9', tipo: 'escala', texto: '¿El supervisor toma decisiones oportunas para prevenir retrasos, paralizaciones o retrabajos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p10', tipo: 'escala', texto: '¿El supervisor mantiene actualizada la información sobre avances, pendientes y restricciones del proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p11', tipo: 'escala', texto: '¿El supervisor cumple los compromisos y plazos acordados con el contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿El supervisor realiza una validación oportuna de los trabajos terminados?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Gestión técnica y calidad', icono: 'ingenieria' },
    { id: 'p13', tipo: 'escala', texto: '¿El supervisor demuestra conocimiento técnico suficiente para dirigir y controlar los trabajos del proyecto?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p14', tipo: 'escala', texto: '¿El supervisor resuelve oportunamente las consultas técnicas planteadas por el contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿El supervisor verifica que los trabajos se ejecuten conforme a planos, especificaciones y estándares de calidad definidos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p16', tipo: 'escala', texto: '¿El supervisor identifica y comunica oportunamente las observaciones de calidad detectadas durante la ejecución?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p17', tipo: 'escala', texto: '¿El supervisor brinda indicaciones claras para corregir trabajos observados, incompletos o no conformes?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Comunicación y relacionamiento', icono: 'finanzas' },
    { id: 'p18', tipo: 'escala', texto: '¿El supervisor mantiene una comunicación clara, respetuosa y profesional con el personal del contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p19', tipo: 'escala', texto: '¿El supervisor escucha y considera oportunamente las sugerencias, consultas o alertas técnicas del contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p20', tipo: 'escala', texto: '¿El supervisor facilita, en términos generales, una ejecución ordenada, eficiente y coordinada de los trabajos contratados?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
  ],
}
export default encuesta

import { supervisoresPorProyecto } from '../../lib/supervisores.js'

const encuesta = {
  id: 'contratistas-supervisores-septiembre',
  titulo: 'Supervisores (Septiembre)',
  descripcion: 'Evaluación de los contratistas hacia los supervisores de obra',
  respondedor: 'externo',
  activa: true,
  mes: 'Septiembre',
  campoEvaluado: 'supervisor',
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 'supervisor', tipo: 'lista_desplegable', texto: 'Supervisor a evaluar', requerida: true, opcionesAgrupadas: supervisoresPorProyecto },
    { id: 'obra', tipo: 'texto', texto: 'Obra', requerida: true },

    { id: 's1', tipo: 'seccion', texto: 'Comunicación y coordinación', icono: 'operaciones' },
    { id: 'p1', tipo: 'escala', texto: '¿Qué tan claramente comunica los objetivos, alcances y prioridades del trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p2', tipo: 'escala', texto: '¿Qué tan claras y completas son las instrucciones que brinda antes de iniciar una actividad?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p3', tipo: 'escala', texto: '¿Con qué oportunidad comunica los cambios, restricciones o decisiones que afectan el trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p4', tipo: 'escala', texto: '¿Qué tan dispuesto está a escuchar consultas, dudas o sugerencias del personal contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p5', tipo: 'escala', texto: '¿Qué tan efectiva es su coordinación con contratistas, supervisores y otras áreas involucradas?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's2', tipo: 'seccion', texto: 'Planificación y cumplimiento', icono: 'logistica' },
    { id: 'p6', tipo: 'escala', texto: '¿Qué tan bien planifica las actividades para evitar retrasos, tiempos muertos o trabajos repetidos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p7', tipo: 'escala', texto: '¿Qué tan oportunamente proporciona la información, autorizaciones o recursos necesarios para trabajar?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p8', tipo: 'escala', texto: '¿En qué medida cumple los compromisos y acuerdos establecidos con el contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p9', tipo: 'escala', texto: '¿Qué tan adecuado es el seguimiento que realiza al avance de las actividades?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p10', tipo: 'escala', texto: '¿Qué tan bien organiza y prioriza las actividades cuando existen varios trabajos pendientes?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's3', tipo: 'seccion', texto: 'Capacidad operativa y solución de problemas', icono: 'ingenieria' },
    { id: 'p11', tipo: 'escala', texto: '¿Qué nivel de conocimiento demuestra sobre los trabajos y procesos que supervisa o coordina?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p12', tipo: 'escala', texto: '¿Qué tan rápido responde cuando se presenta un problema operativo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p13', tipo: 'escala', texto: '¿Qué tan efectivas son las soluciones que propone ante dificultades o imprevistos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p14', tipo: 'escala', texto: '¿Qué tan oportunamente toma decisiones para evitar retrasos en el trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p15', tipo: 'escala', texto: '¿Qué tan bien identifica anticipadamente los riesgos o problemas que podrían afectar la actividad?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's4', tipo: 'seccion', texto: 'Seguridad, calidad y cumplimiento', icono: 'finanzas' },
    { id: 'p16', tipo: 'escala', texto: '¿Qué tan consistente es al exigir el cumplimiento de las normas de seguridad?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p17', tipo: 'escala', texto: '¿Qué tan bien verifica que los trabajos se realicen de acuerdo con los estándares de calidad establecidos?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p18', tipo: 'escala', texto: '¿Qué tan claros y justos son los criterios que utiliza para observar, aceptar o rechazar un trabajo?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },

    { id: 's5', tipo: 'seccion', texto: 'Trato y profesionalismo', icono: 'frioteam' },
    { id: 'p19', tipo: 'escala', texto: '¿Qué tan respetuoso, imparcial y profesional es su trato hacia el personal contratista?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
    { id: 'p20', tipo: 'escala', texto: 'En términos generales, ¿cómo califica su desempeño como supervisor o asistente de Operaciones?', requerida: true, min: 1, max: 10, etiquetas: { 1: 'Muy malo', 10: 'Muy bueno' } },
  ],
}
export default encuesta

// Evaluación de clima laboral del área de Ingeniería. Escala de acuerdo 1–5 (Likert). Anónima: no pide datos del evaluador.
const ETIQUETAS = { 1: 'Totalmente en desacuerdo', 5: 'Totalmente de acuerdo' }
const escala = (id, texto) => ({ id, tipo: 'escala', texto, requerida: true, min: 1, max: 5, etiquetas: ETIQUETAS })

const encuesta = {
  id: 'clima-ingenieria-noviembre',
  titulo: 'Evaluación de Clima - Ingeniería',
  descripcion: 'Para las preguntas 1 a 9, indica qué tan de acuerdo estás con cada afirmación. Es anónima y toma unos 3 minutos.',
  respondedor: 'interno',
  fotoObra: true,  // lleva foto de obra aunque no sea encuesta de campo (pedido 27-11)
  activa: true,
  mes: 'Noviembre',
  publicada: '2026-11-27T10:00',  // fecha en que se subió al portal (orden en la portada)
  leyendaTiers: [
    { rango: '1', texto: 'Totalmente en desacuerdo' },
    { rango: '2', texto: 'En desacuerdo' },
    { rango: '3', texto: 'Ni de acuerdo ni en desacuerdo' },
    { rango: '4', texto: 'De acuerdo' },
    { rango: '5', texto: 'Totalmente de acuerdo' },
  ],
  preguntas: [
    escala('p1', '¿Te sientes motivado para realizar tus actividades?'),
    escala('p2', '¿Cuentas con los recursos necesarios para realizar tu trabajo adecuadamente?'),
    escala('p3', '¿La carga de trabajo que se te asigna es manejable dentro de tu jornada habitual?'),
    escala('p4', '¿Recibes un trato respetuoso en tu trabajo?'),
    escala('p5', '¿Puedes expresar preocupaciones sobre el trabajo sin temor a consecuencias negativas por hacerlo?'),
    escala('p6', '¿Puedes contar con tus compañeros cuando necesitas ayuda para resolver un problema?'),
    escala('p7', '¿Recibes de tu jefatura directa el apoyo que necesitas para realizar tu trabajo?'),
    escala('p8', '¿Tus contribuciones son reconocidas de manera justa?'),
    escala('p9', '¿Tienes oportunidades de desarrollar las capacidades que necesitas para crecer profesionalmente?'),
    { id: 'p10', tipo: 'texto', multilinea: true, texto: '¿Qué cambiarías para mejorar tu experiencia de trabajo?', requerida: false },
  ],
}

export default encuesta

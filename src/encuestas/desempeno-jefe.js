const encuesta = {
  id: 'desempeno-jefe',
  titulo: 'Evaluación de Desempeño — Jefatura',
  descripcion: 'Evaluación de desempeño para supervisores y jefes de área',
  respondedor: 'interno',
  preguntas: [
    { id: 'nombre_evaluado', tipo: 'texto', texto: '¿Nombre del colaborador que estás evaluando?', requerida: true },
    { id: 'nombre_evaluador', tipo: 'texto', texto: '¿Tu nombre (evaluador)?', requerida: true },
    {
      id: 'zona', tipo: 'opcion_multiple', texto: '¿En qué zona trabaja el colaborador?', requerida: true,
      opciones: ['Norte — Trujillo', 'Centro — Lima', 'Sur — Ica'],
    },
    {
      id: 'desempeno_general', tipo: 'escala', texto: 'Desempeño general del colaborador',
      requerida: true, min: 1, max: 5, etiquetas: { 1: 'Muy bajo', 5: 'Excelente' },
    },
    {
      id: 'actitud', tipo: 'escala', texto: 'Actitud y disposición frente al trabajo',
      requerida: true, min: 1, max: 5, etiquetas: { 1: 'Muy bajo', 5: 'Excelente' },
    },
    {
      id: 'confiabilidad', tipo: 'escala', texto: 'Confiabilidad y responsabilidad',
      requerida: true, min: 1, max: 5, etiquetas: { 1: 'Muy bajo', 5: 'Excelente' },
    },
    {
      id: 'recomendaria_ascenso', tipo: 'si_no',
      texto: '¿Recomendarías a este colaborador para una promoción o mayor responsabilidad?',
      requerida: true,
    },
    { id: 'comentarios', tipo: 'texto', texto: 'Comentarios adicionales sobre el desempeño', requerida: false },
  ],
}
export default encuesta

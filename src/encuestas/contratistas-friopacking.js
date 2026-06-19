const encuesta = {
  id: 'contratistas-friopacking',
  titulo: 'Contratistas — Grupo Friopacking',
  descripcion: 'Evaluación de los contratistas hacia Grupo Friopacking',
  respondedor: 'externo',
  activa: false,
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 'nombre', tipo: 'texto', texto: 'Nombre Completo', requerida: true },
    { id: 'obra', tipo: 'texto', texto: 'Obra', requerida: true },
  ],
}
export default encuesta

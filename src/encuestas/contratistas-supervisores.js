const encuesta = {
  id: 'contratistas-supervisores',
  titulo: 'Contratistas — Supervisores',
  descripcion: 'Evaluación de los contratistas hacia los supervisores de obra',
  respondedor: 'externo',
  activa: false,
  leyenda: '1 = Muy malo · 5 = Regular · 10 = Muy bueno',
  preguntas: [
    { id: 'nombre', tipo: 'texto', texto: 'Nombre Completo', requerida: true },
    { id: 'obra', tipo: 'texto', texto: 'Obra', requerida: true },
  ],
}
export default encuesta

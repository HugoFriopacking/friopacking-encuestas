import contratistasSsoma from './junio/contratistas-ssoma.js'
import ssomaContratistas from './junio/ssoma-contratistas.js'
import contratistaSupervisores from './junio/contratistas-supervisores.js'
import contratistasFriopacking from './junio/contratistas-friopacking.js'
import contratistaSupervisoresJulio from './julio/contratistas-supervisores-julio.js'

// Para activar/desactivar una encuesta cambia activa: true/false en su archivo
const encuestas = [
  contratistasSsoma,
  ssomaContratistas,
  contratistaSupervisores,
  contratistasFriopacking,
  contratistaSupervisoresJulio,
]

// Solo exporta las activas para mostrar en la home
export const encuestasActivas = encuestas.filter(e => e.activa)
export default encuestas

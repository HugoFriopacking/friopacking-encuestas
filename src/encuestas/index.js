import contratistasSsoma from './contratistas-ssoma.js'
import ssomaContratistas from './ssoma-contratistas.js'
import contratistaSupervisores from './contratistas-supervisores.js'
import contratistasFriopacking from './contratistas-friopacking.js'
import contratistaSupervisoresJulio from './contratistas-supervisores-julio.js'

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

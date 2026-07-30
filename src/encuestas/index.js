import contratistasSsoma from './junio/contratistas-ssoma.js'
import ssomaContratistas from './junio/ssoma-contratistas.js'
import contratistaSupervisores from './junio/contratistas-supervisores.js'
import contratistasFriopacking from './junio/contratistas-friopacking.js'
import contratistaSupervisoresJulio from './julio/contratistas-supervisores-julio.js'
import contratistasSsomaJulio from './julio/contratistas-ssoma-julio.js'
import lideresGrupoEmpresarial from './julio/lideres-grupo-empresarial.js'
import contratistasFriopackingJulio from './julio/contratistas-friopacking-julio.js'

// Para activar/desactivar una encuesta cambia activa: true/false en su archivo
const encuestas = [
  contratistasSsoma,
  ssomaContratistas,
  contratistaSupervisores,
  contratistasFriopacking,
  contratistaSupervisoresJulio,
  contratistasSsomaJulio,
  lideresGrupoEmpresarial,
  contratistasFriopackingJulio,
]

// Solo exporta las activas para mostrar en la home
export const encuestasActivas = encuestas.filter(e => e.activa)
export default encuestas

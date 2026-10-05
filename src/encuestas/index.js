import contratistasSsoma from './junio/contratistas-ssoma.js'
import ssomaContratistas from './junio/ssoma-contratistas.js'
import contratistaSupervisores from './junio/contratistas-supervisores.js'
import contratistasFriopacking from './junio/contratistas-friopacking.js'
import contratistaSupervisoresJulio from './julio/contratistas-supervisores-julio.js'
import contratistasSsomaJulio from './julio/contratistas-ssoma-julio.js'
import lideresGrupoEmpresarial from './julio/lideres-grupo-empresarial.js'
import contratistasFriopackingJulio from './julio/contratistas-friopacking-julio.js'
import contratistaSupervisoresAgosto from './agosto/contratistas-supervisores-agosto.js'
import contratistasSsomaAgosto from './agosto/contratistas-ssoma-agosto.js'
import contratistasFriopackingAgosto from './agosto/contratistas-friopacking-agosto.js'
import ssomaContratistasAgosto from './agosto/ssoma-contratistas-agosto.js'
import usoLicenciasIa from './septiembre/uso-licencias-ia.js'
import contratistaSupervisoresSeptiembre from './septiembre/contratistas-supervisores-septiembre.js'
import contratistasSsomaSeptiembre from './septiembre/contratistas-ssoma-septiembre.js'
import contratistasFriopackingSeptiembre from './septiembre/contratistas-friopacking-septiembre.js'
import operacionesAreasSoporte from './septiembre/operaciones-areas-soporte.js'
import logisticaOperaciones from './septiembre/logistica-operaciones.js'
import capitalHumanoSeptiembre from './septiembre/capital-humano-septiembre.js'
import despegaConIa from './octubre/despega-con-ia.js'

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
  contratistaSupervisoresAgosto,
  contratistasSsomaAgosto,
  contratistasFriopackingAgosto,
  ssomaContratistasAgosto,
  usoLicenciasIa,
  contratistaSupervisoresSeptiembre,
  contratistasSsomaSeptiembre,
  contratistasFriopackingSeptiembre,
  operacionesAreasSoporte,
  logisticaOperaciones,
  capitalHumanoSeptiembre,
  despegaConIa,
]

// Solo exporta las activas para mostrar en la home
export const encuestasActivas = encuestas.filter(e => e.activa)
export default encuestas

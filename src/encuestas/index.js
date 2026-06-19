import desempenoColaborador from './desempeno-colaborador.js'
import desempenoJefe from './desempeno-jefe.js'

// Para agregar una nueva encuesta:
// 1. Crea el archivo en esta carpeta siguiendo la misma estructura
// 2. Impórtalo aquí y agrégalo al array
const encuestas = [
  desempenoColaborador,
  desempenoJefe,
]

export default encuestas
export { desempenoColaborador, desempenoJefe }

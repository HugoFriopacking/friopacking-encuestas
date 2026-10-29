// Fotos de obra para la portada de cada encuesta y la pantalla final.
// Están en public/obra en dos tamaños WebP: obra-NN.webp (hasta 1600 px) y obra-NN-800.webp.
// `ancho` es el ancho real del archivo grande y `pos` el encuadre cuando la franja recorta la foto.
export const FOTOS_OBRA = [
  { n: '01', ancho: 1500, pos: '50% 62%' },  // sala de compresores
  { n: '02', ancho: 1600, pos: '50% 50%' },  // cámara de almacenamiento
  { n: '03', ancho: 1600, pos: '50% 58%' },  // compresores Frick
  { n: '04', ancho: 1600, pos: '50% 60%' },  // planta de frío abierta
  { n: '05', ancho: 1600, pos: '50% 55%' },  // puertas rápidas
  { n: '06', ancho: 1087, pos: '50% 62%' },  // montaje de paneles y racks
  { n: '07', ancho: 1600, pos: '50% 55%' },  // sala de máquinas en montaje
  { n: '08', ancho: 1445, pos: '50% 45%' },  // condensadores en techo
  { n: '09', ancho: 1447, pos: '50% 38%' },  // izaje con grúa
]

export function fotoAleatoria() {
  return FOTOS_OBRA[Math.floor(Math.random() * FOTOS_OBRA.length)]
}

export function fotoPorNumero(n) {
  return FOTOS_OBRA.find((f) => f.n === n) || null
}

// Atributos de <img> para una foto: el navegador elige 800 px en móvil y la grande en pantallas anchas.
export function atributosFoto(foto, sizes) {
  return {
    src: `/obra/obra-${foto.n}.webp`,
    srcSet: `/obra/obra-${foto.n}-800.webp 800w, /obra/obra-${foto.n}.webp ${foto.ancho}w`,
    sizes,
    style: { objectPosition: foto.pos },
    alt: '',
    decoding: 'async',
  }
}

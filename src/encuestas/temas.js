// Área o tema que evalúa cada encuesta, para el filtro "Área evaluada" de la portada.
// Se decide por el id: la primera regla que coincide gana. Una encuesta nueva que no
// coincida con ninguna aparece en "Otras" hasta que se agregue su regla aquí.
const REGLAS = [
  { tema: 'Contratistas', test: (id) => id.startsWith('ssoma-contratistas') },
  { tema: 'SSOMA', test: (id) => id.startsWith('contratistas-ssoma') },
  { tema: 'Supervisores de obra', test: (id) => id.startsWith('contratistas-supervisores') },
  { tema: 'Grupo Friopacking', test: (id) => id.startsWith('contratistas-friopacking') || id === 'lideres-grupo-empresarial' },
  { tema: 'Operaciones', test: (id) => /-operaciones/.test(id) },
  { tema: 'Áreas de soporte', test: (id) => id.startsWith('operaciones-areas-soporte') },
  { tema: 'Adm. y Finanzas', test: (id) => id.endsWith('finanzas-octubre') || /-finanzas$/.test(id) },
  { tema: 'Capital Humano', test: (id) => id.includes('capital-humano') },
  { tema: 'Capacitación e IA', test: (id) => /(^|-)ia(-|$)|capacitacion/.test(id) },
]

export function temaDe(encuesta) {
  return REGLAS.find((r) => r.test(encuesta.id))?.tema || 'Otras'
}

// Orden fijo de las opciones del filtro (las que no tengan encuestas no se muestran)
export const TEMAS_ORDEN = [...REGLAS.map((r) => r.tema), 'Otras']

// Transición de color para la escala 1-10: rojo (1-2) -> naranja/ámbar (3-4) -> amarillo (5-7) -> verde (8-10)
export function scaleColor(val) {
  const v = Math.round(val)
  if (v <= 1) return { bg: '#fef2f2', border: '#fca5a5', text: '#991b1b', active: '#991b1b' }
  if (v === 2) return { bg: '#fef2f2', border: '#fca5a5', text: '#dc2626', active: '#dc2626' }
  if (v === 3) return { bg: '#fff7ed', border: '#fdba74', text: '#ea580c', active: '#ea580c' }
  if (v === 4) return { bg: '#fffbeb', border: '#fcd34d', text: '#d97706', active: '#d97706' }
  if (v === 5) return { bg: '#fefce8', border: '#fde047', text: '#eab308', active: '#eab308' }
  if (v === 6) return { bg: '#fefce8', border: '#fde047', text: '#ca8a04', active: '#ca8a04' }
  if (v === 7) return { bg: '#fdf6e3', border: '#e8d48b', text: '#92700a', active: '#92700a' }
  if (v === 8) return { bg: '#f0fdf4', border: '#86efac', text: '#22c55e', active: '#22c55e' }
  if (v === 9) return { bg: '#ecfdf5', border: '#6ee7b7', text: '#16a34a', active: '#16a34a' }
  return { bg: '#ecfdf5', border: '#34d399', text: '#15803d', active: '#15803d' }
}

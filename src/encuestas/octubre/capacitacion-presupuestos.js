// Encuesta de cierre de la capacitación de Presupuestos. Anónima: no pide datos del participante.
const encuesta = {
  id: 'capacitacion-presupuestos',
  titulo: 'Capacitación de Presupuestos',
  descripcion: 'Cuéntanos qué te pareció la capacitación y qué podemos mejorar en la elaboración de presupuestos. Es anónima y toma unos 2 minutos.',
  respondedor: 'interno',
  activa: true,
  mes: 'Octubre',
  gracias: {
    titulo: '¡Gracias por tu opinión!',
    mensaje: 'Tus respuestas son anónimas y nos ayudarán a mejorar las próximas capacitaciones y la elaboración de presupuestos.',
  },
  preguntas: [
    {
      id: 'mejora_importante', tipo: 'opcion_multiple', texto: '¿Qué mejora consideras más importante?', requerida: true,
      opciones: [
        'Mayor detalle de materiales y cantidades',
        'Mejor cálculo de costos y precios',
        'Identificación de diferencias entre presupuestos',
        'Mayor claridad en la presentación económica',
        'Todas las anteriores',
      ],
    },
    {
      id: 'parte_revision', tipo: 'opcion_multiple', texto: '¿Qué parte del presupuesto consideras que necesita mayor revisión?', requerida: true,
      opciones: ['Materiales y metrados', 'Mano de obra', 'Costos indirectos', 'Márgenes y precios de venta', 'Presentación final'],
    },
    {
      id: 'utilidad', tipo: 'opcion_multiple', texto: '¿Qué tan útil fue la capacitación para tus actividades laborales?', requerida: true,
      opciones: ['Bueno', 'Regular', 'Malo'],
    },
    {
      id: 'recomendaciones', tipo: 'texto', texto: '¿Qué recomendarías para mejorar la elaboración de los presupuestos?', requerida: false,
      placeholder: 'Escribe tu recomendación...',
    },
  ],
}

export default encuesta

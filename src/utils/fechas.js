export function aISO(fecha) {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}

export function formatearFecha(iso) {
  const [anio, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${anio}`
}

// SE PUEDEN PEDIR DESDE HOY A 90 DIAS.
export function rangoDeCitas() {
  const hoy = new Date()
  const limite = new Date()
  limite.setDate(hoy.getDate() + 90)
  return { min: aISO(hoy), max: aISO(limite) }
}
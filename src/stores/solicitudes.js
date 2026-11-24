import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const CLAVE = 'clinica_vue_solicitudes'
const CLAVE_BORRADOR = 'clinica_vue_borrador'

function leer(clave, porDefecto) {
  try {
    const texto = localStorage.getItem(clave)
    return texto ? JSON.parse(texto) : porDefecto
  } catch {
    return porDefecto // JSON dañado o almacenamiento bloqueado
  }
}

function escribir(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
    return true
  } catch {
    return false 
  }
}

export const useSolicitudesStore = defineStore('solicitudes', () => {
  const lista = ref(leer(CLAVE, []))
  const borrador = ref(leer(CLAVE_BORRADOR, null))
  const errorAlmacenamiento = ref(false)

  watch(
    lista,
    (nueva) => {
      errorAlmacenamiento.value = !escribir(CLAVE, nueva)
    },
    { deep: true }
  )

  function agregar(datos) {
    lista.value.push({ id: Date.now(), creado: new Date().toISOString(), ...datos })
  }

  function actualizar(id, cambios) {
    const indice = lista.value.findIndex((s) => s.id === id)
    if (indice !== -1) lista.value[indice] = { ...lista.value[indice], ...cambios }
  }

  function eliminar(id) {
    lista.value = lista.value.filter((s) => s.id !== id)
  }

  function vaciar() {
    lista.value = []
  }

  function guardarBorrador(datos) {
    borrador.value = datos
    escribir(CLAVE_BORRADOR, datos)
  }

  function limpiarBorrador() {
    borrador.value = null
    try {
      localStorage.removeItem(CLAVE_BORRADOR)
    } catch {
    }
  }

  return {
    lista,
    borrador,
    errorAlmacenamiento,
    agregar,
    actualizar,
    eliminar,
    vaciar,
    guardarBorrador,
    limpiarBorrador
  }
})
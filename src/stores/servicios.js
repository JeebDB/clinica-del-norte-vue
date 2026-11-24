import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { publico } from '@/utils/rutas'

const MENSAJES_HTTP = {
  404: 'No se encontró la información de los servicios (error 404).',
  500: 'El servidor tuvo un problema al responder (error 500). Intenta de nuevo más tarde.'
}

export const useServiciosStore = defineStore('servicios', () => {
  const lista = ref([])
  const cargando = ref(false)
  const error = ref('')

  const cargado = computed(() => lista.value.length > 0)

  async function cargar() {
    if (cargado.value || cargando.value) return

    cargando.value = true
    error.value = ''
    try {
      let respuesta
      try {
        respuesta = await fetch(publico('data/servicios.json'))
      } catch {
        throw new Error('No se pudo conectar. Revisa tu conexión e intenta de nuevo.')
      }

      if (!respuesta.ok) {
        throw new Error(
          MENSAJES_HTTP[respuesta.status] ?? `Ocurrió un error inesperado (código ${respuesta.status}).`
        )
      }

      try {
        lista.value = await respuesta.json()
      } catch {
        throw new Error('Los datos recibidos no tienen un formato válido.')
      }
    } catch (e) {
      error.value = e.message
    } finally {
      cargando.value = false
    }
  }

  const porId = (id) => lista.value.find((s) => s.id === Number(id))

  return { lista, cargando, error, cargado, cargar, porId }
})
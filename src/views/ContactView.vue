<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useSolicitudesStore } from '@/stores/solicitudes'
import { CLINICA } from '@/data/clinica'
import { publico } from '@/utils/rutas'
import ContactForm from '@/components/ContactForm.vue'
import SolicitudItem from '@/components/SolicitudItem.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const almacen = useSolicitudesStore()

const enEdicion = ref(null) 
const accionPendiente = ref(null) 
const aviso = ref(null)
let temporizador

const recientes = computed(() => [...almacen.lista].reverse()) 

const textosModal = computed(() =>
  accionPendiente.value?.tipo === 'todas'
    ? {
        titulo: 'Borrar todas las solicitudes',
        mensaje: '¿Seguro que quieres borrar todas las solicitudes guardadas en este navegador?',
        confirmar: 'Borrar todas'
      }
    : {
        titulo: 'Eliminar solicitud',
        mensaje: '¿Seguro que quieres eliminar esta solicitud? No se puede deshacer.',
        confirmar: 'Eliminar'
      }
)

function mostrarAviso(texto, tipo = 'success') {
  clearTimeout(temporizador)
  aviso.value = { texto, tipo }
  temporizador = setTimeout(() => {
    aviso.value = null
  }, 6000)
}

function guardar(datos) {
  if (enEdicion.value) {
    almacen.actualizar(enEdicion.value.id, datos)
    enEdicion.value = null
    mostrarAviso('Solicitud actualizada en este navegador (no se reenvía a la clínica).')
  } else {
    almacen.agregar(datos)
    mostrarAviso('Tu mensaje fue enviado a la clínica. Guardamos una copia en este navegador.')
  }
}

function iniciarEdicion(id) {
  enEdicion.value = almacen.lista.find((s) => s.id === id) ?? null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function confirmar() {
  const accion = accionPendiente.value
  accionPendiente.value = null
  if (!accion) return

  if (accion.tipo === 'todas') {
    almacen.vaciar()
    enEdicion.value = null
    mostrarAviso('Se borraron todas las solicitudes.', 'info')
  } else {
    almacen.eliminar(accion.id)
    if (enEdicion.value?.id === accion.id) enEdicion.value = null
    mostrarAviso('Solicitud eliminada.', 'info')
  }
}

onMounted(() => {
  if (almacen.borrador) mostrarAviso('Recuperamos el borrador que dejaste sin enviar.', 'info')
})
onBeforeUnmount(() => clearTimeout(temporizador))
</script>

<template>
  <h1 class="titulo-pagina">Contáctanos</h1>

  <div class="contacto">
    <section class="formulario" aria-labelledby="titulo-form">
      <h2 id="titulo-form" class="visually-hidden">Formulario de contacto</h2>
        <p class="nota-form">
        Estas solicitudes ya fueron enviadas a la clínica. Aquí se guarda una copia solo en este navegador.
        </p>

      <ContactForm :solicitud="enEdicion" @guardar="guardar" @cancelar="enEdicion = null" />

      <div role="status">
        <div v-if="aviso" class="alert mt-3 mb-0" :class="`alert-${aviso.tipo}`">
          {{ aviso.texto }}
        </div>
      </div>
      <div v-if="almacen.errorAlmacenamiento" class="alert alert-warning mt-3 mb-0" role="alert">
        No se pudo guardar en este navegador (almacenamiento lleno o bloqueado).
      </div>
    </section>

    <aside class="info-contacto" aria-labelledby="titulo-info">
      <figure>
        <img
          :src="publico('img/mapa.jpg')"
          alt="Mapa con la ubicación de la Clínica del Norte"
          width="600"
          height="400"
          loading="lazy"
        />
      </figure>

      <div class="datos">
        <h2 id="titulo-info">Información de contacto</h2>
        <ul>
          <li>
            <i class="bi bi-geo-alt" aria-hidden="true"></i>
            <span>Dirección: {{ CLINICA.direccion }}</span>
          </li>
          <li>
            <i class="bi bi-telephone" aria-hidden="true"></i>
            <span>Teléfono: <a :href="`tel:${CLINICA.telefonoEnlace}`">{{ CLINICA.telefono }}</a></span>
          </li>
          <li>
            <i class="bi bi-envelope" aria-hidden="true"></i>
            <span>Email: <a :href="`mailto:${CLINICA.correo}`">{{ CLINICA.correo }}</a></span>
          </li>
          <li>
            <i class="bi bi-clock" aria-hidden="true"></i>
            <span>Horarios: {{ CLINICA.horario }}</span>
          </li>
        </ul>
      </div>
    </aside>
  </div>

  <section class="solicitudes" aria-labelledby="titulo-solicitudes">
    <div class="solicitudes-cabecera">
      <h2 id="titulo-solicitudes">Mis solicitudes enviadas</h2>
      <button
        v-if="almacen.lista.length"
        class="btn btn-outline-danger btn-sm"
        type="button"
        @click="accionPendiente = { tipo: 'todas' }"
      >
        Borrar todas
      </button>
    </div>
    <p class="nota-form">Estas solicitudes se guardan solo en este navegador.</p>

    <ul class="lista-solicitudes">
      <SolicitudItem
        v-for="solicitud in recientes"
        :key="solicitud.id"
        :solicitud="solicitud"
        @editar="iniciarEdicion"
        @eliminar="(id) => (accionPendiente = { tipo: 'una', id })"
      />
      <li v-if="!almacen.lista.length" class="solicitud-vacia">
        Aún no tienes solicitudes guardadas.
      </li>
    </ul>
  </section>

  <ConfirmModal
    v-if="accionPendiente"
    :titulo="textosModal.titulo"
    :mensaje="textosModal.mensaje"
    :texto-confirmar="textosModal.confirmar"
    @confirmar="confirmar"
    @cancelar="accionPendiente = null"
  />
</template>
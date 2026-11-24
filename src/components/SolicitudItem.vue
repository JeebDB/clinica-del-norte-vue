<script setup>
import { computed } from 'vue'
import { formatearFecha } from '@/utils/fechas'

const props = defineProps({
  solicitud: { type: Object, required: true }
})
defineEmits(['editar', 'eliminar'])

const cita = computed(() =>
  props.solicitud.fecha_preferida
    ? ` · Cita preferida: ${formatearFecha(props.solicitud.fecha_preferida)}`
    : ''
)
const fecha = computed(() => new Date(props.solicitud.creado).toLocaleString('es-CO'))
</script>

<template>
  <li class="solicitud">
    <div>
      <h3>{{ solicitud.asunto }}</h3>
      <p>{{ solicitud.mensaje }}</p>
      <p class="solicitud-meta">
        {{ solicitud.nombre }} · {{ solicitud.correo }} · {{ solicitud.telefono }}{{ cita }}
      </p>
      <p class="solicitud-meta">Guardada el {{ fecha }}</p>
    </div>
    <div class="solicitud-acciones">
      <button
        class="btn btn-outline-secondary btn-sm"
        type="button"
        @click="$emit('editar', solicitud.id)"
      >
        Editar
      </button>
      <button
        class="btn btn-outline-danger btn-sm"
        type="button"
        @click="$emit('eliminar', solicitud.id)"
      >
        Eliminar
      </button>
    </div>
  </li>
</template>
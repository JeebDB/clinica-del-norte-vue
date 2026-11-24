<script setup>
import { computed } from 'vue'
import { publico } from '@/utils/rutas'

const props = defineProps({
  servicio: { type: Object, required: true },
  variante: {
    type: String,
    default: 'imagen',
    validator: (valor) => ['imagen', 'icono'].includes(valor)
  },
  nivel: { type: Number, default: 2 } 
})

const ICONOS = {
  consulta: 'bi-heart-pulse',
  seguimiento: 'bi-clipboard2-pulse',
  diagnostico: 'bi-droplet',
  tramites: 'bi-file-earmark-medical'
}

const icono = computed(() => ICONOS[props.servicio.categoria] ?? 'bi-heart-pulse')
const titulo = computed(() => `h${props.nivel}`)
</script>

<template>
  <article class="tarjeta" :class="{ 'tarjeta-servicio': variante === 'imagen' }">
    <figure v-if="variante === 'imagen'">
      <img :src="publico(servicio.imagen)" :alt="servicio.alt" width="600" height="338" loading="lazy" />
    </figure>
    <i v-else class="bi" :class="icono" aria-hidden="true"></i>

    <component :is="titulo">{{ servicio.nombre }}</component>
    <p>{{ servicio.resumen }}</p>

    <RouterLink class="btn btn-clinica" :to="{ name: 'detalle', params: { id: servicio.id } }">
      Ver más
    </RouterLink>
  </article>
</template>
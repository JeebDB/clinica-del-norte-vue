<script setup>
import { publico } from '@/utils/rutas'

defineProps({
  servicio: { type: Object, required: true }
})
</script>

<template>
  <article class="relacionado">
    <img :src="publico(servicio.imagen)" alt="" width="80" height="80" loading="lazy" />
    <div>
      <h3>{{ servicio.nombre }}</h3>
      <RouterLink
        class="btn btn-clinica btn-sm"
        :to="{ name: 'detalle', params: { id: servicio.id } }"
      >
        Ver más
      </RouterLink>
    </div>
  </article>
</template>
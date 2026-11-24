<script setup>
import { publico } from '@/utils/rutas'

defineProps({
  medico: { type: Object, required: true }
})
</script>

<template>
  <article class="medico">
    <img :src="publico(medico.foto)" :alt="medico.alt" width="96" height="128" loading="lazy" />
    <div>
      <h3>{{ medico.nombre }}</h3>
      <p>{{ medico.descripcion }}</p>
    </div>
  </article>
</template>
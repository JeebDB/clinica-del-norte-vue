<script setup>
defineProps({
  mensaje: { type: String, default: 'Cargando...' },
  error: { type: String, default: '' }
})

defineEmits(['reintentar'])
</script>

<template>
  <div v-if="!error" class="estado" role="status">
    <span class="spinner-border text-success" aria-hidden="true"></span>
    <span>{{ mensaje }}</span>
  </div>

  <div v-else class="alert alert-danger estado" role="alert">
    <p>{{ error }}</p>
    <button class="btn btn-clinica" type="button" @click="$emit('reintentar')">Reintentar</button>
  </div>
</template>
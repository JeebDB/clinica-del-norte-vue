<script setup>
defineOptions({ inheritAttrs: false })

defineProps({
  id: { type: String, required: true },
  etiqueta: { type: String, required: true },
  tipo: { type: String, default: 'text' }, // text, email, tel, date o textarea
  error: { type: String, default: '' },
  correcto: { type: Boolean, default: false }
})

const modelo = defineModel({ type: String, default: '' })
</script>

<template>
  <div class="campo" :class="{ 'campo-error': error, 'campo-ok': correcto }">
    <label :for="id">{{ etiqueta }}</label>

    <textarea
      v-if="tipo === 'textarea'"
      :id="id"
      v-model="modelo"
      v-bind="$attrs"
      :aria-invalid="!!error"
      :aria-describedby="`error-${id}`"
    ></textarea>
    <input
      v-else
      :id="id"
      v-model="modelo"
      :type="tipo"
      v-bind="$attrs"
      :aria-invalid="!!error"
      :aria-describedby="`error-${id}`"
    />

    <slot />
    <p :id="`error-${id}`" class="error-campo" aria-live="polite">{{ error }}</p>
  </div>
</template>
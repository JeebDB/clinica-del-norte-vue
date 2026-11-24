<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  titulo: { type: String, required: true },
  mensaje: { type: String, required: true },
  textoConfirmar: { type: String, default: 'Eliminar' }
})
const emit = defineEmits(['confirmar', 'cancelar'])

const botonCancelar = ref(null)
// Al abrirse, el foco va al botón seguro (Cancelar)
onMounted(() => botonCancelar.value?.focus())
</script>

<template>
  <Teleport to="body">
    <div
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
      @keydown.esc="emit('cancelar')"
      @click.self="emit('cancelar')"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 id="modal-titulo" class="modal-title fs-5">{{ titulo }}</h2>
          </div>
          <div class="modal-body">
            <p class="mb-0">{{ mensaje }}</p>
          </div>
          <div class="modal-footer">
            <button
              ref="botonCancelar"
              type="button"
              class="btn btn-outline-secondary"
              @click="emit('cancelar')"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-danger" @click="emit('confirmar')">
              {{ textoConfirmar }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </Teleport>
</template>
<script setup>
defineProps({
  categorias: { type: Array, required: true }
})

const busqueda = defineModel('busqueda', { type: String, default: '' })
const categoria = defineModel('categoria', { type: String, default: 'todas' })
</script>

<template>
  <form class="barra-filtros" role="search" aria-label="Filtrar servicios" @submit.prevent>
    <div class="campo">
      <label for="buscar">Buscar servicio</label>
      <input id="buscar" v-model="busqueda" type="search" placeholder="Ej: examen" autocomplete="off" />
    </div>
    <div class="campo">
      <label for="categoria">Categoría</label>
      <select id="categoria" v-model="categoria">
        <option v-for="opcion in categorias" :key="opcion.valor" :value="opcion.valor">
          {{ opcion.texto }}
        </option>
      </select>
    </div>
  </form>
</template>
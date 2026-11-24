<script setup>
import { ref, computed } from 'vue'
import { useServiciosStore } from '@/stores/servicios'
import FilterBar from '@/components/FilterBar.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import EstadoCarga from '@/components/EstadoCarga.vue'

const servicios = useServiciosStore()
servicios.cargar()

const categorias = [
  { valor: 'todas', texto: 'Todas' },
  { valor: 'consulta', texto: 'Consulta' },
  { valor: 'seguimiento', texto: 'Seguimiento' },
  { valor: 'diagnostico', texto: 'Diagnóstico' },
  { valor: 'tramites', texto: 'Trámites' }
]

const busqueda = ref('')
const categoria = ref('todas')

const normalizar = (texto) =>
  texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const visibles = computed(() => {
  const termino = normalizar(busqueda.value.trim())
  return servicios.lista.filter(
    (s) =>
      (categoria.value === 'todas' || s.categoria === categoria.value) &&
      normalizar(`${s.nombre} ${s.resumen}`).includes(termino)
  )
})
</script>

<template>
  <h1 class="titulo-pagina">Nuestros servicios médicos</h1>

  <FilterBar v-model:busqueda="busqueda" v-model:categoria="categoria" :categorias="categorias" />

  <p class="contador" aria-live="polite">
    {{
      servicios.cargado
        ? `Mostrando ${visibles.length} de ${servicios.lista.length} servicios`
        : ''
    }}
  </p>

  <section class="catalogo" aria-label="Listado de servicios médicos" :aria-busy="servicios.cargando">
    <EstadoCarga v-if="servicios.cargando" mensaje="Cargando servicios..." />
    <EstadoCarga
      v-else-if="servicios.error"
      :error="servicios.error"
      @reintentar="servicios.cargar"
    />
    <p v-else-if="!visibles.length" class="estado">
      No hay servicios que coincidan con tu búsqueda.
    </p>
    <template v-else>
      <ServiceCard v-for="servicio in visibles" :key="servicio.id" :servicio="servicio" />
    </template>
  </section>
</template>
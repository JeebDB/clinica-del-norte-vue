<script setup>
import { computed, watchEffect } from 'vue'
import { useServiciosStore } from '@/stores/servicios'
import { publico } from '@/utils/rutas'
import RelatedCard from '@/components/RelatedCard.vue'
import EstadoCarga from '@/components/EstadoCarga.vue'

const props = defineProps({
  id: { type: String, required: true }
})

const servicios = useServiciosStore()
servicios.cargar()

const servicio = computed(() => servicios.porId(props.id))
const relacionados = computed(() =>
  servicios.lista.filter((s) => s.id !== servicio.value?.id).slice(0, 3)
)

watchEffect(() => {
  if (servicio.value) document.title = `Clínica del Norte | ${servicio.value.nombre}`
})
</script>

<template>
  <EstadoCarga v-if="servicios.cargando" mensaje="Cargando servicio..." />
  <EstadoCarga
    v-else-if="servicios.error"
    :error="servicios.error"
    @reintentar="servicios.cargar"
  />

  <template v-else-if="servicio">
    <article class="detalle" aria-labelledby="titulo-servicio">
      <figure>
        <img :src="publico(servicio.imagen)" :alt="servicio.alt" width="600" height="450" />
      </figure>

      <div class="detalle-texto">
        <h1 id="titulo-servicio">{{ servicio.nombre }}</h1>

        <ul class="ficha">
          <li>
            <i class="bi bi-clock" aria-hidden="true"></i>
            <span>Duración: {{ servicio.duracion }}</span>
          </li>
          <li>
            <i class="bi bi-hospital" aria-hidden="true"></i>
            <span>Modalidad: {{ servicio.modalidad }}</span>
          </li>
        </ul>

        <p v-for="(parrafo, indice) in servicio.descripcion" :key="indice">{{ parrafo }}</p>
      </div>
    </article>

    <aside v-if="relacionados.length" class="relacionados" aria-labelledby="titulo-relacionados">
      <h2 id="titulo-relacionados">Servicios relacionados</h2>
      <div class="relacionados-lista">
        <RelatedCard v-for="relacionado in relacionados" :key="relacionado.id" :servicio="relacionado" />
      </div>
    </aside>
  </template>

  <section v-else class="no-encontrada">
    <h1 class="titulo-pagina">Servicio no encontrado</h1>
    <p>No encontramos el servicio que buscas (error 404).</p>
    <RouterLink class="btn btn-clinica" :to="{ name: 'servicios' }">Ver todos los servicios</RouterLink>
  </section>
</template>
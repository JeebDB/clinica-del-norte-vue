<script setup>
import { computed } from 'vue'
import { useServiciosStore } from '@/stores/servicios'
import { publico } from '@/utils/rutas'
import { CLINICA } from '@/data/clinica'
import ServiceCard from '@/components/ServiceCard.vue'
import EstadoCarga from '@/components/EstadoCarga.vue'

const servicios = useServiciosStore()
servicios.cargar()

const destacados = computed(() => servicios.lista.slice(0, 3))
</script>

<template>
  <section class="hero" aria-labelledby="titulo-hero">
    <div class="hero-texto">
      <h1 id="titulo-hero">Cuidamos de tu salud y tu familia</h1>
      <p>Atención médica de calidad a tu alcance.</p>
      <RouterLink class="btn btn-clinica" :to="{ name: 'contacto' }">Contáctanos</RouterLink>
    </div>
    <figure class="hero-imagen">
      <img
        :src="publico('img/hero.jpg')"
        alt="Médico atendiendo a una paciente en consulta"
        width="800"
        height="450"
      />
    </figure>
  </section>

  <section class="servicios" aria-labelledby="titulo-servicios">
    <h2 id="titulo-servicios">Nuestros servicios</h2>
    <div class="servicios-lista">
      <EstadoCarga v-if="servicios.cargando" mensaje="Cargando servicios..." />
      <EstadoCarga
        v-else-if="servicios.error"
        :error="servicios.error"
        @reintentar="servicios.cargar"
      />
      <template v-else>
        <ServiceCard
          v-for="servicio in destacados"
          :key="servicio.id"
          :servicio="servicio"
          variante="icono"
          :nivel="3"
        />
      </template>
    </div>
  </section>

  <section class="sobre-nosotros" aria-labelledby="titulo-sobre">
    <figure>
      <img
        :src="publico('img/equipo.jpg')"
        alt="Equipo médico de la Clínica del Norte"
        width="600"
        height="400"
        loading="lazy"
      />
    </figure>
    <div class="sobre-texto">
      <h2 id="titulo-sobre">Sobre nosotros</h2>
      <p>
        Tenemos más de 10 años de experiencia brindando atención médica cercana y de confianza a la
        comunidad.
      </p>
      <RouterLink class="btn btn-clinica" :to="{ name: 'nosotros' }">Conócenos</RouterLink>
    </div>
  </section>

  <aside class="horario" aria-labelledby="titulo-horario">
    <i class="bi bi-clock" aria-hidden="true"></i>
    <div>
      <h2 id="titulo-horario">Horario de atención</h2>
      <p>{{ CLINICA.horario }}</p>
    </div>
  </aside>
</template>
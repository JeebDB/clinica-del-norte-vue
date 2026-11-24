<script setup>
import { publico } from '@/utils/rutas'
import DoctorCard from '@/components/DoctorCard.vue'

const valores = [
  {
    titulo: 'Misión',
    icono: 'bi-bullseye',
    texto:
      'Brindar atención médica primaria de calidad, con trato humano y accesible para toda la comunidad.'
  },
  {
    titulo: 'Visión',
    icono: 'bi-eye',
    texto:
      'Ser la clínica de referencia en medicina general de la región por nuestra confianza y calidez.'
  },
  {
    titulo: 'Valores',
    icono: 'bi-heart',
    texto: 'Respeto, empatía, responsabilidad y compromiso con la salud de cada paciente.'
  }
]

const medicos = [
  {
    id: 1,
    nombre: 'Dr. John Doe',
    foto: 'img/medico1.jpg',
    alt: 'Retrato de Dr(a). Nombre 1',
    descripcion: 'Medicina general. Atención primaria y control de enfermedades crónicas.'
  },
  {
    id: 2,
    nombre: 'Dra. Jane Doe',
    foto: 'img/medico2.jpg',
    alt: 'Retrato de Dr(a). Nombre 2',
    descripcion: 'Medicina general. Consulta externa y expedición de certificados médicos.'
  },
  {
    id: 3,
    nombre: 'Dr. Joseph Doe',
    foto: 'img/medico3.jpg',
    alt: 'Retrato de Dr(a). Nombre 3',
    descripcion: 'Medicina general. Seguimiento de pacientes y exámenes básicos.'
  }
]
</script>

<template>
  <h1 class="titulo-pagina">¿Quiénes somos?</h1>

  <section class="historia" aria-labelledby="titulo-historia">
    <figure>
      <img
        :src="publico('img/instalaciones.jpg')"
        alt="Fachada y sala de espera de la Clínica del Norte"
        width="600"
        height="400"
      />
    </figure>
    <div class="historia-texto">
      <h2 id="titulo-historia">Nuestra historia</h2>
      <p>
        La Clínica del Norte nació hace más de 10 años con el propósito de ofrecer atención médica
        general cercana, oportuna y de confianza para las familias de la comunidad.
      </p>
      <p>
        Desde entonces hemos crecido de la mano de nuestros pacientes, manteniendo un trato humano y
        un servicio de calidad en cada consulta.
      </p>
    </div>
  </section>

  <section class="valores" aria-label="Misión, visión y valores">
    <article v-for="valor in valores" :key="valor.titulo">
      <h2><i class="bi" :class="valor.icono" aria-hidden="true"></i> {{ valor.titulo }}</h2>
      <p>{{ valor.texto }}</p>
    </article>
  </section>

  <section class="equipo" aria-labelledby="titulo-equipo">
    <h2 id="titulo-equipo">Nuestro equipo médico</h2>
    <div class="equipo-lista">
      <DoctorCard v-for="medico in medicos" :key="medico.id" :medico="medico" />
    </div>
  </section>
</template>

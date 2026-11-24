<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const abierto = ref(false)

const enlaces = [
  { texto: 'Inicio', ruta: 'inicio', activaEn: ['inicio'] },
  { texto: 'Nosotros', ruta: 'nosotros', activaEn: ['nosotros'] },
  { texto: 'Servicios', ruta: 'servicios', activaEn: ['servicios', 'detalle'] }
]

watch(
  () => route.fullPath,
  () => {
    abierto.value = false
  }
)
</script>

<template>
  <header class="site-header">
    <nav class="navbar navbar-expand-md" aria-label="Navegación principal">
      <RouterLink class="navbar-brand marca" :to="{ name: 'inicio' }">
        <svg class="logo" width="40" height="40" viewBox="0 0 40 40" role="img" aria-label="Logo de Clínica del Norte">
          <rect width="40" height="40" rx="6" fill="#1f7a58" />
          <path d="M17 9h6v8h8v6h-8v8h-6v-8H9v-6h8z" fill="#fff" />
        </svg>
        <span>Clínica del Norte</span>
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        aria-controls="menu"
        :aria-expanded="abierto"
        aria-label="Abrir menú"
        @click="abierto = !abierto"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="menu" class="collapse navbar-collapse" :class="{ show: abierto }">
        <ul class="navbar-nav ms-auto">
          <li v-for="enlace in enlaces" :key="enlace.ruta" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ active: enlace.activaEn.includes(route.name) }"
              :to="{ name: enlace.ruta }"
            >
              {{ enlace.texto }}
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="btn btn-clinica" :to="{ name: 'contacto' }">Contacto</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
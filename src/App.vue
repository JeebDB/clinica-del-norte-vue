<script setup>
import NavBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'

function irAlContenido() {
  const principal = document.getElementById('contenido')
  principal?.focus()
  principal?.scrollIntoView()
}
</script>

<template>
  <a class="visually-hidden-focusable" href="#contenido" @click.prevent="irAlContenido">
    Saltar al contenido
  </a>

  <div class="app">
    <NavBar />
    <main id="contenido" tabindex="-1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
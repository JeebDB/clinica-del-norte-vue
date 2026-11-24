<template>
  <section class="no-encontrada">
    <h1 class="titulo-pagina">Página no encontrada</h1>
    <p>La dirección que buscas no existe o fue movida.</p>
    <RouterLink class="btn btn-clinica" :to="{ name: 'inicio' }">Volver al inicio</RouterLink>
  </section>
</template>
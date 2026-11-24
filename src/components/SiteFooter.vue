<script setup>
import { CLINICA } from '@/data/clinica'

const enlaces = [
  { texto: 'Inicio', ruta: 'inicio' },
  { texto: 'Nosotros', ruta: 'nosotros' },
  { texto: 'Servicios', ruta: 'servicios' },
  { texto: 'Contacto', ruta: 'contacto' }
]

const redes = [
  { nombre: 'Facebook', icono: 'bi-facebook' },
  { nombre: 'Instagram', icono: 'bi-instagram' },
  { nombre: 'WhatsApp', icono: 'bi-whatsapp' }
]
</script>

<template>
  <footer class="site-footer">
    <section aria-labelledby="pie-clinica">
      <h2 id="pie-clinica">{{ CLINICA.nombre }}</h2>
      <address>
        Dirección: {{ CLINICA.direccion }}<br />
        Teléfono: {{ CLINICA.telefono }}<br />
        Email: <a :href="`mailto:${CLINICA.correo}`">{{ CLINICA.correo }}</a>
      </address>
    </section>

    <nav aria-label="Enlaces del pie de página">
      <ul class="pie-enlaces">
        <li v-for="enlace in enlaces" :key="enlace.ruta">
          <RouterLink :to="{ name: enlace.ruta }">{{ enlace.texto }}</RouterLink>
        </li>
      </ul>
    </nav>

    <section aria-labelledby="pie-redes">
      <h2 id="pie-redes">Síguenos</h2>
      <ul class="pie-redes">
        <li v-for="red in redes" :key="red.nombre">
          <!-- .prevent: un href="#" cambiaría la ruta del router -->
          <a href="#" :aria-label="red.nombre" @click.prevent>
            <i class="bi" :class="red.icono" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
      <p><small>&copy; 2026 {{ CLINICA.nombre }} · Horarios de atención</small></p>
    </section>
  </footer>
</template>
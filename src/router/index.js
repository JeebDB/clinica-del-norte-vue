import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
 
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'inicio', component: HomeView, meta: { titulo: 'Inicio' } },
    {
      path: '/nosotros',
      name: 'nosotros',
      component: () => import('../views/AboutView.vue'), 
      meta: { titulo: 'Nosotros' }
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: () => import('../views/ServicesView.vue'),
      meta: { titulo: 'Servicios' }
    },
    {
      path: '/servicios/:id', 
      name: 'detalle',
      component: () => import('../views/ServiceDetailView.vue'),
      props: true, 
      meta: { titulo: 'Detalle del servicio' }
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('../views/ContactView.vue'),
      meta: { titulo: 'Contacto' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'no-encontrada',
      component: () => import('../views/NotFoundView.vue'),
      meta: { titulo: 'Página no encontrada' }
    }
  ],
  scrollBehavior() {
    return { top: 0 } 
  }
})

router.afterEach((to) => {
  document.title = `Clínica del Norte | ${to.meta.titulo ?? ''}`
})

export default router
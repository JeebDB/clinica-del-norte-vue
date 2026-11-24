# Clínica del Norte (Vue)

Sitio web informativo de la **Clínica del Norte**, un policlínico de medicina general (entidad ficticia creada con fines de aprendizaje web). Es la migración a una aplicación de página única (SPA) con Vue.js de los dos avances anteriores hechos con HTML, CSS y JavaScript nativo.

**Aplicación en producción:** https://jeebdb.github.io/clinica-del-norte-vue/

## Funcionalidades

- Navegación sin recarga de página (Vue Router).
- Catálogo de servicios cargado de un archivo JSON, con indicador de carga, manejo de errores (404, 500, sin conexión) y filtros por texto y categoría.
- Página de detalle de cada servicio con servicios relacionados.
- Formulario de contacto con validación reactiva en tiempo real y reglas de negocio (solo días hábiles, rango de fechas, nombre y apellido).
- Solicitudes guardadas en el navegador (`localStorage`) con edición y eliminación, borrador automático del formulario y confirmación mediante modal.
- Diseño adaptable (móvil, tablet y escritorio) con Bootstrap 5 y CSS Grid/Flexbox propio.

## Tecnologías

Vue 3 (`<script setup>`), Vite, Vue Router 4, Pinia, Bootstrap 5.3 y Bootstrap Icons.

## Arquitectura de carpetas

```
clinica-del-norte-vue/
├── .github/workflows/deploy.yml   Despliegue continuo a GitHub Pages
├── public/
│   ├── data/servicios.json        Datos de los servicios
│   └── img/                       Imágenes y favicon
├── src/
│   ├── assets/styles.css          Estilos propios.
│   ├── components/                Piezas reutilizables (NavBar, ServiceCard, FormField, ConfirmModal...).
│   ├── data/clinica.js            Datos de contacto de la clínica.
│   ├── router/index.js            Rutas de la aplicación.
│   ├── stores/                    Estado compartido (Pinia): servicios y solicitudes.
│   ├── utils/                     Funciones de apoyo: rutas, fechas y validaciones.
│   ├── views/                     Una vista por página.
│   ├── App.vue                    Estructura general.
│   └── main.js                    Punto de entrada.
├── index.html
└── vite.config.js
```

## Autor

Juan Esteban, Proyecto para Diseño web I.
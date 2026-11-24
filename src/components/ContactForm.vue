<script setup>
import { reactive, ref, computed, watch } from 'vue'
import FormField from '@/components/FormField.vue'
import { useSolicitudesStore } from '@/stores/solicitudes'
import { CAMPOS, LIMITE_MENSAJE, validar } from '@/utils/validaciones'
import { rangoDeCitas } from '@/utils/fechas'
import { enviarSolicitud } from '@/utils/formspree'

const props = defineProps({
  solicitud: { type: Object, default: null }
})
const emit = defineEmits(['guardar', 'cancelar'])

const almacen = useSolicitudesStore()
const rango = rangoDeCitas()

const form = reactive({
  nombre: '',
  correo: '',
  telefono: '',
  fecha_preferida: '',
  asunto: '',
  mensaje: ''
})
const tocados = reactive({}) 
const intentoEnvio = ref(false)
const enviando = ref(false)
const errorEnvio = ref('')

function cargar(datos) {
  CAMPOS.forEach((campo) => {
    form[campo] = datos?.[campo] ?? ''
  })
}

function limpiarValidacion() {
  Object.keys(tocados).forEach((campo) => delete tocados[campo])
  intentoEnvio.value = false
  errorEnvio.value = ''
}

cargar(props.solicitud ?? almacen.borrador)

const errores = computed(() =>
  Object.fromEntries(CAMPOS.map((campo) => [campo, validar(campo, form[campo])]))
)
const valido = computed(() => CAMPOS.every((campo) => !errores.value[campo]))

// Un error solo se muestra después de visitar el campo (o de intentar enviar)
const visible = (campo) => tocados[campo] || intentoEnvio.value
const errorDe = (campo) => (visible(campo) ? errores.value[campo] : '')
const correctoDe = (campo) =>
  visible(campo) && !errores.value[campo] && form[campo].trim() !== ''
const tocar = (campo) => {
  tocados[campo] = true
}

watch(
  () => props.solicitud,
  (nueva) => {
    limpiarValidacion()
    cargar(nueva ?? almacen.borrador)
  }
)

watch(form, (valores) => {
  if (props.solicitud) return // en modo edición no se toca el borrador
  if (CAMPOS.every((campo) => !valores[campo])) almacen.limpiarBorrador()
  else almacen.guardarBorrador({ ...valores })
})

function reiniciar() {
  cargar(null)
  limpiarValidacion()
  almacen.limpiarBorrador()
}

async function enviar() {
  if (enviando.value) return 

  intentoEnvio.value = true
  errorEnvio.value = ''

  if (!valido.value) {
    const primero = CAMPOS.find((campo) => errores.value[campo])
    document.getElementById(primero)?.focus()
    return
  }

  const datos = {}
  CAMPOS.forEach((campo) => {
    datos[campo] = form[campo].trim()
  })

  if (props.solicitud) {
    emit('guardar', datos)
    return
  }

  enviando.value = true
  try {
    await enviarSolicitud(datos)
    emit('guardar', datos) 
    reiniciar()
  } catch (error) {
    errorEnvio.value = error.message 
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <form novalidate @submit.prevent="enviar">
    <FormField
      id="nombre"
      v-model="form.nombre"
      etiqueta="Nombre completo *"
      :error="errorDe('nombre')"
      :correcto="correctoDe('nombre')"
      required
      maxlength="60"
      autocomplete="name"
      placeholder="Ej: María Pérez"
      @blur="tocar('nombre')"
    />

    <FormField
      id="correo"
      v-model="form.correo"
      tipo="email"
      etiqueta="Correo electrónico *"
      :error="errorDe('correo')"
      :correcto="correctoDe('correo')"
      required
      autocomplete="email"
      placeholder="tucorreo@ejemplo.com"
      @blur="tocar('correo')"
    />

    <FormField
      id="telefono"
      v-model="form.telefono"
      tipo="tel"
      etiqueta="Teléfono *"
      :error="errorDe('telefono')"
      :correcto="correctoDe('telefono')"
      required
      inputmode="numeric"
      maxlength="10"
      autocomplete="tel"
      placeholder="3001234567"
      @blur="tocar('telefono')"
    />

    <FormField
      id="fecha_preferida"
      v-model="form.fecha_preferida"
      tipo="date"
      etiqueta="Fecha preferida para la cita (opcional)"
      :error="errorDe('fecha_preferida')"
      :correcto="correctoDe('fecha_preferida')"
      :min="rango.min"
      :max="rango.max"
      @blur="tocar('fecha_preferida')"
      @change="tocar('fecha_preferida')"
    />

    <FormField
      id="asunto"
      v-model="form.asunto"
      etiqueta="Asunto *"
      :error="errorDe('asunto')"
      :correcto="correctoDe('asunto')"
      required
      maxlength="80"
      placeholder="Ej: Consulta de medicina general"
      @blur="tocar('asunto')"
    />

    <FormField
      id="mensaje"
      v-model="form.mensaje"
      tipo="textarea"
      etiqueta="Mensaje *"
      :error="errorDe('mensaje')"
      :correcto="correctoDe('mensaje')"
      required
      rows="5"
      :maxlength="LIMITE_MENSAJE"
      placeholder="Cuéntanos cómo podemos ayudarte"
      @blur="tocar('mensaje')"
    >
      <p class="contador-caracteres">{{ form.mensaje.length }} / {{ LIMITE_MENSAJE }}</p>
    </FormField>

    <div v-if="errorEnvio" class="alert alert-danger mb-0" role="alert">
      {{ errorEnvio }}
    </div>

    <div class="acciones-form">
      <button class="btn btn-clinica" type="submit" :disabled="enviando">
        <span v-if="enviando" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
        {{ enviando ? 'Enviando...' : solicitud ? 'Guardar cambios' : 'Enviar' }}
      </button>
      <button
        v-if="!solicitud"
        class="btn btn-outline-secondary"
        type="button"
        :disabled="enviando"
        @click="reiniciar"
      >
        Limpiar
      </button>
      <button
        v-else
        class="btn btn-outline-secondary"
        type="button"
        @click="emit('cancelar')"
      >
        Cancelar edición
      </button>
    </div>
  </form>
</template>
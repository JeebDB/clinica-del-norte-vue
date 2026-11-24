import { formatearFecha, rangoDeCitas } from './fechas'

export const CAMPOS = ['nombre', 'correo', 'telefono', 'fecha_preferida', 'asunto', 'mensaje']
export const LIMITE_MENSAJE = 500

const OBLIGATORIO = 'Este campo es obligatorio.'

const REGLAS = {
  nombre(valor) {
    if (!valor) return OBLIGATORIO
    if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+$/.test(valor)) return 'Usa solo letras y espacios.'
    if (valor.length < 3) return 'Escribe al menos 3 caracteres.'
    if (valor.split(/\s+/).length < 2) return 'Escribe tu nombre y apellido.'
    return ''
  },
  correo(valor) {
    if (!valor) return OBLIGATORIO
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      return 'Escribe un correo válido, por ejemplo nombre@dominio.com.'
    }
    return ''
  },
  telefono(valor) {
    if (!valor) return OBLIGATORIO
    if (!/^3\d{9}$/.test(valor)) {
      return 'Celular de 10 dígitos que empieza por 3, sin espacios ni prefijo.'
    }
    return ''
  },
  fecha_preferida(valor) {
    if (!valor) return '' 
    const { min, max } = rangoDeCitas()
    if (valor < min) return `Elige una fecha desde el ${formatearFecha(min)}.`
    if (valor > max) return `Elige una fecha hasta el ${formatearFecha(max)}.`
    const dia = new Date(`${valor}T00:00:00`).getDay() // 0 domingo, 6 sábado
    if (dia === 0 || dia === 6) return 'La clínica atiende de lunes a viernes. Elige un día hábil.'
    return ''
  },
  asunto(valor) {
    if (!valor) return OBLIGATORIO
    if (valor.length < 3) return 'Escribe al menos 3 caracteres.'
    return ''
  },
  mensaje(valor) {
    if (!valor) return OBLIGATORIO
    if (valor.length < 10) return `Escribe al menos 10 caracteres (llevas ${valor.length}).`
    if (valor.length > LIMITE_MENSAJE) return `Máximo ${LIMITE_MENSAJE} caracteres.`
    return ''
  }
}

export const validar = (campo, valor) => REGLAS[campo](valor.trim())
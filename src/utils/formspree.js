const URL_FORMSPREE = 'https://formspree.io/f/xppdowop'

const MENSAJES_HTTP = {
  400: 'El servicio de envío rechazó el formulario. Revisa los datos e intenta de nuevo.',
  403: 'El formulario aún no está habilitado en Formspree. Revisa tu correo para confirmarlo.',
  404: 'No se encontró el formulario en Formspree (error 404). Revisa la dirección de envío.',
  422: 'El servicio de envío no aceptó alguno de los datos. Revisa los campos e intenta de nuevo.',
  429: 'Se hicieron demasiados envíos seguidos. Espera un momento e intenta de nuevo.',
  500: 'El servicio de envío tuvo un problema (error 500). Intenta de nuevo más tarde.'
}

export async function enviarSolicitud(datos) {
  let respuesta

  try {
    respuesta = await fetch(URL_FORMSPREE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json' 
      },
      body: JSON.stringify({
        ...datos,
        _replyto: datos.correo, 
        _subject: `Solicitud desde el sitio web: ${datos.asunto}` 
      })
    })
  } catch {
    throw new Error('No se pudo conectar. Revisa tu conexión e intenta de nuevo.')
  }

  if (!respuesta.ok) {
    throw new Error(
      MENSAJES_HTTP[respuesta.status] ??
        `Ocurrió un error inesperado al enviar (código ${respuesta.status}).`
    )
  }
}
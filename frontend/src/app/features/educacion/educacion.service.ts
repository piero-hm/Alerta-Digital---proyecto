import { Injectable } from '@angular/core';

export interface ModuloEducacion {
  id: number;
  titulo: string;
  descripcionCorta: string;
  icono: string;
  introduccion: string;
  objetivos: string[];
  urlImagenSimulacion?: string;
  urlImagenPrevencion?: string;
  comoDetectarlo: { titulo: string; descripcion: string; icono: string; ejemplo?: string }[];
  reglasDeOro: { texto: string; icono: string }[];
  datosClave?: string[];
  recursosAdicionales?: { nombre: string; detalle: string; url: string; icono: string }[];
  testimonios?: { texto: string; autor: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private modulos: ModuloEducacion[] = [
    {
      id: 1,
      titulo: 'Phishing (Correos Falsos)',
      descripcionCorta: 'Aprenda a identificar correos electrónicos fraudulentos que suplantan a bancos y entidades para robar sus datos personales.',
      icono: 'mail',
      introduccion: 'El phishing es una de las estafas más comunes y peligrosas en el mundo digital. Los ciberdelincuentes envían correos electrónicos que imitan perfectamente a bancos, entidades gubernamentales o empresas conocidas, con el objetivo de engañarle para que revele información confidencial como contraseñas, números de tarjeta o datos personales.',
      objetivos: [
        'Reconocer las señales de alerta en un correo sospechoso',
        'Identificar enlaces y remitentes fraudulentos',
        'Aplicar las reglas de oro para protegerse del phishing',
        'Saber qué hacer si recibe un correo sospechoso'
      ],
      urlImagenSimulacion: '/assets/images/simulaciones/phishing-simulacion.png',
      urlImagenPrevencion: '/assets/images/prevencion/phishing-prevencion.png',
      comoDetectarlo: [
        {
          titulo: 'REMITENTE SOSPECHOSO',
          descripcion: 'El correo dice ser de su banco, pero la dirección de email es extraña y no coincide con el dominio oficial.',
          icono: 'cancel',
          ejemplo: 'Ejemplo: "soporte-banco@gmail.com" en lugar de "atencion@banco.com.pe"'
        },
        {
          titulo: 'URGENCIA EXTREMA',
          descripcion: 'Mensajes que le presionan a actuar rápido para que no piense con claridad y actúe por impulso.',
          icono: 'timer_off',
          ejemplo: 'Ejemplo: "Su cuenta será bloqueada en 24 horas si no hace clic aquí"'
        },
        {
          titulo: 'ENLACES ENGAÑOSOS',
          descripcion: 'Los botones o enlaces del correo lo llevan a páginas falsas que imitan a las oficiales para robar sus datos.',
          icono: 'link_off',
          ejemplo: 'Ejemplo: Pase el mouse sobre el enlace para ver la dirección real antes de hacer clic'
        },
        {
          titulo: 'SOLICITUD DE DATOS CONFIDENCIALES',
          descripcion: 'Le piden directamente su usuario, contraseña, PIN o número completo de tarjeta. Ninguna entidad legítima hace esto por correo.',
          icono: 'lock_open',
          ejemplo: 'Ejemplo: "Para verificar su identidad, ingrese su clave y número de tarjeta"'
        }
      ],
      reglasDeOro: [
        { texto: 'Nunca haga clic en enlaces dentro de correos no solicitados. Si tiene dudas, escriba la dirección de su banco directamente en el navegador.', icono: 'check_circle' },
        { texto: 'Su banco NUNCA le pedirá su contraseña, PIN o código SMS por correo electrónico. ¡Esta es la regla más importante!', icono: 'check_circle' },
        { texto: 'Verifique siempre la ortografía y redacción. Los correos fraudulentos suelen tener errores que las empresas serias no cometen.', icono: 'check_circle' },
        { texto: 'Ante la menor duda, no responda, no haga clic y no abra archivos adjuntos. Contacte a la entidad por sus canales oficiales.', icono: 'check_circle' }
      ],
      datosClave: [
        'El 90% de los ciberataques comienzan con un correo de phishing',
        'Cada día se envían más de 3,400 millones de correos de phishing en el mundo',
        'Los bancos nunca solicitan datos confidenciales por correo electrónico'
      ],
      recursosAdicionales: [
        { nombre: 'Guía Anti-Phishing', detalle: 'Descargar PDF (2.4 MB)', url: '#', icono: 'picture_as_pdf' },
        { nombre: 'Video: ¿Qué es el Phishing?', detalle: 'Ver en YouTube (5 min)', url: '#', icono: 'video_library' },
        { nombre: 'Infografía: Señales de Alerta', detalle: 'Ver imagen resumen', url: '#', icono: 'image' }
      ],
      testimonios: [
        { texto: '"Recibí un correo que decía que había ganado un sorteo del banco. Me pareció extraño porque yo no participé en ningún sorteo. Revisé la dirección y era falsa. ¡Gracias a este módulo lo identifiqué a tiempo!"', autor: 'Doña Rosa, 68 años — Huancayo' }
      ]
    },
    {
      id: 2,
      titulo: 'Vishing (Llamadas Fraudulentas)',
      descripcionCorta: 'Identifique llamadas telefónicas engañosas donde suplantan a bancos o autoridades para robar su información.',
      icono: 'call',
      introduccion: 'El vishing (voz + phishing) es una estafa que se realiza mediante llamadas telefónicas. Los delincuentes se hacen pasar por representantes de bancos, la policía o empresas de servicio para engañarle. Utilizan técnicas de presión y urgencia para que usted entregue información confidencial o realice transferencias sin pensar.',
      objetivos: [
        'Identificar llamadas fraudulentas antes de ser víctima',
        'Reconocer las tácticas de presión que usan los estafadores',
        'Saber cómo actuar ante una llamada sospechosa',
        'Proteger su información personal y bancaria por teléfono'
      ],
      urlImagenSimulacion: '/assets/images/simulaciones/vishing-simulacion.png',
      urlImagenPrevencion: '/assets/images/prevencion/vishing-prevencion.png',
      comoDetectarlo: [
        {
          titulo: 'NÚMERO DESCONOCIDO O EXTRAÑO',
          descripcion: 'Recibe llamadas de números que no reconoce, con prefijos internacionales inusuales o que parecen ser de un call center genérico.',
          icono: 'phone_callback',
          ejemplo: 'Ejemplo: +1 (234) 567-890 o números con muchos dígitos'
        },
        {
          titulo: 'PRESIÓN Y URGENCIA',
          descripcion: 'Le dicen que su cuenta ha sido bloqueada o que hay un cargo sospechoso y debe actuar "ahora mismo". Quieren que no piense con claridad.',
          icono: 'timer_off',
          ejemplo: 'Ejemplo: "Su cuenta será desactivada en los próximos 10 minutos si no confirma sus datos"'
        },
        {
          titulo: 'PIDEN CÓDIGOS DE SEGURIDAD',
          descripcion: 'Le solicitan el código de verificación que acaba de recibir por SMS, su clave secreta o el número de su tarjeta para "confirmar su identidad".',
          icono: 'sms',
          ejemplo: 'Ejemplo: "Necesito el código que le acabamos de enviar por mensaje de texto para verificar su identidad"'
        },
        {
          titulo: 'SE HACEN PASAR POR AUTORIDADES',
          descripcion: 'Usan nombres de bancos o instituciones conocidas para ganar su confianza, pero su forma de hablar o las preguntas no son profesionales.',
          icono: 'badge',
          ejemplo: 'Ejemplo: "Soy del área de seguridad del Banco de la Nación, necesito verificar sus datos"'
        }
      ],
      reglasDeOro: [
        { texto: 'Si recibe una llamada sospechosa, cuelgue inmediatamente. Luego llame usted al número oficial de su banco que aparece en su tarjeta o estado de cuenta.', icono: 'check_circle' },
        { texto: 'Ningún banco o entidad legítima le pedirá códigos SMS, contraseñas o claves secretas por teléfono. ¡Nunca los comparta!', icono: 'check_circle' },
        { texto: 'Desconfíe de cualquier llamada que le genere presión o urgencia. Los estafadores se aprovechan del miedo para que usted cometa errores.', icono: 'check_circle' },
        { texto: 'Active el identificador de llamadas en su teléfono. Si no reconoce el número, es mejor no contestar y dejar que salte el buzón de voz.', icono: 'check_circle' }
      ],
      datosClave: [
        'El vishing es la segunda estafa más denunciada en adultos mayores',
        'Los estafadores suelen llamar en horarios de menor actividad bancaria',
        'Las entidades financieras reales nunca se comunican para pedir claves'
      ],
      recursosAdicionales: [
        { nombre: 'Guía de Seguridad Telefónica', detalle: 'Descargar PDF (1.5 MB)', url: '#', icono: 'picture_as_pdf' },
        { nombre: 'Video: Identifica Llamadas Falsas', detalle: 'Ver en YouTube (4 min)', url: '#', icono: 'video_library' }
      ],
      testimonios: [
        { texto: '"Me llamaron diciendo que eran del banco y que había un cargo no autorizado. Me pidieron mi clave para cancelarlo. Recordé la regla de oro: el banco nunca pide la clave. Colgué y llamé al banco. ¡Era una estafa!"', autor: 'Don Carlos, 72 años — Huancayo' },
        { texto: '"Casi transfiero dinero porque el estafador me dijo que mi cuenta estaba en riesgo. Menos mal que mi hija me había mostrado este módulo antes. Ahora siempre cuelgo si me piden datos."', autor: 'Doña María, 65 años — Junín' }
      ]
    },
    {
      id: 3,
      titulo: 'Smishing (SMS y WhatsApp Falsos)',
      descripcionCorta: 'Descubra cómo los estafadores usan mensajes de texto y WhatsApp con enlaces maliciosos para robar su información.',
      icono: 'sms',
      introduccion: 'El smishing (SMS + phishing) utiliza mensajes de texto y aplicaciones como WhatsApp para engañarle. Los delincuentes envían mensajes atractivos con promesas de premios, alertas de paquetes retenidos o supuestas emergencias familiares, todos con un enlace malicioso que lleva a páginas falsas diseñadas para robar sus datos.',
      objetivos: [
        'Diferenciar entre un mensaje legítimo y uno fraudulento',
        'Reconocer los ganchos emocionales que usan los estafadores',
        'Aprender a verificar enlaces antes de hacer clic',
        'Configurar su WhatsApp de forma segura'
      ],
      urlImagenSimulacion: '/assets/images/simulaciones/smishing-simulacion.png',
      urlImagenPrevencion: '/assets/images/prevencion/prevencion_smishing.jpg',
      comoDetectarlo: [
        {
          titulo: 'MENSAJES DE NÚMEROS DESCONOCIDOS',
          descripcion: 'Recibe un SMS o WhatsApp de un número que no tiene en sus contactos, o que no coincide con el oficial de la empresa.',
          icono: 'question_mark',
          ejemplo: 'Ejemplo: WhatsApp de un número internacional que dice ser de una tienda local'
        },
        {
          titulo: 'PROMESAS DE PREMIOS O REGALOS',
          descripcion: 'Mensajes como "¡Felicidades, ha ganado un premio!" o "Es el último día para reclamar su regalo". Son anzuelos para que usted haga clic.',
          icono: 'redeem',
          ejemplo: 'Ejemplo: "¡Ganó un iPhone 15! Reclame su premio aquí: [enlace sospechoso]"'
        },
        {
          titulo: 'ENLACES ACORTADOS O EXTRAÑOS',
          descripcion: 'Los mensajes contienen enlaces acortados (bit.ly, goo.gl) o direcciones web que no corresponden a la empresa real.',
          icono: 'link_off',
          ejemplo: 'Ejemplo: "bit.ly/3xY7zK" en lugar de "www.banco.com.pe/seguridad"'
        },
        {
          titulo: 'PROBLEMAS CON ENVÍOS NO SOLICITADOS',
          descripcion: 'Le informan sobre un problema con un paquete o una entrega que usted no ha solicitado, pidiéndole que haga clic para "solucionarlo".',
          icono: 'local_shipping',
          ejemplo: 'Ejemplo: "Su paquete de Olva está retenido en aduanas. Actualice sus datos aquí"'
        }
      ],
      reglasDeOro: [
        { texto: 'Nunca haga clic en enlaces de SMS o WhatsApp de remitentes desconocidos. Si tiene dudas, contacte a la empresa por sus canales oficiales.', icono: 'check_circle' },
        { texto: 'Las empresas legítimas nunca le pedirán contraseñas, PIN o datos personales por mensaje de texto o WhatsApp.', icono: 'check_circle' },
        { texto: 'Desconfíe de mensajes que prometen premios o soluciones urgentes. Si suena demasiado bueno para ser verdad, probablemente sea una estafa.', icono: 'check_circle' },
        { texto: 'Configure su WhatsApp para que solo sus contactos puedan agregarlo a grupos. Esto reduce los mensajes no deseados.', icono: 'check_circle' }
      ],
      datosClave: [
        'El 70% de los mensajes de estafa usan urgencia o premios como anzuelo',
        'Los enlaces acortados se usan para ocultar direcciones maliciosas',
        'Las empresas de mensajería reales notifican por canales oficiales, no por SMS casuales'
      ],
      recursosAdicionales: [
        { nombre: 'Infografía: Evita el Smishing', detalle: 'Ver imagen resumen', url: '#', icono: 'image' },
        { nombre: 'Video: Estafas por WhatsApp', detalle: 'Ver en YouTube (3 min)', url: '#', icono: 'video_library' }
      ],
      testimonios: [
        { texto: '"Me llegó un mensaje diciendo que había ganado una cocina. Casi hago clic en el enlace, pero recordé que nadie regala cosas así. ¡Era una estafa para robarme los datos!"', autor: 'Doña Juana, 70 años — Huancayo' }
      ]
    },
    {
      id: 4,
      titulo: 'Fraudes Yape y Plin',
      descripcionCorta: 'Proteja su negocio y su dinero de estafas con aplicaciones de pago móvil como Yape y Plin.',
      icono: 'payments',
      introduccion: 'Los fraudes con aplicaciones de pago móvil como Yape y Plin están aumentando rápidamente en el Perú. Los delincuentes usan capturas de pantalla falsas, aplicaciones clonadas y engaños de devoluciones para estafar a comerciantes y usuarios. Este módulo le enseñará a identificar estas estafas y proteger su dinero.',
      objetivos: [
        'Identificar capturas de pago falsas',
        'Reconocer mensajes fraudulentos de supuesto "soporte técnico"',
        'Evitar la instalación de aplicaciones clonadas peligrosas',
        'Verificar pagos correctamente antes de entregar un producto o servicio'
      ],
      urlImagenSimulacion: '/assets/images/simulaciones/yape_estafa.jpeg',
      urlImagenPrevencion: '/assets/images/prevencion/prevencion_yape.jpg',
      comoDetectarlo: [
        {
          titulo: 'CAPTURA DE PAGO FALSA',
          descripcion: 'El cliente le muestra una captura de pantalla como "prueba" de pago, pero el dinero nunca aparece en su aplicación real de Yape o Plin.',
          icono: 'screenshot_monitor',
          ejemplo: 'Ejemplo: La captura muestra un monto y un supuesto comprobante, pero al revisar la app el dinero no ha llegado'
        },
        {
          titulo: 'MENSAJES DE "SOPORTE" FALSOS',
          descripcion: 'Recibe mensajes por WhatsApp o SMS de supuestos asesores de Yape o Plin pidiéndole datos personales o que haga clic en enlaces.',
          icono: 'support_agent',
          ejemplo: 'Ejemplo: "Soy asesor de Yape, necesito verificar su cuenta para evitar su bloqueo"'
        },
        {
          titulo: 'DEVOLUCIONES URGENTES',
          descripcion: 'Un supuesto cliente dice que se equivocó al enviarle dinero y le pide que se lo devuelva "urgente", antes de que usted pueda verificar el pago real.',
          icono: 'currency_exchange',
          ejemplo: 'Ejemplo: "Se me fue el dedo, le mandé S/500 en lugar de S/50. Devuélvame la diferencia por favor"'
        },
        {
          titulo: 'APLICACIONES CLONADAS',
          descripcion: 'Le piden instalar una versión "especial" o "actualizada" de Yape o Plin fuera de las tiendas oficiales (Play Store o App Store).',
          icono: 'install_mobile',
          ejemplo: 'Ejemplo: "Descargue esta versión actualizada desde este enlace para habilitar los nuevos pagos"'
        }
      ],
      reglasDeOro: [
        { texto: 'Siempre verifique el pago directamente en su aplicación oficial de Yape o Plin. No confíe solo en capturas de pantalla.', icono: 'check_circle' },
        { texto: 'Yape y Plin nunca contactan por WhatsApp para pedir datos o instalar aplicaciones. Si recibe un mensaje así, es una estafa segura.', icono: 'check_circle' },
        { texto: 'Si alguien le pide una devolución urgente, primero verifique que el dinero realmente ingresó a su cuenta. Tómese su tiempo.', icono: 'check_circle' },
        { texto: 'Descargue Yape y Plin solo desde las tiendas oficiales: Google Play Store (Android) o App Store (iPhone).', icono: 'check_circle' }
      ],
      datosClave: [
        'Los fraudes con Yape y Plin han aumentado más del 200% en el último año en Perú',
        'Ninguna aplicación de pagos legítima pide instalar versiones fuera de las tiendas oficiales',
        'Siempre hay que esperar a ver el dinero en la cuenta antes de entregar un producto'
      ],
      recursosAdicionales: [
        { nombre: 'Manual de Yape Seguro', detalle: 'Descargar PDF (1.8 MB)', url: '#', icono: 'picture_as_pdf' },
        { nombre: 'Video: Evita Fraudes con Yape', detalle: 'Ver en YouTube (6 min)', url: '#', icono: 'video_library' },
        { nombre: 'Guía rápida: Verifica pagos', detalle: 'Ver infografía', url: '#', icono: 'image' }
      ],
      testimonios: [
        { texto: '"Un cliente me mostró una captura de Yape, pero revisé mi aplicación y el dinero no estaba. Le pedí que me pague de nuevo, se puso nervioso y se fue. ¡Casi lo estafan!"', autor: 'Don Pedro, dueño de bodega — Huancayo' },
        { texto: '"Me llegó un mensaje de un supuesto soporte de Plin pidiendo mis datos. Recordé lo aprendido y lo bloqueé. Llamé a Plin y confirmaron que nunca envían mensajes así."', autor: 'Doña Lucía, 66 años — Junín' }
      ]
    }
  ];

  constructor() { }

  getModulos(): ModuloEducacion[] {
    return this.modulos;
  }

  getModuloById(id: number): ModuloEducacion | undefined {
    return this.modulos.find(modulo => modulo.id === id);
  }
}

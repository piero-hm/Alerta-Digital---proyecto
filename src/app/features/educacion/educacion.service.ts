import { Injectable } from '@angular/core';

export interface ModuloEducacion {
  id: number;
  titulo: string;
  descripcionCorta: string;
  icono: string; // Material Symbols Outlined icon name
  introduccion: string;
  urlImagenSimulacion?: string;
  urlImagenPrevencion?: string; // Nueva propiedad para la imagen de prevención
  comoDetectarlo: { titulo: string; descripcion: string; icono: string }[];
  reglasDeOro: { texto: string; icono: string }[]; // Se mantiene el nombre de la propiedad para la lógica, pero el título en HTML cambiará
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
      descripcionCorta: 'Mensajes de correo electrónico fraudulentos que suplantan a bancos o entidades gubernamentales para robar datos.',
      icono: 'mail',
      introduccion: 'El "phishing" es una de las estafas más comunes en internet. Los delincuentes se hacen pasar por entidades de confianza (bancos, empresas, gobierno) para engañarle y que revele su información personal, como contraseñas o números de tarjeta. ¡Aprenda a reconocerlos y protéjase!',
      urlImagenSimulacion: '/assets/images/simulaciones/phishing-simulacion.png', // Placeholder
      urlImagenPrevencion: '/assets/images/prevencion/phishing-prevencion.png', // Placeholder
      comoDetectarlo: [
        {
          titulo: 'REMITENTE SOSPECHOSO',
          descripcion: 'El correo dice ser de su "Banco", pero la dirección de email es extraña, por ejemplo, "soporte-banco@gmail.com" en lugar de un dominio oficial como "banco.com.pe".',
          icono: 'cancel'
        },
        {
          titulo: 'URGENCIA EXTREMA',
          descripcion: 'Mensajes que le presionan a actuar rápido, como "Su cuenta será bloqueada en 24 horas si no hace clic aquí". Buscan que no piense y actúe por impulso.',
          icono: 'timer_off'
        },
        {
          titulo: 'ENLACES ENGAÑOSOS',
          descripcion: 'El botón "Verificar cuenta" o "Actualizar datos" lo lleva a una página web que no es la oficial de su banco, aunque se parezca mucho.',
          icono: 'link_off'
        },
        {
          titulo: 'SOLICITUD DE DATOS CONFIDENCIALES',
          descripcion: 'Le piden directamente su usuario, contraseña, PIN o número completo de tarjeta de crédito. ¡Ninguna entidad legítima le pedirá esto por correo!',
          icono: 'lock_open'
        }
      ],
      reglasDeOro: [
        { texto: 'Nunca haga clic en enlaces dentro de correos no solicitados. Si tiene dudas, ingrese a la web de su banco tecleando la dirección directamente en su navegador.', icono: 'check_circle' },
        { texto: 'Su banco NUNCA le pedirá su contraseña, PIN o código SMS por correo electrónico o mensaje. ¡Es una regla de oro!', icono: 'check_circle' },
        { texto: 'Verifique siempre la ortografía y la gramática. Los correos fraudulentos suelen tener errores que las empresas serias no cometerían.', icono: 'check_circle' },
        { texto: 'Si un correo le parece sospechoso, elimínelo y bloquéelo. Si cree que podría ser importante, contacte a la entidad por sus canales oficiales (teléfono o web).', icono: 'check_circle' }
      ],
      recursosAdicionales: [
        { nombre: 'Guía Anti-Phishing', detalle: 'Descargar PDF (2.4 MB)', url: '#', icono: 'picture_as_pdf' },
        { nombre: 'Video: ¿Qué es el Phishing?', detalle: 'Ver en YouTube', url: '#', icono: 'video_library' }
      ],
      testimonios: [
        { texto: '"Casi caigo en un mensaje que decía que había ganado un premio. Gracias a lo que aprendí aquí, me di cuenta de que la dirección era rara y lo borré de inmediato."', autor: 'Doña Rosa, 68 años' }
      ]
    },
    {
      id: 2,
      titulo: 'Vishing (Llamadas)',
      descripcionCorta: 'Llamadas telefónicas urgentes solicitando contraseñas o confirmaciones de transferencias bajo engaño.',
      icono: 'call',
      introduccion: 'El "vishing" es una estafa que utiliza llamadas telefónicas para engañarle. Los delincuentes se hacen pasar por bancos, la policía o empresas importantes para obtener su información personal o hacer que realice acciones que le perjudiquen. ¡Esté atento a estas señales!',
      urlImagenSimulacion: '/assets/images/simulaciones/vishing-simulacion.png', // Placeholder
      urlImagenPrevencion: '/assets/images/prevencion/vishing-prevencion.png', // Placeholder
      comoDetectarlo: [
        {
          titulo: 'NÚMERO DESCONOCIDO O EXTRAÑO',
          descripcion: 'Recibe llamadas de números que no conoce, con prefijos internacionales inusuales o que parecen ser de un call center genérico.',
          icono: 'phone_callback'
        },
        {
          titulo: 'PRESIÓN Y URGENCIA',
          descripcion: 'Le dicen que su cuenta ha sido bloqueada, que hay un cargo sospechoso o que debe actuar "ahora mismo" para evitar un problema grave. Quieren que no piense con claridad.',
          icono: 'timer_off'
        },
        {
          titulo: 'PIDEN CÓDIGOS DE SEGURIDAD',
          descripcion: 'Le solicitan el código de verificación que acaba de recibir por SMS, su clave secreta o el número de su tarjeta para "confirmar su identidad".',
          icono: 'sms'
        },
        {
          titulo: 'SE HACEN PASAR POR EL BANCO/AUTORIDAD',
          descripcion: 'Usan nombres de bancos o instituciones conocidas, pero su forma de hablar o las preguntas que hacen no son las habituales.',
          icono: 'badge'
        }
      ],
      reglasDeOro: [
        { texto: 'Si recibe una llamada sospechosa, cuelgue inmediatamente. Luego, llame usted directamente al número oficial de su banco o entidad (el que aparece en su tarjeta o en su web oficial).', icono: 'check_circle' },
        { texto: 'Ningún banco o entidad legítima le pedirá códigos de verificación SMS, contraseñas o claves secretas por teléfono. ¡Nunca comparta esa información!', icono: 'check_circle' },
        { texto: 'Desconfíe de cualquier llamada que le genere presión o urgencia. Los fraudes se basan en el miedo y la prisa para que cometa errores.', icono: 'check_circle' },
        { texto: 'Active el identificador de llamadas en su teléfono para filtrar números desconocidos. Si no reconoce el número, es mejor no contestar.', icono: 'check_circle' }
      ],
      recursosAdicionales: [
        { nombre: 'Guía de Seguridad Telefónica', detalle: 'Descargar PDF (1.5 MB)', url: '#', icono: 'picture_as_pdf' }
      ]
    },
    {
      id: 3,
      titulo: 'Smishing (SMS/WhatsApp)',
      descripcionCorta: 'Mensajes de texto con enlaces maliciosos informando sobre premios falsos o entregas de paquetes retenidas.',
      icono: 'sms',
      introduccion: 'El "smishing" es una estafa que llega a través de mensajes de texto (SMS) o aplicaciones como WhatsApp. Los delincuentes envían mensajes atractivos o alarmantes con enlaces maliciosos para robar su información. ¡No caiga en la trampa!',
      urlImagenSimulacion: '/assets/images/simulaciones/smishing-simulacion.png', // Placeholder
      urlImagenPrevencion: '/assets/images/prevencion/prevencion_smishing.jpg', // Placeholder
      comoDetectarlo: [
        {
          titulo: 'MENSAJES DE NÚMEROS DESCONOCIDOS',
          descripcion: 'Recibe un SMS o WhatsApp de un número que no tiene en sus contactos, o que no es el número oficial de la empresa que dice ser.',
          icono: 'question_mark'
        },
        {
          titulo: 'PROMESAS DE PREMIOS O REGALOS',
          descripcion: 'Mensajes como "¡Felicidades, ha ganado un premio! Haga clic aquí para reclamarlo". Son ganchos para que acceda a sitios fraudulentos.',
          icono: 'redeem'
        },
        {
          titulo: 'ENLACES CORTOS O EXTRAÑOS',
          descripcion: 'Los mensajes contienen enlaces acortados (ej. bit.ly, goo.gl) o direcciones web que no corresponden a la empresa real.',
          icono: 'link_off'
        },
        {
          titulo: 'PROBLEMAS CON ENVÍOS O ENTREGAS',
          descripcion: 'Le informan sobre un problema con un paquete o una entrega que no ha solicitado, pidiéndole que haga clic en un enlace para "solucionarlo".',
          icono: 'local_shipping'
        }
      ],
      reglasDeOro: [
        { texto: 'Nunca haga clic en enlaces de SMS o WhatsApp de remitentes desconocidos o sospechosos. Si tiene dudas, contacte a la empresa por sus canales oficiales.', icono: 'check_circle' },
        { texto: 'Las empresas y bancos legítimos nunca le pedirán contraseñas, PIN o datos personales a través de mensajes de texto o WhatsApp.', icono: 'check_circle' },
        { texto: 'Desconfíe de mensajes que prometen premios, regalos o soluciones urgentes a problemas que no esperaba. Si suena demasiado bueno para ser verdad, probablemente lo sea.', icono: 'check_circle' },
        { texto: 'Configure su WhatsApp para que solo sus contactos puedan añadirle a grupos. Esto reduce la exposición a mensajes no deseados.', icono: 'check_circle' }
      ],
      recursosAdicionales: [
        { nombre: 'Infografía: Evita el Smishing', detalle: 'Ver imagen', url: '#', icono: 'image' }
      ]
    },
    {
      id: 4,
      titulo: 'Fraudes Yape/Plin',
      descripcionCorta: 'Uso de capturas de pantalla falsas y aplicaciones clonadas para simular pagos en comercios locales.',
      icono: 'payments',
      introduccion: 'Los fraudes con aplicaciones de pago móvil como Yape y Plin son cada vez más comunes, especialmente en comercios. Los delincuentes usan trucos para simular pagos y engañar a los vendedores. ¡Aprenda a proteger su negocio y su dinero!',
      urlImagenSimulacion: '/assets/images/simulaciones/yape_estafa.jpeg', // Placeholder
      urlImagenPrevencion: '/assets/images/prevencion/prevencion_yape.jpg', // Placeholder
      comoDetectarlo: [
        {
          titulo: 'CAPTURA DE PAGO FALSA',
          descripcion: 'El cliente le muestra una captura de pantalla como "prueba" de pago, pero el dinero nunca aparece en su aplicación de Yape o Plin.',
          icono: 'screenshot_monitor'
        },
        {
          titulo: 'MENSAJES DE "SOPORTE" FALSOS',
          descripcion: 'Recibe mensajes por WhatsApp o SMS de supuestos "asesores" de Yape o Plin pidiéndole datos o que haga clic en enlaces. ¡Las empresas nunca hacen esto!',
          icono: 'support_agent'
        },
        {
          titulo: 'DEVOLUCIONES URGENTES',
          descripcion: 'Un supuesto cliente le dice que se equivocó al enviarle dinero y le pide que se lo devuelva "urgente", antes de que usted pueda verificar el pago real.',
          icono: 'currency_exchange'
        },
        {
          titulo: 'APLICACIONES CLONADAS',
          descripcion: 'Le piden instalar una versión "especial" de Yape o Plin fuera de las tiendas oficiales (Play Store o App Store). ¡Estas apps son peligrosas!',
          icono: 'install_mobile'
        }
      ],
      reglasDeOro: [
        { texto: 'Siempre verifique el pago directamente en su aplicación oficial de Yape o Plin. ¡No confíe solo en capturas de pantalla!', icono: 'check_circle' },
        { texto: 'Yape y Plin nunca le contactarán por WhatsApp para pedirle datos o que instale aplicaciones. Si recibe un mensaje así, es una estafa.', icono: 'check_circle' },
        { texto: 'Si alguien le pide una devolución "urgente", primero verifique que el dinero realmente ingresó a su cuenta. Si no está seguro, contacte al soporte oficial.', icono: 'check_circle' },
        { texto: 'Descargue Yape y Plin solo desde las tiendas oficiales de su teléfono (Google Play Store para Android o App Store para iPhone).', icono: 'check_circle' }
      ],
      recursosAdicionales: [
        { nombre: 'Manual de Yape Seguro', detalle: 'Descargar PDF (1.8 MB)', url: '#', icono: 'picture_as_pdf' },
        { nombre: 'Video: Evita Fraudes con Yape/Plin', detalle: 'Ver en YouTube', url: '#', icono: 'video_library' }
      ],
      testimonios: [
        { texto: '"Me llamaron del \'banco\' pidiendo mi clave para bloquear una compra falsa. Recordé la Regla de Oro: el banco nunca pide la clave por teléfono. Colgué y fui a la agencia."', autor: 'Don Carlos, 72 años' }
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

import { Injectable } from '@angular/core';

export interface TemaEducativo {
  id: number;
  titulo: string;
  icono: string;
  descripcion: string;
  ejemplo: string;
  senalesAlerta: string[];
  consejo: string;
  pasos: string[];
  nivelRiesgo: 'alto' | 'medio' | 'bajo';
}

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private temas: TemaEducativo[] = [
    {
      id: 1,
      titulo: '¿Qué es el Phishing?',
      icono: '🎣',
      descripcion:
        'Los estafadores se hacen pasar por bancos, empresas o instituciones conocidas para robar información personal, contraseñas o dinero.',

      ejemplo:
        'Recibes un mensaje diciendo que tu cuenta será bloqueada y te piden ingresar a un enlace para verificar tus datos.',

      senalesAlerta: [
        'Te piden contraseñas o códigos SMS.',
        'Te presionan para actuar rápido.',
        'El enlace parece extraño.',
        'Amenazan con bloquear tu cuenta.'
      ],

      consejo:
        'Ningún banco te pedirá tu contraseña por llamada, mensaje o correo.',

      pasos: [
        'No hagas clic en enlaces sospechosos.',
        'Comunícate directamente con tu banco.',
        'Nunca compartas códigos SMS.',
        'Pide ayuda a un familiar si tienes dudas.'
      ],

      nivelRiesgo: 'alto'
    },

    {
      id: 2,
      titulo: 'Llamadas Falsas (Vishing)',
      icono: '📞',
      descripcion:
        'Personas que se hacen pasar por empleados del banco o entidades conocidas para obtener información o dinero.',

      ejemplo:
        'Una persona te llama diciendo que tu cuenta fue hackeada y te pide el código que llegó a tu celular.',

      senalesAlerta: [
        'Te piden códigos de verificación.',
        'Generan miedo o urgencia.',
        'Dicen que debes transferir dinero.',
        'Llaman desde números desconocidos.'
      ],

      consejo:
        'Los bancos nunca te pedirán códigos de seguridad por teléfono.',

      pasos: [
        'Cuelga inmediatamente.',
        'No proporciones datos personales.',
        'Llama al número oficial del banco.',
        'Comenta lo sucedido con un familiar.'
      ],

      nivelRiesgo: 'alto'
    },

    {
      id: 3,
      titulo: 'Estafas por WhatsApp',
      icono: '💬',
      descripcion:
        'Mensajes falsos enviados por desconocidos o personas que fingen ser familiares.',

      ejemplo:
        '“Hola mamá, cambié de número. Necesito dinero urgente”.',

      senalesAlerta: [
        'El número es desconocido.',
        'Piden dinero urgentemente.',
        'Envían enlaces sospechosos.',
        'Prometen premios o beneficios.'
      ],

      consejo:
        'Antes de enviar dinero, verifica llamando al número real de tu familiar.',

      pasos: [
        'No respondas inmediatamente.',
        'Llama al número habitual de tu familiar.',
        'No hagas transferencias apresuradas.',
        'Consulta con alguien de confianza.'
      ],

      nivelRiesgo: 'alto'
    },

    {
      id: 4,
      titulo: 'Fraudes con Yape y Plin',
      icono: '📱',
      descripcion:
        'Los delincuentes usan capturas falsas o se hacen pasar por soporte técnico.',

      ejemplo:
        'Una persona dice haberse equivocado y te pide devolver un dinero que nunca recibiste.',

      senalesAlerta: [
        'Te escriben por WhatsApp diciendo ser soporte.',
        'Te piden instalar aplicaciones.',
        'Prometen bonos falsos.',
        'Te presionan para devolver dinero.'
      ],

      consejo:
        'Verifica siempre en la aplicación antes de realizar cualquier operación.',

      pasos: [
        'Revisa tu saldo real.',
        'No te guíes por capturas de pantalla.',
        'No instales aplicaciones desconocidas.',
        'Si tienes dudas, espera y consulta.'
      ],

      nivelRiesgo: 'alto'
    },

    {
      id: 5,
      titulo: 'Estafas con Inteligencia Artificial',
      icono: '🤖',
      descripcion:
        'Los delincuentes pueden crear audios y videos falsos usando inteligencia artificial.',

      ejemplo:
        'Recibes un audio con la voz de un familiar pidiendo dinero por una emergencia.',

      senalesAlerta: [
        'Todo ocurre con mucha urgencia.',
        'La voz parece rara.',
        'El número es desconocido.',
        'Te piden actuar sin verificar.'
      ],

      consejo:
        'Siempre llama al número habitual de tu familiar antes de tomar una decisión.',

      pasos: [
        'Mantén la calma.',
        'No envíes dinero inmediatamente.',
        'Llama al familiar por su número real.',
        'Consulta con otros miembros de la familia.'
      ],

      nivelRiesgo: 'alto'
    }
  ];
}

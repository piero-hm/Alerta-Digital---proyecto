import { Injectable } from '@angular/core';

export interface Pregunta {
  id: number;
  situacion: string;
  mensajeSimulado?: string; // Añadido para mensajes simulados
  opciones: string[];
  respuestaCorrecta: number; // índice de la opción correcta
  explicacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private preguntas: Pregunta[] = [
    {
      id: 1,
      situacion: "¿Qué haces?",
      mensajeSimulado: "Hola mamá, soy yo. Me robaron el celular y estoy usando el de un amigo. Necesito que me mandes S/. 200 a este Yape urgente, después te explico.",
      opciones: ["Mando el dinero inmediatamente porque parece urgente", "Llamo directamente a mi hijo/a al número que tengo guardado para verificar", "Respondo el mensaje pidiendo más información", "Mando la mitad del dinero por si acaso"],
      respuestaCorrecta: 1,
      explicacion: "Correcto. Siempre debes llamar directamente a la persona por el número que ya tienes guardado antes de enviar cualquier dinero. Esta es una estafa muy común llamada suplantación de identidad familiar."
    },
    {
      id: 2,
      situacion: "Te llama un señor diciendo ser del BCP. Te dice que detectaron movimientos sospechosos en tu cuenta y que para protegerte necesitas decirle el código de 6 dígitos que acaba de llegar a tu celular. ¿Qué haces?",
      opciones: ["Le doy el código porque quiero proteger mi cuenta", "Corto la llamada y llamo yo mismo al BCP por el número oficial de la tarjeta", "Le pido que me llame después", "Le doy solo los primeros 3 dígitos"],
      respuestaCorrecta: 1,
      explicacion: "Correcto. Ese código SMS es el que autoriza transacciones. Ningún banco jamás te lo pedirá por teléfono. Si lo dictas, el estafador puede vaciar tu cuenta en segundos."
    },
    {
      id: 3,
      situacion: "Recibes un SMS que dice: 'SCOTIABANK: Su tarjeta fue bloqueada. Verifique su cuenta aquí: www.scotiabank-seguro-peru.net'. ¿Qué haces?",
      opciones: ["Hago clic en el enlace para desbloquear mi tarjeta rápidamente", "Ignoro el mensaje y llamo al banco por el número oficial al reverso de mi tarjeta", "Reenvío el mensaje a mis contactos para que estén alertas", "Respondo el SMS con mis datos para verificar"],
      respuestaCorrecta: 1,
      explicacion: "Correcto. El dominio real de Scotiabank es scotiabank.com.pe, no 'scotiabank-seguro-peru.net'. Ante cualquier duda, llama siempre al número oficial que está al reverso de tu tarjeta."
    },
    {
      id: 4,
      situacion: "Un desconocido te llama diciendo que te transfirió S/. 500 por Yape por error y te pide que se los devuelvas. Revisas tu celular y ves una notificación de Yape. ¿Qué haces?",
      opciones: ["Devuelvo los S/. 500 inmediatamente porque es lo correcto", "Abro la aplicación Yape y verifico si realmente recibí ese dinero antes de hacer nada", "Le pido el número de su cuenta para hacer la devolución", "Le transfiero S/. 300 por si acaso y el resto después"],
      respuestaCorrecta: 1,
      explicacion: "Correcto. Las notificaciones pueden ser falsas. Debes abrir la aplicación y verificar en el historial de transacciones si el dinero realmente llegó a tu cuenta antes de devolver nada."
    },
    {
      id: 5,
      situacion: "Ves en Facebook un video donde un conocido empresario de Huancayo dice que está regalando S/. 1,000 a todas las personas que compartan el video y envíen S/. 50 de inscripción. ¿Qué haces?",
      opciones: ["Comparto el video y envío los S/. 50 para participar", "Ignoro la publicación porque nadie regala dinero a cambio de nada", "Comento el video para pedir más información", "Llamo al empresario para confirmar"],
      respuestaCorrecta: 1,
      explicacion: "Correcto. Este es un fraude clásico. Nadie regala dinero a cambio de una pequeña inversión. Los videos pueden ser editados o falsos. Si algo suena demasiado bueno para ser verdad, es porque no lo es."
    },
    {
      id: 6,
      situacion: "Recibes un correo que parece ser del MIDIS diciendo que tienes un bono pendiente de S/. 700. Para cobrarlo debes hacer clic en un enlace e ingresar tu número de DNI, número de celular y número de cuenta bancaria. ¿Qué haces?",
      opciones: ["Ingreso mis datos porque el correo parece oficial", "No hago clic y verifico directamente en la página oficial del MIDIS o llamando a la institución", "Ingreso solo el DNI porque ese dato es público", "Reenvío el correo a mis hijos para que ellos lo verifiquen"],
      respuestaCorrecta: 1,
      explicacion: "Correcto. El MIDIS nunca solicita datos bancarios por correo electrónico. Para verificar si tienes algún bono pendiente, debes ingresar directamente a la página oficial www.midis.gob.pe o llamar a la línea gratuita del Estado."
    },
    {
      id: 7,
      situacion: "¿Qué haces?",
      mensajeSimulado: "Te llega un audio de WhatsApp con la voz de tu nieto diciendo que tuvo un accidente y necesita S/. 1,500 para pagar el hospital. El audio llega de un número que no tienes guardado.",
      opciones: ["Envío el dinero inmediatamente porque reconozco la voz de mi nieto", "Llamo directamente a mi nieto al número que tengo guardado para verificar si está bien", "Pido más audios para estar seguro", "Envío la mitad ahora y la otra mitad después de confirmar"],
      respuestaCorrecta: 1,
      explicacion: "Correcto. Los estafadores ahora usan inteligencia artificial para clonar voces. Aunque el audio suene exactamente como tu familiar, siempre debes llamar directamente al número conocido antes de enviar dinero."
    },
    {
      id: 8,
      situacion: "Recibes una llamada de alguien que dice ser técnico de Yape. Te dice que tu cuenta tiene un problema y necesita que instales una aplicación de soporte remoto para arreglarlo. ¿Qué haces?",
      opciones: ["Instalo la aplicación porque quiero solucionar el problema rápido", "Corto la llamada inmediatamente porque Yape nunca contacta a usuarios por teléfono", "Le pido que me envíe un correo oficial primero", "Acepto pero no le muestro mis contraseñas"],
      respuestaCorrecta: 1,
      explicacion: "Correcto. Yape nunca llama a sus usuarios para ofrecer soporte técnico. Una aplicación de soporte remoto le daría al estafador control total de tu celular y acceso a todas tus aplicaciones bancarias."
    }
  ];

  constructor() { }

  getPreguntas(): Pregunta[] {
    return this.preguntas;
  }
}

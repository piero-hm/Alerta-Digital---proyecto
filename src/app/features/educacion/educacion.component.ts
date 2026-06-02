import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

interface TemaEducacionDigital {
  id: number;
  titulo: string;
  icono: string;
  descripcion: string;
  ejemplo: string;
  senalesAlerta: string[];
  consejo: string;
  pasos: string[];
  nivelRiesgo: 'alto' | 'medio' | 'bajo';
  colorBase: string;
  colorIcono: string;
}

@Component({
  selector: 'app-educacion',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  temasAbiertos: boolean[] = [];
  temasVistos = new Set<number>();

  temas: TemaEducacionDigital[] = [
    {
      id: 1,
      titulo: 'Mensajes falsos de WhatsApp',
      icono: '💬',
      descripcion:
        'Este tipo de estafa ocurre cuando una persona escribe fingiendo ser un familiar, una empresa o una entidad conocida para engañarte y hacer que envíes dinero o compartas información privada.',
      ejemplo:
        '“Hola mamá, cambié de número. Escríbeme solo por aquí y envíame dinero urgente porque estoy en problemas.”',
      senalesAlerta: [
        'Te piden dinero con urgencia.',
        'Te dicen que no llames al número anterior.',
        'El número es desconocido o raro.',
        'Usan un tono de presión o miedo.'
      ],
      consejo:
        'Antes de responder, verifica siempre la identidad de la persona llamando al número real que ya conoces. Nunca envíes dinero sin confirmar primero.',
      pasos: [
        'No respondas de inmediato.',
        'Llama o escribe al número real de tu familiar.',
        'No compartas códigos, claves ni datos personales.',
        'Si tienes duda, pide ayuda a un familiar de confianza.'
      ],
      nivelRiesgo: 'alto',
      colorBase: 'rgba(72, 214, 255, 0.14)',
      colorIcono: '#48d6ff'
    },
    {
      id: 2,
      titulo: 'Llamadas telefónicas falsas',
      icono: '📞',
      descripcion:
        'Son llamadas en las que un estafador se hace pasar por tu banco, una empresa de servicios o una institución pública para pedirte datos personales, contraseñas o códigos de verificación.',
      ejemplo:
        '“Le llamamos del banco. Su cuenta tiene un problema y necesitamos que nos dicté su clave y el código que le llegó por SMS.”',
      senalesAlerta: [
        'Te llaman con tono urgente.',
        'Te piden claves, códigos o tokens.',
        'Dicen que tu cuenta será bloqueada.',
        'Te presionan para actuar rápido.'
      ],
      consejo:
        'Cuelga la llamada y comunica tú mismo con el número oficial del banco o institución. Los canales oficiales nunca te pedirán tu clave completa por teléfono.',
      pasos: [
        'Corta la llamada sin discutir.',
        'Busca el número oficial en la web o en tu tarjeta.',
        'No dictes códigos SMS ni contraseñas.',
        'Informa a un familiar si te sientes inseguro.'
      ],
      nivelRiesgo: 'alto',
      colorBase: 'rgba(255, 184, 77, 0.14)',
      colorIcono: '#ffb84d'
    },
    {
      id: 3,
      titulo: 'Correos electrónicos y SMS sospechosos',
      icono: '✉️',
      descripcion:
        'Son mensajes que parecen venir de una empresa o institución confiable, pero en realidad buscan que hagas clic en enlaces falsos o entregues información personal.',
      ejemplo:
        '“Ganaste un premio. Haz clic aquí para reclamarlo y confirma tus datos personales.”',
      senalesAlerta: [
        'Prometen premios, descuentos o regalos.',
        'Piden que hagas clic rápidamente.',
        'Tienen errores ortográficos o direcciones extrañas.',
        'Piden datos personales o bancarios.'
      ],
      consejo:
        'No abras enlaces sospechosos. Si el mensaje parece real, entra por la página oficial escribiendo la dirección manualmente en el navegador.',
      pasos: [
        'No hagas clic en enlaces desconocidos.',
        'Revisa con calma el remitente real.',
        'Elimina el mensaje si genera sospecha.',
        'Consulta con alguien de confianza antes de responder.'
      ],
      nivelRiesgo: 'medio',
      colorBase: 'rgba(144, 255, 191, 0.14)',
      colorIcono: '#90ffbf'
    },
    {
      id: 4,
      titulo: 'Páginas web falsas',
      icono: '🌐',
      descripcion:
        'Estas páginas imitan bancos, tiendas o servicios conocidos para engañarte y robar tus claves, tarjetas o datos personales.',
      ejemplo:
        'Una página que parece del banco, pero la dirección está mal escrita o tiene letras extrañas.',
      senalesAlerta: [
        'La dirección web no coincide con la oficial.',
        'Hay errores de diseño o imágenes borrosas.',
        'Te piden iniciar sesión de forma extraña.',
        'La página no muestra candado o parece insegura.'
      ],
      consejo:
        'Escribe tú mismo la dirección oficial del sitio. Si algo se ve raro, no ingreses datos personales ni bancarios.',
      pasos: [
        'Verifica la dirección web completa.',
        'Busca el candado de seguridad en el navegador.',
        'No ingreses claves en enlaces recibidos por mensajes.',
        'Si dudas, cierra la página de inmediato.'
      ],
      nivelRiesgo: 'alto',
      colorBase: 'rgba(186, 124, 255, 0.14)',
      colorIcono: '#ba7cff'
    },
    {
      id: 5,
      titulo: 'Fraude con Yape, Plin o transferencias',
      icono: '💸',
      descripcion:
        'Se presenta cuando una persona te muestra una supuesta captura de pago o te pide devolver dinero antes de confirmar que el depósito realmente llegó.',
      ejemplo:
        '“Ya te deposité, envíame el producto rápido.” Pero la captura puede ser falsa.',
      senalesAlerta: [
        'Te envían capturas sospechosas.',
        'Te apuran para entregar algo.',
        'El pago no aparece en tu app.',
        'Te piden devolver dinero sin verificar.'
      ],
      consejo:
        'Siempre revisa tu aplicación antes de entregar un producto o devolver dinero. No confíes solo en capturas de pantalla.',
      pasos: [
        'Abre tu aplicación y verifica el pago real.',
        'No aceptes capturas como prueba única.',
        'No devuelvas dinero sin confirmar la transacción.',
        'Si estás en duda, espera y consulta.'
      ],
      nivelRiesgo: 'alto',
      colorBase: 'rgba(255, 113, 145, 0.14)',
      colorIcono: '#ff7191'
    },
    {
      id: 6,
      titulo: 'Suplantación en redes sociales',
      icono: '👤',
      descripcion:
        'Ocurre cuando un estafador crea perfiles falsos o usa la cuenta de otra persona para pedir ayuda, dinero o datos personales.',
      ejemplo:
        'Un perfil con la foto de tu amigo que te escribe para pedirte un préstamo urgente.',
      senalesAlerta: [
        'La cuenta tiene pocos contactos o está recién creada.',
        'Pide dinero sin mucha explicación.',
        'Escribe de manera extraña o distinta a la persona real.',
        'Evita llamadas o verificaciones.'
      ],
      consejo:
        'Confirma siempre por llamada o videollamada. No confíes solo en mensajes o fotos de perfil.',
      pasos: [
        'Verifica la cuenta antes de responder.',
        'Haz una llamada para confirmar la identidad.',
        'No compartas información privada en redes.',
        'Reporta el perfil si detectas fraude.'
      ],
      nivelRiesgo: 'medio',
      colorBase: 'rgba(82, 196, 255, 0.14)',
      colorIcono: '#52c4ff'
    }
  ];

  heroTerminalStatus = {
    temasDisponibles: this.temas.length.toString(),
    dificultad: 'Básica',
    publicoObjetivo: 'Adultos mayores',
    tiempoEstimado: '12 min',
    estado: 'Activo'
  };

  constructor() { }

  ngOnInit(): void {
    this.temasAbiertos = this.temas.map((_, index) => index === 0);
  }


  get progresoPorcentaje(): number {
    if (!this.temas.length) return 0;
    return Math.round((this.temasVistos.size / this.temas.length) * 100);
  }

  toggleTema(index: number): void {
    this.temasAbiertos[index] = !this.temasAbiertos[index];
  }

  marcarComoEntendido(index: number): void {
    const tema = this.temas[index];
    this.temasVistos.add(tema.id);
    this.temasAbiertos[index] = false;
  }

  getTemaColor(id: number): string {
    const tema = this.temas.find(t => t.id === id);
    return tema?.colorBase ?? 'rgba(72, 214, 255, 0.14)';
  }

  getTemaIconColor(id: number): string {
    const tema = this.temas.find(t => t.id === id);
    return tema?.colorIcono ?? '#48d6ff';
  }

  getRiskLevel(id: number): 'alto' | 'medio' | 'bajo' {
    const tema = this.temas.find(t => t.id === id);
    return tema?.nivelRiesgo ?? 'bajo';
  }

  trackByTemaId(index: number, tema: TemaEducacionDigital): number {
    return tema.id;
  }
  scrollToTopics(): void {
    const section = document.getElementById('topics-section');

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}


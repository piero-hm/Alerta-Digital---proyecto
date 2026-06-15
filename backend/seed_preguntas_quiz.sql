-- ============================================================
-- SCRIPT PARA INSERTAR LAS 12 PREGUNTAS DEL QUIZ EN MySQL
-- ============================================================
-- Ejecutar con: mysql -u root -p alerta_digital < seed_preguntas_quiz.sql
-- ============================================================

-- Las tablas se crean automáticamente al iniciar el backend (SQLAlchemy create_all).
-- Si quieres crearlas manualmente antes:
--
-- CREATE TABLE IF NOT EXISTS preguntas_quiz (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   tipo VARCHAR(100) NOT NULL,
--   categoria VARCHAR(100) NOT NULL,
--   situacion TEXT NOT NULL,
--   mensaje_simulado TEXT NULL,
--   opciones TEXT NOT NULL,
--   respuesta_correcta INT NOT NULL,
--   explicacion TEXT NOT NULL,
--   consejo TEXT NULL,
--   activa TINYINT(1) DEFAULT 1
-- );
--
-- CREATE TABLE IF NOT EXISTS intentos_quiz (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   usuario_id INT NOT NULL,
--   puntaje INT DEFAULT 0,
--   total_preguntas INT DEFAULT 0,
--   porcentaje DECIMAL(5,2) NULL,
--   nivel VARCHAR(50) NULL,
--   pregunta_actual INT DEFAULT 0,
--   completado TINYINT(1) DEFAULT 0,
--   creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
--   terminado_en DATETIME NULL,
--   FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
-- );
--
-- CREATE TABLE IF NOT EXISTS respuestas_intento (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   intento_id INT NOT NULL,
--   pregunta_id INT NOT NULL,
--   opcion_elegida INT NOT NULL,
--   es_correcta TINYINT(1) NOT NULL,
--   creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (intento_id) REFERENCES intentos_quiz(id),
--   FOREIGN KEY (pregunta_id) REFERENCES preguntas_quiz(id)
-- );

-- ============================================================
-- INSERTS
-- ============================================================

INSERT INTO preguntas_quiz (tipo, categoria, situacion, mensaje_simulado, opciones, respuesta_correcta, explicacion, consejo, activa) VALUES
('WhatsApp', 'Suplantación', '¿Qué haces?', 'Hola mamá, soy yo. Me robaron el celular y estoy usando el de un amigo. Necesito que me mandes S/. 200 a este Yape urgente, después te explico.',
 '["Mando el dinero inmediatamente porque parece urgente", "Llamo directamente a mi hijo/a al número que tengo guardado para verificar", "Respondo el mensaje pidiendo más información", "Mando la mitad del dinero por si acaso"]',
 1, 'Siempre debes llamar directamente a la persona por el número que ya tienes guardado antes de enviar cualquier dinero. Esta es una estafa muy común llamada suplantación de identidad familiar.', 'Acuerda con tu familia una palabra clave secreta para verificar emergencias.', 1),

('Vishing', 'Llamada fraudulenta', 'Te llama un señor diciendo ser del BCP. Te dice que detectaron movimientos sospechosos en tu cuenta y que para protegerte necesitas decirle el código de 6 dígitos que acaba de llegar a tu celular. ¿Qué haces?', NULL,
 '["Le doy el código porque quiero proteger mi cuenta", "Corto la llamada y llamo yo mismo al BCP por el número oficial de la tarjeta", "Le pido que me llame después", "Le doy solo los primeros 3 dígitos"]',
 1, 'Ese código SMS es el que autoriza transacciones. Ningún banco jamás te lo pedirá por teléfono. Si lo dictas, el estafador puede vaciar tu cuenta en segundos.', 'Cuelga y llama al número que está al reverso de tu tarjeta. Ellos te confirmarán si hay algún problema real.', 1),

('Phishing', 'SMS falso', 'Recibes un SMS que dice: "SCOTIABANK: Su tarjeta fue bloqueada. Verifique su cuenta aquí: www.scotiabank-seguro-peru.net". ¿Qué haces?', NULL,
 '["Hago clic en el enlace para desbloquear mi tarjeta rápidamente", "Ignoro el mensaje y llamo al banco por el número oficial al reverso de mi tarjeta", "Reenvío el mensaje a mis contactos para que estén alertas", "Respondo el SMS con mis datos para verificar"]',
 1, 'El dominio real de Scotiabank es scotiabank.com.pe, no "scotiabank-seguro-peru.net". Ante cualquier duda, llama siempre al número oficial que está al reverso de tu tarjeta.', 'Revisa siempre el remitente. Los bancos no envían enlaces por SMS para solucionar problemas.', 1),

('Yape / Plin', 'Falsa transferencia', 'Un desconocido te llama diciendo que te transfirió S/. 500 por Yape por error y te pide que se los devuelvas. Revisas tu celular y ves una notificación de Yape. ¿Qué haces?', NULL,
 '["Devuelvo los S/. 500 inmediatamente porque es lo correcto", "Abro la aplicación Yape y verifico si realmente recibí ese dinero antes de hacer nada", "Le pido el número de su cuenta para hacer la devolución", "Le transfiero S/. 300 por si acaso y el resto después"]',
 1, 'Las notificaciones pueden ser falsas. Debes abrir la aplicación y verificar en el historial de transacciones si el dinero realmente llegó a tu cuenta antes de devolver nada.', 'Nunca hagas una devolución sin confirmar el ingreso real. Los estafadores envían notificaciones falsas.', 1),

('Redes Sociales', 'Falso sorteo', 'Ves en Facebook un video donde un conocido empresario de Huancayo dice que está regalando S/. 1,000 a todas las personas que compartan el video y envíen S/. 50 de inscripción. ¿Qué haces?', NULL,
 '["Comparto el video y envío los S/. 50 para participar", "Ignoro la publicación porque nadie regala dinero a cambio de nada", "Comento el video para pedir más información", "Llamo al empresario para confirmar"]',
 1, 'Este es un fraude clásico. Nadie regala dinero a cambio de una pequeña inversión. Los videos pueden ser editados o falsos. Si algo suena demasiado bueno para ser verdad, es porque no lo es.', 'Desconfía de cualquier sorteo o premio que requiera un pago previo. Las promociones legítimas no piden dinero para entregar premios.', 1),

('Correo Falso', 'Suplantación de entidad', 'Recibes un correo que parece ser del MIDIS diciendo que tienes un bono pendiente de S/. 700. Para cobrarlo debes hacer clic en un enlace e ingresar tu DNI, celular y número de cuenta bancaria. ¿Qué haces?', NULL,
 '["Ingreso mis datos porque el correo parece oficial", "No hago clic y verifico directamente en la página oficial del MIDIS", "Ingreso solo el DNI porque ese dato es público", "Reenvío el correo a mis hijos para que ellos lo verifiquen"]',
 1, 'El MIDIS nunca solicita datos bancarios por correo electrónico. Para verificar bonos, ingresa directamente a la página oficial www.midis.gob.pe o llama a la línea gratuita del Estado.', 'Las entidades del gobierno nunca te pedirán datos bancarios por correo o WhatsApp. Cualquier bono se cobra presencialmente con tu DNI.', 1),

('IA / Deepfake', 'Clonación de voz', '¿Qué haces?', 'Te llega un audio de WhatsApp con la voz de tu nieto diciendo que tuvo un accidente y necesita S/. 1,500 para pagar el hospital. El audio llega de un número que no tienes guardado.',
 '["Envío el dinero inmediatamente porque reconozco la voz de mi nieto", "Llamo directamente a mi nieto al número que tengo guardado para verificar", "Pido más audios para estar seguro", "Envío la mitad ahora y el resto después de confirmar"]',
 1, 'Los estafadores ahora usan inteligencia artificial para clonar voces. Aunque el audio suene exactamente como tu familiar, siempre debes llamar directamente al número conocido antes de enviar dinero.', 'Si recibes un mensaje de auxilio de un familiar, verifica siempre llamando al número que tienes guardado. La IA puede imitar voces en segundos.', 1),

('Falso Soporte', 'Soporte técnico falso', 'Recibes una llamada de alguien que dice ser técnico de Yape. Te dice que tu cuenta tiene un problema y necesita que instales una aplicación de soporte remoto para arreglarlo. ¿Qué haces?', NULL,
 '["Instalo la aplicación para solucionar el problema rápido", "Corto la llamada porque Yape nunca contacta a usuarios por teléfono", "Le pido que me envíe un correo oficial primero", "Acepto pero no le muestro mis contraseñas"]',
 1, 'Yape nunca llama a sus usuarios para ofrecer soporte técnico. Una aplicación de soporte remoto le daría al estafador control total de tu celular y acceso a todas tus aplicaciones bancarias.', 'Nunca instales aplicaciones de control remoto como AnyDesk o TeamViewer por indicación de un desconocido. Es la puerta de entrada a tus cuentas.', 1),

('Phishing', 'Falso premio', 'Recibes un mensaje de texto que dice: "Felicidades, has ganado S/. 10,000 en la rifa de Ripley. Para reclamar tu premio, llama al 0800-XXX-XXX e ingresa el código: PREMIO10". ¿Qué haces?', NULL,
 '["Llamo al número para reclamar mi premio", "Ignoro el mensaje porque no participé en ninguna rifa", "Llamo pero no doy mis datos personales", "Comparto el código con mi familia"]',
 1, 'Si no participaste en ninguna rifa o sorteo, no puedes haber ganado. Estos mensajes buscan que llames a líneas de pago o que te pidan datos bancarios para "entregarte" el falso premio.', 'Ninguna empresa entrega premios sin que hayas participado. Si no recuerdas haber llenado un cupón, es estafa.', 1),

('Redes Sociales', 'Alquiler falso', 'Encuentras un departamento en alquiler en Huancayo con un precio muy bajo. El dueño dice que está en Lima y te pide depositar S/. 500 como adelanto por WhatsApp para asegurar la reserva. ¿Qué haces?', NULL,
 '["Deposito el adelanto porque el precio es una oportunidad única", "Desconfío y pido ver el departamento en persona antes de dar cualquier adelanto", "Deposito solo S/. 200 para no arriesgar tanto", "Le pido fotos adicionales del departamento"]',
 1, 'Los estafadores publican departamentos con precios muy atractivos para enganchar víctimas. Piden adelantos y desaparecen. Siempre debes ver el inmueble en persona y firmar un contrato.', 'Nunca des adelantos por un alquiler sin ver la propiedad. Si el precio es muy bajo, probablemente sea una estafa.', 1),

('Correo Falso', 'Devolución de impuestos', 'Recibes un correo de SUNAT diciendo que tienes S/. 850 de devolución de impuestos. Para depositarte necesitan que ingreses a un enlace y proporciones tu número de cuenta bancaria y clave de acceso. ¿Qué haces?', NULL,
 '["Ingreso mis datos porque el dinero me pertenece", "Elimino el correo porque SUNAT no pide datos bancarios por correo electrónico", "Respondo el correo adjuntando mi número de cuenta", "Hago clic en el enlace para ver cuánto me devuelven"]',
 1, 'SUNAT tiene canales oficiales para cualquier devolución y nunca solicita datos a través de enlaces en correos electrónicos. Debes ingresar directamente a sunat.gob.pe desde tu navegador.', 'Las entidades tributarias se comunican mediante su plataforma oficial o carta física, nunca por correo con enlaces.', 1),

('Yape / Plin', 'Falso cobro', 'Te llega un mensaje de texto que dice: "Se realizó un cobro de S/. 340 en tu Yape. Si no reconoces este pago, llama al 01-XXX-XXXX inmediatamente." ¿Qué haces?', NULL,
 '["Llamo al número del mensaje para cancelar el cobro", "Abro la aplicación Yape directamente para revisar mis movimientos", "Respondo el mensaje diciendo que no reconozco el cobro", "Bloqueo mi tarjeta inmediatamente"]',
 1, 'El número del mensaje es de los estafadores. Cuando llames, te pedirán tus datos para "cancelar" el falso cobro. Siempre revisa directamente en la aplicación oficial si hay algún movimiento real.', 'Si recibes un mensaje de cobro sospechoso, abre la app directamente. Nunca llames a números que aparecen en el mismo mensaje.', 1);

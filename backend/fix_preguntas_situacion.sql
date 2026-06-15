-- ============================================================
-- FIX: Actualizar situacion de preguntas que solo mostraban "¿Qué haces?"
-- ============================================================
-- Ejecutar con: mysql -u root -p alerta_digital < fix_preguntas_situacion.sql
-- ============================================================

UPDATE preguntas_quiz
SET situacion = 'Tu hijo/a te escribe por WhatsApp desde un número desconocido diciendo que le robaron el celular y necesita que le mandes dinero urgente por Yape. ¿Qué haces?'
WHERE id = 1;

UPDATE preguntas_quiz
SET situacion = 'Recibes un audio de WhatsApp que suena exactamente como la voz de tu nieto/a, pidiendo dinero para una emergencia médica. El audio llega de un número que no tienes guardado. ¿Qué haces?'
WHERE id = 7;

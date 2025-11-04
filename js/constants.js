// =======================================================================================================
// Archivo: constants.js
// Descripción: Contiene las expresiones regulares (RegEx) utilizadas para validar los campos de entrada
//              en los formularios del sistema de gestión de usuarios de la Clínica Dental MEB.
// =======================================================================================================

// -------------------------------------------------------------------------------------------------------
// Expresión regular: idCardRegex
// Descripción: Valida un número de documento de identidad (DNI) español estándar.
// Formato aceptado: 8 dígitos seguidos de una letra (mayúscula o minúscula).
// Ejemplos válidos: "12345678A", "87654321z"
// -------------------------------------------------------------------------------------------------------
export const idCardRegex = /^\d{8}[a-zA-Z]$/;


// -------------------------------------------------------------------------------------------------------
// Expresión regular: nameRegex
// Descripción: Valida nombres y apellidos formados por letras (incluyendo tildes, diéresis y la letra ñ).
// Permite uno o varios nombres separados por un único espacio, sin números ni caracteres especiales.
// Ejemplos válidos: "Juan Pérez", "María del Carmen", "José Ñúñez"
// -------------------------------------------------------------------------------------------------------
export const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?: [a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/;


// -------------------------------------------------------------------------------------------------------
// Expresión regular: emailRegex
// Descripción: Valida direcciones de correo electrónico con formato general estándar.
// Incluye letras, números y caracteres especiales comunes antes del "@", y dominios válidos después.
// Ejemplos válidos: "usuario@gmail.com", "maria.santos@clinica-meb.es"
// -------------------------------------------------------------------------------------------------------
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


// -------------------------------------------------------------------------------------------------------
// Expresión regular: phoneRegex
// Descripción: Valida números de teléfono formados por exactamente 9 dígitos consecutivos.
// No permite espacios, guiones ni prefijos internacionales.
// Ejemplos válidos: "612345678", "987654321"
// -------------------------------------------------------------------------------------------------------
export const phoneRegex = /^\d{9}$/;

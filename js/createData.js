// =======================================================================================================
// Archivo: register.js
// Descripción: Script encargado de validar los campos del formulario de registro de citas y almacenar
//              los datos en el LocalStorage del navegador si las validaciones son correctas.
// =======================================================================================================

import { getFromLocalStorage, saveInLocalStorage } from "./LocalStorageFuntions.js";
import { idCardRegex } from "./constants.js";
import { emailRegex } from "./constants.js";
import { phoneRegex } from "./constants.js";
import { nameRegex } from "./constants.js";

// =======================================================================================================
// EVENTO PRINCIPAL: EJECUCIÓN AL CARGAR LA PÁGINA
// =======================================================================================================
window.addEventListener('load', () => {

    // Obtención de los elementos del formulario por su ID
    const form = document.getElementById('registerForm');
    const name = document.getElementById('completeName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const idCard = document.getElementById('idCard');
    const comment = document.getElementById('comment');
    const birthDate = document.getElementById('birthDate');
    const appointmentDate = document.getElementById('appointmentDate');

    // ===================================================================================================
    // EVENTO DE ENVÍO DEL FORMULARIO
    // ===================================================================================================
    // Al enviar el formulario, se evita el comportamiento por defecto y se ejecuta la validación.
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fieldsValidation();
    });

    // ===================================================================================================
    // FUNCIÓN: fieldsValidation()
    // Descripción: Valida los campos del formulario aplicando expresiones regulares y estilos visuales
    //              de acuerdo con el resultado. Si los datos son válidos, se almacenan en LocalStorage.
    // ===================================================================================================
    const fieldsValidation = () => {
        let validValue = true; // Indicador de validez general del formulario

        // Array con los campos y sus valores sin espacios en blanco
        const fields = [
            { input: name, value: name.value.trim() },
            { input: email, value: email.value.trim() },
            { input: phone, value: phone.value.trim() },
            { input: idCard, value: idCard.value.trim() },
            { input: comment, value: comment.value.trim() },
            { input: birthDate, value: birthDate.value.trim() },
            { input: appointmentDate, value: appointmentDate.value.trim() }
        ];

        // Recorre cada campo para realizar las validaciones correspondientes
        fields.forEach(field => {
            const isEmpty = !field.value;

            // Comprobaciones específicas según el tipo de campo
            const isIdCardInvalid = field.input.id === 'idCard' && !idCardRegex.test(field.value);
            const isNameInvalid = field.input.id === 'completeName' && (!nameRegex.test(field.value) || field.value.length < 2);
            const isMailInvalid = field.input.id === 'email' && (!emailRegex.test(field.value));
            const isPhoneInvalid = field.input.id === 'phone' && (!phoneRegex.test(field.value));

            // Si el campo no supera las validaciones, se marca como inválido
            if (isEmpty || isIdCardInvalid || isNameInvalid || isMailInvalid || isPhoneInvalid) {
                field.input.classList.add('is-invalid');
                field.input.classList.remove('is-valid');
                validValue = false;
            } else {
                // En caso contrario, se marca como válido
                field.input.classList.remove('is-invalid');
                field.input.classList.add('is-valid');
            }
        });

        // ===================================================================================================
        // GUARDADO EN LOCAL STORAGE
        // ===================================================================================================
        // Si todos los campos son válidos, los datos se almacenan localmente.
        if (validValue) {
            const users = getFromLocalStorage();

            // Se genera un nuevo ID secuencial en función de los datos ya guardados
            const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

            // Creación del objeto con los datos del nuevo usuario
            const newUser = {
                id: newId,
                name: name.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim(),
                idCard: idCard.value.trim(),
                comment: comment.value.trim(),
                birthDate: birthDate.value.trim(),
                appointmentDate: appointmentDate.value.trim()
            };

            // Llamada a la función que guarda los datos en LocalStorage
            saveInLocalStorage(form, newUser);
        }
    };

});

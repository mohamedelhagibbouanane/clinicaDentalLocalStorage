// =======================================================================================================
// Archivo: LocalStorageFuntions.js
// Descripción: Contiene todas las funciones relacionadas con la gestión de usuarios
//              en el almacenamiento local (LocalStorage). Incluye operaciones CRUD:
//              creación, lectura, actualización y eliminación de registros.
// =======================================================================================================

// Importación de expresiones regulares para validación de campos
import { idCardRegex } from "./constants.js";
import { emailRegex } from "./constants.js";
import { phoneRegex } from "./constants.js";
import { nameRegex } from "./constants.js";

// =======================================================================================================
// FUNCIÓN: saveInLocalStorage(form, newUser)
// Descripción: Guarda un nuevo usuario en LocalStorage, validando duplicados y limpiando el formulario.
// Parámetros:
//  - form: referencia al formulario HTML.
//  - newUser: objeto con los datos del usuario a guardar.
// =======================================================================================================
export function saveInLocalStorage(form, newUser) {
    // Obtiene los usuarios previamente guardados en LocalStorage
    let users = getFromLocalStorage();

    // Si el contenido no es un array válido, se inicializa uno vacío
    if (!Array.isArray(users)) users = [];

    // Verifica si el nuevo usuario ya está registrado (por DNI o correo electrónico)
    const duplicatedIdCard = users.find(user => user.idCard === newUser.idCard);
    const duplicatedMail = users.find(user => user.email === newUser.email);

    // Si existe un duplicado, muestra una alerta y detiene la ejecución
    if (duplicatedIdCard || duplicatedMail) {
        alert('User is already registered');
        return;
    }

    // Si no hay duplicados, agrega el nuevo usuario al array
    users.push(newUser);

    // Guarda el array actualizado en LocalStorage, convirtiéndolo a JSON
    localStorage.setItem("users", JSON.stringify(users));

    // Muestra un mensaje confirmando el registro exitoso
    alert(`User ${newUser.name} has been saved with ID ${newUser.id}`);

    // Limpia el formulario
    form.reset();

    // Elimina las clases de validación visual de Bootstrap para dejar el formulario en estado neutro
    form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
};

// =======================================================================================================
// FUNCIÓN: getFromLocalStorage()
// Descripción: Recupera y devuelve la lista de usuarios almacenados en LocalStorage.
// Retorna: Array de objetos de usuarios. Si no existen datos, devuelve un array vacío.
// =======================================================================================================
export function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// =======================================================================================================
// FUNCIÓN: deleteFromLocalStorage(id)
// Descripción: Elimina un usuario del LocalStorage según su ID y actualiza la tabla.
// Parámetros:
//  - id: identificador único del usuario a eliminar.
// =======================================================================================================
export function deleteFromLocalStorage(id) {
    // Recupera todos los usuarios del LocalStorage
    let users = getFromLocalStorage();

    // Crea un nuevo array excluyendo el usuario cuyo ID coincide con el indicado
    let selectedUser = users.filter(u => u.id != id);

    // Sobrescribe el LocalStorage con la lista actualizada
    localStorage.setItem("users", JSON.stringify(selectedUser));

    // Recarga la página para actualizar visualmente la tabla
    location.reload();
}

// =======================================================================================================
// FUNCIÓN: editFromLocalStorage(form, id, updateButton)
// Descripción: Permite editar los datos de un usuario seleccionado.
// Parámetros:
//  - form: formulario de actualización visible en la interfaz.
//  - id: identificador del usuario a editar.
//  - updateButton: botón que confirma la actualización.
// =======================================================================================================
export function editFromLocalStorage(form, id, updateButton) {

    // Muestra el formulario de edición
    form.style.display = 'block';

    // Obtiene todos los usuarios y localiza el usuario seleccionado
    let users = getFromLocalStorage();
    let selectedUser = users.find(u => u.id == id);

    // Carga los datos del usuario seleccionado dentro del formulario
    for (const key in selectedUser) {
        if (selectedUser.hasOwnProperty(key)) {
            const input = form.querySelector(`#${key}`);
            if (input) input.value = selectedUser[key];
        }
    }

    // Evento: al hacer clic en el botón de actualización
    updateButton.addEventListener('click', () => {

        // Crea un nuevo objeto con los datos actualizados desde el formulario
        const updatedUser = {
            id: selectedUser.id,
            name: form.querySelector('#name').value.trim(),
            email: form.querySelector('#email').value.trim(),
            phone: form.querySelector('#phone').value.trim(),
            idCard: form.querySelector('#idCard').value.trim(),
            comment: form.querySelector('#comment').value.trim(),
            birthDate: form.querySelector('#birthDate').value.trim(),
            appointmentDate: form.querySelector('#appointmentDate').value.trim()
        };

        // Validación de los nuevos valores utilizando expresiones regulares
        const isMailInvalid = !nameRegex.test(updatedUser.name);
        const isNameInvalid = !emailRegex.test(updatedUser.email);
        const isidCardInvalid = !idCardRegex.test(updatedUser.idCard);
        const isPhoneInvalid = !phoneRegex.test(updatedUser.phone);

        // Si alguna validación falla, se notifica al usuario
        if (isMailInvalid || isNameInvalid || isPhoneInvalid || isidCardInvalid) {
            alert('Insert valid users');
        } else {
            // Busca el índice del usuario a actualizar y reemplaza sus datos
            const index = users.findIndex(u => String(u.id) == String(id));
            users[index] = updatedUser;

            // Guarda la lista actualizada en LocalStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Confirma la actualización al usuario
            alert(`User "${updatedUser.name}" has been updated!`);

            // Limpia y oculta el formulario
            form.reset();
            form.style.display = 'none';

            // Refresca la tabla para mostrar los cambios actualizados
            location.reload();
        }
    });
}

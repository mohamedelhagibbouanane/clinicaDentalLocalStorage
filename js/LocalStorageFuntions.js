import { idCardRegex } from "./constants.js";
import { emailRegex } from "./constants.js";
import { phoneRegex } from "./constants.js";
import { nameRegex } from "./constants.js";

//---------------------------------------------------------------Save in LocalStorage Function-----------------------------------------------------------------------------------//
export const saveInLocalStorage = (form, name, email, phone, idCard, comment, birthDate, appointmentDate) => {
    // Obtener la lista de usuarios desde LocalStorage, si no existe se inicializa como array vacío
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Asegurarse de que users sea un array, por si los datos guardados son corruptos o no son un array
    if (!Array.isArray(users)) users = [];

    // Generar un nuevo ID para el usuario, basado en el último ID de la lista
    let newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    // Crear un objeto con los datos del nuevo usuario, limpiando los valores con trim()
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

    // Verificar si ya existe un usuario con la misma cédula o correo
    const duplicatedIdCard = users.find(user => user.idCard === newUser.idCard);
    const duplicatedMail = users.find(user => user.email === newUser.email);

    // Si se encuentra duplicado, mostrar alerta y detener la función
    if (duplicatedIdCard || duplicatedMail) {
        alert('User is already registered');
        return;
    }

    // Agregar el nuevo usuario al array de usuarios
    users.push(newUser);

    // Guardar la lista actualizada en LocalStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Mostrar alerta indicando que el usuario se guardó correctamente
    alert(`User ${newUser.name} has been saved with ID ${newUser.id}`);

    // Limpiar el formulario
    form.reset();

    // Eliminar clases de validación del formulario
    form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid')); º
};

//----------------------------------------------------------------Get from localstorage function---------------------------------------------------------------------------------//
export function getFromLocalStorage() {
    // Devolver un array vacío si no existen usuarios guardados
    return JSON.parse(localStorage.getItem('users')) || [];
}
//----------------------------------------------------------------Delete user from localstorage Function-------------------------------------------------------------------------//
export function deleteFromLocalStorage(id) {
    let users = getFromLocalStorage();
    let selectedUser = users.filter(u => u.id != id);
    localStorage.setItem("users", JSON.stringify(selectedUser));
    location.reload();
}
//----------------------------------------------------------------Update users users Function-------------------------------------------------------------------------------------//
export function editFromLocalStorage(form, id, updateButton) {

    form.style.display = 'block';

    // Obtener datos actuales y usuario seleccionado
    let users = getFromLocalStorage();

    let selectedUser = users.find(u => u.id == id);

    // Rellenar el formulario con los datos del usuario
    for (const key in selectedUser) {
        if (selectedUser.hasOwnProperty(key)) {
            const input = form.querySelector(`#${key}`);
            if (input) input.value = selectedUser[key];
        }
    }

    // Evento: al hacer clic en "Actualizar"
    updateButton.addEventListener('click', () => {
        // Crear nuevo objeto con los datos actualizados del formulario
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
        const isMailInvalid = !nameRegex.test(updatedUser.name);
        const isNameInvalid = !emailRegex.test(updatedUser.email);
        const isidCardInvalid = !idCardRegex.test(updatedUser.idCard);
        const isPhoneInvalid = !phoneRegex.test(updatedUser.phone);


        if (isMailInvalid || isNameInvalid || isPhoneInvalid || isidCardInvalid) {
            alert('Insert valid users');

        } else {

            // Reemplazar el usuario editado dentro del array
            const index = users.findIndex(u => String(u.id) == String(id));
            users[index] = updatedUser;

            // Guardar el array actualizado en localStorage
            localStorage.setItem('users', JSON.stringify(users));

            alert(`User "${updatedUser.name}" has been updated!`);

            // Ocultar formulario y limpiar campos
            form.reset();
            form.style.display = 'none';

            //Recargar tabla visualmente
            location.reload();
        }


    });
}


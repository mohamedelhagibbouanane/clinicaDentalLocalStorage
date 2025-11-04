import { saveInLocalStorage } from "./LocalStorageFuntions.js";
import { idCardRegex } from "./constants.js";
import { emailRegex } from "./constants.js";
import { phoneRegex } from "./constants.js";
import { nameRegex } from "./constants.js";

window.addEventListener('load', () => {

    const form = document.getElementById('registerForm');
    const name = document.getElementById('completeName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const idCard = document.getElementById('idCard');
    const comment = document.getElementById('comment');
    const birthDate = document.getElementById('birthDate');
    const appointmentDate = document.getElementById('appointmentDate');
   


    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fieldsValidation();
    });
    //------------------------------------------------------------validación de campos----------------------------------------------------------------------------------------------------//
    const fieldsValidation = () => {
            let validValue = true;
        const fields = [
            { input: name, value: name.value.trim() },
            { input: email, value: email.value.trim() },
            { input: phone, value: phone.value.trim() },
            { input: idCard, value: idCard.value.trim() },
            { input: comment, value: comment.value.trim() },
            { input: birthDate, value: birthDate.value.trim() },
            { input: appointmentDate, value: appointmentDate.value.trim() }
        ];

        fields.forEach(field => {
            const isEmpty = !field.value;
            const isIdCardInvalid = field.input.id === 'idCard' && !idCardRegex.test(field.value);
            const isNameInvalid = field.input.id === 'completeName' && (!nameRegex.test(field.value) || field.value.length < 2);
            const isMailInvalid = field.input.id === 'email' && (!emailRegex.test(field.value));
            const isPhoneInvalid = field.input.id === 'phone' && (!phoneRegex.test(field.value));

            if (isEmpty || isIdCardInvalid || isNameInvalid || isMailInvalid || isPhoneInvalid) {
                field.input.classList.add('is-invalid');
                field.input.classList.remove('is-valid');
                validValue = false;
            } else {
                field.input.classList.remove('is-invalid');
                field.input.classList.add('is-valid');
            }
        });
        //----------------------------------------------------------------------Si todo es valido escribo en LocalStorage----------------------------------------------------------------------//
        if (validValue) {       
             saveInLocalStorage(form,name,email,phone,idCard,comment,birthDate,appointmentDate);
        }
        
    }
   
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
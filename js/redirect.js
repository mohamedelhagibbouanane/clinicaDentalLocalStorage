// =================================================================================================
// EVENTO GLOBAL DE CLICK PARA NAVEGACIÓN ENTRE PÁGINAS
// =================================================================================================

// Se agrega un "event listener" al documento completo para detectar todos los clics realizados.
// Esto se conoce como "delegación de eventos": en lugar de asignar un evento a cada botón,
// se captura el clic a nivel del documento y luego se analiza cuál fue el elemento clicado.
document.addEventListener("click", (event) => {

    // ---------------------------------------------------------------------------------------------
    // 1. OBTENER EL ID DEL ELEMENTO CLICADO
    // ---------------------------------------------------------------------------------------------
    // "event.target" representa el elemento exacto sobre el que el usuario hizo clic.
    // Aquí se muestra en consola el ID de ese elemento, para propósitos de depuración.
    console.log(event.target.id);

    // ---------------------------------------------------------------------------------------------
    // 2. DECIDIR LA ACCIÓN SEGÚN EL ID DEL ELEMENTO CLICADO
    // ---------------------------------------------------------------------------------------------
    // Se utiliza una estructura switch() para determinar qué hacer dependiendo del botón presionado.
    // Cada botón debe tener un atributo "id" único en el HTML.
    switch (event.target.id) {

        // -----------------------------------------------------------------------------------------
        // Si el usuario hace clic en el botón con ID "toCreate",
        // se redirige a la página "create.html".
        // -----------------------------------------------------------------------------------------
        case "toCreate":
            window.location.href = "create.html";
            break;

        // -----------------------------------------------------------------------------------------
        // Si el usuario hace clic en el botón con ID "toManage",
        // se redirige a la página "manage.html".
        // -----------------------------------------------------------------------------------------
        case "toManage":
            window.location.href = "manage.html";
            break;

        // -----------------------------------------------------------------------------------------
        // Si el usuario hace clic en el botón con ID "toModify",
        // se redirige a la página "modify.html".
        // Aquí podría añadirse lógica adicional, por ejemplo,
        // conectar con una base de datos o buscar un registro existente.
        // -----------------------------------------------------------------------------------------
        // case "toModify":
        // En el futuro se puede conectar a una base de datos y buscar la cinta correspondiente.
        //     window.location.href = "modify.html";
        //     break;

        // -----------------------------------------------------------------------------------------
        // Si se hace clic en cualquier otro elemento que no coincida con los anteriores,
        // no se realiza ninguna acción.
        // -----------------------------------------------------------------------------------------
        default:
            break;
    }
});

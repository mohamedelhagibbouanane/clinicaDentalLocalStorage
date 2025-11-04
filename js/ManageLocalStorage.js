// =======================================================================================================
// Archivo: usersTable.js
// Descripción: Este script se encarga de generar dinámicamente una tabla HTML con los registros
//              almacenados en el LocalStorage. Permite además editar o eliminar dichos registros
//              mediante la interacción con botones en cada fila.
// =======================================================================================================

// Importación de funciones desde el módulo LocalStorageFuntions.js
import { getFromLocalStorage } from './LocalStorageFuntions.js';
import { deleteFromLocalStorage } from './LocalStorageFuntions.js';
import { editFromLocalStorage } from './LocalStorageFuntions.js';

// =======================================================================================================
// CARGA INICIAL DE DATOS DESDE LOCALSTORAGE
// =======================================================================================================

// Se obtienen todos los registros almacenados en el LocalStorage
let users = getFromLocalStorage();

// Se obtienen las referencias a los elementos <tbody> y <thead> de la tabla
const tbody = document.querySelector('tbody');
const thead = document.querySelector('thead');

// =======================================================================================================
// CREACIÓN DINÁMICA DE LA TABLA DE USUARIOS
// =======================================================================================================

// Si existen usuarios almacenados, se genera dinámicamente la cabecera (thead) de la tabla
if (users.length > 0) {
  const trh = document.createElement('tr');

  // Se crean las celdas de encabezado (th) en función de las claves del primer objeto de la lista
  for (const key in users[0]) {
    if (key !== 'id') { // El campo 'id' no se muestra en la tabla
      const th = document.createElement('th');
      th.textContent = key;
      trh.appendChild(th);
    }
  }

  // Se añade una columna adicional para las acciones (Editar / Eliminar)
  const thAction = document.createElement('th');
  thAction.textContent = "Action";
  trh.appendChild(thAction);

  // Finalmente, se agrega la fila de cabecera al elemento <thead>
  thead.appendChild(trh);
}

// =======================================================================================================
// GENERACIÓN DE LAS FILAS DE DATOS (tbody)
// =======================================================================================================

// Por cada usuario almacenado, se crea una fila en la tabla
users.forEach((user) => {
  const tr = document.createElement('tr');

  // Se generan dinámicamente las celdas (td) correspondientes a cada propiedad del usuario
  for (const key in user) {
    if (user.hasOwnProperty(key) && key !== 'id') { // Se omite el campo 'id'
      const td = document.createElement('td');
      td.textContent = user[key];
      tr.appendChild(td);
    }
  }

  // =====================================================================================================
  // CREACIÓN DE BOTONES DE ACCIÓN
  // =====================================================================================================

  // Celda que contendrá los botones de acción
  const tdForButtons = document.createElement('td');
  const divFlex = document.createElement('div');
  divFlex.classList.add('d-flex', 'justify-content-center'); // Distribuye los botones centrados horizontalmente

  // ---------- Botón de Edición ----------
  const btnEdit = document.createElement('button');
  btnEdit.textContent = 'Edit';
  btnEdit.classList.add('btn', 'btn-warning', 'bt-sm', 'me-2'); // Estilo Bootstrap
  btnEdit.setAttribute('data-id', user.id); // Asocia el ID del usuario al botón

  // ---------- Botón de Eliminación ----------
  const btnDelete = document.createElement('button');
  btnDelete.textContent = 'Delete';
  btnDelete.classList.add('btn', 'btn-danger', 'bt-sm');
  btnDelete.setAttribute('data-id', user.id);

  // Se añaden los botones al contenedor y este a la fila correspondiente
  divFlex.appendChild(btnEdit);
  divFlex.appendChild(btnDelete);
  tdForButtons.appendChild(divFlex);
  tr.appendChild(tdForButtons);

  // Finalmente, se añade la fila completa al cuerpo de la tabla
  tbody.appendChild(tr);
});

// =======================================================================================================
// DELEGACIÓN DE EVENTOS EN EL <tbody>
// =======================================================================================================
// Se utiliza el patrón de delegación de eventos para detectar clics en los botones de cada fila.
// Esto permite manejar eventos de elementos generados dinámicamente.
tbody.addEventListener('click', (e) => {

  // Obtiene la fila (tr) más cercana al elemento en el que se hizo clic
  const row = e.target.closest('tr');
  if (!row) return; // Si no se ha hecho clic sobre una fila válida, se detiene la ejecución

  // Obtiene el identificador asociado al botón presionado
  const id = e.target.getAttribute("data-id");

  // Si se hace clic en el botón "Delete", se elimina el registro correspondiente del LocalStorage
  if (e.target.classList.contains('btn-danger')) {
    deleteFromLocalStorage(id);
  }

  // Si se hace clic en el botón "Edit", se cargan los datos del usuario en el formulario de actualización
  else if (e.target.classList.contains('btn-warning')) {
    const form = document.querySelector('.updateForm');
    const updateButton = document.getElementById('updateButton');
    editFromLocalStorage(form, id, updateButton);
  }

});

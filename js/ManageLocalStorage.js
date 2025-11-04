import { getFromLocalStorage } from './LocalStorageFuntions.js';
import { deleteFromLocalStorage } from './LocalStorageFuntions.js';
import { editFromLocalStorage } from './LocalStorageFuntions.js';
// =================================================================================================
// CARGA INICIAL DE DATOS DESDE LOCALSTORAGE
// =================================================================================================

let users = getFromLocalStorage();
const tbody = document.querySelector('tbody');
const thead = document.querySelector('thead');

// =================================================================================================
// CREACIÓN DINÁMICA DE LA TABLA DE USUARIOS
// =================================================================================================
if (users.length > 0) {
  const trh = document.createElement('tr');
  for (const key in users[0]) {
    if (key !== 'id') {
      const th = document.createElement('th');
      th.textContent = key;
      trh.appendChild(th);
    }
  }

  const thAction = document.createElement('th');
  thAction.textContent = "Action";
  trh.appendChild(thAction);
  thead.appendChild(trh);
}


users.forEach((user) => {
  const tr = document.createElement('tr');
  for (const key in user) {
    if (user.hasOwnProperty(key) && key !== 'id') {

      const td = document.createElement('td');
      td.textContent = user[key];
      tr.appendChild(td);
    }
  }


  // ============================ BOTONES ============================

  const tdForButtons = document.createElement('td');
  const divFlex = document.createElement('div');
  divFlex.classList.add('d-flex', 'justify-content-center');

  // Botón Edit
  const btnEdit = document.createElement('button');
  btnEdit.textContent = 'Edit';
  btnEdit.classList.add('btn', 'btn-warning', 'bt-sm', 'me-2');
  btnEdit.setAttribute('data-id', user.id);


  // Botón Delete
  const btnDelete = document.createElement('button');
  btnDelete.textContent = 'Delete';
  btnDelete.classList.add('btn', 'btn-danger', 'bt-sm');
  btnDelete.setAttribute('data-id', user.id);


  divFlex.appendChild(btnEdit);
  divFlex.appendChild(btnDelete);
  tdForButtons.appendChild(divFlex);
  tr.appendChild(tdForButtons);
  tbody.appendChild(tr);

});

// =================================================================================================
// DELEGACIÓN DE EVENTOS EN EL <tbody>
// =================================================================================================
tbody.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  if (!row) return;
  const id = e.target.getAttribute("data-id");
  if (e.target.classList.contains('btn-danger')) {
    deleteFromLocalStorage(id);
  }
  else if (e.target.classList.contains('btn-warning')) {
    const form = document.querySelector('.updateForm');
    const updateButton = document.getElementById('updateButton');
    editFromLocalStorage(form, id, updateButton);
  }

});

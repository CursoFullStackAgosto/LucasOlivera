
document.addEventListener('DOMContentLoaded', cargarTareasGuardadas);

function cargarTareasGuardadas() {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareasGuardadas.forEach(tareaTexto => {
        agregarTareaALaLista(tareaTexto);
    });
}
const btnAgregar = document.getElementById('btnAgregar');
const tareaInput = document.getElementById('tareaInput');
const listaTareas = document.getElementById('listaTareas');

btnAgregar.addEventListener('click', agregarTarea);

function agregarTarea() {
    const tareaTexto = tareaInput.value.trim();
    if (tareaTexto !== '') {
        agregarTareaALaLista(tareaTexto);
        guardarTareaEnLocalStorage(tareaTexto);
        tareaInput.value = '';
    }
}

function agregarTareaALaLista(tareaTexto) {
    const li = document.createElement('li');
    li.textContent = tareaTexto;

    li.addEventListener('click', function () {
        li.classList.toggle('completada');
    });
    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('eliminar');
    const iconoBasura = document.createElement('img');
    iconoBasura.src = 'https://img.icons8.com/material-outlined/24/000000/trash--v1.png'; 
    btnEliminar.appendChild(iconoBasura);
    
    btnEliminar.addEventListener('click', function (event) {
        event.stopPropagation(); 
        listaTareas.removeChild(li);
        eliminarTareaDeLocalStorage(tareaTexto);
    });

    li.appendChild(btnEliminar);
    listaTareas.appendChild(li);
}

function guardarTareaEnLocalStorage(tareaTexto) {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareasGuardadas.push(tareaTexto);
    localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
}

function eliminarTareaDeLocalStorage(tareaTexto) {
    let tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareasGuardadas = tareasGuardadas.filter(tarea => tarea !== tareaTexto);
    localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
}
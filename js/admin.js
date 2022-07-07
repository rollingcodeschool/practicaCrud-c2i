import {Serie} from './serieClass.js';


// traemos los elementos del html
let codigo = document.querySelector('#codigo');
let titulo = document.querySelector('#titulo');
let descripcion = document.querySelector('#descripcion');
let imagen = document.querySelector('#imagen');
let genero = document.querySelector('#genero');
let formulario = document.querySelector('#formSerie');
let btnCrearSerie = document.querySelector('#btnCrearSerie');

const modalAdminSerie = new bootstrap.Modal(document.getElementById('modalSerie'));
console.log(modalAdminSerie);

//si hay algo en localStorage traer esos datos, si no hay nada listaSeries tiene que ser una []
let listaSeries = JSON.parse(localStorage.getItem('listaSeriesKey')) || [];

//tarea agregar validaciones a cada campo

formulario.addEventListener('submit', crearSerie);
btnCrearSerie.addEventListener('click', ()=>{
    limpiarFormulario();
    modalAdminSerie.show();
})

function crearSerie(e){
    e.preventDefault();
    console.log('desde crear serie');
    //volver a validar todos los campos y si son correctos entonces crear la serie
    let nuevaSerie = new Serie( codigo.value, titulo.value, descripcion.value, imagen.value, genero.value);
    console.log(nuevaSerie);
    //agregamos la serie al final del arreglo
    listaSeries.push(nuevaSerie);
    console.log(listaSeries);
    //limpiar el formulario
    limpiarFormulario();
    //guardar la lista de series en localStorage
    guardarListaSeries();
    //cerrar modal que administra las series
    modalAdminSerie.hide();
}

function limpiarFormulario(){
    formulario.reset();
    //si usamos las clases isvalid o is-invalid de bootstrap hay que resetearlas
}

function guardarListaSeries(){
    localStorage.setItem('listaSeriesKey', JSON.stringify(listaSeries));
}
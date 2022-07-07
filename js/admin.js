import { Serie } from "./serieClass.js";

// traemos los elementos del html
let codigo = document.querySelector("#codigo");
let titulo = document.querySelector("#titulo");
let descripcion = document.querySelector("#descripcion");
let imagen = document.querySelector("#imagen");
let genero = document.querySelector("#genero");
let formulario = document.querySelector("#formSerie");
let btnCrearSerie = document.querySelector("#btnCrearSerie");

const modalAdminSerie = new bootstrap.Modal(
  document.getElementById("modalSerie")
);
console.log(modalAdminSerie);

//si hay algo en localStorage traer esos datos, si no hay nada listaSeries tiene que ser una []
let listaSeries = JSON.parse(localStorage.getItem("listaSeriesKey")) || [];

//tarea agregar validaciones a cada campo

formulario.addEventListener("submit", crearSerie);
btnCrearSerie.addEventListener("click", () => {
  limpiarFormulario();
  modalAdminSerie.show();
});

//verificar si hay datos para dibujar en la tabla
cargarInicial();



function crearSerie(e) {
  e.preventDefault();
  console.log("desde crear serie");
  //volver a validar todos los campos y si son correctos entonces crear la serie
  let nuevaSerie = new Serie(
    codigo.value,
    titulo.value,
    descripcion.value,
    imagen.value,
    genero.value
  );
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
  //mostrar cartel al usuario
  Swal.fire("Serie creada", "La serie fue cargada correctamente", "success");
  //crear o dibujar la fila en la tabla
  crearFila(nuevaSerie);
}

function limpiarFormulario() {
  formulario.reset();
  //si usamos las clases isvalid o is-invalid de bootstrap hay que resetearlas
}

function guardarListaSeries() {
  localStorage.setItem("listaSeriesKey", JSON.stringify(listaSeries));
}

function cargarInicial() {
  if (listaSeries.length > 0) {
    // dibujar la tabla
    listaSeries.forEach((itemSerie)=>{ crearFila(itemSerie)} )
  }
}

function crearFila(itemSerie) {
    console.log(itemSerie);
  let tablaSeries = document.querySelector("#listaSeries");
  tablaSeries.innerHTML += ` <tr>
    <th scope="row">${itemSerie.codigo}</th>
    <td>${itemSerie.titulo}</td>
    <td>
      ${itemSerie.descripcion}
    </td>
    <td>${itemSerie.imagen}</td>
    <td>${itemSerie.genero}</td>
    <td>
      <button class="btn btn-warning">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-danger">
        <i class="bi bi-x-square"></i>
      </button>
    </td>
  </tr>
    `;
}

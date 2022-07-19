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
//variable para manejar el create y el update
let serieExistente = false; // si serieExiste es false la serie es Nueva, si es true ya existe deberia modificar

//si hay algo en localStorage traer esos datos, si no hay nada listaSeries tiene que ser una []
let listaSeries = JSON.parse(localStorage.getItem("listaSeriesKey")) || [];

//tarea agregar validaciones a cada campo

formulario.addEventListener("submit", guardarSerie);
btnCrearSerie.addEventListener("click", () => {
  limpiarFormulario();
  //considero crear una nueva serie
  serieExistente= false;
  console.log(serieExistente)
  modalAdminSerie.show();
});

//verificar si hay datos para dibujar en la tabla
cargarInicial();


function guardarSerie(e){
  e.preventDefault();
  // if(true)
  if(serieExistente){
    //aqui quiero modificar una serie existente
    console.log('aqui quiero modificar');
    //validar los datos
    //guardar la actualizacion
    guardarEdicionSerie();
  }else{
    //aqui quiero crear una nueva serie
    crearSerie()
  }
}

function crearSerie() {
 
  console.log("desde crear serie");
  //volver a validar todos los campos y si son correctos entonces crear la serie
  let nuevaSerie = new Serie(
    codigo.value,
    titulo.value,
    descripcion.value,
    imagen.value,
    genero.value
  );

  //agregamos la serie al final del arreglo
  listaSeries.push(nuevaSerie);

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
    listaSeries.forEach((itemSerie) => {
      crearFila(itemSerie);
    });
  }
}

function crearFila(itemSerie) {

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
      <button class="btn btn-warning" onclick='preparEdicionSerie("${itemSerie.codigo}")'>
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-danger" onclick='borrarProducto("${itemSerie.codigo}")'>
        <i class="bi bi-x-square"></i>
      </button>
    </td>
  </tr>
    `;
}

window.borrarProducto = function (codigo) {

  //preguntar al usuario si estoy segura de borrar
  Swal.fire({
    title: "Esta seguro de eliminar la serie",
    text: "No puedes revertir este paso luego de aceptar",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //borrar la serie listaSeries y tambien del localStorage
      let listaSeriesNueva = listaSeries.filter((serie)=> { return serie.codigo != codigo } );
      listaSeries = listaSeriesNueva;
      guardarListaSeries();
      //actualizar la tabla
      borrarTabla();
      cargarInicial();
      //mostrar cartel de operacion exitosa
      Swal.fire(
        "Serie eliminada",
        "La serie seleccionada fue correctamente eliminada",
        "success"
      );
    }
  });
};

function borrarTabla(){
  let tbodySeries = document.querySelector('#listaSeries');
  tbodySeries.innerHTML ='';
}

window.preparEdicionSerie = function (codigoP) {
  console.log(codigoP)
  //cargar los datos de la serie a editar
  let serieBuscada = listaSeries.find((serie)=>{return serie.codigo == codigoP});
  console.log(serieBuscada.codigo);
  //asignar los valores a cada input
  codigo.value = serieBuscada.codigo;
  titulo.value = serieBuscada.titulo;
  descripcion.value = serieBuscada.descripcion;
  imagen.value = serieBuscada.imagen;
  genero.value = serieBuscada.genero;
  //mostrar formulario de la ventana modal
  modalAdminSerie.show();
  // aqui modifico la variable existeSerie para poder editar
  serieExistente = true;
  console.log(serieExistente);
}

function guardarEdicionSerie(){
  //necesitamos la posicion de la serie dentro del arreglo
  let posicionSerie = listaSeries.findIndex((serie)=> {return serie.codigo == codigo.value})
  //modificamos los valores de la serie encontrada
  listaSeries[posicionSerie].titulo = titulo.value;
  listaSeries[posicionSerie].descripcion = descripcion.value;
  listaSeries[posicionSerie].imagen = imagen.value;
  listaSeries[posicionSerie].genero = genero.value;
  //actualizar el localstorage
  guardarListaSeries();
  //actualizar la tabla
  borrarTabla();
  cargarInicial();
  //indicar al usuario si se pudo realizar la accion
  Swal.fire(
    "Serie actualizada",
    "La serie seleccionada fue correctamente actualizada",
    "success"
  );
  //cerrar la ventana modal
  modalAdminSerie.hide();
}
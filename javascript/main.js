import {autos} from "./autos.js";

// Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const transmision = document.querySelector("#transmision");
let contenedorCards = document.querySelector(".cards-autos");

const max = new Date ().getFullYear();
const min = max - 11;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    transmision : '',
}

//Eventos para los select de búsqueda
marca.addEventListener("change", e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener("change", e => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});

minimo.addEventListener("change", e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener("change", e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

transmision.addEventListener("change",e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});


//Eventos
document.addEventListener("DOMContentLoaded", () => {
    crearCards(autos); // Muestra los autos
    llenarSelect() // Genera los años del select

})




//Funciones
function crearCards (autos) {
    limpiarHTML();
    autos.forEach(auto => {
        let div = document.createElement("div");
        div.className = `col-md-3`;
        div.innerHTML = 
        `<div class="card shadow-lg" style="width: 18rem;">
            <img src="${auto.img}" class="card-img-top p-3" alt="Auto en venta">
            <div class="card-body">
                <h5 class="card-title">${auto.marca}</h5>
                <p class="card-text">${auto.modelo}</p>
                <p class="card-text">Año: ${auto.year} <br>
                Transmision: ${auto.transmision} <br>
                </p>
                <h6 class="card-text">$${auto.precio}</h6>
                <a href="#" class="btn btn-primary">Comprar</a>
            </div>
        </div>`
        contenedorCards.appendChild(div);
    })
}

// Limpiar HTML
function limpiarHTML () {
    while (contenedorCards.firstChild) {
        contenedorCards.removeChild(contenedorCards.firstChild);
    }
}

// Genera los años del select
function llenarSelect() {
    for (let i = max; i >= min; i--){
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

//Funcion que filtra los autos
function filtrarAuto () {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarTransmision);

    if (resultado.length != 0){
        crearCards(resultado);
    } else {
        noResultado ();
    }
}

function noResultado () {
    limpiarHTML();
    const noResultado = document.createElement("div");
    noResultado.classList.add("alerta", "error");
    noResultado.textContent = "No hay resultados, intenta con otros términos de búsqueda!";
    contenedorCards.appendChild(noResultado);
}


function filtrarMarca (auto) {
    const {marca} = datosBusqueda; //Destructuracion del objeto
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}
function filtrarYear (auto) {
    const {year} = datosBusqueda; //Destructuracion del objeto
    if (year) {
        return auto.year == year;
    }
    return auto;
}
function filtrarMinimo (auto) {
    const {minimo} = datosBusqueda; //Destructuracion del objeto
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}
function filtrarMaximo (auto) {
    const {maximo} = datosBusqueda; //Destructuracion del objeto
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}
function filtrarTransmision (auto) {
    const {transmision} = datosBusqueda; 
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}
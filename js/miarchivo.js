let pelisLista = JSON.parse(localStorage.getItem("PelisenLista")) || []

const btnAgregarLista = document.querySelector('#listaPeli')
const contenedorLista = document.querySelector('#listado')
const contenedorListado = document.querySelector('#listado .pelis')
const buscador = document.querySelector('#genero')
const resultado = document.querySelector("#resultado")
const datosBusqueda = {
    nombre:'',
    genero: '',
    id: ''
    
}

const containerDiv = document.querySelector(".container");



btnAgregarLista.addEventListener('click', agregarPeli);

buscador.addEventListener('change', e=> {
    datosBusqueda.genero = e.target.value

    filtrarPeli()
})


function crearPelis(){
    // limpiarHTML()
    peliculas.forEach((pelis) => {
        containerDiv.innerHTML += `<div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="${pelis.imagen}"
          alt="${pelis.nombre}"
        />
        <div class="card-body">
          <p class="card-title">${pelis.nombre}</p>
          <a type="button" class="btn btn-primary agregar-lista" id="${pelis.id}">Agregar a la Lista</a>
        </div>
      </div>`
    })
}

function miListaHTML(){

    //limpiar el HTML
    limpiarHTML();
    //recorre pelis y genera HTML
    pelisLista.forEach( peli => {
        const { imagen, nombre, id} = peli;
        const row = document.createElement('div')
        row.classList.add('card')
        row.innerHTML += `
                <img class="card-img-top" src="${imagen}" alt=""/>
            <div class="card-body">
            <p class="card-title">${nombre}</p>
            <a type="button" class="btn btn-primary quitar-lista" id="${id}">Quitar de la Lista</a>
            </div>
            `;

            //Agregar Pelicula a la lista
            contenedorLista.appendChild(row);
            localStorage.setItem("PelisenLista", JSON.stringify(pelisLista));
    })
}


function agregarPeli(e){
    e.preventDefault();

    if (e.target.classList.contains('agregar-lista')){
        
        e.target.classList.add('disabled')
        e.target.textContent = 'Ya esta en la lista'
        const peliSeleccionada = e.target.parentElement.parentElement;
        leerDatosPeli(peliSeleccionada);
    }
    if (e.target.classList.contains('quitar-lista')){
        const peliSeleccionada = e.target.parentElement.parentElement;
        borrarPeli(peliSeleccionada);
    }

}


function leerDatosPeli(peli){

    const infoPeli = {
        imagen: peli.querySelector('img').src, 
        nombre: peli.querySelector('p').textContent,
        id: peli.querySelector('a').getAttribute('id'),
    }
    const existe = pelisLista.some(peli => peli.id === infoPeli.id);
    if (existe){
        return
    } else {
        pelisLista = [...pelisLista, infoPeli]
        miListaHTML();
}
}

function borrarPeli(peli){
    const infoPeli = {
        // imagen: peli.querySelector('img').src, 
        // nombre: peli.querySelector('p').textContent,
        id: peli.querySelector('a').getAttribute('id'),
    }

    const existe = pelisLista.some(peli => peli.id === infoPeli.id);
    if (existe){
        pelisLista = pelisLista.filter((pelisFilter) => pelisFilter.id !== infoPeli.id)
   miListaHTML()
   localStorage.setItem("PelisenLista", JSON.stringify(pelisLista))
    }}



function filtrarPeli(){
    const resultado = peliculas.filter(filtrarGenero)
    if (resultado.length){
        console.log(resultado)
        peliFiltrada(resultado)
    } else {
        console.log('asd')
    }
}

function filtrarGenero(peli){
    if (datosBusqueda.genero){
        return peli.genero === datosBusqueda.genero
    } 
    return peli
}

function peliFiltrada(pelis){
    limpiandoGenero()
    if (pelis.length==peliculas.length){
        const row = document.createElement('h4')
        row.innerHTML = `Seleccione un Genero para filtrar`
        resultado.appendChild(row);
    } else {
    //recorre pelis y genera HTML
    pelis.forEach( peli => {
        const { imagen, nombre, id} = peli;
        const row = document.createElement('div')
        row.classList.add('card')
        row.innerHTML += 
        `
                <img class="card-img-top" src="${imagen}" alt=""/>
            <div class="card-body">
            <p class="card-title">${nombre}</p>
            <a type="button" class="btn btn-primary agregar-lista" id="${id}">Agregar a la Lista</a>
            </div>
            `;
            //Agregar Pelicula filtrada
            resultado.appendChild(row);
    })
}
}

function limpiarHTML() {
    while(contenedorLista.firstChild){
        contenedorLista.removeChild(contenedorLista.firstChild)
    }
    
}


function limpiandoGenero() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
    
}
miListaHTML()
crearPelis()
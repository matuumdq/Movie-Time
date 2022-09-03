let peliculas = []
let pelisLista = JSON.parse(localStorage.getItem("PelisenLista")) || []

const btnAgregarLista = document.querySelector('#listaPeli')
const contenedorLista = document.querySelector('#listado')
const contenedorListado = document.querySelector('#listado .pelis')
const buscador = document.querySelector('#genero')
const resultado = document.querySelector("#resultado")

const datosBusqueda = {
    genero: ''
}

const containerDiv = document.querySelector(".container");

btnAgregarLista.addEventListener('click', agregarPeli);

buscador.addEventListener('change', e=> {
    datosBusqueda.genero = e.target.value

    filtrarPeli()
})


const cargarContenido = async () => {
  try {
    const response = await fetch('js/peliculas.json')
        .then ((response) => response.json())
        .then ((pelis) => {
          peliculas = pelis
          crearPelis()
        })}
  catch (error) {
      containerDiv.innerHTML = retornoError()
    }
  }

  const retornoError = () => {
    containerDiv.classList.remove('container')
    return `<div class="error">
              <div class="emoji"><i class="fa-solid fa-video-slash"></i></div>
              <p>Se ha producido un error al cargar las peliculas</p>
              <p>Intenta nuevamente en unos instantes...</p>
            </div>`
  }
  

function crearPelis(){
    peliculas.forEach((pelis) => {
        const {imagen, nombre, id, trailer, reparto, director} = pelis
        containerDiv.innerHTML += `<div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="${imagen}"
          alt="${nombre}"
          title="${nombre}"
        />
        <div class="card-body">
          <p class="card-title">${nombre}</p>
          <a type="button" class="btn btn-primary agregar-lista" id="${id}">Agregar a la Lista</a>
        
        </div>
        <button type="button" class="btn btn-primary modals" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>`
 
    })
marcarBotones()

}

function miListaHTML(){
    limpiarHTML();
    //recorre pelis y genera HTML
    pelisLista.forEach( peli => {
        const { imagen, nombre, id, } = peli;
        const row = document.createElement('div')
        row.classList.add('card')
        row.innerHTML += `
                <img class="card-img-top" src="${imagen}" alt="${nombre}" title="${nombre}"/>
            <div class="card-body">
            <p class="card-title">${nombre}</p>
            <a type="button" class="btn btn-primary quitar-lista" id="${id}">Quitar de la Lista</a>
            </div>
            <button type="button" class="btn btn-primary modals" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-magnifying-glass"></i></button>
            `;
            //Agregar Pelicula a la lista
            contenedorLista.appendChild(row);
            localStorage.setItem("PelisenLista", JSON.stringify(pelisLista));
            
    })
    marcarBotones()
}

function agregarPeli(e){
    e.preventDefault();

    if (e.target.classList.contains('agregar-lista')){
        
        e.target.classList.add('disabled')
        e.target.textContent = 'Ya esta en la lista'
        aLista()
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
        id: peli.querySelector('a').getAttribute('id'),
    }

    const existe = pelisLista.some(peli => peli.id === infoPeli.id);
    if (existe){
        pelisLista = pelisLista.filter((pelisFilter) => pelisFilter.id !== infoPeli.id)
   miListaHTML()
   localStorage.setItem("PelisenLista", JSON.stringify(pelisLista))
   quitarLista()
   
    }}



function filtrarPeli(){
    const resultado = peliculas.filter(filtrarGenero)
    if (resultado.length){
        peliFiltrada(resultado)
    } else {
        return
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
    pelis.forEach( peli => {
        const { imagen, nombre, id} = peli;
        const row = document.createElement('div')
        row.classList.add('card')
        row.innerHTML += 
        `
                <img class="card-img-top" src="${imagen}" alt="${nombre}" title="${nombre}"/>
            <div class="card-body">
            <p class="card-title">${nombre}</p>
            <a type="button" class="btn btn-primary agregar-lista" id="${id}">Agregar a la Lista</a>
            </div>
            <button type="button" class="btn btn-primary modals tamano" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-magnifying-glass"></i></button>
            `;
            
            //Agregar Pelicula filtrada
            resultado.appendChild(row);
            
    })
    marcarBotones()
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

function aLista() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            background: 'green',
            color: 'white',
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Pelicula agregada a la lista'
          })
}


function quitarLista() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        background: 'red',
            color: 'white',
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Pelicula quitada de la lista'
      })
}


function marcarBotones(){
    const btnModal= document.querySelectorAll('.modals')
        for (const button of btnModal) {
            button.addEventListener('click', function(peli) {
                const peliSeleccionada = peli.target.parentElement;
                const asd = {id : peliSeleccionada.querySelector('a').getAttribute('id')}
                const existe = peliculas.find(pelis => pelis.id === parseInt(asd.id));
                crearModal(existe)
            })
          }
    
          function crearModal(datosPeli){
            const {nombre, genero, calificacion, trailer, reparto, director, id} = datosPeli
            const row = document.querySelector('#exampleModal')
            row.innerHTML = `
            <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title texto-titulo" id="exampleModalLabel">${nombre}</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <div class="row">
                <div class="col-lg-6"><div class="embed-responsive">
                <iframe
                    id="iframeVideo" width="550" height="320"
                    class="embed"
                    src="${trailer}"                              
                    allow="autoplay"
                ></iframe>           
                </div>
                </div> 
                <div class="col-lg-6 contenedor-texto">
                <p class="texto-parrafo"><span class="texto-span">Reparto:</span> ${reparto}</p>
                <div class='abajo'>
                <p class="texto-parrafo fondo"><span class="texto-span">Director:</span> ${director}</p>
                <p class="texto-parrafo fondo"><span class="texto-span">Calificacion IMDB:</span> ${calificacion}</p>
                <p class="texto-parrafo fondo"><span class="texto-span">Genero:</span> ${genero}</p></div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
            <p></p>
          </div>
            `
          }}
           


function iniciar(){
    setTimeout(() => {
        cargarContenido() 
        document.querySelector('#carga').classList.add('hide')  
    }, 3000);
}


iniciar()
miListaHTML()
marcarBotones()



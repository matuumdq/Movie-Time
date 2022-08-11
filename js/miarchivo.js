const peliculas = []
const series = ['BREAKING BAD', 'THE BOYS', 'MR. ROBOT', 'PEAKY BLINDERS', 'THE SINNER']
const seccionPeli = document.getElementById('card-pelis')

const nombreBuscarPeli = document.querySelector('#peli-buscada')
const btnBuscarPeli = document.querySelector('#buscar')

const inpNombre = document.querySelector('#agregar-nombre')
const inpGenero = document.querySelector('#agregar-genero')
const inpCalif = document.querySelector('#agregar-calif')
const btnAgregarPeli = document.querySelector('#agregar-peli')

const textoBusqueda = document.querySelector('.formBuscarPeli')

function seleccionPlan(){
    seleccion=prompt('Selecciona un numero para el Plan deseado: 1- Simple, 2- Famliar, 3- Premium')
    switch(seleccion) {
        case "1": 
            precio = 400
            totIva(precio)
            console.log ("Solicitara el Plan Simple por: $", total, "con iva e impuestos incluidos")
            cantidad = parseInt(prompt("Cuantas personas lo usaran?(maximo 2)"))
                if (cantidad<=2) {
                    personas(cantidad)
                } else {
                    console.log("Numero de usuarios no permitido")
                } 
        break;
        case "2":
            precio = 800
            totIva(precio)
            console.log ("Solicitara el Plan Familiar por: $", total, "con iva e impuestos incluidos")
            cantidad = parseInt(prompt("Cuantas personas lo usaran?(maximo 4)"))
                if (cantidad<=4){
                personas(cantidad)
                } else {
                    console.log("Numero de usuarios no permitido")
                }
            break
        case "3" :
            precio = 1200
            totIva(precio)
            console.log ("Solicitara el Plan Premium por: $", total, "con iva e impuestos incluidos")
            cantidad = parseInt(prompt("Cuantas personas lo usaran?(maximo 4)"))
                if (cantidad<=4){
                    personas(cantidad)
                } else {
                    console.log("Numero de usuarios no permitido")
                }      
        break 
        default : 
            console.log('Seleccione una opcion valida')
            seleccionPlan()
    }}

    function totIva(valor){
        iva = (valor*1.21)
        total = (iva * 1.50)
    }
    
    function personas(numPersonas) {
        for (i=1; i<=numPersonas; i++)
        console.log("Hola Persona: ", i)
    }


    // Peliculas
    class Pelicula {
        constructor(nombre, genero, calificacion) {
            this.nombre = nombre
            this.genero = genero
            this.calificacion = calificacion
        }
    }

    function generadorPelis() {
        peliculas.push(new Pelicula('inception', 'accion', 8.8))
        peliculas.push(new Pelicula('fracture', 'crimen', 7.2))
        peliculas.push(new Pelicula('perdida', 'suspenso', 7.3))
        peliculas.push(new Pelicula('el club de la pelea', 'suspenso', 8.8))
        peliculas.push(new Pelicula('hogar', 'drama', 6.4))
        peliculas.push(new Pelicula('el bar', 'aventura', 6.3))
    }

    generadorPelis()

    function agregarPeli(nombrePeli, generoPeli, calificacionPeli){
      
            let nombre = nombrePeli
            let genero = generoPeli
            let calificacion = parseFloat(calificacionPeli).toFixed(1)
            peliculas.push(new Pelicula(nombre, genero, calificacion))
            limpiarHTMLPeli()
            const cardPelicula = document.createElement('div')
            cardPelicula.className="pelis"
            peliculas.forEach(peli => {
                cardPelicula.innerHTML += `<div class="card pelicula">
                <div class="card-body">
                  <h5 class="card-title">${peli.nombre}</h5>
                  <p class="card-text">${peli.genero}</p>
                  <p class="card-text">Calificacion: ${peli.calificacion}</p>
                  <a href="#" class="btn btn-primary">Ver</a>
                  <a href="#" class="btn btn-primary">Descargar</a>
                </div>
              </div>`
              seccionPeli.appendChild(cardPelicula)
            })
    }

    function peliDisponible(nombre){
        let nombrePeli = nombre.toLowerCase()
        const existe = peliculas.some(peli=> peli.nombre === (nombrePeli))
        const textBusqueda = document.querySelector('#textoDisponible')
        textBusqueda.className="parrafoPeli"
        textBusqueda.innerHTML = ('La pelicula esta disponible: ' + existe)
        textoBusqueda.appendChild(textBusqueda)
    }
    
    function busquePeliGenero(){
      let generoABuscar = prompt('Ingrese genero de la peli que quiera ver: ').toLowerCase()
      const peliPorGener = peliculas.filter(pelis => pelis.genero.includes(generoABuscar))
      console.log('Puede ver la peli: ', peliPorGener)
    }

    function ordenarPelis(){
        peliculas.sort((a,b) => {
            if (a.calificacion < b.calificacion){
              return 1
            }
            if (a.calificacion > b.calificacion){
              return -1
            }
            return 0
        })
        console.table(peliculas)
    }

    
        // Series

    function buscarSerie() {
        let buscar = prompt('Ingrese el nombre de la serie que quiere ver: ').toUpperCase()
        let resultSerie = series.includes(buscar)
            if (resultSerie === false){
             ('Nuestro catalogo no cuenta con la series: ', buscar)
            } else {
            console.log('En breve se reproducira la serie: ', buscar)
            }
    }

    function eliminarSerie (){
        let sacarSerie = prompt('Ingrese el titulo de la serie a agregar: ').toUpperCase()
        let lugarSerie = series.indexOf(sacarSerie)
        if (lugarSerie === -1){
            console.warn('Serie no eliminada, no esta en nuestro listado')
        } else {
            series.splice(lugarSerie, 1)
            console.log('Se elimino la serie: ', sacarSerie)
        }
    }

    function limpiarHTMLPeli(){
        seccionPeli.innerHTML = '';
    }

    

    //Eventos

    btnBuscarPeli.addEventListener('click', () => {
        const textPeli = nombreBuscarPeli.value
        peliDisponible(textPeli)})

    btnAgregarPeli.addEventListener('click', ()=>{
        const nombreAgregado = inpNombre.value.toLowerCase()
        const generoAgregado = inpGenero.value
        const califAgregado = inpCalif.value
        agregarPeli(nombreAgregado, generoAgregado, califAgregado)
    })
const peliculas = []
const series = ['BREAKING BAD', 'THE BOYS', 'MR. ROBOT', 'PEAKY BLINDERS', 'THE SINNER']

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

    class Pelicula {
        constructor(nombre, genero, year, calificacion) {
            this.nombre = nombre
            this.genero = genero
            this.year = year
            this.calificacion = calificacion
        }
    }

    function generadorPelis() {
        peliculas.push(new Pelicula('Inception', 'Accion', 2010, 8.8))
        peliculas.push(new Pelicula('Fracture', 'Crimen', 2007, 7.2 ))
        peliculas.push(new Pelicula('Perdida', 'Suspenso', 2014, 7.3))
        peliculas.push(new Pelicula('El club de la pelea', 'Suspenso', 1999, 8.8))
        peliculas.push(new Pelicula('Hogar', 'Drama', 2020, 6.4))
        peliculas.push(new Pelicula('El Bar', 'Aventura', 2017, 6.3))
    }

    function agregarPeli(){
            let nombre = prompt('Ingrese nombre de la peli: ')
            let genero = prompt("Genero de la peli: ")
            let year = parseInt(prompt("Ano de la pelicula"))
            let calificacion = parseFloat(prompt('Calificacion IMDB de su pelicula: ')).toFixed(1)
            peliculas.push(new Pelicula(nombre, genero, year, calificacion))
        }

    function buscarSerie() {
        let buscar = prompt('Ingrese el nombre de la serie que quiere ver: ').toUpperCase()
        let resultSerie = series.includes(buscar)
        if (resultSerie === false){
            console.log ('Nuestro catalogo no cuenta con la series: ', buscar)
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
let seleccion = ""
let precio = 0


function seleccionPlan(){
    seleccion=prompt('Selecciona un numero para el Plan deseado: 1- Simple, 2- Famliar, 3- Premium')
if(seleccion==1) {
        precio = 400
        totIva(precio)
        console.log ("Solicitara el Plan Simple por: $", total, "con iva e impuestos incluidos")
        cantidad = parseInt(prompt("Cuantas personas lo usaran?(maximo 2"))
        if (cantidad<=2)
        {personas(cantidad)
        } else {
            console.log("Numero de usuarios no permitido")
        }
} else if(seleccion==2) {
        precio = 800
        totIva(precio)
        console.log ("Solicitara el Plan Familiar por: $", total, "con iva e impuestos incluidos")
        cantidad = parseInt(prompt("Cuantas personas lo usaran?(maximo 4"))
        if (cantidad<=4){
            personas(cantidad)
        } else {
            console.log("Numero de usuarios no permitido")
        }
} else if(seleccion==3) { 
        precio = 1200
        totIva(precio)
        console.log ("Solicitara el Plan Premium por: $", total, "con iva e impuestos incluidos")
        cantidad = parseInt(prompt("Cuantas personas lo usaran?(maximo 4"))
        if (cantidad<=4){
            personas(cantidad)
        } else {
            console.log("Numero de usuarios no permitido")
        }
    } 
        else {
        console.log('Seleccione una opcion valida')
        personas()
    }
}

function totIva(valor){
    iva = (valor*1.21)
    total = (iva * 1.50)
}

function personas(numPersonas) {
    for (i=1; i<=numPersonas; i++)
    console.log("Hola Persona: ", i)
}
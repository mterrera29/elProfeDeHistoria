const tesoroContainer = document.getElementById("tesoroContainer")
const tesoroCarrito = document.getElementById("tesoroCarrito")


function abrirTesoro(){
    let tesoro1 = tesoroCarrito.querySelector(".tesoro1")
    let tesoro2 = tesoroCarrito.querySelector(".tesoro2")
    
    tesoroCarrito.addEventListener("mouseover",()=>{
        tesoro1.style.display ="none"
        tesoro2.style.display ="inline"
    })
    tesoroCarrito.addEventListener("mouseout",()=>{
        tesoro1.style.display ="inline"
        tesoro2.style.display ="none"
    })
}
abrirTesoro()

tesoroCarrito.addEventListener("click",()=>{
    mostrarTesoro()
    llenarTesoro()
})

function mostrarTesoro (){
    tesoroContainer.style.display="block" 
    modal.style.display = "block"

    tesoroContainer.innerHTML=""  ///resetea el html para que se vuelva a llenar

    /* HEADER DE tesoro */
    const tesoroHeader = document.createElement("div")
    tesoroHeader.className="infoHeader"
    tesoroHeader.innerHTML= `
    <h3>
        <img class="text1 animate__animated animate__bounce" src="/img/hat.png" alt="planeta">
        el profe de historia 
        <img class="text2 animate__animated animate__bounce" src="./img/latigo.png" alt="planeta">
    </h3>
    `
    tesoroContainer.append(tesoroHeader)

    /* BOTON CERRAR DE tesoro */
    const tesoroBtn = document.createElement("h2")
    tesoroBtn.innerText=("X")
    tesoroBtn.className=("tesoroBtn btn btn-danger btn-sm")
    tesoroHeader.append(tesoroBtn)
    
    tesoroBtn.addEventListener("click",()=>{ 
        tesoroContainer.style.display="none"
        vaciarInfo()
    }) 


    let tesoroContent = document.createElement("div")
    tesoroContent.className= "infoContent"
    tesoroContent.innerHTML= `
        <div class="infoTitulo"> 
        <h1>Baul de Recursos</h1>
        <img src="./img/tesoro abierto.png" class="infoImagen" alt="tesoro abierto">
        </div> 
        ` 
        tesoroContainer.append(tesoroContent)
}

function llenarTesoro() {
    const recursosTesoro = document.createElement("div")
    recursosTesoro.className= "recursosTesoro"
    tesoroContainer.append(recursosTesoro)
    tesoroRecursos.forEach((texto) =>{
        let recurso = document.createElement("div")
        recurso.className= "recurso"
        recurso.innerHTML= `
            <img src="./img/${texto.icon}.png" alt="pdf">
                <a href="${texto.link}" target="_blank" class="textoLink">${texto.nombre}</a>
            ` 
        recursosTesoro.append(recurso)

        let eliminar= document.createElement("button")
        eliminar.innerText="X"
        eliminar.className="btnEliminar btn btn-danger btn-sm"
        recurso.append(eliminar)

        eliminar.addEventListener("click",()=>{
            eliminarProducto(texto.nombre)
            mostrarTesoro()
            llenarTesoro()
        })
    })
}

function saveLocal(){
    localStorage.setItem("tesoroRecursos",JSON.stringify(tesoroRecursos))
}

const eliminarProducto= (nombre)=>{
    const foundId = tesoroRecursos.find((rec)=>rec.nombre === nombre)
    
    tesoroRecursos = tesoroRecursos.filter((recursoNombre)=>{
        return recursoNombre !==foundId
    })
    
    /* funcion para guardar el array en LOCAL STORAJE (JSON) */
    saveLocal()
    /* FUNCION PARA QUE VUELVA A MOSTRAR LOS PRODUCTOS QUE ESTAN EN EL CARRITO MENOS EL QUE PEDI ELIMINAR */
    
}
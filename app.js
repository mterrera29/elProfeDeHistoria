const cajasHistoria = document.getElementById("cajasHistoria")
const infoContainer = document.getElementById("infoContainer")
const modal = document.getElementById("modal")

let infoHistoria = []
let infoTextos= []
let tesoroRecursos= JSON.parse(localStorage.getItem("tesoroRecursos")) || []

fetch("./cajas.json")
.then((resp)=> resp.json())
.then((data) =>{
    data.forEach((caja)=>{
        let content = document.createElement("div")
        content.className= "cajasHist"
        content.innerHTML=`
        <div class="caja-historia ${caja.class}" id="cajasHist"> 
                    <h3>${caja.nombre}
                    </h3>
                    <img src=${caja.icon} alt="">
        </div>       
        `
        cajasHistoria.append(content)

        content.addEventListener("click",()=>{
            console.log(infoHistoria)
            console.log(infoTextos)
            infoHistoria.push({
                id: caja.id,
                nombre: caja.nombre,
                icon: caja.icon,
                textos: caja.texto
            })
            infoTextos.push({
                textos: caja.texto,
            })
            abrirInfo()

        })
    })
})
 

const abrirInfo = () =>{

    infoContainer.style.display="block" 
    modal.style.display = "block"
    infoContainer.innerHTML=""  ///resetea el html para que se vuelva a llenar

    /* HEADER DE INFO */
    const infoHeader = document.createElement("div")
    infoHeader.className="infoHeader"
    infoHeader.innerHTML= `
    <h3>
        <img class="text1 animate__animated animate__bounce" src="/img/hat.png" alt="planeta">
        el profe de historia 
        <img class="text2 animate__animated animate__bounce" src="./img/latigo.png" alt="planeta">
    </h3>
    `
    infoContainer.append(infoHeader)
    
    /* BOTON CERRAR DE INFO */
    const infoBtn = document.createElement("h2")
    infoBtn.innerText=("X")
    infoBtn.className=("infoBtn btn btn-danger btn-sm")
    infoHeader.append(infoBtn)
    
    infoBtn.addEventListener("click",()=>{ ///evento que oculta INFO
        infoContainer.style.display="none"
        vaciarInfo()
    }) 
    
    llenarinfo()

    

}

function llenarinfo(){
    infoHistoria.forEach((caja) =>{
        let infoContent = document.createElement("div")
        infoContent.className= "infoContent"
        infoContent.innerHTML= `
        <div class="infoTitulo"> 
        <h1>${caja.nombre}</h1>
        <img src=${caja.icon} alt="" class="infoImagen animate__animated animate__bounce">
        </div> 
        ` 
        infoContainer.append(infoContent)

        const recursosContainer = document.createElement("div")
        recursosContainer.className= "recursosContainer"
        infoContainer.append(recursosContainer)

        ///PDF INFO
        const pdfInfo = document.createElement("div")
        pdfInfo.className=("info pdfInfo")
        pdfInfo.innerHTML= `<div>
        <h2>
        Textos en PDF
        <img src="./img/pdf.png" alt="pdf">
        </h2>
        </div>
        `
        recursosContainer.append(pdfInfo)

        ///VIDEO iNFO

        const videoInfo = document.createElement("div")
        videoInfo.className=("info videoInfo")
        videoInfo.innerHTML= `<div>
        <h2>
        Videos
        <img src="./img/video.png" alt="pdf">
        </h2>
        </div>
        `
        recursosContainer.append(videoInfo)

        ///PRESENTACION

        const presentInfo = document.createElement("div")
        presentInfo.className=("info presentInfo")
        presentInfo.innerHTML= `<div>
        <h2>
        Presentaciones
        <img src="./img/storyboard.png" alt="pdf">
        </h2>
        </div>
        `
        recursosContainer.append(presentInfo)

        ///IMAGENES

        const imgInfo = document.createElement("div")
        imgInfo.className=("info imgInfo")
        imgInfo.innerHTML= `<div>
        <h2>
        Imágenes
        <img src="./img/imagen.png" alt="pdf">
        </h2>
        </div>
        `
        recursosContainer.append(imgInfo)

        ///PDF TEXTOS
        
        caja.textos.forEach((texto) =>{
            let infoTexto = document.createElement("h4")
            infoTexto.className= "infoTexto"
            infoTexto.innerHTML= `
            <img src="./img/${texto.icon}.png" alt="pdf">
            <a href="${texto.link}" target="_blank" class="textoLink">${texto.nombre}</a>
            <h4 class="tesoro">➡
            <img src="./img/tesoro cerrado.png" class="tesoro1" alt="pdf">
            <img src="./img/tesoro abierto.png" class="tesoro2" alt="pdf">
            </h4>
            ` 
            pdfInfo.append(infoTexto)

            
            let tesoro = infoTexto.querySelector(".tesoro")
            let tesoro1 = tesoro.querySelector(".tesoro1")
            let tesoro2 = tesoro.querySelector(".tesoro2")

           infoTexto.addEventListener("mouseover",()=>{
                tesoro.style.display ="inline"

            })
            infoTexto.addEventListener("mouseout",()=>{
                tesoro.style.display ="none"

            })
            tesoro.addEventListener("mouseover",()=>{
                tesoro1.style.display ="none"
                tesoro2.style.display ="inline"
            })
            tesoro.addEventListener("mouseout",()=>{
                tesoro1.style.display ="inline"
                tesoro2.style.display ="none"

            })

            tesoro.addEventListener("click",()=>{
                const repeat = tesoroRecursos.some((repeatProduct) => repeatProduct.nombre === texto.nombre)
                if(repeat){
                    tesoroRecursos.map((text) => {
                        if(text.nombre === texto.nombre){
                            alert("producto ya añadido")
                        }
                    }) 
                }else{
                    tesoroRecursos.push({
                        nombre: texto.nombre,
                        link: texto.link,
                        icon: texto.icon
                    })
                }
                console.log(tesoroRecursos)
                saveLocal()
                
            })
            


        })
    })
}

function vaciarInfo() {
    infoHistoria = [];
    infoContainer.innerHTML="";
    modal.style.display = "none"
}


            


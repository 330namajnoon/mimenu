
import "../../../css/home.css";
import { useState } from "react";
import Serch from "./Serch";
import Comidas from "./Comidas";
import VistaDereceta from "./vistadereceta/VistaDereceta";
import HomeContext from "../../../contexts/homeContext"
function Home() {
    function Receta(name,image) {
        this.perfil = {
            username: "Sina",
            id: "abcd123",
            image: "comida-pishfarz.png"
        }
        this.comida = {
            id: "adfg58",
            name: name,
            material: [15,18,20,25],
            receta: "ilk once patateslerimizi pisirir ve ondansonra iyice ezmemiz lazim ondansonra 3 tane yumurtamizi eklememiz lazim ve karistirip yarim saaat firinda 200derece ile pisircez ,afiyet olsun",
            image: image,
            visits: 10,
            likes: 5,
        }
    }

    const [vistaR,setVistaR] = useState({
        vista: false,
        receta: {}
    });
    
    
    const sdiComidas = [new Receta("Tortia de patata","comida1.jpg"),new Receta("Tortia de patata","comida2.jpg"),new Receta("Tortia de patata","comida3.jpg"),new Receta("Tortia de patata","comida4.jpg")];
    const misComidas = [new Receta("Tortia de patata","comida1.jpg"),new Receta("Tortia de patata","comida2.jpg"),new Receta("Tortia de patata","comida3.jpg"),new Receta("Tortia de patata","comida4.jpg")];
    const comidasPublicadas = [new Receta("Tortia de patata","comida1.jpg"),new Receta("Tortia de patata","comida2.jpg"),new Receta("Tortia de patata","comida3.jpg"),new Receta("Tortia de patata","comida4.jpg")];
    return(
        <HomeContext.Provider value={{visitarReceta,vistaR}}>
            <div  className="home-paszamine">
                {vistaR.vista === true ? <VistaDereceta/> : null}
                <h1 className="menudehoy">Menu de hoy</h1>
                <Serch/>
                {sdiComidas.length > 0 ? <Comidas comidas={sdiComidas} titel="Sugestiones de ingredientes"/> : null}
                {misComidas.length > 0 ? <Comidas comidas={misComidas} titel="Mis comidas"/> : null}
                {comidasPublicadas.length > 0 ? <Comidas comidas={comidasPublicadas} titel="Comidas compartidas"/> : null}
            </div>
        </HomeContext.Provider>
    );

    function visitarReceta(durum,data = {}) {
        let newv = JSON.parse(JSON.stringify(vistaR));
        newv.vista = durum;
        newv.receta = data;
        console.log(vistaR)
        setVistaR(newv);
        console.log(vistaR)
    }
}

export default Home
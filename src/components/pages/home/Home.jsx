
import "../../../css/home.css";
import { useState,useContext} from "react";
import Serch from "./Serch";
import Comidas from "./Comidas";
import VistaDereceta from "./vistadereceta/VistaDereceta";
import HomeContext from "../../../contexts/homeContext";
import AppContext from "../../../contexts/app";
import Comentarios from "../../comentarios/Comentarios";
function Home({datos}) {
    const appContext = useContext(AppContext);
    const [recetaSeleccionada,setRecetaS] = useState(new Receta("a","a"));
    const [vistaR,setVistaR] = useState(false);
    const [buscar,setBuscar] = useState("");
    const sdiComidas = datos.recetas;
    const misComidas = datos.recetas;
    const comidasPublicadas = datos.recetas;
    const [comentarios,setComentarios] = useState(false);
    function Receta(name,image) {
        this.perfil = {
            username: "Sina",
            id: "abcd123",
            image: "comida-pishfarz.png"
        }
        this.comida = {
            id: "adfg58",
            name: name,
            materiales: [15,18,20,25,100,26,38],
            receta: "ilk once patateslerimizi pisirir ve ondansonra iyice ezmemiz lazim ondansonra 3 tane yumurtamizi eklememiz lazim ve karistirip yarim saaat firinda 200derece ile pisircez ,afiyet olsun",
            image: image,
            visits: 10,
            likes: 5,
        }
    }

    function buscarReceta(id) {
        let receta;
        datos.recetas.forEach(e => {
            if(e.comida.id === id) receta = e;
        });
        return receta;
    }
    
   
    return(
        <HomeContext.Provider value={{visitarReceta,recetaSeleccionada,setBuscar}}>
           
            <div    style={{height:`${appContext.height}px`}}  className="home-paszamine">
                {comentarios && 
                <Comentarios 
                    setComentarios={visitarReceta}
                    comentarios={buscarReceta(recetaSeleccionada.comida.id)}
                />
                }
                {vistaR === true ? <VistaDereceta datos={recetaSeleccionada}/> : null}
                <h1 className="menudehoy">Menu de hoy</h1>
                <Serch buscar={buscar}/>
            
                 {sdiComidas.length > 0 ? <Comidas comidas={datos.buscarReceta(datos.recetas,buscar) && buscar !== "" ? datos.buscarReceta(datos.recetas,buscar) : datos.sugestionesIngredientes(datos.recetas)} titel="Sugestiones de ingredientes"/> : null}
                {datos.misComidas(datos.recetas).length > 0 ? <Comidas comidas={datos.misComidas(datos.recetas)} titel="Mis comidas"/> : null}
                {comidasPublicadas.length > 0 ? <Comidas comidas={datos.comidasCompartidas()} titel="Comidas compartidas"/> : null}

            </div>
           
           
        </HomeContext.Provider>
    );

    function visitarReceta(durum,data = {},comentarios = false) {
        setRecetaS(JSON.parse(JSON.stringify(data)));
        setVistaR(durum);
        setComentarios(comentarios);
       
    }
}

export default Home
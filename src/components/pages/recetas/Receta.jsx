import "../../../css/recetas.css";
import Serch from "./Serch";
import Comida from "./Comida";
import AnadirMateriales from "../../anadirMateriales/anadirMateriales";
import RecetasContext from "../../../contexts/recetaContext";
import CambiarRecetas from "./cambiarRecetas/CambiarRecetas";
import { useState,useContext} from "react";
function Receta({datos}) {
    const [recetaSelectada,setRecetaSelectada] = useState({display: false});
    const [buscar,setBuscar] = useState("");
    return(
        <RecetasContext.Provider value={{setBuscar,recetaselectada}} >
            {recetaSelectada.display ? <CambiarRecetas receta={recetaSelectada}/> : null}
            <div className="recetas-paszamine">
                <h1 className="page-name">Recetas</h1>
                <Serch buscar={buscar} />
                <span id="recetas-anadirReceta-span" class="material-symbols-rounded">
                    add_circle
                </span>
                <div className="recetas-paszamine-s">

                    {datos.misComidas(datos.buscarReceta(datos.recetas,buscar))  ? datos.misComidas(datos.buscarReceta(datos.recetas,buscar)).map((e)=> (
                        <Comida  receta={e} />
                        
                    )) : datos.misComidas(datos.recetas).map(e =>(
                        <Comida  receta={e}/>
                    ))} 
                
                </div>
            </div>
        </RecetasContext.Provider>
    );

    function recetaselectada(dply = false,receta = {}) {
        let newreceta = JSON.parse(JSON.stringify(receta));
        newreceta.display = dply;
        setRecetaSelectada(newreceta);
    }
}

export default Receta;
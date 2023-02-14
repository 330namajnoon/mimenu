import "../../../css/recetas.css";
import Serch from "./Serch";
import Comida from "./Comida";
import AnadirMateriales from "../../anadirMateriales/anadirMateriales";
import RecetasContext from "../../../contexts/recetaContext";
import { useState,useContext } from "react";
function Receta({datos}) {
    
    const [buscar,setBuscar] = useState("");
    return(
        <RecetasContext.Provider value={{setBuscar}} >
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
}

export default Receta;
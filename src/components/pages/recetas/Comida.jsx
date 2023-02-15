import "../../../css/recetas.css";
import { useState,useContext } from "react";
import RecetasContext from "../../../contexts/recetaContext";

function Comida({receta}) {
    const {recetaselectada} = useContext(RecetasContext);
   
    return(
        <div onClick={(e)=> {

            e.stopPropagation();
            recetaselectada(true,receta);
    
            }} style={{backgroundImage: `url(./images/${receta.comida.image})`}} className="recetas-receta-bcg">
          
            <div className="visits-likes">
                <span class="material-symbols-rounded">
                    visibility
                </span>
                <h6>{receta.comida.visits.length}</h6>
                <span class="material-symbols-rounded">
                    favorite
                </span>
                <h6>{receta.comida.likes.length}</h6>
            </div>
            <h1 className="nombredecomida">{receta.comida.name}</h1>
        </div>
    );
}

export default Comida;
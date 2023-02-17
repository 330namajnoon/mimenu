import "../../../css/home.css";
import { useContext } from "react";
import HomeContext from "../../../contexts/homeContext";

function Comida({receta}) {
    const {visitarReceta} = useContext(HomeContext);
   
    return(
        <div onClick={(e)=> {

            e.stopPropagation();
            visitarReceta(true,receta);
    
            }} style={{backgroundImage: `url(./images/${receta.comida.image})`}} className="receta-bcg">
          
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
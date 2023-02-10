import "../../../css/home.css";
import { useState,useContext } from "react";
import HomeContext from "../../../contexts/homeContext";

function Comida() {
    const {visitarReceta,vistaR} = useContext(HomeContext);
    const [data,setData] = useState(vistaR);
    return(
        <div onClick={(e)=> {

            e.stopPropagation();
            visitarReceta(true,vistaR);

            }} style={{backgroundImage: `url(./images/${data.receta.comida.image})`}} className="receta-bcg">
            <div className="visits-likes">
                <span class="material-symbols-rounded">
                    visibility
                </span>
                <h6>{data.receta.comida.visits}</h6>
                <span class="material-symbols-rounded">
                    favorite
                </span>
                <h6>{data.receta.comida.likes}</h6>
            </div>
            <h1 className="nombredecomida">{data.comida.name}</h1>
        </div>
    );
}

export default Comida;
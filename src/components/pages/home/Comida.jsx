import "../../../css/home.css";
import { useState,useContext } from "react";
import HomeContext from "../../../contexts/homeContext";

function Comida({receta}) {
    const {visitarReceta} = useContext(HomeContext);
    const [data,setData] = useState(receta);
    return(
        <div onClick={(e)=> {

            e.stopPropagation();
            visitarReceta(true,data);
    
            }} style={{backgroundImage: `url(./images/${data.comida.image})`}} className="receta-bcg">
            <div className="visits-likes">
                <span class="material-symbols-rounded">
                    visibility
                </span>
                <h6>{data.comida.visits}</h6>
                <span class="material-symbols-rounded">
                    favorite
                </span>
                <h6>{data.comida.likes}</h6>
            </div>
            <h1 className="nombredecomida">{data.comida.name}</h1>
        </div>
    );
}

export default Comida;
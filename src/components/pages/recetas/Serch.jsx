import "../../../css/home.css";
import { useContext } from "react";
import RecetasContext from "../../../contexts/recetaContext";
function Serch({buscar}) {
    const {setBuscar} = useContext(RecetasContext);
    return(
        <div className="search-bcg">
            <span class="material-symbols-rounded">
                search
            </span>
            <input onChange={(e)=>{setBuscar(e.target.value)}} type="text" placeholder="Buscar" value={buscar}/>
        </div>
    );
}

export default Serch;
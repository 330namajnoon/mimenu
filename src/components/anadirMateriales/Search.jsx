import "./css/search.css";
import { useContext } from "react";

function Search({buscar,setBuscar}) {
    
    return(
        <div className="anadirMateriales_search_bcg">
            <span id="search" class="material-symbols-rounded">
                search
            </span>
            <input onChange={(e)=> {setBuscar(e.target.value)}} type="text"  placeholder="Agragar material" value={buscar}/>
        </div>
    );
}

export default Search;
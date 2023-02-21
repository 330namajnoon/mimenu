import "./css/search.css";
import { useContext } from "react";
import appContext from "../../contexts/app";
function Search({agragarMaterial,materialesR,setMateriales,buscar,setBuscar,add}) {
    const {datos} = useContext(appContext);
    return(
        <div className="anadirMateriales_search_bcg">
            <span id="search" class="material-symbols-rounded">
                search
            </span>
            <input onChange={(e)=> {setBuscar(e.target.value)}} type="text"  placeholder="Agragar material" value={buscar}/>
            {add ? 
            <span onClick={(ee)=> {
                agragarMaterial();
            }} id="add" class="material-symbols-rounded">
                add
            </span>
            : null}
        </div>
    );

  
}

export default Search;
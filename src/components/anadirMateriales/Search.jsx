import "./css/search.css";
import { useContext } from "react";
import appContext from "../../contexts/app";
function Search({materialesR,setMateriales,buscar,setBuscar,add}) {
    const {datos} = useContext(appContext);
    return(
        <div className="anadirMateriales_search_bcg">
            <span id="search" class="material-symbols-rounded">
                search
            </span>
            <input onChange={(e)=> {setBuscar(e.target.value)}} type="text"  placeholder="Agragar material" value={buscar}/>
            {add ? 
            <span onClick={(ee)=> {
                let newmaterial = {id:datos.materiales.length,name:buscar.charAt(0).toUpperCase() + buscar.slice(1)}
                datos.materiales.push(newmaterial);
                ee.stopPropagation();
                setMateriales(anadirMaterial(newmaterial));
                setBuscar("");
            }} id="add" class="material-symbols-rounded">
                add
            </span>
            : null}
        </div>
    );

    function anadirMaterial(material) {
        let newmateriales = materialesR;
        newmateriales.push(material.id);
        return newmateriales;
    }
}

export default Search;
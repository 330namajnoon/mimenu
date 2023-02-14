import "./css/search.css";
import { useContext } from "react";
import HomeContext from "../../../contexts/homeContext";
function Serch({buscar}) {
    const {setBuscar} = useContext(HomeContext);
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
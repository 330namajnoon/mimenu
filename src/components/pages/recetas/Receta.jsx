import "../../../css/recetas.css";
import Serch from "./Serch";
import Comida from "./Comida";
import RecetasContext from "../../../contexts/recetaContext";
import CambiarRecetas from "./cambiarRecetas/CambiarRecetas";
import AnadirReceta from "./anadirReceta/AnadirReceta";
import { useState,useContext} from "react";
import appContext from "../../../contexts/app";
function Receta({datos}) {
    const {height} = useContext(appContext);
    const [recetaSelectada,setRecetaSelectada] = useState({display: false});
    const [anadirreceta,setAnadirreceta] = useState(false);
    const [buscar,setBuscar] = useState("");
    return(
        <RecetasContext.Provider value={{setBuscar,recetaselectada,setRecetaSelectada}} >
            {recetaSelectada.display ? <CambiarRecetas receta={recetaSelectada}/> : null}
            {anadirreceta ? <AnadirReceta setAnadirreceta={setAnadirreceta} /> : null}
            <div style={{height:`${height}px`}} className="recetas-paszamine">
                <h1 className="page-name">Recetas</h1>
                <Serch buscar={buscar} />
                <span onClick={()=> {setAnadirreceta(true)}} id="recetas-anadirReceta-span" class="material-symbols-rounded">
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

    function recetaselectada(dply = false,receta = {}) {
        let newreceta = JSON.parse(JSON.stringify(receta));
        newreceta.display = dply;
        setRecetaSelectada(newreceta);
    }
}

export default Receta;
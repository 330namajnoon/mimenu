import "./css/anadirMateriales.css";
import appContext from "../../contexts/app";
import BuscarMaterial from "./BuscarMaterial";
import { useContext ,useRef,useState} from "react";
import Search from "./Search";
function AnadirMateriales({materiales,setMateriales}) {
    const {datos} = useContext(appContext);
    const [buscar,setBuscar] = useState("");
    return(
        <div className="anadir-materiales-paszamine">
            
            <Search materialesR={materiales} 
            setMateriales={setMateriales} 
            add={buscarMaterial(datos.materiales,buscar).length <= 0 && buscar !== "" ? true : false} 
            buscar={buscar} 
            setBuscar={setBuscar}
            />
            
            <div className="nuevas_materiales-paszamine" >
                {buscarMaterial(datos.materiales,buscar).length > 0 ?
                    <BuscarMaterial setBuscar={setBuscar} materiales={buscarMaterial(datos.materiales,buscar)} materialesR={materiales} setMateriales={setMateriales}/>
                : null}
            </div>
            <div className="materiales_paszamine">
                {datos.buscarMateriales(materiales).map(e => (
                    <div className="material_paszamine">
                        <span  onClick={()=>{setMateriales(borrarMaterial(e.id))}} id="borrar_span" class="material-symbols-rounded">
                            cancel
                        </span>
                        <h3>
                            {e.name}
                        </h3>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );

    function borrarMaterial(id) {
        let newmateriales = [];
        materiales.forEach(element => {
            if(element !== id) newmateriales.push(element);
        });
        return newmateriales;
    }

    function buscarMaterial(materiales_ = [],name = "") {
        let newmateriales = [];
        if(name !== "") {
            materiales_.forEach(e => {
                let t = true;
                datos.buscarMateriales(materiales).forEach(ee => {
                    if(ee.id === e.id) t = false;
                })
                if(e.name.toLowerCase().includes(name.toLowerCase())&&t) newmateriales.push(e);
            })
        }

        
        return newmateriales;
    }
}

export default AnadirMateriales;
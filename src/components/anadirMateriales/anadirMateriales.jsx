import "./css/anadirMateriales.css";
import appContext from "../../contexts/app";
import BuscarMaterial from "./BuscarMaterial";
import { useContext ,useState} from "react";
import Search from "./Search";
import {host,Datos} from "../librerias.js"
import axios from "axios";
function AnadirMateriales({materiales,setMateriales}) {
    const {datos,setLoading,setDatos} = useContext(appContext);
    const [buscar,setBuscar] = useState("");
    return(
        <div className="anadir-materiales-paszamine">
            
            <Search materialesR={materiales} 
            setMateriales={setMateriales} 
            add={buscarMaterial(datos.materiales,buscar).length <= 0 && buscar !== "" ? true : false} 
            buscar={buscar} 
            setBuscar={setBuscar}
            agragarMaterial={agragarMaterial}
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

    function anadirMaterial(material) {
        let newmateriales = materiales;
        newmateriales.push(material.id);
        return newmateriales;
    }

    function agragarMaterial() {
        setLoading(true);
        let formdata = new FormData();
        formdata.append("newmaterial",JSON.stringify([{id:datos.materiales.length,name:buscar.charAt(0).toUpperCase() + buscar.slice(1)}]))
        axios.post(`${host}/guardar_materiales`,formdata).then((r)=> {
            if(r) {
                setLoading(false);
                let newdatos = new Datos();
                newdatos.materiales = r.data.materiales;
                newdatos.mydata = datos.mydata;
                newdatos.recetas = datos.recetas;
                let newmaterial = r.data.newMateriales[0];
                setDatos(newdatos);
                setMateriales(anadirMaterial(newmaterial));
                setBuscar("");
            }
        })
    }
}

export default AnadirMateriales;
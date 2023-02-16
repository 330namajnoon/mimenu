import "./css/materiales.css";
import { useState,useContext } from "react";
import appContext from "../../../contexts/app";
import AnadirMateriales from "../../anadirMateriales/anadirMateriales";
function Materiales({datos}) {
    const{guardarMisMateriales,setLoading} = useContext(appContext);
    const [materiales,setMateriales] = useState(datos.mydata.materiales);
    return(
        <div className="mismateriales_paszamine">

            <h1 className="pagename">Materiales</h1>
            <div className="materiales_paszamine_">

            <AnadirMateriales materiales={materiales} setMateriales={setMateriales} />
            </div>
            <input onClick={()=> {
                setLoading(true);
                setTimeout(()=> {
                    guardarMisMateriales(materiales);
                },2000);
                
            }} type="button" value={"Guardar"} />
        </div>
    );
}

export default Materiales;
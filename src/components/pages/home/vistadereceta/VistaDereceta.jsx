import "../../../../css/vistadereceta.css";
import HomeContext from "../../../../contexts/homeContext";
import { useContext } from "react";

function VistaDereceta({vistaR}) {
    const {visitarReceta} = useContext(HomeContext);
    return(
        <div onClick={()=> {visitarReceta(false,{})}} className="paszamine">
           
        </div>
    );

}

export default VistaDereceta;
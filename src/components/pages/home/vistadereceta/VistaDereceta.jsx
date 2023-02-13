import "../../../../css/vistadereceta.css";
import HomeContext from "../../../../contexts/homeContext";
import AppContext from "../../../../contexts/app";
import { useContext } from "react";

function VistaDereceta({datos}) {
    const {visitarReceta} = useContext(HomeContext);
    const appContext = useContext(AppContext);
    
    return(
        <div onClick={()=> {visitarReceta(false)}} className="paszamine">
           <div className="perfil-bcg">
                <img src={`./images/${datos.perfil.image}`} alt="" />
                <h1>{datos.perfil.username}</h1>
           </div>
           <div className="materiales-bcg">
                {appContext.datos.buscarMateriales(datos.comida.materiales).map(e => (
                    <div className="v-material-bcg">{e.name}</div>
                ))}
           </div>
           <div className="v-receta-bcg">
                 <h1>{datos.comida.name}</h1>
                 <div></div>
                 <p>{datos.comida.receta}</p>
           </div>
        </div>
    );

}



export default VistaDereceta;
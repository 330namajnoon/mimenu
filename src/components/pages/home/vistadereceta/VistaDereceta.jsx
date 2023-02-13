import "../../../../css/vistadereceta.css";
import HomeContext from "../../../../contexts/homeContext";
import AppContext from "../../../../contexts/app";
import { useContext,useEffect } from "react";

function VistaDereceta({datos}) {
    const {visitarReceta} = useContext(HomeContext);
    const appContext = useContext(AppContext);
    useEffect(()=> {
        appContext.like(appContext.datos.mydata.id,datos.comida.id,"visits");
    },[])
    return(
        <div  className="paszamine">
           <div className="perfil-bcg">
                <img src={`./images/${datos.perfil.image}`} alt="" />
                <h1>{datos.perfil.username}</h1>
             
           </div>
           <div className="materiales-bcg">
                {appContext.datos.buscarMateriales(datos.comida.materiales).map(e => (
                    <div style={appContext.datos.materialesQueTengo(e.id) ? {backgroundColor: "rgba(255, 255, 255, 0.377)"} : null} className="v-material-bcg">{e.name}</div>
                ))}
           </div>
           <div className="v-receta-bcg">
                 <h1>{datos.comida.name}</h1>
                 <div className="khat"></div>
                 <p>{datos.comida.receta}</p>
           </div>
                 <div className="visits-likess">
                    <div>
                        <span  onClick={()=> {visitarReceta(false)}} class="material-symbols-rounded">
                            visibility
                        </span>
                        <h6>{datos.comida.visits.length}</h6>
                        <span class="material-symbols-rounded">
                            favorite
                        </span>
                        <h6>{datos.comida.likes.length}</h6>
                  
                    </div>
                
                    <span style={appContext.datos.like(datos.comida.id) ? {color:"rgb(255, 0, 149)"} : null} onClick={appContext.datos.like(datos.comida.id) === false ? (e)=>{

                        appContext.like(appContext.datos.mydata.id,datos.comida.id,"likes");
                        console.log("salam")

                    } : null} id="like" class="material-symbols-rounded">

                        favorite

                    </span>
                </div>
        </div>
    );

}



export default VistaDereceta;
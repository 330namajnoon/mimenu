import "./css/anadirReceta.css";
import axios from "axios";
import { host } from "../../../../librerias";
import recetasContext from "../../../../contexts/recetaContext";
import appContext from "../../../../contexts/app";
import { useContext ,useRef,useState} from "react";
import AnadirMateriales from "../../../anadirMateriales/anadirMateriales";

function AnadirReceta({setAnadirreceta}) {
    const {recetaselectada,setRecetaSelectada} = useContext(recetasContext);
    const {guardarReceta,setLoading,datos} = useContext(appContext);
    const laoding = useRef(null);
    const [laodingDisplay,setL] = useState(false);
    const [materiales,setMateriales] = useState([]);
    const file = useRef(null);
    const image = useRef(null);
    const recetaa = useRef(null);
    const [nombredelacomida,setNombre] = useState("");
    
    return(
        <div  className="cambiarRecetas_paszamine">
            <span onClick={(e)=>{recetaselectada()}} class="material-symbols-rounded">
                keyboard_return     
            </span>
            <AnadirMateriales materiales={materiales} setMateriales={setMateriales}/>
            <div className="receta_paszamine">
                <div className="image_paszamine">
                    <input onChange={(e)=>{guardarImage(e.target.files[0])}} ref={file} style={{display:"none"}} type="file" />

                    <img ref={image} onClick={(e)=>{file.current.click()}} src={`./images/pulsar.jpg`} alt="" />
                    {
                        laodingDisplay ?  
                        <div className="laoding_paszamine">
                            <div ref={laoding}></div>
                        </div> : null
                    }
                   
                </div>
                <div className="dato_paszamine">
                    <h1>Nombre de la receta</h1>
                    <input  onChange={(e)=> {setNombre(e.target.value)}} type="text" value={nombredelacomida}/>
                </div>
                <div className="dato_paszamine">
                    <h1>Receta</h1>
                    <textarea ref={recetaa}></textarea>
                </div>
                <input onClick={(e)=> {setReceta()}} type="button" value={"Añadir"} />
            </div>
        </div>
    );

    function guardarImage(image_) {
        let filereder = new FileReader();
        filereder.addEventListener("load",()=> {
            image.current.src = filereder.result;
        })
        filereder.readAsDataURL(image_)
        
        setL(true);
        let l = 1;
        let timer = setInterval(() => {
            laoding.current.style.width = l + "%";
            if(l >= 100) clearInterval(timer);
            l++;
        }, 10);
    }

    function setReceta() {
        let newreceta = {perfil:datos.mydata,comida:{}};
        newreceta.comida.receta = recetaa.current.value;
        newreceta.comida.name = nombredelacomida;
        newreceta.comida.materiales = materiales;
        newreceta.comida.id = "";
        newreceta.comida.image = "";
        newreceta.comida.visits = [];
        newreceta.comida.likes = [];
        setLoading(true);
        setTimeout(()=>{
            setAnadirreceta(false);
            guardarReceta(newreceta,file.current.files[0]);
        },2000)
    }
}

export default AnadirReceta;
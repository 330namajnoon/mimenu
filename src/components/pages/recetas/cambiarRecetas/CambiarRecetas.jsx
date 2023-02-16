import "./css/cambiarRecetas.css";
import axios from "axios";
import { host } from "../../../../librerias";
import recetasContext from "../../../../contexts/recetaContext";
import appContext from "../../../../contexts/app";
import { useContext ,useRef,useState} from "react";
import AnadirMateriales from "../../../anadirMateriales/anadirMateriales";

function CambiarRecetas({receta}) {
    const {recetaselectada,setRecetaSelectada} = useContext(recetasContext);
    const {borrarReceta,guardarReceta,setLoading} = useContext(appContext);
    const laoding = useRef(null);
    const [laodingDisplay,setL] = useState(false);
    const [materiales,setMateriales] = useState(receta.comida.materiales);
    const file = useRef(null);
    const image = useRef(null);
    const recetaa = useRef(null);
    const [nombredelacomida,setNombre] = useState(receta.comida.name);
    
    return(
        <div  className="cambiarRecetas_paszamine">
            <span onClick={(e)=>{recetaselectada()}} class="material-symbols-rounded">
                keyboard_return     
            </span>
            <AnadirMateriales materiales={materiales} setMateriales={setMateriales}/>
            <div className="receta_paszamine">
                <div className="image_paszamine">
                    <input onChange={(e)=>{guardarImage(e.target.files[0])}} ref={file} style={{display:"none"}} type="file" />

                    <img ref={image} onClick={(e)=>{file.current.click()}} src={`./images/${receta.comida.image}`} alt="" />
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
                    <textarea ref={recetaa}>{receta.comida.receta}</textarea>
                </div>
                <input onClick={(e)=> {setReceta()}} type="button" value={"Guardar"} />
                <br />
                <input onClick={(e)=> {borrarreceta()}} type="button" value={"Borrar"} />
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

    function borrarreceta() {
        let newreceta = JSON.parse(JSON.stringify(receta));
        newreceta.comida.receta = recetaa.current.value;
        newreceta.comida.name = nombredelacomida;
        newreceta.comida.materiales = materiales;
        newreceta.display = false;
        setLoading(true);
        setTimeout(()=>{
            setRecetaSelectada(newreceta);
            borrarReceta(receta.comida.id);
        },2000)
    }

    function setReceta() {
        let newreceta = JSON.parse(JSON.stringify(receta));
        newreceta.comida.receta = recetaa.current.value;
        newreceta.comida.name = nombredelacomida;
        newreceta.comida.materiales = materiales;
        newreceta.display = false;
        setLoading(true);
        setTimeout(()=>{
            setRecetaSelectada(newreceta);
            guardarReceta(newreceta,file.current.files[0]);
        },2000)
    }
}

export default CambiarRecetas;
import "./css/cambiarRecetas.css";
import axios from "axios";
import { host } from "../../../../librerias";
import recetasContext from "../../../../contexts/recetaContext";
import appContext from "../../../../contexts/app";
import { useContext ,useRef,useState} from "react";
import AnadirMateriales from "../../../anadirMateriales/anadirMateriales";

function CambiarRecetas({receta}) {
    const {recetaselectada,setRecetaSelectada} = useContext(recetasContext);
    const {guardarReceta} = useContext(appContext);
    const laoding = useRef(null);
    const [laodingDisplay,setL] = useState(false);
    const [materiales,setMateriales] = useState(receta.comida.materiales);
    const file = useRef(null);
    const image = useRef(null);
    const recetaa = useRef(null);
    const nombredelacomida = useRef(null);
    
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
                    <input  ref={nombredelacomida} type="text" value={receta.comida.name}/>
                </div>
                <div className="dato_paszamine">
                    <h1>Receta</h1>
                    <textarea ref={recetaa}>{receta.comida.receta}</textarea>
                </div>
                <input onClick={(e)=> {setReceta()}} type="button" value={"Guardar"} />
            </div>
        </div>
    );

    function guardarImage(image_) {
        let imgn1 = image_.name;
        let imgn2 = imgn1.split(".");
        let newImageName = receta.comida.id + "." + imgn2[1];
        let filereder = new FileReader();
        filereder.addEventListener("load",()=> {
            image.current.src = filereder.result;
            console.log(image.current)
        })
        filereder.readAsDataURL(image_)
        let formdata = new FormData();
        formdata.append("image",image_);
        formdata.append("newName",newImageName);
        
        setL(true);
        axios.post(`${host}/guardar_image`,formdata,{
            onUploadProgress:(p)=> {
                laoding.current.style.width = (p.loaded/p.total*100)+ "%";
            }
        })
    }

    function setReceta() {
        let newreceta = JSON.parse(JSON.stringify(receta));
        newreceta.comida.receta = recetaa.current.value;
        newreceta.comida.name = nombredelacomida.current.value;
        newreceta.display = false;
        setRecetaSelectada(newreceta);
        guardarReceta(newreceta);
    }
}

export default CambiarRecetas;
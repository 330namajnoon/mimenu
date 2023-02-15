import "./css/cambiarRecetas.css";
import axios from "axios";
import { host } from "../../../../librerias";
import recetasContext from "../../../../contexts/recetaContext";
import appContext from "../../../../contexts/app";
import { useContext ,useRef} from "react";

function CambiarRecetas({receta}) {
    const {recetaselectada} = useContext(recetasContext);
    const {guardarReceta} = useContext(appContext);
    const file = useRef(null);
    const image = useRef(null);
    
    return(
        <div  className="cambiarRecetas_paszamine">
            <span onClick={(e)=>{recetaselectada()}} class="material-symbols-rounded">
                keyboard_return     
            </span>
            <div className="receta_paszamine">
                <div className="image_paszamine">
                    <input onChange={(e)=>{guardarImage(e.target.files[0])}} ref={file} style={{display:"none"}} type="file" />

                    <img ref={image} onClick={(e)=>{file.current.click()}} src={`./images/${receta.comida.image}`} alt="" />
                </div>
                <div className="dato_paszamine">
                    <h1>Nombre de la receta</h1>
                    <input type="text" value={receta.comida.name}/>
                </div>
                <div className="dato_paszamine">
                    <h1>Receta</h1>
                    <textarea >{receta.comida.receta}</textarea>
                </div>
                <input type="button" value={"Guardar"} />
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
        console.log(newImageName);
        axios.post(`${host}/guardar_image`,formdata,{
            onUploadProgress:(p)=> {
                console.log(p.loaded/p.total*100);
            }
        })
    }
}

export default CambiarRecetas;
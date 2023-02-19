import "./css/perfil.css";
import {likesAndVisits} from "../../librerias.js";
import { useState,useContext,useRef } from "react";
import appContext from "../../../contexts/app";
function Perfil({datos}) {
    const a = document.createElement("a");
    a.href = "./index.html";
    const {setLoading,guardarPerfil,height} = useContext(appContext);
    const [username,setUsername] = useState(datos.mydata.username);
    const [password,setPassword] = useState(datos.mydata.password);
    const [image,setImage] = useState("./images/"+datos.mydata.image);
    const file = useRef(null);
    const LV = likesAndVisits(datos.recetas,datos.mydata.id);
    return(
        <div    style={{height:`${height}px`}} className="perfil_paszamine">
            <h1 className="page_name">Perfil</h1>
            <div className="perfil_datos_paszamine">
                <input onChange={(e)=> {chengeImage(e.target.files[0])}} ref={file} type="file" />
                <img  onClick={()=> {file.current.click()}} src={image} alt="" />

                <div className="visits_likes_paszamine">
                    <span class="material-symbols-rounded">
                        visibility
                    </span>
                    <h6>{LV.visits}</h6>
                    <span class="material-symbols-rounded">
                        favorite
                    </span>
                    <h6>{LV.likes}</h6>
                </div>
                <input onChange={(e)=> {setUsername(e.target.value)}} type="text" value={username}/>
                <input onChange={(e)=> {setPassword(e.target.value)}} type="text" value={password}/>
            <input onClick={guardarDatos} type="button" value={"Guardar"} />
            <a onClick={()=> {
                let p = window.confirm("Estas segur@ ?");

                if(p) {
                    localStorage.removeItem("userData");
                    a.click();
                }

            }} href="javascript:;">Sigin out</a>
            </div>
        </div>
    );


    function chengeImage(image) {
        let filereder = new FileReader();
        filereder.addEventListener("load",()=> {
            setImage(filereder.result);
        })
        filereder.readAsDataURL(image);
    }

    function guardarDatos() {
        setLoading(true);
        let newdata = datos.mydata;
        newdata.username = username;
        newdata.password = password;
        guardarPerfil(newdata,file.current.files.length > 0 ? file.current.files[0] : false);
        setTimeout(()=> {
            let a = document.createElement("a");
            a.href = "./index.html";
            a.click();
        },2000)
    }
}

export default Perfil;
import "./css/comentarios.css";
import {Msg} from "../librerias";
import appContext from "../../contexts/app";
import { useState,useContext } from "react";
import Chatbox from "./Chatbox";
import Comentario from "./Comentario";
export default function Comentarios({setComentarios,comentarios}) {

    const {height,guardarComentario,setLoading,datos} = useContext(appContext);
    const [msg,setMsg] = useState("");
    const [load,setload] = useState(false);
   
    return(
        <div style={{minHeight:height+"px"}} className="comentarios_back">
            <Chatbox 
                msg={msg}
                setMsg={setMsg}
                send={send}
            />
            <div className="perfil_back">
                <span onClick={()=> {setComentarios(true,comentarios,false)}} class="material-symbols-rounded">
                    west
                </span>
                <div className="perfil">
                    <img src={`./images/${comentarios.comida.image}`} alt="" />
                    <h1>{comentarios.comida.name}</h1>
                </div>
            </div>
            <div className="comentarios">
                {comentarios.comida.comentarios.map(comentario => (
                    <Comentario comentario={comentario} id={datos.mydata.id}/>
                ))}
            </div>
        </div>
    );

    function send() {
        setLoading(true);
        guardarComentario(new Msg(datos.mydata,msg),comentarios.comida.id);
        setMsg("");
    }
}
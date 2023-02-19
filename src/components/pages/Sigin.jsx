import "../../css/sigin-login.css";
import {host,Users} from "../librerias.js";
import axios from "axios";
import { useRef,useState,useContext } from "react";
import appContext from "../../contexts/app";
function Sigin() {
    const a = document.createElement("a");
    a.href = "./index.html";
    const {pageChenge,setLoading,guardarPerfil} = useContext(appContext);
    const datosPaszamine = useRef(null);
    const file = useRef(null);
    const img = useRef(null);
    const [error,setError] = useState("");
    const [nombre,setNombre] = useState("");
    const [password,setPassword] = useState("");
    const [passwordR,setPasswordR] = useState("");
    function setPaszamine() {
        datosPaszamine.current.style.marginTop = ((window.innerHeight/2) - (datosPaszamine.current.getBoundingClientRect().height)) -50 +"px" ;
    }
    return(
        <div className="sigin-paszamine">
            <h1 className="page_name">SIGIN</h1>
            <div className="datos_paszamine">
                <p>{error}</p>
                <input ref={file} onChange={(e)=> {
                    let filereader = new FileReader();
                    filereader.addEventListener("load",()=> {
                        img.current.src = filereader.result;
                    })
                    filereader.readAsDataURL(e.target.files[0]);
                }} type="file" />
                <img onClick={()=> {file.current.click()}} ref={img} src="./images/pulsar.jpg" alt="" />
                <h6>Nombre de usuario</h6>
                <input onChange={(e)=> {setNombre(e.target.value)}} type="text" />
                <h6>Controseña</h6>
                <input  onChange={(e)=> {setPassword(e.target.value)}} type="password" />
                <h6>Repetir controseña</h6>
                <input  onChange={(e)=> {setPasswordR(e.target.value)}} type="password" />
            </div>
            <input  onClick={entrar} type="button" value={"Sigin"}/>
            <a onClick={()=> {pageChenge("login")}} href="javascript:;">LOGIN</a>
        </div>
    );

    function entrar() {
        let newuser = new Users();
        if(nombre === "" ) setError("Escribe tu nombre de usuario!") ;
        if(password === "") setError("Escribe tu controseña!") ;
        if(password !== passwordR) setError("Controseña no existe") ;
        if(file.current.files.length <= 0) setError("Elije una foto porfavor!")
        if(nombre !== "" && password !== "" && password === passwordR && file.current.files.length > 0) {
            newuser.username = nombre;
            newuser.password = password;
            newuser.id = "";
            setLoading(true);
            setTimeout(() => {
                guardarPerfil(newuser,file.current.files[0]);
            }, 2000);
        }
    }
}

export default Sigin;
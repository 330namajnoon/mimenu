import "../../css/sigin-login.css";
import {host} from "../../librerias.js";
import axios from "axios";
import { useRef,useState,useContext } from "react";
import appContext from "../../contexts/app";
function Login() {
    const a = document.createElement("a");
    a.href = "./index.html";
    const {pageChenge,setLoading} = useContext(appContext);
    const datosPaszamine = useRef(null);
    const [error,setError] = useState("");
    const [nombre,setNombre] = useState("");
    const [password,setPassword] = useState("");
    function setPaszamine() {
        datosPaszamine.current.style.marginTop = ((window.innerHeight/2) - (datosPaszamine.current.getBoundingClientRect().height)) -50 +"px" ;
    }
    return(
        <div className="Login_paszamine">
            <h1 className="page_name">LOGIN</h1>

            <div ref={datosPaszamine} className="datos_paszamine">
                <p>{error}</p>
                <h6>Nombre de usuario</h6>
                <input onChange={(e)=> {setNombre(e.target.value)}} type="text" />
                <h6>Controseña</h6>
                <input onChange={(e)=> {setPassword(e.target.value)}} type="password" />
            </div>
            <input onClick={entrar} type="button" value={"Login"} />
            <a onClick={()=> {pageChenge("sigin")}} href="javascript:;">SIGIN</a>
            {setTimeout(setPaszamine,1)}
        </div>
    );

    function entrar() {
        if(nombre === "" ) setError("Escribe tu nombre de usuario!") ;
        if(password === "") setError("Escribe tu controseña!") ;
        if(nombre !== "" && password !== "") {
            setLoading(true);
            let formdata = new FormData();
            formdata.append("username",nombre);
            formdata.append("password",password);
            setTimeout(() => {
                axios.post(`${host}/login`,formdata).then((r)=> {
                    setLoading("false");
                    if(r.data !== null) {
                        let mydata = {
                            id: r.data.id,
                            login: true
                        }
                        localStorage.setItem("userData",JSON.stringify(mydata));
                        a.click();
                    }else {
                        setLoading(false);
                        setError("Estos datos no existen!")
                    }
                })
            }, 2000);
        }
    }
}

export default Login;
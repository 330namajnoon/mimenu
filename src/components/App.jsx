import { useState,useEffect } from "react";
import Sigin from "./pages/Sigin";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import Receta from "./pages/recetas/Receta";
import Materiales from "./pages/materiales/Materiales";
import Perfil from "./pages/perfil/Perfil"
import {Datos,host} from "../librerias";
import Menu from "./menu/Menu";
import AppContext from "../contexts/app";
import "../css/app.css";
import axios from "axios";

function App() {
 
  const [datos,setDatos] = useState(new Datos());
  const pages = {
    sigin: {
      name: "sigin",
      tag: <Sigin/>
    },
    login: {
      name: "login",
      tag: <Login/>
    },
    home: {
      name: "home",
      tag: <Home datos={datos}/>
    },
    receta: {
      name: "receta",
      tag: <Receta/>
    },
    materiales: {
      name: "materiales",
      tag: <Materiales />
    }, 
    perfil: {
      name: "perfil",
      tag: <Perfil/>
    }, 
  }
  const [page,setPage] = useState(pages.home);
  const [loading,setLoading] = useState(false);
  async function httpRequest(method,url,data = {id:""}) {
    const headers = {
    'Content-Type': 'application/json'
    };
    const respuest = await axios({
      method,
      url,

      data,
      onDownloadProgress:(p)=> {
          if((p.loaded/p.total*100) === 100) setLoading(false);
      }
    })
    
    return respuest.data;
  }

  function like(myid,id,method) {
      httpRequest("post",`${host}/like`,{myid:myid,id:id,method:method}).then((r)=>{
        let newdatos = new Datos();
        newdatos.materiales = datos.materiales;
        newdatos.mydata = r.mydata ? r.mydata : datos.mydata;
        newdatos.recetas = r.recetas;
        setDatos(newdatos);
      })
  }

  function guardarMisMateriales(materiales = []) {
    let formdata = new FormData();
    formdata.append("userId",datos.mydata.id);
    formdata.append("materiales",JSON.stringify(materiales));
    axios.post(`${host}/guardar_user`,formdata).then((r)=> {
      setLoading(false);
      let newdatos = new Datos();
      newdatos.materiales = datos.materiales;
      newdatos.mydata = r.data;
      newdatos.recetas = datos.recetas;
      setDatos(newdatos);
      pageChenge("home");
    })
  }

  function guardarReceta(receta = {},file) {
    let formdata = new FormData();
      if(file) {
        formdata.append("image",file);
      }
      formdata.append("receta",JSON.stringify(receta));
      axios.post(file ? `${host}/guardar_receta_I` : `${host}/guardar_receta`,formdata,{
          onDownloadProgress:(p)=> {
            if((p.loaded/p.total*100) === 100) setLoading(false);
          }
      }).then((r)=> {
        let newdatos = new Datos();
        newdatos.materiales = datos.materiales;
        newdatos.mydata = datos.mydata;
        newdatos.recetas = r.data;
        setDatos(newdatos);
      })
  }

  function borrarReceta(id) {
      let formdata = new FormData();
      formdata.append("id",id);
      axios.post(`${host}/borrar_receta`,formdata).then((r)=> {
        setLoading(false);
        let newdatos = new Datos();
        newdatos.materiales = datos.materiales;
        newdatos.mydata = datos.mydata;
        newdatos.recetas = r.data;
        setDatos(newdatos);
      })
  }

  function guardarPerfil(mydata,image) {
    let formdata = new FormData();
    formdata.append("mydata",JSON.stringify(mydata));
    formdata.append("image",image? image : "false");
    axios.post(`${host}/guardar_perfil`,formdata).then((r)=> {
      setLoading(false);
      let newdatos = new Datos();
      newdatos.materiales = datos.materiales;
      newdatos.mydata = r.data;
      newdatos.recetas = datos.recetas;
      setDatos(newdatos);
    })
  }

  
  
  useEffect(()=> {
      if(localStorage.getItem("userData") !== null) {

        httpRequest("post",`${host}/descargar-materiales`,{id:"sina"}).then((r )=>{
            datos.materiales = r;
            httpRequest("post",`${host}/descargar-datos-usuarios`,{id:JSON.parse(localStorage.getItem("userData")).id}).then((r)=>{
                datos.mydata = r;
                httpRequest("post",`${host}/descargar-recetas`,{id:"sina"}).then((r)=>{
                    let newdatos = new Datos();
                    newdatos.materiales = datos.materiales;
                    newdatos.mydata = datos.mydata;
                    newdatos.recetas = r;
                    setDatos(newdatos);
              
                })
            })
        })
      }
    
  },[]);

function pageChenge(pagename) {
  setPage(pages[pagename]);
}
  
 
  return (
    <AppContext.Provider value={{guardarPerfil,guardarMisMateriales,borrarReceta,httpRequest,page,pageChenge,datos,like,guardarReceta,setLoading}} >
      <div className="App">
        {loading ? 
          <img style={{top:`${((window.innerHeight/2)-((window.innerWidth/100)*40)/2)}px`}} className="loading_gif" src="./images/loading.gif" alt="" /> : null
        }
        {/* <Openai/> */}
        
        {page.name === "home" ? <Home datos={datos} /> : null }
        {page.name === "receta" ? <Receta datos={datos} /> : null }
        {page.name === "materiales" ? <Materiales datos={datos} /> : null }
        {page.name === "perfil" ? <Perfil datos={datos} /> : null }
        {page.name === "login" ? <Login  /> : null }
        {page.name === "sigin" ? <Sigin  /> : null }
        {/* {page.tag} */}
        {localStorage.getItem("userData") !== null ? <Menu/> : null}
      </div>
    </AppContext.Provider>

);




}

export default App;

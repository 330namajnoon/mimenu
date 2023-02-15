import { useState,useEffect } from "react";
import Openai from "./openai";
import Sigin from "./pages/Sigin";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import Receta from "./pages/recetas/Receta";
import List from "./pages/List";
import Perfil from "./pages/Perfil";
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
    list: {
      name: "list",
      tag: <List/>
    }, 
    perfil: {
      name: "perfil",
      tag: <Perfil/>
    }, 
  }
  async function httpRequest(method,url,data = {id:""}) {
    const headers = {
    'Content-Type': 'application/json'
    };
    const respuest = await axios({
      method,
      url,

      data,
      onDownloadProgress:(p)=> {
        
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

  function guardarReceta(receta = {}) {
      httpRequest("post",`${host}/guardar_receta`).then((r)=> {
          let newdatos = new Datos();
          newdatos.materiales = datos.materiales;
          newdatos.mydata = datos.mydata;
          newdatos.recetas = r;
          setDatos(newdatos);
      })
  }
  
  useEffect(()=> {
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
    
  },[]);
  
  const [page,setPage] = useState(pages.home);
  return (
    <AppContext.Provider value={{httpRequest,page,pageChenge,datos,like,guardarReceta}} >
      <div className="App">
        {/* <Openai/> */}
  
        {page.name === "home" ? <Home datos={datos} /> : null }
        {page.name === "receta" ? <Receta datos={datos} /> : null }
        {page.name === "list" ? <List datos={datos} /> : null }
        {page.name === "perfil" ? <Perfil datos={datos} /> : null }
        {/* {page.tag} */}
       
        <Menu/>
      </div>
    </AppContext.Provider>

);

function pageChenge(pagename) {
    setPage(pages[pagename]);
}


}

export default App;

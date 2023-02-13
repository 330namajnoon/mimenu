import { useState,useEffect } from "react";
import Openai from "./openai";
import Sigin from "./pages/Sigin";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import Receta from "./pages/Receta";
import List from "./pages/List";
import Perfil from "./pages/Perfil";
import {Datos,httpRequest} from "../librerias";
import Menu from "./menu/Menu";
import AppContext from "../contexts/app";
import "../css/app.css";

function App() {
  const [datos,setData] = useState(new Datos());
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
      tag: <Home/>
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

  function descargarMateriales() {
    let http = new XMLHttpRequest();
    http.open("POST","http://localhost:4000/descargar-materiales",true);
    http.onreadystatechange = function() {
        if(http.status === 200 && http.readyState === 4) {
            
            datos.materiales = JSON.parse(http.responseText);

        }
    }
    http.send();
  }
  function descargarDatosUsuarios() {
    let formdata = new FormData();
    formdata.append("id",JSON.parse(localStorage.getItem("userData")).id);
    let http = new XMLHttpRequest();
    http.open("POST","http://localhost:4000/descargar-datos-usuarios",true);
    http.onreadystatechange = function() {
        if(http.status === 200 && http.readyState === 4) {
            datos.mydata = JSON.parse(http.responseText);
           
        }
    }
    http.send(formdata);
  }
  function descargarRecetas() {
    let http = new XMLHttpRequest();
    http.open("POST","http://localhost:4000/descargar-recetas",true);
    http.onreadystatechange = function() {
        if(http.status === 200 && http.readyState === 4) {
          datos.recetas = JSON.parse(http.responseText);
        }
    }
    http.send();
  }
  
 

  useEffect(()=> {
      descargarMateriales(); 
      descargarDatosUsuarios();
      descargarRecetas();
      let timer = setInterval(()=> {
        if(datos.materiales.length > 0 && datos.recetas.length > 0 && datos.mydata !== false) {
          let newdata = JSON.parse(JSON.stringify(datos));
          setData(newdata);
          console.log(newdata);
          clearInterval(timer);
        }
      },100);
     
      // descargarDatosUsuarios();
      // descargarRecetas();
  },[]);
  
  const [page,setPage] = useState(pages.home);
  return (
    <AppContext.Provider value={{page,pageChenge,datos}} >
      <div className="App">
        {/* <Openai/> */}
        {console.log(datos)}
        {page.tag}
        <Menu/>
      </div>
    </AppContext.Provider>

);

function pageChenge(pagename) {
    setPage(pages[pagename]);
}


}

export default App;

import { useState,useEffect } from "react";
import Openai from "./openai";
import Sigin from "./pages/Sigin";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import Receta from "./pages/Receta";
import List from "./pages/List";
import Perfil from "./pages/Perfil";
import {Datos} from "../librerias";
import Menu from "./menu/Menu";
import AppContext from "../contexts/app";
import "../css/app.css";

function App() {
  const datos = new Datos();
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
  
  function matDownload() {
    let formdata = new FormData();
    formdata.append("id",JSON.parse(localStorage.getItem("userData")).id);
    let http = new XMLHttpRequest();
    http.open("POST","http://localhost:4000/dascargar-materiales",true);
    http.onreadystatechange = function() {
      if(http.status === 200 && http.readyState === 4) {
        let newdata = JSON.parse(http.responseText);
        datos.materiales = newdata.materiales;
        datos.mydata = newdata.mydata;
        console.log(datos);
      }
    }
    http.send(formdata);
  }

  useEffect(matDownload,[]);
  
  const [page,setPage] = useState(pages.home);
  return (
    <AppContext.Provider value={{page,pageChenge,datos}} >
      <div className="App">
        {/* <Openai/> */}
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

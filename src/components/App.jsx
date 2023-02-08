import { useState } from "react";
import Openai from "./openai";
import Sigin from "./pages/Sigin";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Receta from "./pages/Receta";
import List from "./pages/List";
import Perfil from "./pages/Perfil";
import Menu from "./menu/Menu";
import AppContext from "../contexts/app";
import "../css/app.css";
function App() {
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
  function entrar() {
      let l1 = localStorage.getItem("sigin");
      let l2 = localStorage.getItem("login");
      let s1 = sessionStorage.getItem("sigin");
      let s2 = sessionStorage.getItem("login");

      if(l1 || s1 && l2 || s2) {
        return "login";
      }else {
        return "sigin";
      }
  }
  const [page,setPage] = useState(entrar() == "sigin" || entrar() == "login" ? pages[entrar()] : pages.home);
  return (
    <AppContext.Provider value={{page,pageChenge}} >
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

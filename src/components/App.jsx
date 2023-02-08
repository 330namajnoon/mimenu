import { useState } from "react";
import Openai from "./openai";
import Sigin from "./pages/Sigin";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
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
  
  const [page,setPage] = useState(pages.home);
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

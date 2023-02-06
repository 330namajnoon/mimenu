import { useState } from "react";
import Openai from "./openai";
import Home from "./pages/Home";
import Menu from "./menu/Menu";

import "../css/app.css";
function App() {
 
  return (
    <div className="App">
       <Openai/>
      <Home/>
      <Menu/>
    </div>

);


}

export default App;

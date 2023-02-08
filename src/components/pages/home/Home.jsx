
import "../../../css/home.css";
import Serch from "./Serch";
import Comidas from "./Comidas";
function Home() {
    const comidas = ["comida-pishfarz.png","comida-pishfarz.png","comida-pishfarz.png","comida-pishfarz.png","comida-pishfarz.png","comida-pishfarz.png","comida-pishfarz.png","comida-pishfarz.png","comida-pishfarz.png"];
    return(
        <div  className="home-paszamine">
            <h1 className="menudehoy">Menu de hoy</h1>
            <Serch/>
            <h1 className="titles">Sugestiones de ingredientes</h1>
            <Comidas comidas={comidas}/>
            <h1 className="titles">Mis comidas</h1>
            <Comidas comidas={comidas}/>
            <h1 className="titles">Comidas compartidas</h1>
            <Comidas comidas={comidas}/>
        </div>
    );
}

export default Home
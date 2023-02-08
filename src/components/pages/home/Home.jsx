
import "../../../css/home.css"
import Serch from "./Serch";
import Comida from "./Comida";
function Home() {
    return(
        <div  className="home-paszamine">
            <h1 className="menudehoy">Menu de hoy</h1>
            <Serch/>
            <h1 className="titles">Sugestiones de ingredientes</h1>
            <div className="recetas-bcg">
                <Comida/>
                <Comida/>
                <Comida/>
                <Comida/>
                <Comida/>
                <Comida/>
                <Comida/>
            </div>
            <h1 className="titles">Mis comidas</h1>
            <div className="recetas-bcg">

            </div>
            <h1 className="titles">Comidas compartidas</h1>
            <div className="recetas-bcg">

            </div>
        </div>
    );
}

export default Home
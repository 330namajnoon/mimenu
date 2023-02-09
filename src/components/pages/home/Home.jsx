
import "../../../css/home.css";
import Serch from "./Serch";
import Comidas from "./Comidas";
function Home() {
    const receta = {
        perfil: {
            username: "Sina",
            id: "abcd123",
            image: "sina.png"
        },
        comida: {
            name: "tortia de patata",
            material: [15,18,20,25],
            receta: "ilk once patateslerimizi pisirir ve ondansonra iyice ezmemiz lazim ondansonra 3 tane yumurtamizi eklememiz lazim ve karistirip yarim saaat firinda 200derece ile pisircez ,afiyet olsun",
            image: "comida-pishfarz.png"
        }
    }
    const sdiComidas = [receta,receta,receta];
    const misComidas = [];
    const comidasPublicadas = [];
    return(
        <div  className="home-paszamine">
            <h1 className="menudehoy">Menu de hoy</h1>
            <Serch/>
            {sdiComidas.length > 0 ? <Comidas comidas={sdiComidas} titel="Sugestiones de ingredientes"/> : null}
            {misComidas.length > 0 ? <Comidas comidas={misComidas} titel="Mis comidas"/> : null}
            {comidasPublicadas.length > 0 ? <Comidas comidas={comidasPublicadas} titel="Comidas compartidas"/> : null}
        </div>
    );
}

export default Home
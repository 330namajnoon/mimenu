import "../../../css/home.css";

function Comida({receta}) {
    return(
        <div style={{backgroundImage: `url(./images/${receta.comida.image})`}} className="receta-bcg">
            <h1 className="nombredecomida">{receta.comida.name}</h1>
        </div>
    );
}

export default Comida;
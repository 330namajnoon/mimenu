import "../../../css/home.css";

function Comida({image}) {
    return(
        <div style={{backgroundImage: `url(./images/${image})`}} className="receta-bcg">

        </div>
    );
}

export default Comida;
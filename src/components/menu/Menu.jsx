import "../../css/menu.css"
import Opcion from "./Opcion";
function Menu() {
    return(
        <div style={{top: `${window.innerHeight-80}px`}} className="menu-paszamine">
            <Opcion  name="home" icon="home"/>
            <Opcion name="receta" icon="post_add"/>
            <Opcion name="list" icon="receipt_long" />
            <Opcion name="perfil" icon="account_circle"/>
        </div>
    );
}

export default Menu
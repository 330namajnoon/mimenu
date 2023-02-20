import "../../css/menu.css"
import Opcion from "./Opcion";
import appContext from "../../contexts/app";
import { useContext } from "react";
function Menu() {
    const {height} = useContext(appContext);
    return(
        <div style={{top: `${height-80}px`}} className="menu-paszamine">
            <Opcion  name="home" icon="home"/>
            <Opcion name="receta" icon="post_add"/>
            <Opcion name="materiales" icon="receipt_long" />
            <Opcion name="perfil" icon="account_circle"/>
        </div>
    );
}

export default Menu
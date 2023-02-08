import { useContext } from "react";
import AppContext from "../../contexts/app";
function Opcion({name,icon}) {
    const appContext = useContext(AppContext);
    return(
        <div onClick={()=> {appContext.pageChenge(name)}}  style={name == appContext.page.name ? {backdropFilter:"blur(20px)",boxShadow:"-.7px -.7px  1px rgb(0, 119, 255)",marginBottom:"45px",padding:"25px",backgroundColor: "rgba(255, 255, 255, 0.3)",borderRadius:"40px"} : null} className="m-o-paszamine">
            <span id="m-o-icon" class="material-symbols-rounded">
                {icon}
            </span>
        </div>
    );
}

export default Opcion
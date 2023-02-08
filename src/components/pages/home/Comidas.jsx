import "../../../css/home.css";

import Comida from "./Comida";
import { useRef,useState,useEffect } from "react";
function Comidas({comidas}) {
   
    const paszamine = useRef(null);
    const [scrollValue,setScroolValue] = useState({});
    useEffect(()=>{
        let scrollv = {
            tv: 0,
            t: comidas.length,
            ta: 0
        }
        setScroolValue(scrollv);
    },[])
    // let scrollValue = 0;
    return(
        <>
            <h1 onClick={()=>{scrullSet("i")}}>salam</h1>
        <div  style={{transition: "all 1s"}} onClick={()=>{scrullSet("d")}} ref={paszamine} className="recetas-bcg">
            {comidas.map(e =>(
                <Comida  image={e}/>
            ))}    
        </div>
        </>
    );

    function scrullSet(value) {
        if(value == "d" && scrollValue.ta < scrollValue.t) {
            let scrollv = {
                tv: scrollValue.tv + 105,
                t: Number(comidas.length),
                ta: scrollValue.ta + 1
            }

            setScroolValue(scrollv);
            paszamine.current.scrollLeft = scrollv.tv;
            console.log(scrollv.t)
        }
        if(value == "i" && scrollValue.ta > 0) {

            let scrollv = {
                tv: scrollValue.tv - 105,
                t: comidas.length,
                ta: scrollValue.ta - 1
            }
    
            setScroolValue(scrollv);
            paszamine.current.scrollLeft = scrollv.tv;
            console.log(scrollv.ta)
        }

       

       
    }

}

export default Comidas;
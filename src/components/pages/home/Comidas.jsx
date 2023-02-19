import "../../../css/home.css";

import Comida from "./Comida";
import { useRef,useState,useEffect } from "react";
function Comidas({comidas,titel}) {
    function length(t,width) {
        let t1 = Math.floor(window.innerWidth / width);
        let t2 = t - t1;
        return t2;
    }
    const paszamine = useRef(null);
    const d = useRef(null);
    const i = useRef(null);
    const [scrollValue,setScroolValue] = useState({});
    useEffect(()=>{
        let scrollv = {
            tv: 0,
            t: length(comidas.length,110),
            ta: 0
        }
        setScroolValue(scrollv);
    },[])
    // let scrollValue = 0;
    return(
        <>
        <h1 className="titles">{titel}</h1>
        <div onTouchStart={()=>{
                // d.current.style.display = "none";
                // i.current.style.display = "none";
            }} onTouchEnd={()=> {
                // d.current.style.display = "flex";
                // i.current.style.display = "flex";
                // let scrollv = JSON.parse(JSON.stringify(scrollValue));
                // scrollv.tv = paszamine.current.scrollLeft;
                // setScroolValue(scrollv);
            }} style={{transition: "all 1s"}}  ref={paszamine} className="recetas-bcg">
            
            {comidas.map(e =>(
                <Comida  receta={e}/>
            ))} 

            <div style={{minWidth:"200px",height:"95%"}}></div>  

            {/* <span ref={i} style={{left:`${15}px`}} id="i" onClick={()=>{scrullSet("i",4)}} class="material-symbols-rounded">
                arrow_circle_left
            </span>
            <span ref={d} style={{left:`${window.innerWidth - 40}px`}} id="d" onClick={()=>{scrullSet("d",4)}} class="material-symbols-rounded">
                arrow_circle_right
            </span>  */}

        </div>
        </> 
    
    );

    function scrullSet(value,s) {
        if(value === "d" && scrollValue.ta < scrollValue.t) {
            let scrollv = {
                tv: scrollValue.tv + 105,
                t: length(comidas.length,110),
                ta: scrollValue.ta + 1
            }

            setScroolValue(scrollv);
       

            let t = setInterval(() => {
                paszamine.current.scrollLeft += s;
                if(paszamine.current.scrollLeft >= scrollv.tv) {
                    clearInterval(t);
                }
            }, 10);
        }
        if(value === "i" && scrollValue.ta > 0) {
            let scrollv = {
                tv: scrollValue.tv - 105,
                t: length(comidas.length,110),
                ta: scrollValue.ta - 1
            }
            setScroolValue(scrollv);
            let t = setInterval(() => {
                paszamine.current.scrollLeft -= s;
                if(paszamine.current.scrollLeft <= scrollv.tv) {
                    clearInterval(t);
                }
            }, 10);
        }
    }
}

export default Comidas;
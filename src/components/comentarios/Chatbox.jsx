import { useState } from "react";
import "./css/chatbox.css"

export default function Chatbox({msg,setMsg,send}) {
    window.addEventListener("resize",()=> {
        setHeight(window.innerHeight);
    })
    const [height,setHeight] = useState(window.innerHeight);
    return(
        <div style={{top:(height-40)+"px"}} className="chatbox_back">
            <input onChange={(e)=> {setMsg(e.target.value)}} placeholder="Cometario" type="text" value={msg}  />
            <span onClick={send} class="material-symbols-rounded">
                send
            </span>
        </div>
    );
}


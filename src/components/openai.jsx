import { useState,useEffect,useRef } from "react";
import { OpenAIApi ,Configuration } from "openai";

function Openai() {
  const a = useRef(null);  
  const configuration = new Configuration({
    apiKey: `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`
  })
  const openai = new OpenAIApi(configuration);
  const [text,setText] = useState("");
  return (
    <div className="App">
       
        <input onChange={(e)=>{setText(e.target.value)}} type="text" />
        <input onClick={image} type="button" value={"Enviar"} />
    </div>

);
async function  image() {
  const response = await openai.createImage({
    prompt: text,
    n: 1,
    size: "1024x1024",
  });

  console.log(response.data.data[0].url);
  window.open(response.data.data[0].url)
  
}

}

export default Openai;

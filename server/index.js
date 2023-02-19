// import axios from "./node_modules/axios/index.ts";

let materiales = document.getElementById("materiales");
let guardarMaterialesButton = document.getElementById("guardarMateriales")

guardarMaterialesButton.addEventListener("click",(e)=> {
    materiales.value = "";
    console.log(JSON.parse(materiales.value));
    let formdata = new FormData()
    formdata.append("materiales",materiales.value);
    let http = new XMLHttpRequest();
    http.open("POST","/guardar_materiales",true);
    http.onreadystatechange = function() {
        if(http.status === 200 && http.readyState == 4) {
            alert("Se ha guardado");
        }
    }
    http.send(formdata);
   

})
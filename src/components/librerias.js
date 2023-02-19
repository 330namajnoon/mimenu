const host = "http://localhost:4000";
// const host = "";

function Datos() {
    this.materiales = [];
    this.mydata = false;
    this.recetas = [];
}
function buscarMisDatos(users = [],id) {
    let mydata;
    users.forEach(e => {
        if(e.id === id) mydata = e;
    })

    if (mydata) {
        return mydata;
    }else {
        return "error";
    }
}
Datos.prototype.buscarMateriales = function(ids = []) {
    let materiales = [];
    ids.forEach(e => {
        this.materiales.forEach(ee => {
            if(ee.id === e) {
                materiales.push(ee);
            }
        })
    })

    return materiales;
}
Datos.prototype.materialesQueTengo = function(id) {
    let t = false;
    this.mydata.materiales.forEach(e => {
        if(e === id) t = true;
    })
    return t;
}
Datos.prototype.like = function(id) {
    let res = false;
        this.mydata.ultimasComidas.forEach(eee => {
            if(eee === id ) res = true;
        })
    return res;
}

Datos.prototype.sugestionesIngredientes = function(recetas) {
    function notas(receta,recetas,materiales,mydata) {
        let notaDeMateriales = 0;
        let nodaDeTiempo = 0;
        let notaDeVisitas = 0;
        let notaDeLikes = 0;
        let ndmt = 1;
        receta.comida.materiales.forEach(r => {
            mydata.materiales.forEach(m => {
                if(r === m) ndmt++;
            })
        })
        notaDeMateriales = Math.floor((ndmt * (25/receta.comida.materiales.length))); 
    
        let ndtt = 0;
        let ndttt = true;
        for (let index = mydata.ultimasComidas.length-1; index >= 0; index--) {
            if(ndttt) ndtt++;
            if(mydata.ultimasComidas[index] === receta.comida.id) ndttt = false;
        }
        nodaDeTiempo = Math.floor((ndtt * (25 / recetas.length)));

        let maxv = 0;
        recetas.forEach(r => {
            if(r.comida.visits.length > maxv) maxv = r.comida.visits.length;
        })
        notaDeVisitas = Math.floor((receta.comida.visits.length * (25 / maxv)));

        let maxvl = 0;
        recetas.forEach(r => {
            if(r.comida.likes.length > maxvl) maxvl = r.comida.likes.length;
        })
        notaDeLikes = Math.floor((receta.comida.likes.length * (25 / maxvl)));

        return notaDeMateriales+nodaDeTiempo;
    }

    let newrecetas = recetas;

        for (let index = 0; index < newrecetas.length; index++) {
                newrecetas[index].punto = notas(newrecetas[index],this.recetas,this.materiales,this.mydata);
        }

        function max_min(materiales = [{punto: 0}]) {
            let newmateriales = Array(materiales.length);
            for (let index = 0; index < newmateriales.length; index++) {
                newmateriales[index] = undefined;
            }
  
            for (let index1 = 0; index1 < materiales.length; index1++) {
                let t = 0;
                for (let index2 = 0; index2 < materiales.length; index2++) {
                    if(index1 !== index2 && materiales[index1].punto < materiales[index2].punto) t++;
                  
                }
  
                while(newmateriales[t] !== undefined) t++;
  
                newmateriales[t] = materiales[index1];
                
            } 
  
            return newmateriales;
        }

       
        return max_min(newrecetas);



}

Datos.prototype.misComidas = function(recetas = []) {
    function notas(receta,recetas,materiales,mydata) {
        let notaDeMateriales = 0;
        let nodaDeTiempo = 0;
        let notaDeVisitas = 0;
        let notaDeLikes = 0;
        let ndmt = -1;
        receta.comida.materiales.forEach(r => {
            mydata.materiales.forEach(m => {
                if(r === m) ndmt++;
            })
        })
        notaDeMateriales = Math.floor((ndmt * (25/receta.comida.materiales.length))); 
    
        let ndtt = 0;
        let ndttt = true;
        for (let index = mydata.ultimasComidas.length-1; index >= 0; index--) {
            if(ndttt) ndtt++;
            if(mydata.ultimasComidas[index] === receta.comida.id) ndttt = false;
        }
        nodaDeTiempo = Math.floor((ndtt * (25 / recetas.length)));
    
        let maxv = 0;
        recetas.forEach(r => {
            if(r.comida.visits.length > maxv) maxv = r.comida.visits.length;
        })
        notaDeVisitas = Math.floor((receta.comida.visits.length * (25 / maxv)));
    
        let maxvl = 0;
        recetas.forEach(r => {
            if(r.comida.likes.length > maxvl) maxvl = r.comida.likes.length;
        })
        notaDeLikes = Math.floor((receta.comida.likes.length * (25 / maxvl)));
        return notaDeMateriales+nodaDeTiempo+notaDeVisitas+notaDeLikes;
       }

       let miscomidas = [];
       
       if(recetas !== false)recetas.forEach(e => {
            if(e.perfil.id === this.mydata.id) miscomidas.push(e);
       })
    
       let newrecetas = miscomidas;
       
    
       newrecetas.forEach(r => {
            r.punto = notas(r,miscomidas,this.materiales,this.mydata);
       })
    
       function max_min(materiales = [{punto: 0}]) {
        let newmateriales = Array(materiales.length);
        for (let index = 0; index < newmateriales.length; index++) {
            newmateriales[index] = undefined;
        }

        for (let index1 = 0; index1 < materiales.length; index1++) {
            let t = 0;
            for (let index2 = 0; index2 < materiales.length; index2++) {
                if(index1 !== index2 && materiales[index1].punto < materiales[index2].punto) t++;
              
            }

            while(newmateriales[t] !== undefined) t++;

            newmateriales[t] = materiales[index1];
            
        } 

        return newmateriales;
    }

   
    return max_min(newrecetas);
}
Datos.prototype.comidasCompartidas = function() {
    function notas(receta,recetas,materiales,mydata) {
        let notaDeMateriales = 0;
        let nodaDeTiempo = 0;
        let notaDeVisitas = 0;
        let notaDeLikes = 0;
        let ndmt = -1;
        receta.comida.materiales.forEach(r => {
            mydata.materiales.forEach(m => {
                if(r === m) ndmt++;
            })
        })
        notaDeMateriales = Math.floor((ndmt * (25/receta.comida.materiales.length))); 
    
        let ndtt = 0;
        let ndttt = true;
        for (let index = mydata.ultimasComidas.length-1; index >= 0; index--) {
            if(ndttt) ndtt++;
            if(mydata.ultimasComidas[index] === receta.comida.id) ndttt = false;
        }
        nodaDeTiempo = Math.floor((ndtt * (25 / recetas.length)));
    
        let maxv = 0;
        recetas.forEach(r => {
            if(r.comida.visits.length > maxv) maxv = r.comida.visits.length;
        })
        notaDeVisitas = Math.floor((receta.comida.visits.length * (25 / maxv)));
    
        let maxvl = 0;
        recetas.forEach(r => {
            if(r.comida.likes.length > maxvl) maxvl = r.comida.likes.length;
        })
        notaDeLikes = Math.floor((receta.comida.likes.length * (25 / maxvl)));
        return notaDeMateriales+nodaDeTiempo+notaDeVisitas+notaDeLikes;
       }

       let comidascompartidas = [];
       this.recetas.forEach(e => {
            if(e.perfil.id !== this.mydata.id) comidascompartidas.push(e);
       })
    
       let newrecetas = comidascompartidas;
       
    
       newrecetas.forEach(r => {
            r.punto = notas(r,comidascompartidas,this.materiales,this.mydata);
       })
    
       function max_min(materiales = [{punto: 0}]) {
        let newmateriales = Array(materiales.length);
        for (let index = 0; index < newmateriales.length; index++) {
            newmateriales[index] = undefined;
        }

        for (let index1 = 0; index1 < materiales.length; index1++) {
            let t = 0;
            for (let index2 = 0; index2 < materiales.length; index2++) {
                if(index1 !== index2 && materiales[index1].punto < materiales[index2].punto) t++;
              
            }

            while(newmateriales[t] !== undefined) t++;

            newmateriales[t] = materiales[index1];
            
        } 

        return newmateriales;
    }

   
    return max_min(newrecetas);
}

Datos.prototype.buscarReceta = function(recetas = [],value = "") {
    let recetasEncontradas = [];
    recetas.forEach(r => {
        if(r.comida.name.toLowerCase().includes(value.toLowerCase())) recetasEncontradas.push(r);
    })
    if(recetasEncontradas.length > 0) {
        return recetasEncontradas;
    }else {
        return false;
    }
}

function crearId(users = [{id:"asd10"}],num = 10) {
    let ids = "abcdefghijklnmopqrstuvwxyz123456789";
    let d = true;
    while (d) {
        let newId = "";
        for (let index = 0; index < num; index++) {
            newId += ids.charAt(Math.floor(Math.random()*ids.length));
        }
        let t = false;
        users.forEach(e => {
            if(e.id === newId) t = true;
        })
        if(t === false) {
            d = false;
            return newId;
        }    
    }

}

function crearRecetaID(recetas = {},num = 10) {
    let ids = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
    let t = true;
    while (t) {
        let newid = "";
        for (let index = 0; index < num; index++) {
            
            newid += ids.charAt(Math.floor(Math.random()*ids.length));

        }
        let rt = true;
        recetas.forEach(e => {
            if(e.comida.id === newid) rt = false;
        })

        if(rt){
            t = false;
            return newid;
        }
    }
}

function borrarReceta(recetas = [],id = "") {
    let newrecetas = [];
    recetas.forEach(e => {
        if(e.comida.id !== id) newrecetas.push(e);
    })

    return newrecetas;
}

function Users(id,username,password,image) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.image = image;
    this.materiales = [];
    this.ultimasComidas = [];
}

function likesAndVisits(recetas = [],id = "") {
    let misrecetas = [];

    recetas.forEach(e => {
        if(e.perfil.id === id) misrecetas.push(e);
    })
    let visits = 0;
    let likes = 0;
    misrecetas.forEach(e => {
        visits += e.comida.visits.length;
        likes += e.comida.likes.length;
     
    })
    return {visits,likes};
}

async function httpRequest(method,url,data = {id:""}) {
   let c = document.createElement("div");

   c.getBoundingClientRect()
   
}

export {likesAndVisits,borrarReceta,crearRecetaID,Datos,crearId,Users,buscarMisDatos,httpRequest,host};

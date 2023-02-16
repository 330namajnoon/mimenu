
const miLibreria = require("../src/librerias");
const http = require("http");
const express = require("express");
const multer = require("multer");
const paht = require("path");
const {Server} = require("socket.io");
const pdp = paht.join(__dirname,"./");
const pdpm = paht.join(__dirname,"/node_modules");
const port = process.env.PORT || 4000;
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// app.use("/node_modules",express.static(__dirname + "/node_modules"));
app.use(express.static(pdp));
app.use(cors())
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*"
    }
});
const fs = require("fs");
const { json } = require("express");

const uploadD = multer();
const uploadF = multer(multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,"./database");
    },
    filename:(req,file,cd)=> {
        cd(null,file.originalname);
    }
}));
app.post("/descargar-materiales",uploadD.none(),(req,res)=>{
    fs.readFile("./database/materiales.json",(err,data)=> {
        if(err) {
            res.send('error!')
        }else {
            res.send(data.toString());
            
        }
    })
})
app.post("/descargar-datos-usuarios",(req,res)=> {
    fs.readFile("./database/users.json",(err,data)=> {
        if(err) {
            res.send("error!");
        }else {
    
            res.send(JSON.stringify(miLibreria.buscarMisDatos(JSON.parse(data.toString()),req.body.id)));
        }
    })
})
app.post("/descargar-recetas",uploadD.none(),(req,res)=> {
    fs.readFile("./database/recetas.json",(err,data)=> {
        if(err) {
            res.send("error!");
        }else {
            res.send(data.toString());
        }
    })
})



function imageUload() {
    let upload = multer({storage: multer.diskStorage({
        destination:(req,file,cd)=> {
            cd(null,"../public/images");
        },
        filename:(req,file,cd)=> {
            cd(null,file.originalname);   
        }
    })})

    return upload;
}

app.post("/guardar_receta",uploadD.none(),(req,res)=> {

    let receta = JSON.parse(req.body.receta);
    fs.readFile("./database/recetas.json",(err,data)=> {
        if(err) throw err;
        let recetas = JSON.parse(data.toString());
        if(receta.comida.id === "") {
            recetas.comida.id = miLibreria.crearRecetaID(recetas,10);
            recetas.push(receta);
        }else {
            for (let index = 0; index < recetas.length; index++) {
                if(recetas[index].comida.id === receta.comida.id ) {
                    recetas[index] = receta;
                }
            }
        }
        fs.writeFile("./database/recetas.json",JSON.stringify(recetas),(err)=> {
            if(err) throw err;
            res.send(JSON.stringify(recetas));
        })
    })

})

app.post("/guardar_receta_I",imageUload().single('image'),(req,res)=> {
    
   
    fs.readFile("./database/recetas.json",(err,data)=> {
        let recetas = JSON.parse(data.toString());
        let receta = JSON.parse(req.body.receta);
        let t = false;
        if(receta.comida.id === "") {
            receta.comida.id = miLibreria.crearRecetaID(recetas,10);
            t = true;
        }

        let imgn1 = req.file.originalname;
        let imgn2 = imgn1.split(".");
        let newImageName = receta.comida.id + "." + imgn2[1];
        receta.comida.image = newImageName;
        if(err) throw err;
        if(t) {
            recetas.push(receta);
            fs.rename(req.file.path,"../public/images/"+newImageName,(err)=> {
                if(err) throw err;
                console.log("saved name");
            })
        }else {
            for (let index = 0; index < recetas.length; index++) {
                if(recetas[index].comida.id === receta.comida.id ) {
                    recetas[index] = receta;
                }
            }
        }
        fs.writeFile("./database/recetas.json",JSON.stringify(recetas),(err)=> {
            if(err) throw err;
            res.send(JSON.stringify(recetas));
        })
    })
})

app.post("/guardar_user",uploadD.none(),(req,res)=> {
    let id = req.body.userId;
    let materiales = JSON.parse(req.body.materiales);
    fs.readFile("./database/users.json",(err,data)=> {
        let users = JSON.parse(data.toString());
        let newdata;
        for (let index = 0; index < users.length; index++) {
            if(users[index].id === id ) {
                users[index].materiales = materiales;
                newdata = users[index];
            }    
        }
        fs.writeFile("./database/users.json",JSON.stringify(users),(err)=> {
            res.send(JSON.stringify(newdata));
        })
    })
})

app.post("/guardar_perfil",imageUload().single("image") ? imageUload().single("image") : uploadD.none(),(req,res)=> {
    console.log(imageUload().single("image"));
    
    fs.readFile("./database/users.json",(err,data)=> {
        let users = JSON.parse(data.toString());
        let mydata = JSON.parse(req.body.mydata);
        let i = "s";
        let ii = i.split(".");
        let t = false;
        if(mydata.id === "") {
            mydata.id = miLibreria.crearId(users,15);
            t = true;
        }
        let imagename = mydata.id + "." + ii[1];
        mydata.image = imagename;

        if(t) {
            users.push(mydata);
        }else {
            for (let index = 0; index < users.length; index++) {
                if(users[index].id === mydata.id) users[index] = mydata;
            }
        }
        switch (req.body.image) {
            case "false":
                
                break;
                
            default:
                fs.rename(req.file.path,"../public/images/"+imagename,(err)=> {
                    if(err) throw err;
                    console.log("la foto se ha guardado");
                })
                break;
        }
       
        
        fs.writeFile("./database/users.json",JSON.stringify(users),(err)=> {
            res.send(JSON.stringify(mydata));
        })
    })

})

app.post("/borrar_receta",uploadD.none(),(req,res)=> {
    fs.readFile("./database/recetas.json",(err,data)=> {
        if(err) throw err;
        let recetas = JSON.parse(data.toString());
        let newrecetas = miLibreria.borrarReceta(recetas,req.body.id);
        fs.writeFile("./database/recetas.json",JSON.stringify(newrecetas),(err)=> {
            console.log("la receta se ha guardado correctamente");
        })
        res.send(JSON.stringify(newrecetas));
    })
})

app.post("/like",(req,res)=> {
    fs.readFile("./database/recetas.json",(err,data)=> {
        if(err) throw err;
        let {myid,id,method} = req.body;
        let recetas = JSON.parse(data.toString());

        recetas.forEach(e => {
            
            if(e.comida.id === id) {
                if(method === "likes") {
                    e.comida[method].push(myid);
                    fs.readFile("./database/users.json",(err,us) => {
                        let users = JSON.parse(us.toString());
                        users.forEach(e => {
                            if(e.id === myid) e.ultimasComidas.push(id);
                            if(e.ultimasComidas.length >= recetas.length) {
                                let newUlc = [];
                                for (let index = 0; index < e.ultimasComidas.length; index++) {
                                    if(index > 0) newUlc.push(e.ultimasComidas[index]);
                                }
                                e.ultimasComidas = newUlc;
                            }
                        })
                        fs.writeFile("./database/users.json",JSON.stringify(users),(err)=> {
                            res.send(JSON.stringify({recetas:recetas,mydata: miLibreria.buscarMisDatos(users,myid)}));
                        })
                    })
                }else {
                    e.comida[method].push(myid);
                    res.send(JSON.stringify({recetas:recetas,mydata:false}));
                }
            }
        })
        fs.writeFile("./database/recetas.json",JSON.stringify(recetas),(err)=> {
            
        })
    })
})

app.get("/sigin",(req,res)=> {
    fs.readFile("./database/users.json",(err,data)=> {
        if(err) throw err;
        let users = JSON.parse(data.toString());
        let newId = miLibreria.crearId(users,10);
        users.push(new miLibreria.Users(newId,req.query.username,req.query.password,req.query.image));
        fs.writeFile("./database/users.json",JSON.stringify(users),(err)=> {
            if(err) throw err;
            console.log("user saved")
        })
    })
})

app.post("/guardar_materiales",uploadD.none(),(req,res)=> {
    fs.readFile("./database/materiales.json",(err,data)=> {
        if(err) throw err;
        let materiales = JSON.parse(data.toString());
        let newMateriales  = JSON.parse(req.body.materiales);
        newMateriales.forEach(e => {
            let d = false;
            materiales.forEach(ee => {
                if(ee.name == e.name)  d = true;
            })
            if(d == false ) {
                e.id = materiales.length+1;
                materiales.push(e);
            }    
        })
        fs.writeFile("./database/materiales.json",JSON.stringify(materiales),(err)=> {
            if(err) throw err;
        })
    })    
})

server.listen(port,()=> {
    console.log(`server is op un port ${port}!`);

    // fs.readFile("./database/recetas.json",(err,data)=> {
      
    //     fs.readFile("./database/materiales.json",(err,mat)=>{
    //         let materiales = JSON.parse(mat.toString());

    //         let newMateriales  = [
    //             { id: 1, name: "Papas" },
    //             { id: 2, name: "Cebolla" },
    //             { id: 3, name: "Huevos" },
    //             { id: 4, name: "Aceite de oliva" },
    //             { id: 5, name: "Sal" },
    //             { id: 6, name: "Pimienta negra" }
    //           ]
    //         newMateriales.forEach(e => {
    //             let d = false;
    //             materiales.forEach(ee => {
    //                 if(ee.name === e.name)  d = true;
    //             })
    //             if(d === false ) {
    //                 e.id = materiales.length+1;
    //                 materiales.push(e);
    //             }    
    //         })
    
    //         fs.writeFile("./database/materiales.json",JSON.stringify(materiales),(err)=> {
    //             function buscarm(mismtr) {
    //                 let matriales = [];
    //                 mismtr.forEach(e => {
    //                     materiales.forEach(ee => {
    //                         if(ee.name === e.name) matriales.push(ee.id);
    //                     })
    //                 });
    //                 return matriales;
    //             }
    //             if(err) throw err;
    //             let recetas = JSON.parse(data.toString());
    //             let newreceta  = {
    //                 perfil: {
    //                   username: "Chef Luis",
    //                   id: "13e5ds",
    //                   image: "chef_luis.jpg"
    //                 },
    //                 comida: {
    //                   id: "receta14",
    //                   name: "Tortilla de Papas",
    //                   materiales: buscarm([
    //                     { id: 1, name: "Papas" },
    //                     { id: 2, name: "Cebolla" },
    //                     { id: 3, name: "Huevos" },
    //                     { id: 4, name: "Aceite de oliva" },
    //                     { id: 5, name: "Sal" },
    //                     { id: 6, name: "Pimienta negra" }
    //                   ]),
    //                   receta: "Pele y corte las papas y la cebolla en rodajas finas. Caliente aceite de oliva en una sartén y fría las papas y la cebolla a fuego medio hasta que estén doradas y crujientes. Batir los huevos en un tazón y sazonarlos con sal y pimienta negra al gusto. Agregue las papas y la cebolla a los huevos y mezcle bien. Caliente un poco más de aceite de oliva en la sartén y agregue la mezcla de huevo. Cocine a fuego medio-bajo durante unos 10 minutos o hasta que la parte inferior esté dorada. Voltee la tortilla utilizando un plato y cocine la otra cara hasta que esté dorada. Sirva caliente.",
    //                   image: "tortilla_papas.jpg",
    //                   visits: [],
    //                   likes: []
    //                 }
    //               }
                  
    //             recetas.push(newreceta);
        
    //             fs.writeFile("./database/recetas.json",JSON.stringify(recetas),(err)=> {
            
    //             })
    //         })
           
    //     })
       
    // })    

    

    //     fs.writeFile("./database/materiales.json",JSON.stringify(materiales),(err)=> {
    
    //     })
    // })




   
})
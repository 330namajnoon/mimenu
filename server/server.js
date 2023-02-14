
const miLibreria = require("../src/librerias");
const http = require("http");
const express = require("express");
const multer = require("multer");
const paht = require("path");
const {Server} = require("socket.io");
const pdp = paht.join(__dirname,"./database");
const port = process.env.PORT || 4000;
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// app.use(express.static(pdp));
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

server.listen(port,()=> {
    console.log(`server is op un port ${port}!`);

    fs.readFile("./database/recetas.json",(err,data)=> {
      
        fs.readFile("./database/materiales.json",(err,mat)=>{
            let materiales = JSON.parse(mat.toString());

            let newMateriales  = [
                { id: 1, name: "Papas" },
                { id: 2, name: "Cebolla" },
                { id: 3, name: "Huevos" },
                { id: 4, name: "Aceite de oliva" },
                { id: 5, name: "Sal" },
                { id: 6, name: "Pimienta negra" }
              ]
            newMateriales.forEach(e => {
                let d = false;
                materiales.forEach(ee => {
                    if(ee.name === e.name)  d = true;
                })
                if(d === false ) {
                    e.id = materiales.length+1;
                    materiales.push(e);
                }    
            })
    
            fs.writeFile("./database/materiales.json",JSON.stringify(materiales),(err)=> {
                function buscarm(mismtr) {
                    let matriales = [];
                    mismtr.forEach(e => {
                        materiales.forEach(ee => {
                            if(ee.name === e.name) matriales.push(ee.id);
                        })
                    });
                    return matriales;
                }
                if(err) throw err;
                let recetas = JSON.parse(data.toString());
                let newreceta  = {
                    perfil: {
                      username: "Chef Luis",
                      id: "13e5ds",
                      image: "chef_luis.jpg"
                    },
                    comida: {
                      id: "receta14",
                      name: "Tortilla de Papas",
                      materiales: buscarm([
                        { id: 1, name: "Papas" },
                        { id: 2, name: "Cebolla" },
                        { id: 3, name: "Huevos" },
                        { id: 4, name: "Aceite de oliva" },
                        { id: 5, name: "Sal" },
                        { id: 6, name: "Pimienta negra" }
                      ]),
                      receta: "Pele y corte las papas y la cebolla en rodajas finas. Caliente aceite de oliva en una sartén y fría las papas y la cebolla a fuego medio hasta que estén doradas y crujientes. Batir los huevos en un tazón y sazonarlos con sal y pimienta negra al gusto. Agregue las papas y la cebolla a los huevos y mezcle bien. Caliente un poco más de aceite de oliva en la sartén y agregue la mezcla de huevo. Cocine a fuego medio-bajo durante unos 10 minutos o hasta que la parte inferior esté dorada. Voltee la tortilla utilizando un plato y cocine la otra cara hasta que esté dorada. Sirva caliente.",
                      image: "tortilla_papas.jpg",
                      visits: [],
                      likes: []
                    }
                  }
                  
                recetas.push(newreceta);
        
                fs.writeFile("./database/recetas.json",JSON.stringify(recetas),(err)=> {
            
                })
            })
           
        })
       
    })    

    // fs.readFile("./database/materiales.json",(err,data)=> {
    //     if(err) throw err;
    //     let materiales = JSON.parse(data.toString());
    //     let newMateriales  = [
    //         { id: 1, name: "Arroz" },
    //         { id: 2, name: "Pollo" },
    //         { id: 3, name: "Cebolla" },
    //         { id: 4, name: "Ajo" },
    //         { id: 5, name: "Pimiento rojo" },
    //         { id: 6, name: "Pimiento verde" },
    //         { id: 7, name: "Tomate" },
    //         { id: 8, name: "Caldo de pollo" },
    //         { id: 9, name: "Aceite de oliva" },
    //         { id: 10, name: "Sal" },
    //         { id: 11, name: "Pimienta negra" },
    //         { id: 12, name: "Comino" },
    //         { id: 13, name: "Perejil" },
    //         ]
    //     newMateriales.forEach(e => {
    //         let d = false;
    //         materiales.forEach(ee => {
    //             if(ee.name == e.name)  d = true;
    //         })
    //         if(d == false ) {
    //             e.id = materiales.length+1;
    //             materiales.push(e);
    //         }    
    //     })

    //     fs.writeFile("./database/materiales.json",JSON.stringify(materiales),(err)=> {
    
    //     })
    // })




   
})
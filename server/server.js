
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
// app.use(express.static(pdp));
app.use(cors())
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*"
    }
});
const fs = require("fs");

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
app.post("/descargar-datos-usuarios",uploadD.none(),(req,res)=> {
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

    // fs.readFile("./database/recetas.json",(err,data)=> {
      
    //     fs.readFile("./database/materiales.json",(err,mat)=>{
    //         let materiales = JSON.parse(mat.toString());

    //         let newMateriales  = [
    //             { id: 1, name: "Camarones pelados" },
    //             { id: 2, name: "Arroz" },
    //             { id: 3, name: "Champiñones frescos" },
    //             { id: 4, name: "Cebolla" },
    //             { id: 5, name: "Ajo" },
    //             { id: 6, name: "Aceite de oliva" },
    //             { id: 7, name: "Caldo de pescado" },
    //             { id: 8, name: "Vino blanco" },
    //             { id: 9, name: "Perejil fresco" },
    //             { id: 10, name: "Sal" },
    //             { id: 11, name: "Pimienta negra" }
    //             ]
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
    //                 username: "Sina Majnoon",
    //                 id: "8bcefpjlgj",
    //                 image: "sina.png"
    //                 },
    //                 comida: {
    //                     id: "receta12",
    //                     name: "Arroz con camarones y champiñones",
    //                     materiales: buscarm([
    //                     { id: 1, name: "Camarones pelados" },
    //                     { id: 2, name: "Arroz" },
    //                     { id: 3, name: "Champiñones frescos" },
    //                     { id: 4, name: "Cebolla" },
    //                     { id: 5, name: "Ajo" },
    //                     { id: 6, name: "Aceite de oliva" },
    //                     { id: 7, name: "Caldo de pescado" },
    //                     { id: 8, name: "Vino blanco" },
    //                     { id: 9, name: "Perejil fresco" },
    //                     { id: 10, name: "Sal" },
    //                     { id: 11, name: "Pimienta negra" }
    //                     ]),
    //                     receta: "Cocine el arroz en caldo de pescado siguiendo las instrucciones del paquete. Mientras tanto, caliente una sartén grande a fuego medio-alto y agregue el aceite de oliva. Agregue la cebolla picada y cocine durante 2-3 minutos, o hasta que esté suave. Agregue el ajo picado y cocine por otros 30 segundos. Agregue los champiñones y cocine durante unos 5 minutos, o hasta que estén dorados. Agregue los camarones y cocine durante unos 2-3 minutos, o hasta que estén cocidos. Agregue el vino blanco y cocine durante unos 2-3 minutos, o hasta que se reduzca a la mitad. Agregue el arroz cocido y el perejil fresco picado y revuelva bien. Sazone con sal y pimienta al gusto. Sirva caliente y disfrute.",
    //                     image: "arroz_camarones_champinones.png",
    //                     visits: 78,
    //                     likes: 91
    //                     }
    //                 }
    //             recetas.push(newreceta);
        
    //             fs.writeFile("./database/recetas.json",JSON.stringify(recetas),(err)=> {
            
    //             })
    //         })
           
    //     })
       
    // })    

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

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
app.post("/dascargar-materiales",uploadD.none(),(req,res)=>{
    fs.readFile("./database/materiales.json",(err,data)=> {
        if(err) throw err;
        fs.readFile("./database/users.json",(err1,data1)=> {
            if(err) throw err1;
            let datos = {
                materiales: JSON.parse(data.toString()),
                mydata: miLibreria.buscarMisDatos(JSON.parse(data1.toString()),req.body.id)
            }
            res.send(JSON.stringify(datos));
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
                { id: 1, name: "Quinoa" },
                { id: 2, name: "Pimiento rojo" },
                { id: 3, name: "Pimiento verde" },
                { id: 4, name: "Cebolla morada" },
                { id: 5, name: "Pepino" },
                { id: 6, name: "Zanahoria" },
                { id: 7, name: "Tomate" },
                { id: 8, name: "Aceite de oliva" },
                { id: 9, name: "Vinagre balsámico" },
                { id: 10, name: "Sal" },
                { id: 11, name: "Pimienta negra" }
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
                    username: "Sina Majnoon",
                    id: "8bcefpjlgj",
                    image: "sina.png"
                    },
                    comida: {
                        id: "receta10",
                        name: "Ensalada de quinoa y vegetales",
                        materiales: buscarm([
                        { id: 1, name: "Quinoa" },
                        { id: 2, name: "Pimiento rojo" },
                        { id: 3, name: "Pimiento verde" },
                        { id: 4, name: "Cebolla morada" },
                        { id: 5, name: "Pepino" },
                        { id: 6, name: "Zanahoria" },
                        { id: 7, name: "Tomate" },
                        { id: 8, name: "Aceite de oliva" },
                        { id: 9, name: "Vinagre balsámico" },
                        { id: 10, name: "Sal" },
                        { id: 11, name: "Pimienta negra" }
                        ]),
                        receta: "Enjuague la quinoa y cocine en agua con sal durante unos 15 minutos hasta que esté tierna y suave. Escúrrala bien y déjela enfriar. Mientras tanto, pique los pimientos, la cebolla, el pepino, la zanahoria y el tomate en cubos pequeños. En un tazón grande, combine la quinoa enfriada, los vegetales picados y revuelva bien. Agregue el aceite de oliva, el vinagre balsámico, la sal y la pimienta negra y revuelva bien. Sirva inmediatamente o enfríe en el refrigerador hasta que esté listo para servir.",
                        image: "ensalada_quinoa_vegetales.jpg",
                        visits: 90,
                        likes: 150
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


function Datos() {
    this.materiales = [];
    this.mydata = [];
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

function Users(id,username,password,image) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.image = image;
    this.materiales = [];
    this.ultimasComidas = [];
}


module.exports = {Datos,crearId,Users,buscarMisDatos};
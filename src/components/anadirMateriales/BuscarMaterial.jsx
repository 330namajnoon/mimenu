import "./css/buscarmaterial.css";

function BuscarMaterial({setBuscar,materiales,materialesR,setMateriales}) {
    return(
        <div className="buscar_material_paszamine">
            {
                materiales.map(e => (
                    <div onClick={(ee)=> {
                        ee.stopPropagation();
                        setMateriales(anadirMaterial(e));
                        setBuscar("")
                        }} className="material">
                        {e.name}
                    </div>
                ))
            }
        </div>
    );

    function anadirMaterial(material) {
        let newmateriales = materialesR;
        newmateriales.push(material.id);
        return newmateriales;
    }
}

export default BuscarMaterial;
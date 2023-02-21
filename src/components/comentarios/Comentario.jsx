import "./css/comentario.css";

export default function Comentario({comentario,id}) {

    return(
        <div style={id === comentario.perfil.id ? {justifyContent: "flex-end"}: null} className="comentario_back">
            <div style={id === comentario.perfil.id ?{borderRadius: "10px 0 10px 10px",paddingRight: "0px",paddingLeft:"10vw"}:null} className="comentario">
                <div    style={id === comentario.perfil.id ?{borderRadius: "0 0 0 10px"}:null} className="perfil">
                    <img src={`./images/${comentario.perfil.image}`} alt="" />
                    <h1>{comentario.perfil.username}</h1>
                </div>
                <h1 className="msg">{comentario.msg}</h1>
                <h1 className="date">{comentario.date}</h1>
            </div>
        </div>
    );
}
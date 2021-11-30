import React from "react";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import CardModalComentario from "../CardModalComentario/CardModalComentario.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "rgb(223 223 223)",
  border: "none",
  boxShadow: 24,
  p: 4,
};

export default function ModalComentario(props) {

  return (
    <div>
      <Modal
        open={props.status}
        onClose={props.onclickclosemodal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h4 className="title">Comentarios</h4>
        <br></br>
        <hr></hr>
        <br></br>        
          {props.comments.map((e) => (
            <CardModalComentario user={e.user} descricao={e.description} idComentario={e.idComments} />
          ))}

        </Box>
      </Modal>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import "./modalNewPost.css";
import Button from "@material-ui/core/Button";
import PostService from "../../services/ApiService.js";
import AlertMat from "../Alert/AlertMat.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  boxShadow: 30,
  p: 4,
};

export default function ModalNewPost(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [alertComponent, setAlert] = useState(false);
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    setTitle("");
    setDescription("");
  }, [props.status]);

  async function salveNewPost(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const usuarioLogado = localStorage.getItem("usuario");

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append("image", image[0]);

    await PostService.post("/posts/photos", formData, headers)
      .then((e) => {
        const requestBody = {
          title: title,
          description: description,
          user: usuarioLogado,
          idImagem: e.data.idImage,
        };
        console.log(requestBody);
        PostService.post("/posts", requestBody, headers)
          .then((e) => {
            setAlert(true);
            setAlertMensagem(`Post salvo`);
            setAlertType("success");
            setTimeout(() => {
              setAlert(false);
              window.location.reload();
            }, 1000);

            window.location.reload();
          })
          .catch((e) => {
            setAlertMensagem("Erro ao salvar o post");
            setAlertType("error");
            setTimeout(() => {
              setAlert(false);
              window.location.reload();
            }, 1000);

          });
      })
      .catch((e) => {
        setAlertMensagem("Erro ao salvar a imagem");
        setAlertType("error");
        setTimeout(() => {
          setAlert(false);
          window.location.reload();
        }, 1000);
      });
  }

  return (
    <div>
      <Modal
        open={props.status}
        onClose={props.oncloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="alert">
            {alertComponent ? (
              <AlertMat type={alertType} conteudo={alertMensagem} />
            ) : (
              <div></div>
            )}
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nova Postagem
          </Typography>

          <form onSubmit={salveNewPost}>
            <div className="grid-form">
              <TextField
                id="titlePost"
                label="Titulo"
                multiline
                maxRows={4}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="grid-form-input"
              />
              <TextField
                id="filled-textarea"
                label="Descrição"
                multiline
                className="grid-form-area"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <input
              className="inp-img"
              name="upload-photo"
              type="file"
              onChange={(e) => {
                setImage(e.target.files);
              }}
            />

            <div className="container-button">
              <Button type="submit" variant="contained" className="buttonStyle">
                Postar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

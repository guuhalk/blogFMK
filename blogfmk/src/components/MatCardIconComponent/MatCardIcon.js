import React, { useEffect } from "react";
import "../MatCardIconComponent/matCardIcon.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ModalComentario from "../ModalComentarios/ModalComentarios.js";
import CommentIcon from "@material-ui/icons/Comment";
import TextField from "@material-ui/core/TextField";
import PostService from "../../services/ApiService.js";
import AlertMat from "../Alert/AlertMat.js";

export default function MatCardIcon(props) {
  const [open, setOpen] = React.useState(false);
  const [comentario, setComentario] = React.useState("");
  const [isDeletedPost, setIsDeletedPost] = React.useState(false);
  const [comentarios, setComentarios] = React.useState([]);
  const [alertComponent, setAlert] = React.useState(false);
  const [alertMensagem, setAlertMensagem] = React.useState("");
  const [alertType, setAlertType] = React.useState("");

  const imagem = `data:image/png;base64, ${props.imagem}`;
  const imagemUser = `data:image/png;base64, ${props.imagemUser}`;

  function getComentarios() {
    const token = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    PostService.get(`/posts/comments/${props.idPost}`, headers)
      .then((e) => {
        setComentarios(e.data);
        setOpen(true);
        console.log(e.data);
      })
      .catch((e) => {
        if (e.response.status === 403) {
          setAlert(true);
          setAlertMensagem("Token expirado");
          setAlertType("error");
          setTimeout(() => {
            setAlert(false);
          }, 5000);
          localStorage.clear();
          window.location.reload();
        } else {
          setAlert(true);
          setAlertMensagem("Erro ao carregar os comentarios");
          setAlertType("error");
          setTimeout(() => {
            setAlert(false);
          }, 5000);
        }
      });
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const token = localStorage.getItem("token");
      const usuarioLogado = localStorage.getItem("usuario");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const requestBody = {
        description: event.target.value,
        user: usuarioLogado,
      };

      PostService.post(`/posts/comments/${props.idPost}`, requestBody, headers)
        .then((e) => {
          setComentario("");
          setAlert(true);
          setAlertMensagem("Comentario Salvo");
          setAlertType("success");
          setTimeout(() => {
            setAlert(false);
          }, 5000);
        })
        .catch((e) => {
          setAlert(true);
          setAlertMensagem("erro ao salvar o comentario");
          setAlertType("error");
          setTimeout(() => {
            setAlert(false);
          }, 5000);
        });
    }
  };

  const deletePost = () => {
    const token = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    PostService.delete(`/posts/${props.idPost}`, headers)
      .then((e) => {
        setComentario("");
        setAlert(true);
        setAlertMensagem("Post Deletado");
        setAlertType("success");
        setTimeout(() => {
          setAlert(false);
          window.location.reload();
        }, 1000);
      })
      .catch((e) => {
        setAlert(true);
        setAlertMensagem("erro ao salvar o comentario");
        setAlertType("error");
        setTimeout(() => {
          setAlert(false);
        }, 5000);
      });
  };

  function isDeleted() {
    console.log(localStorage.getItem("usuario"));
    console.log(props.user);

    if (localStorage.getItem("usuario") === props.user) {
      setIsDeletedPost(true);
    }
  }

  useEffect(() => {
    isDeleted();
  }, []);

  return (
    <div>
      <div className="alert">
        {alertComponent ? (
          <AlertMat type={alertType} conteudo={alertMensagem} />
        ) : (
          <div></div>
        )}
      </div>
      <Card sx={{ maxWidth: 600, minWidth: 600 }}>
        <div className="container-header">
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={imagemUser}></Avatar>}
            title={props.titulo}
          />

          {isDeletedPost ? (
            <IconButton aria-label="delete" onClick={deletePost}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <div></div>
          )}
        </div>

        <img src={imagem} alt="posts" className="imagem" />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.descricao}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share">
            <CommentIcon onClick={getComentarios}></CommentIcon>
          </IconButton>
          <TextField
            id="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="ipt-comentario"
            onKeyDown={handleKeyDown}
          />
        </CardActions>
      </Card>

      <ModalComentario
        status={open}
        onclickclosemodal={() => setOpen(false)}
        comments={comentarios}
      />
    </div>
  );
}

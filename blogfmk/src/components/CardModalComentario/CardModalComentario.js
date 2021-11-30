import React, { useEffect } from "react";
import "../MatCardIconComponent/matCardIcon.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertMat from "../Alert/AlertMat.js";
import CommentsService from "../../services/ApiService.js";

export default function MatCardIcon(props) {
  const [isDeletedPost, setIsDeletedPost] = React.useState(false);
  const [alertComponent, setAlert] = React.useState(false);
  const [alertMensagem, setAlertMensagem] = React.useState("")
  const [alertType, setAlertType] = React.useState("")

  
  const deleteComments = () =>{
    
    const token = localStorage.getItem("token");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(props)
    CommentsService.delete(`/comments/${props.idComentario}`, headers)
    .then((e) => {
      setAlert(true);
      setAlertMensagem("comentario Deletado")
      setAlertType("success")
      setTimeout(() => {
        setAlert(false);
        window.location.reload()
      }, 1000);

    })
    .catch((e) => {
      setAlert(true);
      setAlertMensagem("erro ao salvar o comentario")
      setAlertType("error")
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    });

  }


  function isDeleted(){
    
    console.log(localStorage.getItem('usuario'))
    console.log(props.user)
    
    if(localStorage.getItem('usuario') === props.user ){
      setIsDeletedPost(true);
    }    
  }

  useEffect(() => {
    isDeleted();
  }, []);



  return (
    <div>
         <div className="alert">
        {alertComponent ? <AlertMat type={alertType} conteudo={alertMensagem}  /> : <div></div>}
      </div>
        

      <Card sx={{ maxWidth: 600, minWidth:600, marginBottom:2 }}>
        <div className="container-header">
          <CardHeader
            avatar={<Avatar aria-label="recipe" ></Avatar>}
            title={props.user}
          />
          
           {
             isDeletedPost ? <IconButton aria-label="delete" onClick={deleteComments}><DeleteIcon /></IconButton> : <div></div>
           }
          
        </div>
        
        <CardContent>
          <Typography variant="body2" color="text.secondary">
           {props.descricao}
          </Typography>
        </CardContent>
        
      </Card>

    </div>
  );
}

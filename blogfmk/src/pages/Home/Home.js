import React, { useState, useEffect } from "react";
import "../Home/home.css";
import MatCardIcon from "../../components/MatCardIconComponent/MatCardIcon.js";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import ModalNewPost from "../../components/ModalNewPost/ModalNewPost.js";
import PostService from "../../services/ApiService.js";
import { Link } from "react-router-dom";


export default function Home() {
  const [open, setOpen] = useState(false);
  const [listFeed, setListFeed] = useState([]);

  
  function getFeed() {
    const token = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    PostService.get("posts", headers)
      .then((e) => {
        setListFeed(e.data);
        console.log(e.data)
        
      })
      .catch((e) => {
        if(e.response.status === 403){
          alert("Token expirado favor logar novamente");
          localStorage.clear();
          window.location.reload();
        }else{
          alert("Erro ao carregar o feed");
        }
        
      });
  }

  useEffect(() => {
    getFeed();
    console.log(listFeed);
  }, []);




  return (
    <div className="main">
      <div className="container-title">
        <h2 className="title">Feed</h2>
      </div>

      <div className="menu">
        <ul className="itens-menu">
          
          <li>
            <IconButton
              aria-label="new"
              size="large"
              onClick={() => setOpen(true)}
            >
              <AddIcon />
            </IconButton>
          </li>
        </ul>
      </div>

      <div className="row1">
        
        {listFeed.map((e) => (
          <div className="card" id={e} >
            <MatCardIcon imagem={e.urlImage} titulo={e.title} descricao={e.description} comentarios={e.comentarios} imagemUser={e.urlImageUser} user={e.user} idPost={e.idPost} />
          </div>
        ))}

      </div>

      <ModalNewPost status={open} oncloseModal={() => setOpen(false)} />

    </div>
  );
}

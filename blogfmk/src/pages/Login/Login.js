import "./login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "../../assets/img/logo.png";
import LoginService from '../../services/ApiService.js';
import TextField from '@material-ui/core/TextField';


export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function logar(e){
    e.preventDefault();

    const requestBody = {userName: userName, password: password};
    

    LoginService.post("/login", requestBody)
      .then(e =>{
        const {data} = e;
        if(data){
          localStorage.setItem("token", data);
          localStorage.setItem("usuario", userName);

          window.location.reload();
        }

      })
      .catch(error=>alert(error))
    

  };

  return (
    <div className="container">
      <div className="containerEsquerda">
        <img src={logo} alt="Logo" />
      </div>

      <div className="containerDireita">
        <form onSubmit={logar}>
          <div className="titulo">
            <h2>Blog</h2>
            
          </div>

          <TextField id="standard-basic" label="Usuário" variant="standard" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <TextField id="filled-password-input" className="inpPassword" label="Senha" type="password" autoComplete="current-password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" className="buttonStyle" >Logar</Button>

          <Link className="link">Esqueci minha senha</Link>
        </form>
      </div>
    </div>
  );
}

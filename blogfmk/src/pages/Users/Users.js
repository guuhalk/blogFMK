import React, { useState } from "react";
import "../Users/user.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import UserService from "../../services/ApiService.js";
import AlertMat from "../../components/Alert/AlertMat.js";

function Users() {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState("");
  const [alertComponent, setAlert] = useState(false);
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertType, setAlertType] = useState("");



  

  const alterStatus = (event) => {
    setStatus(event.target.checked);
  };

  async function saveUser(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(headers);

    const formData = new FormData();
    formData.append("image", image[0]);

    await UserService.post("/users/photos", formData, headers)
      .then((e) => {
        const requestBody = {
          name: nome,
          userName: login,
          password: password,
          email: email,
          status: status ? 1 : 0,
          idImagem: e.data.idImage,
        };

        UserService.post("/users", requestBody, headers)
          .then((e) => {
            setAlert(true);
            setAlertMensagem(`Usuario ${e.data.name} salvo com sucesso`);
            setAlertType("success");
            setNome("");
            setLogin("");
            setPassword("");
            setEmail("");
            setStatus("");
            setImage("");
            setTimeout(() => {
              setAlert(false);
            }, 5000);
          })
          .catch((e) => {
            setAlert(true);
            setAlertMensagem(`Erro ao salvar o usuario`);
            setAlertType("error");
            setTimeout(() => {
              setAlert(false);
            }, 5000);
          });
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
          setAlertMensagem("Erro ao salvar a imagem");
          setAlertType("error");
          setTimeout(() => {
            setAlert(false);
          }, 5000);
        }
      });
  }

  return (
    <div className="main-container">
      <div className="alert">
        {alertComponent ? (
          <AlertMat type={alertType} conteudo={alertMensagem} />
        ) : (
          <div></div>
        )}
      </div>
      <h1>Cadastro de Usuarios</h1>

      <form onSubmit={saveUser}>
        <div className="grid-form">
          <TextField
            id="nome"
            label="Nome"
            multiline
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="grid-form-linha1"
          />
          <TextField
            id="login"
            label="Login"
            multiline
            className="grid-form-linha1"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <TextField
            id="password"
            label="Password"
            multiline
            className="grid-form-linha1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            id="email"
            label="Email"
            multiline
            className="grid-form-linha2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="grid-form-linha3">
            <input
              name="upload-photo"
              type="file"
              onChange={(e) => {
                setImage(e.target.files);
              }}
            />
          </div>

          <div className="grid-form-linha3">
            <span>Ativo</span>
            <Switch
              checked={status}
              onChange={alterStatus}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
        </div>

        <div className="container-button">
          <Button type="submit" variant="contained" className="buttonStyle">
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Users;

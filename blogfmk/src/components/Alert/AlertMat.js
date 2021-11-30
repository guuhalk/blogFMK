import React from "react";
import Alert from "@material-ui/core/Alert";





export default function AlertMat(props) {

  return (
    <Alert variant="filled" severity={props.type}>{props.conteudo}</Alert>
  );
}

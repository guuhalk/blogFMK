import React from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import "../Header/header.css";



export default function MenuDrawer() {

  return (
        <List className="container-list">
          <Button variant="text" className="btn-link" >
            <Link class to="/configuration/users">Usuario</Link>
          </Button>

          <Button variant="text" className="btn-link" >
            <Link class to="/Home">Home</Link>
          </Button>

          <Button variant="text" className="btn-link" >
            <Link class to="/Album">Album</Link>
          </Button>
          


        </List>
      
    );
}

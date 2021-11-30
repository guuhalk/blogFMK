import React, { useState } from "react";
import "../Header/header.css";
import logo from "../../assets/img/logo.png";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import DehazeIcon from "@material-ui/icons/Dehaze";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuDrawer from "../Header/MenuDrawer";

export default function Header() {
  const [state, setState] = useState({ left: false });


  const exit = () =>{
    localStorage.clear();
    window.location.reload();
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    
    <MenuDrawer />
    
    </Box>
  );

  return (
    <div className="nav">
      <Box>
        <AppBar position="static" className="colorBar">
          <div>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <DehazeIcon className="iconStyle" />
                </Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>

          <img src={logo} alt="logo" />

          <Button color="inherit">
            <ExitToAppIcon className="iconStyleLogOut" onClick= {exit} />
          </Button>
        </AppBar>
      </Box>
    </div>
  );
}

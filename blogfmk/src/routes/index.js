
import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from "../pages/Login/Login.js";
import Home from "../pages/Home/Home.js";
import Users from "../pages/Users/Users.js";
import Album from "../pages/Album/Album.js";


// colocar header aqui 
export default function Routes(){
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} isPrivate />
      <Route exact path="/configuration/users" component={Users} isPrivate />
      <Route exact path="/album" component={Album} isPrivate />
    </Switch>
  );
};



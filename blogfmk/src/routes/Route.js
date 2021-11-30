
import { Route, Redirect } from 'react-router-dom';
import Header from '../layouts/Header/Header.js';
import {AuthContext} from '../contexts/Auth.js';
import { useContext } from 'react';


export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}){


  const { loading } = useContext(AuthContext);
  const { logado } = useContext(AuthContext);

  if(loading){
    return(
      <div></div>
    )
  }

  if(!logado && isPrivate){
    return <Redirect to="/" />
  }

  if(logado && !isPrivate){
    return <Redirect to="/home" />
  }


  return(
    <Route
      {...rest}
      render={ props => (
        <div>
          {isPrivate ? <Header /> : "" }
            <Component {...props} />
        </div>
        
      )}
    />
  )
}
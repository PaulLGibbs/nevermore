import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import twitterLogin from "./components/twitterLogin";
import Login from "./components/login.component";
import SignUp from "./components/Signup";



import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function App() {
  return (<Router>
    <div className="App">
      {/*nav bar*/}
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/twitter-login"}>Nevermore</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {/*search bar*/}
            <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-primary">Search</Button>
    </Form>
          {/*end search bar*/}
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to={"/twitter-login"}>Twitter Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        {/* end nav bar*/}
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
          
            <Route exact path='/' component={twitterLogin} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/twitter-login" component={twitterLogin} />
          </Switch>
        </div>
        {/*Page Footer*/}
      </div>
    </div></Router>
  );
}

export default App;
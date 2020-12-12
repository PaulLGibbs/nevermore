import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';

import twLogin from "./components/twLogin";
import yourScreeches from "./components/yourScreeches";



import { FormControl, Form, Button, Nav, Navbar } from "react-bootstrap";






function App() {
  return (<Router>
    <div className="App">
      {/*nav bar*/}
      <Navbar bg="light" expand="lg">
  <Navbar.Brand href="twLogin">Nevermore</Navbar.Brand>
  <img src={logo} width="100" height="40" className="d-inline-block align-top"/>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="twLogin">Twitter Login</Nav.Link>
      <Nav.Link href="yourScreeches">Your Screeches</Nav.Link>
      <Nav.Link href="https://twitter.com/account/begin_password_reset">Forgot Password?</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
        {/* end nav bar*/}
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
          
            <Route exact path='/' component={twLogin} />
            <Route exact path='/twLogin' component={twLogin} />
            <Route exact path='/yourScreeches' component={yourScreeches} />
          </Switch>
        </div>
        {/*Page Footer*/}
      </div>
    </div></Router>
  );
}

export default App;
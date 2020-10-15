import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Button, TextField } from '@material-ui/core';
import { Nav, NavLink, Navbar } from 'reactstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC2oyYIwBwnZ-JlnGtSc0msgzLR2yg5WSE",
  authDomain: "amblor.firebaseapp.com",
  databaseURL: "https://amblor.firebaseio.com",
  projectId: "amblor",
  storageBucket: "amblor.appspot.com",
  messagingSenderId: "1057071832623",
  appId: "1:1057071832623:web:ab1028232c3d8644c730da",
  measurementId: "G-H3JHJLHTLN"
};
firebase.initializeApp(config);

ReactDOM.render(
  <React.StrictMode>
    <div className="layout">
      <Navbar className="nav-bar" color="dark" variant="dark">
        <a className="navbar-brand" href="#home">
          <img src="logo-white.svg" width="120" className="d-inline-block align-center" alt="" />
        </a>
        <Nav className="mr-auto">
          <NavLink href="#home" className="active">Home</NavLink>
          <NavLink href="#scrobbles" className="active">Scrobbles</NavLink>
          <NavLink href="#stats" className="active">Stats</NavLink>
        </Nav>
      </Navbar>

      <div className="content-layout">
        <form className="login" noValidate autoComplete="off">
          <TextField className="input form-item" id="email-input" label="Email" variant="outlined" />
          <TextField className="input form-item" id="password-input" label="Password" variant="outlined" />
          <Button className="form-item" variant="contained" color="primary" type="submit">Login</Button>
          <Button className="form-item" variant="contained" color="primary">Signup</Button>
          <Button className="form-item" variant="contained" color="primary">Login With Google</Button>
        </form>
      </div>
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);
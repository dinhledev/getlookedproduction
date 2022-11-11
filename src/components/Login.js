import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useGlobalConfigContext } from "../App";

function Login() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const axios = require("axios").default;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageConfirm, setMessageConfirm] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [logIn, setLogin] = useState(false);
  const textAlign = {
    textAlign: "left",
    color: "#000000",
  };
  const signUp = {
    marginTop: "10px",
  };
  const signUpLink = {
    color: "#2580F6",
  };

  const messageConfirmStyle = {
    color: "red",
  };

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post( serverDomain+"/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
        setLogin(false);
        setMessageConfirm("Invalid email and/or password!");
      } else {
        setLoginStatus(response.data[0].email);
        setLogin(true);
        console.log("FINISHED");
        history.push("/home");
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    document.title = "Login";  
    Axios.get( serverDomain+"/login").then((response) => {
      if (response.data.loggedIn == true) {
        history.push("/home");
      } 
    });
  }, []);

  return (
    <div className="container Login">
      <div className="signInHeader">Log In</div>
      <Navbar
        className = "navbar-custom"
        variant="dark"
        fixed="top"
        expand="lg"
        collapseOnSelect
      >
        <Navbar.Brand>GetLooked</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Form>
      <Form.Label style={messageConfirmStyle}>{messageConfirm}</Form.Label>
        <Form.Group
          style={textAlign}
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group
          style={textAlign}
          className="mb-3"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button className="fullWidth" variant="primary" onClick={login}>
          Login
        </Button>
        <div style={signUp}>
          Not a registered user?{" "}
          <a href="/register" style={signUpLink}>
            Sign up{" "}
          </a>{" "}
          here
        </div>
        <div style={signUp}>
          Forgot Password?{" "}
          <a href="/forgotpassword/" style={signUpLink}>
            Reset password{" "}
          </a>{" "}
          here
        </div>
      </Form>
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
//import { withCookies, Cookies } from 'react-cookie';
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";

function About() {
  useEffect(() => {
    document.title = "About Us";  
  }, []);
  return (
    <div className="about">
      <Navbar
        className = "navbar-custom"
        variant="dark"
        fixed="top"
        expand="lg"
        collapseOnSelect
      >
        <Navbar.Brand>Reentry and Corrections</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h1>About Us Page</h1>
    </div>
  );
}

export default About;

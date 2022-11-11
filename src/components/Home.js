import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
//import { withCookies, Cookies } from 'react-cookie';
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Card,
  Button,
} from "react-bootstrap";
import { Redirect } from "react-router";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import housing from "../images/housing.jpg";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasB } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farB } from "@fortawesome/free-regular-svg-icons";
import Popup from "../common/Popup";
import CommonNav from "../common/CommonNav";
import { useGlobalConfigContext } from "../App";

function Home() {
  const serverDomain = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState(false);
  const cookieExists = (document.cookie.match(
    /^(?:.*;)?\s*userId\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];
  Axios.defaults.withCredentials = true;
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.title = "Home";
    Axios.get(serverDomain + "/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginUser(response.data.user[0].username);
        setData(response.data);
      } else {
        history.push("/login");
      }
    });
  }, []);

  return (
    <>
      <CommonNav />
      {/* BEGIN edit layout here */}
      <div className="container home">
        <div class="p-5 text-center bg-image rounded-3 customerImage">
          <div class="mask maskCustom">
            <div class="d-flex justify-content-center align-items-center h-100 p-3">
              <div class="text-white">
                <h1 class="mb-3">Get looked at by recruiters!</h1>
                <h4 class="mb-3">
                  register now to connect with coaches and scouts
                </h4>
                <a
                  class="btn btn-outline-light btn-lg"
                  href="sign-up.html"
                  role="button"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4">
            <h3>News</h3>
            <p>
              Test Lorem ipsum dolor sit amet, consectetur adipisicing elit...
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris...
            </p>
          </div>
          <div className="col-sm-4">
            <h3>Featured</h3>
            <p>
              Test Lorem ipsum dolor sit amet, consectetur adipisicing elit...
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris...
            </p>
          </div>
          <div class="col-sm-4">
            <h3>Schools</h3>
            <p>
              Test Lorem ipsum dolor sit amet, consectetur adipisicing elit...
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris...
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 p-4 bg-dark text-white text-center">
        <p>GetLooked © 2022</p>
      </div>
    {/* END edit layout here */}
    </>
  );
}

export default Home;

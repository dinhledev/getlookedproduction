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

function MyPlans() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState(false);
  const [orgData, setOrgData] = useState([]);
  const [favData, setFavData] = useState([]);
  const [unit_org, setUnitOrgData] = useState([]);
  const cookieExists = (document.cookie.match(
    /^(?:.*;)?\s*userId\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];
  Axios.defaults.withCredentials = true;
  const [active, setActive] = useState(false);

  const logoutUser = () => {
    Axios.post(serverDomain+"/logout", {}, { withCredentials: "true" });
    history.push("/login");
    window.location.reload();
  };

  const houseFunc = () => {
    history.push("/housingPlan");
    window.location.reload();
  };
  const employFunc = () => {
    history.push("/employmentPlan");
    window.location.reload();
  };
  const mentalHealthFunc = () => {
    history.push("/mentalHealthPlan");
    window.location.reload();
  };
  const substanceUseFunc = () => {
    history.push("/substanceUsePlan");
    window.location.reload();
  };

  useEffect(() => {
    document.title = "My Plans";  
    Axios.get(serverDomain+"/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginUser(response.data.user[0].username);
        setData(response.data);
      } else {
        history.push("/login");
      }
    });
  }, []);

  return (
    <div className="container home">
      <CommonNav />
      <div className="row justify-content-center">
        <div className="">
          <Card style={{ cursor: "pointer" }} onClick="">
            <Card.Body>
              <Card.Title className="cardTitleCustom">My Plans</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row justify-content-center MyPlanCustom">
        <div className="col-4">
          <Card style={{ cursor: "pointer" }} onClick={houseFunc}>
            <Card.Img
              style={{ width: "100%", height: "10rem" }}
              variant="top"
              src={housing}
            />
            <Card.Body>
              <Card.Title>Housing Plan</Card.Title>
              <Button className="fullWidth" variant="primary">
                Continue
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>

    </div>
  );
}

export default MyPlans;

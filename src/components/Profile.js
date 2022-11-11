import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
//import { withCookies, Cookies } from 'react-cookie';
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, NavDropdown, NavItem, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useGlobalConfigContext } from "../App";
import CommonNav from "../common/CommonNav";

function Profile() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState("");
  const [profileData, setProfileData] = useState([]);
  const cookieExists = (document.cookie.match(
    /^(?:.*;)?\s*userId\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];

  Axios.defaults.withCredentials = true;

  const logoutUser = () => {
    Axios.post( serverDomain+"/logout", {}, { withCredentials: "true" });
    history.push("/login");
    window.location.reload();
  };

  const editProfileFunc = () => {
    history.push("/editProfile");
    window.location.reload();
  };

  useEffect(() => {
    document.title = "Profile";  
    Axios.get( serverDomain+"/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginUser(response.data.user[0].username);
        setData(response.data);
        Axios.get( serverDomain+"/profile").then((response) => {
          setProfileData(response.data);
          console.log(response);
        });
      } else {
        history.push("/login");
      }
    });
  }, []);

  return (
    <div className="">
      <CommonNav />
      {profileData.length >= 0
        ? profileData.map(function(user) {
            return (
              <div className="container Profile">
                <div className="header">{loggedInUser}'s Profile</div>
                <div className="body">
                  <div className="section">
                    Date of Birth : {user.dob.length > 0 ? user.dob : "N/A"}
                  </div>
                  <div className="section">
                    Facility Name :{" "}
                    {user.facility_name.length > 0 ? user.facility_name : "N/A"}
                  </div>
                  <div className="section">
                    Offense : {user.offense.length > 0 ? user.offense : "N/A"}
                  </div>
                  <div className="section">
                    Sentence Length :{" "}
                    {user.sentence_length > 0
                      ? user.sentence_length + " year(s)"
                      : "N/A"}
                  </div>
                  <div className="section">
                    SSN : {user.ssn > 0 ? "Yes" : "No"}
                  </div>
                  <div className="section">
                    Photo Id : {user.photo_id > 0 ? "Yes" : "No"}
                  </div>
                  <div className="section">
                    Birth Certificate :{" "}
                    {user.birth_certificate > 0 ? "Yes" : "No"}
                  </div>
                  <div className="section">
                    Gender : {user.gender.length > 0 ? user.gender : "N/A"}
                  </div>
                  <div className="section">
                    Dom violence : {user.dom_violence > 0 ? "Yes" : "No"}
                  </div>
                  <div className="section">
                    Has kids : {user.has_kids > 0 ? "Yes" : "No"}
                  </div>
                  <div className="section">
                    Medical Condition :{" "}
                    {user.medical_condition > 0 ? "Yes" : "No"}
                  </div>
                  <div className="section">
                    Mental Health : {user.mental_health > 0 ? "Yes" : "No"}
                  </div>
                  <div className="section">
                    Substance Disorder :{" "}
                    {user.substance_disorder > 0 ? "Yes" : "No"}
                  </div>
                  <Button
                    className="edit"
                    variant="primary"
                    onClick={editProfileFunc}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            );
          })
        : history.push("/login")}
    </div>
  );
}

export default Profile;

import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
//import { withCookies, Cookies } from 'react-cookie';
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, NavDropdown, NavItem, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import Select from "../common/Dropdown";
import { useGlobalConfigContext } from "../App";

function EditProfile() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState("");
  const [profileData, setProfileData] = useState([]);

  const [DOBReg, setDOBReg] = useState("");
  const facilityList = ["N/A","DC jail",];
  const [facilityReg, setFacilityReg] = useState(facilityList[0]);
  const offenseList = ["N/A", "Felony", "Misdemeanor", "Infraction"];
  const [offenseReg, setOffenseReg] = useState(offenseList[0]);
  const sentenceList = Array.from(Array(101).keys());
  const [sentenceReg, setSentenceReg] = useState("");
  const [ssnReg, setSSNReg] = useState(0);
  const [photoIddReg, setPhotoIddReg] = useState(0);
  const [birthCertificateReg, setBirthCertificateReg] = useState(0);

  const genderList = ["N/A", "Male", "Female", "Other"];
  const [genderReg, setGenderReg] = useState(genderList[0]);

  const [domViolenceReg, setDomViolenceReg] = useState(0);
  const [hasKidsReg, setHasKidsReg] = useState(0);
  const [medicalConditionReg, setMedicalConditionReg] = useState(0);
  const [mentalHealthReg, setMentalHealthReg] = useState(0);
  const [substanceDisorderReg, setSubstanceDisorderReg] = useState(0);

  const cookieExists = (document.cookie.match(
    /^(?:.*;)?\s*userId\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];

  Axios.defaults.withCredentials = true;

  const logoutUser = () => {
    Axios.post( serverDomain+"/logout", {}, { withCredentials: "true" });
    history.push("/login");
    window.location.reload();
  };

  const cancelEditFunc = () => {
    history.push("/profile");
    window.location.reload();
  };

  const edit = () => {
    Axios.post( serverDomain+"/profile/editProfile", {
      dob: DOBReg.length > 0 ? DOBReg : profileData[0].dob,
      facility_name:
        facilityReg.length > 0 ? facilityReg : profileData[0].facility_name,
      offense: offenseReg.length > 0 ? offenseReg : profileData[0].offense,
      sentence_length:
        sentenceReg.length > 0 ? sentenceReg : profileData[0].sentence_length,
      ssn: ssnReg,
      photo_id: photoIddReg,
      birth_certificate: birthCertificateReg,
      gender: genderReg.length > 0 ? genderReg : profileData[0].gender,
      dom_violence: domViolenceReg,
      has_kids: hasKidsReg,
      medical_condition: medicalConditionReg,
      mental_health: mentalHealthReg,
      substance_disorder: substanceDisorderReg,
    }).then((response) => {
      console.log("User Profile Updated: ", response);
      history.push("/profile");
    });
  };

  useEffect(() => {
    document.title = "Edit Profile";  
    Axios.get( serverDomain+"/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginUser(response.data.user[0].username);
        setData(response.data);

        Axios.get( serverDomain+"/profile").then((response) => {
          setFacilityReg(response.data[0].facility_name);
          setOffenseReg(response.data[0].offense);
          setSentenceReg(response.data[0].sentence_length);
          setSSNReg(response.data[0].ssn);
          setPhotoIddReg(response.data[0].photo_id);
          setBirthCertificateReg(response.data[0].birth_certificate);
          setGenderReg(response.data[0].gender);
          setDomViolenceReg(response.data[0].dom_violence);
          setHasKidsReg(response.data[0].has_kids);
          setMedicalConditionReg(response.data[0].medical_condition);
          setMentalHealthReg(response.data[0].mental_health);
          setSubstanceDisorderReg(response.data[0].substance_disorder);
          setProfileData(response.data);
        });
      } else {
        history.push("/login");
      }
    });
  }, []);

  return (
    <div className="editProfile">
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
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Organizations" id="navbarScrollingDropdown">
              <NavDropdown.Item href="housing">
                Housing Organizations
              </NavDropdown.Item>
              <NavDropdown.Item href="/employment">
                Employment Organizations
              </NavDropdown.Item>
              <NavDropdown.Item href="/basicNeeds">
                Basic Needs
              </NavDropdown.Item>
              <NavDropdown.Item href="/health">
                Health Organizations
              </NavDropdown.Item>
              <NavDropdown.Item href="/hotline">
                Hotline Services
              </NavDropdown.Item>
              <NavDropdown.Item href="/information">
                Social Service Information
              </NavDropdown.Item>
              <NavDropdown.Item href="/mentalHealth">
                Mental Health Organizations
              </NavDropdown.Item>
              <NavDropdown.Item href="/substanceUse">
                Substance Use Services
              </NavDropdown.Item>
              <NavDropdown.Item href="/universal">
                Universal Services
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link onClick={logoutUser}> Logout </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {profileData.length >= 0
        ? profileData.map(function(user) {
            return (
              <div className="container Profile">
                <div className="header">{loggedInUser}'s Profile</div>
                <div className="section">
                  <div className="pt-2 pb-2">Date Of Birth</div>
                  <input
                    type="date"
                    defaultValue={user.dob}
                    onChange={(e) => {
                      setDOBReg(e.target.value);
                    }}
                  />
                  <div className="pt-2 pb-2">Facility Name</div>
                  <Select
                    value={facilityReg}
                    handleChange={(e) => setFacilityReg(e.target.value)}
                    data={facilityList}
                  />
                  <div className="pt-2 pb-2">Do you have a felony offense?</div>
                  <Select
                    value={offenseReg}
                    handleChange={(e) => setOffenseReg(e.target.value)}
                    data={offenseList}
                  />
                  <div className="pt-2 pb-2">Sentence Length</div>
                  <Select
                    value={sentenceReg}
                    handleChange={(e) => setSentenceReg(e.target.value)}
                    data={sentenceList}
                  />{" "}
                  <span> &nbsp;year(s)</span>
                  <div className="pt-2 pb-2">Do you have</div>
                  <input
                    type="checkbox"
                    value={ssnReg}
                    defaultChecked={ssnReg === 1}
                    onChange={(e) => {
                      setSSNReg(ssnReg === 1 ? 0 : 1);
                    }}
                  />
                  <span> SSN Card? </span>
                  <div className="pt-2 pb-2"></div>
                  <input
                    type="checkbox"
                    value={photoIddReg}
                    defaultChecked={photoIddReg === 1}
                    onChange={(e) => {
                      setPhotoIddReg(photoIddReg === 1 ? 0 : 1);
                    }}
                  />
                  <span> Photo ID? </span>
                  <div className="pt-2 pb-2"></div>
                  <input
                    type="checkbox"
                    value={birthCertificateReg}
                    defaultChecked={birthCertificateReg === 1}
                    onChange={(e) => {
                      setBirthCertificateReg(birthCertificateReg === 1 ? 0 : 1);
                    }}
                  />
                  <span> Birth certificate? </span>
                  <div className="pt-2 pb-2">
                    What gender do you identify as?
                  </div>
                  <Select
                    value={genderReg}
                    handleChange={(e) => setGenderReg(e.target.value)}
                    data={genderList}
                  />
                  <div className="pt-2 pb-2">
                    Are you a survivor of domestice violence?
                  </div>
                  <input
                    type="checkbox"
                    value={domViolenceReg}
                    defaultChecked={domViolenceReg === 1}
                    onChange={(e) => {
                      setDomViolenceReg(domViolenceReg === 1 ? 0 : 1);
                    }}
                  />
                  <div className="pt-2 pb-2">Do you have </div>
                  <input
                    type="checkbox"
                    value={hasKidsReg}
                    defaultChecked={hasKidsReg === 1}
                    onChange={(e) => {
                      setHasKidsReg(hasKidsReg === 1 ? 0 : 1);
                    }}
                  />
                  <span> Kids under the age of 18?</span>
                  <div className="pt-2 pb-2"></div>
                  <input
                    type="checkbox"
                    value={medicalConditionReg}
                    defaultChecked={medicalConditionReg === 1}
                    onChange={(e) => {
                      setMedicalConditionReg(medicalConditionReg === 1 ? 0 : 1);
                    }}
                  />
                  <span> A medical condition?</span>
                  <div className="pt-2 pb-2"></div>
                  <input
                    type="checkbox"
                    value={mentalHealthReg}
                    defaultChecked={mentalHealthReg === 1}
                    onChange={(e) => {
                      setMentalHealthReg(mentalHealthReg === 1 ? 0 : 1);
                    }}
                  />
                  <span> Mental health diagnosis?</span>
                  <div className="pt-2 pb-2"></div>
                  <input
                    type="checkbox"
                    value={substanceDisorderReg}
                    defaultChecked={substanceDisorderReg === 1}
                    onChange={(e) => {
                      setSubstanceDisorderReg(
                        substanceDisorderReg === 1 ? 0 : 1
                      );
                    }}
                  />
                  <span> Substance use disorder?</span>
                </div>
                <div className="mt-3">
                  <Button
                    variant="primary"
                    className="cancel"
                    onClick={cancelEditFunc}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" className="submit" onClick={edit}>
                    Submit
                  </Button>
                </div>
              </div>
            );
          })
        : history.push("/login")}
    </div>
  );
}

export default EditProfile;

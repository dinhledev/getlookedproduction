import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Form, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import { useGlobalConfigContext } from "../App";

function ForgotPassword() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [usernameReg, setUernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
  const [DOBReg, setDOBReg] = useState("");
  const [facilityReg, setFacilityReg] = useState("");
  const [offenseReg, setOffenseReg] = useState("");
  const [sentenceReg, setSentenceReg] = useState(0);
  const [messageConfirm, setmessageConfirm] = useState("");

  const [securityQuestion1Reg, setSecurityQuestion1Reg] = useState("");
  const [securityQuestion2Reg, setSecurityQuestion2Reg] = useState("");
  const [securityQuestion3Reg, setSecurityQuestion3Reg] = useState("");
  const [securityAnswer1Reg, setSecurityAnswer1Reg] = useState("");
  const [securityAnswer2Reg, setSecurityAnswer2Reg] = useState("");
  const [securityAnswer3Reg, setSecurityAnswer3Reg] = useState("");
  const [username, setUserNameReset] = useState("");
  const [profileData, setProfileData] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const messageConfirmStyle = {
    color: "red",
  };

  const updatePassword = () => {
    Axios.post( serverDomain+"/forgotPassword/updatePassword", {
      username: username,
      password: newPassword,
    }).then((response) => {
      console.log(response);
      history.push("/login");
    });
  };

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

  Axios.defaults.withCredentials = true;
  const resetPassword = () => {
    if (securityAnswer1Reg.length == 0) {
      setmessageConfirm("Please input all anwsers!");
    } else if (
      profileData[0].answer_1 == securityAnswer1Reg &&
      profileData[0].answer_2 == securityAnswer2Reg &&
      profileData[0].answer_3 == securityAnswer3Reg
    ) {
      setShow(true);
    } else {
      setmessageConfirm("Answers have not matched!");
    }
  };

  const loadSecQuestionsByUserName = () => {
    Axios.post(
       serverDomain+"/forgotPassword/getSecQuestionbyUsername",
      {
        username: username,
      }
    ).then((response) => {
      setProfileData(response.data);
      console.log(response);
    });
  };

  useEffect(() => {
    document.title = "Forgot Password";  

  }, []);
  return (
    <div className="container Registration">
      <div className="signInHeader">Reset Password</div>
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {profileData.length > 0 ? (
        profileData.map(function(user) {
          return (
            <Form>
              <Form.Group
                style={textAlign}
                className="mb-3"
                controlId="formBasicEmail"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  readonly
                  value={user.username.length > 0 ? user.username : "N/A"}
                />
              </Form.Group>
              <Form.Group
                style={textAlign}
                className="mb-3"
                controlId="formBasicQuestion1"
              >
                <Form.Label>Security Question 1</Form.Label>
                <Form.Control
                  type="text"
                  readonly
                  value={
                    user.security_question_1.length > 0
                      ? user.security_question_1
                      : "N/A"
                  }
                />
              </Form.Group>
              <Form.Group
                style={textAlign}
                className="mb-3"
                controlId="formBasicAnswer1"
              >
                <Form.Label>Security Answer 1</Form.Label>
                <Form.Control
                  type="text"
                  readonly
                  placeholder="Security Answer 1"
                  onChange={(e) => {
                    setSecurityAnswer1Reg(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                style={textAlign}
                className="mb-3"
                controlId="formBasicQuestion2"
              >
                <Form.Label>Security Question 2</Form.Label>
                <Form.Control
                  type="text"
                  readonly
                  value={
                    user.security_question_2.length > 0
                      ? user.security_question_2
                      : "N/A"
                  }
                />
              </Form.Group>
              <Form.Group
                style={textAlign}
                className="mb-3"
                controlId="formBasicAnswer2"
              >
                <Form.Label>Security Answer 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Security Answer 2"
                  onChange={(e) => {
                    setSecurityAnswer2Reg(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                style={textAlign}
                className="mb-3"
                controlId="formBasicQuestion3"
              >
                <Form.Label>Security Question 3</Form.Label>
                <Form.Control
                  type="text"
                  readonly
                  value={
                    user.security_question_3.length > 0
                      ? user.security_question_3
                      : "N/A"
                  }
                />
              </Form.Group>
              <Form.Group
                style={textAlign}
                className="mb-3"
                controlId="formBasicAnswer3"
              >
                <Form.Label>Security Answer 3</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Security Answer 3"
                  onChange={(e) => {
                    setSecurityAnswer3Reg(e.target.value);
                  }}
                />
              </Form.Group>

              <Button
                className="fullWidth"
                variant="primary"
                onClick={resetPassword}
              >
                Reset Password
              </Button>
            </Form>
          );
        })
      ) : (
        <Form>
          <Form.Group
            style={textAlign}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>Enter your user name to reset password</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setUserNameReset(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            className="fullWidth"
            variant="primary"
            onClick={loadSecQuestionsByUserName}
          >
            Next
          </Button>
        </Form>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update new password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>New password</Form.Label>
              <Form.Control
                name="newPassword"
                type="password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                name="newPasswordConfirm"
                type="password"
                onChange={(e) => {
                  setNewPasswordConfirm(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updatePassword}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Form.Label style={messageConfirmStyle}>{messageConfirm}</Form.Label>
    </div>
  );
}
export default ForgotPassword;

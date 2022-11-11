import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
  Card,
  Button,
} from "react-bootstrap";
import classNames from "classnames";
function CommonOrgPageHeader({tittlePage}) {
  return (
    <div className="row justify-content-center">
      <div className="">
        <Card style={{ cursor: "pointer" }} onClick="">
          <Card.Body>
            <Card.Title className="cardTitleCustom">
             {tittlePage}
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CommonOrgPageHeader;

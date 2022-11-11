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
import favorites from "../images/favorites.jpg";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasB } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farB } from "@fortawesome/free-regular-svg-icons";
import Popup from "../common/Popup";
import CommonNav from "../common/CommonNav";
import { useGlobalConfigContext } from "../App";
import Pagination from "react-bootstrap/Pagination";

function Favorites() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState("");
  const [unit_org, setUnitOrgData] = useState([]);
  const [active, setActive] = useState(false);
  const [favData, setFavData] = useState([]);

  //TODO add const paging
    // const for paging
    const [offset, setOffset] = useState(0);
    const [orgData, setOrgData] = useState([]);
    const [perPage] = useState(4);
    const [pageCount, setPageCount] = useState(0);
    const [selectedPage, setselectedPage] = useState(1);
    const [totalOrg, setTotalOrg] = useState(0);
    const nextClickPaging = (e) => {
      setOffset(offset + perPage);
      setselectedPage(selectedPage + 1);
    };
    const lastClickPaging = (e) => {
      if (totalOrg % perPage == 0) {
        setOffset(totalOrg - perPage);
      } else {
        setOffset(totalOrg - (totalOrg % perPage));
      }
      setselectedPage(pageCount);
    };
  
    const preClickPaging = (e) => {
      setOffset(offset - perPage);
      setselectedPage(selectedPage - 1);
    };
    const firstClickPaging = (e) => {
      setOffset(0);
      setselectedPage(1);
    };
    const handleChangePoupFilterByPhotoID = () => {
      setChecked(!checked);
      setOffset(0)
      setselectedPage(1);
    };
    // end const for paging

  Axios.defaults.withCredentials = true;
  const cookieExists = (document.cookie.match(
    /^(?:.*;)?\s*userId\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];
  /* add by dinhle */
  const [buttonPoup, setButtonPoup] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };
  const logoutUser = () => {
    Axios.post( serverDomain+"/logout", {}, { withCredentials: "true" });
    history.push("/login");
    window.location.reload();
  };

  const getOrganizations = (id) => {
    Axios.get( serverDomain+"/favorites/" + id).then((response) => {
      setActive(id);
      setUnitOrgData(response.data[0]);
    });
  };

  const checkActive = (id) => {
    return id === active;
  };

  const removeFromFavorites = (obj) => {
    Axios.delete( serverDomain+"/favorites/", {
      data: {
        organization_id: obj.org_id,
      },
    })
      .then(function(response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getFavOrganizations = () => {
    Axios.get( serverDomain+"/favorites/").then((response) => {
      setFavData(response.data);
    });
  };
  const getInit = (orgId) => {
    if (!checked) {
      Axios.get( serverDomain+"/favorites/").then((response) => {
        setTotalOrg(response.data.length);
        setPageCount(Math.ceil(response.data.length / perPage));
      });
      Axios.post( serverDomain+"/favorites/paging/", {
        offset: offset,
        perPage: perPage,
      }).then((response) => {
        if(response.data.length > 0) {
          setOrgData(response.data);
          if (orgId <= 0) {
            orgId = response.data[0].org_id;
          }
          getOrganizations(orgId);
        }
      });
    } else {
      Axios.get( serverDomain+"/favorites/hasID/").then(
        (response) => {
          setTotalOrg(response.data.length);
          setPageCount(Math.ceil(response.data.length / perPage));
        }
      );
      Axios.post( serverDomain+"/favorites/hasIDPaging", {
        offset: offset,
        perPage: perPage,
      }).then((response) => {
        if(response.data.length > 0) {
          setOrgData(response.data);
          if (orgId <= 0) {
            orgId = response.data[0].org_id;
          }
          getOrganizations(orgId);
        }
      });
    }
  };
  useEffect(() => {
    document.title = "Favorites";  
    Axios.get( serverDomain+"/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginUser(response.data.user[0].username);
        setData(response.data);
        getInit(0)
      } else {
        history.push("/login");
      }
    });


  }, [offset,checked]);

  if (loggedInUser.length > 0) {
    console.log("User Logged In");
  } else {
    console.log("user not logged in");
  }

  return (
    <div className="container home">
      <CommonNav />
      <div className="row justify-content-center">
        <div className="">
          <Card style={{ cursor: "pointer" }} onClick="">
            <Card.Body>
              <Card.Title className="cardTitleCustom">Favorites</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="org_filter">
        <main>
            <Button
              className="fullWidth"
              variant="primary"
              onClick={() => setButtonPoup(true)}
            >
              Filter Organizations
            </Button>
        </main>

        <Popup trigger={buttonPoup} setTrigger={setButtonPoup}>
          <span>Filter by: </span>
          <br></br>
          <Checkbox
            label="Photo ID"
            value={checked}
            onChange={handleChangePoupFilterByPhotoID}
          />
        </Popup>
      </div>

      {totalOrg > 0 ? (
        <div className="homeDisplay">
          <div className="disp1">
            <h5>Total Organizations: {totalOrg}</h5>
            {orgData.map(function(org) {
              if (loggedInUser.length == 0) {
                history.push("/login");
              }
              return (
                <div
                  onClick={() => getOrganizations(org.org_id)}
                  className={classNames({
                    ldisp: true,
                    active: checkActive(org.org_id),
                  })}
                >
                  <div className="ttl">{org.name}</div>
                  <div className="subttl">{org.type}</div>
                </div>
              );
            })}
          </div>
          <div className="disp2">
            <div className="root">
              <span className="child">
                <FontAwesomeIcon
                  onClick={() => removeFromFavorites(unit_org)}
                  icon={fasB}
                />
              </span>
            </div>

            <div className="section">
              <div className="secttl">Organization</div>
              <div className="secsubttl">{unit_org.name}</div>
            </div>
            <div className="section">
              <div className="secttl">Address</div>
              <div className="secsubttl">{unit_org.address}</div>
            </div>
            <div className="section">
              <div className="secttl">Zip Code</div>
              <div className="secsubttl">{unit_org.zip_code}</div>
            </div>
            <div className="section">
              <div className="secttl">Type</div>
              <div className="secsubttl">{unit_org.type}</div>
            </div>
            <div className="section">
              <div className="secttl">Description</div>
              <div className="secsubttl">{unit_org.description}</div>
            </div>
            <div className="section">
              <div className="secttl">Services</div>
              <div className="secsubttl">{unit_org.services}</div>
            </div>
            <div className="section">
              <div className="secttl">Criteria</div>
              <div className="secsubttl">{unit_org.criteria}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="singleDisplay">
          <h3>There is no favorites</h3>
        </div>
      )}
        <div className="pagingWrap">
          <Pagination>
            {selectedPage <= 1 ? (
              <Pagination.First disabled />
            ) : (
              <Pagination.First onClick={() => firstClickPaging()} />
            )}

            {selectedPage <= 1 ? (
              <Pagination.Prev disabled />
            ) : (
              <Pagination.Prev onClick={() => preClickPaging()} />
            )}
            <Pagination.Item>
              page {selectedPage} of {pageCount}
            </Pagination.Item>

            {selectedPage >= pageCount ? (
              <Pagination.Next disabled />
            ) : (
              <Pagination.Next onClick={() => nextClickPaging()} />
            )}

            {selectedPage >= pageCount ? (
              <Pagination.Last disabled />
            ) : (
              <Pagination.Last onClick={() => lastClickPaging()} />
            )}
          </Pagination>
        </div>
    </div>
  );
}

export default Favorites;

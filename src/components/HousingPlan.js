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

function HousingPlan() {
  const serverDomain   = useGlobalConfigContext()["serverDomain"];
  const history = useHistory();
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState("");
  const [unit_org, setUnitOrgData] = useState([]);
  const [active, setActive] = useState(false);
  const [favData, setFavData] = useState([]);

  Axios.defaults.withCredentials = true;
  const cookieExists = (document.cookie.match(
    /^(?:.*;)?\s*userId\s*=\s*([^;]+)(?:.*)?$/
  ) || [, null])[1];
  /* add by dinhle */
  // const for paging
  const [offset, setOffset] = useState(0);
  const [orgData, setOrgData] = useState([]);
  const [perPage] = useState(3);
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
  // end const for paging

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


  useEffect(() => {
    document.title = "Housing Plan";  
    Axios.get( serverDomain+"/login").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginUser(response.data.user[0].username);
        setData(response.data);
        Axios.get( serverDomain+"/favorites/housingPlanAll/").then((response) => {
          console.log("size " + response.data.length)
          setTotalOrg(response.data.length);
          setPageCount(Math.ceil(response.data.length / perPage));
        });
        Axios.post( serverDomain+"/favorites/housingPlanPaging/", {
          offset: offset,
          perPage: perPage,
        }).then((response) => {
          setOrgData(response.data);
          console.log(response.data);
        });
      } else {
        history.push("/login");
      }
    });
  }, [offset]);
  return (
    <div className="container home">
      <CommonNav />
      <div className="row justify-content-center">
        <div className="">
          <Card style={{ cursor: "pointer" }} onClick="">
            <Card.Body>
              <Card.Title className="cardTitleCustom">Housing Plan</Card.Title>
            </Card.Body>
          </Card>
        </div>
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
                  <div className="subSecond">{org.address}</div>
                  <div className="subttl">{org.type}</div>
                </div>
              );
            })}
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
          <div className="disp2">
            <h3>Finding Housing In Your Area Starts With You</h3>
            <p>
            <u><h6>Talk to your support system about housing!</h6></u>
            <p>
            The people around you have experience 
            searching for housing. You should rely on their experience and ask 
            them to get information on local housing resources for you.
            </p>
            <u><h6>Keep Track of Potential Housing</h6></u>
            <p>
            Once you have started to find potential places to live, <b>make a list of organizations that would be interested in working with.</b>
            Call these organizations to see if it is a good fit for you!
            </p>
            <u><h6>Visiting Potential Permanent Places to Live</h6></u>
            <p>
            When you go for the tour, make sure to be on the lookout for things 
            that are good and bad. There are many things that property owners usually ask for 
            when looking at your application such as identification (driver’s license, state ID), 
            a credit check, proof of employment or vouchers, and possibly criminal history. 
            Find out what each property owner requires. It is not easy to find housing with a 
            criminal background. 
            <u>Do not let this discourage you!</u> <b>The following tips can help you face this challenge:</b>
            <ul>
              <li><b>Make a good first impression.</b> Go to your appointment with a positive attitude. 
                Be sincere, polite and patient. It is important that the potential landlord 
                believes she/he could have a positive relationship with you.</li>
              <li><b>Be honest.</b> If asked, be honest and let potential landlords know about your criminal 
                record. Explain briefly what you were convicted for and avoid taking a defensive tone. 
                Answer any questions the landlord asks. Explain what you have learned from your past 
                and why you would be a good tenant today. Focus on asking questions relating to your 
                housing needs only.
              </li>
              <li><b>Be confident.</b> Not every landlord is going to be accepting. Focus on what you can 
                control—making a good impression—and if it does not work out, then move on to the next 
                housing opportunity.
              </li>
            </ul>
            </p>
            <u><h6>The following are some questions you may want to ask when looking at a new place:</h6></u>
            <p>
            <ul>
              <li>Does it have a washer and dryer (either in-unit or on the property)?</li>
              <li>Are utilities included in the monthly fees or are they separately charged?</li>
              <li>Is renter’s insurance required? If so, how much?</li>
              <li>Are pets allowed? If so, is there a fee?</li>
              <li>Is there an application or administrative fee upfront?</li>
              <li>Is there a fee if you need to break your lease for any reason?</li>
              <li>Is there a fee if your late paying rent one month?</li>
              <li>Is the place in good, clean condition? Is anything damaged or broken?</li>
              <li>Is there enough space for my family and others living with me, including pets?</li>
              <li>Is this place near public transportation such as the metro or bus stop, if needed?</li>
            </ul>
            </p>
            <u><h6>You found a place to live! What’s next?</h6></u>
            <p>
            Make sure you review and sign a lease with your landlord to protect yourself. 
            The lease should list several important things.
            </p>

            <h4>FAQ</h4>
        <b>1. What is public housing?</b>
        <p>Public housing programs are run by the U.S. Department of Housing and Urban Development also referred to as HUD, 
          which provides safe and decent housing for low-income families, the elderly, and people with disabilities. Some people may not be eligible for public housing based on their criminal record; 
          check with the staff member you are working with to make sure you are eligible to apply.
        </p>
        <b>How can I apply for public housing?</b>
        <p>The U.S. Department of Housing and Urban Development was created to provide quality and affordable housing for all Americans. Click on the “State Info” link and find your state for a more detailed look at how HUD can help you.
           If you are interested in getting assistance with finding housing, head over to http://www.hud.gov/offices/hsg/sfh/hcc/hcs.cfm.
        </p>
        <b>What are Section 8 Vouchers?</b>
        <p>Public Housing Agencies can provide help obtaining public housing or Section 8 vouchers. These vouchers can be used to help you pay rent in private apartments. Most housing assistance programs are local, meaning that you need to find out what programs exist in your area. 
          You can find your local public housing agency by searching online using terms such as “(your town or city’s) Public Housing Agency.”
        </p>

            </p>
          </div>
        </div>
      ) : (
        <div className="singleDisplay">
          <h3>There is no favorites</h3>
        </div>
      )}
    </div>
  );
}

export default HousingPlan;

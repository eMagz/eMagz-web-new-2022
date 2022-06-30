import React, { useState } from "react";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Badge from "@material-ui/core/Badge";
import "./index.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

import blueIcon from "../../../../assets/blueLogo.png";
import circleIcon from "../../../../assets/CircleLogo.png";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useSelector((state) => ({ ...state }));

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar color="light" expand="md">
        <div className="leftIcon">
          <div className="circleIcon">
            <img src={circleIcon} alt="" />
          </div>
          <div className="blueIcon">
            <img src={blueIcon} alt="" />
          </div>
          <div className="headertext">
            <h5>eMAGZ</h5>
            <p>connecting universe</p>
          </div>
        </div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <div class="navRight">
              <div className="verticalLine"></div>
              <div className="downloadText">
                <p>Explore the powerful eBusiness Solution</p>
                <b className="downloadBoldText">(Download App)</b>
              </div>
            </div>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;

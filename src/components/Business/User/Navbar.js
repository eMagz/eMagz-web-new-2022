import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Badge from "@material-ui/core/Badge";
import { Link, withRouter } from "react-router-dom";
import "./index.css";
import { useHistory } from "react-router";
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
import userIcon from "../../../assets/User.png";
import cartIcon from "../../../assets/cart.png";
import searchIcon from "../../../assets/search.png";
import blueIcon from "../../../assets/blueLogo.png";
import circleIcon from "../../../assets/CircleLogo.png";
import { ContactSupportOutlined } from "@material-ui/icons";
import {api} from '../../API'
const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchData,setSearchData] = useState("");
  const { cart } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  const toggle = () => setIsOpen(!isOpen);
  console.log("props", props.getSearchData);
  const getSearchData = (e)=>{
        api.get(`/search-product/${e}`).then((res) => {
          console.log("response", res);
          setSearchData(res.data.data.productDetails);
        })
  }
  console.log("search data",searchData);  
  return (
    <>
      <Navbar className="navColor" id="navBar" light expand="md">
        <div className="leftIcon">
          <div className="circleIcon">
            <img src={circleIcon} alt="" />
          </div>
          <div
            className="blueIcon"
            onClick={() => history.push(`/business/user-dashboard`)}
          >
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
              <NavItem className="navlinkIcon searchExtra">
                <form action="" className="searchForm">
                  <input
                    className="searchInput"
                    type="search"
                    placeholder="Search..."
                    onChange={(e)=>getSearchData(e.target.value)}
                    // onChange={(e) => props.getSearchData(e.target.value)}
                  />
                  <i class="fa fa-search"></i>
                </form>
              </NavItem>
              <NavItem className="navlinkIcon">
                <Link to="/business/user-dashboard/carts">
                  <Badge
                    badgeContent={`${cart && cart.length > 0 ? cart.length : 0
                      }`}
                    color="secondary"
                  >
                    <img src={cartIcon} alt="" />
                  </Badge>
                </Link>
              </NavItem>
              <NavItem className="navlinkIcon">
                <Link to="/business/user-dashboard/profile">
                  <img src={userIcon} alt="" />
                </Link>
              </NavItem>
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

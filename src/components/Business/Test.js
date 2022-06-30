import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BaseUrl } from "../API";
import Header from "../Header";
import Logo from "../../assets/NewLogo.svg";
import axios from "axios";
import { getVendorDetails } from "../ReduxStore/Actions/loginActions";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import PersonIcon from "@material-ui/icons/Person";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import { Avatar } from "@material-ui/core";

let userdata = JSON.parse(localStorage.getItem("user"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

const WelcomePage = () => {
  // alert("WelcVendorPageome") 
  const classes = useStyles();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.loginReducer.userDetails);
  if (Object.keys(userDetails).length !== 0) {
    userdata = userDetails;
  }
  const [user, setUser] = useState({ name: "Guest User" });
  const history = useHistory();

  const changePage = (url) => {
    history.push(url);
  };

  const VendorPage = () => {
   
    axios.get(`${BaseUrl}/view-vendor/${userdata._id}`).then((res) => {
      if (res.data.status === true) {
        console.log("Res", res.data.data);
        if (
          res.data.data.status === "Pending" ||
          res.data.data.status === "Reject"
        ) {
          swal(
            "Your Application is under processing!",
            "Please wait for few days we will notify if verified!",
            "error"
          ).then((isOk) => {
            if (isOk) {
              history.push("/dashboard");
            }
          });
        } else {
          localStorage.setItem("vendor", JSON.stringify(res.data.data));
          dispatch(getVendorDetails(res.data.data));
          history.push("/business/vendor-dashboard/product-list");
        }
      } else {
        history.push("/business/approve-form");
      }
    });
  };
  return (
    <>
      <div className="vendor_container">
        <div className="vendor_container1">
          <div className="solution-text">
            <h1>eBusiness Solution</h1>
          </div>
          <div className="vendor_left-sideContainer">
            <div className="vendor_left-side"></div>
          </div>
          <div className="bgLogoVsVendor">
            <div className="vendor-user_options">
              <div className="continueAsVendorIcon">
                <PersonIcon style={{ marginRight: "10px" }} />
                <PhonelinkSetupIcon />
              </div>
              <div className="continueAsVendorAvatar">
                <div className="VendorUserAvatar">
                  <Avatar src={userdata.image} className={classes.large} />
                  <h5>Welcome, {userdata.name}</h5>
                  <p>Have a good day</p>
                </div>
              </div>
              <div className="continueAsVendorLogo">
                <img src={Logo} alt="logo" width="150" height="150" />
              </div>
              <div className="continueAsVendorButton">
                <button
                  onClick={() => changePage("/business/user-dashboard")}
                  className="vendorVsuserBtn"
                >
                  Continue as user
                </button>
                <button onClick={VendorPage} className="vendorVsuserBtn">
                  Continue as vendor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default WelcomePage;

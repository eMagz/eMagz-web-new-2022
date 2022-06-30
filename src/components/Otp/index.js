import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import "./index.css";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "@material-ui/core";
import Logo from "../../assets/NewLogo.svg";
import axios from "axios";
import { BaseUrl } from "../API";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

import SignUpLogo from "../../assets/Userwithcircle.svg";
import swal from "sweetalert";

const OtpVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resData, setResdata] = useState([]);
  const [otpdata, setOtpdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      return setError(true);
    }
    const body = {
      email: email,
    };

    setIsLoading(true);
    axios.post(`${BaseUrl}/sendotp`, body).then((res) => {
      if (res.data.status === true) {
        setResdata(res.data);
        setIsLoading(false);
        swal(`OTP has been sent on you ${email} please verify!`);
      } else {
        setIsLoading(false);
        swal(`${res.data.msg}`);
      }
    });
  };

  const verifyOtp = () => {
    const body = {
      otp: otp,
    };

    axios.post(`${BaseUrl}/verifyotp`, body).then((res) => {
      console.log("snd", res);
      setOtpdata(res.data);
      if (res.data.status === false) {
        swal("Incorrect OTP");
      }
      if (res.data.status === true) {
        history.push("/dashboard/change-password", email);
      }
    });
  };

  return (
    <>
      <div className="signUpContainer">
        <div className="signUpWaterMark">
          <div className="signupFormContainer">
            <div className="signUpLogo">
              <img src={Logo} alt="logo" />
            </div>
            <div className="signUpForm">
              <div className="signUpFormWraper">
                <div className="signUpTop">
                  <div className="signupHeading">
                    <h3>Verification Code</h3>
                    <p style={{ textAlign: "start" }}>
                      Please check your registered email we sent OPT on your
                      email.{" "}
                    </p>
                  </div>
                  <img src={SignUpLogo} alt="signup" />
                </div>
                <div className="signUpInputForm">
                  <form className="otp-form" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      maxLength="1"
                      size="1"
                      min="0"
                      max="9"
                      pattern="[0-9]{1}"
                      className="opt-input"
                    />
                    <input
                      type="text"
                      maxLength="1"
                      size="1"
                      min="0"
                      max="9"
                      pattern="[0-9]{1}"
                      className="opt-input"
                    />
                    <input
                      type="text"
                      maxLength="1"
                      size="1"
                      min="0"
                      max="9"
                      pattern="[0-9]{1}"
                      className="opt-input"
                    />
                    <input
                      type="text"
                      maxLength="1"
                      size="1"
                      min="0"
                      max="9"
                      pattern="[0-9]{1}"
                      className="opt-input"
                    />
                    <button class="btn btn-primary btn-embossed">Verify</button>
                  </form>
                  <div className="connectWith backToSign">
                    <p>Back to Sign In</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;

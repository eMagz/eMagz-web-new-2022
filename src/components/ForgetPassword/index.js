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
import forgetLogo from "../../assets/Securitywithcicle-svg.png";
import swal from "sweetalert";
const ForgetPassword = () => {
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
										<h3>Forget Password</h3>
										<p style={{ textAlign: "start" }}>
											Please reset your password and come back
										</p>
									</div>
									<img
										src={forgetLogo}
										alt="signup"
										className="forgetLogo"
										style={{ width: "130px", height: "130px" }}
									/>
								</div>
								<div className="signUpInputForm">
									<form className="changeInputSize" onSubmit={handleSubmit}>
										<div className="inputLabel">
											<label>Email/Phone</label>
											<input
												type="email"
												name="email"
												value={email}
												onChange={(e) => {
													setEmail(e.target.value);
													setError(false);
												}}
												className="inputClass"
											/>
											{error && (
												<p className="errorMsg">please enter email!</p>
											)}
										</div>
										<div className="signupBtn" style={{ paddingTop: "20px" }}>
											<button type="submit">
												Submit{" "}
												{isLoading && (
													<div
														class="spinner-border ml-3 text-danger"
														role="status"
													></div>
												)}{" "}
											</button>
										</div>
									</form>
									<div className="connectWith backToSign">
										<p onClick={() => history.push("/login")}>
											Back to Sign In
										</p>
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

export default ForgetPassword;

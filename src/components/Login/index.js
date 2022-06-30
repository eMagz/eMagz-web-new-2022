import React, { useState, useEffect } from "react";
// import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from "@material-ui/icons/Lock";
import FacebookIcon from "@material-ui/icons/Facebook";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/NewLogo.svg";
import axios from "axios";
import { BaseUrl } from "../API";
import swal from "sweetalert";
import SignUpLogo from "../../assets/Userwithcircle.svg";
import { useFormik } from "formik";
import LoginUser from "../../assets/UserIcon.png";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import { getLoginRes } from "../ReduxStore/Actions/loginActions";
import { api } from "../API";
const validationSchema = yup.object({
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required!"),
});
const Login = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [userDetails, setUserDetails] = useState({});
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (event.target.value) setError(false);
		setUserData((prev) => ({ ...prev, [name]: value }));
	};

	const { email, password } = userData;

	const handleSubmit = (event) => {
		event.preventDefault();

		if (email === "" || password === "") return setError(true);
		setIsLoading(true);
		axios.post(`${BaseUrl}/login`, { email, password }).then((res) => {
			localStorage.setItem("token", res.data.token);
			let meetingID = localStorage.getItem("meeting_id");
			if (res.data.status === false) {
				setIsLoading(false);
				swal(res.data.msg);
				return;
			}
			if (res.data.role === "Parent") {
				const newdata = JSON.stringify(res.data.data);
				setUserDetails(res.data.data);
				dispatch(getLoginRes(res.data.data));
				localStorage.setItem("user", newdata);
				console.log("user", newdata);
				swal(res.data.msg);
				history.push("/dashboard");
			} else if (res.data.status === true && meetingID) {
				localStorage.setItem("user", JSON.stringify(res.data.data));
				dispatch(getLoginRes(res.data.data));
				history.push(`/video-conference/joinmeeting/${meetingID}`);
			} else if (res.data.data.name === "admin") {
				swal("Welcome!", "Admin Login success!", "success");
				setUserDetails(res.data.data);
				dispatch(getLoginRes(res.data.data));
				const newdata = JSON.stringify(res.data.data);
				const data = localStorage.setItem("Admin", newdata);
				if (res.data.status === true) {
					history.push("/admin/dashboard");
				} else {
					swal(res.data.msg);
				}
			} else {
				const newdata = JSON.stringify(res.data.data);
				console.log("login data", res.data);
				setUserDetails(res.data.data);
				dispatch(getLoginRes(res.data.data));
				localStorage.setItem("user", newdata);
				if (res.data.status === true) {
					setIsLoading(false);
					swal("Welcome!", "Login success!", "success");
					history.push("/dashboard");
				} else {
					swal(res.data.msg);
				}
			}
		});
	};

	useEffect(() => {
		dispatch(getLoginRes(userDetails));
	}, [history]);
	return (
		<>
			<div className="signUpContainer">
				<div className="signUpWaterMark">
					<div className="signupFormContainer">
						<div className="signUpLogo">
							<img src={Logo} alt="logo" />
						</div>
						<div className="signInForm">
							<div className="signUpFormWraper">
								<div className="signUpTop">
									<div className="signupHeading">
										<h3>Sign In</h3>
										<p>Hi Connect with eMagz and enjoy</p>
									</div>
									<div className="signInUserLogo">
										<img src={LoginUser} alt="signUp" />
									</div>
								</div>
								<div className="signUpInputForm">
									<form className="changeInputSize" onSubmit={handleSubmit}>
										<div className="inputLabel">
											<label>Email/Phone</label>
											<input
												type="email"
												name="email"
												style={error ? { border: "1px solid red" } : {}}
												value={email}
												onChange={handleInputChange}
												className="inputClass"
											/>
											{error && <p className="errorMsg">{error}</p>}
										</div>
										<div className="inputLabel">
											<label>Password</label>
											<input
												onChange={handleInputChange}
												value={password}
												type="password"
												name="password"
												className="inputClass"
												style={error ? { border: "1px solid red" } : {}}
											/>
											{error && <p className="errorMsg">{error}</p>}
										</div>
										<div className="rememberBoxLogin">
											<div className="rememberBox">
												<input type="checkbox" />
												<label>Remember me</label>
											</div>
											<div
												style={{
													width: "100%",
													float: "right",
													cursor: "pointer",
												}}
											>
												<p
													onClick={() => history.push("/forget-password")}
													className="forgettext"
												>
													Forget Password
												</p>
											</div>
										</div>
										<div className="signupBtn">
											<button type="submit">
												Sign In{" "}
												{isLoading && (
													<div
														class="spinner-border ml-3 text-danger"
														role="status"
													></div>
												)}{" "}
											</button>
										</div>
									</form>
									<div class="hr-sect">Connect with</div>
									<div className="connectWith">
										<div className="google">
											<i class="fab fa-google"></i>
										</div>
										<div className="facebook">
											<i class="fab fa-facebook-square"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div onClick={() => history.push("/")} className="scrollBtn">
							<i class="fas fa-solid fa-chevron-right"></i>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;

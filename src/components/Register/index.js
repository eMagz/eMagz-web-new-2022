import React, { useState } from "react";
import "./index.css";
import LockIcon from "@material-ui/icons/Lock";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../API";
import PencilLine from "../../assets/PencilLine.png";
import swal from "sweetalert";
import Logo from "../../assets/NewLogo.svg";
import SignUpLogo from "../../assets/Pencilwithcircle.svg";

const Register = () => {
	const history = useHistory();
	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [error, setError] = useState(false);
	const [errors, setErrors] = useState({
		nameError: "",
		emailError: "",
		passwordError: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		console.log("handleInputChange", event.target.value, event.target.name);
		if (event.target.value) setError(false);
		setUserData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		var nameValidator = new RegExp("^[a-zA-Z ]*$");
		const emailValidator = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
		let strongPassword = new RegExp(
			"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
		);
		if (username === "" || email === "" || password === "") {
			setError(true);
			return;
		}
		if (!nameValidator.test(username)) {
			console.log("Valid Name");
			setErrors((prev) => ({
				...errors,
				nameError: "Please enter valid name!",
			}));
			return;
		}
		if (!emailValidator.test(email)) {
			console.log("Valid email");
			setErrors((prev) => ({
				...errors,
				emailError: "Please enter valid email!",
			}));
			return;
		}
		// if (!strongPassword.test(password)) {
		//   console.log("Valid email");
		//   setErrors((prev) => ({
		//     ...errors,
		//     passwordError:
		//       "at least one lowercase letter, one uppercase letter, one digit, one special character and is at least eight characters long",
		//   }));
		//   return;
		// }

		setIsLoading(true);
		axios.post(`${BaseUrl}/register`, { name: username, email, password }).then((res) => {
			const newdata = JSON.stringify(res.data.data);
			const data = localStorage.setItem("user", newdata);
			if (res.data.status === true) {
				setIsLoading(false);
				swal("Welcome to Emagz!", "Please Login!", "success");
				history.push("/");
			} else {
				swal(res.data.msg);
				setIsLoading(false);
			}
		});
	};

	console.log("Errors", errors);
	const { username, email, password } = userData;
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
										<h2>Sign Up</h2>
										<p>Hi Connect with eMagz and enjoy</p>
									</div>
									<div className="signUpUserLogo">
										<img src={PencilLine} alt="signUp" />
									</div>
								</div>
								<div className="signUpInputForm">
									<form className="changeInputSize" onSubmit={handleSubmit}>
										<div className="inputLabel">
											<label>Name</label>
											<input
												type="text"
												placeholder="Name"
												name="username"
												style={error ? { border: "1px solid red" } : {}}
												value={username}
												onChange={handleInputChange}
												className="inputClass"
												
											/>
											{errors.nameError !== "" ? (
												<p>{errors.nameError}</p>
											) : (
												""
											)}
										</div>
										<div className="inputLabel">
											<label>Email/Phone</label>
											<input
												type="text"
												name="email"
												placeholder="Email"
												style={error ? { border: "1px solid red" } : {}}
												value={email}
												onChange={handleInputChange}
												className="inputClass"
												minLength={8}
											/>
											{errors.emailError !== "" ? (
												<p>{errors.emailError}</p>
											) : (
												""
											)}
										</div>
										<div className="inputLabel">
											<label>Password</label>
											<input
												onChange={handleInputChange}
												value={password}
												type="text"
												name="password"
												style={error ? { border: "1px solid red" } : {}}
												className="inputClass"
												placeholder="Password"
											/>
											{errors.passwordError !== "" ? (
												<p>{errors.passwordError}</p>
											) : (
												""
											)}
										</div>
										<div className="rememberBox">
											<input type="checkbox" />
											<label>Remember me</label>
										</div>
										<div className="signupBtn">
											<button type="submit">
												Sign up{" "}
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
										<div className="facebook">
											<i class="fab fa-facebook-square"></i>
										</div>
										<div className="google">
											<i class="fab fa-google"></i>
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
export default Register;

import React, { useState } from "react";
import "./index.css";
import { Form, FormGroup, Input } from "reactstrap";
import Button from "@material-ui/core/Button";
import Logo from "../../assets/NewLogo.svg";
import forgetLogo from "../../assets/forgot-password.png";
import Header from "../Header";
import axios from "axios";
import { Link } from "@material-ui/core";
import { BaseUrl } from "../API";
import { useHistory } from "react-router-dom";
import swal from "@sweetalert/with-react";

const ChangePasswords = (props) => {
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState();

	const history = useHistory();
	// console.log('ghy',props);

	const handleChangePassword = (e) => {
		e.preventDefault();
		if (password === newPassword) {
			const body = {
				email: props.location.state,
				password: password,
			};

			axios.post(`${BaseUrl}/update`, body).then((res) => {
				if (res.data.status === true) {
					history.push("/login");
				}
			});
		} else {
			swal("Password did not match");
		}
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
										<h3>Change Password</h3>
										<p>Hi Connect with eMagz and enjoy</p>
									</div>
									<img
										src={forgetLogo}
										alt="signup"
										style={{
											width: "130px",
											height: "130px",
											borderTopRightRadius: "31px",
										}}
									/>
								</div>
								<div className="signUpInputForm">
									<form
										className="changeInputSize"
										onSubmit={handleChangePassword}
									>
										<div className="inputLabel">
											<label>New Password</label>
											<input
												type="password"
												name="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												className="inputClass"
											/>
											{error && <p className="errorMsg">{error}</p>}
										</div>
										<div className="inputLabel">
											<label>Reenter New Password</label>
											<input
												onChange={(e) => setNewPassword(e.target.value)}
												value={newPassword}
												type="text"
												name="password"
												className="inputClass"
											/>
											{error && <p className="errorMsg">{error}</p>}
										</div>

										<div className="signupBtn" style={{ padding: "20px" }}>
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChangePasswords;

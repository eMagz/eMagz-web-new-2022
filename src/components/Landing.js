import React from "react";
import Logo from "../assets/NewLogo.svg";
import LoginUpLogo from "../assets/Userwithcircle.svg";
import SignUpLogo from "../assets/Pencilwithcircle.svg";
import LoginUser from "../assets/UserIcon.png";
import PencilLine from "../assets/PencilLine.png";

const Landing = ({ history }) => {
	// const func = () => {
	// 	console.log("hello");
	// };

	const shuffle = (e) => {
		// let box = e.target.id;
		// if (box == "x") {
		// document.getElementById("y").classList.remove("boxHover");
		// document.getElementById("x").classList.add("boxHover");
		// document.getElementById("y").classList.add("boxHover2");
		document.getElementById("x").classList.add("boxHover");
		document.getElementById("y").classList.add("boxHover2");
		// } else if ((box = "y")) {
		// 	// document.getElementById("x").classList.remove("boxHover");
		// 	// document.getElementById("y").classList.add("boxHover2");
		// 	// document.getElementById("x").classList.add("boxHover2");
		// 	document.getElementById("y").classList.add("boxHover");
		// 	document.getElementById("x").classList.add("boxHover2");
		// }
	};
	const Backshuffle = (e) => {
		// let box = e.target.id;
		// if (box == "x") {
		document.getElementById("x").classList.remove("boxHover");
		document.getElementById("y").classList.remove("boxHover2");
		// }
		// else if ((box = "y")) {
		// 	document.getElementById("y").classList.remove("boxHover");
		// 	document.getElementById("x").classList.remove("boxHover2");
		// }

		// document.getElementById("x").classList.remove("boxHover");
		// document.getElementById("y").classList.remove("boxHover2");
	};

	return (
		<div className="signUpContainer">
			<div className="signUpWaterMark">
				<div className="signupFormContainer">
					<div className="signUpLogo">
						<img src={Logo} alt="logo" />
					</div>
					<div className="LandingCard">
						<div
							onClick={() => history.push("/login")}
							id="y"
							className="signInCard"
							onMouseEnter={(e) => shuffle(e)}
							onMouseLeave={(e) => Backshuffle(e)}
						>
							<div className="landingSignInLogo">
								<img src={PencilLine} alt="signUp" />
							</div>
							<div className="landingSignInText">
								<h3>Sign In</h3>
								<p>Hi Connect with eMagz and enjoy</p>
							</div>
						</div>
						<div
							onClick={() => history.push("/register")}
							className="signUpCard"
							// onMouseEnter={(e) => shuffle(e)}
							// onMouseLeave={(e) => Backshuffle(e)}
							id="x"
						>
							<div className="landingSignUpLogo">
								<img src={LoginUser} alt="signUp" />
							</div>
							<div className="landingSignUpText">
								<h3>Sign Up</h3>
								<p>Hi Connect with eMagz and enjoy</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;

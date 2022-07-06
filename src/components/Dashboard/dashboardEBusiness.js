import React from "react";
import { Link } from "react-router-dom";
import NavLogo from "../../../src/assets/small-nav-logo-dashboard.png";
import eBusinessModuleLogo from "../../../src/assets/ebusiness-logo-module.png";

export default function dashboard() {
	return (
		<div className="dashboard-main-ebusiness">
			<div className="navbar">
				<img src={NavLogo} alt="nav-logo" />
				<ul className="nav-links">
					<li>
						<a href="">Home</a>
					</li>
					<li>
						<a href="">About Us</a>
					</li>
					<li>
						<a href="">Blog</a>
					</li>
				</ul>
			</div>
			<div className="logo-holder"></div>
			<div className="rectangle-ebusiness"></div>
			<div className="module-container-ebusiness">
				<div className="module-card-ebusiness">
					<img src={eBusinessModuleLogo} alt="" />
				</div>
				<div className="module-details">
					<h1>eBusiness</h1>
					<p>
						Shop all type of product that you love without changing multiple apps.
						Shoping made easy
					</p>
					<Link to={"/emagz"}>
						<span className="get-started-btn-ebusiness">Get Started</span>
					</Link>
				</div>
				{/* <p>eBusiness</p> */}
			</div>
			<div className="slider-line-holder">
				<div className="silder-line"></div>
			</div>
		</div>
	);
}

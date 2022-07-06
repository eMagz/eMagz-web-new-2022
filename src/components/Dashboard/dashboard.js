import React from "react";
import { Link } from "react-router-dom";
import NavLogo from "../../../src/assets/small-nav-logo-dashboard.png";
import eMagzModuleLogo from "../../../src/assets/emagz-module-dash.png";

export default function dashboard() {
	return (
		<div className="dashboard-main">
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
			<div className="rectangle"></div>
			<div className="module-container">
				<div className="module-card">
					<img src={eMagzModuleLogo} alt="" />
				</div>
				<div className="module-details">
					<h1>eMagz</h1>
					<p>
						Now never stop learning. <br /> Learn anywhere , anything.
					</p>
					<Link to={"/emagz"}>
						<span className="get-started-btn">Get Started</span>
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

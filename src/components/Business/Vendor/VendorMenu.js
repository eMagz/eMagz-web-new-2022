import React, { useEffect } from "react";
import "./index.css";
import { useHistory, useLocation } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import BellSimple from "../../../assets/BellSimple.png";
import CreditCard from "../../../assets/CreditCard.png";
import CircleLogo from "../../../assets/CircleLogo.png";
import blueLogo from "../../../assets/blueLogo.png";
import Ticket from "../../../assets/Ticket.png";
import TShirt from "../../../assets/TShirt.png";
import User from "../../../assets/User.png";
import Vector from "../../../assets/Vector.png";
import Package from "../../../assets/Package.png";
import logout from "../../../assets/logout.png";
import Home from "../../../assets/house_nav_icon.svg";

const VendorMenu = () => {
	const history = useHistory();
	const location = useLocation();
	console.log("location: ", location.pathname);
	var crntPath = "";
	if (location.pathname === "/business/vendor-dashboard") {
		crntPath = "home";
	} else if (location.pathname == "/business/vendor-dashboard/products") {
		crntPath = "products";
	} else if (location.pathname == "/business/vendor-dashboard/orders") {
		crntPath = "orders";
	} else if (location.pathname == "/business/vendor-dashboard/coupons") {
		crntPath = "coupons";
	} else if (location.pathname == "/business/vendor-dashboard/payment") {
		crntPath = "payment";
	}

	useEffect(() => {
		// window.open("http://localhost:3000" + location.pathname, "_self", "");
		console.log("open window  ");
	}, []);

	function closed() {
		window.close();
	}
	// window.open("http://localhost:3000" + location?.pathname, "_self", "");
	// console.log("open window");

	//   useEffect(() => {
	//     getNav();
	//   }, []);
	return (
		<div className="vendorMainMenu">
			<div>
				<img src={blueLogo} className="__logo" />
			</div>
			<div className="dashBoradIconsContainer">
				<div className="top__logo">
					<div className="circle__logo" onClick={() => history.push("/dashboard")}>
						<img src={CircleLogo} />
					</div>
					<div
						onClick={() => history.push("/business/vendor-dashboard")}
						className={crntPath == "home" ? "nav__icon active" : "nav__icon"}
					>
						<img src={Home} />
					</div>
				</div>
				<div className="bottom__logo">
					<div
						className={crntPath == "products" ? "nav__icon active" : "nav__icon"}
						onClick={() => history.push("/business/vendor-dashboard/products")}
					>
						<img src={TShirt} />
					</div>
					<div
						className={crntPath == "orders" ? "nav__icon active" : "nav__icon"}
						onClick={() => history.push("/business/vendor-dashboard/orders")}
					>
						<img src={Package} />
					</div>
					<div
						className={crntPath == "coupons" ? "nav__icon active" : "nav__icon"}
						onClick={() => history.push("/business/vendor-dashboard/coupons")}
					>
						<img src={Ticket} />
					</div>
					<div
						onClick={() => history.push("/business/vendor-dashboard/payment")}
						className={crntPath == "payment" ? "nav__icon active" : "nav__icon"}
					>
						<img src={CreditCard} />
					</div>
				</div>
			</div>
			<div>
				<img src={logout} onClick={closed} />
			</div>
		</div>
	);
};

export default VendorMenu;

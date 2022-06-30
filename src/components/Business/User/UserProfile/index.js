import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PaymentIcon from "@material-ui/icons/Payment";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import RoomIcon from "@material-ui/icons/Room";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useHistory } from "react-router-dom";
import "./index.css";
import "./main.css";
import Header from "../Navbar";
import ProfilePic from "../../../../assets/parent.png";
import MapPin from "../../../../assets/MapPin.png";
import Package from "../../../../assets/Package.png";
import Ticket from "../../../../assets/Ticket.png";
import CreditCard from "../../../../assets/CreditCard.png";
import VectorHeart from "../../../../assets/VectorHeart.png";
import Star6 from "../../../../assets/Star6.png";
const Profile = () => {
  const [value, setValue] = useState("female");
  const [user, setUser] = useState();
  const history = useHistory();

  console.log("history", history)
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user"));
    userData !== null && setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    history.push("/");
  };
  console.log("user Data", user);
  return (
    <>

      <Header />
      {
        user !== undefined && <section id="account__wrapper">
          <div className="profile_container">
            <div className="profile-pic">
              <h3 className="myaccount">My Account</h3>
              <img src={user !== undefined && user.image} alt="" />
              <div className="editImage">
                <EditIcon className="editIcon" />
                <h3>Edit</h3>
              </div>
            </div>
            <div className="profile_info_cover">
              <form>
                <div className="profile-info">
                  <div className="profileName">
                    <h3>Name</h3>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="input__box"
                      value={user !== undefined && user.name}
                    />
                  </div>
                  <div className="profile-phone">
                    <h3>Phone</h3>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="input__box"
                      value="+91 9708855861"
                    />
                  </div>
                </div>
                <div className="profile-info">
                  <div className="profile-gender">
                    <h3>Gender</h3>
                    <div className="input__radio">
                      <div className="radio__col">
                        <input type="radio" name="gender" checked={user !== undefined && user.gender == "Male" ? true : false} id="male" />
                        <label for="male">Male</label>
                      </div>
                      <div className="radio__col">
                        <input type="radio" name="gender" checked={user !== undefined && user.gender == "Female" ? true : false} id="female" />
                        <label for="female">Female</label>
                      </div>
                      <div className="radio__col">
                        <input type="radio" name="gender" checked={user !== undefined && user.gender == "Not prefer to say" ? true : false} id="nos" />
                        <label for="nos">Not Prefer to say</label>
                      </div>
                    </div>
                  </div>
                  <div className="profile-email">
                    <h3>Email</h3>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="input__box"
                      value={user !== undefined && user.email}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="profile-buttonContainer">
            <div className="profile-orderContainer">
              <button
                onClick={() =>
                  history.push("/business/user-dashboard/profile/orders")
                }
                className="orderBtn"
              >
                <img src={Package} className="profileMapIcon" /> My Order
              </button>
              <button
                onClick={() =>
                  history.push("/business/user-dashboard/profile/address")
                }
                className="addressBtn"
              >
                {" "}
                <img src={MapPin} className="profileMapIcon" />
                Manage Address
              </button>
              <button className="paymentBtn"

              >
                {" "}
                <img src={CreditCard} className="profileMapIcon" />
                Payment
              </button>
            </div>
            <div className="profile-reviewContainer">
              <button
                onClick={() =>
                  history.push("/business/user-dashboard/profile/wishlist")
                }
                className="wishListBtn"
              >
                {" "}
                <img src={VectorHeart} className="coupinIcon" />
                Wishlist
              </button>
              <button
                onClick={() =>
                  history.push("/business/user-dashboard/profile/coupon")
                }
                className="couponBtn"
              >
                {" "}
                <img src={Ticket} className="coupinIcon" />
                My Coupons
              </button>
              <button
                onClick={() =>
                  history.push("/business/user-dashboard/profile/review")
                }
                className="ratingBtn"
              >
                {" "}
                <img src={Star6} className="coupinIcon" />
                My Reviews Rating
              </button>
            </div>
          </div>
          <div className="logoutButton">
            <button onClick={handleLogout} className="logoutBtn">
              Log Out
            </button>
          </div>
          <div className="deactive__acount">
            <span>Deactive Account</span>
          </div>
        </section>
      }
    </>
  );
};

export default Profile;

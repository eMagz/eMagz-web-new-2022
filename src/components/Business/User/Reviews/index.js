import React from "react";
import Navbar from "../Navbar";
import ReviewComponent from "./ReviewComponent";
import "./index.css";
import arrowIcon from "../../../../assets/right_menu_arrow.svg";
const index = () => {
  return (
    <>
      <Navbar />
      <h3 className="wishlistText">
        <span>My Account</span> <img src={arrowIcon} alt="" />{" "}
        <span>My rating & reviews</span>
      </h3>

      <div className="orderContainer" id="review__container">
        {Array(4)
          .fill(10)
          .map(() => {
            return <ReviewComponent />;
          })}
      </div>
    </>
  );
};

export default index;

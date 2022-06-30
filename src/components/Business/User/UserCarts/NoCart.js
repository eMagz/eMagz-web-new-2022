import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import empCart from "../../../../assets/fillme.png";
const NoCart = () => {
  return (
    <div className="nocart-container">
      <div className="noProductText">
        <div className="empty-image">
          <img src={empCart} alt="" />
        </div>
        <h3>Please Fill Me</h3>
        <p>It looks like you have not shop anything yet</p>
        <Link to="/business/user-dashboard" className="nocontinueShooping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default NoCart;

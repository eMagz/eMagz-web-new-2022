import React from "react";
import Navbar from "../Navbar";
import { useHistory } from "react-router-dom";
import "./index.css";
import laterImg from "../../../../assets/laterImg.png";

const EmptyOrder = () => {
  const history = useHistory();
  return (
    <div className="submit__container">
      <div className="submit__wrapper">
        <div className="submit__img">
          <img className="order__image" src={laterImg} />
        </div>
        <h1>Nothing To Be Shown</h1>
        <p>let's get some order for you so you can check me later.</p>
        <button
          onClick={() => history.push("/business/user-dashboard/profile/order")}
          className="helpBtn"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default EmptyOrder;

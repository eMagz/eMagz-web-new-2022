import React from "react";
import Navbar from "../Navbar";
import { useHistory } from "react-router-dom";
import "./index.css";
import helpImg from "../../../../assets/helpImg.png";

const SubmitMessage = () => {
  const history = useHistory();
  return (
    <div className="submit__container">
      <div className="submit__wrapper">
        <div className="submit__img">
          <img className="support__image" src={helpImg} />
        </div>
        <h1>Out team will be contact you Shortly</h1>
        <p>Please check you mail you have received a ticket for your query</p>
        <button
          onClick={() => history.push("/business/user-dashboard/profile/order")}
          className="helpBtn"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SubmitMessage;

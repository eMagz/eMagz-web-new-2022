import React from "react";
import Navbar from "../Navbar";
import Header from "../Navbar";
import { useHistory } from "react-router-dom";
import "./index.css";
import laterImg from "../../../../assets/laterImg.png";
import arrowIcon from "../../../../assets/right_menu_arrow.svg";
import { Row, Col } from "react-bootstrap";
const OrderSupport = () => {
  const history = useHistory();
  return (
    <>
      <Header />
      <h3 className="wishlistText">
        <span>My Account</span> <img src={arrowIcon} alt="" />{" "}
        <span>My Order</span>
      </h3>
      <h3 className="wishlistText">
        <h1>We are here to help you</h1>
        <p>Please enter the below details correctly so our team can resolve the issue</p>
      </h3>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h3 className="wishlistText">
        <span>Upload Proof</span>
      </h3>

      <div className="submit__container">

        <div className="submit__wrapper">
          <form>
            <Row>
              <Col>
                <input type="file" id="myFile" name="filename" />
              </Col>
              <Col>
                <input type="file" id="myFile" name="filename" />
              </Col>
              <Col>
                <input type="file" id="myFile" name="filename" />
              </Col>
              <Col>
                <input type="file" id="myFile" name="filename" />
              </Col>
            </Row>
          </form>
          <br />
          <button
            onClick={() => history.push("/")}
            className="helpBtn"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSupport;

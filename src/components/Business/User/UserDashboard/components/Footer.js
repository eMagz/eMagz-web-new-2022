import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <>
      <div className="footerhead">
        <h1>eMagz</h1>
      </div>
      <div className="footerContainer">
        <div className="footerlistContainer">
          <div className="HomeList">
            <ul>
              <h4>About</h4>
              <li>Home</li>
              <li>About</li>
              <li>Our Benefits</li>
              <li>Testimonials</li>
              <li>Carrier</li>
            </ul>
          </div>
          <div className="blogList">
            <ul>
              <h4>Information</h4>
              <li>Blog</li>
              <li>Faq</li>
              <li>Support</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="contactContainer">
          <form className="formContainer">
            <p>Contact us</p>
            <input className="contactInput" placeholder="name" />
            <input className="contactInput" placeholder="E-mail" />
            <input className="contactInput" placeholder="Message (Optional)" />
            <div className="contactBtnContainer">
              <button className="contactBtn">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="footerBottom">
        <div className="footerLine"></div>
        <div className="reservedText">
          <p>2021 eMagz All right reserved</p>
          <p>Developed by INA WEBTECH</p>
        </div>
      </div>
    </>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import "./index.css";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Header from "../../Header";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BaseUrl } from "../../../API";

let education = 0;

const TemplateThree = () => {
  const [followStatus, setFollowStatus] = useState();
  const [loading, setLoading] = useState(false);
  const [educationInfo, setEducationInfo] = useState({});

  const getFolloStatus = (education) => {
    axios
      .get(
        `${BaseUrl}/user-follow-status/${education.data.user_id}/${education.data.school_id}`
      )
      .then((res) => {
        setFollowStatus(res.data.status && res.data.data.status);
      });
  };
  useEffect(() => {
    education = JSON.parse(localStorage.getItem("education"));
    getFolloStatus(education);
    setEducationInfo(education);
  }, []);

  const handleFollow = () => {
    setLoading(true);
    axios
      .post(
        `${BaseUrl}/school-follow/${education.data.user_id}/${education.data.school_id}`
      )
      .then((res) => {
        setLoading(false);
        getFolloStatus(educationInfo);
      });
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          top: 0,
          backgroundColor: "white",
        }}
      >
        <Header />
      </div>
      <div className="temp3_container">
        <div className="tem3_card3">
          <div className="temp3_header">
            <div className="back_img">
              <img
                alt="img"
                style={{ marginTop: "0px", width: "100%", height: "100%" }}
                src="https://www.greatschools.org/gk/wp-content/uploads/2014/03/The-school-visit-what-to-look-for-what-to-ask-1.jpg"
              />
            </div>
            <div className="temp3_main">
              <img
                alt="img"
                className="temp3_picture"
                src="https://www.sts-school.edu.in/wp-content/uploads/2019/10/Best-School-in-Meerut-1.png"
              />
              <div className="camera_icon3">
                <IconButton>
                  <PhotoCamera />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="collegeprofile_details3">
            <div className="collegeprofName3">
              <h4>DELHI PUBLIC SCHOOL</h4>
              <h5>@dps.edu.in</h5>
            </div>
            <div className="followCollege">
              {
                <button onClick={handleFollow} className="collegeBtn">
                  {loading ? (
                    <CircularProgress size="small" content="Loading" />
                  ) : followStatus ? (
                    "Unfollow"
                  ) : (
                    "Follow"
                  )}
                </button>
              }
            </div>
          </div>
          <div className="about_us_container">
            <div className="heading_cont">
              <span style={{ background: "#093d7e" }}></span>
              <h2>ABOUT US</h2>
              <span style={{ background: "#093d7e" }}></span>
            </div>
          </div>
          <div className="about_us_body">
            <div className="main_body">
              The foundation stone of the first DPS building at Mathura Road in
              New Delhi was laid by Dr. Sarvapalli Radhakrishnan in 1949, the
              then Vice President of India. A non-profit, non-proprietary
              association working for educational excellence, the DPS Society
              enjoys a rich experience across six decades. By providing
              education to a wide community, the society is contributing to
              individual, community and national progress.
            </div>
            <div className="main_body">
              The DPS Society believes in a universal educational programme,
              encompassing a respect for cultures, convictions, communities and
              societies. Represented by a pan- national (220 schools) and
              pan-global (20 outside India) presence, the society is present
              across 20 states and 44 cities in India and 12 countries
              (including USA, Kuwait, Sharjah, Doha, Dubai, Nepal and
              Indonesia).
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateThree;

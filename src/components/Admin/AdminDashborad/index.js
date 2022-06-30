import React, { useEffect, useState } from "react";
import "./index.css";
import educationIcon from "../../../assets/classroom.png";
import businessIcon from "../../../assets/business.png";
import videoIcon from "../../../assets/video.png";
import socialIcon from "../../../assets/social.png";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { BaseUrl, Baseurl } from "../../API";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { set } from "date-fns";
import Header from "./Header";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(5),
      float: "right",
      marginTop: "250px",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Viewboard = () => {
  const app_id = "bb58da77";
  const app_key = "10dbafa3f2076bb9a8b6d81f850423d4";
  const endpoint = "entries";
  const language_code = "en-us";
  const word_id = "example";
  const Baseurl =
    "https://od-api.oxforddictionaries.com/api/v2/" +
    endpoint +
    "/" +
    language_code +
    "/" +
    word_id;
  const classes = useStyles();

  axios
    .get(`${Baseurl}`, {
      headers: {
        app_id: app_id,
        app_key: app_key,
      },
    })
    .then((res) => {
      console.log("Disctionaries", res);
    });
  const [education, setEducation] = useState([]);
  const history = useHistory();
  const redirect = (url) => {
    history.push(url);
  };

  return (
    <>
      <Header />
      <div className="maindiv">
        Admin operates all the activites of the users, drivres as well as
        vendors.
      </div>
      <div className="first">
        <div
          style={{ textDecoration: "none" }}
          onClick={() =>
            redirect(
              education.status ? "educations" : "/admin/education/schools"
            )
          }
          className="card1"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="circle1">
              <img src={educationIcon} />
            </div>
            <div className="text">EDUCATION</div>
          </div>
        </div>

        <div
          style={{ textDecoration: "none" }}
          onClick={() => redirect("/admin/business/vendor-list")}
          className="card2"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="circle2">
              <img src={businessIcon} />
            </div>
            <div className="text">BUSINESS</div>
          </div>
        </div>
        <div
          style={{ textDecoration: "none" }}
          onClick={() => redirect("/admin/emagz/acvtive-users")}
          className="card3"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="circle3">
              <img src={socialIcon} />
            </div>
            <div className="text">eMagz</div>
          </div>
        </div>
        <div
          style={{ textDecoration: "none" }}
          onClick={() => redirect("/admin/video-conference/users")}
          className="card4"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="circle4">
              <img src={videoIcon} />
            </div>
            <div className="text">VIDEO CONFERENCING</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewboard;

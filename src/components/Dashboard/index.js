import React, { useEffect, useState } from "react";
import "./index.css";
import educationIcon from "../../assets/classroom.png";
import businessIcon from "../../assets/business.png";
import videoIcon from "../../assets/video.png";
import socialIcon from "../../assets/social.png";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { BaseUrl, Baseurl } from "../API";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { set } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
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
  const { cart, loginReducer } = useSelector((state) => ({ ...state }));
  
  const classes = useStyles();

  const getDic = () => {

    const app_id = "bb58da77"; // insert your APP Id
    const app_key = "10dbafa3f2076bb9a8b6d81f850423d4"; // insert your APP Key
    const wordId = "home";
    const fields = "pronunciations";
    const strictMatch = "false";

    const options = {
      host: "od-api.oxforddictionaries.com",
      // port: '443',
      // path: 'https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
      method: "GET",
      headers: {
        app_id: app_id,
        app_key: app_key,
      },
    };

    const path = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${wordId}`;

    axios
      .get(path, options)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  const [education, setEducation] = useState([]);
  const history = useHistory();
  const redirect = (url) => {
    history.push(url);
  };
  useEffect(() => {
    getDic();
    getDetails();
  }, []);

  const handleSocialMedia = () => {
    const data = JSON.parse(localStorage.getItem("user"));

    axios.get(`${BaseUrl}/social-profile/${data._id}`).then((res) => {
      localStorage.setItem("emagz", JSON.stringify(res.data.data));
    });
    history.push("/emagz");
  };

  const getDetails = () => {
    const data = localStorage.getItem("user");
    const maindata = JSON.parse(data);
    axios
      .get(`${BaseUrl}/education/userdetails/${maindata._id}`)
      .then((res) => {
        setEducation(res.data);
        localStorage.setItem("education", JSON.stringify(res.data));
      });
  };

  return (
    <div className="dashboard-main">
      <div className="maindiv">
        Explore the options below according to your preference
      </div>

      <div className="first">
        <div
          style={{ textDecoration: "none" }}
          onClick={() =>
            redirect(education.status ? "educations" : "/educations/admission")
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
              <img style={{ marginTop: "27px" }} src={educationIcon} />
            </div>
            <div onClick={getDetails} className="text">
              EDUCATION
            </div>
          </div>
        </div>
        <div
          style={{ textDecoration: "none" }}
          onClick={() => redirect("/business")}
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
              <img style={{ marginTop: "27px" }} src={businessIcon} />
            </div>
            <div className="text">BUSINESS</div>
          </div>
        </div>
        <div
          style={{ textDecoration: "none" }}
          onClick={handleSocialMedia}
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
              <img style={{ marginTop: "27px" }} src={socialIcon} />
            </div>
            <div className="text">eMagz</div>
          </div>
        </div>
        <div
          style={{ textDecoration: "none" }}
          onClick={() => redirect("video-conference/WelcomeDashboard")}
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
              <img style={{ marginTop: "27px" }} src={videoIcon} />
            </div>
            <div className="text">VIDEO CONFERENCING</div>
          </div>
        </div>
      </div>
      {/* <div className={classes.root}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div> */}
    </div>
  );
};
export default Viewboard;

import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { BaseUrl, ImageUrl } from "../../../API";
import Header from "../../Header";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Row, Col } from "reactstrap";
import MaterialTable from "material-table";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareOutlined from "@material-ui/icons/ShareOutlined";
import swal from "sweetalert";
import Moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBirthdayCake,
  faMailBulk,
  faImages,
  faMapMarkerAlt,
  faCalendarAlt,
  faUserCog,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";
// import {} from "react-router-dom"

let user = 0;
const Index = () => {
  const history = useHistory();
  const [studentDetails, setStudentDetails] = useState();
  const [schoolData, setSchoolData] = useState();
  const [educationAccess, setEducationAccess] = useState({});
  const [students, setStudents] = useState("");
  const [teachers, setTeachers] = useState("");
  const [studentSchool, setStudentSchool] = useState({});
  const [followers, setFollowers] = useState([]);
  const [fLoading, setFloading] = useState(true);
  const [loading, setLoading] = useState(true);
  const fileProfile = useRef("");

  const getAllTeacherStudentList = (id) => {
    const one = `${BaseUrl}/viewteacherlist/${id}`;
    const two = `${BaseUrl}/school-student-list/${id}`;

    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          setStudents(responseTwo.data.data.countstudentDetails);
          setTeachers(responseOne.data.data.countstudentDetails);
        })
      )
      .catch((errors) => {
        console.log("Error", errors);
      });
  };

  const getFollowerList = (id) => {
    setFloading(true);
    axios.get(`${BaseUrl}/school-followers/${id}`).then((res) => {
      setFollowers(
        res.data.data.followers.length > 0 && res.data.data.followers[0].school
      );
      console.log("Followers List", res.data.data.followers);
      setFloading(false);
    });
  };

  const handleNewsFeeds = () => {};

  const getStudentSchool = (id) => {
    setLoading(true);
    axios.get(`${BaseUrl}/student-school-details/${id}`).then((res) => {
      setStudentDetails(res.data.data[0]);
      setSchoolData(res.data.data[0].schooldetails[0]);
      getAllTeacherStudentList(res.data.data[0].school_id);
      console.log("Res", res.data.data[0]);
      setLoading(false);
    });
  };

  const uploadProfile = (event) => {
    if (event.target.files.length > 0 && educationAccess.role === "student") {
      const formData = new FormData();
      formData.append(
        "student_image",
        event.target.files[0],
        event.target.files[0].name
      );
      axios
        .post(
          `${BaseUrl}/student-profile-image/${educationAccess.data._id}`,
          formData
        )
        .then((res) => {
          if (res.data.status === true) {
            const chattingProfileUpdate = {
              SenderId: educationAccess.data._id,
              SenderPhoto: res.data.data.student_image,
            };
            const chattingProfileUpdateR = {
              ReceiverId: educationAccess.data._id,
              ReceiverPhoto: res.data.data.student_image,
            };

            axios
              .post(`${BaseUrl}/update-message-profile`, chattingProfileUpdate)
              .then((res) => {});
            axios
              .post(`${BaseUrl}/update-message-profile`, chattingProfileUpdateR)
              .then((res) => {});
            let temp = studentDetails;
            temp = res.data.data;
            educationAccess.data = temp;
            localStorage.setItem("education", JSON.stringify(educationAccess));
            setStudentDetails(temp);
            swal("Profile Picture Changed");
          }
        });
    }
  };

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    getFollowerList(user._id);
    getStudentSchool(user._id);
    const education = JSON.parse(localStorage.getItem("education"));
    setEducationAccess(education);
  }, []);

  const onUploadProfile = () => {
    fileProfile.current.click();
  };
  console.log("studentDetails", studentDetails);
  return (
    <>
      <Header role={educationAccess.role} />
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <div style={{ marginTop: "4rem" }} className="container">
          <div>
            <div className="temp3_header">
              <div className="back_img">
                <img
                  alt=""
                  src={schoolData.bannerimage}
                  style={{ marginTop: "10px", width: "100%", height: "100%" }}
                />
              </div>
              <div className="temp3_main">
                <img
                  alt=""
                  className="temp3_picture"
                  src={studentDetails.student_image}
                />
                <div className="camera_icon3">
                  <input
                    type="file"
                    id="file"
                    onChange={uploadProfile}
                    ref={fileProfile}
                    style={{ display: "none" }}
                  />
                  <IconButton onClick={onUploadProfile}>
                    <PhotoCamera />
                  </IconButton>
                </div>
              </div>
            </div>
            <div className="profile_details3">
              <div className="profile-post">
                <div className="profName3">
                  <i
                    class="fas fa-school"
                    style={{
                      marginRight: "5px",
                      fontSize: "20px",
                      marginRight: "5px",
                      color: "#3c4eb3",
                    }}
                  ></i>
                  {schoolData.name}
                </div>
                <div className="addpost">
                  <button
                    onClick={() => handleNewsFeeds}
                    className="post_btn edit3_btn1"
                  >
                    Update Profile
                    <FontAwesomeIcon
                      icon={faUserCog}
                      style={{ marginLeft: "5px" }}
                    />{" "}
                  </button>
                </div>
              </div>
              <div className="profMail3">
                <strong>Name</strong> : {studentDetails.name}
              </div>
              <div className="profMail3">
                <strong>Role</strong> : {educationAccess.role}
              </div>
            </div>
            <div className="more_details3">
              <div className="detail_div">
                <FontAwesomeIcon className="mt-1" icon={faMapMarkerAlt} />
                <div style={{ paddingLeft: "5px", color: "gray" }}>
                  {schoolData.city}, {schoolData.country}
                </div>
              </div>
              <div className="detail_div">
                <FontAwesomeIcon className="mt-1" icon={faMailBulk} />
                <div style={{ paddingLeft: "5px", color: "gray" }}>
                  {schoolData.email}
                </div>
              </div>
              <div className="detail_div">
                <i
                  onClick={() =>
                    history.push(
                      `/admin/education/schools/${schoolData._id}/students`,
                      schoolData._id
                    )
                  }
                  class="fas fa-users-class"
                  style={{
                    color: "#3c4eb3",
                    cursor: "pointer",
                    marginTop: "4px",
                    marginRight: "3px",
                  }}
                ></i>
                <strong style={{ color: "black", marginBottom: "5px" }}>
                  {" "}
                  + {students}
                </strong>
              </div>
              <div className="detail_div">
                <i
                  onClick={() =>
                    history.push(
                      `/admin/education/schools/${schoolData._id}/teachers`,
                      schoolData._id
                    )
                  }
                  class="fas fa-chalkboard-teacher"
                  style={{
                    color: "#3c4eb3",
                    cursor: "pointer",
                    marginTop: "4px",
                    marginRight: "3px",
                  }}
                ></i>
                <strong style={{ color: "black", marginBottom: "5px" }}>
                  {" "}
                  + {teachers}
                </strong>
              </div>
              <div className="profile3_edit_btn">
                <button
                  onClick={() =>
                    history.push(`/educations/my-profile/metting/home`)
                  }
                  className="edit3_btn edit3_btn1"
                >
                  Make a video call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="folowingContainer">
        <div className="followersWraper">
          <h4 className="followerHead">Following</h4>
          <div className="followingListContainer">
            {fLoading ? (
              <h5>Loading</h5>
            ) : followers.length > 0 ? (
              <p>You don't follow any school please follow this school</p>
            ) : (
              followers.length > 0 &&
              followers.map((followers) => {
                return (
                  <div className="listFollowing">
                    <p>{followers.name}</p>
                    <div className="btn-container">
                      <button className="follo-btn">Unfollow</button>
                    </div>
                    <div className="folloImg">
                      <img src={followers.bannerimage} alt="ima" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

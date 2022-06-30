import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { BaseUrl } from "../../../API";
import Header from "../../Header";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Row, Col } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Input,
  FormGroup,
  Label,
  CustomInput,
  Modal,
  Form,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import {
  faMailBulk,
  faMapMarkerAlt,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";
// import {} from "react-router-dom"

let user = 0;
const Index = () => {
  const history = useHistory();
  const [teacherDetails, setTeacherDetails] = useState({});
  const [schoolData, setSchoolData] = useState({});
  const [educationAccess, setEducationAccess] = useState({});
  const [students, setStudents] = useState("");
  const [teachers, setTeachers] = useState("");
  const [modal, setModal] = useState(false);
  const [selectNewsMode, setSelectNewsMode] = useState("public");
  const [classList, setClassList] = React.useState([]);
  const [section, setSection] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState(null);
  const [photo, setPhoto] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const fileProfile = useRef("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [followers, setFollowers] = useState([]);
  const [fLoading, setFloading] = useState(true);
  const [unFLoading, setUnFLoading] = useState(false);

  const getAllTeacherStudentList = () => {
    const one = `${BaseUrl}/viewteacherlist/${schoolData._id}`;
    const two = `${BaseUrl}/school-student-list/${schoolData._id}`;

    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          setStudents(responseTwo.data.data.countstudentDetails);
          setTeachers(responseOne.data.data.countteacherDetails);
        })
      )
      .catch((errors) => {
        console.log("Error", errors);
      });
  };

  const toggle = () => setModal(!modal);
  const getTeacherSchool = (id) => {
    axios.get(`${BaseUrl}/teacher-school-details/${id}`).then((res) => {
      setTeacherDetails(res.data.data[0]);
      setSchoolData(res.data.data[0].schooldetails[0]);
    });
  };

  const getClasses = (id) => {
    axios.get(`${BaseUrl}/viewclasseslist/${id}`).then((res) => {
      setClassList(res.data.data);
    });
  };

  const getSection = () => {
    axios.get(`${BaseUrl}/class-wise-section/${selectedClass}`).then((res) => {
      setSection(res.data.data);
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

  useEffect(() => {
    getSection();
  }, [selectedClass, setSelectedClass]);

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    const education = JSON.parse(localStorage.getItem("education"));
    setEducationAccess(education);
    getFollowerList(user._id);
    getClasses(education.data.school_id);
    getAllTeacherStudentList();
    getTeacherSchool(user._id);
  }, []);

  const onUploadProfile = () => {
    fileProfile.current.click();
  };

  const uploadProfile = (event) => {
    if (event.target.files.length > 0 && educationAccess.role === "teacher") {
      if (event.target.files.length > 0) {
        const formData = new FormData();
        formData.append(
          "teacher_image",
          event.target.files[0],
          event.target.files[0].name
        );
        axios
          .post(
            `${BaseUrl}/teacher-profile-image/${educationAccess.data._id}`,
            formData
          )
          .then((res) => {
            console.log("Updated Teacher Pic", res.data.data);
            if (res.data.status === true) {
              const chattingProfileUpdate = {
                SenderId: educationAccess.data._id,
                SenderPhoto: res.data.data.teacher_image,
              };
              const chattingProfileUpdateR = {
                ReceiverId: educationAccess.data._id,
                ReceiverPhoto: res.data.data.teacher_image,
              };
              console.log("Updated Pic", res.data.data);
              axios
                .post(
                  `${BaseUrl}/update-message-profile`,
                  chattingProfileUpdate
                )
                .then((res) => {
                  console.log(
                    "chattingProfileUpdateSenderPhoto",
                    chattingProfileUpdate
                  );
                });
              axios
                .post(
                  `${BaseUrl}/update-message-profile`,
                  chattingProfileUpdateR
                )
                .then((res) => {
                  console.log(
                    "chattingProfileUpdateRPhoto",
                    chattingProfileUpdateR
                  );
                });
              let temp = teacherDetails;
              temp = res.data.data;
              educationAccess.data = temp;
              localStorage.setItem(
                "education",
                JSON.stringify(educationAccess)
              );
              setTeacherDetails(temp);
              swal("Profile Picture Changed");
            }
          });
      }
    }
  };
  const onHandlePictureChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  const handleNewsPublish = () => {
    let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
    let currentDate = [month, date, year].join("-");
    let newsDocPublic = new FormData();
    newsDocPublic.append("created_at", currentDate);
    newsDocPublic.append("newsfeedfile", photo);
    newsDocPublic.append("title", subject);
    newsDocPublic.append("description", description);
    newsDocPublic.append("school_id", educationAccess.data.school_id);
    newsDocPublic.append("role", educationAccess.role);
    newsDocPublic.append("name", educationAccess.data.name);
    if (selectNewsMode === "public") {
      newsDocPublic.append("is_forall", true);
      axios
        .post(`${BaseUrl}/add-news-feed-for-public`, newsDocPublic)
        .then((res) => {
          if (res.data.status === true) {
            swal(res.data.msg);
          }
        });
    } else if (selectNewsMode === "yourSchool") {
      axios
        .post(`${BaseUrl}/add-news-feed-for-school`, newsDocPublic)
        .then((res) => {
          if (res.data.status === true) {
            swal(res.data.msg);
          }
        });
    } else if (selectNewsMode === "teacher") {
      if (selectedClass === "all" && selectedSection === "all") {
        axios
          .post(`${BaseUrl}/add-news-feed-for-teachers`, newsDocPublic)
          .then((res) => {
            if (res.data.status) {
              swal(res.data.message);
            }
          });
      } else {
        // let classNum = classList.filter((data) => data._id === selectedClass);
        // let sectionNum = section.filter((data) => data._id === selectedSection);

        newsDocPublic.append(`teacherclass_id`, selectedClass);
        newsDocPublic.append(`teachersection_id`, selectedSection);
        axios
          .post(`${BaseUrl}/add-news-feed-for-teachers`, newsDocPublic)
          .then((res) => {
            if (res.data.status === true) {
              swal(res.data.message);
            }
          });
      }
    } else if (selectNewsMode === "student") {
      if (selectedClass === "all" && selectedSection === "all") {
        axios
          .post(`${BaseUrl}/add-news-feed-for-students`, newsDocPublic)
          .then((res) => {
            if (res.data.status === true) {
              swal(res.data.message);
            }
          });
      } else {
        newsDocPublic.append(`studentclass_id`, selectedClass);
        newsDocPublic.append(`studentsection_id`, selectedSection);
        axios
          .post(`${BaseUrl}/add-news-feed-for-students`, newsDocPublic)
          .then((res) => {
            if (res.data.status === true) {
              swal(res.data.message);
            }
          });
      }
    }
    setDescription("");
    setSubject("");
  };
  const handdleUnfollow = () => {
    setUnFLoading(true);
    axios
      .post(
        `${BaseUrl}/school-follow/${educationAccess.data.user_id}/${educationAccess.data.school_id}`
      )
      .then((res) => {
        console.log("Follow Status", res.data.data.status);
        setUnFLoading(false);
        getFollowerList(educationAccess.data.user_id);
      });
  };
  return (
    <>
      <Header role={educationAccess.role} />
      <div style={{ marginTop: "4rem" }} className="container">
        <div>
          <div className="temp3_header">
            <div className="back_img">
              <img
                src={schoolData.bannerimage}
                alt="img"
                style={{ marginTop: "10px", width: "100%", height: "100%" }}
              />
            </div>
            <div className="temp3_main">
              <img
                className="temp3_picture"
                alt="img"
                src={teacherDetails.teacher_image}
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
                  onClick={() =>
                    history.push(
                      `/admin/education/schools/${schoolData._id}/update`,
                      schoolData._id
                    )
                  }
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
              <strong>Name</strong> : {teacherDetails.name}
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
              <button onClick={() => toggle()} className="btn btn-primary">
                Publish News
              </button>
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
      <div className="folowingContainer">
        <div className="followersWraper">
          <h4 className="followerHead">Following</h4>
          <div className="followingListContainer">
            {fLoading ? (
              <h1>Loading</h1>
            ) : (
              followers.length > 0 &&
              followers.map((followers) => {
                return (
                  <div className="listFollowing">
                    <p>{followers.name}</p>
                    <div className="btn-container">
                      <button onClick={handdleUnfollow} className="follo-btn">
                        Unfollow{" "}
                        {unFLoading ? (
                          <CircularProgress size="small" color="secondary" />
                        ) : (
                          ""
                        )}
                      </button>
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Publish News</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleSelect">Publish News For</Label>
                  <Input
                    type="select"
                    name="select"
                    onChange={(e) => setSelectNewsMode(e.target.value)}
                  >
                    <option value="public">Public</option>
                    <option value="yourSchool">Your School</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            {selectNewsMode === "public" && (
              <>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Subject</Label>
                      <Input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Description</Label>
                      <Input
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        className="form-control"
                        placeholder="Enter your name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Attach Document</Label>
                      <CustomInput
                        onChange={(e) => onHandlePictureChange(e)}
                        type="file"
                        accept="images/*"
                        name="images"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </>
            )}
            {selectNewsMode === "yourSchool" && (
              <>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Subject</Label>
                      <Input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Description</Label>
                      <Input
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        className="form-control"
                        placeholder="Enter your name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Attach Document</Label>
                      <CustomInput
                        onChange={(e) => onHandlePictureChange(e)}
                        multiple
                        type="file"
                        accept="images/*"
                        name="images"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </>
            )}
            {selectNewsMode === "teacher" && (
              <>
                <Row>
                  <Col md={6}>
                    <Form>
                      <FormGroup>
                        <Label for="exampleSelect">Please Select Class</Label>
                        <Input
                          type="select"
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                        >
                          <option>--select class--</option>
                          {classList.map((data) => {
                            return (
                              <option
                                value={data._id}
                              >{`Class ${data.classes}`}</option>
                            );
                          })}
                          <option value="all">All</option>
                        </Input>
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleSelect">Please Select Section</Label>
                      <Input
                        type="select"
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                      >
                        <option>--select section--</option>
                        {section !== null &&
                          section.map((data) => {
                            return (
                              <>
                                <option
                                  value={data._id}
                                >{`Section ${data.section}`}</option>
                              </>
                            );
                          })}
                        <option value="all">All</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Subject</Label>
                      <Input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Description</Label>
                      <Input
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        className="form-control"
                        placeholder="Enter your name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Subject</Label>
                      <CustomInput
                        onChange={(e) => onHandlePictureChange(e)}
                        multiple
                        type="file"
                        accept="images/*"
                        name="images"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </>
            )}
            {selectNewsMode === "student" && (
              <>
                <Row>
                  <Col md={6}>
                    <Form>
                      <FormGroup>
                        <Label for="exampleSelect">Please Select Class</Label>
                        <Input
                          type="select"
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                        >
                          <option>--select class--</option>
                          {classList.map((data) => {
                            return (
                              <option
                                value={data._id}
                              >{`Class ${data.classes}`}</option>
                            );
                          })}
                          <option value="all">All</option>
                        </Input>
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleSelect">Please Select Section</Label>
                      <Input
                        type="select"
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                      >
                        <option>--select section--</option>
                        {section !== null &&
                          section.map((data) => {
                            return (
                              <>
                                <option
                                  value={data._id}
                                >{`Section ${data.section}`}</option>
                              </>
                            );
                          })}
                        <option value="all">All</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Subject</Label>
                      <Input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter yo."
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Description</Label>
                      <Input
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        className="form-control"
                        placeholder="Enter your name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Attach Document</Label>
                      <CustomInput
                        onChange={(e) => onHandlePictureChange(e)}
                        type="file"
                        accept="images/*"
                        name="images"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </>
            )}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              toggle();
              handleNewsPublish();
            }}
          >
            Submit
          </Button>
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Index;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Header from "../../Header";
import "./index.css";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
} from "reactstrap";
import { BaseUrl } from "../../../API";
import axios from "axios";
import swal from "@sweetalert/with-react";

const useStyles = makeStyles((theme) => ({
  large: {
    marginTop: "0px !important",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const StudentHomeWork = (props) => {
  const classes = useStyles();
  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);
  const [newmodal, setNewmodal] = useState(false);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [resdata, setresdata] = useState([]);
  const toggle = () => setModal(!modal);
  const newtoggle = () => setNewmodal(!newmodal);
  const [headerdata, setHeaderdata] = useState([]);
  const [imgdata, setImgdata] = useState([]);
  const [notice, setNotice] = useState({});
  const [img, setImg] = useState("");
  const [education, setEducation] = useState(null);
  const [currentHomeWork, setCurrentHomeWork] = useState({});

  const onHandlePhotoChange = (e) => {
    const files = e.target.files[0];
    setPhoto(files);
  };

  const getHomeworkdata = (studentID) => {
    axios.get(`${BaseUrl}/student-own-homework/${studentID}`).then((res) => {
      setresdata(res.data.data);
    });
  };

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("education"));
    setEducation(response);
    getHomeworkdata(response.data._id);
  }, []);

  const submitDetails = () => {
    var formdata = new FormData();
    formdata.append("homework", photo);
    formdata.append("school_id", education.data.school_id);
    formdata.append("user_id", education.data.user_id);
    formdata.append("description", description);
    formdata.append("homework_id", currentHomeWork.homework_id);
    formdata.append("classes_id", education.data.classes_id);
    formdata.append("section_id", education.data.section_id);
    formdata.append("name", education.data.name);

    console.log("FormData", formdata);
    console.log("Photo", photo);
    // axios
    //   .post(`${BaseUrl}/add-student-homework/${currentHomeWork._id}`, {
    //     formdata,
    //   })
    //   .then((res) => {
    //     console.log("Add Reposne", res.data);
    //   });

    newtoggle();
  };

  const ViewMore = (user) => {
    const notice = user;
    console.log("ll", notice.user[0]);
    // const img = notice.user[0].image;
    setImg(img);
    setNotice(notice);
    // console.log('dd',user)

    toggle();
  };

  console.log("Current", currentHomeWork);
  return (
    <>
      <Header />
      <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            {/* <div style={{marginBottom:'10px'}}>
        <img style={{width:'100%',height:'50px'}} src={img}/>
       </div>    */}
            {notice.description}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <Modal isOpen={newmodal} toggle={newtoggle} className={className}>
          <ModalHeader toggle={newtoggle}>Upload Homework</ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  onChange={onHandlePhotoChange}
                  type="file"
                  name="file"
                  id="exampleFile"
                />
                <FormText color="muted">
                  please choose your homework file in pdf* only.
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Description</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="textarea"
                name="text"
                id="exampleText"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={submitDetails}>
              <b>Done</b>
            </Button>{" "}
            <Button color="secondary" onClick={newtoggle}>
              <b>Cancel</b>
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div className="card_container">
        {resdata.length > 0 &&
          resdata.map((user) => {
            return (
              <>
                <div className="main_card">
                  <div className="cards">
                    {/* card header */}
                    {headerdata.map((headers) => {
                      console.log(headers);
                      return (
                        <div className="card_header">
                          <div
                            style={{
                              marginLeft: "5px",
                              flexDirection: "row",
                              display: "flex",
                            }}
                          >
                            <Avatar
                              alt="Remy Sharp"
                              src={imgdata.image}
                              className={classes.large}
                            />

                            <div
                              style={{ paddingLeft: "8px", color: "#2e2e1f" }}
                            >
                              {" "}
                              {headers.name}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  color: "#b8b894",
                                  fontSize: "0.9rem",
                                }}
                              >
                                Class:<div>{headers.classes}</div>{" "}
                                <div style={{ marginLeft: "6px" }}>
                                  Section:
                                </div>
                                <div>{headers.section}</div>{" "}
                              </div>
                            </div>
                          </div>
                          <div style={{ flex: 1 }} />
                          <div className="student_subject">
                            {headers.subject}
                          </div>
                        </div>
                      );
                    })}

                    {/* card body */}
                    <div className="homewrkcards_body">
                      <p>{user.description}</p>
                    </div>
                    <div className="bottom_btns">
                      <Button
                        onClick={() => {
                          newtoggle();
                          setCurrentHomeWork(user);
                        }}
                        color="primary"
                      >
                        <b>Submit</b>
                        <TurnedInIcon />
                      </Button>
                      <Button onClick={() => ViewMore(user)} color="primary">
                        <b>View</b>
                        <VisibilityIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default StudentHomeWork;

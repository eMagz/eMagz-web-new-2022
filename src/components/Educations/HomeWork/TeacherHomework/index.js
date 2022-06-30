import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faSearch,
  faThList,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

import Tooltip from "@material-ui/core/Tooltip";
import Header from "../../Header";
import axios from "axios";
import { BaseUrl } from "../../../API";
import swal from "@sweetalert/with-react";
import { useHistory } from "react-router-dom";

function TeacherHomeWork() {
  const [modal, setModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [newdate, setNewdate] = useState("");
  const [date, setDate] = useState("");
  const [newdescription, setNewDescription] = useState("");
  const [description, setDescription] = useState("");
  const [classes, setClasses] = useState("");
  const [section, setSection] = useState("");
  const [photo, setPhoto] = useState("");
  const [subject, setSubject] = useState("");
  const [classdata, setClassdata] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [list, setList] = useState([]);
  const [homeWorkId, setHomeWorkId] = useState([]);
  const [educationData, setEducationData] = useState(null);

  const toggleEditmodal = () => setEditModal(!editmodal);
  const history = useHistory();

  const onHandlePhotoChange = (e) => {
    const files = e.target.files[0];
    setPhoto(files);
  };
  const onHandleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onHandleDateChange = (e) => {
    setDate(e.target.value);
  };
  const onHandleNewDateChange = (e) => {
    setNewdate(e.target.value);
  };

  const submitDetails = () => {
    // console.log('ss',photo)

    const data = {
      school_id: educationData.data.school_id,
      classes_id: classes,
      section_id: section,
      date: date,
      subject: subject,
      description: description,
      teacher_id: educationData.data._id,
    };

    const formdata = new FormData();

    formdata.append("homework", photo);

    axios.post(`${BaseUrl}/addteacherhomework`, data).then((fres) => {
      axios
        .post(
          `${BaseUrl}/uploadteacherhomework/${fres.data.data._id}`,
          formdata
        )
        .then((res) => {
          if (res.data.status || fres.data.status === true) {
            swal(<h4>{res.data.msg}</h4>);
          } else {
            swal(<h4>{res.data.msg}</h4>);
          }
        });
      //   console.log('fbb',fres)
    });

    setSection("");
    setClasses("");
    setDescription("");
    setDate("");
    setSubject("");
    setPhoto("");
    toggleModal();
  };

  const getHomeworkdata = (homewrkdata) => {
    console.log("homewrkdata", homewrkdata);
    axios
      .get(`${BaseUrl}/teacher-own-homework/${homewrkdata.data._id}`)
      .then((res) => {
        console.log("After added ", res);
        setList(res.data.data);
      });
  };
  const getClassdata = (homewrkdata) => {
    axios
      .get(`${BaseUrl}/viewclasseslist/${homewrkdata.data.school_id}`)
      .then((res) => {
        setClassdata(res.data.data);
      });
  };
  const getSectionData = () => {
    axios.get(`${BaseUrl}/class-wise-section/${classes}`).then((res) => {
      setSectiondata(res.data.data);
    });
  };

  const getHomeWorksByClassAndSection = (classId, sectionId) => {
    axios
      .post(`${BaseUrl}/searchteacherhomework/${classId}/${sectionId}`)
      .then((res) => {
        setList(res.data.data);
        console.log("Search Data", res.data.data);
      });
  };

  console.log("List", list);
  useEffect(() => {
    const homewrkdata = JSON.parse(localStorage.getItem("education"));
    setEducationData(homewrkdata);
    getHomeworkdata(homewrkdata);
    getClassdata(homewrkdata);
  }, []);

  useEffect(() => {
    getSectionData();
  }, [classes]);

  useEffect(() => {
    if (classes !== "" && section !== "")
      getHomeWorksByClassAndSection(classes, section);
  }, [classes, section]);

  const ChangePage = () => {
    history.push("/educations/teacher/home-works/view-all");
  };

  const handleHomeWork = (data) => {
    setHomeWorkId(data._id);
    console.log("Edit, HomeWork", data);
    setEditModal(true);
    setDate(data.date);
    setDescription(data.description);
    setSubject(data.subject);
  };
  const handleEditHomework = () => {
    const data = {
      school_id: educationData.data.school_id,
      classes_id: classes,
      section_id: section,
      date: date,
      subject: subject,
      description: description,
      teacher_id: educationData.data._id,
    };

    axios
      .post(`${BaseUrl}/edit-teacher-homework/${homeWorkId}`, data)
      .then((res) => {
        console.log("Res", res);
        getHomeworkdata(educationData);
        if (res.status === true) {
          swal(res.msg);
        } else {
          swal(res.msg);
        }
      });
    setNewDescription("");
    setNewdate("");
    setEditModal(false);
  };

  const handleDeleteHomeWork = (data) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(`${BaseUrl}/remove-teacher-homework/${data._id}`)
          .then((res) => {
            if (res.data.status) {
              getHomeworkdata(educationData);
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            }
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  console.log("List", list);
  const toggleModal = () => setModal(!modal);
  return (
    <>
      <Header />
      <div className="teacherreport_container">
        <div className="teacherreport_header">
          <div style={{ width: "50%" }}>
            <Form>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleSelectMulti">Class</Label>
                    <Input
                      required
                      value={classes}
                      onChange={(e) => setClasses(e.target.value)}
                      type="select"
                      name="select"
                      id="exampleSelect"
                    >
                      <option>--select--</option>
                      {classdata.map((value) => {
                        return (
                          <option value={value._id}>{value.classes}</option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleSelectMulti">Section</Label>
                    <Input
                      required
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      type="select"
                      name="select"
                      id="exampleSelect"
                    >
                      <option>--select--</option>
                      {sectiondata.map((value) => {
                        return (
                          <option value={value._id}>{value.section}</option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <Button
                    onClick={getHomeworkdata}
                    style={{ transform: "translateY(33px)" }}
                  >
                    Search
                    <FontAwesomeIcon
                      style={{ marginLeft: "10px" }}
                      icon={faSearch}
                    />{" "}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>

          <div className="add_icon">
            <Button onClick={ChangePage} style={{ marginRight: "10px" }}>
              VIEW HOMEWORK
              <FontAwesomeIcon
                style={{ marginLeft: "10px" }}
                icon={faThList}
              />{" "}
            </Button>
            <Tooltip title="Add Details">
              <Button onClick={setModal}>
                ADD HOMEWORK
                <FontAwesomeIcon
                  style={{
                    color: "white",
                    fontSize: "1rem",
                    marginLeft: "4px",
                  }}
                  icon={faPlusSquare}
                />{" "}
              </Button>
            </Tooltip>
          </div>
        </div>

        <div>
          <Modal isOpen={modal} toggle={toggleModal}>
            <Form>
              <ModalHeader toggle={toggleModal}> Add New homeWork</ModalHeader>
              <ModalBody>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Class</Label>
                      <Input
                        value={classes}
                        onChange={(e) => setClasses(e.target.value)}
                        type="select"
                        name="select"
                      >
                        <option>--select--</option>

                        {classdata.map((value) => {
                          return (
                            <option value={value._id}>{value.classes}</option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplePassword">Section</Label>
                      <Input
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        type="select"
                        name="select"
                      >
                        <option>--select--</option>
                        {sectiondata.map((value) => {
                          return (
                            <option value={value._id}>{value.section}</option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Subject</Label>
                      <Input
                        value={subject}
                        required
                        onChange={(e) => setSubject(e.target.value)}
                        type="email"
                        name="subject"
                        id="exampleEmail"
                        placeholder="with a placeholder"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleDatetime">Date</Label>
                      <Input
                        required
                        value={date}
                        onChange={onHandleDateChange}
                        type="date"
                        name="datetime"
                        id="exampleDatetime"
                        placeholder="datetime placeholder"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="exampleFile" sm={2}>
                    File
                  </Label>
                  <Col sm={12}>
                    <Input
                      onChange={onHandlePhotoChange}
                      type="file"
                      name="file"
                      id="exampleFile"
                    />
                    <FormText color="muted">
                      please select if any(pdf file only*)
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    style={{ height: "50px" }}
                    required
                    value={description}
                    onChange={onHandleDescriptionChange}
                    type="id"
                    name="number"
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button onClick={submitDetails} color="primary">
                  Add
                </Button>{" "}
                <Button color="secondary" onClick={toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div>
          <div>
            <Modal isOpen={editmodal} toggle={toggleEditmodal}>
              <Form>
                <ModalHeader toggle={toggleModal}>Edit HomeWork</ModalHeader>
                <ModalBody>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleEmail">Class</Label>
                        <Input
                          value={classes}
                          onChange={(e) => setClasses(e.target.value)}
                          type="select"
                          name="select"
                        >
                          <option>--select--</option>
                          {classdata.map((value) => {
                            return (
                              <option value={value._id}>{value.classes}</option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="examplePassword">Section</Label>
                        <Input
                          value={section}
                          onChange={(e) => setSection(e.target.value)}
                          type="select"
                          name="select"
                          id="exampleSelect"
                        >
                          {sectiondata.map((value) => {
                            return (
                              <option value={value._id}>{value.section}</option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleEmail">Subject</Label>
                        <Input
                          value={subject}
                          required
                          onChange={(e) => setSubject(e.target.value)}
                          type="email"
                          name="subject"
                          id="exampleEmail"
                          placeholder="with a placeholder"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleDatetime">Date</Label>
                        <Input
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          type="date"
                          name="datetime"
                          id="exampleDatetime"
                          placeholder="datetime placeholder"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="exampleFile" sm={2}>
                      File
                    </Label>
                    <Col sm={12}>
                      <Input
                        onChange={onHandlePhotoChange}
                        type="file"
                        name="file"
                        id="exampleFile"
                      />
                      <FormText color="muted">
                        Please select if any(pdf file only*)
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Label>Description</Label>
                    <Input
                      style={{ height: "50px" }}
                      required
                      value={description}
                      onChange={onHandleDescriptionChange}
                      type="id"
                      name="number"
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={handleEditHomework} color="primary">
                    Edit
                  </Button>{" "}
                  <Button color="secondary" onClick={() => setEditModal(false)}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            </Modal>
          </div>
        </div>
        <div className="teacherreport_table">
          <MaterialTable
            title="Home Work Details"
            columns={[
              { title: "Subjects", field: "subject" },
              { title: "HomeWork", field: "description" },
              { title: "Date", field: "date" },
            ]}
            data={list}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Details",
                onClick: (event, rowData) => {
                  handleHomeWork(rowData);
                },
              },
              {
                icon: "delete",
                tooltip: "Delete This",
                onClick: (event, rowData) => {
                  handleDeleteHomeWork(rowData);
                },
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              search: true,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default TeacherHomeWork;

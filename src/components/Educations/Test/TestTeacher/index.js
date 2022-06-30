import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPlusSquare,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormText,
} from "reactstrap";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../../Header";
import axios from "axios";
import { BaseUrl } from "../../../API";
import swal from "@sweetalert/with-react";
// import {BaseUrl} from '../../API';

function TestTeacher() {
  const [testid, setTestId] = useState("");
  const [modal, setModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [classes, setClasses] = useState("");
  const [section, setSection] = useState("");
  const [resdata, setresdata] = useState([]);

  const [testname, setTestName] = useState("");
  const [testtype, setTesttype] = useState("");
  const [duration, setDuration] = useState("");
  const [testdate, setTestdate] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [classesone, setClassesone] = useState("");
  const [sectionone, setSectionone] = useState("");
  const [classdata, setClassdata] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [educationAccess, setEducationAccess] = useState({});
  const history = useHistory();
  const toggle = () => setModal(!modal);
  const toggleEditmodal = () => setEditModal(!editmodal);
  const closeBtnone = (
    <button className="close" onClick={toggleEditmodal}>
      &times;
    </button>
  );

  const getAllTestData = (school_id) => {
    axios.get(`${BaseUrl}/showtests/${school_id}`).then((res) => {
      setAllTests(res.data.data);
    });
  };

  const getclassdta = (school_id) => {
    axios.get(`${BaseUrl}/viewclasseslist/${school_id}`).then((res) => {
      setClassdata(res.data.data);
    });
  };

  const getsectiondata = () => {
    axios.get(`${BaseUrl}/class-wise-section/${classes}`).then((res) => {
      setSectiondata(res.data.data);
    });
  };

  const onHandleTestIdChange = (e) => {
    setTestId(e.target.value);
  };
  const onHandleTestNameChange = (e) => {
    setTestName(e.target.value);
  };
  const onHandleTestTypeChange = (e) => {
    setTesttype(e.target.value);
  };
  const onHandleDurationChange = (e) => {
    setDuration(e.target.value);
  };
  const onHandleTestDateChange = (e) => {
    setTestdate(e.target.value);
  };
  const onHandleTestSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const onHandleMarksChange = (e) => {
    setMarks(e.target.value);
  };
  const onHandleClassesChange = (e) => {
    setClasses(e.target.value);
  };

  const onHandleSectionChange = (e) => {
    setSection(e.target.value);
  };
  const submitForm = () => {
    axios
      .post(
        `${BaseUrl}/searchtest/${classes}/${section}/${educationAccess.data.school_id}`
      )
      .then((res) => {
        console.log("ee", res.data);
        const resdata = res.data.data;
        setresdata(resdata);
      });
  };
  const addqstnpage = (url, data) => {
    history.push(url, data);
    setModal(false);
  };
  const editTestSubmit = () => {
    const dataone = {
      testname: testname,
      testtype: testtype,
      testdate: testdate,
      subject: subject,
      classes: classesone,
      section: section,
    };

    axios
      .post(`${BaseUrl}/edittest/${resdata._id}`, dataone)
      .then((res) => console.log("edit", res));

    toggle();
  };

  useEffect(() => {
    const homewrkdata = JSON.parse(localStorage.getItem("education"));
    setEducationAccess(homewrkdata);
    getclassdta(homewrkdata.data.school_id);
    getAllTestData(homewrkdata.data.school_id);
  }, []);

  useEffect(() => {
    getsectiondata();
  }, [classes]);

  const toggleModal = () => setModal(!modal);
  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      &times;
    </button>
  );
  return (
    <>
      <Header />
      <div className="testteacher_container">
        <div className="testteacher_header">
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
                    onClick={submitForm}
                    style={{ transform: "translateY(30px)" }}
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
            <Tooltip title="Add Details">
              <Button
                onClick={() => addqstnpage("/educations/teacher/add-test", [])}
                style={{ border: "none", outline: "none" }}
              >
                Add Questions{" "}
                <FontAwesomeIcon
                  style={{ color: "blue", fontSize: "1.5rem" }}
                  icon={faPlusSquare}
                />{" "}
              </Button>
            </Tooltip>
          </div>
        </div>

        <div>
          <div>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Modal title</ModalHeader>
              <ModalBody>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">Test Id*</Label>
                      <Input
                        required
                        value={testid}
                        onChange={onHandleTestIdChange}
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="with a placeholder"
                      />
                      <FormText color="muted">This field is Required*</FormText>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="examplePassword">Test Name*</Label>
                      <Input
                        required
                        value={testname}
                        onChange={onHandleTestNameChange}
                        type="email"
                        name="parentname"
                        id="examplePassword"
                        placeholder="password placeholder"
                      />
                      <FormText color="muted">This field is Required*</FormText>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">Test Types*</Label>
                      <Input
                        required
                        value={testtype}
                        onChange={onHandleTestTypeChange}
                        type="select"
                        name="select"
                        id="examplecaste"
                      >
                        <option>Select Test</option>
                        <option>Weekly Test</option>
                        <option>Surprise Test</option>
                      </Input>
                      <FormText color="muted">This field is Required*</FormText>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">Duration(in hrs.)*</Label>
                      <Input
                        required
                        value={duration}
                        onChange={onHandleDurationChange}
                        type="email"
                        name="city"
                        id="exampleCity"
                      />
                      <FormText color="muted">This field is Required*</FormText>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleState">Test Date*</Label>
                      <Input
                        required
                        value={testdate}
                        onChange={onHandleTestDateChange}
                        type="date"
                        name="date"
                        id="exampleDate"
                        placeholder="date placeholder"
                      />
                      <FormText color="muted">This field is Required*</FormText>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleZip">Subject*</Label>
                      <Input
                        required
                        value={subject}
                        onChange={onHandleTestSubjectChange}
                        type="email"
                        name="zip"
                        id="exampleZip"
                      />
                      <FormText color="muted">This field is Required*</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleCity">Marks*</Label>
                      <Input
                        required
                        value={marks}
                        onChange={onHandleMarksChange}
                        type="number"
                        name="city"
                        id="exampleCity"
                      />
                      <FormText color="muted">This field is Required*</FormText>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleCity">Class*</Label>
                      <Input
                        required
                        value={classes}
                        onChange={onHandleClassesChange}
                        type="text"
                      >
                        <option>--select--</option>
                        {classdata.map((value) => {
                          return (
                            <option value={value._id}>{value.classes}</option>
                          );
                        })}
                      </Input>
                      <FormText color="muted">This field is Required*</FormText>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleCity">Section*</Label>
                      <Input
                        required
                        value={section}
                        onChange={onHandleSectionChange}
                        type="email"
                        name="city"
                        id="exampleCity"
                      >
                        <option>--select--</option>
                        {sectiondata.map((value) => {
                          return (
                            <option value={value._id}>{value.section}</option>
                          );
                        })}
                      </Input>
                      <FormText color="muted">This field is Required*</FormText>
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={editTestSubmit}>
                  Do Something
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
        <div className="viewteacher_table">
          <MaterialTable
            title="Test List Details"
            columns={[
              { title: "Test Name", field: "testname" },
              { title: "Test Type", field: "testtype" },
              { title: "date", field: "testdate" },
              { title: "Total Marks", field: "marks" },
              { title: "Subject", field: "subject" },
            ]}
            data={allTests}
            actions={[
              {
                icon: "people-Alt",
                tooltip: "View Participants",
                onClick: (event, rowData) => {
                  // addqstnpage('/educations/teacher/list-question', rowData)
                  history.push(
                    "/educations/teacher/test-list/viewstudentlist",
                    rowData
                  );
                },
              },
              {
                icon: "edit",
                tooltip: "Edit Details",
                onClick: (event, rowData) => {
                  console.log("row", rowData);
                  setTestId(rowData.testid);
                  setTestName(rowData.testname);
                  setTestdate(rowData.testdate);
                  setSectionone(rowData.section);
                  setSubject(rowData.subject);
                  setClassesone(rowData.classes);
                  setDuration(rowData.duration);
                  setMarks(rowData.marks);
                  setTesttype(rowData.testtype);
                  setModal(!modal);
                },
              },
              {
                icon: "add",
                tooltip: "Add Question",
                onClick: (event, rowData) => {
                  addqstnpage("/educations/teacher/list-question", rowData);
                },
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              search: false,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default TestTeacher;

import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Header from "../../Header";
import axios from "axios";
import "./index.css";
import swal from "@sweetalert/with-react";
import { BaseUrl } from "../../../API";

const CreateTest = () => {
  const [testid, setTestId] = useState("");
  const [allTests, setAllTests] = useState([]);
  const [testname, setTestName] = useState("");
  const [testtype, setTesttype] = useState("");
  const [duration, setDuration] = useState("");
  const [testdate, setTestdate] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [classes, setClasses] = useState("");
  const [section, setSection] = useState("");
  const [classdata, setClassdata] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [testType, setTestType] = useState();
  const [educationAccess, setEducationAccess] = useState({});
  const history = useHistory();

  const getclassdta = (school_id) => {
    axios.get(`${BaseUrl}/viewclasseslist/${school_id}`).then((res) => {
      setClassdata(res.data.data);
    });
  };
  const getAllTestData = (school_id) => {
    axios.get(`${BaseUrl}/showtests/${school_id}`).then((res) => {
      setAllTests(res.data.data);
    });
  };

  const getTestType = (school_id) => {
    axios.get(`${BaseUrl}/searchreporttype/${school_id}`).then((res) => {
      setTestTypes(res.data.data);
    });
  };

  const getsectiondata = () => {
    axios.get(`${BaseUrl}/class-wise-section/${classes}`).then((res) => {
      setSectiondata(res.data.data);
    });
  };

  useEffect(() => {
    const education = JSON.parse(localStorage.getItem("education"));
    setEducationAccess(education);
    getAllTestData(education.data.school_id);
    getclassdta(education.data.school_id);
    getTestType(education.data.school_id);
  }, []);

  useEffect(() => {
    if (classes !== null) {
      getsectiondata();
    }
  }, [classes]);

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

  const onHandleSectionChange = (e) => {
    setSection(e.target.value);
  };

  const submitDetails = () => {
    const classId = classdata.filter((data) => data._id === classes);
    const sectionId = sectiondata.filter((data) => data._id === section);

    console.log("ClasId SectionId", classId, sectionId);

    const data = {
      testname: testname,
      testtype: testtype,
      duration: duration,
      subject: subject,
      marks: marks,
      testdate: testdate,
      classes: classId[0].classes,
      section: sectionId[0].section,
      classes_id: classId[0]._id,
      section_id: sectionId[0]._id,
      school_id: educationAccess.data.school_id,
      AcademicReportId: testType,
    };

    if (
      data.testdate === "" ||
      data.testid === "" ||
      data.testtype === "" ||
      data.duration === "" ||
      data.subject === "" ||
      data.marks === "" ||
      data.classes === "" ||
      data.section === ""
    ) {
      swal(
        <div>
          <h1>Oops!</h1>
          <p>All fields are required field*</p>
        </div>
      );
    } else {
      axios.post(`${BaseUrl}/create-new-test`, data).then((res) => {
        if (res.status === 200) {
          swal(
            <div>
              <h1>Successfully Added!</h1>
              <p>You Have Added Test Successfully!</p>
            </div>
          );
          history.push("/educations/teacher/test-list");
        } else {
          swal(
            <div>
              <h1>Ooopss!</h1>
              <p>{res.msg}</p>
            </div>
          );
        }
      });
    }

    setSubject("");
    setTestId("");
    setTestName("");
    setMarks("");
    setTestdate("");
    setSubject("");
    setTesttype("");
    setDuration("");
    setClasses("");
    setSection("");
  };

  return (
    <>
      <Header />
      <div className="addstudent_container">
        <div className="addstudent_card">
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Test Name*</Label>
                  <Input
                    required
                    value={testname}
                    onChange={onHandleTestNameChange}
                    type="text"
                    placeholder="Enetr test name"
                  />
                  <FormText color="muted">This field is Required*</FormText>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Test Types*</Label>
                  <Input
                    required
                    value={testtype}
                    onChange={onHandleTestTypeChange}
                    type="select"
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
                    type="text"
                    name="city"
                    placeholder="Enetr test city"
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
                    type="text"
                    name="zip"
                    placeholder="Enetr test subject"
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
                    name="mark"
                    placeholder="Enetr test mark"
                  />
                  <FormText color="muted">This field is Required*</FormText>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">Class</Label>
                  <Input
                    value={classes}
                    required
                    onChange={(e) => setClasses(e.target.value)}
                    type="select"
                    name="classes"
                  >
                    <option>--option--</option>
                    {classdata.map((item) => {
                      return <option value={item._id}>{item.classes}</option>;
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">Class</Label>
                  <Input
                    value={section}
                    required
                    onChange={(e) => setSection(e.target.value)}
                    type="select"
                    name="classes"
                  >
                    <option>--option--</option>
                    {sectiondata.map((item) => {
                      return <option value={item._id}>{item.section}</option>;
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleState">Class</Label>
                  <Input
                    value={testType}
                    required
                    onChange={(e) => setTestType(e.target.value)}
                    type="select"
                    name="classes"
                  >
                    <option>--option--</option>
                    {testTypes.map((item) => {
                      return (
                        <option value={item._id}>{item.reporttype}</option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Button onClick={submitDetails} variant="contained" color="primary">
              {" "}
              Create Test
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateTest;

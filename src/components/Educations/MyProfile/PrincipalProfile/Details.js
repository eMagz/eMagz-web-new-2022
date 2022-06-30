import React, { useState, useEffect } from "react";
import "./index.css";
import { Label, FormGroup, Input, Row, Col } from "reactstrap";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../../API";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    marginTop: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

let education = 0;
let myTemp = [];

const TemplateThree = () => {
  const classes = useStyles();
  const history = useHistory();
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [section, setSection] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState(null);
  const [isStudentLoading, setIsStudentLoading] = useState(true);

  const getClasses = (id) => {
    setIsLoading(true);
    axios.get(`${BaseUrl}/viewclasseslist/${id}`).then((res) => {
      setSchools(res.data.data);
      setIsLoading(false);
    });
  };
  const getSections = () => {
    axios.get(`${BaseUrl}/class-wise-section/${selectedClass}`).then((res) => {
      setSection(res.data.data);
    });
  };

  const getStudentList = () => {
    setIsStudentLoading(true);
    let one = `${BaseUrl}/section-wise-student-list/${selectedSection}`;
    let two = `${BaseUrl}/section-wise-teacher-list/${selectedSection}`;
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          setStudentList(responseOne.data.data);
          setTeacherList(responseTwo.data.data);
          setIsStudentLoading(false);
        })
      )
      .catch((errors) => {
        // react on errors.
      });
    axios.get().then((res) => {
      setStudentList(res.data.data);
      setIsStudentLoading(false);
    });
  };

  const getFolloStatus = (education) => {
    axios.post(
      `${BaseUrl}/school-follow/${education.data.user_id}/${education.data.school_id}`
    );
  };
  useEffect(() => {
    education = JSON.parse(localStorage.getItem("education"));
    getClasses(education.data.school_id);
    getFolloStatus(education);
  }, []);

  useEffect(() => {
    if (selectedSection !== null) {
      getStudentList();
    }
    getSections();
  }, [selectedClass]);

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
      ></div>
      <div className="temp3_container">
        {isLoading ? (
          <div className={classes.root}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div style={{ margin: "4rem 4.5rem" }}>
            <MaterialTable
              title="Total Classes"
              columns={[
                { title: "Class", field: "classes" },
                { title: "Total Student.", field: "student" },
                { title: "Total Teacher.", field: "teacher" },
              ]}
              data={schools}
              actions={[
                {
                  icon: "visibility",
                  tooltip: "Show Details",
                  onClick: (event, rowData) =>
                    history.push(
                      `/admin/education/schools/${rowData._id}`,
                      rowData
                    ),
                },
              ]}
              options={{
                actionsColumnIndex: -1,
                search: true,
              }}
            />
          </div>
        )}
        <div style={{ margin: "4rem 4.5rem" }}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleSelect">
                  <h5>Please Select Class</h5>
                </Label>
                <Input
                  type="select"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option>--select class--</option>
                  {schools.map((data) => {
                    return (
                      <option
                        value={data._id}
                      >{`Class ${data.classes}`}</option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleSelect">
                  <h5>Please Select Section</h5>
                </Label>
                <Input
                  type="select"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option>--select section--</option>
                  {section !== null &&
                    section.map((data) => {
                      return (
                        <option
                          value={data._id}
                        >{`Section ${data.section}`}</option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col md={6}>
              {selectedSection === null ? (
                ""
              ) : selectedSection !== null && isStudentLoading ? (
                <div className={classes.root}>
                  <CircularProgress color="secondary" />
                </div>
              ) : (
                <div style={{ marginLeft: "4rem" }}>
                  <MaterialTable
                    title="Students List"
                    columns={[
                      { title: "Name", field: "name" },
                      { title: "Roll.", field: "roll" },
                      { title: "Mobile", field: "mobile" },
                    ]}
                    data={studentList}
                    actions={[
                      {
                        icon: "visibility",
                        tooltip: "Show Details",
                        onClick: (event, rowData) =>
                          history.push(
                            `/admin/education/schools/${rowData._id}`,
                            rowData
                          ),
                      },
                    ]}
                    options={{
                      actionsColumnIndex: -1,
                      search: true,
                    }}
                  />
                </div>
              )}
            </Col>
            <Col md={6}>
              {selectedSection === null ? (
                ""
              ) : selectedSection !== null && isStudentLoading ? (
                <div className={classes.root}>
                  <CircularProgress color="secondary" />
                </div>
              ) : (
                <div style={{ marginLeft: "4rem" }}>
                  <MaterialTable
                    title="Teacher List"
                    columns={[
                      { title: "Name", field: "name" },
                      { title: "Mobile", field: "mobile" },
                    ]}
                    data={teacherList}
                    actions={[
                      {
                        icon: "visibility",
                        tooltip: "Show Details",
                        onClick: (event, rowData) =>
                          history.push(
                            `/admin/education/schools/${rowData._id}`,
                            rowData
                          ),
                      },
                    ]}
                    options={{
                      actionsColumnIndex: -1,
                      search: true,
                    }}
                  />
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default TemplateThree;

import React, { useState, useEffect } from "react";
import "./index.css";
import Header from "../../Header";
import { Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BaseUrl } from "../../../API";
import swal from "@sweetalert/with-react";
import { useHistory } from "react-router-dom";

const PrincipalAttendance = () => {
  const [selectedValue, setSelectedValue] = useState("N");
  const [classes, setClasses] = useState("");
  const [section, setSection] = useState("");
  const [date, setDate] = useState("");
  const [users, setUsers] = useState([]);
  const [school_id, setSchool_id] = useState("11");
  const [resData, setResData] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  // const [mainData,setMainData]= useState(null)
  const educationDetails = JSON.parse(localStorage.getItem("education"));
  const history = useHistory();

  useEffect(() => {
    getStudentData();
  }, []);

  const getStudentData = () => {
    let users = [];

    // console.log('data',data)
    axios
      .get(`${BaseUrl}/viewteacherlist/${educationDetails.data.school_id}`)
      .then((res) => {
        console.log("cc", res);
        const resData = res.data.data.teacherDetails;
        resData.forEach((element) => {
          users.push({ user_id: element._id, attendance: "N" });
        });
        setUsers(users);
        setResData(resData);
      });
  };

  // console.log('min',mainData)

  const postAttendance = () => {
    const body = {
      users: users,
      daymonth: startDate,
    };

    axios.post(`${BaseUrl}/addattendance`, body).then((res) => {
      console.log("qq", res);
      if (res.data.status === true) {
        swal(res.data.msg);
      }
    });
  };

  function setAttendane(index, attendance) {
    let ud = users;
    ud[index].attendance = attendance;
    setUsers(ud);
  }

  useEffect(() => {
    axios
      .get(`${BaseUrl}/viewclasseslist/${educationDetails.data.school_id}`)
      .then((res) => {
        setClassdata(res.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BaseUrl}/viewsectionlist/${educationDetails.data.school_id}`)
      .then((res) => {
        setSectiondata(res.data.data);
      });
  }, []);

  const changeTeacherPage = () => {
    history.push("/educations/principal/attendance/view-all-teachers");
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="attendance_container">
        <div className="attendance_buttons">
          <div>
            <Button
              onClick={changeTeacherPage}
              variant="contained"
              color="primary"
            >
              Teacher Attendance{" "}
            </Button>
          </div>
        </div>
        <div className="attendance_card_head">
          <Form className="attendance_form">
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="examplePassword">Date</Label>
                  <DatePicker
                    dateFormat={"dd-MM-yyyy"}
                    className="date_picker_attn"
                    selected={startDate}
                    onChange={(date) => {
                      console.log("e", date);
                      setStartDate(date);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form>

          {resData.map((item, index) => {
            return (
              <div className="attendance_list">
                <div style={{ paddingTop: "6px", paddingLeft: "10px" }}>
                  {item.roll}
                </div>
                <div style={{ paddingTop: "6px" }}>{item.name}</div>

                <div>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      defaultValue="N"
                    >
                      <FormControlLabel
                        value="Y"
                        onChange={() => {
                          setAttendane(index, "Y");
                        }}
                        control={<Radio color="primary" />}
                        label="Present"
                      />{" "}
                      <FormControlLabel
                        value={"N"}
                        onChange={() => {
                          setAttendane(index, "N");
                        }}
                        control={<Radio color="primary" />}
                        label="Absent"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            );
          })}

          <div className="attendance_submit">
            <Button
              onClick={postAttendance}
              variant="contained"
              color="primary"
            >
              Submit Attendance
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrincipalAttendance;

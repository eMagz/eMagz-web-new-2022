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

const ViewStudentMarksDetails = (props) => {
  const [modal, setModal] = useState(false);
  const [newdata, setNewdata] = useState([]);
  const [questionlist, setQuestionList] = useState([]);
  const [rowdata, setrowdata] = useState([]);
  const [answers, setAnswers] = useState([]);
  console.log("prps", props.location.state);
  const studentdata = JSON.parse(localStorage.getItem("education"));

  useEffect(() => {
    let studentList = [];
    axios
      .get(
        `${BaseUrl}/viewtestattend/${props.location.state._id}/${studentdata.data.school_id}`
      )
      .then((res) => {
        res.data.data.forEach((data) => {
          studentList.push(data.user_id);
          console.log("data.user_id", data.user_id);
        });
        setNewdata(studentList);
      });
  }, []);

  const handleChange = (e, index) => {
    let ans = answers;
    ans[index].marks = e.target.value;
    setAnswers(ans);
  };

  console.log("aa", rowdata);

  const updateDetails = () => {
    const data = {
      answers: answers,
      user_id: rowdata.user_id,
      school_id: rowdata.school_id,
      TestId: props.location.state._id,
    };

    axios.post(`${BaseUrl}/markupdate`, data).then((res) => {
      if (res.data.status === true) {
        swal(res.data.msg);
      }
    });
    toggle();
  };

  const toggle = () => setModal(!modal);

  return (
    <>
      <Header />
      <div className="viewteacher_table">
        <div className="viewdetails">
          <div className="mainview">
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
            >
              Test Name:
            </div>
            <div
              style={{
                paddingLeft: "10px",
                fontSize: "1rem",
                paddingTop: "10px",
              }}
            >
              {props.location.state.testname}
            </div>
          </div>
          <div className="mainview">
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
            >
              Test Type:
            </div>
            <div
              style={{
                paddingLeft: "10px",
                fontSize: "1rem",
                paddingTop: "10px",
              }}
            >
              {props.location.state.testtype}
            </div>
          </div>
          <div className="mainview">
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
            >
              Subject:
            </div>
            <div
              style={{
                paddingLeft: "10px",
                fontSize: "1rem",
                paddingTop: "10px",
              }}
            >
              {props.location.state.subject}
            </div>
          </div>
          <div className="mainview">
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
            >
              Total Marks:
            </div>
            <div
              style={{
                paddingLeft: "10px",
                fontSize: "1rem",
                paddingTop: "10px",
              }}
            >
              {props.location.state.marks}
            </div>
          </div>
          <div className="mainview">
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
            >
              Date:
            </div>
            <div
              style={{
                paddingLeft: "10px",
                fontSize: "1rem",
                paddingTop: "10px",
              }}
            >
              {props.location.state.testdate}
            </div>
          </div>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Question List</ModalHeader>
            <ModalBody>
              {questionlist.map((qstn, index) => {
                console.log("ee", qstn);
                return (
                  <div key={qstn._id} className="qustn">
                    <div style={{ padding: "0px 10px" }}>
                      {qstn.question[0].questionno}.{qstn.question[0].question}
                    </div>
                    <div style={{ padding: "0px 10px" }}>
                      <b>Currect ans:</b> {qstn.question[0].answer}
                    </div>
                    <div style={{ padding: "0px 10px" }}>
                      <b>Student ans:</b>
                      {qstn.answer}
                    </div>
                    <div style={{ padding: "0px 10px" }}>
                      <b>Total Marks:</b> {qstn.question[0].marks}
                    </div>
                    <Form>
                      <FormGroup>
                        <Label for="exampleEmail">
                          <b>Marks Obtained</b>
                        </Label>
                        <Input
                          required
                          onChange={(e) => handleChange(e, index)}
                          type="number"
                          name="marks"
                          id="marks"
                        />
                      </FormGroup>
                    </Form>
                  </div>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={updateDetails}>
                Update
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <MaterialTable
          title="Student List Details"
          columns={[
            { title: " Name", field: "name" },
            { title: "Class", field: "classes" },
            { title: "section", field: "section" },
            { title: "Roll", field: "roll" },
          ]}
          data={newdata}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Details",
              onClick: (event, rowData) => {
                axios
                  .get(`${BaseUrl}/viewquestionanswer/${rowData.user_id}`)
                  .then((res) => {
                    setQuestionList(res.data.data);
                    let answers = [];
                    res.data.data.forEach((item) => {
                      console.log("vv", item);
                      answers.push({
                        question_id: item.question_id,
                        marks: item.marks,
                      });
                    });
                    setAnswers(answers);
                  });
                setrowdata(rowData);
                toggle();
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            search: false,
          }}
        />
      </div>
    </>
  );
};

export default ViewStudentMarksDetails;

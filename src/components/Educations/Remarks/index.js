import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { Button } from "@material-ui/core";
import Header from "../Header";
import aswl from "sweetalert";
import "./index.css";
import Select from "react-select";
import { BaseUrl } from "../../API";
import swal from "sweetalert";
import SelectionRemark from "./SelectionRemark";
import {
  Row,
  Col,
  Input,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  FormGroup,
  Label,
} from "reactstrap";

const Index = () => {
  const [students, setStudent] = useState([]);
  const [model, setModel] = useState(false);
  const [select, setSelect] = useState("");
  const [isSelected, setIsSelected] = useState(true);
  const [classdata, setClassdata] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [classes, setClasses] = useState(null);
  const [section, setSection] = useState("");
  const [studentsData, setStudentsData] = useState([]);
  const [selectStudent, setSelectStudent] = useState([]);
  const [searchStudent, setSearchStudent] = useState();
  const [remarks, setRemarks] = useState("");
  const [educationAccess, setEducationAccess] = useState({});
  const [studentId, setStudentId] = useState("");
  const toggle = () => setModel(!model);

  const getAllRemarks = (id) => {
    axios.get(`${BaseUrl}/view-remarks/${id}`).then((res) => {
      console.log("REs", res);
      setStudent(res.data.data);
    });
  };

  const getclassdta = (school_id) => {
    axios.get(`${BaseUrl}/viewclasseslist/${school_id}`).then((res) => {
      setClassdata(res.data.data);
    });
  };
  const getAllStudents = () => {
    const temp = [];
    axios
      .get(`${BaseUrl}/class-section-wise-student-list/${classes}/${section}`)
      .then((res) => {
        setStudentsData(res.data.data);
        res.data.data.forEach((data) => {
          temp.push({ label: data.name, value: data.name, id: data._id });
        });
        setSelectStudent(temp);
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
    getAllRemarks(education.data.school_id);
    getclassdta(education.data.school_id);
  }, []);

  useEffect(() => {
    if (classes !== null) {
      getsectiondata();
    }
    getAllStudents();
  }, [setClasses, classes, setSection, section]);

  const handleSelect = (e) => {
    setClasses(e.target.value);
  };

  const hadleSearchChange = (e) => {
    console.log("Sealect ", e, e.name);
    setSearchStudent(e);
    setStudentId(e.id);
  };

  console.log("Student Name", searchStudent);

  const handleSubmitRemarks = () => {
    const remarksData = {
      name: educationAccess.data.name,
      role: educationAccess.role,
      classes_id: classes,
      section_id: section,
      student_id: studentId,
      student_name: searchStudent.value,
      school_id: educationAccess.data.school_id,
      remarks: remarks,
    };
    axios.post(`${BaseUrl}/add-remarks`, remarksData).then((res) => {
      if (res.data.status === true) {
        console.log("Success", res);
        getAllRemarks(educationAccess.data.school_id);
        aswl(res.data.msg);
        toggle();
      }
    });
  };

  return (
    <>
      <Header />
      <div className="remarkbutton">
        <Button
          onClick={toggle}
          className="remarksBtn"
          variant="contained"
          color="secondary"
        >
          Give Re-marks
        </Button>
      </div>
      <div style={{ marginTop: "5rem" }}>
        <MaterialTable
          title="Student Remark List"
          columns={[
            { title: "Given By", field: "role" },
            { title: "Name", field: "name" },
            { title: "Student Name", field: "student_name" },
            { title: "Date", field: "date" },
            { title: "Re-marks", field: "remarks" },
          ]}
          actions={[
            {
              icon: "edit",
              tooltip: "Update Details",
            },
            {
              icon: "delete",
              tooltip: "Delete Details",
            },
          ]}
          data={students}
          actions={[
            {
              icon: "edit",
              tooltip: "Update",
              onClick: (event, rowData) => {},
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            search: true,
          }}
        />
        <SelectionRemark classes={classdata} />
      </div>
      <Modal isOpen={model} toggle={toggle}>
        <ModalHeader toggle={toggle}>Approved The Request</ModalHeader>
        <ModalBody>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleState">Class</Label>
                <Input
                  value={classes}
                  required
                  onChange={(e) => handleSelect(e)}
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
            <Col md={6}>
              <FormGroup>
                <Label for="exampleZip">Section</Label>
                <Input
                  value={section}
                  required
                  onChange={(e) => setSection(e.target.value)}
                  type="select"
                  name="section"
                >
                  <option>--option--</option>
                  {sectiondata.map((item) => {
                    return <option value={item._id}>{item.section}</option>;
                  })}
                </Input>
              </FormGroup>
            </Col>

            <Col md={12}>
              <form>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  name="color"
                  value={searchStudent}
                  onChange={hadleSearchChange}
                  options={selectStudent}
                />
              </form>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label style={{ marginTop: "10px" }} for="exampleText">
                  Write Remarks in Details
                </Label>
                <Input
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                    setIsSelected(false);
                  }}
                  type="textarea"
                  name="text"
                  id="exampleText"
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmitRemarks} disabled={isSelected}>
            Submit
          </Button>
          <Button
            onClick={() => {
              toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Index;

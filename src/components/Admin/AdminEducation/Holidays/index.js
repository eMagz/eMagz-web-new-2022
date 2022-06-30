import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./admin.css";
import { BaseUrl, ImageUrl } from "../../../API";
import { Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import Button from "@material-ui/core/Button";
import Header from "../Header";
import Icon from "@material-ui/core/Icon";
import AddBoxIcon from "@material-ui/icons/AddBox";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminData = JSON.parse(localStorage.getItem("Admin"));

const Index = (props) => {
  const history = useHistory();
  const [schools, setSchools] = useState([]);
  const [status, setStatus] = useState("");
  const [schoolID, setSchoolID] = useState("");
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [holidayDate, setHolidayDate] = useState("");
  const [holidayDiscription, setHolidayDiscription] = useState("");
  const [holidaySchoolID, setHolidaySchoolID] = useState("");
  const [holidaysList, setHolidaysList] = useState([]);
  const [holidayID, setHolidayID] = useState("");

  const getAllShop = () => {
    axios
      .get(`${BaseUrl}/school-holidays-list/${props.schoolId}`)
      .then((res) => {
        setHolidaysList(res.data.data);
      });
  };
  useEffect(() => {
    getAllShop();
  }, [holidaysList, holidaysList]);

  const handleDeleteSchool = (schoolData) => {};

  const getApprovedData = (data) => {
    console.log("Vendor ID", data._id);
    setSchoolID(data._id);
  };

  const updateToggle = () => setUpdateModal(!updateModal);
  const toggle = () => setModal(!modal);

  const handleHolidayAPi = () => {
    toggle();
    const data = {
      date: holidayDate,
      description: holidayDiscription,
      school_id: props.schoolId,
    };
    axios.post(`${BaseUrl}/create-holiday`, data).then((res) => {
      let resData = res.data.data;
      let tm = [...holidaysList];
      tm.push(resData);
      setHolidaysList(tm);
      setHolidayDiscription("");
      setHolidayDate("");
    });
  };

  const handleEdit = (data) => {
    updateToggle();
    setHolidayID(data._id);
    setHolidayDiscription(data.description);
  };

  const updateHolidayAPi = () => {
    const data = {
      date: holidayDate,
      description: holidayDiscription,
      school_id: props.schoolId,
    };
    axios.post(`${BaseUrl}/edit-holiday/${holidayID}`, data).then((res) => {
      let resData = res.data.data;
      let tm = [...holidaysList];
      tm.push(resData);
      setHolidaysList(tm);
      setHolidayDiscription("");
      setHolidayDate("");
    });
  };
  return (
    <>
      <Header />
      <div className="admin_container">
        <div className="addlist_buttons">
          <Button onClick={toggle} variant="contained" color="primary">
            Make Holidays
            <AddBoxIcon />
          </Button>
        </div>
        <div className="fees_table">
          <MaterialTable
            title="Holidays List"
            columns={[
              { title: "Date", field: "date" },
              { title: "Discription", field: "description" },
              { title: "School ID", field: "school_id" },
            ]}
            data={holidaysList}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Holiday",
                onClick: (event, rowData) => handleEdit(rowData),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              search: true,
            }}
          />
        </div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Make Holiday</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={12}>
                <Input
                  type="date"
                  value={holidayDate}
                  onChange={(e) => setHolidayDate(e.target.value)}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col md={12}>
                <Input
                  type="text"
                  placeholder="Please write a reason for holiday"
                  value={holidayDiscription}
                  onChange={(e) => setHolidayDiscription(e.target.value)}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleHolidayAPi} color="primary">
              Create
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {"Update Model"}
        <Modal isOpen={updateModal} toggle={updateToggle}>
          <ModalHeader toggle={toggle}>Update Details</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={12}>
                <Input
                  type="date"
                  value={holidayDate}
                  onChange={(e) => setHolidayDate(e.target.value)}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col md={12}>
                <Input
                  type="text"
                  placeholder="Please write a reason for holiday"
                  value={holidayDiscription}
                  onChange={(e) => setHolidayDiscription(e.target.value)}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button onClick={updateHolidayAPi} color="primary">
              Update
            </Button>{" "}
            <Button color="secondary" onClick={updateToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};
export default Index;

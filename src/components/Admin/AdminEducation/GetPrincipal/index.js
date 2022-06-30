import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BaseUrl } from "../../../API";
import { Col, Row, Input } from "reactstrap";
import Button from "@material-ui/core/Button";
import Header from "../Header";
import axios from "axios";

const Index = (props) => {
  const [schoolID, setSchoolID] = useState("");
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [holidaysList, setHolidaysList] = useState([]);
  const [holidayID, setHolidayID] = useState("");
  const [select, setSelect] = useState("");
  const [isSelected, setIsSelected] = useState(true);

  const getAllShop = () => {
    axios.get(`${BaseUrl}/principal-applications-list`).then((res) => {
      setHolidaysList(res.data.data);
    });
  };
  useEffect(() => {
    getAllShop();
  }, []);

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
      status: select,
    };
    axios
      .post(`${BaseUrl}/change-application-status/${holidayID}`, data)
      .then((res) => {
        if (res.data.status === true) {
          getAllShop();
        }
      });
  };

  const handleEdit = (data) => {
    toggle();
    setHolidayID(data._id);
  };

  const handleSelect = (e) => {
    if (e.target.value.length !== 0) {
      setSelect(e.target.value);
      setIsSelected(false);
    }
  };
  return (
    <>
      <Header />
      <div className="admin_container">
        <div className="fees_table">
          <MaterialTable
            title="Principal Request"
            columns={[
              { title: "Name", field: "name" },
              { title: "Mobile", field: "mobile" },
              { title: "Status", field: "status" },
              { title: "District", field: "district" },
              { title: "Religion", field: "religion" },
              { title: "Email", field: "email" },
              { title: "Gender", field: "gender" },
              { title: "Birth", field: "dob" },
            ]}
            data={holidaysList}
            actions={[
              {
                icon: "edit",
                tooltip: "Update",
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
          <ModalHeader toggle={toggle}>Update the principal status</ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <Input
                  type="select"
                  value={select}
                  onChange={(e) => handleSelect(e)}
                >
                  <option>---Please Select---</option>
                  <option value="verified">Verified</option>
                  <option value="reject">Reject</option>
                </Input>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleHolidayAPi} color="primary">
              Update
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};
export default Index;

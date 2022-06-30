import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { BaseUrl } from "../../../API";
import swal from "sweetalert";
import {
  Row,
  Col,
  Input,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Button,
} from "reactstrap";

const Request = () => {
  const [students, setStudent] = useState([]);
  const [model, setModel] = useState(false);
  const [select, setSelect] = useState("");
  const [isSelected, setIsSelected] = useState(true);
  const [selectedID, setSelectedID] = useState(null);

  const toggle = () => setModel(!model);
  const getAplication = () => {
    axios.get(`${BaseUrl}/students-teachers-applications`).then((res) => {
      console.log("REs", res);
      setStudent(res.data.data);
    });
  };

  useEffect(() => {
    getAplication();
  }, []);

  const handleUpdate = (data) => {
    setSelectedID(data._id);
    toggle();
  };

  const handleSelect = (e) => {
    if (e.target.value.length !== 0) {
      setSelect(e.target.value);
      setIsSelected(false);
    }
  };
  const chnageUpdate = () => {
    const data = {
      status: select,
    };
    axios
      .post(`${BaseUrl}/change-application-status/${selectedID}`, data)
      .then((res) => {
        if (res.data.status === true) {
          swal("Staus Updated");
          console.log("res.data.data", res.data.data);
          axios
            .post(`${BaseUrl}/addapplication`, {
              name: res.data.data.name,
              role: res.data.data.role,
              dob: res.data.data.dob,
              gender: res.data.data.gender,
              caste: res.data.data.caste,
              religion: res.data.data.religion,
              aadhaarcard: res.data.data.aadhaarcard,
              fathername: res.data.data.fathername,
              fathercontactno: res.data.data.fathercontactno,
              mobile: res.data.data.mobile,
              email: res.data.data.email,
              address: res.data.data.address,
              pincode: res.data.data.pincode,
              classes_id: res.data.data.classes_id,
              section_id: res.data.data.section_id,
              school_id: res.data.data.school_id,
              district: res.data.data.district,
              roll: res.data.data.district,
              user_id: res.data.data.user_id,
            })
            .then((res) => {
              console.log("Add Application ", res);
            });
          getAplication();
        } else {
          swal("Something is wrong! Please try again.");
        }
      });
  };
  return (
    <>
      <div style={{ margin: "0 5rem" }}>
        <MaterialTable
          title="Pending Student List"
          columns={[
            { title: "Request", field: "role" },
            { title: "Name", field: "name" },
            { title: "Mobile", field: "mobile" },
            { title: "Status", field: "status" },
            { title: "District", field: "district" },
            { title: "Religion", field: "religion" },
            { title: "Email", field: "email" },
            { title: "Gender", field: "gender" },
            { title: "Birth", field: "dob" },
          ]}
          data={students}
          actions={[
            {
              icon: "edit",
              tooltip: "Update",
              onClick: (event, rowData) => handleUpdate(rowData),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            search: true,
          }}
        />
      </div>
      <Modal isOpen={model} toggle={toggle}>
        <ModalHeader toggle={toggle}>Approved The Request</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Input
                type="select"
                value={select}
                onChange={(e) => handleSelect(e)}
              >
                <option>---Please Select---</option>
                <option value="Approved">Verified</option>
                <option value="Reject">Reject</option>
              </Input>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              chnageUpdate();
              toggle();
            }}
            disabled={isSelected}
          >
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Request;

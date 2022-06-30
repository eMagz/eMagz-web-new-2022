import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { BaseUrl } from "../../API";
import swal from "sweetalert";
import {
  Row,
  Col,
  Input,
  Modal,
  ModalFooter,
  FormGroup,
  Label,
  ModalBody,
  ModalHeader,
  Button,
} from "reactstrap";

const SelectionRemark = ({ classes }) => {
  const [remarks, setRemarks] = useState([]);
  const [setionId, setSetionId] = useState("");
  const [classId, setClassId] = useState("");
  const [sections, setSections] = useState([]);
  const [model, setModel] = useState(false);
  const [select, setSelect] = useState("");
  const [remark, setRemark] = useState("");

  const toggle = () => setModel(!model);

  const getFilteredRemarks = (id) => {
    axios
      .get(`${BaseUrl}/search-remarks/${classId}/${setionId}`)
      .then((res) => {
        setRemarks(res.data.data);
      });
  };
  const getSectionData = () => {
    axios.get(`${BaseUrl}/class-wise-section/${classId}`).then((res) => {
      setSections(res.data.data);
    });
  };

  useEffect(() => {
    getSectionData();
    getFilteredRemarks();
  }, [classId, setClassId, setionId, setSetionId]);

  const chnageUpdate = () => {
    const data = {
      status: select,
    };
    axios
      .post(`${BaseUrl}/change-application-status/${select}`, data)
      .then((res) => {
        if (res.data.status === true) {
          swal("Staus Updated");
          getFilteredRemarks();
        } else {
          swal("Something is wrong! Please try again.");
        }
      });
  };
  const handleRemarkUpdate = (data) => {
    setSelect(data._id);
    setRemark(data.remarks);
    toggle();
  };

  const handleRemarkRemove = (data) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.post(`${BaseUrl}/remove-remarks/${data._id}`).then((res) => {
          if (res.data.status === true) {
            swal("Poof! Your remark has been deleted!", {
              icon: "success",
            });
          }
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  return (
    <div>
      <Row className="ml-2" style={{ width: "95%" }}>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleState">Class</Label>
            <Input
              value={classId}
              required
              onChange={(e) => setClassId(e.target.value)}
              type="select"
              name="classes"
            >
              <option>--option--</option>
              {classes.map((item) => {
                return <option value={item._id}>{item.classes}</option>;
              })}
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleZip">Section</Label>
            <Input
              value={setionId}
              required
              onChange={(e) => setSetionId(e.target.value)}
              type="select"
              name="section"
            >
              <option>--option--</option>
              {sections.map((item) => {
                return <option value={item._id}>{item.section}</option>;
              })}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <div style={{ margin: "5rem 5rem" }}>
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
              onClick: (event, rowData) => handleRemarkUpdate(rowData),
            },
            {
              icon: "delete",
              tooltip: "Delete Details",
              onClick: (event, rowData) => handleRemarkRemove(rowData),
            },
          ]}
          data={remarks}
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
                type="textarea"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              ></Input>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              chnageUpdate();
              toggle();
            }}
          >
            Update
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SelectionRemark;

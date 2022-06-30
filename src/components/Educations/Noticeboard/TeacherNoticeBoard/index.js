import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../../Header";
import axios from "axios";
import { BaseUrl } from "../../../API";
import swal from "@sweetalert/with-react";

export default function TheacherNoticeboard() {
  const [modal, setModal] = useState(false);
  const [newmodal, setNewModal] = useState(false);
  const [date, setDate] = useState("");
  // const [name,setName]= useState('');
  const [description, setDescription] = useState("");

  const [editdescription, setEditdescription] = useState("");
  const [editdate, setEditDate] = useState("");
  const [resdata, setData] = useState([]);
  const [row, setRow] = useState([]);

  const data = localStorage.getItem("education");
  const finaldata = JSON.parse(data);

  console.log("finl", finaldata);
  const toggleModal = () => setModal(!modal);
  const toggleNewModal = () => setNewModal(!newmodal);

  const submitDetails = () => {
    axios
      .get(`${BaseUrl}/viewnoticeboard/${finaldata.data.school_id}`)
      .then((res) => {
        const resdata = res.data.data;
        console.log("pp", resdata);
        setData(resdata);
      });
  };

  useEffect(() => {
    submitDetails();
  }, []);

  const addNoticeboard = () => {
    const getData = {
      date: date,
      description: description,
      user_id: finaldata.data.user_id,
      school_id: finaldata.data.school_id,
    };

    axios.post(`${BaseUrl}/addnoticeboard`, getData).then((res) => {
      if (res.data.status === true) {
        swal(<h1>{res.data.msg}</h1>);
      } else {
        swal(<h1>{res.data.msg}</h1>);
      }
    });

    toggleModal();

    submitDetails();
  };

  const EditNoticeBoard = () => {
    const data = {
      date: editdate,
      description: editdescription,
    };
    axios.post(`${BaseUrl}/editnoticeboard/${row._id}`, data).then((res) => {
      if (res.data.status === true) {
        swal(<h1>{res.data.msg}</h1>);
      }
      submitDetails();
    });

    toggleNewModal();
  };

  // useEffect(()=>{
  // getDetailsfees();
  // }, [])

  const closeBtn = (
    <button className="close" onClick={toggleNewModal}>
      &times;
    </button>
  );
  const clsbtn = (
    <button className="close" onClick={toggleModal}>
      &times;
    </button>
  );
  return (
    <>
      <Header />
      <div className="noticeboard_container">
        <div className="add_icon">
          <Tooltip title="Add Noticeboard">
            <button
              onClick={setModal}
              style={{
                backgroundColor: "gray",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "1.1rem",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              {" "}
              ADD{" "}
              <FontAwesomeIcon
                style={{ color: "white", fontSize: "1.1rem" }}
                icon={faPlusSquare}
              />{" "}
            </button>
          </Tooltip>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggleModal}>
            <Form>
              <ModalHeader toggle={toggleModal}>Add Noticeboard</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="exampleDate">Date</Label>
                  <Input
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Description</Label>
                  <Input
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    type="textarea"
                    name="text"
                    id="exampleText"
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={addNoticeboard}>
                  Add Noticeboard
                </Button>{" "}
                <Button color="secondary" onClick={toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div>
          <Modal isOpen={newmodal} toggle={toggleNewModal}>
            <Form>
              <ModalHeader toggle={toggleNewModal}>
                Edit Noticeboard
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="exampleDate">Date</Label>
                  <Input
                    value={editdate}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Description</Label>
                  <Input
                    value={editdescription}
                    onChange={(e) => {
                      setEditdescription(e.target.value);
                    }}
                    type="textarea"
                    name="text"
                    id="exampleText"
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button onClick={EditNoticeBoard} color="primary">
                  Edit Noticeboard
                </Button>{" "}
                <Button color="secondary" onClick={toggleNewModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div className="noticeboard_table">
          <MaterialTable
            title="Noticeboard Table"
            columns={[
              { title: "date", field: "date" },
              { title: "Description", field: "description" },
            ]}
            data={resdata}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Details",
                onClick: (event, rowData) => {
                  console.log("row", rowData);
                  setRow(rowData);
                  setEditDate(rowData.date);
                  setEditdescription(rowData.description);
                  setNewModal(!modal);
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

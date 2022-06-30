import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./admin.css";
import { BaseUrl, ImageUrl } from "../../API";
import { Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import Button from "@material-ui/core/Button";
import Header from "../Header";
import Icon from "@material-ui/core/Icon";
import AddBoxIcon from "@material-ui/icons/AddBox";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AdminData = JSON.parse(localStorage.getItem("Admin"));

const Admin = () => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [shop, setShop] = useState([]);
  const [status, setStatus] = useState("");
  const [pendingVendors, setPendinVendors] = useState([]);
  const [rejectedVendors, setRejectedVendors] = useState([]);
  const [approvedVendors, setApprovedVendors] = useState([]);

  const [shopID, setShopID] = useState("");
  const toggleModal = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      &times;
    </button>
  );
  const getAllPendingVendors = () => {
    axios.get(`${BaseUrl}/pending-vendor-applications`).then((res) => {
      setPendinVendors(res.data.data);
    });
  };
  const getAllApprovedVendors = () => {
    axios.get(`${BaseUrl}/approved-vendors`).then((res) => {
      setApprovedVendors(res.data.data);
    });
  };
  const getAllRejectedVendors = () => {
    axios.get(`${BaseUrl}/rejected-vendors`).then((res) => {
      setRejectedVendors(res.data.data);
    });
  };
  useEffect(() => {
    getAllApprovedVendors();
    getAllPendingVendors();
    getAllRejectedVendors();
  }, []);

  const changeshopStatus = () => {
    axios.post(`${BaseUrl}/change-vendor-status/${shopID}`, { status });
    axios.get(`${BaseUrl}/show-all-vendors`).then((res) => {
      setShop(res.data.data);
    });
  };
  const getApprovedData = (data) => {
    console.log("Vendor ID", data._id);
    setShopID(data._id);
    toggleModal();
  };
  return (
    <>
      <Header />
      <div className="admin_container">
        <div>
          <Modal isOpen={modal} toggle={toggleModal}>
            <Form>
              <ModalHeader toggle={toggleModal} close={closeBtn}>
                Shop Approval
              </ModalHeader>
              <ModalBody>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleSelect">
                        Please update the shop status
                      </Label>
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        onClick={(e) => setStatus(e.target.value)}
                      >
                        <option value="Verifying">Verifying</option>
                        <option value="Canceled">Canceled</option>
                        <option value="Verified">Verified</option>
                        <option value="Approved">Approved</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    toggleModal();
                    changeshopStatus();
                  }}
                >
                  Submit
                </Button>{" "}
                <Button color="secondary" onClick={toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div className="fees_table">
          <MaterialTable
            title="Vendor Recent Application"
            columns={[
              { title: "Vendor ID", field: "_id" },
              { title: "Shop Name", field: "business_name" },
              { title: "Type", field: "business_type" },
              { title: "Country", field: "country" },
              { title: "GST Number", field: "gst_number" },
              { title: "Status", field: "status" },
              { title: "Date", field: "createdAt" },
            ]}
            data={pendingVendors}
            actions={[
              {
                icon: "edit",
                tooltip: "Approve Vendor",
                onClick: (event, rowData) => getApprovedData(rowData),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              search: true,
            }}
          />
        </div>
        <div className="fees_table">
          <MaterialTable
            title="Approved and Verified Vendors"
            columns={[
              { title: "Vendor ID", field: "_id" },
              { title: "Shop Name", field: "business_name" },
              { title: "Type", field: "business_type" },
              { title: "Country", field: "country" },
              { title: "GST Number", field: "gst_number" },
              { title: "Status", field: "status" },
              { title: "Date", field: "createdAt" },
            ]}
            data={approvedVendors}
            actions={[
              {
                icon: "edit",
                tooltip: "Approve vendors",
                onClick: (event, rowData) => getApprovedData(rowData),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              search: true,
            }}
          />
        </div>
        <div className="fees_table">
          <MaterialTable
            title="Rejected Vendor List"
            columns={[
              { title: "Vendor ID", field: "_id" },
              { title: "Shop Name", field: "business_name" },
              { title: "Type", field: "business_type" },
              { title: "Country", field: "country" },
              { title: "GST Number", field: "gst_number" },
              { title: "Status", field: "status" },
              { title: "Date", field: "createdAt" },
            ]}
            data={rejectedVendors}
            actions={[
              {
                icon: "edit",
                tooltip: "Give a Chance",
                onClick: (event, rowData) => getApprovedData(rowData),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              search: true,
            }}
          />
        </div>
      </div>
    </>
  );
};
export default Admin;

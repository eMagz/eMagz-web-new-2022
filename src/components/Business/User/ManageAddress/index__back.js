import React, { useState, useEffect } from "react";
import "./index.css";
import "./main.css";
import AddIcon from "@material-ui/icons/Add";
import Header from "../Navbar";
import { BaseUrl } from "../../../API";
import Button from "@material-ui/core/Button";
import { Collapse } from "reactstrap";
import { Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import SaveIcon from "@material-ui/icons/Save";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Axios from "axios";
import swal from "@sweetalert/with-react";
import arrowIcon from "../../../../assets/right_menu_arrow.svg";
const ManageAddress = ({ history }) => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState("");
  const [addtype, setAddtype] = useState("");
  const [useraddress, setUserAddress] = useState("");
  const [newname, setNewname] = useState("");
  const [newpin, setNewPin] = useState("");
  const [newmobile, setNewMobile] = useState("");
  const [newlocality, setNewlocality] = useState("");
  const [newaddress, setNewaddress] = useState("");
  const [newstates, setNewstates] = useState("");
  const [newcity, setNewcity] = useState("");
  const [newaddtype, setNewAddtype] = useState("");
  const [userid, setUserId] = useState("");
  const [getname, setGetname] = useState("");

  const toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState([]);
  const toggleModal = () => setModal(!modal);

  const addAddress = () => {
    const data = {
      name: name,
      address: address,
      city: city,
      address_type: addtype,
      state: states,
      pincode: pincode,
      mobile: mobile,
      locality: locality,
      user_id: userdata._id,
    };

    Axios.post(`${BaseUrl}/add-user-address-details`, data).then((res) => {
      if (res.data.status) {
        swal(res.data.msg);
      } else {
        swal(res.data.msg);
      }
      getaddress();
    });

    setName("");
    setMobile("");
    setAddtype("");
    setCity("");
    setStates("");
    setLocality("");
    setMobile("");
    setPincode("");
    setAddress("");
  };

  useEffect(() => {
    getaddress();
    getName();
  }, []);

  const getaddress = () => {
    Axios.get(`${BaseUrl}/user-address-details/${userdata._id}`).then((res) => {
      setDetails(res.data.data);
    });
  };

  const EditAddressDetails = () => {
    const data = {
      name: newname,
      address: newaddress,
      city: newcity,
      address_type: newaddtype,
      state: newstates,
      pincode: newpin,
      mobile: newmobile,
      locality: newlocality,
    };

    Axios.post(`${BaseUrl}/edit-user-address-details/${userid}`, data).then(
      (res) => {
        if (res.data.status) {
          swal(res.data.msg);
        } else {
          swal(res.data.msg);
        }
        getaddress();
      }
    );

    toggleModal();
  };

  const getEditId = (val) => {
    console.log("val", val);
    setUserAddress(val);
    setNewname(val.name);
    setNewcity(val.city);
    setNewaddress(val.address);
    setNewPin(val.pincode);
    setNewstates(val.state);
    setNewlocality(val.locality);
    setNewMobile(val.mobile);
    setNewAddtype(val.address_type);
    setUserId(val._id);
    toggleModal();
  };

  const getName = () => {
    Axios.get(`${BaseUrl}/view-user-name/${userdata._id}`).then((res) => {
      setGetname(res.data.data);
    });
  };

  const deleteUser = (val) => {
    Axios.post(`${BaseUrl}/delete-user-address/${val._id}`).then((res) => {
      if (res.data.status) {
        swal(res.data.msg);
      } else {
        swal(res.data.msg);
      }
      getaddress();
    });
  };

  return (
    <>
      <Header />
      <h3 className="wishlist__text">
        <span>My Account</span> <img src={arrowIcon} alt="" />{" "}
        <span>Manage Address</span>
      </h3>
      <div className="userProfile__container">
        <div className="rightbar">
          <div className="rigtside_setting_card">
            <div className="manageaddress_container">
              <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Edit Details</ModalHeader>
                <ModalBody>
                  <Form>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">Name</Label>
                          <Input
                            type="text"
                            value={newname}
                            onChange={(e) => setNewname(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">
                            Phone Number(10 digit)
                          </Label>
                          <Input
                            value={newmobile}
                            onChange={(e) => setNewMobile(e.target.value)}
                            type="number"
                            name="mobile"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Pincode</Label>
                          <Input
                            value={newpin}
                            onChange={(e) => setNewPin(e.target.value)}
                            type="number"
                            name="pincode"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Locality</Label>
                          <Input
                            value={newlocality}
                            onChange={(e) => setNewlocality(e.target.value)}
                            type="text"
                            name="locality"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label>Address</Label>
                      <Col md={12}>
                        <Input
                          value={newaddress}
                          onChange={(e) => setNewaddress(e.target.value)}
                          type="textarea"
                          name="address"
                        />
                      </Col>
                    </FormGroup>
                    <Row form>
                      <Col md={3}>
                        <FormGroup>
                          <Label>City/District/Town</Label>
                          <Input
                            value={newcity}
                            onChange={(e) => setNewcity(e.target.value)}
                            type="text"
                            name="city"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label>State</Label>
                          <Input
                            value={newstates}
                            onChange={(e) => setNewstates(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              checked={newaddtype === "Home"}
                              value="Home"
                              onChange={(e) => setNewAddtype(e.target.value)}
                              type="radio"
                            />{" "}
                            Home
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              checked={newaddtype === "Office"}
                              value="Office"
                              onChange={(e) => setNewAddtype(e.target.value)}
                              type="radio"
                            />{" "}
                            Office
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={EditAddressDetails}>
                    Save
                  </Button>{" "}
                  <Button color="secondary" onClick={toggleModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <div className="manageaddress__container">
                <div className="address_headline">Manage Address</div>
                <span
                  onClick={() =>
                    history.push("/business/user-dashboard/profile")
                  }
                >
                  Back To Profile
                </span>
              </div>
              <div className="addnew_address">
                <div className="manage_address">
                  <Button
                    color="primary"
                    onClick={toggle}
                    startIcon={<AddIcon />}
                  >
                    <b>ADD A NEW ADDRESS</b>
                  </Button>
                </div>
              </div>
              <Collapse isOpen={isOpen}>
                <div className="toggle_form">
                  <Form>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Name</Label>
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="name"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Phone Number(10 digit)</Label>
                          <Input
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Pincode</Label>
                          <Input
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Locality</Label>
                          <Input
                            value={locality}
                            onChange={(e) => setLocality(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label>Address</Label>
                      <Col md={12}>
                        <Input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          type="textarea"
                        />
                      </Col>
                    </FormGroup>
                    <Row form>
                      <Col md={3}>
                        <FormGroup>
                          <Label>City/District/Town</Label>
                          <Input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label>State</Label>
                          <Input type="text" />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              value="Home"
                              checked={addtype === "Home"}
                              onChange={(e) => setAddtype(e.target.value)}
                              type="radio"
                              name="radio1"
                            />{" "}
                            Home
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup check>
                          <Label check>
                            <Input
                              value="Office"
                              checked={addtype === "Office"}
                              onChange={(e) => setAddtype(e.target.value)}
                              type="radio"
                              name="radio2"
                            />{" "}
                            Office
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row from>
                      <Col md={3}>
                        <Button
                          onClick={addAddress}
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<SaveIcon />}
                        >
                          Save
                        </Button>
                      </Col>
                      <Col md={3}>
                        <Button
                          onClick={toggle}
                          variant="contained"
                          color="secondary"
                          size="small"
                        >
                          cancel
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Collapse>
              <div className="address_container">
                {details.map((value) => {
                  return (
                    <div className="pre_address">
                      <div className="header_description">
                        <div className="tag_line">
                          <p>{value.address_type} Address</p>
                        </div>
                        <div style={{ flex: 1 }} />
                        <div style={{ margin: "4px 4px" }}>
                          <Button
                            onClick={() => getEditId(value)}
                            color="primary"
                          >
                            <b>Edit</b>
                          </Button>
                          <Button
                            onClick={() => deleteUser(value)}
                            color="secondary"
                          >
                            <b>Delete</b>
                          </Button>
                        </div>
                      </div>
                      <div className="profile_details">
                        <div className="nme">
                          <h3> {value.name}</h3>
                          <p>{value.mobile}</p>
                          <div>
                            {value.address},{value.locality},{value.city}
                          </div>
                          <b>{value.pincode} </b>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAddress;

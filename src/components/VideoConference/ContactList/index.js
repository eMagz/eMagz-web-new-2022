import React, { useState, useEffect } from "react";
import "./index.css";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Header from "../../Header";
import { BaseUrl } from "../../API";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PersonIcon from "@material-ui/icons/Person";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  CustomInput,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Axios from "axios";
// import swal from 'sweetalert';
import swal from "@sweetalert/with-react";

let userdetails = JSON.parse(localStorage.getItem("user"));
const MeetingHome = () => {
  const user = useSelector((state) => state.loginReducer.userDetails);
  if (Object.keys(user).length !== 0) {
    userdetails = user;
  }
  const [contactlist, setContactList] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);

  const toggle = () => setOpenModel(!openModel);
  const createContactgHandler = () => {
    const data = new FormData();
    data.append("photo", photo);
    data.append("name", name);
    data.append("email", email);
    data.append("phone_number", phone);
    data.append("user_id", userdetails._id);

    Axios.post(`${BaseUrl}/add-contacts`, data).then((res) => {
      if (res.data.status === true) {
        getContactList();
        swal(res.data.msg);
      } else {
        swal(res.data.msg);
      }
    });
  };

  const onHandlePictureChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const getContactList = () => {
    Axios.get(`${BaseUrl}/contacts-list/${userdetails._id}`).then((res) => {
      setContactList(res.data.data);
    });
  };

  useEffect(() => {
    getContactList();
  }, []);
  return (
    <>
      <Header />
      <div className="userProfile_container">
        <div className="leftbar">
          <div className="usercard">
            <div className="profile_details">
              <div style={{ marginTop: "20px" }}>
                <img
                  src={userdetails.image}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginTop: "0px",
                  }}
                />
              </div>
              <div style={{ marginTop: "20px", marginLeft: "10px" }}>
                Hello,
                <div style={{ marginTop: "5px" }}>
                  <b>{userdetails.name}</b>
                </div>
              </div>
            </div>
          </div>
          <div className="setting_list" style={{ marginTop: "5rem" }}>
            <List component="nav">
              <Link to="/video-conference/dashborad/home">
                <ListItem button>
                  <ListItemIcon>
                    <OpenInBrowserIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/video-conference/dashborad/meetings">
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mettings" />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/video-conference/dashborad/contactlist">
                <ListItem button>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Contacts" />
                </ListItem>
              </Link>
              <Divider />
            </List>
          </div>
        </div>
        <div className="rightbar">
          <div
            className="rigtside_setting_card"
            style={{ marginTop: "0px", height: "61vh" }}
          >
            <div className="manageaddress_container">
              <div className="addlist_buttons">
                <Button variant="contained" color="primary" onClick={toggle}>
                  ADD CONTACT
                  <AddBoxIcon />
                </Button>
              </div>
              {contactlist.length > 0 ? (
                <>
                  <table>
                    {contactlist.map((item, id) => {
                      return (
                        <tbody>
                          <tr>
                            <td>
                              <img
                                src={item.photo}
                                style={{ height: "40px", height: "40px" }}
                              />
                            </td>
                            <td>
                              {item.name}
                              <br />
                            </td>
                            <td>{item.email}</td>
                            <td>{`Mobile No: ${item.phone_number}`}</td>
                            <td>
                              <button className="remove"></button>Start
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </>
              ) : (
                <>
                  <div className="wishlist">
                    <div>
                      <span>You don't have meeting schedule</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={openModel} toggle={toggle}>
        <ModalHeader toggle={toggle}>Schedule your meeting</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">Person Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">Phone Number</Label>
                  <Input
                    type="number"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleCustomFileBrowser">Select Picture</Label>
                  <CustomInput
                    onChange={onHandlePictureChange}
                    type="file"
                    accept="images/*"
                    name="images"
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              toggle();
              createContactgHandler();
            }}
          >
            Submit
          </Button>
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MeetingHome;

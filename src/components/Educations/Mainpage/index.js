import React, { useEffect, useState } from "react";
import "./index.css";
import Select from "react-select";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import PersonIcon from "@material-ui/icons/Person";
import ViewIcon from "@material-ui/icons/Visibility";

import {
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BaseUrl, ImageUrl } from "../../API";
import swal from "sweetalert";

let userData = JSON.parse(localStorage.getItem("user"));
const MainLandingpage = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [school, setSchool] = useState("");
  const [classes, setClasses] = useState("");
  const [section, setSection] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [states, setStates] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("Male");
  const [caste, setCaste] = useState("OBC");
  const [religion, setReligion] = useState("Muslim");
  const [dob, setDob] = useState("");
  const [district, setDistrict] = useState("");
  const [fathername, setFatthername] = useState("");
  const [contactno, setContactno] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [searchtext, setSearchtext] = useState("");
  const [searchdata, setSearchdata] = useState("");
  const [classdata, setClassdata] = useState([]);
  const [sectiondata, setSectiondata] = useState([]);
  const [statelist, setStatelist] = useState([]);
  const [districtlist, setDistrictlist] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [stateId, setStateId] = useState("");
  const [schoolData, setSchoolData] = useState(null);
  const [schoolsData, setSchoolsData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ariaFocusMessage, setAriaFocusMessage] = useState("");
  const [userSearchSchool, setUserSearchSchool] = useState([]);

  const toggle = () => setModal(!modal);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const history = useHistory();
  const redirect = (data) => {
    history.push("/educations/home-page/profile");
  };

  console.log("CIT", city);
  const getAllSchools = () => {
    let temp = [];
    axios.get(`${BaseUrl}/listschool`).then((res) => {
      console.log("RES", res.data.data);
      let tempdata = res.data.data;
      for (let i = 0; i < tempdata.length; i++) {
        console.log("DATS", tempdata[i]);
        temp.push({
          value: tempdata[i].name,
          label: tempdata[i].name,
          id: tempdata[i]._id,
        });
      }
      setSchoolsData(temp);
    });
  };

  const getclassdta = (school_id) => {
    axios.get(`${BaseUrl}/viewclasseslist/${school_id}`).then((res) => {
      setClassdata(res.data.data);
    });
  };

  const getsectiondata = (school_id) => {
    axios.get(`${BaseUrl}/viewsectionlist/${school_id}`).then((res) => {
      setSectiondata(res.data.data);
    });
  };

  const getStatedata = () => {
    axios.get(`${BaseUrl}/searchstate/${states}`).then((res) => {
      setStatelist(res.data.data);
    });
  };
  const setDistrictdata = () => {
    axios.get(`${BaseUrl}/searchcity/${district}`).then((res) => {
      setDistrictlist(res.data.data);
    });
  };

  useEffect(() => {
    userData = JSON.parse(localStorage.getItem("user"));
    getAllSchools();
  }, []);

  const hadleSearchChange = (e) => {
    setSchoolData(e);
    getclassdta(e.id);
    getsectiondata(e.id);
  };
  const formSubmit = () => {
    const data = {
      name: name,
      address: address,
      role: role,
      school_id: schoolData.id,
      classes_id: classes,
      section_id: section,
      mobile: phone,
      pincode: pin,
      city: city,
      email: email,
      gender: gender,
      caste: caste,
      religion: religion,
      dob: dob,
      user_id: userData._id,
      district: states,
      fathername: fathername,
      fathercontactno: contactno,
      aadhaarcard: aadhar,
      state: states,
    };
    axios.post(`${BaseUrl}/newapplication`, data).then((res) => {
      try {
        if (res.data.status === true) {
          swal(
            "Successfully Registered!",
            "Wait for verification!",
            "success"
          ).then((ok) => {
            if (ok) {
              history.push("/dashboard");
            }
          });
        } else {
          swal(`${res.data.msg}`, "Please try again!", "warning");
          toggle();
        }
      } catch (error) {
        swal("Someting is wrong!", "Please try again!", "warning");
      }
    });
    toggle();
  };

  const searchSchool = (e) => {
    setSearchtext(e.target.value);
    axios.get(`${BaseUrl}/searchschool/${e.target.value}`).then((res) => {
      setUserSearchSchool(res.data.data);
    });
  };
  console.log("setUserSearchSchool", userSearchSchool);
  function setDistrictFromlist(e) {
    setDistrict(e.name);
    setDistrictlist([]);
    setDistrictId(e._id);
  }
  function setStatesFromlist(e) {
    setStates(e.name);
    setStatelist([]);
    setStateId(e._id);
  }
  return (
    <>
      <div className="mainpage_container">
        <div className="mainpage_navbar">
          <div className="register_button">
            <Button
              onClick={toggle}
              variant="contained"
              color="primary"
            >
              Register here
              <PersonIcon />
            </Button>
          </div>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Registration Form</ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="name"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                      value={phone}
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      type="number"
                      name="contactno"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Father's Name</Label>
                    <Input
                      value={fathername}
                      required
                      onChange={(e) => setFatthername(e.target.value)}
                      type="text"
                      name="fathername"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Father's Phone Number</Label>
                    <Input
                      value={contactno}
                      required
                      onChange={(e) => setContactno(e.target.value)}
                      type="number"
                      name="mobile"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                />
              </FormGroup>
              <FormGroup>
                <Label>Address</Label>
                <Input
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  name="address"
                  id="exampleAddress"
                  placeholder="1234 Main St"
                />
              </FormGroup>
              <Row form>
                <Col md={12}>
                  <form>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={schoolsData[0]}
                      name="color"
                      value={schoolData}
                      onChange={hadleSearchChange}
                      onMenuOpen={toggleMenu}
                      onMenuClose={toggleMenu}
                      options={schoolsData}
                    />
                  </form>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label>Role</Label>
                    <Input
                      value={role}
                      required
                      onChange={(e) => setRole(e.target.value)}
                      type="select"
                      name="classes"
                    >
                      <option>--option--</option>
                      <option>Student</option>
                      <option>Teacher</option>
                      <option>Principal</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleState">Class</Label>
                    <Input
                      value={classes}
                      required
                      onChange={(e) => setClasses(e.target.value)}
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
                <Col md={4}>
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
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label>State</Label>
                    <Input
                      value={states}
                      required
                      onChange={(e) => {
                        setStates(e.target.value);
                        getStatedata();
                      }}
                      type="text"
                      name="state"
                    />
                  </FormGroup>
                  {statelist.length > 0 ? (
                    <ul className="dropdownMain">
                      {statelist.map((list) => {
                        return (
                          <li onClick={(e) => setStatesFromlist(list)}>
                            {list.name}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>District</Label>
                    <Input
                      value={district}
                      required
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        setDistrictdata();
                      }}
                      type="text"
                      name="district"
                    />
                    {districtlist.length > 0 ? (
                      <ul className="dropdownMain">
                        {districtlist.map((list) => {
                          return (
                            <li onClick={(e) => setDistrictFromlist(list)}>
                              {list.name}{" "}
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <FormGroup>
                    <Label>Pincode</Label>
                    <Input
                      value={pin}
                      required
                      onChange={(e) => setPin(e.target.value)}
                      type="text"
                      name="pincode"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label>Gender</Label>
                    <Input
                      value={gender}
                      required
                      onChange={(e) => setGender(e.target.value)}
                      type="select"
                      name="gender"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleState">Caste</Label>
                    <Input
                      value={caste}
                      required
                      onChange={(e) => setCaste(e.target.value)}
                      type="select"
                      name="caste"
                    >
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC/ST">SC/ST</option>
                      <option value="Others">Others</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleZip">Religion</Label>
                    <Input
                      value={religion}
                      required
                      onChange={(e) => setReligion(e.target.value)}
                      type="select"
                      name="religion"
                    >
                      <option value="Hindu">Hindu</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Christian">Christian</option>
                      <option value="Parsi">Parsi</option>
                      <option value="Sikh">Sikh</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleDate">Date</Label>
                    <Input
                      value={dob}
                      required
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      name="date"
                      id="exampleDate"
                      placeholder="date placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">AADHAAR Number</Label>
                    <Input
                      value={aadhar}
                      required
                      onChange={(e) => setAadhar(e.target.value)}
                      type="text"
                      name="aadhar"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>{" "}
              <Button color="primary" onClick={formSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <div className="mainpage_search">
          <div className="mainpage_transition">
            <input
              class="form-control"
              value={searchtext}
              onChange={(e) => searchSchool(e)}
              style={{
                width: "400px",
                display: "inline",
                borderRadius: "50px",
                outline: "none",
              }}
              type="text"
              name="name"
              placeholder="search here..."
            />
            <IconButton
              // onClick={() => getsearchdata(searchtext)}
              style={{ transform: "translateX(-50px)" }}
            >
              <SearchIcon />
            </IconButton>
          </div>
          {userSearchSchool.length > 0 ? (
            <div className="mainsection_div">
              <div key={school._id} className="school_list">
                <table style={{ width: "100%" }}>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Medium</th>
                    <th>Board</th>
                    <th>Contact No</th>
                    <th>Action</th>
                  </tr>
                  {userSearchSchool.map((school) => {
                    console.log("Modern Schccol", school);
                    return (
                      <tr>
                        <td>
                          <img
                            style={{ width: 80, height: 80 }}
                            src={school.logoimage}
                            alt="img"
                          />
                        </td>
                        <td>{school.name}</td>
                        <td>{school.medium}</td>
                        <td>{school.board}</td>
                        <td>{school.reg_no + " " + school.phonenumber}</td>
                        <td>
                          <div onClick={() => redirect(school)}>
                            {<ViewIcon />}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MainLandingpage;

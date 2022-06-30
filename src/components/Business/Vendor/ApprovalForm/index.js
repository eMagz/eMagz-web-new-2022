import React, { useState, useRef } from "react";
import "./index.css";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  InputGroup,
  CustomInput,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { Link } from "@material-ui/core";
import Header from "../../Header";
import Hamburger from "../../HamburgerIcon";
import axios from "axios";
import { BaseUrl } from "../../../API";
import swal from "@sweetalert/with-react";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Spinner } from "reactstrap";
import { set } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const ApprovalForm = () => {
  alert('approval form')
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [homeaddress, setHomeaddress] = useState("");
  const [homepin, setHomepin] = useState("");
  const [states, setStates] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [businessname, setBusinessname] = useState("");
  const [pan, setPan] = useState("");
  const [businesstype, setBusinesstype] = useState("");
  const [businessaddress, setBusinessaddress] = useState("");
  const [pin, setPin] = useState("");
  const [gstin, setGstin] = useState("");
  const [statelist, setStatelist] = useState([]);
  const [citylist, setCitylist] = useState([]);
  const [cityId, setCityId] = useState("");
  const [stateId, setStateId] = useState("");
  const [idproofphoto, setIdproofhoto] = useState("");
  const [signaturephoto, setSignaturephoto] = useState("");
  const [logoPhoto, setLogoPhoto] = useState("");
  const [bannerPhoto, setBannerPhoto] = useState("");
  const [resdata, setResdata] = useState("");
  const [resonedata, setResOnedata] = useState("");

  const userdata = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  const bannerUploader = useRef(null);
  const signatureUploader = useRef(null);
  const logoUploader = useRef(null);
  const addressProfUploader = useRef(null);

  const onHandleIDproofChange = (e) => {
    const files = e.target.files[0];
    console.log("ap", files);
    setIdproofhoto(files);
  };

  const onHandleSignatureChange = (e) => {
    const filesone = e.target.files[0];
    console.log("onHandleSignatureChange", filesone);
    setSignaturephoto(filesone);
  };

  const onHandleLogoChange = (e) => {
    const filesone = e.target.files[0];
    console.log("onHandleLogoChange", filesone);
    setLogoPhoto(filesone);
  };

  const onHandleBannerChange = (e) => {
    const filesone = e.target.files[0];
    console.log("onHandleBannerChange", filesone);
    setBannerPhoto(filesone);
  };

  const getStates = () => {
    axios.get(`${BaseUrl}/searchstate/${states}`).then((res) => {
      // console.log('pq',res.data.data)
      setStatelist(res.data.data);
    });
  };
  const getCities = () => {
    axios.get(`${BaseUrl}/searchcity/${city}`).then((res) => {
      setCitylist(res.data.data);
    });
  };

  function setCityFromlist(e) {
    // console.log('city',e)
    setCity(e.name);
    setCitylist([]);
    setCityId(e._id);
  }

  function setStatesFromlist(e) {
    // console.log('state',e)
    setStates(e.name);
    setStatelist([]);
    setStateId(e._id);
  }

  const submitForms = async () => {
    const formData = {
      name: name,
      email: email,
      address: homeaddress,
      mobile: phone,
      state_id: stateId,
      city_id: cityId,
      country: country,
      business_name: businessname,
      pancard: pan,
      pincode_home: homepin,
      business_address: businessaddress,
      business_type: businesstype,
      pincode_office: pin,
      gst_number: gstin,
      user_id: userdata._id,
    };

    console.log("BODY", formData);

    const idproofdata = new FormData();

    idproofdata.append("idproof", idproofphoto);

    const signaturedata = new FormData();
    const logoImage = new FormData();
    const bannerImage = new FormData();

    signaturedata.append("signature", signaturephoto);
    logoImage.append("logo", logoPhoto);
    bannerImage.append("banner", bannerPhoto);

    try {
      await axios.post(`${BaseUrl}/apply-vendor`, formData).then((res) => {
        if (res.data.status === true) {
          setEmail("");
          setName("");
          setHomeaddress("");
          setPhone("");
          setPan("");
          setCity("");
          setCityId("");
          setCountry("");
          setGstin("");
          setCityId("");
          setBusinessaddress("");
          setBusinessname("");
          setResdata(res.data);
          swal(
            "Successfully registered!",
            "Wait few days for verification",
            "success"
          );

          axios
            .post(
              `${BaseUrl}/upload-id-proof/${res.data.data._id}`,
              idproofdata
            )
            .then((resone) => {
              console.log("ID==========Proof", resone);
              setResOnedata(resone.data);
              console.log("xc", resone);
              axios
                .post(
                  `${BaseUrl}/upload-signature/${res.data.data._id}`,
                  signaturedata
                )
                .then((restwo) => {
                  // console.log('ad',restwo)
                  if (res.data.status && resone.data.status === true) {
                    // swal(res.data.msg);
                  } else {
                    swal(res.data.msg);
                  }
                });

              axios
                .post(
                  `${BaseUrl}/upload-banner/${res.data.data._id}`,
                  bannerImage
                )
                .then((restwo) => {
                  console.log("BANNER==========", restwo);
                  if (res.data.status && resone.data.status === true) {
                    // swal(res.data.msg);
                    //  history.push('/business/vendor-dashboard')
                  } else {
                    swal(res.data.msg);
                  }
                });

              axios
                .post(`${BaseUrl}/upload-logo/${res.data.data._id}`, logoImage)
                .then((restwo) => {
                  console.log("LOGO=============>>", restwo);
                  if (res.data.status && resone.data.status === true) {
                    // swal(res.data.msg);

                    history.push("/business");
                  } else {
                    swal(res.data.msg);
                  }
                });
            });
        } else {
          swal(
            "You already registered!",
            "Please wait for verification",
            "error"
          );
        }
        history.push("/business");
      });
    } catch (error) {
      swal("You already registered!", "Please wait for verification", "error");
    }
  };

  return (
    <>
      <div className="approveVendorFormContainer">
        <div className="waterBackground">
          <div className="approvalNav">
            <div className="approvalNavLeft">
              <PersonIcon />
              <LockOpenIcon />
            </div>
            <div className="approvalNavRight">
              <PersonIcon />
              <LockOpenIcon />
            </div>
          </div>
          <div className="registrationWrapper">
            <h1>Registration Form</h1>
            <div className="registrationContainer">
              <div className="Vendor_basic_details">
                <h4>Basic Details</h4>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Name</Label>
                      <Input
                        className="venderInput" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">Phone Number</Label>
                      <Input
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="number"
                        name="phone"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="exampleEmail">Address</Label>
                      <Input
                        required
                        value={homeaddress}
                        onChange={(e) => setHomeaddress(e.target.value)}
                        type="text"
                        name="home"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">Pincode</Label>
                      <Input
                        required
                        value={homepin}
                        onChange={(e) => setHomepin(e.target.value)}
                        type="number"
                        name="home"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">Country</Label>
                      <Input
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text"
                        name="home"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">State</Label>
                      <Input
                        required
                        value={states}
                        onChange={(e) => {
                          setStates(e.target.value);
                          getStates();
                        }}
                        type="text"
                        name="home"
                      />
                    </FormGroup>
                    {statelist.length > 0 ? (
                      <ul className="approval_dropdown">
                        {statelist.map((list) => {
                          return (
                            <li
                              style={{ listStyleType: "none" }}
                              onClick={(e) => setStatesFromlist(list)}
                            >
                              {list.name}
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">City</Label>
                      <Input
                        required
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          getCities();
                        }}
                        type="text"
                        name="home"
                      />
                    </FormGroup>
                    <div>
                      {citylist.length > 0 ? (
                        <ul className="approval_dropdown">
                          {citylist.map((list) => {
                            return (
                              <li onClick={(e) => setCityFromlist(list)}>
                                {list.name}{" "}
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="Vendor_business_details">
                <h4>Business Details</h4>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">Business Name</Label>
                      <Input
                        required
                        value={businessname}
                        onChange={(e) => setBusinessname(e.target.value)}
                        type="text"
                        name="businessname"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">PAN Number</Label>
                      <Input
                        value={pan}
                        onChange={(e) => setPan(e.target.value)}
                        type="text"
                        name="pan"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">Business Type</Label>
                      <Input
                        value={businesstype}
                        onChange={(e) => setBusinesstype(e.target.value)}
                        type="select"
                        name="businessname"
                      >
                        <option>--select--</option>
                        <option>Proprietor</option>
                        <option>Company</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="exampleEmail">Business Address</Label>
                      <Input
                        value={businessaddress}
                        onChange={(e) => setBusinessaddress(e.target.value)}
                        type="text"
                        name="businessaddress"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">PIN Code</Label>
                      <Input
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        type="number"
                        name="pan"
                        id="exampleEmail"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <div className="Vendor_business_details">
                <Row form>
                  <Col md={8}>
                    <label>Upload Address Proof</label>
                    <div
                      onClick={() => signatureUploader.current.click()}
                      className="addressProffContainer"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onHandleIDproofChange}
                        ref={addressProfUploader}
                        style={{
                          display: "none",
                        }}
                      />
                      <div className="addressProff"></div>
                      <div className="uploadProofIcon">
                        {" "}
                        <CloudUploadIcon />
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>GSTIN Number</Label>
                      <Input
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                        type="text"
                        name="gstin"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <div className="documentSection">
                <div className="uploadContainer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onHandleSignatureChange}
                    ref={signatureUploader}
                    style={{
                      display: "none",
                    }}
                  />
                  <p>Signature</p>
                  <div
                    onClick={() => signatureUploader.current.click()}
                    className="uploadSection"
                  >
                    <CloudUploadIcon />
                  </div>
                </div>
                <div className="uploadContainer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onHandleBannerChange}
                    ref={bannerUploader}
                    style={{
                      display: "none",
                    }}
                  />
                  <p>Banner Image</p>
                  <div
                    onClick={() => bannerUploader.current.click()}
                    className="uploadSection"
                  >
                    <CloudUploadIcon />
                  </div>
                </div>
                <div className="uploadContainer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onHandleLogoChange}
                    ref={logoUploader}
                    style={{
                      display: "none",
                    }}
                  />
                  <p>Logo Image</p>
                  <div
                    onClick={() => logoUploader.current.click()}
                    className="uploadSection"
                  >
                    <CloudUploadIcon />
                  </div>
                </div>
              </div>
              <div className="vendorBtnContainer">
                <button onClick={submitForms} className="vendorBtn">
                  Applay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovalForm;

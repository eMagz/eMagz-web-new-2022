import React, { useState, useEffect } from "react";
import "../index.css";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CustomInput,
} from "reactstrap";
import { Link } from "@material-ui/core";
import Header from "../../../Header";
import Hamburger from "../../../HamburgerIcon";
import axios from "axios";
import { BaseUrl } from "../../../../API";
import swal from "@sweetalert/with-react";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Spinner } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const EditApprovalForm = () => {
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
  const [vendorID, setVendorID] = useState("");
  const [userID, setUserID] = useState("");
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
  const vendor = JSON.parse(localStorage.getItem("vendor"));
  const history = useHistory();

  const onHandleIDproofChange = (e) => {
    const files = e.target.files[0];
    console.log("ap", files);
    setIdproofhoto(files);
  };

  const onHandleSignatureChange = (e) => {
    const filesone = e.target.files[0];
    console.log("aq", filesone);
    setSignaturephoto(filesone);
  };

  const onHandleLogoChange = (e) => {
    const filesone = e.target.files[0];
    console.log("aq", filesone);
    setLogoPhoto(filesone);
  };

  const onHandleBannerChange = (e) => {
    const filesone = e.target.files[0];
    console.log("aq", filesone);
    setBannerPhoto(filesone);
  };

  const getApprovalFormData = () => {
    console.log("userdata._id", userdata._id);
    axios.get(`${BaseUrl}/vendor-info/${vendor._id}`).then((res) => {
      console.log("pq", res.data.data);
      setHomeaddress(res.data.data.address);
      setBusinessaddress(res.data.data.business_address);
      setBusinessname(res.data.data.business_name);
      setBusinesstype(res.data.data.business_type);
      setBusinesstype(res.data.data.business_type);
      setCityId(res.data.data.city_id);
      setCountry(res.data.data.country);
      setCountry(res.data.data.country);
      setEmail(res.data.data.email);
      setGstin(res.data.data.gst_number);
      setIdproofhoto(res.data.data.idproof);
      setLogoPhoto(res.data.data.logo);
      setPhone(res.data.data.mobile);
      setPhone(res.data.data.mobile);
      setName(res.data.data.name);
      setPan(res.data.data.pancard);
      setHomepin(res.data.data.pincode_home);
      setPin(res.data.data.pincode_office);
      setSignaturephoto(res.data.data.signature);
      setSignaturephoto(res.data.data.signature);
      setBannerPhoto(res.data.data.banner);
      setVendorID(res.data.data._id);
      setStateId(res.data.data.state_id);
      setUserID(res.data.data.user_id);
    });
  };

  const getVendorDetails = () => {
    axios.get(`${BaseUrl}/view-vendor/${userID}`).then((res) => {
      console.log("Vendor Info", res.data.data);
      const data = JSON.stringify(res.data.data);
      localStorage.setItem("vendor", data);
    });
  };
  useEffect(() => {
    getApprovalFormData();
  }, []);

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

  const submitForms = () => {
    const body = {
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

    const idproofdata = new FormData();

    idproofdata.append("idproof", idproofphoto);

    // console.log('lo',idproofdata);

    const signaturedata = new FormData();
    const logoImage = new FormData();
    const bannerImage = new FormData();

    signaturedata.append("signature", signaturephoto);
    logoImage.append("logo", logoPhoto);
    bannerImage.append("banner", bannerPhoto);

    // console.log('aw',signaturedata);
    axios.post(`${BaseUrl}/edit-vendor/${vendorID}`, body).then((res) => {
      setResdata(res.data);
      const data = JSON.stringify(res.data.data);
      localStorage.setItem("vendor", data);
      axios
        .post(`${BaseUrl}/upload-id-proof/${vendorID}`, idproofdata)
        .then((resone) => {
          setResOnedata(resone.data);
          swal("Successfully Updated!", "Wait for verification", "success");
          history.push("/business");
          axios
            .post(`${BaseUrl}/upload-signature/${vendorID}`, signaturedata)
            .then((restwo) => {
              // console.log('ad',restwo)
              if (res.data.status && resone.data.status === true) {
                // swal(res.data.msg);
                //  history.push('/business/)
              } else {
                swal(res.data.msg);
              }
            });

          axios
            .post(`${BaseUrl}/upload-banner/${vendorID}`, bannerImage)
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
            .post(`${BaseUrl}/upload-logo/${vendorID}`, logoImage)
            .then((restwo) => {
              if (res.data.status && resone.data.status === true) {
                // swal(res.data.msg);
                //  history.push('/business/vendor-dashboard')
              } else {
                swal(res.data.msg);
              }
            });
          getVendorDetails();
        });
    });
  };

  return (
    <>
      <div className="approveFormContainer">
        <div className="approveFormCard">
          <div
            style={{ float: "right", marginRight: "10px", marginTop: "10px" }}
          >
            <button
              onClick={() => history.push("/business/edit-profile")}
              className="custombtn"
            >
              Custome View
            </button>
          </div>
          <div className=" Approval_Form_head">Update Approval Form</div>
          <div className="approval_form">
            <div className="basic_details">Basic Details:</div>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label>Name*</Label>
                  <Input
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
                  <Label for="exampleEmail">Email*</Label>
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
                  <Label for="exampleEmail">Phone Number*</Label>
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
              <Col md={10}>
                <FormGroup>
                  <Label for="exampleEmail">Address(Home)*</Label>
                  <Input
                    required
                    value={homeaddress}
                    onChange={(e) => setHomeaddress(e.target.value)}
                    type="text"
                    name="home"
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="exampleEmail">PIN Code*</Label>
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
                  <Label for="exampleEmail">Country*</Label>
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
                  <Label for="exampleEmail">State*</Label>
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
                  <Label for="exampleEmail">City*</Label>
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
            <div className="basic_details">Business Details:</div>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail">Business Name*</Label>
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
                  <Label for="exampleEmail">PAN Number*</Label>
                  <Input
                    value={pan}
                    disabled={true}
                    onChange={(e) => setPan(e.target.value)}
                    type="text"
                    name="pan"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail">Business Type*</Label>
                  <Input
                    value={businesstype}
                    disabled={true}
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
              <Col md={10}>
                <FormGroup>
                  <Label for="exampleEmail">Business Address*</Label>
                  <Input
                    value={businessaddress}
                    onChange={(e) => setBusinessaddress(e.target.value)}
                    type="text"
                    name="businessaddress"
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
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
            <Row form>
              <Col md={8}>
                <FormGroup>
                  <Label>Address Proof*</Label>
                  <CustomInput
                    onChange={onHandleIDproofChange}
                    disabled={true}
                    type="file"
                    name="addressproff"
                    label="please upload required file!"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>GSTIN Number</Label>
                  <Input
                    value={gstin}
                    disabled={true}
                    onChange={(e) => setGstin(e.target.value)}
                    type="text"
                    name="gstin"
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label>Signature</Label>
              <CustomInput
                onChange={onHandleSignatureChange}
                disabled={true}
                type="file"
                name="signature"
                label="please upload required file!"
              />
            </FormGroup>
            <FormGroup>
              <Label>Banner Image</Label>
              <CustomInput
                onChange={onHandleBannerChange}
                type="file"
                name="banner"
                label="please upload required file!"
              />
            </FormGroup>

            <FormGroup>
              <Label>Logo Image</Label>
              <CustomInput
                onChange={onHandleLogoChange}
                type="file"
                name="logo"
                label="please upload required file!"
              />
            </FormGroup>
            {/* <FormGroup check>
        <Input type="checkbox" name="check" id="exampleCheck"/>
        <Label check>I will upload signature later</Label>
      </FormGroup> */}
            <div className="applybuttons">
              {resdata.status && resonedata.status === true ? (
                <div className={classes.root}>
                  <Alert severity="success">
                    Your Form is Submitted Successfully,Pending for Approval!
                  </Alert>
                </div>
              ) : (
                <button
                  onClick={() => {
                    submitForms();
                  }}
                  className="applybtn applybtn1"
                >
                  APPLY
                </button>
              )}
            </div>
            <div className="terms_and_Cond">
              By clicking on apply you agree to our Terms of Use and Privacy
              Policy.<Link>Terms and Conditions</Link>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditApprovalForm;

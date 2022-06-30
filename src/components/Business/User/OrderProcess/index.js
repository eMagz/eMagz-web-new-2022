import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useSelector, useDispatch } from "react-redux"
import { BaseUrl } from "../../../API";
import HalfNavbar from "./HalfNavbar";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import Axios from "axios";
import { Collapse } from "reactstrap";
import { ToggleButton } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Basic Details", "Address", "Payment", "Confirm", "done"];
}

const Index = ({ history }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [userAddress, setUserAddress] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState("a");
  const dispatch = useDispatch()
  const [isOpne, setIsOpen] = useState(false)
  const steps = getSteps();
  const [modal, setModal] = useState(false);
  const { loginReducer, cart, couponReducer } = useSelector(state => ({ ...state }))
  const { userDetails } = loginReducer
  const { name, email } = userDetails

  const toggle = () => setModal(!modal);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getAddress = (id) => {
    Axios.get(`${BaseUrl}/user-address-details/${id}`).then((res) => {
      setUserAddress(res.data.data);

    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    getAddress(user._id);
  }, []);



  const orderNow = () => {
    Axios.post(`${BaseUrl}/add-order`, { order: cart, user_id: userDetails._id }).then((res) => {
      console.log("Oreder Res", res.data)
      if (res.data.status === true) {
        dispatch({ type: 'EMPTY_CART', payload: [] })
      }
    })
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return orderBasicDetails();
      case 1:
        return orderAddress();
      case 2:
        return orderPayment();
      case 3:
        return orderConfirm();
      case 4:
        return orderDone();
      default:
        return 0;
    }
  }

  const orderBasicDetails = () => (
    <div className="orderDetailsContainer">
      <h3>Basic Details</h3>
      <div className="orderLine"></div>
      <div className="basicOrderInput">
        <div className="order_Input_Container">
          <div className="orderName">
            <label>Name</label>
            <input value={name} placeholder="Please enter full name" />
          </div>
          <div className="orderName">
            <label>Email</label>
            <input value={email} placeholder="Please enter email" />
          </div>
        </div>
        <div className="order_Input_Container">
          <div className="orderName">
            <label>Mobile</label>
            <input placeholder="Please enter full name" />
          </div>
        </div>
      </div>
    </div>
  );


  const orderAddress = () => {
    return (
      <div className="orderDetailsContainer">
        <button className="manageBtn" onClick={() => history.push('address')}>Manage Address</button>
        {userAddress.length > 0 ? (
          <>
            <div className="address_container">
              {userAddress.map((value) => {
                return (
                  <div className="pre_address" style={{ width: "40%" }}>
                    <div className="header_description">
                      <Radio
                        checked={selectedValue === "a"}
                        onChange={handleChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "A" }}
                      />
                      <div className="tag_line">
                        <p>{value.address_type} Address</p>
                      </div>
                      <div style={{ margin: "10px auto" }}>
                        <Button
                          // onClick={() => deleteUser(value)}
                          color="secondary"
                        >
                          <b>Delete</b>
                        </Button>
                      </div>
                    </div>
                    <div className="profile_details">
                      <div className="nme">
                        <h3> {value.name}</h3>
                        {value.mobile && <p>{value.mobile}</p>}
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

          </>
        ) : (
          <>
            <h1>You don't have address</h1>
          </>
        )}
      </div>
    );
  };

  const orderPayment = () => (
    <div className="orderDetailsContainer">
      <h3>Basic Details</h3>
      <div className="orderLine">

      </div>
      <div className="paymentContainerSection">
        <div className="couponContainer">
          <button onClick={toggle} className="payNowBtn">Apply Coupon</button>
          <div>
            <Collapse isOpen={modal}>
              <div className="applyCouponContainer">
                <input placeholder="Enter coupon code" />
                <button>Apply</button>
              </div>
            </Collapse>
          </div>
        </div>
        <div className="paymentnow">
          <div className="paymentNowDescription">
            <div className="paymentNowDec">
              <p>Delivery</p>
              <p>Free</p>
            </div>
            <div className="paynowLine"></div>
            <div className="paymentNowDec">
              <p>Total Price</p>
              <p>  <i class="fas fa-rupee-sign"></i>{" "}2599</p>
            </div>
          </div>
          <div className="payNowBtnContainer">
            <button onClick={orderNow} className="payNowBtn">Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );

  const orderConfirm = () => {
    return <h1>Confirm</h1>;
  };
  const orderDone = () => {
    return <h1>Done</h1>;
  };

  return (
    <>
      <HalfNavbar />
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>{getStepContent(activeStep)}</div>
          )}
        </div>
        <div className="backNextBtnContainer">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className="orderProcessBtn"
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Index;

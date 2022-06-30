import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import RoomIcon from "@material-ui/icons/Room";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Navbar from "../Navbar";
import helpUpload from "../../../../assets/helpUpload.png";
import "./index.css";
import "./main.css";
import arrowIcon from "../../../../assets/right_menu_arrow.svg";
import SubmitMessage from "./SubmitMessage";
const Index = () => {
  const { loginReducer } = useSelector((state) => ({ ...state }));
  const { userDetails } = loginReducer;
  const { name, email } = userDetails;
  const [value, setValue] = useState("female");
  const [imageName1, setImageName1] = useState("");
  const [imageName2, setImageName2] = useState("");
  const [imageName3, setImageName3] = useState("");
  const [imageName4, setImageName4] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const [message, setMessage] = useState("");
  const [signaturephoto1, setSignaturephoto1] = useState("");
  const [signaturephoto2, setSignaturephoto2] = useState("");
  const [signaturephoto3, setSignaturephoto3] = useState("");
  const [signaturephoto4, setSignaturephoto4] = useState("");

  const signatureUploader1 = useRef(null);
  const signatureUploader2 = useRef(null);
  const signatureUploader3 = useRef(null);
  const signatureUploader4 = useRef(null);

  const onHandleSignatureChange1 = (e) => {
    const filesone = e.target.files[0];
    console.log("onHandleSignatureChange", filesone.name.split(" "));
    setSignaturephoto1(filesone);
    setImageName1(filesone.name.split(" ")[0]);
  };
  const onHandleSignatureChange2 = (e) => {
    const filesone = e.target.files[0];
    console.log("onHandleSignatureChange", filesone.name.split(" "));
    setSignaturephoto2(filesone);
    setImageName2(filesone.name.split(" ")[0]);
  };
  const onHandleSignatureChange3 = (e) => {
    const filesone = e.target.files[0];
    console.log("onHandleSignatureChange", filesone.name.split(" "));
    setSignaturephoto3(filesone);
    setImageName3(filesone.name.split(" ")[0]);
  };
  const onHandleSignatureChange4 = (e) => {
    const filesone = e.target.files[0];
    console.log("onHandleSignatureChange", filesone.name.split(" "));
    setSignaturephoto4(filesone);
    setImageName4(filesone.name.split(" ")[0]);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Navbar />

      <h3 className="wishlist__text">
        <span>My order</span> <img src={arrowIcon} alt="" />{" "}
        <span>Support</span>
      </h3>
      <div className="helpContainer">
        {isSubmited ? (
          <SubmitMessage />
        ) : (
          <>
            <div className="helpText">
              <h3>We are here to help you</h3>
              <p>
                Please enter the blow details correctly so our team can resolve
                the issue
              </p>
            </div>
            <div className="help_Input_Container">
              <div className="helpName">
                <p>Name</p>
                <input value={name} placeholder="Please enter full name" />
              </div>
              <div className="helpName">
                <p>Email / Phone Number</p>
                <input value={email} placeholder="Please enter email" />
              </div>
            </div>
            <div className="helpReason">
              <p className="selectText">
                Please select the issue you are facing
              </p>
              <div className="supportList">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="product issues"
                    name="issue"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Damage product"
                      control={<Radio />}
                      label="Damage product"
                    />
                    <FormControlLabel
                      value="Wrong Product delivered"
                      control={<Radio />}
                      label="Wrong Product delivered"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other issue"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="helpMessage">
                <p>Message</p>
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  variant="outlined"
                />
              </div>
              <div className="helpDocumentSection">
                <div className="helpUploadContainer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onHandleSignatureChange1}
                    ref={signatureUploader1}
                    style={{
                      display: "none",
                    }}
                  />
                  <div
                    onClick={() => signatureUploader1.current.click()}
                    className="helpUploadSection"
                  >
                    <img src={helpUpload} />
                    <p>Upload Image</p>
                    <span>{imageName1}</span>
                  </div>
                </div>
                <div className="helpUploadContainer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onHandleSignatureChange2}
                    ref={signatureUploader2}
                    style={{
                      display: "none",
                    }}
                  />

                  <div
                    onClick={() => signatureUploader2.current.click()}
                    className="helpUploadSection"
                  >
                    <img src={helpUpload} />
                    <p>Upload Image</p>
                    <span>{imageName2}</span>
                  </div>
                </div>
                <div className="helpUploadContainer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onHandleSignatureChange3}
                    ref={signatureUploader3}
                    style={{
                      display: "none",
                    }}
                  />
                  <div
                    onClick={() => signatureUploader3.current.click()}
                    className="helpUploadSection"
                  >
                    <img src={helpUpload} />
                    <p>Upload Image</p>
                    <span>{imageName3}</span>
                  </div>
                </div>
                <div className="helpUploadContainer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onHandleSignatureChange4}
                    ref={signatureUploader4}
                    style={{
                      display: "none",
                    }}
                  />
                  <div
                    onClick={() => signatureUploader4.current.click()}
                    className="helpUploadSection"
                  >
                    <img src={helpUpload} />
                    <p>Upload Image</p>
                    <span>{imageName4}</span>
                  </div>
                </div>
              </div>
              <div className="helpBtnContainer">
                <button className="helpBtn">Submit</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Index;

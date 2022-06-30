import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import StarBorderIcon from "@material-ui/icons/StarBorder";
import RoomIcon from "@material-ui/icons/Room";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Navbar from "../Navbar"
import "./index.css"

const Exchange = () => {
    const { loginReducer } = useSelector(state => ({ ...state }))
    const { userDetails } = loginReducer
    const { name, email } = userDetails
    const [value, setValue] = useState("female");
    const [imageName, setImageName] = useState('');
    const [message, setMessage] = useState('')
    const [signaturephoto, setSignaturephoto] = useState("");

    const signatureUploader = useRef(null);


    const onHandleSignatureChange = (e) => {
        const filesone = e.target.files[0];
        console.log("onHandleSignatureChange", filesone.name.split(' '));
        setSignaturephoto(filesone);
        setImageName(filesone.name)
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    return (
        <>
            <Navbar />
            <h3 className="helpIngText">My order <i class="fas fa-greater-than" style={{ fontSize: "23px", padding: "0 3px" }}> </i>Support</h3>
            <div className="helpContainer">
                <div className="helpText">
                    <h3>We are here to help you</h3>
                    <p>Please enter the blow details correctly so our team can resolve the issue</p>
                </div>
                <div className="help_Input_Container">
                    <div className="helpName">
                        <label>Name</label>
                        <input value={name} placeholder="Please enter full name" />
                    </div>
                    <div className="helpName">
                        <label>Email</label>
                        <input value={email} placeholder="Please enter email" />
                    </div>
                </div>
                <div className="helpReason">
                    <p className="selectText">Please select the issue you are facing</p>
                    <div>
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
                        <TextField style={{ width: "100%" }}
                            id="outlined-multiline-static"
                            label="Message"
                            multiline
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            variant="outlined"
                        />
                    </div>
                    <div className="helpBtnContainer">
                        <button className="helpBtn">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Exchange

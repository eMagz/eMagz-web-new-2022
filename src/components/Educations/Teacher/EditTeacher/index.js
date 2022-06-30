
import React, { useState } from 'react';
import { Row,Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Header from '../../Header';
import axios from 'axios';
import './index.css';
import {BaseUrl} from '../../../../components/API';

const EditTeacher=(props)=>{


const history=useHistory();

console.log('props',props);





    const [name,setName]= useState(props.location.state.name);
    const [fathername,setFathername]=useState(props.location.state.fathername);
    const [email, setEmail]=useState(props.location.state.email);
    const [mobile, setMobile]= useState(props.location.state.mobile);
    const [fathercontactno,setFathercontactno]= useState(props.location.state.fathecontactno)
    // const [fathername, setFathername] = useState('');
    const [address,setAddress] = useState(props.location.state.houseno);
    // const [email,setEmail]= useState('');
    const [zip, setZip] = useState(props.location.state.pincode);
    const [district, setDistrict]= useState(props.location.state.district);
    const [states,setStates]= useState(props.location.state.states);
    const [dateofbirth,setDateofbirth]=useState(props.location.state.dob);
    const [caste, setCaste]= useState(props.location.state.caste);
    const [religion, setReligion]= useState(props.location.state.religion);
    const [gender, setGender]= useState(props.location.state.gender);
    const [classes, setClasses] = useState(props.location.state.classes);
    const [addskills, setAddskills] = useState(props.location.state.specializedin);
    const [aadhaar, setAaadhaar] = useState(props.location.state.aadhaarcard);
    const [school_id,setSchoolid]= useState(props.location.state.school_id);
    const [subject,setSubject]= useState(props.location.state.subject);

    const onHandleNameChange=(e)=>{
        setName(e.target.value)
        }
        const onHandleMobileChange=(e)=>{
            setMobile(e.target.value)
            }
            const onHandleFathernameChange=(e)=>{
                setFathername(e.target.value)
                }
                const onHandleAddressChange=(e)=>{
                    setAddress(e.target.value)
                    }
                    const onHandleEmailChange=(e)=>{
                        setEmail(e.target.value)
                        }
                        const onHandleZipChange=(e)=>{
                            setZip(e.target.value)
                            }
                            const onHandleDistrictChange=(e)=>{
                                setDistrict(e.target.value)
                                }
                                const onHandleStateChange=(e)=>{
                                    setStates(e.target.value)
                                    }
                                    const onHandleDOBChange=(e)=>{
                                        setDateofbirth(e.target.value)
                                        }
                                        const onHandleCasteChange=(e)=>{
                                            setCaste(e.target.value)
                                            }
                                            const onHandleReligionChange=(e)=>{
                                                setReligion(e.target.value)
                                                }
                                                const onHandleGenderChange=(e)=>{
                                                    setGender(e.target.value)
                                                    }
                                                    // const onHandleSessionChange=(e)=>{
                                                    //     setSession(e.target.value)
                                                    //     }
                                                        const onHandleClassesChange=(e)=>{
                                                            setClasses(e.target.value)
                                                            }
                                                            const onHandleAddSkillsChange=(e)=>{
                                                              setAddskills(e.target.value)
                                                              }
                                                            // const onHandleRollChange=(e)=>{
                                                            //     setRoll(e.target.value)
                                                            //     }
                                                                // const onHandleSchoolnameChange=(e)=>{
                                                                //     setSchoolName(e.target.value)
                                                                //     }
                                                                    const onHandleAaadhaarChange=(e)=>{
                                                                        setAaadhaar(e.target.value)
                                                                        }
                                                                        const onHandleSubjectChange=(e)=>{
                                                                          setSubject(e.target.value)
                                                                          }
                                                                          const onHandleSchoolIDChange=(e)=>{
                                                                            setSchoolid(e.target.value)
                                                                            }
const onHandleFathercontact=(e)=>{
setFathercontactno(e.target.value);
}

const submitDetails=()=>{

const data={
name: name,
mobile: mobile,
fathername: fathername,
specializedin: addskills,
aadhaarcard: aadhaar,
classes: classes,
fathercontactno: fathercontactno,
religion: religion,
gender: gender,
pincode: zip,
houseno: address,
district: district,                        
states: states,
dob: dateofbirth,
caste: caste,
email: email,
subject: subject,
school_id: school_id
}

axios.post(`${BaseUrl}/editteacher/${props.location.state._id}`,data).then
(res=> {
  
  console.log('editedd',res)
})

}







return(
    <>
      <Header/>
    <div className='editteacher_container' >
        <div className='editteacher_card' >
            <Form>
            
            <Row form>
        <Col md={6}>

          <FormGroup>
            <Label for="exampleEmail">Full Name*</Label>
            <Input required value={name} onChange={onHandleNameChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Father/Mother's Name*</Label>
            <Input required value={fathername} onChange={onHandleFathernameChange} type="email" name="parentname" id="examplePassword" placeholder="password placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="exampleAddress">Email*</Label>
        <Input required value={email} onChange={onHandleEmailChange} type="email" name="address" id="exampleAddress" placeholder=""/>
        <FormText color="muted">
          This field is Required*
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="exampleAddress">Address*</Label>
        <Input required value={address} onChange={onHandleAddressChange} type="email" name="address" id="exampleAddress" placeholder="1234 Main St"/>
        <FormText color="muted">
          This field is Required*
        </FormText>
      </FormGroup>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleEmail">Father's Mobile*</Label>
            <Input required value={fathercontactno} onChange={onHandleFathercontact} type="email" name="city" id="exampleCity"/>
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">Your Mobile Number*</Label>
            <Input required value={mobile} onChange={onHandleMobileChange} type="number" name="state" id="exampleState"/>
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleZip">Pin Code*</Label>
            <Input required value={zip} onChange={onHandleZipChange} type="number" name="zip" id="exampleZip"/>
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>  
        </Col>
      </Row>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleCity">District*</Label>
            <Input required value={district} onChange={onHandleDistrictChange} type="email" name="city" id="exampleCity"/>
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>                     
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State*</Label>
            <Input required value={states} onChange={onHandleStateChange} type="email" name="state" id="exampleState"/>
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
          <Label for="exampleDate">Date of Birth*</Label>
        <Input required value={dateofbirth} onChange={onHandleDOBChange}
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
        />
        <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>  
        </Col>
      </Row>
      <Row form>
        <Col md={4}>
          <FormGroup>
          <Label for="exampleSelect">Caste*</Label>
        <Input required value={caste} onChange={onHandleCasteChange} type="select" name="select" id="examplecaste">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
        <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
          <Label for="exampleSelect">Religion*</Label>
        <Input required value={religion} onChange={onHandleReligionChange} type="select" name="select" id="examplereligion">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
        <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
          <Label for="exampleSelect">Gender*</Label>
        <Input required value={gender} onChange={onHandleGenderChange} type="select" name="selectgender" id="examplegender">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
        <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>  
        </Col>
      </Row>
      
      <FormGroup>
        <Label for="exampleText">Add Your Skills</Label>
        <Input required value={addskills} onChange={onHandleAddSkillsChange} type="textarea" name="text" id="exampleText" />
        <FormText color="muted">
          Describe your skills in brief*
        </FormText>
      </FormGroup>
        
      
      <Row form>
        <Col md={6}>

          <FormGroup>
            <Label for="exampleEmail">Classes(Teaching)*</Label>
            <Input required value={classes} onChange={onHandleClassesChange} type="schoolname" name="email" id="exampleEmail" placeholder="with a placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">AADHAAR Number*</Label>
            <Input required value={aadhaar} onChange={onHandleAaadhaarChange} type="aadhaarcard" name="parentname" id="examplePassword" placeholder="password placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>

          <FormGroup>
            <Label for="exampleEmail">Subject*</Label>
            <Input required value={subject} onChange={onHandleSubjectChange} type="schoolname" name="email" id="exampleEmail" placeholder="with a placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">School ID*</Label>
            <Input required value={school_id} onChange={onHandleSchoolIDChange} type="aadhaarcard" name="parentname" id="examplePassword" placeholder="password placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
      </Row>
      
              <Button onClick={submitDetails} variant="contained" color="primary"> Edit Teacher</Button>
            </Form> 
        </div>
    </div>
    </>
)


}



export default EditTeacher;






























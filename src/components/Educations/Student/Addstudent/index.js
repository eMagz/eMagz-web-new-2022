
import React, { useState } from 'react';
import { Row,Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Header from '../../Header';
import axios from 'axios';
import './index.css'
import {BaseUrl} from '../../../API';

const Addstudent=()=>{

    const [name,setName]= useState('');
    
    const [date, setDate] = useState('');
    const [mobile, setMobile]= useState('')
    const [fathername, setFathername] = useState('');
    const [address,setAddress] = useState('');
    const [email,setEmail]= useState('');
    const [zip, setZip] = useState('');
    const [district, setDistrict]= useState('');
    const [state,setStates]= useState('');
    const [dateofbirth,setDateofbirth]=useState('');
    const [caste, setCaste]= useState('');
    const [religion, setReligion]= useState('');
    const [gender, setGender]= useState('');
    const [session, setSession] = useState('');
    const [classes, setClasses] = useState('');
    const [roll, setRoll]= useState('');
    const [schoolname,setSchoolName]= useState('');
    const [aadhaar, setAaadhaar] = useState('');

    const onHandleNameChange=(e)=>{
        setName(e.target.value)
        }
        const onHandleMobileChange=(e)=>{
            setMobile(e.target.value)
            }
            const onHandleFatherChange=(e)=>{
                setFathername(e.target.value)
                }
                const onHandleAddressChange=(e)=>{
                    setAddress(e.target.value)
                    }
                    const onHandleEmilChange=(e)=>{
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
                                                    const onHandleSessionChange=(e)=>{
                                                        setSession(e.target.value)
                                                        }
                                                        const onHandleClassesChange=(e)=>{
                                                            setClasses(e.target.value)
                                                            }
                                                            const onHandleRollChange=(e)=>{
                                                                setRoll(e.target.value)
                                                                }
                                                                const onHandleSchoolnameChange=(e)=>{
                                                                    setSchoolName(e.target.value)
                                                                    }
                                                                    const onHandleAaadhaarChange=(e)=>{
                                                                        setAaadhaar(e.target.value)
                                                                        }


const submitDetails=()=>{

const data={
name: name,
date: date,
mobile: mobile,
fathername: fathername,
roll: roll,
aadhaarcard: aadhaar,
school: schoolname,
classes: classes,
session: session,
religion: religion,
gender: gender,
pincode: zip,
address: address,
district: district,
state: state,
dob: dateofbirth,
caste: caste,
email: email

}

axios.post(`${BaseUrl}/addstudent`).then
(res=> console.log('student',res))

}







return(
    <>
      <Header/>
    <div className='addstudent_container' >
        <div className='addstudent_card' >
            <Form>
            
            <Row form>
        <Col md={6}>

          <FormGroup>
            <Label for="exampleEmail">Full Name*</Label>
            <Input required type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Father/Mother's Name*</Label>
            <Input type="email" name="parentname" id="examplePassword" placeholder="password placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="exampleAddress">Address*</Label>
        <Input type="email" name="address" id="exampleAddress" placeholder="1234 Main St"/>
        <FormText color="muted">
          This field is Required*
        </FormText>
      </FormGroup>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleEmail">Email*</Label>
            <Input type="email" name="city" id="exampleCity"/>
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">Mobile Number*</Label>
            <Input type="number" name="state" id="exampleState"/>
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleZip">Pin Code*</Label>
            <Input type="number" name="zip" id="exampleZip"/>
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>  
        </Col>
      </Row>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleCity">City*</Label>
            <Input type="email" name="city" id="exampleCity"/>
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State*</Label>
            <Input type="email" name="state" id="exampleState"/>
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
          <Label for="exampleDate">Date of Birth*</Label>
        <Input
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
        <Input type="select" name="select" id="examplecaste">
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
        <Input type="select" name="select" id="examplereligion">
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
        <Input type="select" name="selectgender" id="examplegender">
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
      <Row form>
        <Col md={3}>
          <FormGroup>
          <Label for="exampleSelect">Session*</Label>
        <Input type="select" name="select" id="examplesession">
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
        <Col md={3}>
          <FormGroup>
          <Label for="exampleSelect">Class*</Label>
        <Input type="select" name="select" id="exampleclass">
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
        <Col md={3}>
          <FormGroup>
          <Label for="exampleSelect">Section*</Label>
        <Input type="select" name="selectgender" id="examplesection">
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
        <Col md={3}>
          <FormGroup>
          <Label for="exampleSelect">Roll*</Label>
        <Input type="select" name="selectgender" id="exampleroll">
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
      <Row form>
        <Col md={6}>

          <FormGroup>
            <Label for="exampleEmail">School Name*</Label>
            <Input type="schoolname" name="email" id="exampleEmail" placeholder="with a placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">AADHAAR Number*</Label>
            <Input type="aadhaarcard" name="parentname" id="examplePassword" placeholder="password placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
      </Row>
      
              <Button variant="contained" color="primary"> Add Student</Button>
            </Form> 
        </div>
    </div>
    </>
)


}



export default Addstudent;






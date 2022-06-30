import React, { useState, useEffect} from 'react'
import './index.css';
import { Col, Row, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import { Link } from '@material-ui/core';
import Hamburger from '../../HamburgerIcon';
import axios from 'axios';
import Header from "../Header"
import { BaseUrl } from '../../../API';
import swal from '@sweetalert/with-react';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Spinner } from 'reactstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Index = (props) => {

  const classes = useStyles()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [medium, setMedium] = useState('');
  const [borad, setBorad] = useState('');
  const [Reg, setReg] = useState('');
  const [logoPhoto, setLogoPhoto] = useState('');
  const [bannerPhoto, setBannerPhoto] = useState('');
  const [resdata, setResdata] = useState('');
  const [resonedata, setResOnedata] = useState('');


  const userdata = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

    const getSchoolData = () =>{
        axios.get(`${BaseUrl}/viewschool/${props.location.state}`).then((res)=>{
            console.log('User Data', res.data.data)
            setName(res.data.data.name)
            setEmail(res.data.data.email)
            setPhone(res.data.data.phonenumber)
            setCity(res.data.data.city)
            setState(res.data.data.state)
            setCountry(res.data.data.country)
            setSchoolAddress(res.data.data.address)
            setPinCode(res.data.data.pincode)
            setBorad(res.data.data.pincode)
            setReg(res.data.data.reg_no)
            setMedium(res.data.data.medium)
        })
    }

  useEffect(()=>{
    getSchoolData()
  }, [])

  const onHandleLogoChange = (e) => {
    const filesone = e.target.files[0];
    console.log('aq', filesone);
    setLogoPhoto(filesone)
  }

  const onHandleBannerChange = (e) => {
    const filesone = e.target.files[0];
    console.log('aq', filesone);
    setBannerPhoto(filesone)
  }


  const submitForms = () => {
    const body = {
      name: name,
      email: email,
      address: schoolAddress,
      phonenumber: phone,
      country: country,
      state: state,
      city: city,
      board: borad,
      pincode: pinCode,
      medium: medium,
      reg_no: Reg,
    }

    console.log("Body", body)
    axios.post(`${BaseUrl}/edit-school/${props.location.state}`, body).then(
      res => {
        console.log('User', res)
      }
    )
  }
  return (
    <>
      <Header />
      <div className='approveFormContainer' >
        <div className='approveFormCard' >
          <div className=' Approval_Form_head'  >
            School Registration
               </div>
          <div className='approval_form'  >
            <div className='basic_details'   >
              Basic Details:
              </div>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label>School Name*</Label>
                  <Input required value={name} onChange={(e) => setName(e.target.value)} type="text" />
                </FormGroup>
              </Col>
              <Col md={4} >
                <FormGroup>
                  <Label for="exampleEmail">Owner Email*</Label>
                  <Input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </FormGroup>
              </Col>
              <Col md={4} >
                <FormGroup>
                  <Label for="exampleEmail">Owner Contact Number*</Label>
                  <Input required value={phone} onChange={(e) => setPhone(e.target.value)} type="number"  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={10}>
                <FormGroup>
                  <Label for="exampleEmail">School Address*</Label>
                  <Input required value={schoolAddress} onChange={(e) => setSchoolAddress(e.target.value)} type="text" />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="exampleEmail">PIN Code*</Label>
                  <Input required value={pinCode} onChange={(e) => setPinCode(e.target.value)} type="number"  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail">Country*</Label>
                  <Input required value={country} onChange={(e) => setCountry(e.target.value)} type="text" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail">State*</Label>
                  <Input required value={state} onChange={(e) => {
                    setState(e.target.value)
                  }} type="text" n />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail">City*</Label>
                  <Input required value={city} onChange={(e) => {
                    setCity(e.target.value)
                  }} type="text"  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail">Board Name*</Label>
                  <Input required value={borad} onChange={(e) => setBorad(e.target.value)} type="text" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail">Reg Number*</Label>
                  <Input value={Reg} onChange={(e) => setReg(e.target.value)} type="number" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleEmail">Medium*</Label>
                  <Input value={medium} onChange={(e) => setMedium(e.target.value)} type="select">
                    <option>--select--</option>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Urdu</option>
                    <option>Bangali</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label>Banner Image</Label>
              <CustomInput onChange={onHandleBannerChange} type="file" name="banner" label="please upload required file!" />
            </FormGroup>

            <FormGroup>
              <Label>Logo Image</Label>
              <CustomInput onChange={onHandleLogoChange} type="file" name="logo" label="please upload required file!" />
            </FormGroup>
            <div className='applybuttons'>
              {resdata.status && resonedata.status === true ? <div className={classes.root}>
                <Alert severity="success">Your Form is Submitted Successfully,Pending for Approval!</Alert>
              </div> :
                <button onClick={() => submitForms()} className='applybtn applybtn1'>SUBMIT</button>
              }
            </div>
            <div className='terms_and_Cond' >
              By clicking on apply you agree to our Terms of Use and Privacy Policy.<Link>Terms and Conditions</Link>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Index;


import React, {useState,useEffect } from 'react';
import './index.css';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Header from '../Header';
import {BaseUrl,ImageUrl} from '../../../API';
import {useHistory} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import StarsIcon from '@material-ui/icons/Stars';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
// import PersonalInformation from '../PersonalInformation';
import ManageAdress from '../ManageAddress';
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import Axios from 'axios';
// import swal from 'sweetalert';
import swal from '@sweetalert/with-react'

const PersonalInformation=()=>{


  const userdata = JSON.parse(localStorage.getItem('user'));



const[openform,setOpenForm]=useState(true);
const[openemail,setOpenEmail]=useState(true);
const[openMobile,setOpenMobile]=useState(true);
const [name,setName]= useState('');
const[gender,setGender]=useState('');
const[email,setEmail]=useState('');
const[mobile,setMobile]= useState('');
const[completeMobile,setCompleteMobile]= useState(false);

const[dummygender,setDummygender] = useState(userdata.gender);


const toggleForm=()=>setOpenForm(!openform);
const toggleMobileForm=()=>setOpenMobile(!openMobile);
const toggleEmailForm=()=>setOpenEmail(!openemail);

const history = useHistory();
  const changePage=(url)=>{
       
      
    history.push(url)
    }

const submitName=()=>{

const data={
name: name,
gender:gender
}

Axios.post(`${BaseUrl}/edit-name-gender/${userdata._id}`,data).then(
  res=> {
    if(res.data.status){
      swal(res.data.msg)
    }else{
      swal(res.data.msg)
    }
  }
)

setName('')

}


const submitEmail=()=>{

const data ={
  email:email
}

  Axios.post(`${BaseUrl}/edit-email/${userdata._id}`,data).then(
    res=> {
      if(res.data.status){
        swal(res.data.msg)
      }else{
        swal(res.data.msg)
      }
    }
  )
  setEmail('')
  }


  const submitMobile=()=>{

const data={
  mobile:mobile
}

    Axios.post(`${BaseUrl}/edit-mobile-number/${userdata._id}`,data).then(
      res=>{
        if(res.data.status){
          swal(res.data.msg)
        }else{
          swal(res.data.msg)
        }
      }
    )
    setMobile('')
    }

useEffect(()=>{

Axios.get(`${BaseUrl}/view-users/${userdata._id}`).then(
  res=> {
    console.log('aa',res)
  }
)

},[])

const mobileHandler = (e)=>{
    let text = e.target.value
    setMobile(text)
    const reg = /^[0]?[789]\d{9}$/;
   if (reg.test(text) === false) {
    setCompleteMobile(false)
  } else {
    setCompleteMobile(true);
  }
}


const handleLogout = ()=>{
  swal({
    title: "Are you sure?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      localStorage.removeItem('user')
      localStorage.removeItem('admin')
      swal("Logout successfully!", {
        icon: "success",
        method: history.push('/')
      });
    } else {
      swal("Somthing is wrong!");
    }
  });
    
}
// console.log('gndr',gender);
    
// console.log('dd',dummygender);

return(
    <>
    <Header/>
    <div  className='userProfile_container' >
        <div className='leftbar'>
          <div className='usercard'>
             <div className='profile_details'>
                 <div style={{marginTop:'20px'}}>
                 <img src={userdata.image} style={{width:50,height:50,borderRadius:'50%',marginTop:'0px'}} />
                 </div>
                 <div style={{marginTop:'20px', marginLeft: "10px"}}>
                     Hello,
                     <div style={{marginRight:20}}>
                        <b>{userdata.name}</b>
                     </div>
                 </div>
             </div>
          </div>
          <div className='setting_list'>
             <List component="nav">
             <Link to = "/business/profile/my-orders">
                <ListItem button>
                  <ListItemIcon>
                    <OpenInBrowserIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Orders" />
                </ListItem>
              </Link>
        <Divider/>
       <Link to='/business/profile'>
       <ListItem  button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile Information" />
        </ListItem>
       </Link>
        <Link to='/business/profile/manage-address' >
        <ListItem button>
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Addresses" />
        </ListItem>
        </Link>
        <Divider/>
        <ListItem button>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>
        <Link to='/business/profile/wishlist'>
        <ListItem button>
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Wishlist" />
        </ListItem>
        </Link>
        <Link to='/business/profile/coupons'>
         <ListItem  button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="My Coupon" />
         </ListItem>
       </Link>
        <ListItem button>
          <ListItemIcon>
            <StarsIcon />
          </ListItemIcon>
          <ListItemText primary="My Reviews & Ratings" />
        </ListItem>
        <Divider/>
        <ListItem button onClick={()=>handleLogout()}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
             </List>
          </div>
        </div>
        <div className='rightbar'>
           <div className='rigtside_setting_card'>
             
           <div className='personal_information'>

<div style={{fontSize:'2 rem',display:'inline'}}><b>Personal Information</b>
<Button onClick={toggleForm}  color="primary">
 <b>Edit</b> 
</Button></div>
<div className='personal_form' >
  {openform=== true ? 
  <Form>
  <Row form>
  <Col md={12}>
    <FormGroup>   
    <Input disabled style={{cursor:'not-allowed'}} type="email" name="email" id="exampleEmail" placeholder={userdata.name} />  
    </FormGroup>
  </Col>
  
</Row>
<div className='gender'>
 Your Gender
</div>
{dummygender === 'Male'? <Row from>
    <Col md={6}>
    <FormGroup check>
      <Label check>
        <Input disabled checked type="radio" name="radio2" />{' '}
        Male
      </Label>
      </FormGroup>
      </Col>
      <Col md={6}>
      <FormGroup check>
      <Label check>
        <Input disabled type="radio" name="radio2" />{' '}
        Female
      </Label>
    </FormGroup> 
    </Col>
</Row>:<Row from>
    <Col md={6}>
    <FormGroup check>
      <Label check>
        <Input disabled  type="radio" name="radio2" />{' '}
        Male
      </Label>
      </FormGroup>
      </Col>
      <Col md={6}>
      <FormGroup check>
      <Label check>
        <Input disabled checked type="radio" name="radio2" />{' '}
        Female
      </Label>
    </FormGroup> 
    </Col>
</Row>}

  </Form>:<Form>
  <Row form>
  <Col md={10}>
    <FormGroup>   
    <Input value={name}  onChange={(e)=>setName(e.target.value)} type="email" name="email" id="exampleEmail" placeholder="Write your full name" />  
    </FormGroup>
  </Col>
 
  <Col md={2}>
    <Button disabled={!name} onClick={submitName} variant='contained' color="primary">Save</Button>
  </Col>
</Row>
<div className='gender'>
 Your Gender
</div>
<Row from>
    <Col md={6}>
    <FormGroup check>
      <Label check>
        <Input value='Male' checked={gender === 'Male'} onChange={(e)=>setGender(e.target.value)}  type="radio" name="radio2" />{' '}
        Male
      </Label>
      </FormGroup>
      </Col>
      <Col md={6}>
      <FormGroup check>
      <Label check>
        <Input value='Female' checked={gender === 'Female'} onChange={(e)=>setGender(e.target.value)} type="radio" name="radio2" />{' '}
        Female
      </Label>
    </FormGroup> 
    </Col>
</Row>
  </Form>}
  
 
</div>
<div className='email_info'>
  <div style={{fontSize:'2 rem',display:'inline'}}><b>Email Address</b>
<Button onClick={toggleEmailForm}  color="primary">
 <b>Edit</b> 
</Button></div>
  </div>

  <div className='personal_form' >
 {openemail=== true ?
 <Form>
 <Row form>
 <Col md={12}>
   <FormGroup>     
 <Input style={{cursor:'not-allowed'}} type="email" name="email" id="exampleEmail" placeholder={userdata.email} disabled/>
   </FormGroup>
 </Col>
 
</Row>
 </Form>:
 <Form>
 <Row form>
 <Col md={10}>
   <FormGroup>     
 <Input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" name="email" id="exampleEmail" placeholder="Write your email here..." />
   </FormGroup>
 </Col>
 <Col md={2}>
   <Button onClick={submitEmail} disabled={!email} variant='contained' color="primary">Save</Button>
 </Col>
</Row>

 </Form>} 
</div>
<div className='email_info'>
  <div style={{fontSize:'2 rem',display:'inline'}}><b>Mobile Number</b>
<Button onClick={toggleMobileForm} color="primary">
 <b>Edit</b> 
</Button></div>
  </div>
<div className='personal_form' >
 {openMobile=== true ? 
 <Form>
 <Row form>
 <Col md={12}>
   <FormGroup>     
 <Input style={{cursor:'not-allowed'}} type="email" name="email" id="exampleEmail" placeholder={userdata.mobile} disabled/>
   </FormGroup>
 </Col>
</Row>
 </Form>:
 <Form>
 <Row form>
 <Col md={10}>
   <FormGroup>     
 <Input value={mobile} onChange={(e)=> mobileHandler(e)} type="email" name="email" id="exampleEmail" placeholder="Write your 10 digit mobile number..." />
   </FormGroup>
 </Col>
 <Col md={2}>
 <Button onClick={submitMobile}  disabled={!completeMobile} variant='contained' color="primary">Save</Button>
 </Col>
</Row>
 </Form>} 
</div>
<div className='deactivate_account'>
<Button style={{marginBottom:'5px'}} color="primary">
 <b>Deactivate Account</b> 
</Button>
</div>
</div>
</div>
</div>
</div>   
</>
)
}

export default PersonalInformation;









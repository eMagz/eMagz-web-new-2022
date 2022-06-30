import React, { useState } from 'react';
import './index.css';
import Header from '../../Header';
import {BaseUrl} from '../../../API';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Chaticon from '../../../../assets/chaticon.svg';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import axios from 'axios';
 import swal from '@sweetalert/with-react';




const StudentContact=()=>{



  const contactdata=JSON.parse(localStorage.getItem('education'))
const [name,setName]=useState('');
const[email,setEmail]=useState('');
const[textarea,setTextarea]=useState('');

const onSubmit=()=>{

const data={
  name: name,
  email: email,
  query: textarea,
  school_id: contactdata.data.school_id,
  user_id: contactdata.data.user_id
}


axios.post(`${BaseUrl}/sendquery`,data).then
(res=>{
  console.log('dd',res)
  if(res.data.status===true){
    swal(res.data.msg);
  }
})

}



return(
    <>
    <Header/>
    <div  className='student_contactus_container' >
     <div className='student_contact_header' >
    <h2  style={{fontWeight:'bolder'}}  >CONTACT US</h2> 
     </div>
     <div className='student_contact_body' >
       <div className='student_contact_left'  >
        <h5 style={{fontWeight:'bolder'}}>
            Getting in touch is easy!
        </h5>
        <div  className='schoolName' >
           DELHI PUBLIC SCHOOL
        </div>
        <div className='schoolAddress' >
          <div style={{textDecoration:'underline',fontSize:'1rem',fontWeight:600}}>Postal Address</div> 
           <div className='addressdetails' >
           The Delhi Public School Society
           F-Block, East of Kailash
           New Delhi 110065, India
           </div>
        </div>
        <div className='schoolAddress' >
          <div style={{textDecoration:'underline',fontSize:'1rem',fontWeight:600}}>Phone Number</div> 
           <div className='phonedetails' >
           +91-11-43126700
           +91-11-26223173
           </div>
        </div>
        <div className='schoolAddress' >
          <div style={{textDecoration:'underline',fontSize:'1rem',fontWeight:600}}>Email</div> 
           <div className='emaildetails' >
           secretary@dpsfamily.org
 
           </div>
        </div>
        <div className='contact_icons' >
           <div className='icon_cards'>
            <FacebookIcon  style={{margin:'4px 5px 6px 3px', color:'blue'}}  />
           </div>
           <div className='icon_cards'>
            <PinterestIcon style={{margin:'4px 5px 6px 3px', color:'red'}} />
           </div>
           <div className='icon_cards'>
            <WhatsAppIcon style={{margin:'4px 5px 6px 3px', color:'green'}} />
           </div>
           <div className='icon_cards'>
            <TwitterIcon style={{margin:'4px 5px 6px 3px', color:'blue'}} />
           </div>
        </div>
       </div>
       <div className='student_contact_right'>
       <div className='chat_section' >
             <div>
             <img style={{heigt:'20px',width:'20px',marginTop:'0px'}}  src={Chaticon} />
             </div>
         <div style={{fontSize:'1rem',color:'blue',paddingLeft:'10px'}}>
             Live chat with our support team of eMagz
         </div>
          <div style={{paddingLeft:'8px'}}>
              <ArrowForwardIcon style={{color:'blue'}}/>
          </div>

        </div>  
           <Form>
           <FormGroup>
       
        <Input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name"  placeholder="write your name" />
      </FormGroup>
      <FormGroup>
       
        <Input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email"  placeholder="write your email" />
      </FormGroup>
      <FormGroup>
        
        <Input value={textarea} onChange={(e)=>setTextarea(e.target.value)} className='text_box' type="textarea" name="text" id="exampleText" placeholder="write your queries here!" />
      </FormGroup>
      <Button onClick={onSubmit}>SEND US</Button>
           </Form>
         
       </div>
     </div>
    </div>
    </>
)




}

export default StudentContact;
import React from 'react';
import './index.css';
import Header from '../../Header/index';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const EditProfile =()=>{



return(
    <>
    <div  style={{position:'fixed',top:0,margin:'auto',width:'100%',zIndex:'400'}}   >
        <Header/>
    </div>
      <div  className='editProf_container' >
        <div className='editProf_card' >
           <div className='editProf_head' >
               <div >
                   <img  src='https://cache.desktopnexus.com/thumbseg/2487/2487414-bigthumbnail.jpg'  className='editProf_image' />
               </div>
               <div  className='editProf_name' >
                  Debanjan Roxx
                  <div >
                  <Button  color="primary"><b  style={{paddingRight:'10px'}} >Change Profile Photo</b></Button>
                  </div>
               </div>

           </div>
           <div  className='edit_form'   >
            <Form>
            <FormGroup row>
        <Label for="exampleEmail" sm={2}>Name</Label>
        <Col sm={6}>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="examplePassword" sm={2}>Username</Label>
        <Col sm={6}>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="examplePassword" sm={2}>Email</Label>
        <Col sm={6}>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="examplePassword" sm={2}>Password</Label>
        <Col sm={6}>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleText" sm={2}>Bio</Label>
        <Col sm={6}>
          <Input type="textarea" name="text" id="exampleText" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="examplePassword" sm={2}>Mobile</Label>
        <Col sm={6}>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleSelect" sm={2}>Gender</Label>
        <Col sm={6}>
          <Input type="select" name="select" id="exampleSelect">
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
            
          </Input>
        </Col>
      </FormGroup>
      <Button variant="contained" color="primary" >Submit</Button>
            </Form>
           </div>
        </div>
      </div>

    </>
)



}


export default EditProfile;












import React, { useState } from 'react'
import './index.css';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Header from '../Header';




const ApplyForLeave = () => {















  return (
    <>
     <Header />
      <div className='leaveform_container' >
        <div className='leaveform_card' >
          <Form>
            <FormGroup>
              <Label style={{ float: 'left' }} for="exampleEmail">Full Name</Label>
              <Input required type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
            </FormGroup>
            
             
                <FormGroup>
                  <Label style={{ float: 'left' }} for="exampleEmail">User ID</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
             
              
           
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label style={{ float: 'left' }} for="exampleDate">Form</Label>
                  <Input required
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label style={{ float: 'left' }} for="exampleDate">To</Label>
                  <Input required
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label style={{ float: 'left' }} for="exampleText">Reason</Label>
              <Input required type="textarea" name="text" id="exampleText" />
            </FormGroup>

            <div className='btn_container' >
              <Button   variant="contained" color="primary">
                Approve
      </Button>
              <Button variant="contained" color="primary">
                Reject
      </Button>
            </div>

          </Form>
        </div>
      </div>


    </>
  )





}



export default ApplyForLeave;








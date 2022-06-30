import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './leaveapplication.css';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Header from '../Header'
import {BaseUrl} from '../../API';





function LeaveApplicationTable(props) {
  const [modal, setModal] = useState(false);
  const [resdata,setresdta] = useState([])
  const toggleModal = () => setModal(!modal);


console.log('xx',props)

useEffect(()=>{
  const education = JSON.parse(localStorage.getItem('education'))
    axios.get(`${BaseUrl}/viewstudentleaves/${education.data.user_id}/${education.data.school_id}`).then
    (res=>{
      console.log('qq',res)
      setresdta(res.data.data);
    
    })
    
},[]);


  
 

  const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>; 



  return(
    <>
    <div>
      <Header/>
    </div>
    <div  className='fees_details_container' >
   
      <div>
      <Modal isOpen={modal} toggle={toggleModal} >
        <Form>
        <ModalHeader toggle={toggleModal}    close={closeBtn}> View Fees Details</ModalHeader>
        <ModalBody>
        <Row form>
        <Col md={6}>
          <FormGroup>
            <Label >User ID</Label>
            <Input type="number" name="number"  placeholder="56748" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label >Name</Label>
            <Input type="name" name="name"  placeholder="" />
          </FormGroup>
        </Col>
      </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
        </Form>
       
      </Modal>
      </div>
      <div  className='fees_table' >
      <MaterialTable
      title="Leave List"
     
      columns={[
       
        
        { title: 'Start Date', field: 'leavestart' },
        { title: 'End Date', field: 'leaveend' },
        { title: 'Reason', field: 'reason' },
        { title: 'Leave Type', field: 'leavetype' },
        { title: 'Status', field: 'status' },
      ]}
      data={resdata}
      
      options={{
        actionsColumnIndex: -1,
        search: false
      }}
    />
      </div>
   
    </div>
    </>
  )
    
  }
  


export default LeaveApplicationTable;


















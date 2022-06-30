import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import './admin.css';
import {BaseUrl, ImageUrl} from "../../API"
import Button from '@material-ui/core/Button';
import Header from "./../Header"
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from "axios"
import {useHistory} from "react-router-dom"
import { Col,Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SaveIcon from '@material-ui/icons/Save';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AdminData = JSON.parse(localStorage.getItem('Admin'));

const Index = () => {
  const history = useHistory()
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');
  const [schoolID, setSchoolID] = useState('');
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const getAllShop = ()=>{
    axios.get(`${BaseUrl}/show-active-social-profiles`).then((res)=>{
      setUsers(res.data.data)
    })
  }
  useEffect(()=>{
    getAllShop()
  },[])

  const handleDeleteSchool = (schoolData) =>{

  }

  const getApprovedData = (data)=>{
    setSchoolID(data._id)
  }
  return (
    <>
     <Header/>
      <div className='admin_container' >
        <div className='fees_table' >
          <MaterialTable
            title="All Active Social Users"
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'User Name', field: 'username' },
              { title: 'Contact', field: 'mobile' },
              { title: 'Gender', field: 'gender' },
              { title: 'Address', field: 'address' },
            ]}
            data={users}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Show Details',
                onClick: (event, rowData) => history.push(`/admin/emagz/acvtive-users/${rowData._id}`, rowData)
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              search: true
            }}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} toggle={toggle} >
        <ModalHeader toggle={toggle}>Edit Details</ModalHeader>
        <ModalBody>
            <Row>
              <Col md={4}>
  
              </Col>
              <Col md={8}></Col>
            </Row> 
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Edit Details</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
export default Index;
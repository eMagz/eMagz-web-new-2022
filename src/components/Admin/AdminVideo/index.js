import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {BaseUrl, ImageUrl} from "../../API"
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Header from "./Header"
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from "axios"
import {useHistory} from "react-router-dom"
import moment from "moment"

const AdminData = JSON.parse(localStorage.getItem('Admin'));

const Index = () => {
  const history = useHistory()
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');
  const [schoolID, setSchoolID] = useState('');

  const getAllUsers = ()=>{
    axios.get(`${BaseUrl}/users-list`).then((res)=>{
      res.data.data.forEach((data)=>{
        let join = data.createdAt
        data.joinDate = moment(join).format("MMM Do YYYY")
      })
        setUsers(res.data.data)

    })
  }
  useEffect(()=>{
    getAllUsers()
  },[])

  const handleDeleteSchool = (schoolData) =>{

  }
  
  const getApprovedData = (data)=>{
    console.log('Vendor ID', data._id)
    setSchoolID(data._id)
  }
  return (
    <>
     <Header/>
      <div className='admin_container' >
        <div className='fees_table' >
          <MaterialTable
            title="Registerd Users"
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Email', field: 'email' },
              { title: 'Contact', field: 'contact' },
              { title: 'Joining Date', field: 'joinDate' },
              { title: 'Gender', field: 'gender' },
            ]}
            data={users}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Show Details',
                onClick: (event, rowData) => history.push(`/admin/video-conference/users/${rowData._id}`, rowData)
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              search: true
            }}
          />
        </div>
      </div>
    </>
  )
}
export default Index;
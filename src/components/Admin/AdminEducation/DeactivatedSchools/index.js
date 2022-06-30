import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import './admin.css';
import {BaseUrl, ImageUrl} from "../../../API"
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Header from "../Header"
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from "axios"
import {useHistory} from "react-router-dom"

const AdminData = JSON.parse(localStorage.getItem('Admin'));

const Index = () => {
  const history = useHistory()
  const [schools, setSchools] = useState([]);
  const [status, setStatus] = useState('');
  const [schoolID, setSchoolID] = useState('');

  const getAllShop = ()=>{
    axios.get(`${BaseUrl}/deactive-schools-list`).then((res)=>{
        setSchools(res.data.data)
    })
  }
  useEffect(()=>{
    getAllShop()
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
            title="Deactivated School list"
            columns={[
              { title: 'School ID', field: '_id' },
              { title: 'School Name', field: 'name' },
              { title: 'Reg No.', field: 'reg_no' },
              { title: 'Medium', field: 'medium' },
              { title: 'Phone No', field: 'phonenumber' },
            ]}
            data={schools}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'Show Details',
                onClick: (event, rowData) => history.push(`/admin/education/deactivated-schools/details`, rowData)
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
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import {useSelector} from "react-redux"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './index.css';
import {BaseUrl, ImageUrl} from "../../API"
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Header from "../Header"
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from "axios"
import {useHistory} from "react-router-dom"


let AdminData = JSON.parse(localStorage.getItem('Admin'));

const Index = () => {
  const admin  = useSelector((state)=>state.loginReducer.adminDetails)
  if(Object.keys(admin).length !==0){
    AdminData = admin
  }

  const history = useHistory()
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('');
  const [shopID, setShopID] = useState('');
  const toggleModal = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;

  const getAllUsers = ()=>{
    axios.get(`${BaseUrl}/users-list`).then((res)=>{
        setUsers(res.data.data)
    })
  }
  useEffect(()=>{
    getAllUsers()
  },[])

  const getApprovedData = (data)=>{
    console.log('Vendor ID', data._id)
    setShopID(data._id)
    toggleModal()  
  }
  return (
    <>
     <Header/>
      <div className='admin_container' >
        <div>
          <Modal isOpen={modal} toggle={toggleModal} >
            <Form>
              <ModalHeader toggle={toggleModal} close={closeBtn}>Shop Approval</ModalHeader>
              <ModalBody>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleSelect">Please update the shop status</Label>
                      <Input type="select" name="select" id="exampleSelect" onClick={(e)=>setStatus(e.target.value)}>
                        <option value="Verifying">Verifying</option>
                        <option value="Canceled">Canceled</option>
                        <option value="Verified">Verified</option>
                        <option value="Approved">Approved</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={()=>{toggleModal()}}>Submit</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </Form>

          </Modal>
        </div>
        <div className='fees_table' >
          <MaterialTable
            title="All Users List"
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Gender', field: 'gender' },
              { title: 'Email', field: 'email' },
              { title: 'Mobile', field: 'mobile' },
            ]}
            data={users}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Deactivate',
                // onClick: (event, rowData) => getApprovedData(rowData)
              }
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
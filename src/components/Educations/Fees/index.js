
import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import Header from '../Header';
import axios from 'axios';
import {BaseUrl} from '../../API';
import { jsPDF } from "jspdf";






function FeesDetails() {

  const [modal, setModal] = useState(false);
  const [userId, setUserId]= useState('');
  const [startdate,setStartdate]= useState('');
  const [enddate,setEnddate] = useState('');
   const[name,setName] = useState('')

const onHandleNameChange=(e)=>{

setName(e.target.value)


}
const onHandleuserIdChange=(e)=>{

  setUserId(e.target.value)
  
  
  }
  const onHandleStartdateChange=(e)=>{

    setStartdate(e.target.value)
    
    
    }
    const onHandleEnddateChange=(e)=>{

      setEnddate(e.target.value)
      
      
      }
      



const submitDetails=()=>{

axios.get('http://api.emagz.live/v1.0/feesdetails').then
(res=> console.log('fee', res))


}

useEffect(()=>{
  submitDetails()
}

,[])

const getDetailsfees=()=>{

const getData ={

id: userId,
startdate: startdate,
enddate: enddate,
name: name

}


axios.post(`${BaseUrl}/filterfees`,getData).then
(res=> console.log('fltrfee', res))

toggleModal();


}


// useEffect(()=>{
// getDetailsfees();
// }, [])



  
  const toggleModal = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;
  return (
    <>
      <Header />
      <div className='fees_details_container' >
        <div className='filter_icon'  >
          <Tooltip title='Filter Details' >
            <button onClick={setModal} style={{ backgroundColor: 'white', border: 'none', outline: 'none' }}    >  <FontAwesomeIcon style={{ color: 'blue', fontSize: '1.5rem' }} icon={faFilter} />  </button>
          </Tooltip>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggleModal} >
            <Form>
              <ModalHeader toggle={toggleModal} close={closeBtn}> View Fees Details</ModalHeader>
              <ModalBody>
              <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label >User ID</Label>
                      <Input required value={userId}  onChange={onHandleuserIdChange} type="id" name="number" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label >Name</Label>
                      <Input required value={name}  onChange={onHandleNameChange} type="name" name="name" placeholder="" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                  <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail">From</Label>
                        <Input required value={startdate} onChange={onHandleStartdateChange}
                            type="date"
                            name="startdate"
                            id="examplestartDate"
                            placeholder="date placeholder"
                            />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                  <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail">to</Label>
                        <Input onChange={onHandleEnddateChange}   required value={enddate}
                            type="date"
                            name="startdate"
                            id="exampleendDate"
                            placeholder="date placeholder"
                            />
                    </FormGroup>
                  </Col>
                </Row>
                
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={getDetailsfees}>Check Details</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div className='fees_table' >
          <MaterialTable
            title="Fees Details"
            columns={[
              { title: 'User Id', field: 'id' },
              { title: 'User Name', field: 'first_name' },
              { title: 'Status', field: 'last_name' },
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                let url = 'https://reqres.in/api/users?'
                url += 'per_page=' + query.pageSize
                url += '&page=' + (query.page + 1)
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    resolve({
                      data: result.data,
                      page: result.page - 1,
                      totalCount: result.total,
                    })
                  })
              })
            }
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Details',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              },

            ]}
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



export default FeesDetails;






































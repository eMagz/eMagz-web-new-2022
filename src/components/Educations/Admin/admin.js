import React,{useState} from 'react'
import Header from './Header';
import MaterialTable from 'material-table';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './admin.css';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
 import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
const Admin=()=>{

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>; 
return(
    <>
    <Header/>
    <div className='add_button' >
    <Button onClick={toggleModal}
        variant="contained"
        color="primary"
      >
        Add School
        <AddBoxIcon style={{paddingLeft:'6px'}}/>
      </Button>
    </div>
    <div  className='admin_container' >
   
   <div>
   <Modal isOpen={modal} toggle={toggleModal} >
     <Form>
     <ModalHeader toggle={toggleModal}    close={closeBtn}>ADD DETAILS</ModalHeader>
     <ModalBody>
     <Row form>
     <Col md={6}>
     <FormGroup>
        <Label for="exampleSelect">State</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
     </Col>
     <Col md={6}>
     <FormGroup>
        <Label for="exampleSelect">District</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
     </Col>
   </Row>
     </ModalBody>
     <ModalFooter>
       <Button color="primary" onClick={toggleModal}>ADD</Button>{' '}
       <Button color="secondary" onClick={toggleModal}>Cancel</Button>
     </ModalFooter>
     </Form>
   </Modal>
   </div>
   <div  className='fees_table' >
   <MaterialTable
   title="School List"
  
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


export default Admin;

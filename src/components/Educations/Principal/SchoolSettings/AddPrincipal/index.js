import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import Header from '../../../Header';
import axios from 'axios';
import {BaseUrl} from '../../../../API';
import swal from '@sweetalert/with-react'
import { Email } from '@material-ui/icons';


  export default function AddClass() {
    const[row,setRow]=useState([])
  const [modal, setModal] = useState(false);
  const[newmodal,setNewModal]=useState(false);
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[address,setAddress]=useState('');
  const[aadhar,setAadhar]=useState('');
  const[dob,setDob]=useState('');
  const[qualification,setQualification]= useState('');
  const[mobile,setMobile]= useState('');
  const[city,setCity]=useState('');
  const[states,setStates]=useState('');
  const[religion,setReligion]=useState('');
  const[caste,setCaste]=useState('')
  const[zip,setZip]=useState('');
  const[gender,setGender]=useState('');

  const[editname,setEditName]=useState('');
  const[editemail,setEditEmail]=useState('');
  const[editaddress,setEditAddress]=useState('');
  const[editaadhar,setEditAadhar]=useState('');
  const[editdob,setEditDob]=useState('');
  const[editqualification,setEditQualification]= useState('');
  const[editmobile,setEditMobile]= useState('');
  const[editcity,setEditCity]=useState('');
  const[editstates,setEditStates]=useState('');
  const[editreligion,setEditReligion]=useState('');
  const[editcaste,setEditCaste]=useState('')
  const[editzip,setEditZip]=useState('');
  const[editgender,setEditGender]=useState('');

  
  // const [name,setName]= useState('');
   const [classes,setClasses] = useState('');

   const [editclasses,setEditClasses]= useState('');
   
   const[resdata,setData]= useState([]);
  

const data=localStorage.getItem('education')
const finaldata= JSON.parse(data);

console.log('finl',finaldata);
const toggleModal = () => setModal(!modal);
  const toggleNewModal =()=> setNewModal(!newmodal);

// const onHandleDateChange=(e)=>{

//   setDate(e.target.value)
  
  
//   }
//   const onHandleDescriptionChange=(e)=>{

//     setStartdate(e.target.value)
//     }



//     const onHandleEnddateChange=(e)=>{

//       setEnddate(e.target.value)
      
      
//       }
      



// const submitDetails=()=>{

// axios.get(`${BaseUrl}/viewclasseslist/${finaldata.data.school_id}`).then
// (res=> {
//     const resdata=res.data.data;
//     console.log('pp',resdata);
//     setData(resdata);
// })


// }

// useEffect(()=>{
//   submitDetails()
// }

// ,[])

const addPrincipal=()=>{

const getData ={

name:name,
dob:dob,
gender:gender,
caste:caste,
religion:religion,
aadhaarcard: aadhar,
mobile:mobile,
email:email,
address:address,
user_id: finaldata.data.user_id,
school_id: finaldata.data.school_id

}


axios.post(`${BaseUrl}/addprincipal`,getData).then
(res=> {
  if(res.data.status===true){
    swal(
    <h1>{res.data.msg}</h1>
    )
  }else{
    swal(
      <h1>{res.data.msg}</h1>
      )
  }
})

toggleModal();
// submitDetails();

}


const EditPrincipal=()=>{

const data={
    name:editname,
    dob:editdob,
    gender:editgender,
    caste:editcaste,
    religion:editreligion,
    aadhaarcard: editaadhar,
    mobile:editmobile,
    email:editemail,
    address:editaddress,
}
axios.post(`${BaseUrl}/editclasses/${row._id}`,data).then
(res=> {
    console.log('xx',res)
  if(res.data.status===true){
    swal(
    <h1>{res.data.msg}</h1>
    )
  }
//   submitDetails();
})

toggleNewModal();

}







  
  
  const closeBtn = <button className="close" onClick={toggleNewModal }>&times;</button>;
  const clsbtn= <button className="close" onClick={toggleModal}>&times;</button>
  return (
    <>
      <Header />
      <div className='addprincipal_container' >
        <div className='addprincipal_icon'  >
          <Tooltip title='Add Class' >
            <button onClick={setModal} style={{ backgroundColor: 'gray', border: 'none', outline: 'none',color:'white',fontSize:'1.1rem',borderRadius:'5px',padding:'5px' }}    > ADD <FontAwesomeIcon style={{ color: 'white', fontSize: '1.1rem' }} icon={faPlusSquare} />  </button>
          </Tooltip>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggleModal} >
              <ModalBody>
              <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Full Name</Label>
            <Input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" id="exampleEmail"  />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Email</Label>
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="examplePassword"  />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="exampleAddress">Address</Label>
        <Input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
      </FormGroup>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleCity">Qualification</Label>
            <Input value={qualification} onChange={(e)=>setQualification(e.target.value)} type="text" name="qualification" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">Mobile no.</Label>
            <Input value={mobile} onChange={(e)=>setMobile(e.target.value)} type="text" name="state" id="exampleState"/>
          </FormGroup>
        </Col>
        <Col md={4}>
        <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input value={dob} onChange={(e)=>setDob(e.target.value)}
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
        />
      </FormGroup>  
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input value={city} onChange={(e)=>setCity(e.target.value)} type="text" name="city" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State</Label>
            <Input value={states} onChange={(e)=>setStates(e.target.value)} type="text" name="state" id="exampleState"/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Zip</Label>
            <Input value={zip} onChange={(e)=>setZip(e.target.value)} type="text" name="zip" id="exampleZip"/>
          </FormGroup>  
        </Col>
      </Row>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleCity">Religion</Label>
            <Input value={religion} onChange={(e)=>setReligion(e.target.value)} type="text" name="religion" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleState">Caste</Label>
            <Input value={caste} onChange={(e)=>setCaste(e.target.value)} type="text" name="caste" id="exampleState"/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Gender</Label>
            <Input value={gender} onChange={(e)=>setGender(e.target.value)} type="text" name="gender" id="exampleZip"/>
          </FormGroup>  
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleZip">AADHAR Details</Label>
            <Input value={aadhar} onChange={(e)=>setAadhar(e.target.value)} type="text" name="aadhar" id="exampleZip"/>
          </FormGroup>  
        </Col>
      </Row>
              </ModalBody>
          <Form>
      
     
      
      <ModalFooter>
                <Button color="primary" onClick={addPrincipal}>Add Principal</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
    </Form>
          </Modal>
        </div>
        <div>
        <Modal isOpen={newmodal} toggle={toggleNewModal}>
            <Form>
              <ModalHeader toggle={toggleNewModal } close={closeBtn}>Edit Principal</ModalHeader>
              <ModalBody>
              <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Full Name</Label>
            <Input value={editname} onChange={(e)=>setEditName(e.target.value)} type="text" name="name" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Email</Label>
            <Input value={editemail} onChange={(e)=>setEditEmail(e.target.value)} type="email" name="email" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="exampleAddress">Address</Label>
        <Input value={editaddress} onChange={(e)=>setEditAddress(e.target.value)} type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
      </FormGroup>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleCity">Qualification</Label>
            <Input value={editqualification} onChange={(e)=>setEditQualification(e.target.value)} type="text" name="qualification" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">Mobile no.</Label>
            <Input value={editmobile} onChange={(e)=>setEditMobile(e.target.value)} type="text" name="state" id="exampleState"/>
          </FormGroup>
        </Col>
        <Col md={4}>
        <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input value={editdob} onChange={(e)=>setEditDob(e.target.value)}
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
        />
      </FormGroup>  
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input value={editcity} onChange={(e)=>setEditCity(e.target.value)} type="text" name="city" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State</Label>
            <Input value={editstates} onChange={(e)=>setEditStates(e.target.value)} type="text" name="state" id="exampleState"/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Zip</Label>
            <Input value={editzip} onChange={(e)=>setEditZip(e.target.value)} type="text" name="zip" id="exampleZip"/>
          </FormGroup>  
        </Col>
      </Row>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleCity">Religion</Label>
            <Input value={editreligion} onChange={(e)=>setEditReligion(e.target.value)} type="text" name="religion" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleState">Caste</Label>
            <Input value={editcaste} onChange={(e)=>setEditCaste(e.target.value)} type="text" name="caste" id="exampleState"/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Gender</Label>
            <Input value={editgender} onChange={(e)=>setEditGender(e.target.value)} type="text" name="gender" id="exampleZip"/>
          </FormGroup>  
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleZip">AADHAR Details</Label>
            <Input value={editaadhar} onChange={(e)=>setEditAadhar(e.target.value)} type="text" name="aadhar" id="exampleZip"/>
          </FormGroup>  
        </Col>
      </Row>
              </ModalBody>
              <ModalFooter>
                <Button  color="primary" onClick={EditPrincipal}>Edit Principal</Button>{' '}
                <Button color="secondary" onClick={toggleNewModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div className='addprincipal_table' >
          <MaterialTable
            title="Principal List"
            columns={[
              
              { title: 'Class', field: 'classes' }
            
            ]}
             data={resdata}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Details',
                onClick: (event, rowData) =>{
                   
                 console.log('row',rowData);
                 setRow(rowData);
                 setEditName(rowData.name);
                 setEditAddress(rowData.address);
                 setEditCaste(rowData.caste);
                 setEditReligion(rowData.religion);
                 setEditMobile(rowData.mobile);
                 setEditDob(rowData.dob);
                 setEditEmail(rowData.email);
                 setEditGender(rowData.gender);
                  setNewModal(!modal)
                } 
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




















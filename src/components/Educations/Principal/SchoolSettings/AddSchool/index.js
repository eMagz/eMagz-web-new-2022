import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import Header from '../../../Header';
import axios from 'axios';
import {BaseUrl} from '../../../../API';
import swal from '@sweetalert/with-react'


  export default function AddClass() {
    const[row,setRow]=useState([])
  const [modal, setModal] = useState(false);
  const[newmodal,setNewModal]=useState(false);

  const [date, setDate]= useState('');
  const[name,setName]= useState('');
  const[address,setAddress]= useState('');
  const[regno,setRegno]= useState('');
  const[board,setBoard]= useState('');
  const[medium,setMedium]= useState('');
  const[phonenumber,setPhonenumber]=useState('');
  const[banner,setBanner]= useState('');
  const[logo,setLogo]=useState('');
  // const [name,setName]= useState('');
  const[editname,setEditName]= useState('');
  const[editbanner,setEditBanner]= useState('');
  const[editlogo,setEditLogo]=useState('');
  const[editaddress,setEditAddress]= useState('');
  const[editregno,setEditRegno]= useState('');
  const[editboard,setEditBoard]= useState('');
  const[editmedium,setEditMedium]= useState('');
  const[editphonenumber,setEditPhonenumber]=useState('')
   const [classes,setClasses] = useState('');

   const [editclasses,setEditClasses]= useState('');
   
   const[resdata,setData]= useState([]);
  

const data=localStorage.getItem('education')
const finaldata= JSON.parse(data);

console.log('finl',finaldata);
const toggleModal = () => setModal(!modal);
  const toggleNewModal =()=> setNewModal(!newmodal);

  const onHandleBannerChange=(e)=>{

    const files = e.target.files[0];  
   setBanner(files)
   }
   const onHandleLogoChange=(e)=>{

    const files = e.target.files[0];  
   setLogo(files)
   }
//   const onHandleDescriptionChange=(e)=>{

//     setStartdate(e.target.value)
//     }



//     const onHandleEnddateChange=(e)=>{

//       setEnddate(e.target.value)
      
      
//       }
      



const submitDetails=()=>{


axios.get(`${BaseUrl}/listschool`).then
(res=> {
    const resdata=res.data.data;
    console.log('pp',resdata);
    setData(resdata);
})


}

useEffect(()=>{
  submitDetails()
}

,[])

const addSchool=()=>{

const getData ={
name: name,
address:address,
regno:regno,
board: board,
medium: medium,
phonenumber:phonenumber,


}

const bannerdata = new FormData()

  bannerdata.append(
      'bannerimage',
     banner

  );

  const logodata = new FormData()

  logodata.append(
      'logoimage',
      logo

  );


axios.post(`${BaseUrl}/addschool`,getData).then
(res=> {
  console.log('ss',res)
  axios.post(`${BaseUrl}/uploadschoolbanner/${res.data.data._id}`,bannerdata).then
  (resone=>
    axios.post(`${BaseUrl}/uploadschoollogo/${res.data.data._id}`,logodata).then
    (restwo=>{
      if(restwo.data.status===true){
        swal(
        <h1>{restwo.data.msg}</h1>
        )
      }else{
        swal(
          <h1>{restwo.data.msg}</h1>
          )
      }
    }
    
    )
    )
 
  
})

toggleModal();
submitDetails();

}


const EditSchool=()=>{

const data={
  name: editname,
  banner:editbanner,
 
  address:editaddress,
  regno:editregno,
  board: editboard
}
axios.post(`${BaseUrl}/editclasses/${row._id}`,data).then
(res=> {
    console.log('xx',res)
  if(res.data.status===true){
    swal(
    <h1>{res.data.msg}</h1>
    )
  }
  submitDetails();
})

toggleNewModal();

}







  
  
  const closeBtn = <button className="close" onClick={toggleNewModal }>&times;</button>;
  const clsbtn= <button className="close" onClick={toggleModal}>&times;</button>
  return (
    <>
      <Header />
      <div className='addteacher_container' >
        <div className='addteacher_icon'  >
          <Tooltip title='Add School' >
            <button onClick={setModal} style={{ backgroundColor: 'gray', border: 'none', outline: 'none',color:'white',fontSize:'1.1rem',borderRadius:'5px',padding:'5px' }}    > ADD <FontAwesomeIcon style={{ color: 'white', fontSize: '1.1rem' }} icon={faPlusSquare} />  </button>
          </Tooltip>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggleModal} >
            <Form>
              <ModalHeader toggle={toggleModal} close={clsbtn}>Add School</ModalHeader>
              <ModalBody>
              <FormGroup>
        <Label for="exampleEmail">School Name</Label>
        <Input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name"  />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Address</Label>
        <Input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" name="address"  />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">Banner Upload</Label>
        <Input  onChange={onHandleBannerChange} type="file" name="file" id="exampleFile" />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
        </FormGroup>
        
        <FormGroup>
        <Label for="exampleFile">Logo Upload</Label>
        <Input  onChange={onHandleLogoChange}  type="file" name="file" id="exampleFile" />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
        </FormGroup>
        <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Registration no.</Label>
            <Input value={regno} onChange={(e)=> setRegno(e.target.value)}  type="text" name="regno" id="exampleEmail"  />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Board</Label>
            <Input value={board} onChange={(e)=> setBoard(e.target.value)}  type="text" name="board" id="examplePassword"  />
          </FormGroup>
        </Col>
       
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Mobile number</Label>
            <Input value={phonenumber} onChange={(e)=> setPhonenumber(e.target.value)}  type="number" name="regno" id="exampleEmail"  />
          </FormGroup>
        </Col>
       
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Medium</Label>
            <Input value={medium} onChange={(e)=> setMedium(e.target.value)}  type="text" name="medium" id="examplePassword"  />
          </FormGroup>
        </Col>
      </Row>
          </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={addSchool}>Add School</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div>
        <Modal isOpen={newmodal} toggle={toggleNewModal}>
            <Form>
              <ModalHeader toggle={toggleNewModal } close={closeBtn}>Edit School</ModalHeader>
              <ModalBody>
              <FormGroup>
        <Label for="exampleEmail">School Name</Label>
        <Input value={editname} onChange={(e)=>setEditName(e.target.value)} type="text" name="name"  />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Address</Label>
        <Input value={editaddress} onChange={(e)=>setEditAddress(e.target.value)} type="text" name="address"  />
      </FormGroup>
        <FormGroup>
        <Label for="exampleFile">Banner Upload</Label>
        <Input value={editbanner} onChange={(e)=> setEditBanner(e)} type="file" name="file" id="exampleFile" />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
        </FormGroup>
        <FormGroup>
        <Label for="exampleFile">Logo Upload</Label>
        <Input value={editlogo} onChange={(e)=> setEditLogo(e)} type="file" name="file" id="exampleFile" />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
        </FormGroup>
        <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Registration no.</Label>
            <Input value={editregno} onChange={(e)=> setEditRegno(e.target.value)}  type="text" name="regno" id="exampleEmail"  />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Board</Label>
            <Input value={editboard} onChange={(e)=> setEditBoard(e.target.value)}  type="text" name="board" id="examplePassword"  />
          </FormGroup>
        </Col>
       
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Mobile number</Label>
            <Input value={editphonenumber} onChange={(e)=> setEditPhonenumber(e.target.value)}  type="number" name="regno" id="exampleEmail"  />
          </FormGroup>
        </Col>
       
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Medium</Label>
            <Input value={editmedium} onChange={(e)=> setEditMedium(e.target.value)}  type="text" name="medium" id="examplePassword"  />
          </FormGroup>
        </Col>
      </Row>
              </ModalBody>
              <ModalFooter>
                <Button  color="primary" >Edit School</Button>{' '}
                <Button color="secondary" onClick={toggleNewModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div className='addteacher_table' >
          <MaterialTable
            title="School List"
            columns={[
              
              { title: 'School Name', field: 'name' },
              { title: 'Phone Number', field: 'phonenumber' },
              { title: 'Medium', field: 'medium' },
              { title: 'Address', field: 'address' },
              { title: 'Registration no.', field: 'reg_no' },
            
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
                 setEditMedium(rowData.medium);
                 setEditPhonenumber(rowData.phonenumber);
                 setEditBoard(rowData.board);
                 setEditRegno(rowData.regno);
                 setEditAddress(rowData.address);
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




















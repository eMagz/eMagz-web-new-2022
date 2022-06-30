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


  export default function AddClass() {
    const[row,setRow]=useState([])
  const [modal, setModal] = useState(false);
  const[newmodal,setNewModal]=useState(false);

  const [date, setDate]= useState('');
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
      



const submitDetails=()=>{

axios.get(`${BaseUrl}/viewclasseslist/${finaldata.data.school_id}`).then
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

const addClasses=()=>{

const getData ={

classes:classes,
school_id: finaldata.data.school_id

}


axios.post(`${BaseUrl}/addclasses`,getData).then
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
submitDetails();

}


const EditClass=()=>{

const data={
 classes: editclasses
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
      <div className='addclass_container' >
        <div className='addclass_icon'  >
          <Tooltip title='Add Class' >
            <button onClick={setModal} style={{ backgroundColor: 'gray', border: 'none', outline: 'none',color:'white',fontSize:'1.1rem',borderRadius:'5px',padding:'5px' }}    > ADD <FontAwesomeIcon style={{ color: 'white', fontSize: '1.1rem' }} icon={faPlusSquare} />  </button>
          </Tooltip>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggleModal} >
            <Form>
              <ModalHeader toggle={toggleModal} close={clsbtn}>Add class</ModalHeader>
              <ModalBody>
              <FormGroup>
                <Label for="exampleEmail">Class</Label>
                <Input value={classes} required onChange={(e)=>setClasses(e.target.value)}
                type="text"
                name="classes"
                id="exampleEmail"
                placeholder="ex: 11"
                />
      </FormGroup>
          </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={addClasses}>Add Class</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div>
        <Modal isOpen={newmodal} toggle={toggleNewModal}>
            <Form>
              <ModalHeader toggle={toggleNewModal } close={closeBtn}>Edit Class</ModalHeader>
              <ModalBody>
              <FormGroup>
        <Label for="exampleEmail">Class</Label>
        <Input value={editclasses} required onChange={(e)=>setEditClasses(e.target.value)}
          type="text"
          name="editclass"
         
          
        />
      </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button  color="primary" onClick={EditClass}>Edit Class</Button>{' '}
                <Button color="secondary" onClick={toggleNewModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div className='addclass_table' >
          <MaterialTable
            title="Classes List"
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
                 setEditClasses(rowData.classes);
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




















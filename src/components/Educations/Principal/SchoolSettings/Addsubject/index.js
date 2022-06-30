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


  export default function AddSubject() {

  const [modal, setModal] = useState(false);
  const[newmodal,setNewModal]=useState(false);
  const [date, setDate]= useState('');
  // const [name,setName]= useState('');
  const [subject,setSubject] = useState('');

   const [editsubject,setEditSubject]= useState('');
   
   const[resdata,setData]= useState([]);
   const[row,setRow]=useState([])

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

axios.get(`${BaseUrl}/viewsubjectslist/${finaldata.data.school_id}`).then
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

const addSubject=()=>{

const getData ={

subject: subject,
school_id: finaldata.data.school_id

}


axios.post(`${BaseUrl}/addsubject`,getData).then
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


const EditSubject=()=>{

const data={
 subject: editsubject
}
axios.post(`${BaseUrl}/editsubject/${row._id}`,data).then
(res=> {
  if(res.data.status===true){
    swal(
    <h1>{res.data.msg}</h1>
    )
  }
  submitDetails();
})

toggleNewModal();

}




// useEffect(()=>{
// getDetailsfees();
// }, [])



  
  
const closeBtn = <button className="close" onClick={toggleNewModal }>&times;</button>;
const clsbtn= <button className="close" onClick={toggleModal}>&times;</button>
  return (
    <>
      <Header />
      <div className='addsubject_container' >
        <div className='addsubject_icon'  >
          <Tooltip title='Add Noticeboard' >
            <button onClick={setModal} style={{ backgroundColor: 'gray', border: 'none', outline: 'none',color:'white',fontSize:'1.1rem',borderRadius:'5px',padding:'5px' }}    > ADD <FontAwesomeIcon style={{ color: 'white', fontSize: '1.1rem' }} icon={faPlusSquare} />  </button>
          </Tooltip>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggleModal} >
            <Form>
              <ModalHeader toggle={toggleModal} close={clsbtn}>Add Subject</ModalHeader>
              <ModalBody>
              <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input value={subject}  required onChange={(e)=>setSubject(e.target.value)}
          type="text"
          name="subject"
          
         
        />
      </FormGroup>
     
                
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={addSubject}>Add Subject</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div>
        <Modal isOpen={newmodal} toggle={toggleNewModal}>
            <Form>
              <ModalHeader toggle={toggleNewModal } close={closeBtn}>Edit Subject</ModalHeader>
              <ModalBody>
              <FormGroup>
        <Label for="exampleDate">Subject</Label>
        <Input value={editsubject}
         type="text"
         name="subjects"
         id="exampleEmail"
         onChange={(e)=>setEditSubject(e.target.value)}
        />
      </FormGroup>
      
              </ModalBody>
              <ModalFooter>           
                <Button  color="primary" onClick={EditSubject}>Edit Subject</Button>{' '}
                <Button color="secondary" onClick={toggleNewModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div className='addsubject_table' >
          <MaterialTable
            title="Subjects List"
            columns={[
              
              { title: 'Subject', field: 'subject' }
              
            ]}
             data={resdata}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Details',
                onClick: (event, rowData) =>{
                   
                 console.log('row',rowData);
                 setRow(rowData)
                 setEditSubject(rowData.subject)
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


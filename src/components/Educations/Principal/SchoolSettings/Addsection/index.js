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

  const [modal, setModal] = useState(false);
  const[newmodal,setNewModal]=useState(false);
  const [date, setDate]= useState('');
  // const [name,setName]= useState('');
  const [section,setSection] = useState('');

   const [editsection,setEditSection]= useState('');
   
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

axios.get(`${BaseUrl}/viewsectionlist/${finaldata.data.school_id}`).then
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

const addSection=()=>{

const getData ={


section: section,
school_id: finaldata.data.school_id

}


axios.post(`${BaseUrl}/addsection`,getData).then
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


const EditSection=()=>{

const data={
 section: editsection
}
axios.post(`${BaseUrl}/editsection/${row._id}`,data).then
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
      <div className='addsection_container' >
        <div className='addsection_icon'  >
          <Tooltip title='Add Noticeboard' >
            <button onClick={setModal} style={{ backgroundColor: 'gray', border: 'none', outline: 'none',color:'white',fontSize:'1.1rem',borderRadius:'5px',padding:'5px' }}    > ADD <FontAwesomeIcon style={{ color: 'white', fontSize: '1.1rem' }} icon={faPlusSquare} />  </button>
          </Tooltip>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggleModal} >
            <Form>
            <ModalHeader toggle={toggleModal} close={clsbtn}>Add Section</ModalHeader>
              <ModalBody>
              <FormGroup>
                <Label for="exampleEmail" >Section</Label>
                <Input value={section} required onChange={(e)=>setSection(e.target.value)}
                type="text"
                name="classes"
                id="exampleEmail"
               
                />
      </FormGroup>
      
                
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={addSection}>Add Section</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div>
        <Modal isOpen={newmodal} toggle={toggleNewModal}>
            <Form>
              <ModalHeader toggle={toggleNewModal } close={closeBtn}>Edit Section</ModalHeader>
              <ModalBody>
              <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input  value={editsection} required onChange={(e)=>setEditSection(e.target.value)}
          type="text"
          name="sections"
          id="exampleEmail"
        
        />
      </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button  color="primary" onClick={EditSection}>Edit Section</Button>{' '}
                <Button color="secondary" onClick={toggleNewModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div className='addsection_table' >
          <MaterialTable
            title="Sections List"
            columns={[
              
              { title: 'Section', field: 'section' },
              
            ]}
            data={resdata}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Details',
                onClick: (event, rowData) =>{
                   
                 console.log('row',rowData);
                 setRow(rowData)
                 setEditSection(rowData.section)
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


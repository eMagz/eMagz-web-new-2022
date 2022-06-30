import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPlusSquare,faSearch } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Tooltip from '@material-ui/core/Tooltip';
import Header from '../../../Header';
import axios from 'axios';
import {BaseUrl} from '../../../../API';
import swal from '@sweetalert/with-react';
// import {BaseUrl} from '../../API';

function TeacherClassDiary() {

  const [modal, setModal] = useState(false);
  const[editmodal,setEditModal]=useState(false);
  const[newdate,setNewdate]= useState('');
  const[newdescription,setNewDescription] = useState('');
  const[date,setDate]= useState('');
   
   const [description,setDescription] = useState('')
   const[classes,setClasses]=useState('');
   const[section,setSection]= useState('');
   const[studentlist,setStudentList]= useState([]);
   const[rowDta,setrowDta] = useState('')
   const[classdata,setClassdata]=useState([]);
   const[sectiondata,setSectiondata]=useState([])
  const diarydata = JSON.parse(localStorage.getItem('education'))
   const toggleEditmodal =()=> setEditModal(!editmodal)
   const closeBtnone = <button className="close" onClick={toggleEditmodal}>&times;</button>;

  //  const [modal, setModal] = useState(false);

   const toggle = () => setModal(!modal);


   
const onHandleDescriptionChange=(e)=>{

setDescription(e.target.value)
}
const onHandleDateChange=(e)=>{

  setDate(e.target.value)
  }
  const onHandleNewDateChange=(e)=>{

    setNewdate(e.target.value)
    }

const onHandleClassesChange=(e)=>{

  setClasses(e.target.value)
  }     

  const onHandleSectionChange=(e)=>{

    setSection(e.target.value)
    }
const onHandleNewDescriptionChange=(e)=>{
  setNewDescription(e.target.value)
}


const submitDetails=()=>{

  const data={
    section_id: section,
    classes_id: classes 
  }

axios.post(`${BaseUrl}/studentlist`,data).then
(res=> {
  console.log('data',res.data.data)
  const studentlist = res.data.data;
  setStudentList(studentlist);
})


}


const addClassDiary=()=>{


  const data={
    date: newdate,
    description: newdescription,
    user_id: diarydata.data.user_id,
    school_id: diarydata.data.school_id
}
axios.post(`${BaseUrl}/addclassdiary`, data).then
(res=>  {
if(res.data.status=== true){
  swal(
    <div>
      <h1>Hello Teacher!</h1>
      <p>
       {res.data.msg}
      </p>
    </div>
  )
}else{
  swal(
    <div>
      <h1>Hello Teacher!</h1>
      <p>
        {res.data.msg}
      </p>
    </div>
  )
}
})


setNewDescription('');
setNewdate('');
toggle();
}

useEffect(()=>{


  axios.get(`${BaseUrl}/viewclasseslist/${diarydata.data.school_id}`).then
  (res=> {
    setClassdata(res.data.data)
  })
  
  },[])
  
  useEffect(()=>{
  
  
    axios.get(`${BaseUrl}/viewsectionlist/${diarydata.data.school_id}`).then
    (res=> {
      setSectiondata(res.data.data)
    })
    
    },[])
    


// useEffect(()=>{
//   submitDetails()
// }

// ,[])

// const getDetailsfees=()=>{

// const getData ={

// id: userId,
// startdate: startdate,
// enddate: enddate,
// name: name

// }


// axios.get(`${BaseUrl}/filterfees`,getData).then
// (res=> console.log('fltrfee', res))

// toggleModal();


// }


// useEffect(()=>{
// getDetailsfees();
// }, [])



  
  const toggleModal = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;
  return (
    <>
      <Header />
      <div className='viewteacher_container' >
        <div  className='viewteacher_header'>
        <div style={{width:'50%'}} >
         <Form>
         <Row form>
        <Col md={4}>
        <FormGroup>
        <Label for="exampleSelectMulti">Class</Label>
        <Input required value={classes} onChange={(e)=>setClasses(e.target.value)} type="select" name="select" id="exampleSelect">
        <option>--select--</option>
          {classdata.map(value=>{
            return(
            <option value={value._id}>{value.classes}</option>
            )
          })}
          
         
          
        </Input>
      </FormGroup>
        </Col>
        <Col md={4}>
        <FormGroup>
        <Label for="exampleSelectMulti">Section</Label>
        <Input required value={section} onChange={(e)=>setSection(e.target.value)} type="select" name="select" id="exampleSelect">
        <option>--select--</option>
          {sectiondata.map(value=>{
            return(
            <option value={value._id}>{value.section}</option>
            )
          })}
        </Input>
      </FormGroup>
        </Col>
        <Col md={4}>
       
        <Button onClick={submitDetails} style={{transform:'translateY(30px)'}} >Search<FontAwesomeIcon style={{marginLeft:'10px'}}  icon={faSearch}/> </Button>
      
        </Col>
        
      </Row>
     
         </Form>
        </div>
        <div className='add_icon'  >
          <Tooltip title='Add Details' >
            <Button onClick={setModal}>Add Class Diary  <FontAwesomeIcon style={{ color: 'blue', fontSize: '1.5rem' }} icon={faPlusSquare} />  </Button>
          </Tooltip>
        </div>
        </div>
       
       
        {/* <div>
          <Modal isOpen={modal} toggle={toggle} >

            <Form>
              <ModalBody>
              <FormGroup>
        <Label for="exampleDatetime">Date</Label>
        <Input required value={newdate} onChange={(e)=> setNewdate(e.target.value)}
          type="date"
          name="datetime"
          id="exampleDatetime"
          placeholder="datetime placeholder"
        />
      </FormGroup>
              <FormGroup>
                      <Label >Description</Label>
                      <Input  style={{height:'50px'}} required value={newdescription}  onChange={(e)=> setNewDescription(e.target.value)} type="id" name="number" />
                    </FormGroup>
                
              </ModalBody>
              <ModalFooter>
                <Button onClick={addClassDiary} color="primary" >Add</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div> */}
        <div>
        <div>
          <Modal isOpen={modal} toggle={toggle}  >
            <Form>
              <ModalHeader   toggle={toggle}> Diary Details</ModalHeader>
              <ModalBody>
              <FormGroup>
        <Label for="exampleDatetime">Date</Label>
        <Input required value={newdate} onChange={onHandleNewDateChange}
          type="date"
          name="datetime"
          id="exampleDatetime"
          placeholder="datetime placeholder"
        />
      </FormGroup>
              <FormGroup>
                      <Label >Description</Label>
                      <Input  style={{height:'50px'}} required value={newdescription}  onChange={onHandleNewDescriptionChange} type="id" name="number" />
                    </FormGroup>
                
              </ModalBody>
              <ModalFooter>
                <Button onClick={addClassDiary} color="primary" >Add</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        </div>
        <div className='viewteacher_table' >
          <MaterialTable
            title="Students Diary Details"
            columns={[
              { title: 'Name', field: 'name' },
              
              { title: 'Roll', field: 'roll' },
              { title: 'DOB', field: 'dob' },
            ]}
            data={studentlist}
            // actions={[
            //   {
            //     icon: 'edit',
            //     tooltip: 'Edit Details',
            //     onClick: (event, rowData) => {
            //       console.log('raw',rowData);
            //       const rowDta = rowData;
            //       setrowDta(rowDta);
            //       setEditModal(!editmodal)
                 

            //     }
            //   },

            // ]}
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



export default TeacherClassDiary;


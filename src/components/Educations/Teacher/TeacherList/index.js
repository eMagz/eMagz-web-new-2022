import React,{useState,useEffect} from 'react'
import Header from '../../Header';
import MaterialTable from 'material-table';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './index.css';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
 import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
  import axios from 'axios';
  import swal from '@sweetalert/with-react';
  import { useHistory } from 'react-router-dom';
  import {BaseUrl} from '../../../API'

const SchoolList=()=>{

const [teacherdata,setTeacherdata]= useState([])
const history = useHistory();

    const [modal, setModal] = useState(false);
    const[editmodal,setEditModal]=useState(false)
    const toggleModal = () => setModal(!modal);
    const toggleEditmodal =()=> setEditModal(!editmodal)
    const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>; 
    const closeBtnone = <button className="close" onClick={toggleEditmodal}>&times;</button>;

const TeacherList=()=>{


axios.get(`${BaseUrl}/viewteacherlist`).then
(res=>{
    console.log('data',res.data)
     const teacherdata = res.data.data;
     setTeacherdata(teacherdata);
})


}

useEffect(()=>{
    TeacherList();
},[])




return(
    <>
    <Header/>
    
    <div  className='adschl_container' >
   
   <div  className='fees_table' >
   <MaterialTable
   title="Teacher List"
  
   columns={[
    
     { title: 'Teacher Name', field: 'name' },
     { title: 'School_ID', field: 'school_id' },
     { title: 'Email', field: 'email' },
     { title: 'Mobile', field: 'mobile' },
     { title: 'Date of Birth', field: 'dob' },
     { title: 'Gender', field: 'gender' },
     { title: 'Add Skills', field: 'specializedin' },
     { title: 'Subject', field: 'subject' },
     { title: 'Caste', field: 'caste' },
     { title: 'District', field: 'district' },
   ]}
   data={teacherdata}
   actions={[
     {
       icon: 'edit',
       tooltip: 'Edit Details',
       onClick: (event, rowData) =>  {
        
          history.push('/educations/edit-teachers',rowData);
       }
        // setModal(!modal)
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


export default SchoolList;

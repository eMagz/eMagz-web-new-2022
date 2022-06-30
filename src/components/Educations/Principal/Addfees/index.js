import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusSquare,faSearch, faThList } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';

import Tooltip from '@material-ui/core/Tooltip';
import Header from '../../Header';
import axios from 'axios';
import {BaseUrl} from '../../../API';
import {ImageUrl} from '../../../API';
import swal from '@sweetalert/with-react';
import {useHistory} from 'react-router-dom';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';


// import {BaseUrl} from '../../API';

function AddFees() {

  const [modal, setModal] = useState(false);

  const[date,setDate]= useState('');
  const[totalamount,setTotalamount]=useState('');
 
  
//    const[newdescription,setNewdescription]=useState();
   const[list,setList]=useState([])
//    const[]

   
    const history = useHistory();
//    const closeBtnone = <button className="close" onClick={toggleEditmodal}>&times;</button>;
   
const homewrkdata = JSON.parse(localStorage.getItem('education'))







   


  



const submitDetails=()=>{

// console.log('ss',photo)

  const data={
    date:date,
    totalfees: totalamount,
    school_id: homewrkdata.data.school_id,
    user_id: homewrkdata.data.user_id
  }

axios.post(`${BaseUrl}/addfeedetails`,data).then
(res=> {
    if(res.data.status===true){
        swal(res.data.msg)
    }
    getData()
})  





setDate('')
setTotalamount('')
toggleModal();
}




// const getHomeworkdata=()=>{

// const data={
//     classes: newclasses,
//     section: section
// }

// axios.post(`${BaseUrl}/searchteacherhomework`,data).then
// (res=> {
//     const list = res.data.data;
//     setList(list);
// })

// }





  
    

    const getData=()=>{
        axios.get(`${BaseUrl}/viewfeedetails/${homewrkdata.data.user_id}/${homewrkdata.data.school_id}`).then
        (res=> {
          setList(res.data.data)
        })
    }  










  
  const toggleModal = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;
  return (
    <>
      <Header />
      <div className='addfees_container' >
        <div  className='addfees_header'>
       

        <div className='addfees_icon'  >
        
          <Tooltip title='Add Details' >
            <Button onClick={setModal} 
           >ADD FEES<FontAwesomeIcon style={{ color: 'white', fontSize: '1rem',marginLeft:'4px' }} icon={faPlusSquare} />  </Button>
          </Tooltip>
        </div>
        </div>
       
       
        <div>
          <Modal isOpen={modal} toggle={toggleModal} >
            <Form>
              <ModalHeader toggle={toggleModal} close={closeBtn}> Add New homeWork</ModalHeader>
              <ModalBody>
              <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input value={date} required onChange={(e)=>setDate(e.target.value)}
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleNumber">Total Amount</Label>
        <Input value={totalamount} required onChange={(e)=>setTotalamount(e.target.value)}
          type="number"
          name="number"
          id="exampleNumber"
          placeholder="number placeholder"
        />
      </FormGroup>              
              </ModalBody>
              <ModalFooter>
                <Button onClick={submitDetails} color="primary" >Add</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div>
       
        </div>
        <div className='addfees_table' >
          <MaterialTable
            title="Add Fees Details"
            columns={[
              { title: 'Date', field: 'date' },
              { title: 'Total Amount', field: 'totalfees' },
              { title: 'Receipt Number', field: 'receiptnumber' },
            ]}
            data={list}
            // actions={[
            //   // {
            //   //   icon: 'edit',
            //   //   tooltip: 'Edit Details',
            //   //   onClick: (event, rowData) => {
            //   //     console.log('raw',rowData);
            //   //     const rowDta = rowData;
            //   //     setrowDta(rowDta);
            //   //     setEditModal(!editmodal)
                 

            //   //   }
            //   // },
              
            
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



export default AddFees;


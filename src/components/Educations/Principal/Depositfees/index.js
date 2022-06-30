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

function DepositFees() {
    const[getfeedata,setGetfeedata]=useState({})
  const [modal, setModal] = useState(false);
  const[date,setDate]= useState('');
  const[totalamount,setTotalamount]=useState(getfeedata.totalfees);
  const[amount,setAmount]=useState('');
  
//    const[studentlist,setStudentList]= useState([]);
 
   const[list,setList]=useState([])
//    const[]

//    const closeBtnone = <button className="close" onClick={toggleEditmodal}>&times;</button>;
   
const homewrkdata = JSON.parse(localStorage.getItem('education'))




console.log('mm',getfeedata._id);


   


  



const submitDetails=()=>{

// console.log('ss',photo)

  const data={
   
    date: date,
    amount: amount,
    totalfees: totalamount,
    feedetail_id:getfeedata._id,
    receiptnumber: getfeedata.receiptnumber,
    school_id: homewrkdata.data.school_id,
    user_id: homewrkdata.data.user_id
  }

 axios.post(`${BaseUrl}/depositfees`,data).then(
    res=>{
        console.log('cc',res)
        if(res.data.status===true){
                swal(
                <h4>{res.data.msg}</h4>
                )
                } 
                getData()
    } 
   
 )

// axios.post(`${BaseUrl}/addteacherhomework`,data).then
// (fres=> {
    
//   axios.post(`${BaseUrl}/uploadteacherhomework/${fres.data.data._id}`,formdata).then
//   (res=> {
//     if(res.data.status||fres.data.status===true){
//     swal(
//     <h4>{res.data.msg}</h4>
//     )
//     }else{
//       swal(
//         <h4>{res.data.msg}</h4>
//       )
//     }
//   })
// //   console.log('fbb',fres)
// })

setDate('')
setAmount('')
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




useEffect(()=>{


  axios.get(`${BaseUrl}/viewfeedetails/${homewrkdata.data.user_id}/${homewrkdata.data.school_id}`).then
  (res=> {
   console.log('xx',res.data.data[0])
    setGetfeedata(res.data.data[0])
  })
  
  },[])
  
  
 

    const getData=()=>{
        axios.get(`${BaseUrl}/viewfees/${homewrkdata.data.user_id}/${homewrkdata.data.school_id}`).then
        (res=> {
         console.log('xx',res.data.data)
          setList(res.data.data)
        })
      } 



















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
      <div className='depositfees_container' >
        <div  className='depositfees_header'>
        

        <div className='depositfees_icon'  >
        
          <Tooltip title='Add Details' >
            <Button onClick={setModal} 
           >DEPOSIT FEES<FontAwesomeIcon style={{ color: 'white', fontSize: '1rem',marginLeft:'4px' }} icon={faPlusSquare} />  </Button>
          </Tooltip>
        </div>
        </div>
       
       
        <div>
          <Modal isOpen={modal} toggle={toggleModal} >
            <Form>
              <ModalHeader toggle={toggleModal} >Add Deposit Details</ModalHeader>
              <ModalBody>
              <FormGroup>
        <Label >Date</Label>
        <Input required value={date} onChange={(e)=>setDate(e.target.value)}
          type="date"
          name="date"
          
        />
      </FormGroup>  
              <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Total Amount</Label>
            <Input value={totalamount} required onChange={(e)=> setTotalamount(e.target.value)} type="number"
             name="totalamount"   />
          </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
            <Label for="exampleEmail"> Amount</Label>
            <Input value={amount} required onChange={(e)=> setAmount(e.target.value)} type="number"
             name="amount"   />
          </FormGroup>
        </Col>
      </Row>
               
              </ModalBody>
              <ModalFooter>
                <Button onClick={submitDetails} color="primary" >Add</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
       
        <div className='depositfees_table' >
          <MaterialTable
            title="Deposit Fees Details"
            columns={[
              { title: 'Date', field: 'date' },
              { title: 'Total Amount', field: 'totalfees' },
              { title: 'Paid Amount', field: 'amount' },
              { title: 'Pending Fees', field: 'pendingfees' },
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



export default DepositFees;




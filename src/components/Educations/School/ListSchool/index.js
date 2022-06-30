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
  import {BaseUrl} from '../../../API';

const SchoolList=()=>{

    const [name,setName]= useState('');
    const [board,setBoard]= useState('');
    const [district, setDistrict]= useState('');
    const [states,setStates]= useState('');
    const[medium,setMedium]= useState('');
const [schooldata,setSchooldata]=useState([]);
const [editdata,setEditdata]=useState([])
   const [editname,setEditName]=useState('');
   const [editboard,setEditBoard]= useState('');
   const [editdistrict,setEditDistrict]= useState('');
   const [editstates,setEditStates]= useState('');
   const [editmedium,setEditMedium]= useState('');
   



const onHandleNameChange=(e)=>{
setName(e.target.value);
}
const onHandleBoardChange=(e)=>{
    setBoard(e.target.value);
    }
    const onHandleDistrictChange=(e)=>{
        setDistrict(e.target.value);
        }
        const onHandleStateChange=(e)=>{
            setStates(e.target.value);
            }
            const onHandleMediumChange=(e)=>{
                setMedium(e.target.value);
                }





                const onHandleEditNameChange=(e)=>{
                    setEditName(e.target.value);
                    }
                    const onHandleEditBoardChange=(e)=>{
                        setEditBoard(e.target.value);
                        }
                        const onHandleEditDistrictChange=(e)=>{
                            setEditDistrict(e.target.value);
                            }

                            const onHandleEditMediumChange=(e)=>{
                                setEditMedium(e.target.value);
                                }
                                const onHandleEditStateChange=(e)=>{
                                    setEditStates(e.target.value);
                                    }




    const [modal, setModal] = useState(false);
    const[editmodal,setEditModal]=useState(false)
    const toggleModal = () => setModal(!modal);
    const toggleEditmodal =()=> setEditModal(!editmodal)
    const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>; 
    const closeBtnone = <button className="close" onClick={toggleEditmodal}>&times;</button>;

const schoolList=()=>{


axios.get(`${BaseUrl}/listschool`).then
(res=>{
    console.log('data',res.data)
     const schooldata = res.data.data;
     setSchooldata(schooldata);
})


}

useEffect(()=>{
schoolList();
},[name,board,district,states,medium])

// console.log('nn',editdata.name);
// console.log('ww',editname)

const AddSchool=()=>{


const data={
    name: name,
    board: board,
    district: district,
    medium: medium,
    states: states
}

axios.post(`${BaseUrl}/addschool`,data).then
(res=>  {
    if(res.status===200){
        swal(
            <div>
              <h1>Hello There!</h1>
              <p>
                School Successfully Added!
              </p>
            </div>
          )
    }
}
)
toggleModal();
}

const EditSchool=()=>{

const data={
    name: editname,
    district: editdistrict,
    states: editstates,
    medium: editmedium,
    board: editboard 
}

console.log('ss',editdata)

axios.post(`${BaseUrl}/editschool/${editdata._id}` ,data).then
(res=>  {
   console.log('res',res)
    schoolList();
})
schoolList();

setEditModal(false)

}






return(
    <>
    <Header/>
    <div className='adschl_button' >
    <Button onClick={toggleModal}
        variant="contained"
        color="primary" >
        Add School
        <AddBoxIcon style={{paddingLeft:'6px'}}/>
      </Button>
    </div>
    <div  className='adschl_container' >
   
   <div>
   <Modal isOpen={editmodal} toggle={toggleEditmodal} >
     <Form>
     <ModalHeader toggle={toggleEditmodal}    close={closeBtnone}>EDIT SCHOOL DETAILS</ModalHeader>
     <ModalBody>
     <FormGroup>
        <Label for="exampleEmail">School Name*</Label>
        <Input required value={editname} onChange={onHandleEditNameChange} type="email" name="name" id="exampleName"  />
      </FormGroup>
     <Row form>
     <Col md={6}>
     <FormGroup>
        <Label for="exampleSelect">Board*</Label>
        <Input required value={editboard} onChange={onHandleEditBoardChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />

      </FormGroup>
     </Col>
     <Col md={6}>
     <FormGroup>
        <Label for="exampleSelect">District*</Label>
        <Input required value={editdistrict} onChange={onHandleEditDistrictChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
     </Col>
   </Row>
   <Row form>
     <Col md={6}>
     <FormGroup>
        <Label for="exampleSelect">State*</Label>
        <Input required value={editstates} onChange={onHandleEditStateChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />

      </FormGroup>
     </Col>
     <Col md={6}>
     <FormGroup>
        <Label for="exampleSelect">Medium*</Label>
        <Input required value={editmedium} onChange={onHandleEditMediumChange} type="select" name="select" id="exampleSelect">
          <option>English</option>
          <option>Hindi</option>
          <option>Bengali</option>
          <option>Urdu</option>
          <option>Others</option>
        </Input>
      </FormGroup>
     </Col>
   </Row>
   
     </ModalBody>
     <ModalFooter>
       <Button color="primary" onClick={EditSchool}>EDIT</Button>{' '}
       <Button color="secondary" onClick={toggleModal}>Cancel</Button>
     </ModalFooter>
     </Form>
    
   </Modal>
   </div>
   <div>
   <Modal isOpen={modal} toggle={toggleModal} >
     <Form>
     <ModalHeader toggle={toggleModal}    close={closeBtn}>ADD SCHOOL DETAILS</ModalHeader>
     <ModalBody>
     <FormGroup>
        <Label for="exampleEmail">School Name*</Label>
        <Input required value={name} onChange={onHandleNameChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
     <Row form>
     <Col md={6}>
     <FormGroup>
        <Label for="exampleSelect">Board*</Label>
        <Input required value={board} onChange={onHandleBoardChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />

      </FormGroup>
     </Col>
     <Col md={6}>
     <FormGroup>
        <Label for="exampleSelect">District*</Label>
        <Input required value={district} onChange={onHandleDistrictChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
     </Col>
   </Row>
   <Row form>
     <Col md={6}>
     <FormGroup>
        <Label for="exampleSelect">State*</Label>
        <Input required value={states} onChange={onHandleStateChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />

      </FormGroup>
     </Col>
     <Col md={6}>
     <FormGroup>
        <Label for="exampleSelect">Medium*</Label>
        <Input required value={medium} onChange={onHandleMediumChange} type="select" name="select" id="exampleSelect">
          <option>English</option>
          <option>Hindi</option>
          <option>Bengali</option>
          <option>Urdu</option>
          <option>Others</option>
        </Input>
      </FormGroup>
     </Col>
   </Row>
   
     </ModalBody>
     <ModalFooter>
       <Button color="primary" onClick={AddSchool}>ADD</Button>{' '}
       <Button color="secondary" onClick={toggleModal}>Cancel</Button>
     </ModalFooter>
     </Form>
    
   </Modal>
   </div>
   <div  className='fees_table' >
   <MaterialTable
   title="School List"
  
   columns={[
    
     { title: 'School Name', field: 'name' },
     { title: 'Board', field: 'board' },
     { title: 'State', field: 'states' },
     { title: 'Medium', field: 'medium' },
     { title: 'District', field: 'district' },
   ]}
   data={schooldata}
   actions={[
     {
       icon: 'edit',
       tooltip: 'Edit Details',
       onClick: (event, rowData) =>  {
        
           const editdata = rowData;
           setEditdata(editdata);
           setEditName(editdata.name);
           setEditBoard(editdata.board);
           setEditStates(editdata.states);
           setEditMedium(editdata.medium);
           setEditDistrict(editdata.district);
           setEditModal(!editmodal)
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

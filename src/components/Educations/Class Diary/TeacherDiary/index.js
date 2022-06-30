import React,{useState} from 'react'
import { Row,Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Header from '../../Header';
import axios from 'axios';
import './index.css'
import {BaseUrl} from '../../../API'
import swal from '@sweetalert/with-react'




const TeacherClassDiary=()=>{

    
    const [classes,setClasses]=useState('');
    const [section, setSection]=useState('');
    const [school_id, setSchool_id]= useState('');
    const [date,setDate]= useState('');
    const [description,setDescription]= useState('')
    // const [fathername, setFathername] = useState('');
    // const [description,setDescription] = useState('');
    // const [email,setEmail]= useState('');
    
const data=localStorage.getItem("education");
const finaldata= JSON.parse(data);
console.log('ww',finaldata)
const history = useHistory();
    
        const onHandleClassesChange=(e)=>{
            setClasses(e.target.value)
            }
            const onHandleSectionChange=(e)=>{
                setSection(e.target.value)
                }
                const onHandleSchoolidChange=(e)=>{
                    setSchool_id(e.target.value)
                    }
                    const onHandleDateChange=(e)=>{
                        setDate(e.target.value)
                        }
                         const onHandleDescriptionChange=(e)=>{
                           
                            setDescription(e.target.value)
                            }


const submitDetails=()=>{

  const data={

user_id: finaldata.data._id,
classes: finaldata.data.classes,
section: finaldata.data.section,
school_id: finaldata.data.school_id,
date: date,
description: description


  }

axios.post(`${BaseUrl}/addclassdiary`, data).then
(res=> {
  if(res.data.status===true){
    swal(
      <h1>{res.data.msg}</h1>
    )
    

  }
})

}







return(
    <>
     <Header/>
    <div className='studentdiary_container' >
        <div className='studentdiary_card' >
           <Form>
           <Row form>
          <Col md={6}>

          <FormGroup>
            <Label for="exampleEmail">Section*</Label>
            <Input required value={section} onChange={onHandleSectionChange} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Classes*</Label>
            <Input required value={classes} onChange={onHandleClassesChange} type="email" name="parentname" id="examplePassword" placeholder="password placeholder" />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
        </Col>
      </Row>
      
          
        
          <FormGroup>
            <Label for="examplePassword">Date*</Label>
            <Input required value={date} onChange={onHandleDateChange}
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
        />
            <FormText color="muted">
          This field is Required*
        </FormText>
          </FormGroup>
      
     
      <FormGroup>
        <Label for="exampleText">Descriptions</Label>
        <Input required value={description}  onChange={onHandleDescriptionChange} type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <Button onClick={submitDetails} variant="contained" color="primary"> Add Diary Details</Button>
           </Form>
            </div>
            </div>
    </>
)

}


export default TeacherClassDiary;

















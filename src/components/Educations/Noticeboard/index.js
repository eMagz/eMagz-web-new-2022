
import React, { useState } from 'react';
import './index.css';
import { Form,Row,Col, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Header from '../Header';
import axios from 'axios'






const Noticeboard=()=>{


const [date,setDate]=useState('');
const [section,setSection]= useState('');
const [classes, setClasses] = useState('')
const [reason,setReason]= useState('');

const onHandleDateChange=(e)=>{
setDate(e.target.value)
}

const onHandleSectionChange=(e)=>{
  setSection(e.target.value)
  }

  const onHandleClassesChange=(e)=>{
    setClasses(e.target.value)
    }

    const onHandleReasonChange=(e)=>{
      setReason(e.target.value)
      }

const userSubmit=()=>{


const data={
  date: date,
  section: section,
  Class: classes,
  reason: reason
}



axios.post('http://api.emagz.live/v1.0/addnoticeboard', data).then
(res=> console.log('resnotice', res))



}






return(
    <>
    <Header/>
    <div className='noticeboard_container' >
        <div className='noticeboard_card' >
         <Form>
         <Row form>
        <Col md={6}>
          <FormGroup>
            <Label style={{float:'left'}} for="exampleEmail">Classes</Label>
            <Input onChange={onHandleClassesChange} required value={classes} type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label style={{float:'left'}} for="examplePassword">Section</Label>
            <Input required value={section} onChange={onHandleSectionChange} type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
          </FormGroup>
        </Col>
      </Row> 
      <FormGroup>
        <Label style={{float:'left'}} for="exampleDate">Select Date</Label>
        <Input required value={date} onChange={onHandleDateChange}
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
        />
      </FormGroup> 
      <FormGroup>
        <Label style={{float:'left'}}  for="exampleText">Reason</Label>
        <Input required value={reason}  onChange={onHandleReasonChange} type="textarea" name="text" id="exampleText" />
      </FormGroup> 
      <div>
      <Button onClick={userSubmit} variant="contained" color="primary">
      Add to the Notice Board
      </Button>
          </div>  
        </Form>   
        </div>
    </div>
    </>
)



}



export default Noticeboard;









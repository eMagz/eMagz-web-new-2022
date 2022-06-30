import React,{useState,useEffect} from 'react'
import './index.css'
import Header from '../Header'
import { Col, Row,  Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BaseUrl} from '../../API';
import swal from '@sweetalert/with-react';
import { useHistory } from 'react-router-dom';

const Attendance=()=>{

    const [selectedValue, setSelectedValue] = useState('N');
    const [classes, setClasses] = useState('');
    const [section,setSection] = useState('');
    const [users, setUsers]=useState([]);
    const[year,setYear]=useState('');
    const[month,setMonth]=useState('');
    const [school_id,setSchool_id]= useState('11');
    const[newdate,setNewdate]=useState("");
    const [resData,setResData]= useState([]);
    const[classdata,setClassdata]=useState([]);
   const[sectiondata,setSectiondata]=useState([])
    const [startDate, setStartDate] = useState(new Date());
    // const [mainData,setMainData]= useState(null)
const educationDetails = JSON.parse(localStorage.getItem('education'));
const history = useHistory();

const getStudentData=()=>{

let users=[]

const data = {
  classes_id: classes,
  section_id: section,
  school_id: educationDetails.data.school_id,
  
}
// console.log('data',data)
axios.post(`${BaseUrl}/getclassstudents`,data).then
(res =>{
  console.log('cc',res)
  const resData = res.data.data;
  resData.forEach(element => {
    users.push({user_id:element._id,attendance:"N"})
  });
  setUsers(users)
  setResData(resData)
} 
  )

  setYear(startDate.getFullYear());
  setMonth(startDate.getMonth())
  
}

// console.log('min',mainData)







const postAttendance=()=>{

 let getdate = "";
 getdate = `${year}-${month+1}`;



 

console.log('pp',getdate);
axios.post(`${BaseUrl}/addattendance`,{users,daymonth:getdate}).then
(res=>{
  console.log('qq',res)
if(res.data.status===true){
  swal(res.data.msg)
}
}
  )
}



function setAttendane(index,attendance){
  let ud=users;
  ud[index].attendance=attendance;
  setUsers(ud);
}

useEffect(()=>{


  axios.get(`${BaseUrl}/viewclasseslist/${educationDetails.data.school_id}`).then
  (res=> {
    setClassdata(res.data.data)
  })
  
  },[])
  


  useEffect(()=>{
    axios.get(`${BaseUrl}/viewsectionlist/${educationDetails.data.school_id}`).then
    (res=> {
      setSectiondata(res.data.data)
    })
    
    },[])
    
    const changeMyPage=()=>{                   
      history.push('/educations/teacher/attendance/view-all')
      }
      
      const changeStudentPage=()=>{                   
          history.push('/educations/teacher/attendance/view-all-student')
          }


return(
    <>
    <div>
    <Header/>
    </div>
    
      <div className='attendance_container' >
        <div  className='attendance_buttons'>
         <div>
         <Button onClick={changeMyPage} variant="contained"
        color="primary"> My Attendance</Button> 
         </div>
         <div>
         <Button onClick={changeStudentPage} variant="contained"
        color="primary">Student Attendance </Button> 
         </div>
        </div>
          <div  className='attendance_card_head'>
          <Form  className='attendance_form' >
         <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for="exampleEmail">Class</Label>
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
        <Col md={3}>
          <FormGroup>
            <Label for="examplePassword">Section</Label>
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
        <Col md={3}>
          <FormGroup>
            <Label for="examplePassword">Date</Label>
            <DatePicker dateFormat={'dd-MM-yyyy'} className='date_picker_attn'  selected={startDate} onChange={date =>{setStartDate(date);console.log(date)}} />
          </FormGroup>
        </Col>
        <Col md={3}>
        
            
            <Button className='attendance_search'
            onClick={getStudentData}
        variant="contained"
        color="primary">
        Search
        <SearchIcon/>
      </Button>
          
       
        </Col>
      </Row>
      
         </Form>
          
    {resData.map((item,index)=>{
    return(
    
        <div className='attendance_list'>
            <div style={{paddingTop:'6px',paddingLeft:'10px'}} >
                {item.roll}
            </div>
           <div style={{paddingTop:'6px'}}>
           {item.name}
           </div>
           
           <div>
           <FormControl component="fieldset">
      
      <RadioGroup row aria-label="position" name="position" defaultValue="N">
        
      <FormControlLabel value="Y" onChange={()=>{setAttendane(index,"Y")}} control={<Radio color="primary" />} label="Present" />{' '}
                                            
        <FormControlLabel value={"N"}  onChange={()=>{setAttendane(index,"N")}} control={<Radio color="primary" />} label="Absent" />
      </RadioGroup>                    
    </FormControl>
           </div>
        </div> 
    )})}
       
        
        <div className='attendance_submit'>
    <Button onClick={postAttendance} variant="contained"
        color="primary">
        Submit Attendance
        </Button> 
    </div>
    </div>
      
     
      </div>
    </>
)



}



export default Attendance;










import React,{useState,useEffect} from 'react';
import './index.css';
import {Form,Row,Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Header from '../../Header';
import axios from 'axios'
import swal from '@sweetalert/with-react';
import {BaseUrl} from '../../../API';



const TeacherTimetable=()=>{

    const [name,SetName]= useState('');
    const [userid,setUserId]= useState('');
    const [subject,setSubject]= useState('');
    const [classes,setClasses] = useState('');
    const [starttime,setStarttime] = useState('');
    const [endtime,setEndtime]= useState('');
    const [day,setDay]=useState('');
    const [section,setSection]= useState('')
    const [resdata,setresdta] = useState([]) 
    const[getsubject,setGetsubject]=useState([]);
    const[classdata,setClassdata]=useState([]);
    const[sectiondata,setSectiondata]=useState([])

    // console.log('aa',leavedata);

const history = useHistory();

const teacherdata = JSON.parse(localStorage.getItem('education'))
const onHandleNameChange=()=>{

SetName(teacherdata.data.name)

}
// const onHandleUseridChange=(e)=>{

//     SetName(e.target.value)
    
//     }
                                
                    
   
                    const showTimetables=()=>{

                        axios.get(`${BaseUrl}/viewtimetable/${teacherdata.data.school_id}`).then
                        (res=>{
                          console.log('qq',res)
                          const resdata = res.data.data;
                          setresdta(resdata);
                        
                        })
                        }                            


    const submitTimetable=()=>{

   const data={
           school_id: teacherdata.data.school_id,
            name: teacherdata.data.name,
            starttime: starttime,
            endtime: endtime,
            day: day,
            subject_id: subject,
            classes_id: classes,
            section_id: section
            
        }
        
        axios.post(`${BaseUrl}/addtimetable`,data)
        .then(res=>{ 
            setresdta(res.data.data)
            if(res.data.status===true){
              swal(
              <h3>{res.data.msg}</h3>
              )
            }else{
          swal(
            <h3>{res.data.msg}</h3>
          )  
            }
        })
        
        showTimetables();
         setDay('')
         setSubject('')
         setClasses('')
         setStarttime('')
         setEndtime('')
         setSection('')
       
        }
        useEffect(()=>{
   
            axios.get(`${BaseUrl}/viewsubjectslist/${teacherdata.data.school_id}`).then
            (res=>{
                setGetsubject(res.data.data)
            })
            
            
            },[]);
            


        useEffect(()=>{
  
  
            axios.get(`${BaseUrl}/viewsectionlist/${teacherdata.data.school_id}`).then
            (res=> {
              setSectiondata(res.data.data)
            })
            
            },[])

            useEffect(()=>{


                axios.get(`${BaseUrl}/viewclasseslist/${teacherdata.data.school_id}`).then
                (res=> {
                  setClassdata(res.data.data)
                })
                
                },[])        





const changeMyPage=()=>{                   
history.push('/educations/teacher/timetable/view-all')
}

const changeStudentPage=()=>{                   
    history.push('/educations/teacher/timetable/view-all-student')
    }

return(
    <>
    <Header/>
    <div className='applytimetable_container' >
        <div className='timetable_buttons'>
         <div>
             <Button onClick={changeMyPage} variant="contained" color="primary">
                 My Timetable
             </Button>
         </div>
         <div>
             <Button onClick={changeStudentPage} variant="contained" color="primary">
                Student Timetable
             </Button>
         </div>
        </div>
        <div className='applytimtable_card' >
             <Form>
             <FormGroup>
              <Label style={{ float: 'left' }} for="exampleEmail"><b>Full Name</b></Label>
              <Input onChange={onHandleNameChange} required value={teacherdata.data.name} type="email" name="email" id="exampleEmail"  />
            </FormGroup>
            <Row form>
                    <Col md={4}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail"><b>Subject</b></Label>
                        <Input 
                        value={subject} 
                        onChange={(e)=>setSubject(e.target.value)}
                        type="select"
                         name="subject" >
                              <option>--select--</option>
                            {getsubject.map(val=>{
                                return(
                                    <option value={val._id}>{val.subject}</option> 
                                )
                            })}
                         </Input>
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="examplePassword"><b>Class</b></Label>
                        <Input value={classes}
                         type="select" name="classes"  
                         onChange={(e)=>setClasses(e.target.value)}
                          >
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
                        <Label style={{float:'left'}} for="examplePassword"><b>Section</b></Label>
                        <Input value={section}
                         type="select" name="section"  
                         onChange={(e)=>setSection(e.target.value)}
                          >
                               <option>--select--</option>
          {sectiondata.map(value=>{
            return(
            <option value={value._id}>{value.section}</option>
            )
          })}
                          </Input>
                     
                    
                    </FormGroup>
                    </Col>
                </Row>
                    <Row form>
                    <Col md={4}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail"><b>From</b></Label>
                        <Input value={starttime}
                        onChange={(e)=>setStarttime(e.target.value)}
                            type="time"
                            name="time"
                            id="exampleTime"
                            
                            />
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="examplePassword"><b>To</b></Label>
                        <Input value={endtime}
                        onChange={(e)=>setEndtime(e.target.value)}
                            type="time"
                            name="time"
                            id="exampleTime"
                           
                            />
                     
                    
                    </FormGroup>
                    </Col>
                    <Col md={4}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail"><b>Day</b></Label>
                        <Input value={day} onChange={(e)=>setDay(e.target.value)} type="select" name="day" >
                        <option>--select--</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednusday</option>
          <option>Thrusday</option>
          <option>Friday</option>
          <option>Saturday</option>
         
        </Input>
                    </FormGroup>
                    </Col>
                </Row>
                
                   
                 
                 <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
      <Button onClick={submitTimetable}  variant="contained" color="primary">
     <b>Add Timetable</b>
      </Button>
      
          </div>  
             </Form>
        </div>
    </div>
    </>
)




}


export default TeacherTimetable;

























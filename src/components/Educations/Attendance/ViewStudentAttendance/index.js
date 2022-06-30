
import React, { useState,useEffect } from 'react'
import './index.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Header from '../../Header';
import {Button,Row,Col,Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import {BaseUrl} from '../../../API'
import { SettingsSystemDaydream } from '@material-ui/icons';
import {useHistory, usHistory} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const StudentAttendance = () => {

const[month,setMonth]=useState('');
const[year,setYear]=useState('');
const[resdata,setresdata]= useState([]);
const[classes,setClasses]=useState('');
const[section,setSection]=useState('');
const[classdata,setClassdata]=useState([]);
const[sectiondata,setSectiondata]=useState([]);
const[name,setName]=useState('');
const[namedata,setNamedata]=useState([]);
const[searchdata,setSearchdata]=useState([]);
// const[year,setYear]=useState('');
// const[month,setMonth]=useState('');
const history=useHistory();
const userdata= JSON.parse(localStorage.getItem('education'));
    function handleSelect(selectedInfo){
        //alert(selectedInfo.startStr)

        console.log("working!!",selectedInfo)
    }

const getAttendanceData=()=>{


axios.get(`http://api.emagz.live/v1.0/viewattendance/${userdata.data.user_id}/${year}-${month}`).then
(res=> {
  console.log('ss',res.data.data[0])
  // let atn=res.data.data[0]

//   setresdata(res.data.data[0])
})

}

useEffect(()=>{
  
  
  axios.get(`${BaseUrl}/viewsectionlist/${userdata.data.school_id}`).then
  (res=> {
    setSectiondata(res.data.data)
  })
  
  },[])

  useEffect(()=>{


      axios.get(`${BaseUrl}/viewclasseslist/${userdata.data.school_id}`).then
      (res=> {
        setClassdata(res.data.data)
      })
      
      },[]) 

      useEffect(()=>{


        getStudentname();
        
        },[classes,section]) 

const getStudentname=()=>{
  const body={
    classes_id: classes,
    section_id: section,
    school_id: userdata.data.school_id

  }


    axios.post(`${BaseUrl}/getclassstudents`,body).then
    (res=> {
    //  console.log('ww',res.data.data)
     setNamedata(res.data.data)
    })
}

const searchAttendance=()=>{


axios.get(`${BaseUrl}/viewattendance/${name}/${year}-${month}`).then(
  res=> {
    console.log('zz',res)
    setSearchdata(res.data.data[0]);
    let atn = res.data.data[0]
    setSearchdata([
  { title: atn.day1, date: atn.daymonth + "-01",color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day2, date: atn.daymonth + "-02",color:atn.day2=="N"?"#f00":"#0f0" },
  { title: atn.day3, date: atn.daymonth + "-03",color:atn.day3=="N"?"#f00":"#0f0" },
  { title: atn.day4, date: atn.daymonth + "-04",color:atn.day4=="N"?"#f00":"#0f0" },
  { title: atn.day5, date: atn.daymonth + "-05",color:atn.day5=="N"?"#f00":"#0f0" },
  { title: atn.day6, date: atn.daymonth + "-06",color:atn.day6=="N"?"#f00":"#0f0" },
  { title: atn.day7, date: atn.daymonth + "-07",color:atn.day7=="N"?"#f00":"#0f0" },
  { title: atn.day8, date:atn.daymonth + "-08",color:atn.day8=="N"?"#f00":"#0f0" },
  { title: atn.day9, date: atn.daymonth + "-09",color:atn.day9=="N"?"#f00":"#0f0" },
  { title: atn.day10, date: atn.daymonth + "-10",color:atn.day10=="N"?"#f00":"#0f0" },
  { title: atn.day11, date: atn.daymonth + "-11",color:atn.day11=="N"?"#f00":"#0f0" },
  { title: atn.day12, date: atn.daymonth + "-12",color:atn.day12=="N"?"#f00":"#0f0" },
  { title: atn.day13, date: atn.daymonth + "-13",color:atn.day13=="N"?"#f00":"#0f0" },
  { title: atn.day14, date: atn.daymonth + "-14",color:atn.day14=="N"?"#f00":"#0f0" },
  { title: atn.day15, date: atn.daymonth + "-15",color:atn.day15=="N"?"#f00":"#0f0" },
  { title: atn.day16, date: atn.daymonth + "-16",color:atn.day16=="N"?"#f00":"#0f0" },
  { title: atn.day17, date: atn.daymonth + "-17",color:atn.day17=="N"?"#f00":"#0f0" },
  { title: atn.day18, date: atn.daymonth + "-18",color:atn.day18=="N"?"#f00":"#0f0" },
  { title: atn.day19, date: atn.daymonth + "-19",color:atn.day19=="N"?"#f00":"#0f0" },
  { title: atn.day20, date: atn.daymonth + "-20",color:atn.day20=="N"?"#f00":"#0f0" },
  { title: atn.day21, date: atn.daymonth + "-21",color:atn.day21=="N"?"#f00":"#0f0" },
  { title: atn.day22, date: atn.daymonth + "-22",color:atn.day22=="N"?"#f00":"#0f0" },
  { title: atn.day23, date: atn.daymonth + "-23",color:atn.day23=="N"?"#f00":"#0f0" },
  { title: atn.day24, date: atn.daymonth + "-24",color:atn.day24=="N"?"#f00":"#0f0" },
  { title: atn.day25, date: atn.daymonth + "-25",color:atn.day25=="N"?"#f00":"#0f0" },
  { title: atn.day26, date: atn.daymonth + "-26",color:atn.day26=="N"?"#f00":"#0f0" },
  { title: atn.day27, date: atn.daymonth + "-27",color:atn.day27=="N"?"#f00":"#0f0" },
  { title: atn.day28, date: atn.daymonth + "-28",color:atn.day28=="N"?"#f00":"#0f0" },
  { title: atn.day29, date: atn.daymonth + "-29",color:atn.day29=="N"?"#f00":"#0f0" },
  { title: atn.day30, date: atn.daymonth + "-30",color:atn.day30=="N"?"#f00":"#0f0" },
  { title: atn.day31, date: atn.daymonth + "-31",color:atn.day31=="N"?"#f00":"#0f0" },

 ])


  }
)

}





    return (<>
        <Header />
        <div className='viewform_data'>    
        <Form  className='viewattendance_form'>
         <Row form>
        <Col md={2}>
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
        <Col md={2}>
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
        <Col md={2}>
          <FormGroup>
            <Label>Students Name</Label>
            <Input required value={name} onChange={(e)=>setName(e.target.value)} type="select" name="name" >
        <option>--select--</option>
          {namedata.map(value=>{
            // console.log('gg',value)
            return(
            <option value={value.user_id}>{value.name}</option>
            )
          })}
        </Input>
          </FormGroup>
        </Col>
        <Col md={2}>
        <FormGroup>
        <Label for="exampleSelect">Year</Label>
        <Input onChange={(e)=> setYear(e.target.value)} required value={year} type="select" name="select" id="exampleSelect">
          <option>--select--</option>
          <option>2019</option>
          <option>2018</option>    
          <option>2017</option>
          <option>2020</option>
        </Input>
      </FormGroup>
        </Col>
        <Col md={2}>
        <FormGroup>
        <Label for="exampleSelect">Month</Label>
        <Input required value={month} onChange={(e)=> setMonth(e.target.value)} type="select" name="select" id="exampleSelect">
          <option>--select--</option>
          <option>12</option>
          <option>9</option>
          <option>11</option>
          <option>2</option>
        </Input>
      </FormGroup>
        </Col>
        <Col md={2}>
        
            
            <Button className='attendance_search'
           onClick={searchAttendance}
        variant="contained"
        color="primary">
        Search
        <SearchIcon/>
      </Button>
          
       
        </Col>
      </Row>
      
         </Form>

        </div>
        <div className="fullCalendar ">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                selectable={true}
                selectMirror={true}
                selectOverlap={false}
                select={handleSelect}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                events={
                
searchdata

                }
            />
        </div>
    </>)
}

export default StudentAttendance;





















// setresdata([
//   { title: atn.day1, date: `${year}-${month}-01`,color:"#f00" },
//   { title: atn.day2, date: `${year}-${month}-02`,color:"#0f0" },
//   { title: atn.day3, date: `${year}-${month}-03`,color:"#00f" },
//   { title: atn.day4, date: `${year}-${month}-04`,color:"#00f" },
//   { title: atn.day5, date: `${year}-${month}-05`,color:"#00f" },
//   { title: atn.day6, date: `${year}-${month}-06`,color:"#00f" },
//   { title: atn.day7, date: `${year}-${month}-07`,color:"#00f" },
//   { title: atn.day8, date: `${year}-${month}-08`,color:"#00f" },
//   { title: atn.day9, date: `${year}-${month}-09`,color:"#00f" },
//   { title: atn.day10, date: `${year}-${month}-10`,color:"#00f" },
//   { title: atn.day11, date: `${year}-${month}-11`,color:"#00f" },
//   { title: atn.day12, date: `${year}-${month}-12`,color:"#00f" },
//   { title: atn.day13, date: `${year}-${month}-13`,color:"#00f" },
//   { title: atn.day14, date: `${year}-${month}-14`,color:"#00f" },
//   { title: atn.day15, date: `${year}-${month}-15`,color:"#00f" },
//   { title: atn.day16, date: `${year}-${month}-16`,color:"#00f" },
//   { title: atn.day17, date: `${year}-${month}-17`,color:"#00f" },
//   { title: atn.day18, date: `${year}-${month}-18`,color:"#00f" },
//   { title: atn.day19, date: `${year}-${month}-19`,color:"#00f" },
// ])
















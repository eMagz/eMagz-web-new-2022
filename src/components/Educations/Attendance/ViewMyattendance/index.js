
import React, { useEffect, useState } from 'react'
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

const MytAttendance = () => {

const[month,setMonth]=useState('');
const[year,setYear]=useState('');
const[resdata,setresdata]= useState([]);
const[getdata,setGetdata]=useState([])

const userdata= JSON.parse(localStorage.getItem('education'));
    function handleSelect(selectedInfo){
        //alert(selectedInfo.startStr)

        console.log("working!!",selectedInfo)
    }

const getAttendanceData=()=>{


axios.get(`${BaseUrl}/viewattendance/${userdata.data.user_id}/${year}-${month}`).then
(res=> {
if(res.data.status){
let atn = res.data.data[0]
setresdata([
  { title: atn.day1, date: atn.daymonth + "-01",color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day2, date: atn.daymonth + "-02",color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day3, date: `${year}-${month}-03`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day4, date: `${year}-${month}-04`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day5, date: `${year}-${month}-05`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day6, date: `${year}-${month}-06`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day7, date: `${year}-${month}-07`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day8, date: `${year}-${month}-08`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day9, date: `${year}-${month}-09`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day10, date: `${year}-${month}-10`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day11, date: `${year}-${month}-11`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day12, date: `${year}-${month}-12`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day13, date: `${year}-${month}-13`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day14, date: `${year}-${month}-14`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day15, date: `${year}-${month}-15`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day16, date: `${year}-${month}-16`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day17, date: `${year}-${month}-17`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day18, date: `${year}-${month}-18`,color:atn.day1=="N"?"#f00":"#0f0" },
  { title: atn.day19, date: `${year}-${month}-19`,color:atn.day1=="N"?"#f00":"#0f0" },
 ])
  }else{
    setresdata([]); 
}





})

}

// useEffect(()=>{
//     getAttendanceData()
// },[])

console.log('aa',resdata)


    return (<>
        <Header />
        <div className='form_data' >
        <Form>
      <Row form>
        <Col md={4}>
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
        <Col md={4}>
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
        <Col md={4}>
        <Button style={{transform:'translateY(33px)'}} onClick={getAttendanceData} >Submit</Button>
        </Col>
      </Row>
      
      </Form>
{console.log(resdata)}
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
                events={resdata}
            />
        </div>
    </>)
}

export default MytAttendance;





















// setresdata([
//   { title: atn.day1, date: `${year}-${month}-01`,color:"#f00" },
//   { title: atn.day2, date: `${year}-${month}-02`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day3, date: `${year}-${month}-03`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day4, date: `${year}-${month}-04`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day5, date: `${year}-${month}-05`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day6, date: `${year}-${month}-06`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day7, date: `${year}-${month}-07`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day8, date: `${year}-${month}-08`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day9, date: `${year}-${month}-09`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day10, date: `${year}-${month}-10`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day11, date: `${year}-${month}-11`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day12, date: `${year}-${month}-12`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day13, date: `${year}-${month}-13`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day14, date: `${year}-${month}-14`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day15, date: `${year}-${month}-15`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day16, date: `${year}-${month}-16`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day17, date: `${year}-${month}-17`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day18, date: `${year}-${month}-18`,color:atn.day1=="N"?"#f00":"#0f0" },
//   { title: atn.day19, date: `${year}-${month}-19`,color:atn.day1=="N"?"#f00":"#0f0" },
// ])



// { title: atn.day1, date: atn.daymonth + "-01",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day2, date: atn.daymonth + "-02",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day3, date: atn.daymonth + "-03",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day4, date: atn.daymonth + "-04",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day5, date: atn.daymonth + "-05",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day6, date: atn.daymonth + "-06",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day7, date: atn.daymonth + "-07",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day8, date: atn.daymonth + "-08",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day9, date: atn.daymonth + "-09",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day10, date: atn.daymonth + "-10",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day11, date: atn.daymonth + "-11",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day12, date: atn.daymonth + "-12",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day13, date: atn.daymonth + "-13",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day14, date: atn.daymonth + "-14",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day15, date: atn.daymonth + "-15",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day16, date: atn.daymonth + "-16",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day17, date: atn.daymonth + "-17",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day18, date: atn.daymonth + "-18",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-19",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-20",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-21",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-22",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-23",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-24",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-25",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-26",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-27",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-28",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-29",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-30",color:atn.day1=="N"?"#f00":"#0f0" },
// { title: atn.day19, date: atn.daymonth + "-31",color:atn.day1=="N"?"#f00":"#0f0" },












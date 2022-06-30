import React,{useEffect,useState} from 'react'
import './index.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Header from '../Header';
import axios from 'axios';
import {BaseUrl} from '../../API';
import { formatDate } from '@fullcalendar/react';



const TimeTable = () => {


const[getdata,setGetdata]=useState([])

const timetabledata=JSON.parse(localStorage.getItem('education'));


// var calendar = new Calendar(calendarEl, {
//   titleFormat: { // will produce something like "Tuesday, September 18, 2018"
//     month: 'long',
//     year: 'numeric',
//     day: 'numeric',
//     weekday: 'long'
//   }
// })
let str = formatDate(new Date(), {
    year: 'numeric',
    month: 'long',
    weekday: 'long'
  });
  
  console.log(str);


    function handleSelect(selectedInfo){
        //alert(selectedInfo.startStr)

        console.log("working!!",selectedInfo)
    }
const daystartone = 'Monday';
const daystarttwo = 'Tuesday';
const daystartthree = 'Wednusday';
const daystartfour = 'Thrusday';
const daystartfive = 'Friday';
const daystartsix = 'Saturday';
const daystartseven = 'Sunday';

const datestart = 2;



// let storedata=getdata.forEach((data)=>{
//    if(data.day===daystartsix){
//        dateonearr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);
       
//     //    datetwoarr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);
//     //    datethreearr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);
//     //    datefourarr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);
//     //    datefivearr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);
//     //    datesixarr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);
//     //    datesevenarr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);
// //    console.log('date',dateonearr)
   
// //    }if(data.day===daystartseven){
// //     datesevenarr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);
// //     console.log('date',datesevenarr)
// //    }else if(data.day===daystartthree){
// //     datethreearr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);  
// //    }else if(data.day===daystartfour){
// //     datefourarr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);  
// //    }else if(data.day===daystartfive){
// //     datefivearr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);
// //    }else if(data.day===daystartsix){
// //     datesixarr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);
// //     console.log('date6',datesixarr)
// //    }if(data.day===daystarttwo){
//     // datetwoarr.push(datestart,datestart + 7,datestart+14,datestart+21,datestart+28);
//     // console.log('date7',datesevenarr)
//    }
//    return dateonearr;
// }

// )




useEffect(()=>{

axios.get(`${BaseUrl}/viewtimetable/${timetabledata.data.school_id}/${timetabledata.data.classes_id}/${timetabledata.data.section_id}`).then(
    res=> {
        console.log('ss',res.data.data)
        setGetdata(res.data.data);
    }
)

},[])


// console.log('aa',storedata);


    return (<>
        <Header />
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
                
                events={[
                    
                     { title: getdata.map(val=>{
                         if(val.day==='Saturday'){
                            return(
                                `${val.subject}`
                            )
                         }

                         
                     })
                     
                     ,daysOfWeek:
                     getdata.map((val)=>{
                         if(val.day==='Saturday'){
                             return [6]
                         }
                     })},
                     { title: getdata.map(val=>{
                        if(val.day==='Friday'){
                           return(
                               `${val.subject}`
                           )
                        }

                        
                    }),daysOfWeek:
                    getdata.map((val)=>{
                        if(val.day==='Friday'){
                            return [5]
                        }
                    })},
                    { title: getdata.map(val=>{
                        if(val.day==='Thursday'){
                           return(
                               `${val.subject}`
                               
                           )
                        }

                        
                    }),daysOfWeek:
                    getdata.map((val)=>{
                        if(val.day==='Thursday'){
                            return [4]
                        }
                    })},
                    { title: getdata.map(val=>{
                        if(val.day==='Wednesday'){
                           return(
                               `${val.subject}`
                           )
                        }

                        
                    }),daysOfWeek:
                    getdata.map((val)=>{
                        if(val.day==='Wednesday'){
                            return [3]
                        }
                    })},
                    { title: getdata.map(val=>{
                        if(val.day==='Tuesday'){
                           return(
                               `${val.subject}`
                           )
                        }

                        
                    }),daysOfWeek:
                    getdata.map((val)=>{
                        if(val.day==='Tuesday'){
                            return [2]
                        }
                    })},
                    { title: getdata.map(val=>{
                        if(val.day==='Monday'){
                           return(
                               `${val.subject}`
                           )
                        }

                        
                    }),daysOfWeek:
                    getdata.map((val)=>{
                        if(val.day==='Monday'){
                            return [1]
                        }
                    })},
                    { title: getdata.map(time=>{
                        if(time.day==='Saturday'){
                           return(
                               ` ${time.starttime} to ${time.endtime}`
                           )
                        }

                        
                    })
                    
                    ,daysOfWeek:
                    getdata.map((time)=>{
                        if(time.day==='Saturday'){
                            return [6]
                        }
                    })},
                    { title: getdata.map(time=>{
                        if(time.day==='Friday'){
                           return(
                               ` ${time.starttime} to ${time.endtime}`
                           )
                        }

                        
                    })
                    
                    ,daysOfWeek:
                    getdata.map((time)=>{
                        if(time.day==='Friday'){
                            return [5]
                        }
                    })},
                    { title: getdata.map(time=>{
                        if(time.day==='Thursday'){
                           return(
                               ` ${time.starttime} to ${time.endtime}`
                           )
                        }

                        
                    })
                    
                    ,daysOfWeek:
                    getdata.map((time)=>{
                        if(time.day==='Thursday'){
                            return [4]
                        }
                    })},
                    { title: getdata.map(time=>{
                        if(time.day==='Wednesday'){
                           return(
                               ` ${time.starttime} to ${time.endtime}`
                           )
                        }

                        
                    })
                    
                    ,daysOfWeek:
                    getdata.map((time)=>{
                        if(time.day==='Wednesday'){
                            return [3]
                        }
                    })},
                    { title: getdata.map(time=>{
                        if(time.day==='Tuesday'){
                           return(
                               ` ${time.starttime} to ${time.endtime}`
                           )
                        }

                        
                    })
                    
                    ,daysOfWeek:
                    getdata.map((time)=>{
                        if(time.day==='Tuesday'){
                            return [2]
                        }
                    })},
                    { title: getdata.map(time=>{
                        if(time.day==='Monday'){
                           return(
                               ` ${time.starttime} to ${time.endtime}`
                           )
                        }

                        
                    })
                    
                    ,daysOfWeek:
                    getdata.map((time)=>{
                        if(time.day==='Monday'){
                            return [1]
                        }
                    })},
                    
                    
                ]}
            />
        </div>
    </>)
}

export default TimeTable;
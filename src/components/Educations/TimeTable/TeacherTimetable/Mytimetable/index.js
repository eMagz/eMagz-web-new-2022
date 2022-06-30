
import React, { useState,useEffect } from 'react'
import './index.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Header from '../../../Header';
import {Button,Row,Col,Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import {BaseUrl} from '../../../../API'
import { SettingsSystemDaydream } from '@material-ui/icons';


const MyTimetable = () => {

const[month,setMonth]=useState('');
const[year,setYear]=useState('');
const[resdata,setresdata]= useState([]);
const[classdata,setClassdata]=useState([]);
const[sectiondata,setSectiondata]=useState([]);
const [classes,setClasses] = useState('');
const [section,setSection] = useState('');
const[getdata,setGetdata]=useState([]);
const[subdata,setSubdata]=useState([]);

const teacherdata = JSON.parse(localStorage.getItem('education'))
    function handleSelect(selectedInfo){
        //alert(selectedInfo.startStr)

        console.log("working!!",selectedInfo)
    }

const getTimetableData=()=>{


   



axios.get(`${BaseUrl}/view-teacher-subjects/${teacherdata.data.user_id}`).then
(res=> {
  console.log('ss',res)
  setGetdata(res.data.data)
  
})

}

useEffect(()=>{
    getTimetableData()  
},[])

        



    return (
    <>
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
                        console.log('rr',val)
                        if(val.day==='Saturday'){
                           return(
                               `${val.subject[0].subject}`
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
                              `${val.subject[0].subject}`
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
                              `${val.subject[0].subject}`
                              
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
                              `${val.subject[0].subject}`
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
                              `${val.subject[0].subject}`
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
                              `${val.subject[0].subject}`
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
                   { title: getdata.map(val=>{
                    if(val.day==='Saturday'){
                       return(
                           `class: ${val.class[0].classes} section: ${val.section[0].section}`
                       )
                    }

                    
                })
                
                ,daysOfWeek:
                getdata.map((time)=>{
                    if(time.day==='Saturday'){
                        return [6]
                    }
                })},
                { title: getdata.map(val=>{
                    if(val.day==='Friday'){
                       return(
                           ` class: ${val.class[0].classes} section: ${val.section[0].section}`
                       )
                    }

                    
                })
                
                ,daysOfWeek:
                getdata.map((time)=>{
                    if(time.day==='Friday'){
                        return [5]
                    }
                })},
                { title: getdata.map(val=>{
                    if(val.day==='Thursday'){
                       return(
                           ` class: ${val.class[0].classes} section: ${val.section[0].section}`
                       )
                    }

                    
                })
                
                ,daysOfWeek:
                getdata.map((time)=>{
                    if(time.day==='Thursday'){
                        return [4]
                    }
                })},
                { title: getdata.map(val=>{
                    if(val.day==='Wednesday'){
                       return(
                           ` class: ${val.class[0].classes} section: ${val.section[0].section}`
                       )
                    }

                    
                })
                
                ,daysOfWeek:
                getdata.map((time)=>{
                    if(time.day==='Wednesday'){
                        return [3]
                    }
                })},
                { title: getdata.map(val=>{
                    if(val.day==='Tuesday'){
                       return(
                           ` class: ${val.class[0].classes} section: ${val.section[0].section}`
                       )
                    }

                    
                })
                
                ,daysOfWeek:
                getdata.map((time)=>{
                    if(time.day==='Tuesday'){
                        return [2]
                    }
                })},
                { title: getdata.map(val=>{
                    if(val.day==='Monday'){
                       return(
                           `class: ${val.class[0].classes} section: ${val.section[0].section}`
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

export default MyTimetable;





















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
















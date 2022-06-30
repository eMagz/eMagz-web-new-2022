import React, { useEffect, useState } from 'react';
import './index.css';
import Headers from '../../Header';
import { Table } from 'reactstrap';
import Axios from 'axios';
import {BaseUrl} from '../../../API';


const AcademicView=(props)=>{

const[getsubject,setGetSubject]=useState([]);
const[getmarks,setGetMarks]=useState([])



// console.log('ss',props)


useEffect(()=>{
getSubject();
getAcademicMarks();
},[])


const getSubject=()=>{

Axios.get(`${BaseUrl}/view-subjects/${props.location.state.AcademicReportId}`).then(
    res=> {
      // console.log('dd',res.data.data)
        setGetSubject(res.data.data);
        
    }
)

}

const getAcademicMarks=()=>{

Axios.get(`${BaseUrl}/viewacademicreportmarks/${props.location.state.user_id}/${props.location.state.AcademicReportId}`).then(
  res=> {
    setGetMarks(res.data.data);
  }
)

}





return(
    <>
    <Headers/>
     <div className='academic_container' >
       <div className='academic_section' >
          <div  className='academic_name'>
              <div style={{fontWeight:'bold'}}>Name:</div>
              <div style={{paddingLeft:'10px'}}>{props.location.state.name}</div>
          </div>
          {/* <div  className='academic_name'>
              <div style={{fontWeight:'bold'}}>Obtained Marks:</div>
              <div style={{paddingLeft:'10px'}}>{props.location.state.obtainedmarks}</div>
          </div> */}
          <div  className='academic_name'>
              <div style={{fontWeight:'bold'}}>Total Marks:</div>
              <div style={{paddingLeft:'10px'}}>{props.location.state.totalmarks}</div>
          </div>
          <div  className='academic_name'>
              <div style={{fontWeight:'bold'}}>Year:</div>
              <div style={{paddingLeft:'10px'}}>{props.location.state.year}</div>
          </div>
       </div>
       <div className='academic_table' >
       <Table >
      <thead>
      <tr>
      {getsubject.map(val=>{
            //  console.log('xx',val)
       
         
             return(
              
                <th>{val.subject[0].subject}</th>
               
             )
         })}
          </tr>
      </thead>
      <tbody>
        <tr>
         {getmarks.map(val=>{
          //  console.log('xy',val)
           return(
            <th>{val.obtainedmarks}</th>
           )
         })}
          
          
        </tr>
       
      </tbody>
    </Table>
        </div>
     </div>    

    </>
)


}


export default AcademicView;

















import React,{useState,useEffect} from 'react'
import './index.css';
import { useHistory } from 'react-router-dom';
import Header from '../../Header/index';
import axios from 'axios';
import {BaseUrl} from '../../../API'

const Testlanding=(props)=>{

const history = useHistory();
const[resdata,setResdata]=useState([]);
const testdata = JSON.parse(localStorage.getItem('education'))
const [data,setData]=useState({});

console.log('dd',props)

const response=()=>{
    axios.get(`${BaseUrl}/showtests/${testdata.data.school_id}`).then
    (res=> {
      console.log('zz',res.status)
      setResdata(res.data)
      if(res.data.status===true){
        history.push('/educations/take-a-test/online-test',res.data)
    }
    })
   
}

const change=()=>{
   
    history.push('/educations/take-a-test/online-test',data) 
}



return(
    <>
    <Header/>
    <div className='landing_container' >
       <div  className='landing_header' >
           <div className='landing_text_head' >
                 Test
           </div>
          
        </div> 
        <div className='landing_text_body' >
             Steps for accessing Your Exam Online: <br/>
             <br/>
            
             Choose all programs, including Email. <br/>
             Click on the Click Here to open the exam link provided in email from the college. <br/>
             Click "Login for Your Exam Here" at the bottom of the screen. <br/>
             Have Your Proctor enter the Username and Password provided in the email from the college and Click Enter  <br/>
             To begin the exam, click on the link to the appropriate exam listed under online assessments.<br/>
             Time Duration 2 hrs.
           </div> 

        <div className='bottom_Landing_bottom'  ><button onClick={change}  className='landing_btn landing_btn1'> Take a Test </button></div>

    </div>
    </>
)


}


export default Testlanding;











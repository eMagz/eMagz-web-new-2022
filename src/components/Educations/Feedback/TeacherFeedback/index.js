import React,{useState} from 'react';
import './index.css';
import Header from '../../Header';
import axios from 'axios';
import {BaseUrl} from '../../../API';
import swal from '@sweetalert/with-react'


const Feedback = () => {


    const teacherdata= JSON.parse(localStorage.getItem('education'));
    const[subject,setSubject]=useState('');
    const[feedback,setFeedback]=useState('');



    const onHandleSubjectChange=(e)=>{
        setSubject(e.target.value)
    }

    const onHandleFeedbackChange=(e)=>{
        setFeedback(e.target.value)
    }



    const submitDetails=(e)=>{
        e.preventDefault();

const data={
    subject: subject,
    feedback: feedback,
    school_id: teacherdata.data.school_id,
    user_id: teacherdata.data.user_id
}


        axios.post(`${BaseUrl}/feedback`,data).then((res)=>{
            if(res.data.status===true){
                swal(
                <h3>{res.data.msg}</h3>
                )
            }else{
                swal(
                    <h3>{res.data.msg}</h3>
                    )  
            }
               setFeedback("")
               setSubject("")
           })
       }



    return (
        <>
        <Header/>
            <div className='feed_container' >
                <form  onSubmit={submitDetails} >
                <div className='feed_subject'  >
                    <div className='subject'>Subject</div>
                    <input value={subject}  onChange={onHandleSubjectChange}  className='feed_inputarea' />
                </div>
                <div className='feed_detail' >
                    <div className='details'  >Details</div>
                    <textarea value={feedback} onChange={onHandleFeedbackChange} className='feed_area'  >

                    </textarea>
                </div>
                <button type='submit'  className='feed_btn'  >
                    Submit
     </button>
                </form>
               
            </div>
        </>
    )


}



export default Feedback;






import React from 'react';

import './index.css';
import Header from '../../../../Educations/Header';


export default function ViewStudentList() {
  

  return (
    <>
      <Header/>
    <div className='viewstudent_container' >
      <div  className='viewstudent_card'>
         <div className='viewStudent_list' >
            <div className='student' >
                <div className='student_lebel'>Student Name: </div>
                <div className='student_name'>Debanjan Goswami</div>
            </div>
            <hr/>
            <div className='student' >
                <div className='student_lebel'>Date: </div>
                <div className='student_name'>11/12/2020</div>
            </div>
            <hr/>
            <div className='student' >
                <div className='student_lebel'>Student Class: </div>
                <div className='student_name'>Six</div>
            </div>
            <hr/>
            <div className='student' >
                <div className='student_lebel'>Student Section: </div>
                <div className='student_name'>a</div>
            </div>
            <hr/>
            <div className='student_description_lebel' >
                <div className='student_lebel'>Description : </div>
                <div className='student_description'>We have holiday from 21th december.</div>
            </div>
            
         </div>
      </div>
      </div>
    </>
    
     

   
  );
}

import React, { useState,useEffect } from 'react';
import './testcards.css';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import { BaseUrl } from '../../../API';

const TestCards = () => {

const testdata = JSON.parse(localStorage.getItem('education'))

  const [state, setState] = useState({
    checkedA: true,

  });
const[resdata,setResdata]=useState([]);


const history = useHistory();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


const showTest=()=>{

Axios.get(`${BaseUrl}/showtests/${testdata.data.school_id}`).then
(res=> console.log('tt',res))



}

useEffect(()=>{
showTest();
},[])



const changeMainpage=()=>{


history.push('/educations/test-details/main-page')


}



  return (
    <>
      <div className='testCard_container' >
        {resdata.map(test=>{
          return(
       
            <div className='testcards' >
            <div className='card_top' >
            
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                />
              </FormGroup>
          <div style={{ fontWeight: 'bold', margin: '10px 2px 0px 0px', fontSize: '1rem' }} >{test.testtype}</div>
              <div style={{ flex: 1 }} />
              <div style={{ margin: '8px 8px 0px 0px' }} >
          <button className='cardbtn cardbtn1' >{test.subject}</button>
              </div>
            </div>
            <div className='card_content' >
              <div style={{ fontSize: '0.8rem', color: 'gray', }} >
                Duration
                  <div style={{ fontSize: '0.7rem', color: 'black' }} >
                {test.duration}
                  </div>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ fontSize: '0.8rem', color: 'gray', }}>
                Marks
                   <div style={{ fontSize: '0.7rem', color: 'black' }}>
                  {test.marks}
                   </div>
              </div>
  
            </div>
  
            <div className='bottom_line'>
              Cycle: April | Session: 2018-19
              </div>
            <div className='taketest_buttn' >
              <button  className='cardbtn cardbtn1' >Take Test</button>
            </div>
          </div>
          )
        })}
      </div>
    </>
  )



}


export default TestCards;










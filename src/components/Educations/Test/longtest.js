import React,{useState,useEffect} from 'react';
import './longtest.css';



const Longtest=()=>{

const[textword,setTextWord]=useState('');
const[hour,setHour]=useState(3);
const[minute,setMinute]=useState(0);
const[second,setSecond]=useState(0);
const[countword,setCountWord] = useState(0);


const handleTextAreaChange=(e)=>{

console.log('tt',textword)

setTextWord(e.target.value);

}



// useEffect(
//     ()=>{
//     setHour(hour - 1);    
//     }
// )




return(
    <>
    <div  className='longtest_container' >
       
   <div  className='ques_header' >
      
  <div  style={{paddingTop: '6px'}} >
   S1521554
  </div>
  <div   className='test_head' >
   TEST 1
  </div>
  <div  style={{paddingTop: '6px'}}>
  0{hour}:{minute}:{second}
  </div>
   </div>
      <div className='marks_zone' >
        Marks 5
      </div>
      <div  className='question_zone' >
          1.Ordinary table salt is Sodium Chloride. What is Baking soda?
      </div>
      <div className='long_ans'  >
        <textarea value={textword}  onChange={handleTextAreaChange} />
        
        
      </div>
      <div className='word_count' >
{textword.length}/300
      </div>
    </div>
    </>
)


}


export default Longtest;

















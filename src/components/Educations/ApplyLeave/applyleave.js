
import React,{useState} from 'react';
import './applyleave.css';
import {Form,Row,Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios'
import swal from '@sweetalert/with-react';
import {BaseUrl} from '../../API';



const ApplyLeave=()=>{

    const [name,SetName]= useState('');
    const [userid,setUserId]= useState('');
    const [leavestart,setStartdate]= useState('');
    const [leaveend,setEnddate] = useState('');
    const [leavetype,setLeaveType] = useState('');
    const [reason,setReason]= useState('')
    const [resdata,setresdta] = useState([]) 
    const leavedata = JSON.parse( localStorage.getItem('education'))

    console.log('aa',leavedata);


const onHandleNameChange=()=>{

SetName(leavedata.data.name)

}
// const onHandleUseridChange=(e)=>{

//     SetName(e.target.value)
    
//     }
    const onHandlestartdateChange=(e)=>{

        setStartdate(e.target.value)
        
        }
        const onHandleenddateChange=(e)=>{

            setEnddate(e.target.value)
            
            }
            const onHandleleavetypeChange=(e)=>{

                setLeaveType(e.target.value)
                
                }
                const onHandleReasonChange=(e)=>{

                    setReason(e.target.value)
                    
                    }
                                                
                    
   
                    const showLeaves=()=>{

                        axios.get(`${BaseUrl}/viewstudentleaves/${leavedata.data.user_id}/${leavedata.data.school_id}`).then
                        (res=>{
                          console.log('qq',res)
                          const resdata = res.data.data;
                          setresdta(resdata);
                        
                        })
                        }                            







    const submitLeave=()=>{

   const data={
           school_id: leavedata.data.school_id,
           user_id: leavedata.data.user_id,
            name: leavedata.data.name,
            leavestart: leavestart,
            leaveend: leaveend,
            leavetype: leavetype,
            reason: reason,
            classes: leavedata.data.classes,
            section: leavedata.data.section
            
        }
        
        axios.post('http://api.emagz.live/v1.0/applystudentleave',data)
        .then(res=>{ 
            if(res.data.status===true){
              swal(
              <h3>{res.data.msg}</h3>
              )
            }else{
          swal(
            <h3>{res.data.msg}</h3>
          )  
            }
        })
        
        showLeaves();
        changePage();  
        
        }
        




const history = useHistory(); 

const changePage=()=>{                   
history.push('/educations/apply-a-leave/view-all',resdata)
}


return(

    <>
    <Header/>
    <div className='applyleave_container' >
        <div className='applyleave_card' >
             <Form>
             <FormGroup>
              <Label style={{ float: 'left' }} for="exampleEmail"><b>Full Name</b></Label>
              <Input onChange={onHandleNameChange} required value={leavedata.data.name} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
            </FormGroup>
                 <FormGroup>
                 <Label style={{float:'left'}} for="exampleEmail"><b>Type of Leaves</b></Label>
                 <Input onChange={onHandleleavetypeChange} required value={leavetype} type="select" name="select" id="exampleSelect">
                        <option>--Select--</option>
                        <option>Sick Leave</option>
                        <option>Conditional Leave</option>
                        <option>Optional Leave</option>
                        
                    </Input>
                    </FormGroup>
                    <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail"><b>From</b></Label>
                        <Input onChange={onHandlestartdateChange}   required value={leavestart}
                            type="date"
                            name="startdate"
                            id="exampleDate"
                            placeholder="date placeholder"
                            />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="examplePassword"><b>To</b></Label>
                        <Input onChange={onHandleenddateChange}   required value={leaveend}
                            type="date"
                            name="enddate"
                            id="exampleDate"
                            placeholder="date placeholder"
                            />
                     
                    
                    </FormGroup>
                    </Col>
                </Row>
                    <FormGroup>
                        <Label style={{float:'left'}}  for="exampleText"><b>Reason</b></Label>
                            <Input onChange={onHandleReasonChange} required value={reason} type="textarea" name="text" id="exampleText" />
                    </FormGroup> 
                 
                 <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
      <Button onClick={submitLeave} variant="contained" color="primary">
     <b>Apply for Leave</b>
      </Button>
      <Button onClick={changePage} variant="contained" color="primary">
     <b>View List</b>
      </Button>
          </div>  
             </Form>
        </div>
    </div>
    </>
)




}


export default ApplyLeave;

















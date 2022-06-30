
import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusSquare,faSearch, faThList } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';

import Tooltip from '@material-ui/core/Tooltip';
import Header from '../../Header';
import axios from 'axios';
import {BaseUrl} from '../../../API';
import {ImageUrl} from '../../../API';
import swal from '@sweetalert/with-react';
import {useHistory} from 'react-router-dom';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';


// import {BaseUrl} from '../../API';

function TeacherAcademicReport() {

  const [modal, setModal] = useState(false);
  const[editmodal,setEditModal]=useState(false);
  const [viewmodal,setViewmodal]= useState(false);
  const[newdate,setNewdate]= useState('');
  const[date,setDate]= useState(''); 
   const[classes,setClasses]=useState('');
   const[section,setSection]= useState('');
   const[name,setName]=useState('');
   const[obtainmarks,setObtainmarks]=useState('');
   const[totalmarks,setTotalmarks]=useState('');
   const[year,setYear]=useState('');
   const[report,setReport]=useState('')
//    const[subject,setSubject]=useState('');
//    const[studentlist,setStudentList]= useState([]);
   const[rowDta,setrowDta] = useState('');
   const[subject,setSubject]=useState('');
   const[newclasses,setNewclasses]=useState('');
   const[newsection,setNewsection]=useState('');
   const[newname,setNewname]=useState('');
   const[newobtainmarks,setNewobtainmarks]=useState('');
   const[newtotalmarks,setNewtotalmarks]=useState('');
   const[newyear,setNewyear]=useState('');
   const[newreport,setNewreport]=useState('');
   const[newsubject,setNewsubject]=useState();
   const[classdata,setClassdata]=useState([]);
   const[sectiondata,setSectiondata]=useState([])
   const[list,setList]=useState([]);
   const[reporttype,setReporttype]=useState([]);
   const[testname,setTestname]=useState('');
   const[gettestdata,setGettestdata]=useState([]);
   const[testdata,getTestdata]= useState([]);
//    data
const[getclass,setGetclass]=useState([]);
const[getsection,setGetsection]=useState([]);
const[getname,setGetname]=useState([]);
const[getsubject,setGetsubject]=useState([]);
const[nwname,setNewName]=useState('');
const[years,setYears]=useState('');
const[reports,setReports]=useState('');
const[showdata,setShowdata]=useState([]);
    const[namedata,setNamedata]=useState([]);

   const toggleEditmodal =()=> setEditModal(!editmodal)
   const viewtoggleModal =()=> setViewmodal(!viewmodal);
    const history = useHistory();
  //  const closeBtnone = <button className="close" onClick={toggleEditmodal}>&times;</button>;
   
const teacherdata = JSON.parse(localStorage.getItem('education'))
                               
   
const submitDetails=()=>{

// console.log('ss',photo)     

  const data={
    // TestId:
      classes_id:classes,
      section_id:section,
      name:name,
      subject_id:subject,
      year:year,
    obtainedmarks: obtainmarks,
    totalmarks: totalmarks,
    school_id: teacherdata.data.school_id,
    user_id: teacherdata.data.user_id,
    AcademicReportId: report,
    TestId: testname
  }

  

axios.post(`${BaseUrl}/addacademicreportmarks`,data).then
(fres=> {
    
  if(fres.data.status===true){
    swal(fres.data.msg)
  }
   
  Allstudentdata()
  
})

 setSection('')
 setClasses('')
 setName('')
 setObtainmarks('')
 setTotalmarks('')
 setSubject('')
 setYear('')
// setDescription('')
// setDate('')
// setSubject('')
// setPhoto('')
toggleModal();
}




// const getHomeworkdata=()=>{

// const data={
//     classes: newclasses,
//     section: section
// }

// axios.post(`${BaseUrl}/searchteacherhomework`,data).then
// (res=> {
//     const list = res.data.data;
//     setList(list);
// })

// }

useEffect(()=>{

const body={
  classes_id: classes,
  section_id: section,
  school_id:teacherdata.data.school_id
}


  axios.post(`${BaseUrl}/getclassstudents`,body).then
  (res=> {
    setNamedata(res.data.data);
  })


},[classes,section])





useEffect(()=>{


  axios.get(`${BaseUrl}/viewclasseslist/${teacherdata.data.school_id}`).then
  (res=> {
    setClassdata(res.data.data)
  })
  
  },[])
  
  useEffect(()=>{
  
  
    axios.get(`${BaseUrl}/viewsectionlist/${teacherdata.data.school_id}`).then
    (res=> {
      setSectiondata(res.data.data)
    })
    
    },[])
    
useEffect(()=>{

const data={
    classes: classes,
    section: section
}


axios.post(`${BaseUrl}/studentlist`,data).then
(res=>{
    setGetname(res.data.data)
})


},[classes,section]);


useEffect(()=>{

},[])





useEffect(()=>{
   
    axios.get(`${BaseUrl}/viewsubjectslist/${teacherdata.data.school_id}`).then
    (res=>{
        setGetsubject(res.data.data)
    })
    
    Allstudentdata();
    },[]);
    

// useEffect(()=>{                   
//     Allstudentdata();
// },[])


const searchAcademic=()=>{

axios.post(`${BaseUrl}/searchacademicreportmarks/${classes}/${section}/${reports}/${years}`).then
(res=> {
  setShowdata(res.data.data);
})

}









const Allstudentdata=()=>{

axios.get(`${BaseUrl}/viewacademicreportmarks/${teacherdata.data.school_id}`).then
(res=>  {
     console.log('xx',res.data.data)
    setList(res.data.data);
})


}

// console.log('kk',classes)
// console.log('ll',section)



useEffect(()=>{
  axios.post(`${BaseUrl}/searchtest/${classes}/${section}/${teacherdata.data.school_id}`).then
  (res=>{
    getTestdata(res.data.data);
  })
},[classes,section])





// const ChangePage=()=>{
//     history.push('/educations/teacher/home-works/view-all')
// }

useEffect(()=>{

})





const EditAcademic=()=>{           


    const data={
        
      classes_id:newclasses,
      section_id:newsection,
      name:nwname,
      subject_id:newsubject,
      year:newyear,
    obtainedmarks: newobtainmarks,
    totalmarks: newtotalmarks,
    // school_id: teacherdata.data.school_id,
    // user_id: teacherdata.data.user_id,
    
      }

axios.post(`${BaseUrl}/editacademicreportmarks/${rowDta._id}`, data).then
(res=>  {
  // console.log('pp',res)
if(res.status=== true){
   
  swal(
   
      
      <p>
       {res.data.msg}
      </p>
  
  )
 
}else{
  swal(
    
      
      <p>
        {res.data.msg}
      </p>
    
  )
}
Allstudentdata();
})
// setNewDescription('');
// setNewdate('');
setEditModal(false);

}

useEffect(()=>{
  getReporttype(); 
},[])

const getReporttype=()=>{

axios.get(`${BaseUrl}/searchreporttype/${teacherdata.data.school_id}`).then
(res=>{
  setReporttype(res.data.data)
})

}



// console.log('bd',newclasses);


// useEffect(()=>{
//   submitDetails()
// }

// ,[])

// const getDetailsfees=()=>{

// const getData ={

// id: userId,
// startdate: startdate,
// enddate: enddate,
// name: name

// }


// axios.get(`${BaseUrl}/filterfees`,getData).then
// (res=> console.log('fltrfee', res))

// toggleModal();


// }


// useEffect(()=>{
// getDetailsfees();
// }, [])



  
  const toggleModal = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;
  return (
    <>
      <Header />
      <div className='hmwrkteacher_container' >
      <div  className='teacherreport_header'>
        <div style={{width:'60%'}} >
         <Form>
         <Row form>
        <Col md={2}>
        <FormGroup>
        <Label for="exampleSelectMulti">Years</Label>
        <Input required value={years} onChange={(e)=>setYears(e.target.value)} type="select" name="select" id="exampleSelect">
        <option>--select--</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
        </Input>
      </FormGroup>
        </Col>
        <Col md={3}>
        <FormGroup>
        <Label for="exampleSelectMulti">Report Types</Label>
        <Input required value={reports} onChange={(e)=>setReports(e.target.value)} type="select" name="select" id="exampleSelect">
        <option>--select--</option>
          {reporttype.map(value=>{
            return(
            <option value={value._id}>{value.reporttype}</option>
            )
          })}
        </Input>
      </FormGroup>
        </Col> 
        <Col md={2}>
        <FormGroup>
        <Label for="exampleSelectMulti">Class</Label>
        <Input required value={classes} onChange={(e)=>setClasses(e.target.value)} type="select" name="select" id="exampleSelect">
        <option>--select--</option>
          {classdata.map(value=>{
            return(
            <option value={value._id}>{value.classes}</option>
            )
          })}
          
         
          
        </Input>
      </FormGroup>
        </Col>
        <Col md={3}>
        <FormGroup>
        <Label for="exampleSelectMulti">Section</Label>
        <Input required value={section} onChange={(e)=>setSection(e.target.value)} type="select" name="select" id="exampleSelect">
        <option>--select--</option>
          {sectiondata.map(value=>{
            return(
            <option value={value._id}>{value.section}</option>
            )
          })}
        </Input>
      </FormGroup>
        </Col>
        <Col md={2}>
        
        <Button onClick={searchAcademic} style={{transform:'translateY(33px)'}} >Search<FontAwesomeIcon style={{marginLeft:'10px'}}  icon={faSearch}/> </Button>
      
        </Col>
      </Row>
        
     
         </Form>
        </div>

        <div className='add_icon'  >
       
          <Tooltip title='Add Details'>
            <Button onClick={setModal} 
           >ADD REPORT<FontAwesomeIcon style={{ color: 'white', fontSize: '1rem',marginLeft:'4px' }} icon={faPlusSquare} />  </Button>
          </Tooltip>
        </div>
        </div>
       
       
        <div>
          <Modal isOpen={modal} toggle={toggleModal} >
            <Form>
              <ModalHeader toggle={toggleModal} > Add New Details</ModalHeader>
              <ModalBody>
              <Row form>
        <Col md={6}>
          <FormGroup>
            <Label >Class</Label>
            <Input value={classes} onChange={(e)=>setClasses(e.target.value)}
             type="select" name="select" id="classes">
            <option>--select--</option>
          {classdata.map(value=>{
            return(
            <option value={value._id}>{value.classes}</option>
            )
          })}
          </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Section</Label>
            <Input value={section} onChange={(e)=>setSection(e.target.value)} 
            type="select" name="section" id="section">
            <option>--select--</option>   
            {sectiondata.map(value=>{
            return(
            <option value={value._id}>{value.section}</option>
            )
          })}
          </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
          <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input  type="select" name="name"  value={name} onChange={(e)=>setName(e.target.value)} >
              <option>--select name--</option>
              {namedata.map((val)=>{
                return(
                  <option>{val.name}</option>
                )
              })}
            </Input>
           
                
         
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Report Type</Label>
            <Input value={report} required onChange={(e)=> setReport(e.target.value)} 
            type="select" name="obtainmarks"  >
              <option>--select--</option>
            {reporttype.map(item=>{
              return(
                <option value={item._id}>{item.reporttype}</option>
              )
            })}
             </Input>   
          </FormGroup>
          </Col>
      </Row>
     
          <Row form>
                 <Col md={6}>
                 <FormGroup>
            <Label for="exampleEmail">Subject</Label>
            <Input value={subject} onChange={(e)=>setSubject(e.target.value)} 
            type="select" name="select" id="subject">
            <option>--select--</option>
           {getsubject.map(val=>{
               return(
                <option value={val._id}>{val.subject}</option> 
               )
           })}
          </Input>
          </FormGroup>

                 </Col>
          <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Year</Label>
            <Input value={year} required onChange={(e)=> setYear(e.target.value)} type="number" name="obtainmarks" id="" />
                
          </FormGroup>
          </Col>
          </Row>
         
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleEmail">Obtained Marks</Label>
            <Input value={obtainmarks} required onChange={(e)=> setObtainmarks(e.target.value)} type="number" name="obtainmarks" id="" />
                
          </FormGroup>
        </Col>
        <Col md={4}>
        <FormGroup>
            <Label for="exampleEmail">Total Marks</Label>
            <Input value={totalmarks} required onChange={(e)=> setTotalmarks(e.target.value)} type="number" name="totalmarks" id="totalmarksl"/>
          </FormGroup>
        </Col>
        <Col md={4}>
        <FormGroup>
            <Label for="exampleEmail">Test Name</Label>
            <Input value={testname} required 
            onChange={(e)=> setTestname(e.target.value)} type="select" name="testname" >
             {testdata.map(val=>{
               return(
                 <option value={val._id} >{val.testname}</option>
               )
             })}
              </Input>
          </FormGroup>
        </Col>
      </Row>
     
              
                
              </ModalBody>
              <ModalFooter>
                <Button onClick={submitDetails} color="primary" >Add</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        <div>
        <div>
          <Modal isOpen={editmodal} toggle={toggleEditmodal} >
            <Form>
              
            <ModalHeader toggle={toggleEditmodal } >Edit Details</ModalHeader>
              <ModalBody>
              <FormGroup>
            <Label>Name</Label>
            <Input value={nwname} onChange={(e)=>setNewName(e.target.value)} 
            type="text" name="name" id="name"/>
                
         
          </FormGroup>
              <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Class</Label>
            <Input value={newclasses} onChange={(e)=>setNewclasses(e.target.value)}
             type="select" name="select" id="classes">
            <option>--select--</option>
          {classdata.map(value=>{
            return(
            <option value={value._id}>{value.classes}</option>
            )
          })}
          </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="examplePassword">Section</Label>
            <Input value={newsection || ""} onChange={(e)=>setNewsection(e.target.value)} 
            type="select" name="select" id="section">
            <option>--select--</option>   
            {sectiondata.map(value=>{
            return(
            <option value={value._id}>{value.section}</option>
            )
          })}
          </Input>
          </FormGroup>
        </Col>
      </Row>
      {/* <FormGroup>
            <Label for="exampleEmail">Report Type</Label>
            <Input value={newreport} required onChange={(e)=> setNewreport(e.target.value)} type="select"   >
              <option>Annual</option>
              <option>Half-Yearly</option>
              <option>Unit Test</option>
              <option>Surprise Test</option>
              </Input>
                
          </FormGroup> */}
      <Row form>
         <Col md={6}>
         <FormGroup>
            <Label for="exampleEmail">Subject</Label>
            <Input value={newsubject || ""} onChange={(e)=>setNewsubject(e.target.value)} 
            type="select" name="select" id="subject">
            <option>--select--</option>
           {getsubject.map(val=>{
               return(
                <option value={val._id}>{val.subject}</option> 
               )
           })}
          </Input>
          </FormGroup>
         </Col>
         <Col md={6}>
         <FormGroup>
            <Label for="exampleEmail">Year</Label>
            <Input value={newyear || ''} required onChange={(e)=> setNewyear(e.target.value)} type="number" name="obtainmarks" id="" />
                
          </FormGroup>
         </Col>
      </Row>
         
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Obtained Marks</Label>
            <Input value={newobtainmarks || ''}
             required onChange={(e)=>setNewobtainmarks(e.target.value)} 
             type="number"   />   
            
          </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
            <Label for="exampleEmail">Total Marks</Label>
            <Input value={newtotalmarks || ''} required onChange={(e)=> setNewtotalmarks(e.target.value)} type="number" name="totalmarks" id="totalmarksl"/>
          </FormGroup>
        </Col>
      </Row>
     
              
              </ModalBody>
              <ModalFooter>
                <Button onClick={EditAcademic} color="primary" >Edit</Button>{' '}
                <Button onClick={toggleEditmodal } color="secondary" >Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>
        </div>
        </div>
        <div className='hmwrkteacher_table' >
          <MaterialTable
            title="Academic Report Details"
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Total Marks', field: 'totalmarks' },
              {title: 'Year', field:'year'}
            ]}
            data={showdata}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'View Details',
                onClick: (event, rowData) => {
                  // console.log('raw',rowData);
                  // const rowDta = rowData;
                  // setrowDta(rowDta);
                  // setNewName(rowData.name)
                  // setNewsection(rowData.section);
                  // setNewname(rowData.name);
                  // setNewsubject(rowData.subject_id);
                  // setNewclasses(rowData.classes);
                  // setNewobtainmarks(rowData.obtainedmarks);
                  // setNewyear(rowData.year);
                  // setNewtotalmarks(rowData.totalmarks);
                 
                  history.push('/educations/teacher/academic-reports/view',rowData)
                 

                }
              },
              
            
            ]}
            options={{
              actionsColumnIndex: -1,
              search: false
            }}
          />
        </div>
      </div>
    </>
  )
}



export default TeacherAcademicReport;































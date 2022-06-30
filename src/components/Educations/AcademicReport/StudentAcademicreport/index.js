
import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusSquare,faSearch, faThList } from '@fortawesome/free-solid-svg-icons';
import './index.css';
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';

// import Tooltip from '@material-ui/core/Tooltip';
import Header from '../../Header';
import axios from 'axios';
import {BaseUrl} from '../../../API';
import swal from '@sweetalert/with-react';
import {useHistory} from 'react-router-dom';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import {ImageUrl} from '../../../API';
import { SettingsSystemDaydreamRounded } from '@material-ui/icons';


// import {BaseUrl} from '../../API';

function StudentAcademicReport() {

  const [modal, setModal] = useState(false);
  const[editmodal,setEditModal]=useState(false);
  const [viewmodal,setViewmodal]= useState(false);
  const[newdate,setNewdate]= useState('');
  const[date,setDate]= useState('');
   const[newdescription,setNewDescription] = useState('');
   const [description,setDescription] = useState('')
   const[classes,setClasses]=useState('');
   const[section,setSection]= useState('');
//    const[studentlist,setStudentList]= useState([]);
   const[rowDta,setrowDta] = useState('');
   const [photo,setPhoto]= useState('');
   const[subject,setSubject]=useState('');
   const[newyear,setNewyear]=useState();
   const[newsection,setNewsection]=useState();
//    const[newdescription,setNewdescription]=useState();
   const[newsubject,setNewsubject]=useState();
   const [newphoto,setNewphoto]=useState('');
   const[classdata,setClassdata]=useState([]);
   const[sectiondata,setSectiondata]=useState([]);
   const[acadata,setAcadata]=useState([]);
   const[list,setList]=useState([]);
   const[year,setYear]=useState([]);
   const[reporttype,setReporttype]=useState([]);
   const[newreporttype,setNewreporttype]=useState('');
   const[studentdata, setStudentdata]=useState([]);
   const[totalacademicdata,setTotalacademicdata]=useState([]);
//    const[]

   const toggleEditmodal =()=> setEditModal(!editmodal)
   const viewtoggleModal =()=> setViewmodal(!viewmodal);
    const history = useHistory();
   const closeBtnone = <button className="close" onClick={toggleEditmodal}>&times;</button>;
   
const academicdata = JSON.parse(localStorage.getItem('education'))

 useEffect(()=>{
    getYear()
 },[])
    const getYear=()=>{
        axios.get(`${BaseUrl}/listyear/${academicdata.data.school_id}`).then
        (res=>{
            console.log('ee',res.data.data);
            setYear(res.data.data);
        })
    }





  



// const submitDetails=()=>{

// // console.log('ss',photo)

//   const data={
//     section: section,
//     classes: classes,
//     homework: photo ,
//     subject: subject,
//     date: date,
//     description: description,
//     school_id: homewrkdata.data.school_id,
//     user_id: homewrkdata.data.user_id
//   }

//   const formdata = new FormData()

//   formdata.append(
//       'homework',
//       photo

//   );

// axios.post(`${BaseUrl}/addteacherhomework`,data).then
// (fres=> {
    
//   axios.post(`${BaseUrl}/uploadteacherhomework/${fres.data.data._id}`,formdata).then
//   (res=> {
//     if(res.data.status||fres.data.status===true){
//     swal(
//     <h4>{res.data.msg}</h4>
//     )
//     }else{
//       swal(
//         <h4>{res.data.msg}</h4>
//       )
//     }
//   })
// //   console.log('fbb',fres)
// })

// setSection('')
// setClasses('')
// setDescription('')
// setDate('')
// setSubject('')
// setPhoto('')
// toggleModal();
// }




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




// useEffect(()=>{


//   axios.get(`${BaseUrl}/viewclasseslist/${homewrkdata.data.school_id}`).then
//   (res=> {
//     setClassdata(res.data.data)
//   })
  
//   },[])
  
//   useEffect(()=>{
  
  
//     axios.get(`${BaseUrl}/viewsectionlist/${homewrkdata.data.school_id}`).then
//     (res=> {
//       setSectiondata(res.data.data)
//     })
    
//     },[])
    





// const ChangePage=()=>{
//     history.push('/educations/teacher/home-works/view-all')
// }







// const EditHomework=()=>{           


//     const data={
//         section: newsection,
//         classes: newclasses,
//         subject: newsubject,
//         date: date,
//         description: description,
//         school_id: homewrkdata.data.school_id,
//         user_id: homewrkdata.data.user_id
//       }

// axios.post(`${BaseUrl}/addclassdiary/${rowDta.user_id}/${rowDta.school_id}`, data).then
// (res=>  {
// if(res.status=== true){
//   swal(
//     <div>
//       <h1>Hello Teacher!</h1>
//       <p>
//        {res.msg}
//       </p>
//     </div>
//   )
// }else{
//   swal(
//     <div>
//       <h1>Hello Teacher!</h1>
//       <p>
//         {res.msg}
//       </p>
//     </div>
//   )
// }
// })
// setNewDescription('');
// setNewdate('');
// setEditModal(false);
// }

const schoolData=()=>{
    axios.get(`${BaseUrl}/showschool/${academicdata.data.school_id}`).then(
        res=> {
            console.log('ss',res)
            setAcadata(res.data.data)
        }
    )
}

useEffect(()=>{

schoolData();

},[])

useEffect(()=>{
  axios.get(`${BaseUrl}/searchreporttype/${academicdata.data.school_id}/${newyear}`).then
    (res=>{
        setReporttype(res.data.data);
    })

},[newyear])

const getSearchData=()=>{

    


    axios.post(`${BaseUrl}/searchacademicreport/${academicdata.data.school_id}/${newreporttype}/${newyear}`).then
    (res=>{
        console.log('mm',res.data.data[0]._id)
        setStudentdata(res.data.data)
        axios.post(`${BaseUrl}/searchacademicreportmarks/${res.data.data[0]._id}`).then
        (resone=>{
            setTotalacademicdata(resone.data.data);
        })
        
    })
}




  
  
  return (
    <>
      <Header />
      <div className='acastudent_container' >
       
                <div  className='schoolname' >
                <img style={{width:'50px',height:'50px',marginTop:'5px'}} 
                src={`${ImageUrl}${acadata.logoimage}`}/> 
                 <h2 style={{paddingLeft:'10px'}}>{acadata.name}</h2></div>
           
         
        <div  className='acastudent_header'>
        <div style={{width:'50%'}} >
         <Form>
         <Row form>
        <Col md={4}>
        <FormGroup>
        <Label >Year</Label>
        <Input required value={newyear} onChange={(e)=>setNewyear(e.target.value)} type="select" name="select" id="exampleSelect">
        <option>--select--</option>
          {year.map(value=>{
            return(
            <option>{value.year}</option>
            )
          })}
          
         
          
        </Input>
      </FormGroup>
        </Col>
        <Col md={4}>
        <FormGroup>
        <Label for="exampleSelectMulti">Report Type</Label>
        <Input required value={newreporttype} onChange={(e)=>setNewreporttype(e.target.value)} type="select" name="select" id="exampleSelect">
        <option>--select--</option>
          {reporttype.map(value=>{
            return(
            <option>{value.reporttype}</option>
            )
          })}
        </Input>
      </FormGroup>
        </Col>
        <Col md={4}>
        
        <Button onClick={getSearchData} style={{transform:'translateY(33px)'}} >Search<FontAwesomeIcon style={{marginLeft:'10px'}}  icon={faSearch}/> </Button>
      
        </Col>
        
      </Row>
     
         </Form>
        </div>

       
        </div>
        {studentdata.map(val=>{
            return(
                <div  className='student_details'>
          <div className='sturow' >
          <div style={{fontSize:'1.5rem'}}>Name:</div>
          <div style={{fontSize:'1.5rem',paddingLeft:'10px'}}>{academicdata.data.name}</div>
          </div>
          <div className='sturow' >
          <div style={{fontSize:'1.5rem'}}>Report Type:</div>
            <div style={{fontSize:'1.5rem',paddingLeft:'10px'}}>{val.reporttype}</div>
          </div>
          <div className='sturow' >
          <div style={{fontSize:'1.5rem'}}>Year:</div>
            <div style={{fontSize:'1.5rem',paddingLeft:'10px'}}>{val.year}</div>
          </div>
          <div className='sturow' >
          <div style={{fontSize:'1.5rem'}}>Class:</div>
            <div style={{fontSize:'1.5rem',paddingLeft:'10px'}}>{val.classes}</div>
          </div>
          <div className='sturow' >
          <div style={{fontSize:'1.5rem'}}>Section:</div>
            <div style={{fontSize:'1.5rem',paddingLeft:'10px'}}>{val.section}</div>
          </div>
       </div>
            )
               
            
        })}
       
        <div className='acastudent_table' >
          <MaterialTable
            title="Academic Report Details"
            columns={[
              { title: 'Subject', field: 'subject' },
              { title: 'Obtained Marks', field: 'obtainedmarks' },
              { title: 'Total Marks', field: 'totalmarks' },
             
            ]}
            data={totalacademicdata}
            // actions={[
            //   // {
            //   //   icon: 'edit',
            //   //   tooltip: 'Edit Details',
            //   //   onClick: (event, rowData) => {
            //   //     console.log('raw',rowData);
            //   //     const rowDta = rowData;
            //   //     setrowDta(rowDta);
            //   //     setEditModal(!editmodal)
                 

            //   //   }
            //   // },
              
            
            // ]}
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



export default StudentAcademicReport;


import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import './index.css';
import Header from '../../../../Educations/Header';
import {useHistory} from 'react-router-dom';
 import axios from 'axios';
 import {BaseUrl} from '../../../../API';

function ViewStudentList() {

  const [modal, setModal] = useState(false);
  const[resdata,setResdata]=useState([])
  const history = useHistory();
  const toggleModal = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;

 const data=localStorage.getItem('education')
const finaldata = JSON.parse(data);

const viewclassdiary=()=>{




axios.get(`${BaseUrl}/viewclassdiary/${finaldata.data.user_id}/${finaldata.data.school_id}`).then
(res=> {
  console.log('qq',res)
  const resdata= res.data.data;
  setResdata(resdata);
})


}

useEffect(()=>{
viewclassdiary();
},[])




  return (
    <>
      <Header />
      <div className='view_student_container' >
        
        
        <div  >
          <MaterialTable
            title="Diary Details"
            columns={[
              { title: 'Date', field: 'date' },
              { title: 'description', field: 'description' },
             
            ]}
            data={resdata}
           
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



export default ViewStudentList;





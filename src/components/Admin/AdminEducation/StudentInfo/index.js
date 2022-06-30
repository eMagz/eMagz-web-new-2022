import React, { useState, useEffect } from 'react'
import "./index.css"
import { BaseUrl, ImageUrl } from "../../../API"
import Header from "../Header"
import axios from "axios"
import {Link} from "react-router-dom"
import { Row, Col } from "reactstrap"
import MaterialTable from 'material-table';



const Index = (props) => {
    const [students, setStudents] = useState([])
    console.log("ID", props.location.state)

    const getAllTeacherStudentList = () => {
      axios.get(`${BaseUrl}/school-student-list/${props.location.state}`).then((res)=>{
        setStudents(res.data.data.studentDetails)
        console.log('inside Students',res.data.data)
      })
      
    }


   useEffect(()=>{
    getAllTeacherStudentList()
   }, []) 

   console.log('Students',students)

    return (
        <>
         <Header/>
         <div className='admin_container' >
        <div className='fees_table' >
        <MaterialTable
                            title="Student List"
                            columns={[
                                { title: 'Student Name', field: 'name' },
                                { title: 'Gender.', field: 'gender' },
                                { title: 'Phone No', field: 'mobile' },
                            ]}
                            data={students}
                            actions={[
                                {
                                    icon: 'visibility',
                                    tooltip: 'Show Details',
                                    // onClick: (event, rowData) => history.push(`/admin/education/schools/${rowData._id}`, rowData)
                                }
                            ]}
                            options={{
                                actionsColumnIndex: -1,
                                search: true
                            }}
                        />
        </div>
      </div>
        </>
    )
}

export default Index
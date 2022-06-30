import React, { useState, useEffect } from 'react'
import { BaseUrl, ImageUrl } from "../../../API"
import Header from "../Header"
import axios from "axios"
import { Link } from "react-router-dom"
import { Row, Col } from "reactstrap"
import MaterialTable from 'material-table';



const Index = (props) => {
    const [teachers, setTeachers] = useState([])
    console.log("ID", props.location.state)

    const getAllTeachersList = () => {
        axios.get(`${BaseUrl}/viewteacherlist/${props.location.state}`).then((res) => {
            setTeachers(res.data.data.teacherDetails)

        })

    }


    useEffect(() => {
        getAllTeachersList()
    }, [])

    return (
        <>
            <Header />
            <div className='admin_container' >
                <div className='fees_table' >
                    <MaterialTable
                        title="Teacher List"
                        columns={[
                            { title: 'Teacher Name', field: 'name' },
                            { title: 'Gender', field: 'gender' },
                            { title: 'Phone No', field: 'mobile' },
                        ]}
                        data={teachers}
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
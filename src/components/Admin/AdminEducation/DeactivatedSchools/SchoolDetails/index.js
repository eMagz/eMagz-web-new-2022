import React, { useState, useEffect } from 'react'
import "./index.css"
import { BaseUrl, ImageUrl } from "../../../../API"
import Header from "../../Header"
import axios from "axios"
import {Link, useHistory} from "react-router-dom"
import { Row, Col } from "reactstrap"
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import swal from "sweetalert"
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faMailBulk, faImages, faMapMarkerAlt, faCalendarAlt, faUserCog, faTrash } from '@fortawesome/free-solid-svg-icons'
// import {} from "react-router-dom"

const Index = (props) => {

   const history = useHistory()
    const [schoolData, setSchoolData] = useState(props.location.state)
    const [students, setStudents] = useState('')
    const [teachers, setTeachers] = useState('')


    const getAllTeacherStudentList = () => {

        const one = `${BaseUrl}/viewteacherlist/${schoolData._id}`
        const two = `${BaseUrl}/school-student-list/${schoolData._id}`

        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);
        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            setStudents(responseTwo.data.data.countstudentDetails)
            setTeachers(responseOne.data.data.countteacherDetails)
        })).catch(errors => {
            console.log('Error', errors)
        })
    }
    useEffect(() => {
        getAllTeacherStudentList()
    }, [])


    const handleDeleteSchool = (data)=>{
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      if (true) {
        axios.post(`${BaseUrl}/change-school-status/${schoolData._id}`).then(
          res=>{
            console.log("RES", res)
          }
      )  
        swal("School has been Activated!", {
          icon: "success",
          method: history.push(`/admin/education/schools`)
        });
      } else {
        swal("School is safe now!");
      }
  } 
    return (
        <>
      <Header />
      <div style={{ marginTop: '4rem' }} className='container' >
        <div >
          <div className='temp3_header' >
            <div className='back_img' >
              <img style={{ marginTop: '10px', width: '100%', height: '100%' }} src={schoolData.bannerimage} />
            </div>
            <div className='temp3_main' >
              <img className='temp3_picture' src={schoolData.logoimage} />
            </div>
          </div>
          <div className='profile_details3'>
            <div className="profile-post">
              <div className='profName3' ><i class="fas fa-school" style={{marginRight: "5px", marginBottom: "2px", color: '#3c4eb3'}}></i>{schoolData.name}</div>
              <div className='addpost' >
                <button onClick={()=>history.push(`/admin/education/schools/${schoolData._id}/update`, schoolData._id)} className='post_btn edit3_btn1' >Update School <FontAwesomeIcon icon={faUserCog} /> </button>
              </div>
            </div>
            <div className='profMail3' ><strong>Medium</strong> : {schoolData.medium}</div>
          </div>
          <div className='more_details3' >
            <div className="detail_div">
              <FontAwesomeIcon className="mt-1" icon={faMapMarkerAlt} />
              <div style={{ paddingLeft: '5px', color: 'gray' }}>
                {schoolData.city}, {schoolData.country}
              </div>
            </div>
            <div className="detail_div" >
              <FontAwesomeIcon className="mt-1" icon={faMailBulk} />
              <div style={{ paddingLeft: '5px', color: 'gray' }}>
                {schoolData.email}
              </div>
            </div>
            <div className="detail_div">
             <i onClick={()=>history.push(`/admin/education/schools/${schoolData._id}/students`,schoolData._id)} class="fas fa-users-class" style={{color: '#3c4eb3', cursor: "pointer", marginTop: "4px", marginRight: "3px"}}></i>
              <strong style={{color: "black", marginBottom: "5px"}}> + {students}</strong>
            </div>
            <div className="detail_div">
             <i onClick={()=>history.push(`/admin/education/schools/${schoolData._id}/teachers`,schoolData._id)} class="fas fa-chalkboard-teacher" style={{color: '#3c4eb3', cursor: "pointer", marginTop: "4px", marginRight: "3px"}}></i>
             <strong style={{color: "black", marginBottom: "5px"}}> + {teachers}</strong>
            </div>
             <div className='profile3_edit_btn' >
              <button onClick={handleDeleteSchool} className='edit3_btn edit3_btn1' >Activate</button>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default Index

import React, { useState, useEffect } from 'react'
import "./index.css"
import { BaseUrl, ImageUrl } from "../../../API"
import Header from "../Header"
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
import socialMedia from "../../../../assets/socialMedia.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircularProgress from '@material-ui/core/CircularProgress';
import { faBirthdayCake, faMailBulk, faImages, faMapMarkerAlt, faCalendarAlt, faUserCog, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons'
// import {} from "react-router-dom"

const Index = (props) => {

  console.log("PROPS", props)
    const history = useHistory()
    const [userData, setUserData] = useState(props.location.state)
    const [mettings, setMettings] = useState([])
    const [followers, setFollowers] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const getAllPost = () =>{
      setIsLoading(true)
     axios.get(`${BaseUrl}/user-meetings-list/${userData._id}`).then((res)=>{
       console.log("res.data.data", res.data.data)
      setMettings(res.data.data.meetingslist)
      setIsLoading(false)     
     })

}
    useEffect(()=>{
      getAllPost()
    }, [])

    const handleDeactiveProfile = ()=>{
      swal({
        title: "Are you sure?",
        text: "Once deactivated, It will not visible on social media page.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((isDeactivate)=>{
          if(isDeactivate){
            axios.post(`${BaseUrl}/change-social-profile-status/${userData._id}`)
            swal("Profile has been Deactivated!", {
              icon: "success",
              method: history.push(`/admin/emagz/acvtive-users/`)
            });
          }else{
            swal("Profile is safe now!");
          }
      })
    } 
    return (
        <>
      <Header />
      <div style={{ marginTop: '4rem' }} className='container' >
        <div >
          <div className='temp3_header' >
            <div className='back_img' >
              <img style={{ marginTop: '10px', width: '100%', height: '100%' }} src="http://api.emagz.live/assets/banners/1607665052750.jpg" />
            </div>
            <div className='temp3_main' >
              <img className='temp3_picture' src={userData.image} />
            </div>
          </div>
          <div className='profile_details3'>
            <div className="profile-post">
              <div className='profName3' >{userData.name}</div>
              <div className='addpost' >
                <button onClick={()=>history.push(`/admin/education/schools/${userData._id}/update`, userData._id)} className='post_btn edit3_btn1' >Update School <FontAwesomeIcon icon={faUserCog} /> </button>
              </div>
            </div>
          </div>
          <div className='more_details3' >
            <div className="detail_div">
              <FontAwesomeIcon className="mt-1" icon={faMapMarkerAlt} />
              <div style={{ paddingLeft: '5px', color: 'gray' }}>
                {userData.address == '' ? 'India' :  userData.address }
              </div>
            </div>
            <div className="detail_div" >
              <FontAwesomeIcon className="mt-1" icon={faMailBulk} />
              <div style={{ paddingLeft: '5px', color: 'gray' }}>
                {userData.username}
              </div>
            </div>
            <div className="detail_div" >
              <FontAwesomeIcon className="mt-1" icon={faCalendar} />
              <div style={{ paddingLeft: '5px', color: 'gray' }}>
               
                {Moment(userData.createdAt).format('MM/DD/YYYY')}
              </div>
            </div>
            <div className="detail_div">
             <strong style={{color: "black", marginBottom: "5px"}}>Followers + {followers}</strong>
            </div>
             <div className='profile3_edit_btn' >
              <button onClick={handleDeactiveProfile} className='edit3_btn edit3_btn1' >Deactivate</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{margin: "6.7rem 6.7rem"}}>
       {
         isLoading ? ( <CircularProgress color="secondary" />) : (
          <MaterialTable
          title="Mettings"
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Date', field: 'date' },
            { title: 'Start Time', field: 'starttime' },
            { title: 'End Time', field: 'endtime' },
          ]}
          data={mettings}
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
         )
       }
      </div>
    </>
    )
}

export default Index

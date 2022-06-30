import React, { useState, useEffect } from 'react';
import './index.css';
import { useSelector } from "react-redux"
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import Header from '../../Header';
import { BaseUrl, ImageUrl } from '../../API';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import StarsIcon from '@material-ui/icons/Stars';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
// import PersonalInformation from '../PersonalInformation';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Axios from 'axios';
// import swal from 'sweetalert';
import swal from '@sweetalert/with-react'

let userdetails = JSON.parse(localStorage.getItem('user'))


const MeetingHome = () => {
 let user = useSelector(state => state.loginReducer.userDetails)
  if(Object.keys(user).length !== 0){
    userdetails = user
  }

  const [meetingList, setMeetingList] = useState([])

  const getMeetingList = () => {
    Axios.get(`${BaseUrl}/view-meetings/${userdetails._id}`).then((res) => {
      setMeetingList(res.data.data)
    })
  }

  useEffect(() => {
    getMeetingList()
  }, [])

  return (
    <>
      <Header />
      <div className='userProfile_container' >
        <div className='leftbar'>
          <div className='usercard'>
            <div className='profile_details'>
              <div style={{ marginTop: '20px' }}>
                <img src={userdetails.image} style={{ width: 50, height: 50, borderRadius: '50%', marginTop: '0px' }} />
              </div>
              <div style={{ marginTop: '20px', marginLeft: "10px" }}>
                Hello,
                     <div style={{ marginTop: '5px' }}>
                  <b>{userdetails.name}</b>
                </div>
              </div>
            </div>
          </div>
          <div className='setting_list' style={{ marginTop: '5rem' }}>
            <List component="nav">
              <Link to="/video-conference/dashborad/home">
                <ListItem button>
                  <ListItemIcon>
                    <OpenInBrowserIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/video-conference/dashborad/meetings">
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mettings" />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/video-conference/dashborad/contactlist">
                <ListItem button>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Contacts" />
                </ListItem>
              </Link>
              <Divider />
            </List>
          </div>
        </div>
        <div className='rightbar'>
          <div className='rigtside_setting_card' style={{marginTop: "0px", height: "61vh"}}>
            <div className='manageaddress_container'>
              <div className='address_headline'>
                Your Meeting List
             </div>
              {
                meetingList.length > 0 ? (<>
                  <table>
                    {meetingList.map((item, id) => {
                      return (
                        <>
                        <tbody>
                          <tr>
                            <td>{item.title}<br />
                            </td>
                              <td>{item.meeting_id}</td>
                            <td>
                              {`DATE: ${item.date}`}
                            </td>
                            <td>
                              {`Start Time: ${item.starttime}`}
                            </td>
                            <td>
                              {`End Time: ${item.endtime}`}
                            </td>
                            <td>
                              {item.meeting_link}
                            </td>
                            <td>
                              <button className='remove'>
                            </button>Start</td>
                          </tr>
                        </tbody>
                        </>
                      )
                    })}
                  </table>
                </>) : (<>
                  <div className='wishlist'>
                    <div>
                      <span>You don't have meeting schedule</span>
                    </div>
                  </div>
                </>)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default MeetingHome;
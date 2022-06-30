import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import './index.css';
import DatePicker from "react-datepicker"
import Button from '@material-ui/core/Button';
import moment from "moment"
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Header from '../../Header';
import { BaseUrl, ImageUrl } from '../../API';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
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
import VideoCallIcon from '@material-ui/icons/VideoCall';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Axios from 'axios';
// import swal from 'sweetalert';
import swal from '@sweetalert/with-react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Paper } from '@material-ui/core';

const url = 'http://www.emagz.live'

let userdetails = JSON.parse(localStorage.getItem('user'))

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


const MeetingHome = (props) => {
  console.log('My Base URL', props)
  console.log('My Base URL', window.location.pathname)
 let user = useSelector(state => state.loginReducer.userDetails)
  if(Object.keys(user).length !== 0){
    userdetails = user
  }

  const classes = useStyles();
  const [meetingID, setMeetingID] = useState('')
  const [openModel, setOpenModel] = useState(false);
  const [joinModel, setJoinModel] = useState(false);
  const [shareModel, setShareModel] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [repeat, setRepeat] = useState('Never');
  const [userName, setUserName] = useState(userdetails.name);
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingDetail, setMettingDetail] = useState({});
  const [toTime, setToTime] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [meetingName, setMeetingName] = useState(`${userdetails.name}'s Emagz Meeting`);
  const [meetingList, setMeetingList] = useState([]);

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const history = useHistory()
  var today = new Date(),
    time = today.getHours() + ':' + today.getMinutes();

  var todayDate = new Date(),
    date = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();

  const toggle = () => setOpenModel(!openModel)
  const toggleJoin = () => setJoinModel(!joinModel)
  const toggleShare = () => setShareModel(!shareModel)


  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);


  const getMeetingList = () => {
    Axios.get(`${BaseUrl}/view-meetings/${userdetails._id}`).then((res) => {
      setMeetingList(res.data.data)
    })
  }

  useEffect(() => {
    getMeetingList()
    Axios.get(`${BaseUrl}/generate-passcode-meetingid`).then((res) => {
      console.log('Meeting Details', res.data)
      setMettingDetail(res.data)
    })
  }, [])
  const createMeetingHandler = () => {
    let createMeeting = {
      date: selectDate,
      starttime: fromTime,
      endtime: toTime,
      timezone: "Kolkata, West Bengal (GMT+5:30)",
      name: userdetails.name,
      user_id: userdetails._id,
      passcode: meetingDetail.passcode,
      meeting_id: meetingDetail.meeting_id
    }

    Axios.post(`${BaseUrl}/create-meeting`, createMeeting).then((res) => {
      setMeetingID(res.data.data._id) 
      Axios.post(`${BaseUrl}/update-meeting-link/${res.data.data.meeting_id}`, {meeting_link: `${url}/video-conference/joinmeeting/${res.data.data._id}`}).then((res)=>{
        console.log('Res Data', res)
      })

    })
    





  }

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
          <Row>
            <Col md={6}>
              <div>
              <div className="newMetting">  
                    <div style={{display: "flex", justifyContent: "space-around", justifyItems: "space-around"}}>
                       <div>
                          New Meeting
                       </div>
                       <div onClick={() => history.push('/video-conference/dashborad/connect')}>
                         <i class="fas fa-users" style={{color: "red", fontSize: "20px", cursor: "pointer"}}></i>
                       </div>
                    </div>
                  </div>
                  <div className="joinMetting">  
                    <div style={{display: "flex", justifyContent: "space-around", justifyItems: "space-around"}}>
                       <div>
                          Join Meeting
                       </div>
                       <div onClick={toggleJoin}>
                         <i class="fas fa-plus" style={{color: "blue", fontSize: "20px", cursor: "pointer"}}></i>
                       </div>
                    </div>
                  </div>
                  <div className="scheduleMetting">  
                    <div style={{display: "flex", justifyContent: "space-around", justifyItems: "space-around"}}>
                       <div>
                          Scheudle Meeting
                       </div>
                       <div onClick={toggle}>
                         <i class="far fa-calendar-alt" style={{color: "#d9480f", fontSize: "20px", cursor: "pointer"}}></i>
                       </div>
                    </div>
                  </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="todayMeetting">
                <div className="mettings">
                  <p className="meetingTime">{time} A.M</p>
                  <p className="meetingDate" >{moment().format('MMMM Do YYYY')}</p>
                </div>
              </div>
              <div className="mettinglist">
                {meetingList.length <= 0 && <p style={{ color: "black" }}>No upcomming meetings today</p>}
                <Row>
                  <Col md={12}>
                    {
                      meetingList.length > 0 && (
                        <div className='product_list_card'>
                           {
                             meetingList.map((meeting, index)=>{
                               return(
                                <div className='product_list_containerHome' key={index}>
                                <div style={{textAlign: "start"}} >
                                  {meeting.name}
                                </div>
                                <div style={{ cursor: 'pointer' }}>
                                  {meeting.date}
                               </div>
                                <div>
                                  <div style={{ color: 'gray', fontSize: '0.8rem' }}>{`Start Time ${meeting.starttime}`}</div>
                                  <div style={{ color: 'gray', fontSize: '0.8rem' }}>{`End Time ${meeting.endtime}`}</div>
                                </div>
                                <div>
                                  <Button onClick={()=>history.push('/video-conference/dashborad/connect', meeting._id)} variant="outlined" color="primary" style={{ marginLeft: "10px" }}>
                                    Start
                              </Button>
                                </div>
                              </div>
                               )
                             })
                           }
                        </div>
                      )
                    }
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/*Schudele Metting*/}
      <Modal isOpen={openModel} toggle={toggle}>
        <ModalHeader toggle={toggle}>Schedule your meeting</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">Meeting Name</Label>
                  <Input type="text" name="due date" placeholder="Enter your meeting name" value={meetingName} onChange={(e) => setMeetingName(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">Date</Label>
                  <Input type="date" name="due date" placeholder="Due Date" value={selectDate} onChange={(e) => setSelectDate(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">From</Label>
                  <TextField
                    id="time"
                    type="time"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">To</Label>
                  <TextField
                    id="time"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    type="time"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleSelect">Please Select</Label>
                  <Input type="select" name="select" id="exampleSelect" onClick={(e) => setRepeat(e.target.value)}>
                    <option value="Never">Never</option>
                    <option value="Repeat">Repeat</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">ID for Meeting</Label>
                  <Input type="text" disabled={true} value={meetingDetail.meeting_id} />
                </FormGroup>
              </Col>
            </Row>
            <h5>Security</h5>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <FormControlLabel
                    label="Passcode for meeting"
                    control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                  />
                  <FormControlLabel
                    label="Add to Calendar"
                    control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">Passcode</Label>
                  <Input type="text" disabled={true} value={meetingDetail.passcode} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => { toggle(); createMeetingHandler() }}  >Create</Button>
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Join Meeting*/}
      <Modal isOpen={joinModel} toggle={toggleJoin}>
        <ModalHeader toggle={toggleJoin}>Join Meeting</ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">Meeting Link</Label>
                  <Input type="text" placeholder="Enter meeting ID or personal link name" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">Your Name</Label>
                  <Input type="text" placeholder="Enter your name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleJoin}>Join</Button>
          <Button onClick={toggleJoin}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Share Screen*/}
      <Modal isOpen={shareModel} toggle={toggleShare}>
        <ModalHeader toggle={toggleShare}>Share Screen</ModalHeader>
        <ModalBody>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleShare}>Create</Button>
          <Button onClick={toggleShare}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default MeetingHome;
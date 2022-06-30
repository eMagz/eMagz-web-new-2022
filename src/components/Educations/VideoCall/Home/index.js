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
import { BaseUrl, ImageUrl } from '../../../API';
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
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'gender', headerName: 'Gender', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('name') || ''} ${params.getValue('gender') || ''}`,
  },
];

const url = 'http://www.emagz.live'


let selectedTeacher = []
let education = 0
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
  const [studentClass, setStudentClass] = useState('');
  const [studentSection, setStudentSection] = useState('');
  const [userName, setUserName] = useState(userdetails.name);
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingDetail, setMettingDetail] = useState({});
  const [toTime, setToTime] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [meetingName, setMeetingName] = useState(`${userdetails.name}'s Emagz Meeting`);
  const [meetingList, setMeetingList] = useState([]);
  const [select, setSelection] = React.useState([]);
  const [classList, setClassList] = React.useState([]);
  const [section, setSection] = React.useState([]);
  const [selectedClass, setSelectedClass] = React.useState(null);
  const [selectedSection, setSelectedSection] = useState(null)
  const [teacherList, setTeacherList] = useState([])
  // const [selectAllTeachers, setSelectAllTeachers] = React.useState(true);
  // const [selectAllStudents, setSelectAllStudents] = React.useState(true);


  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    isSelectAllStudent: true,
    isSelectAllTeacher: true,
    isPrincipalInculded: true 
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
    Axios.get(`${BaseUrl}/view-live-class-list/${userdetails._id}`).then((res) => {
      setMeetingList(res.data.data)
    })
  }

  const getClasses = (id) =>{
    Axios.get(`${BaseUrl}/viewclasseslist/${id}`).then((res)=>{
      setClassList(res.data.data)
  
    })
  }

  const getTeachers = (id) =>{
    Axios.get(`${BaseUrl}/viewteacherlist/${id}`).then((res)=>{
      let temp = []
      res.data.data.teacherDetails.forEach((data, index)=>{
        data.id = index
        temp.push(data)
      })
      setTeacherList(temp)
    })
  }
  const getSection = () =>{
    Axios.get(`${BaseUrl}/class-wise-section/${selectedClass}`).then((res)=>{
      setSection(res.data.data)
  
    })
  }

  useEffect(() => {
    education = JSON.parse(localStorage.getItem('education'))
    getClasses(education.data.school_id)
    getTeachers(education.data.school_id)
    getMeetingList(education.data.school_id)
    Axios.get(`${BaseUrl}/generate-passcode-meetingid`).then((res) => {
      setMettingDetail(res.data)
    })
  }, [])

  useEffect(()=>{
      if(selectedClass !== null){
        getSection()
      }
  }, [selectedClass, setSelectedClass])

  const createMeetingHandler = () => {
      select.forEach((data)=>{
        let st = teacherList[data]
        selectedTeacher.push({name:st.name,user_id:st.user_id})
      })
      let selectClass = classList.filter((data)=>data._id === selectedClass)
      let selectSection = section.filter((data)=>data._id === selectedSection)

    let educationSchudle = {
    date : selectDate,
    starttime: fromTime ,
    endtime: toTime ,
    timezone: 'Kolkata',
    name: userdetails.name,
    title: meetingName,
	  user_id: userdetails._id,
    passcode: meetingDetail.passcode,
    meeting_id: meetingDetail.meeting_id,
  	classes:selectedClass,
  	section:selectedSection,
	  school:'Modern School H.S',
    teachers :  selectedTeacher
  }

    Axios.post(`${BaseUrl}/create-education-meeting`, educationSchudle).then((res) => {
      console.log("Res Comming ", res)
      Axios.post(`${BaseUrl}/update-live-class-link/${res.data.data.meeting_id}`, {meeting_link: `${url}/video-conference/joinmeeting/${res.data.data._id}`}).then((res)=>{
        console.log('Res Data', res)
      })
    })
    console.log('educationSchudle', educationSchudle)
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
              <Link to="/educations/my-profile/metting/home">
                <ListItem button>
                  <ListItemIcon>
                    <OpenInBrowserIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>

              </Link>
              <Divider />
              <Link to="/educations/my-profile/metting/mettings">
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mettings" />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/educations/my-profile/metting/contacts">
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
              <Col md={12}>
                <FormGroup>
                  <FormControlLabel
                    label="Select All Teachers"
                    control={<Checkbox checked={state.isSelectAllTeacher} onChange={handleChange} name="isSelectAllTeacher"  />}
                  />
                  { education.role !=='principal' && <FormControlLabel
                    label="Include principal"
                    control={<Checkbox checked={state.isPrincipalInculded} onChange={handleChange} name="isPrincipalInculded" />}
                  />}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form>
                <FormGroup>
                <Label for="exampleSelect">Please Select Class</Label>
                <Input type="select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                  <option>--select class--</option>
                  {
                    classList.map((data) => {
                      return <option value={data._id}>{`Class ${data.classes}`}</option>
                    })
                  }
                </Input>
              </FormGroup>
                </Form>
              </Col>
              <Col md={6}>
              <FormGroup>
                <Label for="exampleSelect">Please Select Section</Label>
                <Input type="select" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                  <option>--select section--</option>
                  {
                    section !== null && section.map((data) => {
                      return <option value={data._id}>{`Section ${data.section}`}</option>
                    })
                  }
                </Input>
              </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {
                  education.role !== 'principal' && <FormControlLabel
                    label="Select All Students"
                    control={<Checkbox checked={state.isSelectAllStudent} onChange={handleChange} name="isSelectAllStudent" />}
                  />
                }
              </Col>
            </Row>
            <Row>
              {
                !state.isSelectAllStudent && (
                <Col md={12}>
                  <h5>Please Select Student</h5>
                  <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={teacherList}
                      columns={columns}
                      pageSize={25}
                      checkboxSelection
                      hideFooterPagination
                      onSelectionModelChange={(newSelection) => {
                        setSelection(newSelection.selectionModel);
                      }}
                    />
                  </div>
                </Col>)
              }
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
            <Row>
              {
                !state.isSelectAllTeacher && (
                <Col md={12}>
                  <h5>Please Select Teacher</h5>
                  <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={teacherList}
                      columns={columns}
                      pageSize={25}
                      checkboxSelection
                      hideFooterPagination
                      onSelectionModelChange={(newSelection) => {
                      setSelection(newSelection.selectionModel);
                      }}
                    />
                  </div>
                </Col>)
              }
            </Row>
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
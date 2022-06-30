import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import Config from './config';
import Drawer from '@material-ui/core/Drawer';
import { useSelector } from "react-redux"
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import IconButton from '@material-ui/core/IconButton';
import MicIcon from '@material-ui/icons/Mic';
import { List, ListItem, ListItemIcon, ListItemText, TextField, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideocamIcon from '@material-ui/icons/Videocam';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import ScreenShareOutlinedIcon from '@material-ui/icons/ScreenShareOutlined';
import { useHistory } from "react-router-dom"
import CloseIcon from '@material-ui/icons/Close';
import OT, { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';

import Publisher from "./components/Publisher"
import Avatar from '@material-ui/core/Avatar'
import { BaseUrl, ImageUrl } from "../../API"
import Sidebar from '../Sidebar'
import swal from "sweetalert"
import socket from '../../socket';
import { truncate } from 'lodash';
import Axios from "axios"
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PeopleIcon from '@material-ui/icons/People';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatIcon from '@material-ui/icons/Chat';

let publisherEventHandlers = {}
let subscriberEventHandlers = {}
let sessionEventHandlers = {}


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
            marginTop: "460px"
        },
    },
    paper: {
        height: "85%",
    }
}));

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div>
            <h5 >{children}</h5>
          </div>
        )}
      </div>
    );
  }

let user = JSON.parse(localStorage.getItem('user'))
const VideoConf = (props) => {
  let hostUser = {
    "name": user.name,
    "image": user.image,
    "userID": user._id
  }
    
    const classes = useStyles();
    socket.emit('JoinRoom', props.location.state)
    console.log('ROOOM JOIN', props.location.state)
    //const user = useSelector(state => state.loginReducer.userDetails)
    const history = useHistory()
    const [isVideoStart, setIsVideoStart] = useState(true)
    const [mettingID, setMettingID] = useState(props.location.state)
    const [isScreenStart, setIsScreenStart] = useState(false)
    const [isOpenChat, setIsOpenChat] = useState(false)
    //const [publishVideo, setPublishVideo] = useState(true)
    const [connection, setConnection] = useState('Connecting')
    const [video, setVideo] = useState(false)
    const [error, setError] = useState('')
    const [requestUserID, setRequestUserID] = useState('')
    const [requestMessage, setRequestMessage] = useState('')
    const [userPic, setUserPic] = useState('')
    const [userName, setUserName] = useState('')
    const [userID, setUserID] = useState('')
    const [mettingUsers, setMettingUsers] = useState([])
    const [mettingList, setMettingList] = useState([])
    const [isAccepted, setIsAccepted] = useState(false)
    const [isDrawerOpened, setIsDrawerOpened] = useState(false)
    const [hostMessage, setHostMessage] = useState('')
    const [value, setValue] = React.useState(0);
    const [videoMessage, setVideoMessage] = useState([])
    console.log("video Message", hostUser)


    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const onPublish = () => {
        console.log('Publish Success');
    };

    const onPublishError = error => {
        this.setState({ error });
    };

    const onSubscribe = (data) => {
        console.log('Subscribe Success', data);
    };

    const onSubscribeError = error => {
        this.setState({ error });
    };


    publisherEventHandlers = {
        accessDenied: () => {
            console.log('User denied access to media source');
        },
        streamCreated: (data) => {
            console.log('Publisher stream created', data);
        },
        streamDestroyed: ({ reason }) => {
            console.log(`Publisher stream destroyed because: ${reason}`);
        },
        StreamDisconnected: (data) =>{
            console.log('StreamDisconnected', data);
        }
    };

    subscriberEventHandlers = {
        videoEnabled: (data) => {
            console.log('Subscriber video enabled', data);
        },
        videoDisabled: (data) => {
            console.log('Subscriber video disabled', data);
        },
    };
    sessionEventHandlers = {
        sessionConnected: () => {
            setConnection({ connection: 'Connected' });
        },
        sessionDisconnected: (data) => {
            connection('Disconnected');
            console.log('sessionDisconnected', data);
        },
        sessionReconnected: (data) => {
            setConnection('Reconnected')
            console.log('sessionReconnected', data);
        },
        sessionReconnecting: (data) => {
            setConnection('Reconnecting');
            console.log('sessionReconnecting', data);
        },
    };
    const handleVideoPage = () => {
        swal({
            title: "Are you sure?",
            text: "If you redirected then will lost your meeting!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    socket.on('disconnect', () => {
                        console.log('User disconnected')
                      });

                    let rm = mettingUsers
                    let removedUser = rm.filter((data)=>data.user_id !== user._id)
                    setMettingUsers(removedUser)
                    setIsVideoStart(false)
                    swal("You are redirected successfully!", {
                        icon: "success",
                        method: history.push('/video-conference/dashborad/home')
                    });
                } else {
                    swal("Your meeting will continue!");
                }
            });
    }
    const acceptedUser = (data) => {
        console.log("Save Accepted User List", data)
        let userRequests = {
            userRequests: [
                {
                    user_id: data.userID,
                    name: data.name,
                    image: data.image
                }
            ]
        }
        Axios.post(`${BaseUrl}/user-requests/${requestUserID}`, userRequests)
    }
    useEffect(() => {
        if (requestMessage !== '') {
            swal(`${requestMessage}`, {
                dangerMode: true,
                buttons: true,
            }).then((willDelete) => {
                console.log('willDelete', willDelete)
                if (willDelete) {
                    let acceptedMessage = {
                        RoomId: mettingID,
                        name: userName,
                        image: userPic,
                        userID: userID
                    }
                    socket.emit('SendAcceptMessage', acceptedMessage)
                    console.log('mettingUsers', mettingUsers)
                    if(mettingUsers.length>0){
                        let found = mettingUsers.find((data, index)=>{
                            if(data.user_id === acceptedMessage.userID){
                                return true
                            }
                        })
                        if(!found){
                           let u = [...mettingUsers]
                           u.push(acceptedMessage)
                           setMettingUsers(u)
                           acceptedUser(acceptedMessage)
                        }
                    }else if(mettingUsers.length === 0){
                        let u = [...mettingUsers]
                        u.push(acceptedMessage)
                        setMettingUsers(u)
                        acceptedUser(acceptedMessage)
                    }
                } else {
                    console.log('Not Acccepted')
                }
            })
        }
    }, [requestMessage, userName, userPic, userID])
    socket.on('RecieveVideoConferenceMessage', data => {
        setRequestUserID(data.RoomId)
        setRequestMessage(data.message) 
        setUserName(data.name)
        setUserPic(data.image)
        setUserID(data.user_id)
    })

    useEffect(() => {
        Axios.get(`${BaseUrl}/user-requests-list/${props.location.state}`)
            .then((res) => {
                console.log('mettingUsers', res.data.data.userRequests)
                setMettingUsers(res.data.data.userRequests)
            })
    }, [setRequestUserID, setUserID])

    

    const handleSubmit = (e)=>{
        console.log("User", user)
        e.preventDefault()
       let saveMessage = {
        RoomId: props.location.state,
        SenderId: user._id,
        SenderName:user.name,
        Message:hostMessage
       } 
       let sm = [...videoMessage]
       sm.push(saveMessage)
       setVideoMessage(sm)
      let message =  {
            message:[{
            RoomID: props.location.state,    
            SenderId: user._id,
            SenderName:user.name,
            Message:hostMessage
            }]
        }
        setHostMessage('')
        socket.emit('SendVideoMessage', saveMessage)
    }

    socket.on('RecieveVideoMessage', data=>{
        let rm = [...videoMessage]
        rm.push(data)
        setVideoMessage(rm)
        console.log('Meeting Message', data)
    })
    return (
        <>
            <div className='mainvid' >
                <div className='bodyvid' >
                    {
                        isVideoStart && (
                            <OTSession apiKey={Config.API_KEY} sessionId={Config.SESSION_ID} token={Config.TOKEN}>
                               <div>
                                   <OTPublisher
                                     properties={{ video, width: '200%', height: '100%', }}
                                     onPublish={onPublish}
                                     onError={onPublishError}
                                     PublishAudio={false}
                                     eventHandlers={publisherEventHandlers}
                                   />
                               </div>
                                <div>
                                    <OTStreams>
                                        <OTSubscriber
                                            properties={{ width: 100, height: 100 }}
                                            onSubscribe={onSubscribe}
                                            onError={onSubscribeError}
                                            eventHandlers={subscriberEventHandlers}
                                        />
                                    </OTStreams>
                                </div>
                            </OTSession>
                        )
                    }
                    {
                        isScreenStart && (
                            <OTSession apiKey={Config.API_KEY} sessionId={Config.SESSION_ID} token={Config.TOKEN}>
                                <OTPublisher
                                    properties={{
                                        publishAudio: true,
                                        publishVideo: true,
                                        videoSource: 'screen'
                                    }}
                                />
                            </OTSession>
                        )
                    }
                    {
                        isOpenChat && (<Sidebar />)
                    }
                    {/* <img className='vidimg' src='https://dwkujuq9vpuly.cloudfront.net/news/wp-content/uploads/2020/03/Home-video-call_News-MAIN-960x480.jpg' /> */}
                    {/* <div className="userProfile">
                        <div style={{ display: "block" }}>
                            <Avatar className="callingProfile" src={ImageUrl + user.image} />
                        </div>
                        <h5 style={{ color: "white" }}>{user ? user.name : ""}</h5>

                    </div> */}
                </div>
                <footer>
                    <div className='mainicon' >
                        <div className='buttonone' >
                            <IconButton style={{ color: '#A9A9A9', outline: 'none', opacity: '0.6' }} >
                                <RadioButtonCheckedIcon fontSize='small' />
                            </IconButton>
                            <p>Record</p>
                        </div>
                        <div style={{ flex: 1 }} />
                        <div className='buttontwo' >
                            <div>
                                <IconButton style={{ backgroundColor: 'rgb(25,25,25)', color: 'white', marginRight: '10px' }} >
                                    <MicIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton onClick={() => setIsVideoStart(true)} style={{ backgroundColor: 'rgb(25,25,25)', color: 'white', marginRight: '10px' }}>
                                    <VideocamIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton onClick={() => handleVideoPage()} style={{ backgroundColor: 'red', color: 'whitesmoke', marginRight: '10px' }} >
                                    <CallEndRoundedIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div style={{ flex: 1 }} />
                        <div className='buttonthree' >
                        <div>
                                <IconButton onClick={()=>{setIsDrawerOpened(!isDrawerOpened); setValue(0)}} style={{ color: 'white' }} >
                                    <PeopleIcon />
                                </IconButton>
                                <p>People</p>
                            </div>
                            <div>
                                <IconButton onClick={()=>{setIsDrawerOpened(!isDrawerOpened); setValue(1)}} style={{ color: 'white' }} >
                                    <CommentRoundedIcon />
                                </IconButton>
                                <p>Chat</p>
                            </div>
                            <div >
                                <IconButton onClick={(e) => setIsScreenStart(true)} style={{ color: 'white' }}>
                                    <ScreenShareOutlinedIcon />
                                </IconButton>
                                <p>Share Screen</p>
                            </div>
                            <div>
                                <IconButton style={{ color: 'white' }} >
                                    <MoreHorizRoundedIcon />
                                </IconButton>
                                <p>More</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            <Drawer
                className="MuiDrawer-paper"
                variant="temporary"
                open={isDrawerOpened}
                anchor="right"
                onClose={() => setIsDrawerOpened(!isDrawerOpened)}
            >

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                    <p style={{ color: "black", marginLeft: "5px", marginTop: "5px", fontSize: "20px" }} >Meeting Details</p>
                    <IconButton>
                        <CloseIcon onClick={()=>setIsDrawerOpened(!isDrawerOpened)} style={{ color: "red", marginRight: "5px", marginTop: "5px", fontSize: "30px" }} />
                    </IconButton>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab icon={<PeopleIcon style={{ color: "red", marginLeft: "5px", marginTop: "5px", fontSize: "30px" }} />} {...a11yProps(0)}>
                        </Tab>
                        <Tab icon={<ChatIcon style={{ color: "red", marginRight: "5px", marginTop: "5px", fontSize: "30px" }} />}  {...a11yProps(1)} >
                        </Tab>
                    </Tabs>
                </div>
                <div className="videoNotification">
                    {
                        mettingUsers.length > 0 && mettingUsers.map((data) => {
                            console.log("First Host Metting",data)
                            return (
                                <TabPanel value={value} index={0}>
                                <div style={{ display: "flex", padding: "0px 5px"}}>
                                    <img src={data.image} style={{ height: "40px", width: "40px", borderRadius: "50px" }} />
                                    <h5 style={{ marginTop: "8px", marginRight: "5px" }}>{data.name}</h5>
                                    <MoreVertIcon style={{ marginTop: "9px" }} />
                                </div>
                              </TabPanel>
                            )
                        })
                    }
                </div>
                <div>
                     <TabPanel value={value} index={1}>
                      {
                        videoMessage.length > 0 && videoMessage.map((data)=>{
                            return(
                                <div style={{margin: "10px 10px"}}>
                                    <p style={{color: "black", display: "block"}}><strong>{data.SenderName}</strong> {' '} <b>10:23 PM</b></p>
                                    <p style={{color: "black"}}>{data.Message}</p>
                                </div>
                            )
                        })
                      }
                        <form className={classes.root} onSubmit ={handleSubmit}>
                            <TextField
                                value={hostMessage}
                                onChange={(e) => setHostMessage(e.target.value)}
                                label="Send a message to everyone" />
                        </form>
                        </TabPanel>
                    </div>
            </Drawer>
        </>
    )
}

export default VideoConf;



















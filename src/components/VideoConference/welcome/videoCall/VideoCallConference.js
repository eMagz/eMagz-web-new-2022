import React, { useState, useEffect, useRef } from 'react'
import Icon from '@material-ui/core/Icon';
import { Button } from '@material-ui/core'
import OT, {
    OTSession,
    OTPublisher,
    OTStreams,
    OTSubscriber,
    Publisher
} from "opentok-react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import socket from '../../../socket';

import Config from '../../config'
import './videoCall.css'
import HeaderCmp from '../HeaderCmp'
import Images from '../../../../helper/Images'
import IconButtonCompnent from './IconButtonCmp'
import Setting from './Setting';
import Chatlist from './Chatlist';
import { tokboxSession, meetingRecording, getJoinUserList } from '../../redux/action/actions';
import { ref } from 'yup';



let publisherEventHandlers = {};
let subscriberEventHandlers = {};
let sessionEventHandlers = {};



const VideoCallConference = ({ match }) => {
    console.log(match.params.meeting_id)
    const history = useHistory();
    const dispatch = useDispatch();
    const meeting_id = match.params.meeting_id
    const focusRef = useRef(null);
    const candidate = [
        { uservideo: Images.profile, name: 'Jack' },
        { uservideo: Images.profile, name: 'Jacika' },
        { uservideo: Images.profile, name: 'Jacika' },
        { uservideo: Images.profile, name: 'Jack' },
        { uservideo: Images.profile, name: 'Jack' },
    ]

    const medioicon = [
        { btncss: "btncss", icon: 'fal fa-camera', type: 'camera' },
        { btncss: "btncss", icon: 'fal fa-microphone', type: 'audio' },
        { btncss: "btncss", icon: Images.ic_recorder, type: 'meetingRecording' },
        { btncss: "btncss", icon: 'fal fa-upload', type: 'screenCapture' },
        { btncss: 'disconnectCall', icon: Images.PhoneDisconnect, type: '' },
    ]
    const [streamState, setStreamState] = useState([])
    const [settingState, setSettingState] = useState(false)
    const [chatlistState, setChatlistState] = useState(false)
    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true)
    const [isScreenStart, setIsScreenStart] = useState(false);
    const [meetingRecordingState, setMeetingRecordingState] = useState(false);

    const [requestUserID, setRequestUserID] = useState("");
    const [userPic, setUserPic] = useState("");
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState("");
    const [requestMessage, setRequestMessage] = useState("");
    const [connection, setConnection] = useState("Connecting");
    const [sessionData, setSessionData] = useState();
    const onPublish = () => {
        console.log("Publish Success");
    };

    const onPublishError = (error) => {
        // this.setState({ error });
    };

    publisherEventHandlers = {
        accessDenied: () => {
            console.log("User denied access to media source");
        },
        streamCreated: (data) => {
            console.log("Publisher stream created", data);
        },
        streamDestroyed: ({ reason }) => {
            console.log(`Publisher stream destroyed because: ${reason}`);
        },
        StreamDisconnected: (data) => {
            console.log("StreamDisconnected", data);
        },
    }

    subscriberEventHandlers = {
        videoEnabled: (data) => {
            console.log("Subscriber video enabled", data);
        },
        videoDisabled: (data) => {
            console.log("Subscriber video disabled", data);
        },
    };

    sessionEventHandlers = {
        sessionConnected: () => {
            setConnection({ connection: "Connected" });
        },
        sessionDisconnected: (data) => {
            connection("Disconnected");
            console.log("sessionDisconnected", data);
        },
        sessionReconnected: (data) => {
            setConnection("Reconnected");
            console.log("sessionReconnected", data);
        },
        sessionReconnecting: (data) => {
            setConnection("Reconnecting");
            console.log("sessionReconnecting", data);
        },
    };


    const onRecord = (json) => {
        console.log(json)
    }

    const onRecording = () => {

        console.log("recording:", meetingRecordingState)

        const body = { sessionId: sessionData?.session }
        if (meetingRecordingState === true) {
            dispatch(meetingRecording({ body, onRecord }))
        }
        else {
            setMeetingRecordingState(!meetingRecordingState)
        }
    }
    const onPress = (type) => {
        console.log("dddd")
        switch (type) {
            case "camera":
                setVideo(!video)
                break;
            case "screenCapture":
                setIsScreenStart(!isScreenStart)
                break;
            case "audio":
                setAudio(!audio)
                break;
            case "meetingRecording":
                console.log("meetingRecording")
                onRecording()
                break
            default:
                break;
        }
    }
    const ontokBoxSession = (json) => {
        console.log("ontokBoxSession", json.data.data)
        setSessionData(json.data.data[0])

    }

    const onShowList = (json) => {
        console.log("joinuserList", json)
    }
    useEffect(() => {
        const value = JSON.parse(localStorage.getItem('user'));
        console.log("value", value)
        if (value === null) {
            history.push('/')
        }
        else {
            const body = { meeting_id: meeting_id };

            dispatch(tokboxSession({ body, ontokBoxSession }))

            socket.on('connection', () => {
                console.log(`I'm connected with the back-end`)
                console.log('zx', socket.id);
                console.log('conn', socket.connected)
            })
            socket.emit("JoinRoom", meeting_id)

            // dispatch(getJoinUserList({ body, onShowList }))
        }
    }, [])

    console.log("json.data.data", sessionData)
    return (

        <div className="container-xl background wrap">
            <HeaderCmp iconColor={"#000"} />

            <div className="row row-flex align-items-center justify-content-center mt-5">
                <div className="col-9 d-flex align-items-center justify-content-center">
                    <div className="videoContainer" >
                        {sessionData != null ?
                            (<OTSession
                                apiKey={sessionData.api_key}
                                sessionId={sessionData.sessionId}
                                token={sessionData.token}
                                onStreamsUpdated={() => streams => { console.log("streams", streams); setStreamState({ streams }) }}
                            >
                                <OTPublisher
                                    properties={{

                                        publishAudio: false,
                                        publishVideo: false,
                                        width: "109%",
                                        height: 285,
                                        fitMode: "cover",
                                        insertMode: "append",
                                        showControls: true,
                                    }}

                                    onPublish={onPublish}
                                    onError={onPublishError}
                                    PublishAudio={true}
                                    eventHandlers={publisherEventHandlers}
                                />

                            </OTSession>
                            )
                            : null
                        }

                    </div>
                </div>


                <div className="col-3 align-items-center row-cols-1">

                    {/* {candidate.slice(0, 2).map((item) => */}

                    <div className="multi-row">
                        {sessionData != null ?
                            (<OTSession
                                apiKey={sessionData.api_key}
                                sessionId={sessionData.sessionId}
                                token={sessionData.token} >
                                <OTStreams>
                                    <OTSubscriber
                                        properties={{
                                            publishAudio: false,
                                            publishVideo: false,
                                            fitMode: 'contain',
                                            insertMode: 'append',
                                            width: 250,
                                            height: 100,
                                            showControls: true,
                                            subscribeToAudio: true,
                                            subscribeToVideo: true
                                        }} />
                                </OTStreams>
                            </OTSession>) :
                            null}
                        {/* <label className="userName">{item.name}</label> */}
                    </div>

                    {/* )} */}
                    <div className="backColor">
                        <label onClick={() => setChatlistState(true)} className="participantstext">{`+ ${candidate.length} Participants`}</label>
                    </div>

                </div>


            </div>

            <div className="row row-flex align-item-center justify-content-start">
                <div className="adjustcol-1">
                    <div className="text3">{"09:30 AM"}</div>
                    <div className="text3">{"JNskn26"}</div>
                </div>
            </div>

            <div className="row row-flex align-item-center justify-content-center">
                <div className="mediaContainer">

                    {medioicon.map((item, index) =>
                        (index === 2 || index === 4) ? (
                            <div id={item.type} style={{ marginLeft: 10 }}>
                                <Button onClick={() => { onPress(item.type) }}>
                                    <IconButtonCompnent btnCss={item.btncss} img={item.icon} />
                                </Button>
                            </div>

                        ) :
                            (<div style={{ marginLeft: 10 }}>
                                <Button onClick={() => { onPress(item.type) }}>
                                    <IconButtonCompnent btnCss={item.btncss} iconColor="#fff" iconName={item.icon} />
                                </Button>
                            </div>
                            )

                    )}
                </div>
                <div className="iconContainer">
                    <div style={{ width: '50%', maxWidth: '80%' }}>
                        <img src={Images.ic_usergroup} style={{ width: 20, height: 20 }} />
                    </div>
                    <div style={{ width: '50%', maxWidth: '80%' }}>
                        <img onClick={() => setSettingState(true)} src={Images.ic_nut} style={{ width: 20, height: 20 }} />
                    </div>
                </div>
            </div>

            <Setting show={settingState} onHide={() => setSettingState(false)} />
            <Chatlist show={chatlistState} onHide={() => setChatlistState(false)} />

        </div>

    )
}

export default VideoCallConference;
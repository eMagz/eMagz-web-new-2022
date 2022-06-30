import React, { useEffect, useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import { userJoinsMeeting } from '../../redux/action/actions';
import IconButtonCmp from './IconButtonCmp';
import Readymeeting from './Readymeeting';

import '../index.css'

const JoinMeeting = (props) => {
    const [modalShow, setModalShow] = useState(props.show);
    const user = JSON.parse(localStorage.getItem('user'))
    console.log("user", user)
    const dispatch = useDispatch()
    const history = useHistory();
    const meetingtype = [
        { id: 1, text: "Don’t connect to audio", status: false },
        { id: 2, text: "Turn off my video", status: false },

    ]

    const [meetingId, setMeetingId] = useState()

    useEffect(() => {
    }, [])
    const onUserStatus = (json) => {
        console.log("usermeeting status", json.data)
        if (json.data.status === true)
            history.push(`/video-conference/videoCall/VideoCallConference/${meetingId}`)
        else
            alert('Please Enter Valid Data')
    }
    const onPress = () => {
        console.log("onPRess", meetingId, user)
        const body = {
            meeting_id: meetingId,
            name: user.name,
            user_id: user._id,
        }
        if (meetingId != null) {
            dispatch(userJoinsMeeting({ body, onUserStatus }))
        }
        // setModalShow(true)
    }
    return (
        modalShow === false ? (
            <Modal
                {...props}
                // size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Body>
                    <div className="model-body">
                        <div className="row">
                            <div className="col-11">
                                <h4>Join meeting</h4>
                                <label>Please enter the joining Id to enter the meeting</label>
                            </div>
                            <div className="col-1">
                                <Icon className="fal fa-question-circle" style={{ fontSize: 20, overflow: 'visible' }} />
                            </div>
                        </div>

                        <div className="row align-contents-center justify-content-center">
                            <input type="text" placeholder={user.name}
                                className="input-txt-jm" />
                        </div>

                        <div className="row mt-2 align-contents-center justify-content-center">
                            <input type="text"
                                value={meetingId}
                                onChange={(e) => setMeetingId(e.target.value)}
                                placeholder="Enter Meeting ID or link"
                                className="input-txt-jm" />
                        </div>
                        {meetingtype.map((item) =>
                            <div className="row align-contents-start align-items-center justify-content-start ml-2">
                                <input type="radio" id={item.id} name={item.status} value={item.status} />
                                <label for={item.id} style={{ marginLeft: 10, marginTop: 6 }} > {item.text}</label>
                            </div>
                        )}

                    </div>
                    <div className="row align-contents-center  justify-content-center">
                        <div className="col-6" />

                        <div className="col-6 row">
                            {/* <div onClick={() => history.push('/video-conference/videoCall/JoinMeeting')} className="col"> */}
                            {/* <div onClick={() => setModalShow(true)} className="col"> */}
                            <div onClick={() => onPress()} className="col">
                                <IconButtonCmp btnCss={"btn-join-jm"} text={"Join"} textCss={"close-btn-text"} />
                            </div>
                            <div className="col">
                                <div onClick={props.onHide}>
                                    <IconButtonCmp btnCss={"btn-cancel-jm"} text={"Cancel"} textCss={"close-btn-text"} />
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>

            </Modal>
        ) :
            (
                <Readymeeting show={modalShow}
                    onHide={() => setModalShow(false)} />
            )
    )
}
export default JoinMeeting;
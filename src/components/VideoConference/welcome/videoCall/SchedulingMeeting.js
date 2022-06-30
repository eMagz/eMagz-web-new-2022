import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import IconButtonCmp from './IconButtonCmp';
import { createMeeting } from '../../redux/action/actions'
import Readymeeting from './Readymeeting'


function SchedulingMeeting(props) {

    console.log("scheduleing props", props.show)
    const meetingtype = [
        { id: 1, text: "Make you host", name: 'make_you_host', status: false },
        { id: 2, text: "Mute participants", name: 'mute_participants', status: true },
        { id: 3, text: "Allow Particpants to join anytime", name: 'join_anytime', status: false }
    ]

    // const [meetingStatus, setMeetingStatus] = useState(meetingtype)

    const [make_you_host, setMake_you_host] = useState(false)
    const [mute_participants, setMute_participants] = useState(false)
    const [join_anytime, setJoin_anytime] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [meetingId, setMeetingId] = useState(Math.floor(100000000 + Math.random() * 900000000))

    const dispatch = useDispatch();
    const { isloading } = useSelector((state) => state.authReducers);


    const onSubmit = (e) => {
        e.preventDefault();
        var data = $("form").serializeArray();
        var body = {};
        data.forEach(n => {
            body[n['name']] = n['value']
        });
        const value = JSON.parse(localStorage.getItem('user'));
        console.log("userid", value._id)
        body['user_id'] = value._id
        dispatch(createMeeting({ body, onComplete }))
        $("form").trigger("reset");
        setMeetingId(Math.floor(100000000 + Math.random() * 900000000))
        // props.onHide()
    }
    const onComplete = (json) => {
        // localStorage.setItem("meetingstatus", json.data.data);
        // if (json.data.status === true)
        //     setModalShow(true)

        console.log("json", json)
    }

    return (
        modalShow === false ? (
            <Modal
                {...props}
                // size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Body>
                    <h4>Schedule Meeting</h4>
                    <div className="model-body">
                        <form action="#">
                            {/* --------------topic of meeting------------------------ */}
                            <div className="row">
                                <label className="lblTxt">{"Topic of meeting"}</label>
                            </div>

                            <div className="row align-contents-center justify-content-center">
                                <input name="title" type="text" className="input-txt" />
                            </div>

                            <div className="row">
                                <div className="col-9">
                                    <div className="row">
                                        <label className="lblTxt">{"Date & Time"}</label>
                                    </div>
                                    <div className="row align-contents-center justify-content-center">
                                        <input name="starttime" type="datetime-local" className="input-txt" />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="row">
                                        <label className="lblTxt">{"Duration"}</label>
                                    </div>
                                    <div className="row">
                                        <input name="duration" type="number" className="input-txt" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="row">
                                        <label className="lblTxt">{"Meeting"}</label>
                                    </div>
                                    <div className="row align-contents-center justify-content-center">
                                        <input name="meeting_id" type="text" className="input-txt" value={meetingId} />
                                    </div>
                                </div>
                            </div>


                            <div className="row ">
                                <div className="col justify-content-between">
                                    <input type="checkbox" value={make_you_host} onChange={() => setMake_you_host(!make_you_host)} name={"make_you_host"} />
                                    <label style={{ marginLeft: 10 }} >{"Make you host"}</label>
                                </div>
                                <div className="col justify-content-between">
                                    <input type="checkbox" value={mute_participants} onChange={() => setMute_participants(!mute_participants)} name={"mute_participants"} />
                                    <label style={{ marginLeft: 10 }} >{"Mute participants"}</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col justify-content-between">
                                    <input type="checkbox" value={join_anytime} onChange={() => setJoin_anytime(!join_anytime)} name={"join_anytime"} />
                                    <label style={{ marginLeft: 10 }} >{"Allow Particpants to join anytime"}</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row align-contents-center  justify-content-center">
                        <div className="col-6" />
                        <div className="col-6 row">
                            <div onClick={(e) => onSubmit(e)} className="col">
                                <IconButtonCmp btnCss={"btn-schedule"} text={"Schedule"} textCss={"close-btn-text"} />
                            </div>
                            <div className="col">
                                <div onClick={props.onHide}>
                                    <IconButtonCmp btnCss={"close-btn"} text={"Cancel"} textCss={"close-btn-text"} />
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>


            </Modal>
        ) : (
            <Readymeeting show={modalShow}
                onHide={() => setModalShow(false)} />
        )
    );
}


export default SchedulingMeeting;
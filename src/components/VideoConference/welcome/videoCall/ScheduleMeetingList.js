import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalBody } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { pendingMeetingList, pendingMeetingUpdateStatus } from '../../redux/action/actions';
import SchedulingMeeting from './SchedulingMeeting';
const ScheduleMeetingList = (props) => {
    console.log("scheduleMeetingList", props.show)
    const history = useHistory();
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(props.show);
    const [meetingData, setMeetingData] = useState([])

    const onShow = (json) => {
        // console.log("meetingList", json)
        setMeetingData(json.data.data)
        // console.log("meetingData", json.data.data)
    }
    useEffect(() => {
        const value = JSON.parse(localStorage.getItem('user'));
        console.log("value", value)
        if (value === null) {
            history.push("/")
        }
        else {
            const body = { user_id: value._id };
            console.log("userID", body)
            dispatch(pendingMeetingList({ body, onShow }))
        }
    }, [])

    const onUpdate = (json) => {
        console.log(json)
    }
    const onStart = (mid, link) => {

        const body = { meeting_id: mid };
        dispatch(pendingMeetingUpdateStatus({ body, onUpdate }))
        history.push(link)
    }
    return (
        modalShow === false ? (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className="row justify-content-center">
                        <label className="lbltitle">{"Schedule Meeting List"}</label>
                    </div>
                    {meetingData.map((item) =>
                        <div className="row justify-content-end">
                            <div className="col-9">
                                <label>{item.meeting_link}</label>
                            </div>
                            <div className="col-3">
                                <Button onClick={() => onStart(item.meeting_id, item.meeting_link)}>
                                    START
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="row justify-content-end">
                        <Button onClick={() => setModalShow(!modalShow)}>
                            SCHEDULE NEW MEETING
                        </Button>
                    </div>
                </Modal.Body >


            </Modal >

        )
            : (
                < SchedulingMeeting show={modalShow}
                    onHide={() => setModalShow(false)} />)
    )
}

export default ScheduleMeetingList;
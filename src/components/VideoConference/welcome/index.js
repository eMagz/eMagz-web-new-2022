import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import './index.module.css'
import Images from '../../../helper/Images';
import HeaderCmp from './HeaderCmp';
import IconButtonCmp from './videoCall/IconButtonCmp';
import SchedulingMeeting from './videoCall/SchedulingMeeting';
import JoinMeeting from './videoCall/JoinMeeting';
import ScheduleMeetingList from './videoCall/ScheduleMeetingList';

const WelcomeDashboard = () => {

    const { body } = useSelector((state) => state.authReducers);
    let history = useHistory();
    const dispatch = useDispatch();
    const icons = [Images.ic_house, Images.ic_chatsCircle, Images.ic_user, Images.ic_bell]
    const container = [
        {
            icon: Images.ic_video,
            lightcolor: '#2992E3',
            darkColor: '#0F0AA4',
            status: false,
            text: "New Video",
            type: 'video'
        },
        {
            icon: Images.ic_plus,
            lightcolor: '#E35B00',
            darkColor: '#FFBE4E',
            status: false,
            text: "Join",
            type: 'joinMeeting'
        },
        {
            icon: Images.ic_calendar,
            lightcolor: '#FF8DB6',
            darkColor: '#CC0022',
            status: false,
            text: "Schedule",
            type: 'scheduleMeeting'
        },
        {
            icon: Images.ic_ArrowSquareUp,
            lightcolor: '#00A498',
            darkColor: '#46F2DB',
            status: false,
            text: "New Video",
            type: 'share'
        },
    ]

    const [containerState, setContainerState] = useState(container)

    const [modalShow, setModalShow] = useState(false);
    const [joinmeetingstate, setJoingmeetingState] = useState(false);
    const onPressContainer = (index) => {
        const cstatus = [...containerState];

        cstatus.forEach(item => {
            item.status = false
        });

        cstatus[index].status = true
        setContainerState(cstatus)

        switch (index) {
            case 0:
                //history.push('/video-conference/dashborad/connect')
                history.push(`/video-conference/videoCall/VideoCallConference/${Math.random().toString(11).substring(2, 11).toUpperCase()}`)
                break;
            case 1:
                setJoingmeetingState(true)
                break;
            case 2:
                setModalShow(true)
                break;
            default:
                break;
        }

    }

    useEffect(() => {

    }, [])
    return (
        <div className="container-xl welcome_background wrap" >
            <HeaderCmp iconColor="#fff" />
            <div style={{ display: 'flex', alignItems: 'center', width: '74%', height: '80%', justifyContent: 'center', marginLeft: '19%' }}>
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <div className="col-6 align-contents-center justify-content-center">

                        <div className="container_video row align-items-center justify-content-center">
                            <label id="timelble">{"20:20 AM"}</label>
                        </div>
                        <div className="userContainer align-items-center justify-content-center">

                            <div className="col-3">
                                <img src={Images.profile} style={{ height: 30, width: 30, borderRadius: 15 }} />
                            </div>
                            <div className="col-9">
                                <div className="lbl-text-header">{"Hello : user"}</div>
                                <div className="lbl-text1">{"Good Morning"}</div>
                            </div>
                        </div>


                    </div>
                    <div className="col-6 align-contents-center justify-content-center">
                        <div className="row">
                            {containerState.map((item, index) =>
                                <div className="col-6" style={{ paddingLeft: index % 2 !== 0 ? 0 : 57 }} >
                                    <div onClick={() => onPressContainer(index)} className="icon-container" style={{ background: `linear-gradient(${item.darkColor},${item.lightcolor})` }}>
                                        <img src={item.icon} style={{ height: 29, width: 29, marginTop: 17 }} />
                                        <label className="lbl1">{item.text}</label>
                                    </div>

                                </div>

                            )}
                        </div>
                    </div>

                </div>

            </div>

            <ScheduleMeetingList show={modalShow}
                onHide={() => setModalShow(false)} />
            {/* 
            <SchedulingMeeting show={modalShow}
                onHide={() => setModalShow(false)} /> */}

            <JoinMeeting show={joinmeetingstate}
                onHide={() => setJoingmeetingState(false)}
            />
        </div>


    )
}

export default WelcomeDashboard;
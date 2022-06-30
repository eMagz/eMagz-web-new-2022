import React, { useState } from 'react'
import Images from '../../../../helper/Images';
import HeaderCmp from '../HeaderCmp';
import IconButtonCmp from './IconButtonCmp';
import AddParticipateCmp from './AddParticipateCmp';
const JoinMeetingScreen = () => {
    const [addParstate, setAddParState] = useState(false)

    return (
        <div className="container-xl background wrap">
            <HeaderCmp iconColor={"#000"} />
            <div className="row-flex  align-contents-center justify-content-center" style={{ marginTop: 10 }}>

                <div className="row row-flex align-items-center justify-content-center">
                    <div className="col-9 d-flex align-items-center justify-content-center marginTop">
                        <div className="row d-flex row-cols-1" style={{ width: '100%' }}>
                            <div className="col d-flex justify-content-center">
                                <div className="containerVideoClass">
                                    <img src={Images.profile} style={{ backgroundSize: 'cover', height: '100%', width: '100%' }} />
                                    <div className="userNametext">
                                        Jack
                                    </div>
                                </div>
                            </div>
                            <div className="col d-flex align-items-center  justify-content-center mt-4">
                                <div style={{ marginLeft: 10 }}>
                                    <IconButtonCmp btnCss={"btncss"} iconColor="#fff" iconName={"fal fa-microphone"} />
                                </div>
                                <div style={{ marginLeft: 10 }}>
                                    <IconButtonCmp btnCss={"btncss"} iconColor="#fff" iconName={"fal fa-camera"} />
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="col-3  align-items-center justify-content-center ">
                        <h4>{"Join meeting"}</h4>
                        <div className="textsub">{"Are you Ready To Join The Call"}</div>
                        <div className="row" onClick={() => setAddParState(true)} style={{ marginTop: 10 }}>
                            <IconButtonCmp btnCss={"btn-join"} text={"Join The Call"} textCss={"close-btn-text"} />
                        </div>
                        <div className="row" style={{ marginTop: 10 }}>
                            <IconButtonCmp btnCss={"btn-back"} text={"Back"} textCss={"close-btn-text"} />
                        </div>
                    </div>

                </div>

                <div className=" row d-flex row-cols-1 align-contents-center justify-content-center">
                    <div className="col  justify-content-center">
                        <label className="ml-5 timelbl">{"09:30AM"}</label>
                    </div>
                    <div className="col  justify-content-center">
                        <label className="ml-5">{"HFNO629629"}</label>
                    </div>
                </div>
            </div>
            <AddParticipateCmp show={addParstate} setAddParState={setAddParState} onHide={() => setAddParState(false)} />
        </div>
    )
}

export default JoinMeetingScreen;
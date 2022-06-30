import React, { useState } from 'react'
import Images from '../../../../helper/Images';
import HeaderCmp from '../HeaderCmp';
import IconButtonCmp from './IconButtonCmp';
import AddParticipateCmp from './AddParticipateCmp';
const WaitingScreen = () => {
    const [addParstate, setAddParState] = useState(false)

    return (
        <div className="container-xl background wrap">
            <HeaderCmp iconColor={"#000"} />

            <div className=" row-flex  align-items-center justify-content-center margintop"  >

                <div className="row row-flex align-items-center justify-content-center">

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: 200, justifyContent: 'center' }}>
                        <h4>{"Request Sent"}</h4>
                        <label>{"Please Wait Till The Admin Will Accept You In"}</label>
                        <div className="row" style={{ width: '40%', marginTop: 10 }}>
                            <div className="col-6 d-flex justify-content-end">
                                <IconButtonCmp btnCss={"btn-dark"} text={"Back"} textCss={"close-btn-text"} />
                            </div>
                            <div className="col-6 d-flex justify-content-start">
                                <IconButtonCmp btnCss={"btn-join-jm"} text={"Resend Request"} textCss={"close-btn-text"} />
                            </div>
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

        </div>

    )
}

export default WaitingScreen;
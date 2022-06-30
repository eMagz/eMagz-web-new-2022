import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, Modal } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';
import Tooltip from "@material-ui/core/Tooltip";
import Images from '../../../../helper/Images';
const Readymeeting = (props) => {
    const [Clipboard, setClipboard] = useState('https://')
    const history = useHistory();
    useEffect(() => {
        setTimeout(() => {
            props.onHide()
        }, 5000)
        // history.push('/video-conference/videoCall/JoinMeeting')
    }, [])
    return (

        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Body>
                <div className="model-body">
                    <div className="row">
                        <h4 className="lblTxt">{"Your meeting is ready"}</h4>
                        <label className="lblTxt">{"Share your link so others can join you"}</label>
                    </div>

                    <div className="row align-items-center justify-content-center">
                        <div className="input-txt row">
                            <div className="col-3">
                                <Icon className="fal fa-link" style={{ fontSize: 10, color: '#000', overflow: 'visible' }} />
                            </div>
                            <div className="col-7">
                                <label>{Clipboard}</label>
                            </div>
                            <div className="col-2">
                                <Tooltip title="Copy Text">
                                    <Icon onClick={() => navigator.clipboard.writeText(Clipboard)} className="fal fa-clone" style={{ fontSize: 10, color: '#000', overflow: 'visible' }} />
                                </Tooltip>

                            </div>
                        </div>
                    </div>

                </div>

            </Modal.Body>

        </Modal>

    )
}

export default Readymeeting;
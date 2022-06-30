import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';
import Images from '../../../../helper/Images';
const Setting = (props) => {
    const settingDetails = [
        { id: 1, icon: Images.ic_PictureInPicture, text: "Full Screen" },
        { id: 2, icon: Images.ic_WarningCircle, text: "Report a problem" },
        { id: 3, icon: Images.ic_Prohibit, text: "Report abuse" },
        { id: 4, icon: Images.ic_Wrench, text: "Troubleshooting & help" },
        { id: 5, icon: Images.ic_nut, text: "Setting" },
    ]

    return (

        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Body>
                <div className="model-body">
                    <div className="row">
                        <h4 className="lblTxt">{"Setting"}</h4>
                    </div>
                    {settingDetails.map((item) =>
                        <div className="row align-items-center justify-content-start">
                            <img src={item.icon} className="lblTxt" style={{ height: 20, width: 20 }} />
                            <label className="lblTxt" style={{ marginTop: 5 }}>{item.text}</label>
                        </div>
                    )}
                </div>

            </Modal.Body>

        </Modal>

    )
}

export default Setting;


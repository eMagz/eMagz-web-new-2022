import React from 'react'
import { Button, Modal, ModalBody } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const AddParticipateCmp = (props) => {
    const history = useHistory();
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered  >
            <Modal.Body>
                <div className="row justify-content-center">
                    <label className="lbltitle">{"Rahul wants to join the call"}</label>
                </div>
                <div className="row justify-content-end">

                    <div style={{ marginRight: 10 }}>
                        <label className="lblTextbtn"> {"Decline"}</label>
                    </div>

                    <div style={{ marginRight: 10 }}>
                        <label onClick={() => props.show === true ? (history.push('/video-conference/videoCall/Waiting')) : null} className="lblTextbtn" style={{ color: props.show === true ? 'red' : '#949494' }}> {"Accept"}</label>
                    </div>
                </div>
            </Modal.Body >

        </Modal >

    )
}

export default AddParticipateCmp;
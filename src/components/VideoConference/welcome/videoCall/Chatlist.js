import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Images from '../../../../helper/Images';
import IconButtonCmp from './IconButtonCmp';

const Chatlist = (props) => {
    const chatmember = [
        { id: 1, profile: Images.profile, name: 'Jack1 Rayson' },
        { id: 2, profile: Images.profile, name: 'Jack2 Rayson' },
        { id: 3, profile: Images.profile, name: 'Jack3 Rayson' },
        { id: 4, profile: Images.profile, name: 'Jack4 Rayson' },
        { id: 5, profile: Images.profile, name: 'Jack5 Rayson' },
        { id: 6, profile: Images.profile, name: 'Jack6 Rayson' },
    ]
    const [chatCmp, setChatCmp] = useState(false)
    const [idstate, setIdState] = useState(-1)
    const getId = (index) => {
        console.log("idstate:", index)
        setIdState(index)
        setChatCmp(true)
    }
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Body>
                <div className="model-body">
                    <div className="row align-items-center justify-content-evenly">
                        <h3 className="lblTxt">{"Setting"}</h3>
                        <span onClick={() => setChatCmp(!chatCmp)}>
                            <IconButtonCmp btnCss={"chatBtn"} img={Images.ic_rightarrow} />
                        </span>
                    </div>

                    {(chatCmp === false) ? (chatmember.map((item, index) =>
                        <div onClick={() => getId(index)} className="row">
                            <div className="col-2">
                                <img src={item.profile} style={{ height: 30, width: 30 }} />
                            </div>
                            <div className="col-10">
                                <label>{item.name}</label>
                            </div>
                        </div>
                    )) : (<>
                        <div className="row">
                            <div className="col-2">
                                <img src={chatmember[idstate].profile} style={{ height: 30, width: 30 }} />
                            </div>
                            <div className="col-10">
                                <label>{chatmember[idstate].name}</label>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <input type="text" placeholder="Type Something"
                                className="chatTxt" />
                        </div>
                    </>
                    )}
                </div>

            </Modal.Body>

        </Modal>

    )
}

export default Chatlist;
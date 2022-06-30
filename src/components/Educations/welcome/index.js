import React, { useState } from 'react'
import "./index.css"
import Images from '../../../helper/Images'

const Welcome = () => {

    const carddata = [
        {
            subject: "Student",
            description: "Continue as Student",
            bgColor: "reactbox",
            status: false

        },
        {
            subject: "Teacher",
            description: "Continue as Teacher",
            bgColor: "reactboxTwo",
            status: false
        },
        {
            subject: "Guardian",
            description: "Continue as Guardian",
            bgColor: "reactboxThree",
            status: false
        },
        {
            subject: "Principal",
            description: "Continue as Principal",
            bgColor: "reactboxFour",
            status: false
        },
    ]

    const [cardState, setCardState] = useState(carddata)
    const [state, setState] = useState(false)
    const [zoomView, setZoomView] = useState(-1)
    const onPress = (index) => {
        let cdetails = [...cardState]
        cdetails.forEach(element => {
            element.status = false
        });
        cdetails[index].status = true
        setCardState(cdetails)
        setState(true)
        console.log(cardState)


    }

    const length = cardState.length - 1
    console.log('length=zoomView', length, zoomView)
    return (
        <div className="big-image">

            <div className="d-flex flex-row">
                <div className="p-2">
                    <img src={Images.ic_frame} style={{ height: 50, width: 50 }} />
                </div>
                <div className="p-2 justify-content-center align-self-center">
                    <div className="adjust">
                        <div className="over">
                            <img src={Images.ic_logo} style={{ height: 20, width: 20 }} />
                        </div>
                    </div>
                </div>
            </div>


            <div style={{ display: 'flex', alignItems: 'center', width: '74%', height: '74%', justifyContent: 'center', marginLeft: '19%' }}>
                <div className="row justify-content-center display-grid" >
                    {cardState.map((item, index) =>
                        <div id={index} onClick={() => setZoomView(index)} className={zoomView == index ? "col-6 zoom-view" : zoomView == -1 ? "col-3" : "col-3 normal-view"}>
                            <div className={item.bgColor}>
                                <label className={"textPosition text1"}>{item.subject}</label>
                                <label className="text2Position text2">{item.description}</label>
                            </div>
                        </div>)}
                </div>
            </div>

        </div>


    )
}

export default Welcome;
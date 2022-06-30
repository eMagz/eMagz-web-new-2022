import React from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Eye from "../../../../assets/Eye.png"
import PencilSimple1 from "../../../../assets/PencilSimple1.png"
import { useHistory } from "react-router-dom"

import "./index.css"

const PaymentTable = ({ item, toggleModal, setCurrentItem, toggleViewModal }) => {
    const history = useHistory()
    return (
        <div className="vender-order-content-list"  >
            <div className="Vendor_Order-lineFlex">
                <p>{item.trId} </p>
            </div>
            <div className="Vendor_Order-lineName">
                <p className="orderProductName">{item.name}</p>
            </div>
            <div className="Vendor_Order-lineFlex">
                <p className="orderProductName">{item.date}</p>
            </div>
            <div className="Vendor_Order-lineFlex">
                <p className="orderProductName"><i class="fas fa-rupee-sign"></i> {Math.round(item.gst)}</p>
            </div>
            <div className="Vendor_Order-lineFlex"> <p><i class="fas fa-rupee-sign"></i> {Math.round(item.total)}</p></div>
            {/* <div className="Vendor_Order-lineFlex">
                < span> {item.status}</span>
            </div> */}
            <div className="Vendor_Order-lineFlex">
                <div className="vender-order-actionFlex">
                    <div className="vender-orderDetails-Eyeaction" onClick={() => {
                        toggleViewModal(); setCurrentItem(item)
                    }} >
                        <img src={Eye} />
                    </div>
                    <div className="vender-orderDetails-editIcon" onClick={() => { toggleModal(); setCurrentItem(item) }}>
                        <img src={PencilSimple1} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PaymentTable

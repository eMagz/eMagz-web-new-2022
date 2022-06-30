import React from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Eye from "../../../../assets/Eye.png"
import PencilSimple1 from "../../../../assets/PencilSimple1.png"
import { useHistory } from "react-router-dom"

import "./index.css"

const OrderList = ({ item, toggleModal, setCurrentItem, toggleViewModal, payment }) => {
    const history = useHistory()

    console.log("PAYMENT", payment)
    const handleOnClickEvent = (item) => {
        if (payment !== undefined) {
            history.push('/business/vendor-dashboard/payment/info')
        } else {
            toggleViewModal()
            setCurrentItem(item)
        }
    }
    return (
        <div className="vender-order-content-list"  >
            <div className="Vendor_Order-lineFlex">
                <p>{item.order_id} </p>
            </div>
            <div className="Vendor_Order-lineName">
                <p className="orderProductName">{item.name}</p>
            </div>
            <div className="Vendor_Order-lineFlex ">
                <p className="orderProductName">{item.quantity}</p>
            </div>
            <div className="Vendor_Order-lineFlex">
                <p className="orderProductName">{Math.round(item.gst_amount)}</p>
            </div>
            <div className="Vendor_Order-lineFlex"> <p>{Math.round(item.total_price)}</p></div>
            <div className="Vendor_Order-lineFlex">
                < span className={item.status === 'Delivered' ? 'Delivered' : item.status === 'Cancelled' ? 'Cancelled' : item.status === 'Pending' ? 'Pending' : item.status === 'Dispatch' ? 'Dispatch' : ''} > {item.status}</span>
            </div>
            <div className="Vendor_Order-lineFlex">
                <div className="vender-order-actionFlex">
                    <div className="vender-orderDetails-Eyeaction" onClick={() => handleOnClickEvent(item)} >
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

export default OrderList

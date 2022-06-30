import React from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Eye from "../../../../assets/Eye.png"
import { useHistory } from "react-router-dom"
import PencilSimple1 from "../../../../assets/PencilSimple1.png"
import "./index.css"

const CouponTable = ({ item }) => {

    const history = useHistory()
    return (
        <div className="vender-payment-content-list"  style={{border:"1px solid #DED9D9",backgroundColor: "#FFFFFF",width:"100%",height:"88px"}}>
            <div className="Vendor_Order-lineName">
                <p>{item.code} </p>
            </div>
            <div className="Vendor_payment-lineFlex">
                <p style={{ textAlign: "center" }}>{item.value} </p>
            </div>
            <div className="Vendor_Order-lineName">
                <p>{item.startTime} </p>
            </div>
            <div className="Vendor_Order-lineName">
                <p>{item.endTime} </p>
            </div>
            <div className="Vendor_payment-lineFlex couponApplied__np">
                <span>{item.applyedUsers} </span>
            </div>
            <div className="Vendor_payment-lineFlex couponApplied__status">
                <span className={item.status == 'OnGoing' ? 'OnGoingColor' : item.status == 'Hold' ? 'holdColor' : item.status == 'Experid' ? 'experidColor' : ''}>{item.status} </span>
            </div>
            <div className="Vendor_Order-lineName">
                <div className="vender-order-actionFlex">
                    <div className="vender-orderDetails-Eyeaction" onClick={() => history.push('/business/vendor-dashboard/coupons/view-coupon')} >
                        <img src={Eye} />
                    </div>
                    <div className="vender-orderDetails-editIcon" onClick={() => history.push('/business/vendor-dashboard/coupons/add-new-coupon')}>
                        <img src={PencilSimple1} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CouponTable

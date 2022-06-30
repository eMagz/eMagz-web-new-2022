import React from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Eye from "../../../../assets/Eye.png"
import PencilSimple1 from "../../../../assets/PencilSimple1.png"
import "./index.css"

const PaymentDetailsTable = ({ item }) => {


    return (
        <div className="vender-payment-content-list"  >
            <div className="Vendor_payment-lineFlex">
                <p>{item.data} </p>
            </div>
            <div className="Vendor_payment-particular">
                <p className="paymentName">{item.particular}</p>
            </div>
            <div className="Vendor_payment-lineFlex Vendor_payment-price">
                <i class="fas fa-rupee-sign"></i>  <p className="paymentName">{item.amount}</p>
            </div>
        </div>
    )
}

export default PaymentDetailsTable

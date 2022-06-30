import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import "./index.css"
import TopNavbar from '../TopNavbar'
import VendorMenu from '../VendorMenu'
import g3 from "../../../../assets/s1.jpeg"
import MagnifyingGlass from "../../../../assets/MagnifyingGlass.png"
import filterIcon from "../../../../assets/filterIcon.png"
import ProductType from "../Orders/OrderList"
import axios from "axios"
import { BaseUrl } from "../../../API"
import { Collapse } from "reactstrap";
import PaymentDetailsTable from './PaymentDetailsTable';

const sampleData = [
    { data: '12-04-2021', particular: 'Recived Payment From eMagz', amount: 499.00 },
    { data: '12-04-2021', particular: 'Recived Payment From eMagz', amount: 499.00 },
    { data: '12-04-2021', particular: 'Recived Payment From eMagz', amount: 499.00 },
    { data: '12-04-2021', particular: 'Recived Payment From eMagz', amount: 499.00 },
    { data: '12-04-2021', particular: 'Recived Payment From eMagz', amount: 499.00 },
    { data: '12-04-2021', particular: 'Recived Payment From eMagz', amount: 499.00 },
]


const PaymentDetails = ({ history }) => {
    const [isLoading, isSetLoading] = useState(false)
    const [orderedProducts, setOrderedProducts] = useState([])
    const [clickedBtn, setClickedBtn] = useState('All Order')
    const [filterRangePriceTrack, setFilterRangePriceTrack] = useState('Below 500')
    const [currentItem, setCurrentItem] = useState({})
    const [filterTag, setFilterTag] = useState('')

    const [filterPrice, setFilterPrice] = useState(false)
    const [orderViewModal, setOrderViewModal] = useState(false)
    const { loginReducer, vendorReducer } = useSelector((state) => ({ ...state }))
    const { userDetails } = loginReducer
    const { vendorDetails } = vendorReducer
    console.log("vendor detail",vendorDetails);

    const [open, setOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false)


    const toggleModal = () => setOpen(!open)
    const toggleFilterModal = () => setIsFilterOpen(!isFilterOpen)
    const togglePrice = () => setFilterPrice(!filterPrice)
    const toggleViewModal = () => setOrderViewModal(!orderViewModal)

    const handleFilterChange = (event) => {
        setFilterTag(event.target.value);
    };

    const getOrderedProducts = () => {
        let tempData = []
        isSetLoading(true)
        axios.get(`${BaseUrl}/vendor-order-list/${vendorDetails[0]._id}`).then((res) => {
            res.data.data.forEach((item) => {
                tempData.push(item.order)
            })
            setOrderedProducts(tempData)
            isSetLoading(false)
        })
    }
    useEffect(() => {
        getOrderedProducts()
    }, [])

    const handlePrice = (e) => {
        console.log("currentItem", e.target.value)
    }
    return (
        <>
            <div className="vendorManiContainer">
                <div className="vendorManiWrapper">
                    <VendorMenu />
                    <div className="productMainContent">
                        <div className="vendorMainWrapper">
                            <TopNavbar products="Products" products="Payment" />
                            <div className="VendorpaymentDetails__Contentcontainer">
                                <div className="VendorpaymentDetails__container">
                                    <h3 className="VendorPaymentDetails__heading">View Payment Details</h3>
                                    <div className="VendorpaymentDetails__heading">
                                        <h3>Transaction ID</h3>
                                        <p>Md Riyaz Ansari</p>
                                    </div>
                                </div>
                                <div className="dashBoredOrder">
                                    <div className="vendorDashBoradOrderHeadingOrder">
                                        <div className="Vendor_payment-lineFlex"> <p>Date</p></div>
                                        <div className="Vendor_payment-particular"> <p>Particular</p></div>
                                        <div className="Vendor_payment-lineFlex"><p>Amount</p></div>
                                    </div>
                                    <div className="payment-list-container">
                                        {sampleData.map((item) => (
                                            <PaymentDetailsTable item={item} />
                                        ))}
                                    </div>
                                </div>
                                <div className="order-payment__total">
                                    <h3>Total</h3>
                                    <span> <i class="fas fa-rupee-sign"></i> 50,000.00</span>
                                </div>
                                <div className="addproductdetails__containerBtn" style={{ padding: '1rem 0' }} >
                                    <button className="addproduct__btn-cancel addDetails__btn-cancel holdText" style={{ backgroundColor: "#000000" }} onClick={() => history.push('/business/vendor-dashboard/payment')} >Cancel</button>
                                    <button className="addproduct__btn-add addDetails__btn-cancel holdText" style={{ backgroundColor: "#1943D8" }}>Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </>
    )
}

export default PaymentDetails

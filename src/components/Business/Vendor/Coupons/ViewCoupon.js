import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import "./index.css"
import TopNavbar from '../TopNavbar'
import VendorMenu from '../VendorMenu'
import g3 from "../../../../assets/s1.jpeg"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#000000',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        borderRadius: '15px'
    },
}));


const ViewCoupon = ({ history }) => {
    const classes = useStyles();
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const toggleFilterModal = () => setIsFilterOpen(!isFilterOpen)


    return (
        <>
            <div className="vendorManiContainer">
                <div className="vendorManiWrapper">
                    <VendorMenu />
                    <div className="productMainContent">
                        <div className="vendorMainWrapper">
                            <TopNavbar products="Products" products="Coupon" />
                            <div className="addNewCoupon__Maincontainer">
                                <div classname="addNewCoupon__heading">
                                    <h3 className="addNewCoupon__headingText">Coupon list &gt; View Coupon</h3>
                                </div>
                            </div>
                            <div className="viewCoupon__container">
                                <div className="viewCoupon__couponLogo">
                                    <div className="coupon_container couponRotate">
                                        <div className="couponTextContainer">
                                            <div className="couponDescription">
                                                <h3>Coupon Code</h3>
                                                <p>n today’s tutorialt truly</p>
                                                <span className="couponDate">22/08/2021</span>
                                                <div className="Clipcontainer">
                                                    <span className="couponCode">DGJHK534</span>
                                                </div>
                                            </div>
                                            <div className="coupon__line"></div>
                                            <div className="percentText">
                                                <span>25%</span>
                                                <p>off</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="viewCoupon__couponDetailsContainer">
                                    <div className="viewCoupon__couponDetails1">
                                        <div className="viewCoupon__name">
                                            <h3>Coupon Code</h3>
                                            <p>DFJGK5K567</p>
                                        </div>
                                        <div className="viewCoupon__name">
                                            <h3>Coupon Value</h3>
                                            <p>500</p>
                                        </div>
                                        <div className="viewCoupon__name">
                                            <h3>Color</h3>
                                            <span className="viewCoupon__colorStatus"></span>
                                        </div>
                                    </div>
                                    <div className="viewCoupon__couponDetails2">
                                        <div className="viewCoupon__name">
                                            <h3>Select Category</h3>
                                            <p>Clothing Accessories</p>
                                        </div>
                                        <div className="viewCoupon__name" style={{marginRight: "-35px",marginTop: "5px"}}>
                                            <h3>Select Sub Category</h3>
                                            <p>Clothing Accessories</p>
                                        </div>
                                    </div>
                                    <div className="viewCoupon__couponDetails3">
                                        <div className="viewCoupon__name">
                                            <h3>Applied From</h3>
                                            <div className="viewCoupon__date">
                                                <p>15 | 07 | 21</p>
                                                <p>05: 30 AM</p>
                                            </div>
                                        </div>
                                        <div className="viewCoupon__name" style={{marginRight: "118px"}}>
                                            <h3>Expire Date</h3>
                                            <div className="viewCoupon__date">
                                                <p>15 | 07 | 21</p>
                                                <p>05: 30 AM</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="viewCoupon__couponDetails4">
                                        <div className="viewCoupon__name">
                                            <h3>Discount Type</h3>
                                            <p>40%</p>
                                        </div>
                                        <div className="viewCoupon__name">
                                            <h3>Maximum users</h3>
                                            <p>500</p>
                                        </div>
                                        <div className="viewCoupon__name" style={{marginTop: "-27px"}}>
                                            <h3>Status</h3>
                                            <span className="viewCoupon__status">OnGoing</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-productModal__btn-Container viewCouponBtn">
                                <button className="order-productModal__viewDetails viewCouponBtn1">Delete Coupon</button>
                                <button className="order-productModal__updateStatus viewCouponBtn2" onClick={toggleFilterModal}>Update Status</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
            <Modal aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isFilterOpen}
                onClose={toggleFilterModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={isFilterOpen}>
                    <div className={classes.paper}>
                        <div className="order-productFilterModal__wrapper">
                            <div className="order-productFilterModal__container">
                                <div className="order-productModal__heading">
                                    <h3>Quick Edit</h3>
                                    <p onClick={() => toggleFilterModal()}>X</p>
                                </div>
                                <div className="order-productModal__filterTags">
                                    <div className="viewCoupon__update">
                                        <div className="viewCoupon__input">
                                            <p>Coupon Code</p>
                                            <input />
                                        </div>
                                        <div className="viewCoupon__input">
                                            <p>Coupon Code</p>
                                            <input />
                                        </div>
                                    </div>
                                    <div className="viewCoupon__update">
                                        <div className="viewCoupon__select">
                                            <p>Discount Type</p>
                                            <select className="viewCoupon__selectContent">
                                                <option value="volvo">Delivered</option>
                                                <option value="saab">Dispatch</option>
                                                <option value="opel">Pending</option>
                                                <option value="audi">Cancelled</option>
                                            </select>
                                        </div>
                                        <div className="viewCoupon__select">
                                            <p>Status</p>
                                            <select className="viewCoupon__selectContent">
                                                <option value="volvo">Delivered</option>
                                                <option value="saab">Dispatch</option>
                                                <option value="opel">Pending</option>
                                                <option value="audi">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-productModal__btn-Container" style={{ marginTop: "3rem" }}>
                                    <button className="order-productModal__viewDetails">View Details</button>
                                    <button className="order-productModal__updateStatus" >Update Status</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}
export default ViewCoupon

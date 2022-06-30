import React, { useEffect, useState } from 'react'
import "./index.css"
import TopNavbar from './TopNavbar'
import VendorMenu from './VendorMenu'
import axios from "axios"

const VendorProfile = ({ history }) => {
    return (
        <>
            <div className="vendorManiContainer">
                <div className="vendorManiWrapper">
                    <VendorMenu />
                    <div className="productMainContent">
                        <div className="vendorMainWrapper">
                            <TopNavbar products="Products" products="Profile" />
                            <div className="addNewCoupon__Maincontainer">
                                <div className="vendorPrifle__heading">
                                    <h3>My Account</h3>
                                    <div className="vendorPrifle__btnContainer">
                                        <button className="vendorPrifle__btnCustomerView">Customer View</button>
                                        <button className="vendorPrifle__btnEditProfile">Edit Profile</button>
                                    </div>
                                </div>
                                <div className="vendorPrifle__detailsContainer">
                                    <div className="vendorPrifle__personalDetails">
                                        <h3>Personal Details</h3>
                                        <div className="vendorPrifle__inputContainer">
                                            <div className="vendorPrifle__inputBox">
                                                <p>Name</p>
                                                <span>Md Riyaz Kazmi</span>
                                            </div>
                                            <div className="vendorPrifle__inputBox">
                                                <p>E-mail</p>
                                                <span>mdriyazkazmi@gmail.com</span>
                                            </div>
                                            <div className="vendorPrifle__inputBox">
                                                <p>Phone no</p>
                                                <span>+91 6201031126</span>
                                            </div>
                                        </div>
                                        <div className="vendorPrifle__addressContainer">
                                            <p>Address</p>
                                            <span>Bardih, Po + Ps - Sikandra, Dist- Jamui, Bihar, pin-811315</span>
                                        </div>
                                        <div className="vendorPrifle__inputContainer">
                                            <div clasName="vendorPrifle__inputBox">
                                                <p>City</p>
                                                <span>Jamui</span>
                                            </div>
                                            <div className="vendorPrifle__inputBox">
                                                <p>State</p>
                                                <span>Bihar</span>
                                            </div>
                                            <div className="vendorPrifle__inputBox">
                                                <p>Pin Code</p>
                                                <span>811315</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vendorPrifle__businessDetails"></div>
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


export default VendorProfile

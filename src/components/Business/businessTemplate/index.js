import React, { useState, useEffect } from 'react'
import { BaseUrl, ImageUrl } from '../../API';
import axios from "axios"
import './index.css'
import ShareIcon from '@material-ui/icons/Share'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import UserHeader from '../User/Header';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CallIcon from '@material-ui/icons/Call';
import RoomIcon from '@material-ui/icons/Room';
import EditIcon from '@material-ui/icons/Edit';
import ShopIcon from '@material-ui/icons/Shop';
import Rating from '@material-ui/lab/Rating';

import { withStyles } from '@material-ui/core/styles';
import companyLogo from "../../../assets/logo.jpg"
import { useHistory } from "react-router-dom"
import ProductInfo from './productInfo/ProductInfo';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

const BusinessProfile = (props) => {
    const [vendordetails, setVendorDetails] = useState([]);
    const history = useHistory()

    useEffect(() => {
        sellerInfo();
    }, [])
    const sellerInfo = () => {

        axios.get(`${BaseUrl}/vendor-info/${props.match.params.id}`).then(
            res => {
                console.log('rt', res)
                setVendorDetails(res.data.data);
            }
        )
    }
    const { logo, banner, avgratings, business_address, address, email, mobile, business_name } = vendordetails
    console.log('Data==============', vendordetails)
    return (
        <>
            <UserHeader />
            <div className="profileContainer">
                <div className="image_head">
                    <div className="heading">
                        <img src={vendordetails.logo} className="logoImage" />
                        <h1 className="company_Name">{business_name}</h1>
                        <ShareIcon className="share_Icon" />
                    </div>
                    <div className="rating">
                        <span className="total-rate">
                            <span className="value-rate">{avgratings}</span>
                        </span>
                        <span className="circle23">
                            <Rating name="read-only" value={4.5} readOnly />
                        </span>
                        <span className="votes">
                            <span className="value_votes">10</span>
                            <span>Votes</span>
                        </span>
                        <span className="address">
                            <LocationOnIcon className="locationIcon" />
                            <span>{business_address}</span>
                        </span>
                        <span className="contact">
                            <span className="email_contact">
                                <MailOutlineIcon style={{ marginRight: "10px" }} />
                                <span className="email-text">{email}</span>
                            </span>
                            <span className="phone">
                                <CallIcon style={{ marginLeft: "15px" }} />
                                <span className="phone-text">+91 {`${mobile}`}</span>
                            </span>
                        </span>
                    </div>
                    <div className="iconsContainer">
                        <div className="iconList">
                            <div className="indIcon">
                                <RoomIcon />
                                <span style={{ display: "block" }}>Map</span>
                            </div>
                            <div className="indIcon">
                                <AddShoppingCartIcon style={{ marginLeft: "15px" }} />
                                <span style={{ display: "block", pointer: "cursor" }}>Edit Profile</span>
                            </div>
                            <div className="indIcon">
                                <ShopIcon style={{ marginLeft: "25px" }} />
                                <span style={{ display: "block" }}>Shop Now</span>
                            </div>
                        </div>
                        <div className="totalProducts">
                            <div>
                                <span>Categories <span style={{ marginLeft: "5px" }}>12</span></span>
                                <span style={{ marginLeft: "5px" }}>Products <span>459</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductInfo />
        </>
    )
}

export default BusinessProfile

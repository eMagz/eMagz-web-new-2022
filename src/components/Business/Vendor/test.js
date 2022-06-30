import React from 'react'
import "./index.css"
import HomeIcon from '@material-ui/icons/Home';
import BellSimple from "../../../assets/BellSimple.png"
import CreditCard from "../../../assets/CreditCard.png"
import CircleLogo from "../../../assets/CircleLogo.png"
import blueLogo from "../../../assets/blueLogo.png"
import Ticket from "../../../assets/Ticket.png"
import TShirt from "../../../assets/TShirt.png"
import User from "../../../assets/User.png"
import Vector from "../../../assets/Vector.png"
import Package from "../../../assets/Package.png"
import logout from "../../../assets/logout.png"
import Home from "../../../assets/Vector.svg"
import g3 from "../../../assets/g3.png"
import MagnifyingGlass from "../../../assets/MagnifyingGlass.png"
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const testData = [
    {
        image: g3,
        name: 'Sony headset',
        order: 'SHY25485A',
        date: '12-jun-2021',
        amount: 4599,
        status: 'Pending',
    },
    {
        image: g3,
        name: 'Sony headset',
        order: 'SHY25485A',
        date: '12-jun-2021',
        amount: 4599,
        status: 'Pending',
    },
    {
        image: g3,
        name: 'Sony headset',
        order: 'SHY25485A',
        date: '12-jun-2021',
        amount: 4599,
        status: 'Pending',
    },
]


const Index = () => {
    return (
        <div className="vendorManiContainer">
            <div className="vendorManiWrapper">
                <div className="vendorMainMenu">
                    <div>
                        <img src={blueLogo} />
                    </div>
                    <div className="dashBoradIconsContainer">
                        <div>
                            <img src={CircleLogo} />
                        </div>
                        <div>
                            <HomeIcon className="vendorHomeIcon" />
                        </div>
                        <div>
                            <img src={TShirt} />
                        </div>
                        <div >
                            <img src={Package} />
                        </div>
                        <div>
                            <img src={Ticket} />
                        </div>
                        <div>
                            <img src={CreditCard} />
                        </div>
                    </div>
                    <div>
                        <img src={logout} />
                    </div>
                </div>
                <div className="vendorMainContent">
                    <div className="vendorMainWrapper">
                        <div className="dashBoredNav">
                            <div className="dashBoredNavUserInfo" >
                                <h1>Hey, Kazmi</h1>
                                <p>Good morning</p>
                            </div>
                            <div className="dashBoredNavUserSearch">
                                <div className="VendorSearchWithIcon">
                                    <img src={MagnifyingGlass} />
                                    <input className="vendorSearch" placeholder="search" />

                                </div>
                                <div>
                                    <NotificationsNoneIcon className="vendorNotification" />
                                </div>
                                <div>
                                    <PersonIcon className="vendorNotification" />
                                </div>

                            </div>
                        </div>
                        <div className="dashBoredGraph">
                            <div className="profitGraph"></div>
                            <div className="totalIncome"></div>
                            <div className="totalOrder"></div>
                            <div className="orderPending"></div>
                            <div className="orderDelivered"></div>
                        </div>
                        <div className="dashBoredOrder">
                            <div className="Vendor_Order-status">
                                <h1>Order Status</h1>
                                <p>View Details</p>
                            </div>
                            <div className="vendorDashBoradOrderHeading">
                                <p>Product</p>
                                <p className="vendorDashBoradOrderHeadingName">Product Name</p>
                                <p>Order Id</p>
                                <p>Order Date</p>
                                <p>Amount</p>
                                <p>Status</p>
                                <p>Action</p>
                            </div>
                            <div className="vender-order-container">
                                {testData.map((item) => (
                                    <div className="vender-order-content">
                                        <div className="orderProductImg">
                                            <img src={item.image} />
                                        </div>
                                        <p className="orderProductName">{item.name}</p>
                                        <p>{item.order}</p>
                                        <p>{item.date}</p>
                                        <p>{item.amount}</p>
                                        <span>{item.status}</span>
                                        <div className="vender-order-action">
                                            <div className="vender-order-Eyeaction">
                                                <VisibilityIcon className="eyeVendorIcon" />
                                            </div>
                                            <div className="vender-order-Deleteaction">
                                                <DeleteOutlineIcon className="deleteVendorIcon" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Index

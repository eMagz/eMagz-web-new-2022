import React, { useEffect, useState } from "react";
import "./index.css";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";

import HomeIcon from "@material-ui/icons/Home";
import BellSimple from "../../../assets/BellSimple.png";
import CreditCard from "../../../assets/CreditCard.png";
import CircleLogo from "../../../assets/CircleLogo.png";
import blueLogo from "../../../assets/blueLogo.png";
import Ticket from "../../../assets/Ticket.png";
import TShirt from "../../../assets/TShirt.png";
import User from "../../../assets/User.png";
import Vector from "../../../assets/Vector.png";
import Package from "../../../assets/Package.png";
import logout from "../../../assets/logout.png";
import Home from "../../../assets/Vector.svg";
import g3 from "../../../assets/g3.png";
import deleteIcon from "../../../assets/deleteIcon.png";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Headphone from "../../../assets/headphone.jpg";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Table from "./Table";
import VendorMenu from "./VendorMenu";
import eyeIcon from "../../../assets/eye_icon.svg";
import trashIcon from "../../../assets/trash_icon.svg";
import TopNavbar from "./TopNavbar";
import axios from "axios";
import { api } from "../../API";

const dummyData = [
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation result ",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation result",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation result",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation result",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation result",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation result ",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation result ",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluationy result",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation result ",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation result",
    status: "Payment",
    time: "2min",
  },
];

const Index = ({ history }) => {
  const [isLoading, isSetLoading] = useState(false);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [isNotificationClicked, setIsNotificationClicked] = useState(false);
  const { loginReducer, vendorReducer } = useSelector((state) => ({
    ...state,
  }));
  const { userDetails } = loginReducer;
  const { vendorDetails } = vendorReducer;

  const toggleNotification = () =>
    setIsNotificationClicked(!isNotificationClicked);

  const getOrderedProducts = () => {
    let tempData = [];
    isSetLoading(true);
    console.log("vendor details: ", vendorDetails);
    if (vendorDetails.length > 0) {
      api
        .get(`/vendor-sold-products-list/${vendorDetails[0]._id}`)
        .then((res) => {
          console.log("sold products list: ", res);
          res.data.data.forEach((item) => {
            tempData.push(item.order);
          });
          setOrderedProducts(tempData);
          isSetLoading(false);
        });
    }
  };
  useEffect(() => {
    getOrderedProducts();
  }, [vendorDetails]);

  return (
    <>
      <div className="vendorManiContainer">
        <div className="vendorManiWrapper">
          <VendorMenu />
          <div className="vendorMainContent">
            <div className="vendorMainWrapper">
              {/* <TopNavbar toggleNotification={toggleNotification} /> */}
              <TopNavbar
                pageHeading="Dashboard"
                // toggleNotification={toggleNotification}
                headingColor="white"
              />
              <div className="dashBoredGraph">
                <div className="profitGraph"></div>
                <div className="totalIncome">
                  <div className="totalIncome__data">
                    <h3>700k</h3>
                    <p>Total Income</p>
                  </div>
                </div>
                <div className="totalOrder">
                  <div className="totalIncome__data">
                    <h3>430</h3>
                    <p>Total order</p>
                  </div>
                </div>
                <div className="orderPending">
                  <div className="orderPending__data">
                    <h3>40</h3>
                    <p>Order Pending</p>
                  </div>
                </div>
                <div className="orderDelivered">
                  <div className="orderPending__data">
                    <h3>120</h3>
                    <p>Order Delivered</p>
                  </div>
                </div>
              </div>
              <div className="dashBoredOrder">
                <div className="Vendor_Order-status">
                  <h1>Order Status</h1>
                  <p>View Details</p>
                </div>
                <div className="vendorDashBoradOrderHeading">
                  <div className="Vendor_Order-lineImg">
                    {" "}
                    <p>Product</p>
                  </div>
                  <div className="Vendor_Order-lineName">
                    {" "}
                    <p>Product Name</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    <p>Order Id</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>Order Date</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>Amount</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>Order Status</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    <p>Action</p>
                  </div>
                </div>
                <div className="vender-order-container">
                  <div className="vender-order-item1">
                    <img src={Headphone} />
                  </div>
                  <div className="vender-order-item2">
                    <p>Sony Headset</p>
                  </div>
                  <div className="vender-order-item3">
                    <p>SHY25485A</p>
                  </div>
                  <div className="vender-order-item3">
                    <p>12-jun-2021</p>
                  </div>
                  <div className="vender-order-item5">
                    <p>₹ 5999</p>
                  </div>
                  <div className="vender-order-item6">
                    <p>Dispatch</p>
                  </div>
                  <div className="vender-order-item7">
                    <div className="eye">
                      <img src={eyeIcon} alt="" />
                    </div>
                    <div className="delete">
                      <img src={trashIcon} alt="" />
                    </div>
                  </div>

                  {/* {isLoading ? (
                    <>
                      <h1>...Loading</h1>
                    </>
                  ) : orderedProducts.length > 0 ? (
                    <>
                      {Array(2)
                        .fill(2)
                        .map((item, index) => (
                          <Table item={orderedProducts[index]} />
                        ))}
                    </>
                  ) : (
                    <>
                      <h1>Empty</h1>
                    </>
                  )} */}
                </div>

                <div className="vender-order-container">
                  <div className="vender-order-item1">
                    <img src={Headphone} />
                  </div>
                  <div className="vender-order-item2">
                    <p>Sony Headset</p>
                  </div>
                  <div className="vender-order-item3">
                    <p>SHY25485A</p>
                  </div>
                  <div className="vender-order-item3">
                    <p>12-jun-2021</p>
                  </div>
                  <div className="vender-order-item5">
                    <p>₹ 5999</p>
                  </div>
                  <div className="vender-order-item6">
                    <p>Dispatch</p>
                  </div>
                  <div className="vender-order-item7">
                    <div className="eye">
                      <img src={eyeIcon} alt="" />
                    </div>
                    <div className="delete">
                      <img src={trashIcon} alt="" />
                    </div>
                  </div>

                  {/* {isLoading ? (
                    <>
                      <h1>...Loading</h1>
                    </>
                  ) : orderedProducts.length > 0 ? (
                    <>
                      {Array(2)
                        .fill(2)
                        .map((item, index) => (
                          <Table item={orderedProducts[index]} />
                        ))}
                    </>
                  ) : (
                    <>
                      <h1>Empty</h1>
                    </>
                  )} */}
                </div>
                <div
                  className="viewMore"
                  onClick={() =>
                    history.push("/business/vendor-dashboard/orders")
                  }
                >
                  {/* <p>View More</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isNotificationClicked && (
        <div className="vendorNotification__container">
          <div className="vendorNotification__mainContent">
            <div className="vendorNotification__header">
              <h3>Notification</h3>
            </div>
            <div className="vendorNotification__content">
              <div className="vendorNotification__Notificationcontent">
                {dummyData.map((item) => (
                  <div className="vendorNotification__NotificationData">
                    <div className="vendorNotification__img">
                      <img src={item.image} />
                    </div>
                    <div className="vendorNotification__desc">
                      <p>{item.desc}</p>
                    </div>
                    <div className="vendorNotification__status">
                      <span>{item.status}</span>
                    </div>
                    <div className="vendorNotification__time">
                      <p>{item.time}</p>
                    </div>
                    <div className="vendorNotification__deleteIcon">
                      <img src={deleteIcon} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;

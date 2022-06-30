import React, { useState } from "react";
import "./index.css";
import deleteIcon from "../../../assets/deleteIcon.png";
import g3 from "../../../assets/g3.png";
import MagnifyingGlass from "../../../assets/MagnifyingGlass.png";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import PersonIcon from "@material-ui/icons/Person";
import User from "../../../assets/User.png";
import BellSimple from "../../../assets/BellSimple.png";
import BellWhite from "../../../assets/bell_icon_white.svg";
import UserWhite from "../../../assets/user_white.svg";
import Badge from "@material-ui/core/Badge";
import { useHistory } from "react-router-dom";
const dummyData = [
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation. result is evaluated eagerly",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation. result is evaluated eagerly",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation. result is evaluated eagerly",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation. result is evaluated eagerly",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation. result is evaluated eagerly",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation. result is evaluated eagerly",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation. result is evaluated eagerly",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation. result is evaluated eagerly",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation. result is evaluated eagerly",
    status: "Payment",
    time: "2min",
  },
  {
    image: g3,
    desc: "so useful because they allow lazy evaluation. result is evaluated eagerly",
    status: "Payment",
    time: "2min",
  },
];
const TopNavbar = ({ pageHeading, headingColor }) => {
  const history = useHistory();
  const [isNotificationClicked, setIsNotificationClicked] = useState(false);
  const toggleNotification = () =>
    setIsNotificationClicked(!isNotificationClicked);
  return (
    <>
      <div className="dashBoredNav">
        {pageHeading != undefined ? (
          <>
            <h3
              className={
                headingColor == "white"
                  ? "pageHeading white"
                  : "pageHeading black"
              }
            >
              {pageHeading}
            </h3>
            {console.log("pageHeading: ", pageHeading)}
          </>
        ) : (
          <>
            <div className="dashBoredNavUserInfo">
              <h1>Hey, Kazmi</h1>
              <p>Good morning</p>
            </div>
          </>
        )}
        <div className="dashBoredNavUserSearch">
          <div className="VendorSearchWithIcon">
            <img src={MagnifyingGlass} />
            <input
              className={
                pageHeading != null ? "vendorSearchProduct" : "vendorSearch"
              }
              placeholder="search"
            />
          </div>
          <div
            className="vendorMain__notification"
            onClick={() => toggleNotification()}
          >
            <Badge badgeContent={12}>
              {pageHeading != undefined ? (
                <img src={headingColor == "white" ? BellWhite : BellSimple} />
              ) : (
                <NotificationsNoneIcon className="vendorNotification" />
              )}
            </Badge>
          </div>
          <div
            className="vendorMain__profile__icon"
            onClick={() => history.push("/business/vendor-dashboard/account")}
          >
            {pageHeading != undefined ? (
              <img src={headingColor == "white" ? UserWhite : User} />
            ) : (
              <PersonIcon className="vendorNotification" />
            )}
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

export default TopNavbar;

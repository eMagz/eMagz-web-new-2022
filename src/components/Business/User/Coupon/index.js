import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import Navbar from "../Navbar";
import CouponComponent from "./CouponComponent";
import {api} from "../../../API";
import arrowIcon from "../../../../assets/right_menu_arrow.svg";
const Index = () => {
  const [coupon, setCoupon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { loginReducer } = useSelector((state) => ({ ...state }));
  const { userDetails } = loginReducer;
  
  const getCoupon = () => {
    setIsLoading(true);
    api.get(`/view-coupon/${userDetails._id}`).then((res) => {
      console.log("response",res);
      // setCoupon(res.data.data.anyusercoupon);
      setCoupon(res.data);
      setIsLoading(false);
    });
  };
  useEffect(() => {
      if(userDetails._id){
        getCoupon();
      }
  },[userDetails._id]);
  console.log("coupon",coupon)
  return (
    <>
      <Navbar />
      <h3 className="wishlistText">
        <span>My Account</span> <img src={arrowIcon} alt="" />{" "}
        <span>My Coupon</span>
      </h3>
      <div className="wishlist_container" id="coupon__container">
        {isLoading ? (
          <>
            <h1>Loading</h1>
          </>
        ) : (
          <>
            {/* {coupon.length > 0 &&
              coupon.map((item) => {
                return <CouponComponent coupon={item} />;
              })} */}
            <CouponComponent />
            <CouponComponent />
            <CouponComponent />
            <CouponComponent />
            <CouponComponent />
            <CouponComponent />
          </>
        )}
      </div>
    </>
  );
};

export default Index;

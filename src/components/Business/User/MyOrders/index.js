import React, { useEffect, useState } from "react";
import "./index.css";
import "./main.css";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import OrderComponent from "./OrderComponent";
import Axios from "axios";
import { BaseUrl } from "../../../API";
import EmptyOrder from "./EmptyOrder";
import arrowIcon from "../../../../assets/right_menu_arrow.svg";
const Index = () => {
  const { loginReducer, cart, couponReducer } = useSelector((state) => ({
    ...state,
  }));
  const { userDetails } = loginReducer;
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = () => {
    setIsLoading(true);
    Axios.get(`${BaseUrl}/view-order/${userDetails._id}`).then((res) => {
      setOrders(res.data.data[0].order);
      console.log("Order", res);
      setIsLoading(false);
    });
  };
  console.log("userDetails", loginReducer);

  

  useEffect(() => {
    if (userDetails._id) {
      getOrders();
    }
  }, [userDetails._id]);

  return (
    <>
      <Navbar />
      <h3 className="wishlistText">
        <span>My Account</span> <img src={arrowIcon} alt="" />{" "}
        <span>My Order</span>
      </h3>

      {isLoading ? (
        <EmptyOrder />
      ) : (
        <>
          {
            <div className="order__container">
              {orders.length > 0 ? (
                <>
                  {orders.map((item) => {
                    return <OrderComponent order={item} />;
                  })}
                  <div className="add__more">
                    <h3>Add more to your order</h3>
                    <button className="add__moreBtn">shop more</button>
                  </div>
                </>
              ) : (
                <EmptyOrder />
              )}
            </div>
          }
        </>
      )}
    </>
  );
};

export default Index;

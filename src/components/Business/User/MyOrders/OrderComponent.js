import React from "react";
import "./index.css";
import orderImg from "../../../../assets/s1.jpeg";
// import Rating from "@material-ui/lab/Rating";
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";
import { ImageUrl } from "../../../API";

const OrderComponent = ({ order }) => {
  const [value, setValue] = React.useState(2);
  const history = useHistory();
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const cancelOrder = (id) => {
    console.log("order id", id);
  }

  return (
    <>
      {console.log("Order", order)}
      <div className="order__wraper">
        <div className="order__details">
          <div className="order__img">
            <img src={order.picture} />
          </div>
          <div className="order__description">
            <h3>{order.name}</h3>
            <div className="order__qty">
              <p className="ordered__qty">Qty {order.quantity}</p>
              <p className="ordered__price">
                <i class="fas fa-rupee-sign"></i>{" "}
                <span>{order.total_price}</span>
              </p>
            </div>
            <p className="delivery__text">Deliver on 22 july 2021</p>
            <div className="order__rating">
              <div className="star__icon">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
              </div>
              <p>Rate Now</p>
            </div>
          </div>
        </div>
        <div className="order__buttons">
          <button className="order__cancelBtn" onClick={() => cancelOrder(order._id)}>Cancel Order</button>
          <button
            onClick={() =>
              history.push("/business/user-dashboard/profile/order/support")
            }
            className="order__helpBtn"
          >
            Support
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderComponent;

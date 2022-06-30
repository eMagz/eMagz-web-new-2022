
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Nocart from "./NoCart";
import axios from "axios";
import { BaseUrl } from "../../../API"

const Cart = ({ history }) => {

  const { cart, loginReducer } = useSelector((state) => ({ ...state }));
  const { userDetails } = loginReducer
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  console.log("cart", cart);
  console.log("userData", userData);
  console.log("cart length", cart.length);
  const getTotal = () => {
    return cart.reduce((current, next) => {
      return current + next.quantity * next.price;
    }, 0);
  };

  const getLoggedCartData = (id) => {
    console.log("id", id);
    axios.get(`${BaseUrl}/view-cart/${id}`).then((res) => {
      console.log('CART DATA', res.data.data[0].cartDetails)
      dispatch({
        type: 'ADD_TO_CART',
        payload: res.data.data[0].cartDetails
      })
    })
  }

  const handleRemoveProduct = (product_id, product_detail_id) => {
    console.log("Remove");
    let cartData = [];
    axios.post(`${BaseUrl}/remove-from-cart/${userData._id}/${product_detail_id}`).then((res) => {
      console.log("Removed Res")
      getLoggedCartData(userData._id)
    })
  };
  useEffect(() => {
    let userData1 = JSON.parse(localStorage.getItem("user"));
    console.log("userData1", userData1);
    setUser(userData1._id);
    setUserData(userData1);
    getLoggedCartData(userData1._id)
    // axios.get(`${BaseUrl}/view-cart/${userData1._id}`).then((res) => {
    //   console.log("Removed Res", res)
    // setcart(res.data.data[0].cartDetails[0].cart);
    // getLoggedCartData(user);
    //data.data[0].cartDetails[0].product_details.name
    // })
  }, []);
  return (
    <>
      <Navbar />
      <h3 className="bag">Your Bag</h3>
      {cart.length > 0 ? (
        <>
          <div className="cartContainer">
            <div>
              {cart.length > 0 &&
                cart.map((item) => (
                  <div className="cart_item-container">
                    <div className="cart_image">
                      <img src={item.product_details.picture[0]} alt="" />
                    </div>
                    <div className="cart-product_name">
                      <h3>{item.product_details.name}</h3>
                      <p>Deliver on 22 july 2021</p>
                    </div>
                    <div className="cart-quantity">
                      <i onClick={() => setQty(qty + 1)} class="fas fa-plus"></i>
                      <input
                        type="text"
                        onChange={(val) => setQty(val)}
                        value={qty}
                        className="cart-input"
                      />
                      <i onClick={() => setQty(qty + 1)} class="fas fa-plus"></i>
                    </div>
                    <h3 className="cart-product_price">
                      <i class="fas fa-rupee-sign"></i> {item.product_details.price}
                    </h3>
                    <p className="closeCartItem">
                      <i
                        onClick={() => handleRemoveProduct(item._id, item.product_details._id)}
                        class="fas fa-times"
                      ></i>
                    </p>
                  </div>
                ))}
            </div>
            <h3 className="price-details__heading">Price Detail</h3>
            <div className="cart-line"></div>
            <div className="cart-details_container">
              <div className="cart-final_details">
                <div className="cart-final-common cart-final-price">
                  <h3>Price</h3>
                  <p>
                    {" "}
                    <i class="fas fa-rupee-sign"></i> {getTotal()}
                  </p>
                </div>
                <div className="cart-final-common cart-final-discount">
                  <h3>Discount</h3>
                  <p>
                    {" "}
                    <i class="fas fa-rupee-sign"></i>299
                  </p>
                </div>
                <div className="cart-final-common cart-final-delivery">
                  <h3>Delivery</h3>
                  <p>Free</p>
                </div>
                <div className="cart-line"></div>
                <div className="cart-final-common cart-final-price">
                  <h3>Total Price</h3>
                  <p>
                    <i class="fas fa-rupee-sign"></i> {getTotal()}
                  </p>
                </div>
              </div>

              <div className="final-cart-btn">
                <div>
                  <button
                    onClick={() =>
                      history.push("/business/user-dashboard/profile/process")
                    }
                    className="orderNowBtn"
                  >
                    Order Now
                  </button>
                </div>
                <div>
                  <button className="saveLaterBtn">Save for Later</button>
                </div>
                <div className="continueShopping">
                  <i class="fal fa-long-arrow-left"></i>
                  <Link to="/business/user-dashboard" className="continueText">Continue shopping</Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Nocart />
        </>
      )}
    </>
  );
};

export default Cart;

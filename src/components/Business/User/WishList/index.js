import React, { useState, useEffect } from "react";
import "./index.css";
import "./main.css";
import Header from "../Navbar";
import { BaseUrl } from "../../../API";
import Axios from "axios";
import ProductDetailsSketelen from "../UserDashboard/components/Skaleten/ProductDetailsSketelen";
import ProductCart from "./ProductCart";
import EmptyWishList from "./EmptyWishList";
import axios from "axios";
import arrowIcon from "../../../../assets/right_menu_arrow.svg";
import watermark from "../../../../assets/watermark2.svg";

const Index = ({ history }) => {
  const [wishList, setWishList] = useState([]);
  const [userDetails, setUserDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const getWishList = (id) => {
    setLoading(true);
    Axios.get(`${BaseUrl}/view-wishlist/${id}`).then((res) => {
      if (res.data.data.length > 0) {
        let tempImages = res.data.data[0].productimage;
        let tempDetails = res.data.data[0].productdetail;
        res.data.data[0].product.forEach((data, index) => {
          console.log("Product and Images", data, tempImages[index].picture);
          data.picture = tempImages[index].picture;
          data.price = tempDetails[index].price;
          data.producDetailsId = tempDetails[index]._id;
        });
      }
      res.data.data.length > 0 && setWishList(res.data.data[0].product);
      setLoading(false);
    });
  };

  // const deleteItem = (id) => {
  //   Axios.post(`${BaseUrl}/remove-from-wishlist/${id}`);
  //   getWishList();
  // };

  useEffect(() => {
    let userDetails = JSON.parse(localStorage.getItem("user"));
    setUserDetails(userDetails);
    getWishList(userDetails._id);
  }, []);

  const handleRemoveProduct = (id) => {
    axios
      .post(`${BaseUrl}/remove-from-wishlist/${userDetails._id}/${id}`)
      .then((res) => {
        getWishList(userDetails._id);
      });
  };

  // console.log("wishlist",wishList);
  return (
    <>
      <Header />
      <div
        className="watermark__wishlist"
        // style={`background-image:${watermark}`}
        style={{backgroundImage:watermark}}

      >
        <h3 className="wishlist__text">
          <span>My Account</span> <img src={arrowIcon} alt="" />{" "}
          <span>Wishlist</span>
        </h3>
        {loading ? (
          <>
            <ProductDetailsSketelen />
          </>
        ) : (
          <>
            <div className="wishlist__wraper">
              {wishList.length == 0 ? (
                <EmptyWishList />
              ) : (
                <>
                  <div className="wishlist__container">
                    {wishList.map((product) => (
                      <ProductCart
                        product={product}
                        handleRemoveProduct={handleRemoveProduct}
                      />
                    ))}
                  </div>

                  <div className="wishListproduct-Container">
                    <button className="manageOrder">Manage Order</button>
                    <button
                      className="orederNow"
                      onClick={() =>
                        history.push("/business/user-dashboard/profile/process")
                      }
                    >
                      Order Now
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Index;

import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { BaseUrl } from "../../../API";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SingleRating from "../../../../assets/SingleRating.png";
import axios from "axios";
import ProductDetailsSketelen from "./components/Skaleten/ProductDetailsSketelen";
import Footer from "./components/Footer";

const ProductDetails = (props) => {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [toolTip, setToolTip] = useState("");
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [isWishListProduct, setIsWishlistProduct] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);

  const { cart, loginReducer } = useSelector((state) => ({ ...state }));

  // const { userDetails } = loginReducer
  // console.log("loginReducer cart", loginReducer, cart, userReducer)
  const dispatch = useDispatch();

  const getProductDetails = (id, user_id) => {
    setLoading(true);
    axios.get(`${BaseUrl}/product-details/${id}`).then((res) => {
      setProductDetails(res.data.data[0]);
      res.data.data[0] &&
        res.data.data[0].productdetail.length > 0 &&
        setSingleProduct(res.data.data[0].productdetail[0]);
      axios
        .post(
          `${BaseUrl}/check-wishlist/${user_id}/${res.data.data[0].productdetail[0]._id}`
        )
        .then((res) => {
          setIsWishlistProduct(res.data.status);
        });
      setLoading(false);
    });
  };

  console.log("Single Product", singleProduct);
  const getSimilerProducts = (id) => {
    axios.get(`${BaseUrl}/vendor-related-products/${id}`).then((res) => {
      setRelatedProducts(res.data.data);
    });
  };

  const getWishList = (id) => {
    axios.get(`${BaseUrl}/vendor-related-products/${id}`).then((res) => {
      setRelatedProducts(res.data.data);
    });
  };

  const getLoggedCartData = (id) => {
    axios.get(`${BaseUrl}/view-cart/${id}`).then((res) => {
      console.log("CART DATA", res.data.data.cart);
      dispatch({
        type: "ADD_TO_CART",
        payload: res.data.data.cart,
      });
    });
  };

  useEffect(() => {
    let loginUser = JSON.parse(localStorage.getItem("user"));
    setUserDetails(loginUser);
    getProductDetails(props.location.state.id, loginUser._id);
  }, []);

  useEffect(() => {
    productDetails && getSimilerProducts(productDetails.vendor_id);
  }, [productDetails]);

  const handleChangeSingleProduct = (singleData) => {
    setSingleProduct(singleData);
  };

  const addToCart = (id) => {
    const result = cart.findIndex((item) => id === item.product_detail_id);
    console.log("Result", result);

    if (result === -1) {
      const cartData = {
        user_id: userDetails._id,
        cart: [
          {
            product_id: productDetails._id,
            product_detail_id: singleProduct._id,
            vendor_name: productDetails.vendor.business_name,
            quantity: 1,
            price: singleProduct.price,
            gst_amount: singleProduct.gst_amount,
            name: productDetails.name,
            picture: singleProduct.images[0].picture,
            size: singleProduct.size,
            color: singleProduct.color,
          },
        ],
      };

      axios.post(`${BaseUrl}/add-to-cart`, cartData).then((res) => {
        getLoggedCartData(userDetails._id);
      });
    }

    // // remove duplicates
    // let unique = _.uniqWith(cart, _.isEqual);

    // // save to local storage
    // console.log('unique', unique)
    // localStorage.setItem("cart", JSON.stringify(unique));
    // setToolTip("Added");
    // // ADD TO REDUX STORRAGE

    // dispatch({
    //   type: "ADD_TO_CART",
    //   payload: unique,
    // });
  };
  const handleCart = () => {
    const cartData = {
      user_id: userDetails._id,
      wishlist: {
        product_id: productDetails._id,
        product_detail_id: productDetails.productdetail[0]._id,
        product_image: productDetails.productdetail[0].images[0]._id,
      },
    };

    axios.post(`${BaseUrl}/add-to-wishlist`, cartData).then((res) => {
      console.log("Cart Res", res.data.status);
      if (res.data.status) {
        setIsCartAdded(true);
      }
    });
  };

  return (
    <>
      <Header />
      {loading ? (
        <ProductDetailsSketelen />
      ) : (
        <>
          <div className="productDetailsContainer">
            <div>
              <div className="productImage">
                <Carousel width="50%" showStatus={false}>
                  {singleProduct !== null &&
                    singleProduct.images.length > 0 &&
                    singleProduct.images.map((image) => (
                      <div>
                        <img src={image.picture} alt="" />
                      </div>
                    ))}
                </Carousel>
              </div>
            </div>
            <div className="productDetails">
              <div className="productDesDetails">
                <div className="productDes_name">
                  <h1>{productDetails.name}</h1>

                  {isWishListProduct ? (
                    <FavoriteIcon />
                  ) : (
                    <i onClick={handleCart} class="far fa-heart"></i>
                  )}
                </div>
                <div className="productDes">
                  {ReactHtmlParser(productDetails.description)}
                </div>
                <div className="sellername">
                  <p className="seller">
                    Seller <Link>{productDetails.vendor.business_name}</Link>
                  </p>
                  <p className="seller">
                    <img src={SingleRating} />{" "}
                    {productDetails.vendor.avgratings}
                  </p>
                </div>
                <div className="qtyContainer">
                  <div className="qtyDetails">
                    <p>Qty</p>
                    <div className="circleContainer">
                      <div class="numberCircle">01</div>
                      <div class="numberCircle">02</div>
                      <div class="numberCircle">03</div>
                      <div class="numberCircle">04</div>
                    </div>
                  </div>
                  <div className="priceDetail">
                    <p className="priceText">Price</p>
                    <p className="priceNumber">
                      {" "}
                      <i class="fas fa-rupee-sign"></i>{" "}
                      {singleProduct !== null && singleProduct.price}
                    </p>
                  </div>
                </div>
                <div className="buttonContainer">
                  <Tooltip title={toolTip} arrow>
                    <button
                      onClick={() => addToCart(singleProduct._id)}
                      className="addBtn"
                    >
                      Add To Cart
                    </button>
                  </Tooltip>
                  <button className="buyBtn">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="similerProductContainer">
            <h3>Similar Produts</h3>
            <div className="similarProducts">
              {productDetails.productdetail.length > 0 &&
                productDetails.productdetail.map((product, index) => (
                  <div
                    className="newProductContainer"
                    onClick={() => handleChangeSingleProduct(product)}
                  >
                    <div className="newProductImg">
                      <img
                        src={
                          product.images.length > 0
                            ? product.images[0].picture
                            : ""
                        }
                        alt=""
                      />
                    </div>
                    <div className="newProductInfo">
                      <h5>{productDetails.name}</h5>
                      <p>{product.price}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* <div>
            {relatedProducts.length > 0 && (
              <div className="similerProductContainer">
                <h3>Similar Produts</h3>
                <div className="similarProducts">
                  {relatedProducts.map((product) => (
                    <RelatedProductCard
                      name={product.name}
                      item={product.productdetail && product.productdetail[0]}
                    />
                  ))}
                </div>
              </div>
            )}
          </div> */}
          <Footer />
        </>
      )}
    </>
  );
};

export default ProductDetails;

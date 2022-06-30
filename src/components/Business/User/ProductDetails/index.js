import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Header from "../Header";
import product from "../../../../assets/product.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl, ImageUrl } from "../../../API";
import RBCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCartData } from "../../../ReduxStore/Actions/CartActions";
import { useSelector } from "react-redux";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Progress } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactHtmlParser from "react-html-parser";

const ProductDetails = (props) => {
  const [qty, setQty] = useState(1);
  const products = props.location.state.products;
  const [cartIndex, setCartIndex] = useState(props.location.state.index);
  const [modal, setModal] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [vendordetails, setVendorDetails] = useState([]);
  const [countrating, setCountRating] = useState("");
  const [detailsProduct, setDetailsProduct] = useState([]);
  const [getAllImage, getAllImgData] = useState([]);
  const [value, setValue] = useState(1);
  const slider = useRef("");
  const history = useHistory();
  const userdata = JSON.parse(localStorage.getItem("user"));
  const cartdata = useSelector((state) => state.cartReducer.cart);
  function _onSelect(active, direction) {
    console.log(`active=${active} && direction=${direction}`);
  }
  const dispatch = useDispatch();
  const toggle = () => setModal(!modal);
  function addToCart() {
    let cartList = cartdata;
    if (vendordetails.length !== 0) {
      let data = {
        product_id: products._id,
        product_detail_id: products.productdetail[cartIndex]._id,
        quantity: qty,
        price: products.productdetail[cartIndex].price,
        gst_amount: products.productdetail[cartIndex].gst_amount,
        total_price: Math.ceil(
          products.productdetail[cartIndex].total_price * qty
        ),
        name: products.name,
        picture: products.productdetail[cartIndex].images[0].picture,
        size: products.productdetail[cartIndex].size,
        vendor_name: vendordetails[0].business_name,
        vendor_id: vendordetails[0]._id,
      };
      let index = cartList.findIndex(
        (x) => x.product_detail_id === data.product_detail_id
      );
      if (index !== -1) {
        cartList[index].quantity = data.quantity;
      } else {
        cartList.push(data);
      }
    }
    dispatch(getCartData(cartList));
  }
  useEffect(() => {
    let index = cartdata.findIndex((x) => x.product_id === products._id);
    if (index !== -1) {
      setQty(cartdata[index].quantity);
    }
  }, []);
  // console.log('Cart Data', cartdata)
  useEffect(() => {
    console.log("cartdata.length", cartdata.length);
    if (cartdata.length > 0) {
      const body = {
        cart: cartdata,
        user_id: userdata._id,
      };
      axios.post(`${BaseUrl}/cart-action`, body);
    }
  }, [cartdata]);
  useEffect(() => {
    sellerInfo();
    productRating();
    countUser();
  }, []);
  const sellerInfo = () => {
    axios.get(`${BaseUrl}/product-seller-info/${products._id}`).then((res) => {
      setVendorDetails(res.data.data[0].vendor);
      console.log("rt", res.data.data);
    });
  };
  const productRating = () => {
    axios.get(`${BaseUrl}/average-rating/${products._id}`).then((res) => {
      console.log("qa", res);
      if (res.data.data.length <= 0) {
        return setValue(1);
      } else {
        setValue(res.data.data[0].avgRatings);
      }
    });
  };
  const countUser = () => {
    axios.get(`${BaseUrl}/total-ratings/${products._id}`).then((res) => {
      // console.log('ui',res);
      setCountRating(res.data.data);
    });
  };
  const getAllDetails = (val) => {
    console.log("details", val);
    setDetailsProduct(val);
  };
  const getAllImgs = (product, index) => {
    setCartIndex(index);
    console.log("prodvt", product);
    getAllImgData(product.images);
  };
  return (
    <>
      <Header />
      <div className="venDash_container">
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <div>0%</div>
            <Progress />
            <div>25%</div>
            <Progress value="25" />
            <div>50%</div>
            <Progress value={50} />
          </ModalBody>
        </Modal>
        <div className="containers" style={{ backgroundColor: "#ffffff" }}>
          <div className="product-img">
            {detailsProduct.length <= 0 ? (
              <div className="product-bottom">
                <RBCarousel
                  animation={true}
                  autoplay={autoplay}
                  slideshowSpeed={2000}
                  defaultActiveIndex={0}
                  onSelect={_onSelect}
                  ref={slider}
                  version={4}
                >
                  {products.productdetail[cartIndex].images.map(
                    (item, index) => {
                      //console.log('img',item)
                      return (
                        <>
                          <div style={{ height: 400, width: 200, zIndex: 400 }}>
                            <img
                              style={{ width: "100%", height: "100%" }}
                              key={item._id}
                              src={ImageUrl + item.picture}
                            />
                          </div>
                        </>
                      );
                    }
                  )}
                </RBCarousel>
              </div>
            ) : (
              <div className="product-bottom">
                <RBCarousel
                  animation={true}
                  autoplay={autoplay}
                  slideshowSpeed={2000}
                  defaultActiveIndex={0}
                  onSelect={_onSelect}
                  ref={slider}
                  version={4}
                >
                  <>
                    <div style={{ height: 400, width: 200, zIndex: 400 }}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={ImageUrl + getAllImage.picture}
                      />
                    </div>
                  </>
                </RBCarousel>
              </div>
            )}
          </div>
          <div className="product-description">
            <h2>
              {products.name} {products.productdetail[cartIndex].size}
            </h2>
            <div>
              {" "}
              {ReactHtmlParser(products.description)}
              {/* <div>
                                <h5>  BENEFITS </h5>
                                <div class="product-information-body">
                                    <ul>
                                        <li>Our award-winning classic, and best-seller, that was formulated with sensitive skin in mind</li>
                                        <li>Can be use on face, hands and body</li>
                                        <li>Ideal for dry, sensitive skin. Suitable for all skin types.</li>
                                        <li>Fragrance free</li>
                                        <li>Clinically tested hypoallergenic and non-comedogenic, so it won't irritate skin or clog pores</li>
                                        <li>Dermatologist tested and clinically proven to be gentle on sensitive skin</li>
                                    </ul>
                                </div>
                            </div> */}
            </div>
            <div className="JoinRating">
              {detailsProduct.length <= 0 ? (
                <div className="extra_Description">
                  <div className="extra_Description_size">
                    <b>Size</b>: {products.productdetail[cartIndex].size}
                  </div>
                  <div className="price">
                    Rs.{" "}
                    {Math.round(products.productdetail[cartIndex].total_price)}
                  </div>
                  <div className="price">
                    Current Stock{" "}
                    {Math.round(products.productdetail[cartIndex].stock)}
                  </div>
                </div>
              ) : (
                <div className="extra_Description">
                  <div className="extra_Description_size">
                    <b>Size</b>: {detailsProduct.size}
                  </div>
                  <div className="price">
                    Rs.{" "}
                    {Math.round(products.productdetail[cartIndex].total_price)}
                  </div>
                </div>
              )}
              <div className="product_rating">
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Product Rating</Typography>
                  <Rating name="read-only" value={value} readOnly />
                </Box>
                <div className="rating_count">{countrating} Ratings</div>
              </div>
            </div>
            <div className="cart-row">
              <div className="cart-quantity">
                <button
                  onClick={() => setQty(qty - 1 < 1 ? 1 : qty - 1)}
                  className="cart-btn"
                >
                  -
                </button>
                <input
                  onChange={(val) => setQty(val)}
                  value={qty}
                  className="cart-input"
                />
                <button onClick={() => setQty(qty + 1)} className="cart-btn">
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  addToCart();
                }}
                class="businessbtn"
              >
                Add To Bag
              </button>
            </div>
            {vendordetails.map((person) => {
              let businessname = person.business_name.toLowerCase();
              businessname = businessname.split(" ").join("-");
              return (
                <div
                  key={person._id}
                  className="productDetails_seller_container"
                >
                  <div className="productDetail_sellerName">Seller:</div>
                  <div className="productDetail_sellerName_name ">
                    <Link to={`/business/${businessname}/${person._id}`}>
                      {person.business_name}
                    </Link>
                  </div>
                  <div className="productDetail_sellerName_ratingCard">
                    <div style={{ fontSize: "13px", paddingLeft: "4px" }}>
                      {Math.round(person.avgratings * 10) / 10}{" "}
                    </div>
                    <StarBorderIcon style={{ fontSize: "18px" }} />
                  </div>
                </div>
              );
            })}
            <div className="different_Product_details">
              {products.productdetail.map((val, index) => {
                console.log("vv", val);
                return (
                  <div className="different_Product_details_images">
                    <div
                      onClick={() => getAllImgs(val, index)}
                      className="different_Product_details_images"
                    >
                      <img
                        className="details_image"
                        src={ImageUrl + val.images[0].picture}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;

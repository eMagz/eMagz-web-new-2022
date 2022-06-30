// import React, { useState, useEffect } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
// import _ from "lodash";
// import Tooltip from "@material-ui/core/Tooltip";
// import Header from "../Navbar";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import ReactHtmlParser from "react-html-parser";
// import { BaseUrl, api } from "../../../API";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import SingleRating from "../../../../assets/SingleRating.png";
// import axios from "axios";
// import ProductDetailsSketelen from "./components/Skaleten/ProductDetailsSketelen";
// import Footer from "./components/Footer";
// import { useHistory, useLocation } from "react-router";

// import scrollTo from "gatsby-plugin-smoothscroll";
// const ProductDetails = () => {
//   const [productData, setProductData] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlist, setWishlist] = useState();

//   const location = useLocation();
//   const p_id = location.state.id;
//   const [productId, setProductId] = useState(p_id);
//   const [userId, setUserId] = useState();

//   const getProductBasic = async (p_id, userid) => {
//     // api.get(`/product-details/${p_id}`).then((res) => {
//     //   setProductData(res.data.data);
//     //   getWishList(userid, res.data.data[0].productdetail[0]._id);
//     //   getrelatedProducts(res.data.data[0].vendor_id);
//     //   setLoading(!loading);
//     // });
//     console.log("userId", userid);
//     console.log("p_id", p_id);
//     const res = await api.get(`/view-product/${p_id}`)
//     console.log("product-details response", res.data.data);
//     setProductData(res.data.data);
//     console.log(res.data.data._id);
//     getWishList(userid, res.data.data._id);
//     console.log(res.data.data._id);
//     getrelatedProducts(res.data.data._id);
//     setLoading(!loading);
//   };
//   const getWishList = async (userid, productdetailid) => {
//     // api.post(`/check-wishlist/${userid}/${productdetailid}`)
//     //   .then((res) => {
//     //     setWishlist(res.data.status);
//     //   });
//     console.log("userid", userid);
//     console.log("productdetailid", productdetailid);
//     const res = await api.post(`/check-wishlist/${userid}/${productdetailid}`)
//     console.log("res getWishList", res);
//     console.log(res.data.status);
//     setWishlist(res.data.status);
//   };
//   const getrelatedProducts = async (vendorid) => {
//     console.log("vendorid", vendorid);
//     // api
//     //   .get(`/vendor-related-products/${vendorid}?page=1&limit=8`)
//     //   .then((res) => {
//     //     setRelatedProducts(res.data.data);
//     //   });
//     const res = await api.get(`/product-by-vendor/${vendorid}?page=1`)
//     console.log("vendor-related-products res", res);
//     setRelatedProducts(res.data.data);
//   };
//   console.log("productData", productData);
//   console.log("productData.length", productData.length);

//   const addToWishlist = async () => {
//     if (productData.length > 0) {
//       const data = {
//         wishlist: [
//           {
//             product_id: productData._id,
//             product_detail_id: productData._id,
//             product_image: productData[0].picture[0],
//           },
//         ],
//         user_id: userId,
//       };
//       console.log("data", data);
//       // api.post(`/add-to-wishlist/`, data).then((res) => {
//       //   console.log(res.data.msg);
//       //   // setLoading(!loading);
//       //   getProductBasic(productId, userId._id);
//       // });

//       const res = await api.post(`/add-to-wishlist/`, data)
//       console.log(res.data.msg);
//       // setLoading(!loading);
//       console.log(userId);
//       getProductBasic(productId, userId._id);
//     }
//   };

//   const removeWishlist = async () => {
//     if (productData.length > 0) {
//       const product_detail_id = productData[0].productdetail[0]._id;
//       console.log(product_detail_id);
//       console.log(userId._id);
//       // api
//       //   .post(
//       //     `/remove-from-wishlist/${userId._id}/${product_detail_id}`
//       //   )
//       //   .then((res) => {
//       //     console.log(res.data.msg);
//       //     // setLoading(!loading);
//       //     getProductBasic(productId, userId._id);
//       //   });

//       const res = await api.post(`/remove-from-wishlist/${userId._id}/${product_detail_id}`)
//       console.log(res.data.msg);
//       // setLoading(!loading);
//       getProductBasic(productId, userId._id);


//     }
//   };
//   console.log("relatedProducts", relatedProducts);

//   useEffect(() => {
//     let user = JSON.parse(localStorage.getItem("user"));
//     setUserId(user);
//     // _id
//     console.log("user._id", user._id);
//     getProductBasic(productId, user._id);
//   }, [productId]);
//   const history = useHistory();
//   return (
//     <>
//       <Header />

//       {loading ? (
//         <ProductDetailsSketelen />
//       ) : (
//         productData !== undefined && (
//           <>
//             <div className="productDetailsContainer">
//               <div>
//                 <div className="productImage">
//                   <Carousel width="50%" showStatus={false}>
//                     {productData !== undefined &&
//                       productData.picture.map(
//                         (image, index) => (
//                           <div>
//                             <img key={index} src={image} alt="" />
//                           </div>
//                         )
//                       )}
//                   </Carousel>

//                 </div>
//                 {/* data.data[0].vendor[0].logo */}
//                 {/* productData[0].productdetail[0].images[0].picture.map( */}
//               </div>
//               <div className="productDetails">
//                 <div className="productDesDetails">
//                   <div className="productDes_name">
//                     <h1>{productData.name}</h1>
//                     {wishlist ? (
//                       <FavoriteIcon onClick={() => removeWishlist()} />
//                     ) : (
//                       <i
//                         onClick={() => addToWishlist()}
//                         class="far fa-heart"
//                       ></i>
//                     )}
//                   </div>
//                   <div className="productDes">
//                     {ReactHtmlParser(productData.description)}
//                   </div>
//                   <div className="sellername">
//                     <p className="seller">
//                       Seller <Link>{productData.vendor_id}</Link>
//                     </p>
//                     <p className="seller">
//                       <img src={SingleRating} />{" "}
//                       {productData.rateValue}
//                     </p>
//                   </div>
//                   <div className="qtyContainer">
//                     <div className="qtyDetails">
//                       <p>Qty</p>
//                       <div className="circleContainer">
//                         <div class="numberCircle">01</div>
//                         <div class="numberCircle">02</div>
//                         <div class="numberCircle">03</div>
//                         <div class="numberCircle">04</div>
//                       </div>
//                     </div>
//                     <div className="priceDetail">
//                       <p className="priceText">Price</p>
//                       <p className="priceNumber">
//                         {" "}
//                         <i class="fas fa-rupee-sign"></i>{" "}
//                         {productData.price}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="buttonContainer">
//                     {/* <Tooltip title={toolTip} arrow> */}
//                     <button
//                       onClick={() => addToCart(singleProduct._id)}
//                       className="addBtn"
//                     >
//                       Add To Cart
//                     </button>
//                     {/* </Tooltip> */}
//                     <button className="buyBtn">Buy Now</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="similerProductContainer">
//               <h3>Customer also love</h3>
//               <div className="similarProducts">
//                 {relatedProducts.length > 0 &&
//                   relatedProducts.map((product, index) => (
//                     <div
//                       className="newProductContainer"
//                       key={index}
//                       onClick={() => {
//                         history.push(
//                           `/business/user-dashboard/${product.name}`,
//                           {
//                             id: product._id,
//                           }
//                         );
//                         setProductId(product._id);
//                         scrollTo("#navBar");
//                         setLoading(!loading);
//                       }}
//                     >
//                       <div className="newProductImg">
//                         <img
//                           src={
//                             product.productdetail[0].images[0].picture.length >
//                               0
//                               ? product.productdetail[0].images[0].picture[0]
//                               : ""
//                           }
//                           alt=""
//                         />
//                       </div>
//                       <div className="newProductInfo">
//                         <h5>{product.name}</h5>
//                         <p>
//                           <i class="fas fa-rupee-sign"></i>{" "}
//                           {product.productdetail[0].price}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             <Footer />
//           </>
//         )
//       )}
//     </>
//   );
// };

// export default ProductDetails;




import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { BaseUrl, api } from "../../../API";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SingleRating from "../../../../assets/SingleRating.png";
import axios from "axios";
import ProductDetailsSketelen from "./components/Skaleten/ProductDetailsSketelen";
import Footer from "./components/Footer";
import { useHistory, useLocation } from "react-router";

import scrollTo from "gatsby-plugin-smoothscroll";
const ProductDetails = () => {
  const [productData, setProductData] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState();

  const location = useLocation();
  const p_id = location.state.id;
  const [productId, setProductId] = useState(p_id);
  const [userId, setUserId] = useState();
  const getProductBasic = async (p_id, userid) => {
    // api.get(`/product-details/${p_id}`).then((res) => {
    //   setProductData(res.data.data);
    //   getWishList(userid, res.data.data[0].productdetail[0]._id);
    //   getrelatedProducts(res.data.data[0].vendor_id);
    //   setLoading(!loading);
    // });

    const res = await api.get(`/view-product/${p_id}`)
    setProductData(res.data.data);
    getWishList(userid, res.data.data._id);
    getrelatedProducts(res.data.data.vendor_id);
    setLoading(!loading);
  };
  const getWishList = async (userid, productdetailid) => {
    // api.post(`/check-wishlist/${userid}/${productdetailid}`)
    //   .then((res) => {
    //     setWishlist(res.data.status);
    //   });
    const res = await api.post(`/check-wishlist/${userid}/${productdetailid}`)
    setWishlist(res.data.status);
  };
  const getrelatedProducts = async (vendorid) => {
    // api
    //   .get(`/vendor-related-products/${vendorid}?page=1&limit=8`)
    //   .then((res) => {
    //     setRelatedProducts(res.data.data);
    //   });
    const res = await api.get(`/vendor-related-products/${vendorid}?page=1&limit=8`)
    setRelatedProducts(res.data.data);
  };
  const addToWishlist = async () => {
    if (productData.length > 0) {
      const data = {
        wishlist: [
          {
            product_id: productData._id,
            product_detail_id: productData._id,
            product_image: productData[0].productdetail[0].images[0]._id,
          },
        ],
        user_id: userId,
      };
      // api.post(`/add-to-wishlist/`, data).then((res) => {
      //   console.log(res.data.msg);
      //   // setLoading(!loading);
      //   getProductBasic(productId, userId._id);
      // });

      const res = await api.post(`/add-to-wishlist/`, data)
      console.log(res.data.msg);
      // setLoading(!loading);
      getProductBasic(productId, userId._id);
    }
  };
  const removeWishlist = async () => {
    if (productData.length > 0) {
      const product_detail_id = productData._id;
      console.log(product_detail_id);
      console.log(userId._id);
      // api
      //   .post(
      //     `/remove-from-wishlist/${userId._id}/${product_detail_id}`
      //   )
      //   .then((res) => {
      //     console.log(res.data.msg);
      //     // setLoading(!loading);
      //     getProductBasic(productId, userId._id);
      //   });

      const res = await api.post(`/remove-from-wishlist/${userId._id}/${product_detail_id}`)
      console.log(res.data.msg);
      // setLoading(!loading);
      getProductBasic(productId, userId._id);


    }
  };
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUserId(user);
    getProductBasic(productId, user._id);
  }, [productId]);
  const history = useHistory();
  return (
    <>
      <Header />
      {loading ? (
        <ProductDetailsSketelen />
      ) : (
        productData !== undefined && (
          <>
            <div className="productDetailsContainer">
              <div>
                <div className="productImage">
                  <Carousel width="50%" showStatus={false}>
                    {productData !== undefined &&
                      productData.picture.map(
                        (image, index) => (
                          <div>
                            <img key={index} src={image} alt="" />
                          </div>
                        )
                      )}
                  </Carousel>
                </div>
              </div>
              <div className="productDetails">
                <div className="productDesDetails">
                  <div className="productDes_name">
                    <h1>{productData.name}</h1>

                    {wishlist ? (
                      <FavoriteIcon onClick={() => removeWishlist()} />
                    ) : (
                      <i
                        onClick={() => addToWishlist()}
                        class="far fa-heart"
                      ></i>
                    )}
                  </div>
                  <div className="productDes">
                    {ReactHtmlParser(productData.description)}
                  </div>
                  <div className="sellername">
                    <p className="seller">
                      Seller <Link>{productData.vendor_id}</Link>
                    </p>
                    <p className="seller">
                      <img src={SingleRating} />{" "}
                      {productData.rateValue}
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
                        {productData.price}
                      </p>
                    </div>
                  </div>
                  <div className="buttonContainer">
                    {/* <Tooltip title="Add" arrow>
                        <Button>Arrow</Button>
                      </Tooltip> */}
                    <Tooltip title="Add To Cart" arrow>
                      <button
                        // onClick={() => addToCart(singleProduct._id)}
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
              <h3>Customer also love</h3>
              <div className="similarProducts">
                {relatedProducts.length > 0 &&
                  relatedProducts.map((product, index) => (
                    <div
                      className="newProductContainer"
                      key={index}
                      onClick={() => {
                        history.push(
                          `/business/user-dashboard/${product.name}`,
                          {
                            id: product._id,
                          }
                        );
                        setProductId(product._id);
                        scrollTo("#navBar");
                        setLoading(!loading);
                      }}
                    >
                      <div className="newProductImg">
                        {/* <img
                          src={
                            product.productdetail[0].images[0].picture.length >
                              0
                              ? product.productdetail[0].images[0].picture[0]
                              : ""
                          }
                          alt=""
                        /> */}
                      </div>
                      <div className="newProductInfo">
                        <h5>{product.name}</h5>
                        <p>
                          <i class="fas fa-rupee-sign"></i>{" "}
                          {product.productdetail.price}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <Footer />
          </>
        )
      )}
    </>
  );
};

export default ProductDetails;
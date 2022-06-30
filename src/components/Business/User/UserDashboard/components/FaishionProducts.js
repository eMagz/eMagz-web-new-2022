import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import ProductCartSketelen from "../components/Skaleten/ProductCard";
import "./index.css";
import "./main.css";
import { useHistory } from "react-router-dom";
import { BaseUrl, ImageUrl,api } from "../../../../API";
import axios from "axios";
const FaishionProducts = ({ products, loading }) => {
  const [productList, setProductList] = useState([]);
  const history = useHistory();
  const getProductList = async () => {
  
     // .get(`${BaseUrl}/product-list-category/${images[0]._id}`)
     //console.log(
      //     "product list",
      //     res.data.data[0].productdetail[0].images[0].picture[0]
      //   );
      const res =  await api.get(`/product-list-category/5feeb232d8885de3069bb163?page=1&limit=12`);
      setProductList(res.data.data);
  };
  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <div className="newArrival">
        <h3>Fashion</h3>
        <a href="#">View More</a>
      </div>
      <div id="spec__cat__box">
        <div className="newArrivalProducts">
          {productList.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                history.push(`/business/user-dashboard/${item.name}`, {
                  id: item._id,
                })
              }
              className="newProductContainer"
            >
              <div className="newProductImg">
                <img
                  src={
                    item.productdetail[0].images[0].picture[0] !== undefined
                      ? item.productdetail[0].images[0].picture[0]
                      : ""
                  }
                  alt=""
                />
              </div>
              <div className="newProductInfo">
                <h5>{item.name}</h5>
                <p>
                  <i class="fas fa-rupee-sign"></i>{" "}
                  {item.productdetail[0] !== undefined &&
                    item.productdetail[0].price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {loading ? (
        <ProductCartSketelen />
      ) : (
        <div className="newArrivalProducts" style={{ padding: "0 2rem" }}>
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <ProductCart item={product} key={product._id} />
            ))}
        </div>
      )}
    </>
  );
};

export default FaishionProducts;

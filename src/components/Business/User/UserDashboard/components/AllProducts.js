import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import ProductCartSketelen from "./Skaleten/ProductCard";
import "./index.css";
import "./main.css";
import { useHistory } from "react-router-dom";
import { BaseUrl, ImageUrl, api } from "../../../../API";
import axios from "axios";
const AllProducts = ({ products, loading, searchData }) => {
  const [productList, setProductList] = useState([]);
  const history = useHistory();
  const getProductList = async () => {
    const res = await api.get(`/all-products-list`)
    setProductList(res.data.data);
  };
  useEffect(() => {
    getProductList();
  }, []);
  console.log("search Data", searchData);
  return (
    <>
      <div className="newArrival">
        <h3>All Products</h3>
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
                    item.picture[0] !== undefined
                      ? item.picture[0]
                      : ""
                  }
                  alt=""
                />
              </div>
              <div className="newProductInfo">
                <h5>{item.name}</h5>
                <p>
                  <i class="fas fa-rupee-sign"></i>{" "}
                  {item.price !== undefined &&
                    item.price}
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

export default AllProducts;

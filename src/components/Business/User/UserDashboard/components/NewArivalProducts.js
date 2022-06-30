import React, { useState, useEffect } from "react";
import "./index.css";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useHistory } from "react-router-dom";
import ProductCart from "./ProductCart";
import new1 from "../../../../../assets/new1.png";
import new2 from "../../../../../assets/new2.png";
import new3 from "../../../../../assets/new3.png";
import new4 from "../../../../../assets/new4.png";
import { BaseUrl, ImageUrl, api } from "../../../../API";


const NewArivalProducts = () => {
  const [productList, setProductList] = useState([]);
  console.log("productList", productList)
  const history = useHistory();
  const getProductList = async () => {
    // .get(`${BaseUrl}/product-list-category/${images[0]._id}`)
    const res = await api.get(`/all-products-list`);
    setProductList(res.data.data);
  };
  useEffect(() => {
    getProductList();
  }, []);
  return (
    <>
      <div className="newArrival">
        <h3>New Arrival</h3>
        <FilterListIcon className="filterIcon" />
      </div>
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
                <i class="fas fa-rupee-sign"></i> {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewArivalProducts;

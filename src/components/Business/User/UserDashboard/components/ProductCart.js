import React from "react";
import defaultImage from "../../../../../assets/new3.png";
import { useHistory } from "react-router-dom";


const ProductCart = ({ item }) => {
  const history = useHistory();
  console.log("ProductCart item", item);
  return (
    <div
      onClick={() =>
        history.push(`/business/user-dashboard/${item.name}`, { id: item._id })
      }
      className="newProductContainer"
    >
      <div className="newProductImg">
        <img
          src={
            item.productdetail &&
              item.productdetail.length > 0 &&
              item.productdetail[0].images.length > 0
              ? item.productdetail[0].images[0].picture
              : defaultImage
          }
          alt=""
        />
      </div>
      <div className="newProductInfo">
        <h5>{item.name}</h5>
        <p>
          <i class="fas fa-rupee-sign"></i> {item.productdetail &&
            item.productdetail.length > 0 && item.productdetail[0].price}
        </p>
      </div>
    </div>
  );
};

export default ProductCart;

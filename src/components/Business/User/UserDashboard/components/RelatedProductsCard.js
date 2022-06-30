import React from "react";
import defaultImage from "../../../../../assets/new3.png";
import { useHistory } from "react-router-dom";

const RelatedProductCart = ({ name, item }) => {
  const history = useHistory();
  console.log("RelatedProductCart", item);
  return (
    <div
      onClick={() =>
        history.push(`/business/user-dashboard/${name ? name : item.name}`, {
          item,
        })
      }
      className="newProductContainer"
    >
      <div className="newProductImg">
        <img
          src={item.images.length > 0 ? item.images[0].picture : defaultImage}
          alt=""
        />
      </div>
      <div className="newProductInfo">
        <h5>{name ? name : item.name}</h5>
        <p>{item.price}</p>
      </div>
    </div>
  );
};

export default RelatedProductCart;

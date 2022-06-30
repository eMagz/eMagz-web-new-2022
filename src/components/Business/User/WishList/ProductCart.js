import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
const ProductCart = ({ product, handleRemoveProduct }) => {
  const history = useHistory();

  return (
    <div className="new__product__Container">
      <div className="new__productImg">
        <img src={product.picture} alt="" />
        {/* <i
          onClick={() => handleRemoveProduct(product.producDetailsId)}
          class="fas fa-window-close"
        ></i> */}
      </div>
      <div className="new__product__info">
        <h5>{product.name}</h5>
        <p>
          <i class="fas fa-rupee-sign"></i> {product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCart;

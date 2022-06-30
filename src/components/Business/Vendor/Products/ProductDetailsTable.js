import React from "react";
import "./index.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import PencilSimple from "../../../../assets/PencilSimple.png";
import TrashSimple from "../../../../assets/TrashSimple.png";
import axios from "axios";
import { BaseUrl } from "../../../API";
const ProductDetailsTable = ({ item ,
  toggleModal,
  setCurrentDetails,
  toggleModalDelete,}) => {
  const history = useHistory();
  console.log("Is Array");
  console.log("set current detail",setCurrentDetails);
  console.log("item",item);
  const deleteProduct = (id) =>{
    console.log("Product id is: ",id);
    axios.post(`${BaseUrl}/delete-product/${id}`).then((response)=>{
          console.log("Product deleted");
    })
}
  return (
    <div className="product-order-content">
      <div className="orderProductImg">
        <img
          src={
            Array.isArray(item.productimages.picture)
              ? item.productimages.picture[0]
              : item.productimages.picture
          }
        />
      </div>
      <p className="orderProductName Vendor_Order-lineName">
        {item.product.name}
      </p>
      <div className="Vendor_Order-lineFlex">
        <p>{item.rest_stock}</p>
      </div>
      <div className="productCode__container Vendor_Order-lineFlex">
        <span
          className="productCode"
          style={{ backgroundColor: `${item.colour}` }}
        ></span>
        <p>{item.colour}</p>
      </div>
      <div className="Vendor_Order-lineFlex">
        <p>{item.size}</p>
      </div>

      <div className="Vendor_Order-lineFlex">
        <p>{Math.round(item.total_price)}</p>
      </div>
      <div className="Vendor_Order-lineFlex">
        {" "}
        <p>{Math.round(item.total_price)}</p>
      </div>
      <div className="Vendor_Order-lineFlex">
        <div className="vender-order-action">
          <div className="vender-order-EyeactionDetails">
            <img src={PencilSimple} className="eyeVendorIconDetails"  onClick={() => {
                // toggleModal();
                setCurrentDetails(item);
              }} />
          </div>
          <div className="vender-order-DeleteactionDetails">
            <img src={TrashSimple} className="eyeVendorIconDetails" onClick={()=>deleteProduct(item._id)}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTable;

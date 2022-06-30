import React, { useState } from "react";
import "./index.css";
import noImage from "../../../../assets/noImage.jpg";
import { BaseUrl } from "../../../API";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Eye from "../../../../assets/Eye.svg";
import Trash from "../../../../assets/Trash.svg";
import Pencil from "../../../../assets/Pencil.svg";
const ProductTable = ({
  item,
  toggleModal,
  setCurrentDetails,
  toggleModalDelete,
  id,
  setDeleteModalId,
}) => {
  console.log("item", item);
  console.log("latest id", id);
  const [product, setProduct] = useState([id]);

  const history = useHistory();
  const deleteProduct = (id) => {
    console.log("Product id is: ", id);
    axios.post(`${BaseUrl}/delete-product/${id}`).then((response) => {
      //   consttoggleModalDelete();
      console.log("delete successfull" + response);
    });
  };

  const updatedata = (id) => {
    console.log("my id is ", id);
  };
  return (
    <div className="product-order-content">
      <div className="Vendor_Order-lineImg">
        <div className="orderProductImg">
          <img
            src={
              item.productdetail[0] &&
              item.productdetail[0].images[0] &&
              item.productdetail[0].images[0].picture[0]
                ? item.productdetail[0].images[0].picture[0]
                : noImage
            }
          />
        </div>
      </div>
      <div className="Vendor_Order-lineName">
        <p className="orderProductName">{item.name}</p>
      </div>
      <div className="Vendor_Order-lineFlex">
        <p className="orderProductName">
          {item.productdetail[0] && item.productdetail[0].stock}
        </p>
      </div>
      <div className="Vendor_Order-lineFlex">
        <p className="orderProductName">{item.gst_percentage}</p>
      </div>
      <div className="Vendor_Order-lineFlex">
        <p className="orderProductName">{item.gst_type}</p>
      </div>
      <div className="Vendor_Order-lineFlex">
        <div className="vender-order-action">
          <div className="add-product-Simpleicon">
            <img
              src={Eye}
              className="product-Icons"
              onClick={() => {
                history.push(
                  "/business/vendor-dashboard/products/details-list",
                  item._id
                );
              }}
            />
          </div>

          <div className="add-product-Simpleicon">
            <img
              src={Pencil}
              className="product-Icons"
              onClick={() => {
                toggleModal();
                setCurrentDetails(item);
                updatedata(item._id);
              }}
            />
          </div>

          <div className="add-product-Simpleicon">
            <img
              src={Trash}
              className="product-Icons"
              //onClick={(e) =>{deleteProduct(item._id)}}
              onClick={() => {
                toggleModalDelete();
                setDeleteModalId(item._id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;

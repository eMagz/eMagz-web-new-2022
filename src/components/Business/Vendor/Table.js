import React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import "./index.css";

const Table = ({ item, product }) => {
  return (
    <div className="vender-order-content ">
      <div className="Vendor_Order-lineImg">
        <div className="orderProductImg">
          <img src={item.picture} />
        </div>
      </div>
      <div className="Vendor_Order-lineName">
        <p className="orderProductName">{item.name}</p>
      </div>
      <div className="Vendor_Order-lineFlex">
        <p>{item.order_id}</p>
      </div>
      <div className="Vendor_Order-lineFlex">
        {" "}
        <p>{item.date}</p>
      </div>
      <div className="Vendor_Order-lineFlex">
        {" "}
        <p>{item.total_price}</p>
      </div>
      <div className="Vendor_Order-lineFlex">
        <span> {item.status}</span>
      </div>
      <div className="Vendor_Order-lineFlex">
        <div className="vender-order-actionFlex">
          <div className="vender-order-Eyeaction">
            <VisibilityIcon className="eyeVendorIcon" />
          </div>
          <div className="vender-order-Deleteaction">
            <DeleteOutlineIcon className="eyeVendorIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

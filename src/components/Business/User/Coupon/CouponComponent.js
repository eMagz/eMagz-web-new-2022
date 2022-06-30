import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import moment from "moment";
const CouponComponent = () => {
  const [text, setText] = useState("K4JH4K");
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    // <div className="coupon_container">
    //     <div className="couponTextContainer">
    //         <div className="couponDescription">
    //             <h3>Coupon Code</h3>
    //             <p>n today’s tutorialt truly</p>
    //             <span className="couponDate">{moment(coupon.createdAt).format("MMM Do YY")}</span>
    //             <div className="Clipcontainer">
    //                 <span className="couponCode">{coupon.coupon_code}</span>
    //                 <CopyToClipboard text={coupon.coupon_code} onCopy={onCopyText}>
    //                     <div className="copy-area">
    //                         <FileCopyIcon className="fileIcon" />
    //                         {isCopied && <span className={`copy-feedback ${isCopied ? "active" : ""}`}>
    //                             Copied!
    //                         </span>}
    //                     </div>
    //                 </CopyToClipboard>
    //             </div>
    //         </div>
    //         <div className="coupon__line"></div>
    //         <div className="percentText">
    //             <span>25%</span>
    //             <p>off</p>
    //         </div>
    //     </div>
    // </div>

    <div className="coupon_wrapper">
      <div className="couponTextContainer">
        <div className="couponDescription">
          <h3 className="coupon__code">MSOP883W</h3>
          <p className="coupon__des">n today’s tutorialt truly</p>
          <span className="coupon__date">Expire Date 12/01/2021</span>
          <button className="apply__btn">Apply Code</button>
        </div>
        <div className="coupon__line"></div>
        <div className="percentText">
          <span>25%</span>
          <p>Off</p>
        </div>
      </div>
    </div>
  );
};

export default CouponComponent;

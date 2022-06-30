import React, { useState } from "react";
import "./index.css";
import orderImg from "../../../../assets/s1.jpeg";
import ReactStars from "react-rating-stars-component";
import TextField from "@material-ui/core/TextField";

const ReviewComponent = () => {
  const [value, setValue] = useState(2);
  const [reviewtext, setReviewtext] = useState("");
  const [rating,setRating] = useState();
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  console.log("Star Rating",rating);
  const allText = (e) =>{
      setReviewtext(e)
  }
  console.log("Reviewtext",reviewtext);
  return (
    <form action="">
      <div className="orderWraper">
        <div className="reviewDetails">
          <div className="orderImg">
            <img src={orderImg} />
          </div>
          <div className="reviewDescription">
            <h3 className="name">The Product</h3>
            <p className="orderedQty">Qty 01</p>
            <p className="deliverytext">Deliver on 22 july 2021</p>
          </div>
        </div>
        <div className="rating__star">
          <div className="star__wrapper">
            <p className="rating">Rate now</p>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={32}
              activeColor="#ffd700"
            />
          </div>
        </div>
        <div className="review__wrapper">
          <label htmlFor="review_pr">Write Your Reviews</label>
          <textarea name="" id="review_pr" onChange={(e)=>allText(e.target.value)}></textarea>
        </div>
      </div>
    </form>
  );
};

export default ReviewComponent;

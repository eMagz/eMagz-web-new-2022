import React from "react";
import { Carousel } from "react-responsive-carousel";
import image1 from "../../../../../assets/img1.png";
import image2 from "../../../../../assets/s1.jpeg";
import subheader from "../../../../../assets/subheader.png";
const Carasol = () => {
  return (
    <Carousel
      renderThumbs={false}
      showThumbs={false}
      stopOnHover={true}
      onClickThumb={false}
      labels={false}
      autoplay={true}
      showStatus={false}
      showArrows={true}
    >
      <div className="caraculDiv">
        <img src={image1} alt="" />
        <div className="hero_text">
          <h1>Beyond Time</h1>
          <h3>Available Now</h3>
          <p>
            Only at <i class="fas fa-rupee-sign"></i>599
          </p>
          <h3 className="shopNowLine">Book Now</h3>
          <p className="termAndConditionImg">*term&#38;conditionappliees</p>
        </div>
      </div>
      <div className="caraculDiv">
        <img src={subheader} alt="" />
        <div className="hero_text">
          <h1>Beyond Time</h1>
          <h3>Available Now</h3>
          <p>
            Only at <i class="fas fa-rupee-sign"></i>599
          </p>
          <h3 className="shopNowLine">Shop Now</h3>
        </div>
      </div>
      <div className="caraculDiv">
        <img src={image2} alt="" />
      </div>
    </Carousel>
  );
};

export default Carasol;

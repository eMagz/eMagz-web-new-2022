import React from "react";
import SwiperCore, { Autoplay, EffectFade } from "swiper";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper-bundle.min.css";
import bg1 from "../../../../assets/hero-1.svg";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
const HomeSlider = () => {
  return (
    <>
      <div id="hero__slider">
        <Swiper
          //spaceBetween={30}
          loop={true}
          //effect={"fade"}
          className="mySwiper"
          autoplay={true}
        >
          <SwiperSlide>
            <div
              className="slider__wrapper"
              style={{ backgroundImage: `url(${bg1})` }}
            ></div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default HomeSlider;

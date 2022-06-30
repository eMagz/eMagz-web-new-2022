import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import redImg from "../../../../../assets/Rectangle 186.png"
import middleImg from "../../../../../assets/Rectangle 187.png"
import subheader from "../../../../../assets/subheader.png"
import socialMedia from "../../../../../assets/socialMedia.jpg"
import watchImg from "../../../../../assets/Rectangle 188.png"

const WinterSpecial = () => {

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "300px",
        slidesToShow: 1,
        speed: 500
    };
    return (
        <div className="carousel-image__container">
            <Slider {...settings}>
                <div className="middleImg">
                    <img src={middleImg} />
                </div>
                <div className="middleImg">
                    <img src={subheader} />
                </div>
                <div className="middleImg">
                    <img src={socialMedia} />
                </div>
                <div className="middleImg">
                    <img src={middleImg} />
                </div>
                <div className="middleImg">
                    <img src={subheader} />
                </div>
            </Slider>
        </div>
    )
}

export default WinterSpecial


// <div className="wintorContainer">
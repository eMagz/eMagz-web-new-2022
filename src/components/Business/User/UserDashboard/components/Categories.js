import React, { useState, useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import Slider from "react-slick";
import { BaseUrl, api,ImageUrl,imageApi } from "../../../../API";
import { useHistory } from "react-router-dom";
import "./index.css";
import CardSkeleton from "./Skaleten/CircleCard";

const loadingArray = [1, 2, 3, 4, 5];

const Categories = ({ images, loading }) => {
 
  const [activeStep, setActiveStep] = useState(0);
  const [defaultCategoryId, setDefaultCategoryId] = useState(images[0]);
  const [businessCat, setBusinessCat] = useState([]);
const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "300px",
        slidesToShow: 1,
        speed: 500
    };
const history = useHistory();
  useEffect(() => {
    setBusinessCat(images)
    //api
    //   // .get(`${BaseUrl}/product-list-category/${images[0]._id}`)
    //   .get(`/view-business-category`)

    //   .then((res) => {
    //     setBusinessCat(res.data.data);   
    //   })

    // (async ()=>{
    //   const res = await api.get(`/view-business-category`);
    //   // console.log("businesscate",res.data.data)
    //   setBusinessCat(res.data.data);
    // })();
      // const res = await api.get(`/view-business-category`)
      // setBusinessCat(res.data.data);
  }, [images]);

  // const maxNames = names.length;
  // const width = window.innerWidth + 20;
  // const length = names.length * 100;

  // const handleNext = () => {
  //   activeStep === 0
  //     ? setActiveStep(-200 * (maxNames - 1))
  //     : setActiveStep(activeStep + 200);
  //   setActiveStep(activeStep + 200);
  // };

  // const handleBack = () => {
  //   if (width - activeStep < length) {
  //     activeStep === -200 * (maxNames - 1)
  //       ? setActiveStep(0)
  //       : setActiveStep(activeStep - 200);
  //     setActiveStep(activeStep - 200);
  //   }
  // };

  return (
    <>
      <div className="categoryHeading">
        <h3>Categories</h3>
      </div>
      <div className="userdash_main">
    
        {loading ? (
            <Slider {...settings}>
          <>
            {loadingArray.map((i) => {
              return (
                <div className="card_skaleten-container">
                  <CardSkeleton />
                </div>
              );
            })}
          </>
          </Slider>
        ) : (
          <>
            {businessCat.map((val, index) => {
              return (
                <div
                  onClick={() =>
                    history.push(
                      "/business/user-dashboard/subcategories",
                      val._id
                    )
                  }
                  key={index}
                  style={{
                    transform: `translateX(${activeStep}%)`,
                    transition: "0.5s",
                  }}
                >
                  <div
                    //   onClick={() => {
                    //     getCategoryId(val);
                    //   }}
                    className="items_card_container"
                  >
                    <div className="items_card">
                      <img src={val.picture} alt="" />
                    </div>
                    <p className="items_cardText">{val.name}</p>
                  </div>
                </div>
              );
            })}
          </>
        )}
        {/* <div
          style={{
            position: "absolute",
            left: 0,
            zIndex: 100,
            paddingLeft: "10px",
          }}
        >
          {activeStep === 0 ? null : (
            <IconButton onClick={handleNext} style={{ outline: "none" }}>
              <ChevronLeftIcon
                style={{
                  backgroundColor: "#f05458c2",
                  borderRadius: "50px",
                  outline: "none",
                  fontSize: "30px",
                }}
              />
            </IconButton>
          )}
        </div>
        <div
          style={{
            right: 0,
            position: "absolute",
            zIndex: 100,
            paddingRight: "10px",
          }}
        >
          {width - activeStep > length ? null : (
            <IconButton style={{ outline: "none" }} onClick={handleBack}>
              <ChevronRightIcon
                style={{
                  backgroundColor: "#f05458c2",
                  borderRadius: "50px",
                  outline: "none",
                  fontSize: "30px",
                }}
              />
            </IconButton>
          )}
        </div> */}
      </div>
    </>
  );
};

export default Categories;

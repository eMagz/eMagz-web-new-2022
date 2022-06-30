import React, { useState, useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import { BaseUrl,api } from "../../../../API";

import { useHistory } from "react-router-dom";

import "./index.css";
import axios from "axios";

const SubCategories = ({ subCategories, setSubCategoriesProducts }) => {
  const [activeStep, setActiveStep] = useState(0);

  const history = useHistory();

  useEffect(() => {}, [subCategories]);

  const [names, setName] = useState([
    { name: "Debanjan" },
    { name: "Arjun" },
    { name: "Nasim" },
    { name: "Sudipta" },
    { name: "Ayesh" },
    { name: "Debasish" },
    { name: "Raja" },
    { name: "Snehasish" },
    { name: "Ayesh" },
    { name: "Debasish" },
    { name: "Raja" },
    { name: "Snehasish" },
    { name: "Ayesh" },
    { name: "Debasish" },
    { name: "Raja" },
    { name: "Snehasish" },
    { name: "Ayesh" },
    { name: "Debasish" },
    { name: "Raja" },
    { name: "S" },
  ]);

  const maxNames = names.length;
  const width = window.innerWidth + 20;
  const length = names.length * 100;

  const handleNext = () => {
    activeStep === 0
      ? setActiveStep(-200 * (maxNames - 1))
      : setActiveStep(activeStep + 200);
    setActiveStep(activeStep + 200);
  };

  const handleBack = () => {
    if (width - activeStep < length) {
      activeStep === -200 * (maxNames - 1)
        ? setActiveStep(0)
        : setActiveStep(activeStep - 200);
      setActiveStep(activeStep - 200);
    }
  };
  const handleSubCategories = async (data) => {
    // axios
    //   .get(`${BaseUrl}/products-pagination/${data._id}?page=0&limit=${10}`)
    //   .then((res) => setSubCategoriesProducts(res.data.data));
    const res = await api.get(`/products-pagination/${data._id}?page=0&limit=${10}`)
    setSubCategoriesProducts(res.data.data);
  };
  return (
    <>
      <div className="categoryHeading">
        <h3>Categories</h3>
      </div>
      <div className="userdash_main">
        {subCategories.map((val, index) => {
          return (
            <div
              onClick={() => handleSubCategories(val)}
              key={val._id}
              style={{
                transform: `translateX(${activeStep}%)`,
                transition: "0.5s",
              }}
            >
              <div className="items_card_container">
                <div className="items_card">
                  <img src={val.picture} alt="" />
                </div>
                <p className="items_cardText">{val.name}</p>
              </div>
            </div>
          );
        })}
        <div
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
                  marginTop: "3px",
                  outline: "none",
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
                  marginTop: "3px",
                  outline: "none",
                }}
              />
            </IconButton>
          )}
        </div>
      </div>
    </>
  );
};

export default SubCategories;

import React, { useState, useEffect } from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import Carasol from "./components/Carasol";
import Header from "../Navbar";
import Footer from "./components/Footer";
import {api } from "../../../API";
import CategoryComponent from "./components/Categories";
import NewArrivalComponents from "./components/NewArivalProducts";
import FaishionComponents from "./components/FaishionProducts";
import SelectFashion from "./components/SelectFashion";
import NewShoose from "./components/NewShoose";
import WinterSpecial from "./components/WinterSpecial";

import shoos1 from "../../../../assets/Rectangle 224.png";
import shoos2 from "../../../../assets/Rectangle 222.png";
import shoos3 from "../../../../assets/Rectangle 223.png";
import shoos4 from "../../../../assets/Rectangle 226.png";
import shoos5 from "../../../../assets/Rectangle 225.png";
import AllProducts from "./components/AllProducts";
import HomeSlider from "./HomeSlider";

const Shoosedata = [
  { name: "Product", price: 599, image: shoos2 },
  { name: "Product", price: 599, image: shoos3 },
  { name: "Product", price: 599, image: shoos4 },
  { name: "Product", price: 599, image: shoos5 },
];

const UserDashboard = () => {

  const [category, setCategory] = useState([]);
  const [faishion, setFaishion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchData,setSearchData] = useState("");
  const user = useSelector((state) => state.loginReducer.userDetails);
  const dispatch = useDispatch();
//  alert("user: ");
  console.log("user: ", user);
  const getAllCategory = () => {
    setLoading(true);
    api.get(`/view-business-category`).then((res) => {
      setCategory(res.data.data);
      console.log("datae",res.data.data[0].subcategories.category_id)
      api.get(`/fashion-products/${res.data.data[0].subcategories.category_id}`).then(
        (res) => {
          setFaishion(res.data.data);
          console.log("fashion data",res.data)
          setLoading(false);
        }
      );
    });
  };

  const getLoggedCartData = () => {
    api.get(`/view-cart/${user._id}`).then((res) => {
      console.log("CART DATA", res.data.data.cart);
      dispatch({
        type: "ADD_TO_CART",
        payload: res.data.data.cart,
      });
    });
  };

  useEffect(() => {
   getAllCategory();
    if (user._id !== undefined) {
      getLoggedCartData();
    }
  }, []);

  const getSearchData = async(e)=>{
    const res = await api.get(`/search-product/${e}`)
    await setSearchData(res.data.data.productDetails);
}
  return (
    <>
      <div>
        <Header getSearchData={getSearchData}/>
      </div>
      <HomeSlider />
      <CategoryComponent images={category} loading={loading} />
      <NewArrivalComponents />
      <FaishionComponents products={faishion} loading={loading} />
      <NewShoose data={Shoosedata} bigSchhose={shoos1} />
      <WinterSpecial />
      <AllProducts loading={loading} searchData={searchData}/>
      <Footer />
    </>
  );
};

export default UserDashboard;

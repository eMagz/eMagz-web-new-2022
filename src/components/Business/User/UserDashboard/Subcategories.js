import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../Navbar";
import Carasul from "./components/Carasol";
import { Select } from 'antd';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Slider from "@material-ui/core/Slider";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import "./index.css";
import SubcategoriesComponent from "./components/SubCategories";
import CardComponents from "./components/ProductCart";
import subImg from "../../../../assets/subheader.png";
import { BaseUrl, api } from "../../../API";
import axios from "axios";
import Footer from "./components/Footer"

import g2 from "../../../../assets/g2.png"
import g3 from "../../../../assets/g3.png"
import g4 from "../../../../assets/g4.png"
import g5 from "../../../../assets/g5.png"
import g6 from "../../../../assets/g6.png"
import NewShoose from "./components/NewShoose";
import SelectFashion from "./components/SelectFashion";



const grilsData = [
  { name: "Product", price: 599, image: g2 },
  { name: "Product", price: 599, image: g3 },
  { name: "Product", price: 599, image: g4 },
  { name: "Product", price: 599, image: g5 }
]

const { Option } = Select;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(1),
      float: "right",
      paddingRight: "20px",
    },
    sliderWidth: {
      width: 300,
    },
  },
}));

const Subcategories = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rangePrice, setRangePrice] = useState([0, 1000])
  const [maxPrice, setMaxPrice] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [subCategory, setSubCategory] = useState([]);
  const [categoryId, setSubCategoryId] = useState(null)
  const [subCategoriesProducts, setSubCategoriesProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleClick = () => {
    setOpen(!open);
  };



  useEffect(() => {
    setLoading(true);
    console.log("props.location.state", props.location.state);
    console.log("pageNumber", pageNumber);
    api
      .get(`${BaseUrl}/view-business-sub-category/${props.location.state}`)
      .then((res) => {
        setSubCategory(res.data.data);
        console.log("res.data.data", res.data.data);
        setSubCategoryId(res.data.data[0]._id)
        api
          .get(
            `${BaseUrl}/products-pagination/${res.data.data[0]._id
            }?page=${pageNumber}&limit=${10}`
          )
          .then((res) =>
            setSubCategoriesProducts(res.data.data));
        setLoading(false);
      });




    // const res = await api.get(`/view-business-sub-category/${props.location.state}`)
    // setSubCategory(res.data.data);
    // setSubCategoryId(res.data.data[0]._id)
    // const response = await api.get( `/products-pagination/${res.data.data[0]._id}?page=${pageNumber}&limit=${10}`);
    // setSubCategoriesProducts(response.data.data)
    // setLoading(false);
    // // .then((res) => {
    // //   setSubCategory(res.data.data);
    // //   setSubCategoryId(res.data.data[0]._id)
    // //   axios
    // //     .get(
    // //       `${BaseUrl}/products-pagination/${res.data.data[0]._id
    // //       }?page=${pageNumber}&limit=${10}`
    // //     )
    // //     .then((res) => setSubCategoriesProducts(res.data.data));
    // //   setLoading(false);
    // // });
  }, [pageNumber]);


  function valuetext(value) {
    return `${value}`;
  }

  const handlePriceFilter = (event, newValue) => {
    setMinPrice(Number(newValue[0]))
    setMaxPrice(Number(newValue[1]))
    setRangePrice(newValue)
    axios.post(`${BaseUrl}/product-price-filter/`, { total_price: Number(newValue[0]), tototalprice: Number(newValue[1]) }).then((res) => {
      setSubCategoriesProducts(res.data.data)
    })
  }

  console.log("setSubCategoryId", subCategoriesProducts)

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const usersPerPage = 5; // each page display only 5 records
  const pegesVisited = pageNumber * usersPerPage; // viewed records count
  const displayUsers = subCategoriesProducts.slice(pegesVisited, pegesVisited + usersPerPage); // slice the viewed records
  const pageCount = Math.ceil(subCategoriesProducts.length / usersPerPage); // total pages

  return (
    <>
      <Header subImage={subImg} />
      <Carasul />
      <div style={{ padding: "2rem 0" }}>
        {loading ? (
          <>Loading..</>
        ) : (
          <SubcategoriesComponent
            setSubCategoriesProducts={setSubCategoriesProducts}
            subCategories={subCategory}
          />
        )}
      </div>
      <div className="subCategoryContainer">
        <div className="filterContainer">
          <div className="filter-container">
            <h3>Filter</h3>
            <FilterListIcon className="filterIcon" />
          </div>
          <div className="filterBorder"></div>
          <div>
            <div className="price-container">
              <p>Price</p>
              <AddIcon className="addIcon" onClick={handleClick} />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <div className={classes.sliderWidth}>
                <Slider
                  value={rangePrice}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  onChange={handlePriceFilter}
                  max={5000}
                  min={0}
                />
              </div>
              <div className="selectManulaPrice">
                <span className="showRangePrice">Min {minPrice}</span>
                <span className="showRangePrice">Max {maxPrice}</span>
              </div>
            </Collapse>
            <div className="price-container">
              <p>Latest</p>
              <AddIcon className="addIcon" />
            </div>
            <div className="price-container">
              <p>Rating</p>
              <AddIcon className="addIcon" />
            </div>
            <div className="price-container">
              <p>Brand</p>
              <AddIcon className="addIcon" />
            </div>
            <div className="price-container">
              <p>Color</p>
              <AddIcon className="addIcon" />
            </div>
            <div className="price-container">
              <p>Size</p>
              <AddIcon className="addIcon" />
            </div>
          </div>
        </div>
        <div className="Subcategoryproducts">
          {subCategoriesProducts.length > 0 &&
            subCategoriesProducts.map((item) => <CardComponents item={item} />)}
        </div>

      </div>
      <div className={classes.root}>
        <Pagination
          count={pageCount}
          defaultPage={pageNumber}
          variant="outlined"
          shape="rounded"
          onChange={(e, pn) => setPageNumber(pn)}
        />
      </div>
      <div style={{ padding: "2rem 0" }}>
        <NewShoose data={grilsData} bigSchhose={g6} />
        <SelectFashion />
      </div>
      <Footer />
    </>
  );
};

export default Subcategories;

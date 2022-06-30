import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./index.css";
import TopNavbar from "../TopNavbar";
import VendorMenu from "../VendorMenu";
import g3 from "../../../../assets/s1.jpeg";
import MagnifyingGlass from "../../../../assets/MagnifyingGlass.png";
import filterIcon from "../../../../assets/filterIcon.png";
import ProductType from "./PaymentTable";
import axios from "axios";
import { BaseUrl } from "../../../API";
import { Collapse } from "reactstrap";

const sampleData = [
  {
    trId: "54JK6H45K6H",
    name: "Md Riyaz Kazmi",
    date: "24-02-2013",
    gst: 200,
    total: 499,
  },
  {
    trId: "54JK6H45K6H",
    name: "Md Riyaz Kazmi",
    date: "24-02-2013",
    gst: 200,
    total: 499,
  },
  {
    trId: "54JK6H45K6H",
    name: "Md Riyaz Kazmi",
    date: "24-02-2013",
    gst: 200,
    total: 499,
  },
  {
    trId: "54JK6H45K6H",
    name: "Md Riyaz Kazmi",
    date: "24-02-2013",
    gst: 200,
    total: 499,
  },
  {
    trId: "54JK6H45K6H",
    name: "Md Riyaz Kazmi",
    date: "24-02-2013",
    gst: 200,
    total: 499,
  },
  {
    trId: "54JK6H45K6H",
    name: "Md Riyaz Kazmi",
    date: "24-02-2013",
    gst: 200,
    total: 499,
  },
  {
    trId: "54JK6H45K6H",
    name: "Md Riyaz Kazmi",
    date: "24-02-2013",
    gst: 200,
    total: 499,
  },
  {
    trId: "54JK6H45K6H",
    name: "Md Riyaz Kazmi",
    date: "24-02-2013",
    gst: 200,
    total: 499,
  },
  {
    trId: "54JK6H45K6H",
    name: "Md Riyaz Kazmi",
    date: "24-02-2013",
    gst: 200,
    total: 499,
  },
  {
    trId: "54JK6H45K6H",
    name: "Md Riyaz Kazmi",
    date: "24-02-2013",
    gst: 200,
    total: 499,
  },
  {
    trId: "54JK6H45K6H",
    name: "Md Riyaz Kazmi",
    date: "24-02-2013",
    gst: 200,
    total: 499,
  },
];

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#000000",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    borderRadius: "15px",
  },
}));

const Index = ({ history }) => {
  const classes = useStyles();
  const [isLoading, isSetLoading] = useState(false);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [clickedBtn, setClickedBtn] = useState("All Order");
  const [filterRangePriceTrack, setFilterRangePriceTrack] =
    useState("Below 500");
  const [currentItem, setCurrentItem] = useState({});
  const [filterTag, setFilterTag] = useState("");

  const [filterPrice, setFilterPrice] = useState(false);
  const [orderViewModal, setOrderViewModal] = useState(false);
  const { loginReducer, vendorReducer } = useSelector((state) => ({
    ...state,
  }));
  const { userDetails } = loginReducer;
  const { vendorDetails } = vendorReducer;
  console.log("vendor details",vendorDetails);

  const [open, setOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleModal = () => setOpen(!open);
  const toggleFilterModal = () => setIsFilterOpen(!isFilterOpen);
  const togglePrice = () => setFilterPrice(!filterPrice);
  const toggleViewModal = () => setOrderViewModal(!orderViewModal);

  const handleFilterChange = (event) => {
    setFilterTag(event.target.value);
  };

  const getOrderedProducts = async () => {
    let tempData = [];
    isSetLoading(true);
    if (vendorDetails.length > 0) {
      await axios
        .get(`${BaseUrl}/vendor-order-list/${vendorDetails[0]._id}`)
        .then((res) => {
          console.log("vendor-order-list: ", res);
          res.data.data.forEach((item) => {
            tempData.push(item.order);
          });
          setOrderedProducts(tempData);
          isSetLoading(false);
        });
    }
  };
  useEffect(() => {
      getOrderedProducts();
  },[]);

  const handleChangeOrder = async (btnName) => {
    if (vendorDetails.length > 0) {
      if (btnName === "Recent") {
        const tempData = [];
        setClickedBtn(btnName);

        await axios
          .get(`${BaseUrl}/vendor-recent-orders/${vendorDetails[0]._id}`)
          .then((res) => {
            res.data.data.forEach((item) => {
              tempData.push(item.order);
            });
            setOrderedProducts(tempData);
          });
      } else if (btnName === "Pending") {
        const tempData = [];
        setClickedBtn(btnName);
        await axios
          .get(`${BaseUrl}/vendor-pending-orders/${vendorDetails[0]._id}`)
          .then((res) => {
            res.data.data.forEach((item) => {
              tempData.push(item.order);
            });
            setOrderedProducts(tempData);
          });
      } else if (btnName === "Delivery") {
        const tempData = [];
        setClickedBtn(btnName);
        await axios
          .get(
            `${BaseUrl}/vendor-delivered-dispatch-orders/${vendorDetails[0]._id}`
          )
          .then((res) => {
            res.data.deliveredorderDetails.forEach((item) => {
              tempData.push(item.order);
            });
            res.data.dispatchedorderDetails.forEach((item) => {
              tempData.push(item.order);
            });
            setOrderedProducts(tempData);
          });
      } else if (btnName === "Canceled") {
        const tempData = [];
        setClickedBtn(btnName);
        await axios
          .get(`${BaseUrl}/vendor-cancelled-orders/${vendorDetails[0]._id}`)
          .then((res) => {
            res.data.data.forEach((item) => {
              tempData.push(item.order);
            });
            setOrderedProducts(tempData);
          });
      } else if (btnName === "All Order") {
        const tempData = [];
        setClickedBtn(btnName);
        await axios
          .get(`${BaseUrl}/vendor-order-list/${vendorDetails[0]._id}`)
          .then((res) => {
            res.data.data.forEach((item) => {
              tempData.push(item.order);
            });
            setOrderedProducts(tempData);
          });
      }
    }
  };

  const handlePrice = (e) => {
    console.log("currentItem", e.target.value);
  };
  return (
    <>
      <div className="vendorManiContainer">
        <div className="vendorManiWrapper">
          <VendorMenu />
          <div className="productMainContent">
            <div className="vendorMainWrapper">
              <TopNavbar products="Products" products="Payment" />
              <div className="order-btn__container payment-btn__extra-container">
                <div className="payment-btn__container">
                  <div className="order-btn__action">
                    <button
                      onClick={() => handleChangeOrder("All Order")}
                      className={clickedBtn === "All Order" && "allorders"}
                    >
                      All order
                    </button>
                  </div>
                  <div className="order-btn__action">
                    <button
                      onClick={() => handleChangeOrder("Recent")}
                      className={clickedBtn === "Recent" && "allorders"}
                    >
                      Recent
                    </button>
                  </div>
                  <div className="order-btn__action">
                    <button
                      onClick={() => handleChangeOrder("Pending")}
                      className={clickedBtn === "Pending" && "allorders"}
                    >
                      Pending
                    </button>
                  </div>
                </div>
                <div className="filter-button__container">
                  <span className="orderSearchBtn">
                    <img src={MagnifyingGlass} />
                  </span>
                  <span className="orderSearchDateBtn">DD/MM/YY</span>
                  <div
                    className="product-filter__section"
                    onClick={() => toggleFilterModal()}
                  >
                    <span>Filter</span>
                    <img src={filterIcon} />
                  </div>
                </div>
              </div>
              <div className="product-filter">
                <h3 className="Vendorpayment__heading">Payment</h3>
              </div>
              <div className="dashBoredOrder">
                <div className="vendorDashBoradOrderHeadingOrder">
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>Transaction ID</p>
                  </div>
                  <div className="Vendor_Order-lineName">
                    {" "}
                    <p>Name</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    <p>Date</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p> GST</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>Total</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    <p>Action</p>
                  </div>
                </div>
                <div className="payment-list-container">
                  {sampleData.map((item) => (
                    <ProductType
                      item={item}
                      toggleModal={toggleModal}
                      toggleViewModal={toggleViewModal}
                      setCurrentItem={setCurrentItem}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>


      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isFilterOpen}
          onClose={toggleFilterModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isFilterOpen}>
            <div className={classes.paper}>
              <div className="order-productFilterModal__wrapper">
                <div className="order-productFilterModal__container">
                  <div className="order-productModal__heading">
                    <h3>Filter</h3>
                    <p onClick={() => toggleFilterModal()}>X</p>
                  </div>
                  <div className="order-productModal__filterTags">
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={filterTag}
                        onChange={handleFilterChange}
                      >
                        <FormControlLabel
                          value="Price"
                          control={<Radio onClick={() => togglePrice()} />}
                          label="By Price"
                        />
                        <Collapse isOpen={filterPrice}>
                          <div className="list__price-filter">
                            <span
                              className={
                                `${filterRangePriceTrack}` == "Below 500" &&
                                "list__price-filterListBackground"
                              }
                              onClick={() =>
                                setFilterRangePriceTrack("Below 500")
                              }
                            >
                              Below 500{" "}
                            </span>
                            <span
                              className={
                                `${filterRangePriceTrack}` == "500 - 1000" &&
                                "list__price-filterListBackground"
                              }
                              onClick={() =>
                                setFilterRangePriceTrack("500 - 1000")
                              }
                            >
                              500 - 1000
                            </span>
                            <span
                              className={
                                `${filterRangePriceTrack}` == "1000 - 5000" &&
                                "list__price-filterListBackground"
                              }
                              onClick={() =>
                                setFilterRangePriceTrack("1000 - 5000")
                              }
                            >
                              1000 - 5000
                            </span>
                            <span
                              className={
                                `${filterRangePriceTrack}` == "Above 5000" &&
                                "list__price-filterListBackground"
                              }
                              onClick={() =>
                                setFilterRangePriceTrack("Above 5000")
                              }
                            >
                              Above 5000
                            </span>
                            <div className="addPriceSearchExtra">
                              {" "}
                              <p>+</p>{" "}
                            </div>
                          </div>
                        </Collapse>
                        <FormControlLabel
                          value="By Product"
                          control={<Radio />}
                          label="By Product"
                        />
                        <FormControlLabel
                          value="By Date"
                          control={<Radio />}
                          label="By Date"
                        />
                        <FormControlLabel
                          value="By Recent"
                          control={<Radio />}
                          label="By Recent"
                        />
                        <FormControlLabel
                          value="By A-Z"
                          control={<Radio />}
                          label="By A-Z"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div className="order-productModal__btn-Container">
                    <button className="order-productModal__viewDetails">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default Index;

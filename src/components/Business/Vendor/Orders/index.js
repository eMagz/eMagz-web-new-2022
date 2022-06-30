import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Pagination from "@material-ui/lab/Pagination";
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
import ProductType from "./OrderList";
import axios from "axios";
import { BaseUrl } from "../../../API";
import { Collapse } from "reactstrap";

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
  const [isLoading, isSetLoading] = useState(false);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [clickedBtn, setClickedBtn] = useState("All Order");
  const [filterRangePriceTrack, setFilterRangePriceTrack] =
    useState("Below 500");
  const [currentItem, setCurrentItem] = useState({});
  const [filterTag, setFilterTag] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  console.log("pageNumber", pageNumber);
  const [limit, setLimit] = useState(10);
  console.log("limit", limit);
  const [totalOrders, setTotalOrders] = useState(27);
  const [filterPrice, setFilterPrice] = useState(false);
  const [orderViewModal, setOrderViewModal] = useState(false);
  const { loginReducer, vendorReducer } = useSelector((state) => ({
    ...state,
  }));
  const { userDetails } = loginReducer;
  const { vendorDetails } = vendorReducer;
  console.log("history", vendorDetails);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleModal = () => setOpen(!open);
  const toggleFilterModal = () => setIsFilterOpen(!isFilterOpen);
  const togglePrice = () => setFilterPrice(!filterPrice);
  const toggleViewModal = () => setOrderViewModal(!orderViewModal);

  const handleFilterChange = (event) => {
    setFilterTag(event.target.value);
  };

  const getOrderedProducts = () => {
    let tempData = [];
    isSetLoading(true);
    if (vendorDetails.length > 0) {
      axios
        .get(
          `${BaseUrl}/vendor-order-list/${vendorDetails[0]._id}?page=${pageNumber}&limit=${limit}`
        )
        .then((res) => {
          console.log("response", res);
          res.data.data.orderDetails.forEach((item) => {
            tempData.push(item.order);
          });
          setOrderedProducts(tempData);
          isSetLoading(false);
        });
    }
  };
  useEffect(() => {
    getOrderedProducts();
  }, [pageNumber]);

  const handleChangeOrder = async (btnName) => {
    console.log(`${btnName} Triggerd`);
    console.log(`Clicked Button is :${clickedBtn}`);
    console.log("v details: ", vendorDetails);
    if (vendorDetails.length > 0) {
      if (btnName === "Recent") {
        const tempData = [];
        setClickedBtn(btnName);
        await axios
          .get(
            `${BaseUrl}/vendor-recent-orders/${vendorDetails[0]._id}?page=${pageNumber}&limit=${limit}
        `
          )
          .then((res) => {
            res.data.data.forEach((item) => {
              tempData.push(item.order);
            });
            setOrderedProducts(tempData);
          });
      } else if (btnName === "Pending") {
        console.log(`${btnName} Triggerd`);
        const tempData = [];
        setClickedBtn(btnName);
        await axios
          .get(
            `${BaseUrl}/vendor-pending-orders/${vendorDetails[0]._id}?page=${pageNumber}&limit=${limit}`
          )
          .then((res) => {
            res.data.data.pendingorderDetails.forEach((item) => {
              tempData.push(item.order);
            });
            setOrderedProducts(tempData);
          });
      } else if (btnName === "Delivery") {
        console.log(`${btnName} Triggerd`);
        const tempData = [];
        setClickedBtn(btnName);
        await axios
          .get(
            `${BaseUrl}/vendor-delivered-dispatch-orders/${vendorDetails[0]._id}?page=${pageNumber}&limit=${limit}`
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
        console.log(`${btnName} Triggerd`);
        const tempData = [];
        setClickedBtn(btnName);
        await axios
          .get(
            `${BaseUrl}/vendor-cancelled-orders/${vendorDetails[0]._id}?page=${pageNumber}&limit=${limit}`
          )
          .then((res) => {
            res.data.data.cancelledorderDetails.forEach((item) => {
              tempData.push(item.order);
            });
            setOrderedProducts(tempData);
          });
      } else if (btnName === "All Order") {
        console.log(`${btnName} Triggerd`);
        const tempData = [];
        setClickedBtn(btnName);
        await axios
          .get(
            `${BaseUrl}/vendor-order-list/${vendorDetails[0]._id}?page=${pageNumber}&limit=${limit}`
          )
          .then((res) => {
            res.data.data.orderDetails.forEach((item) => {
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
              <TopNavbar pageHeading="Order" />
              <div className="order-btn__container">
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
                <div className="order-btn__action">
                  <button
                    onClick={() => handleChangeOrder("Canceled")}
                    className={clickedBtn === "Canceled" && "allorders"}
                  >
                    Cancelled
                  </button>
                </div>
                <div className="order-btn__action">
                  <button
                    onClick={() => handleChangeOrder("Delivery")}
                    className={clickedBtn === "Delivery" && "allorders"}
                  >
                    Delivery
                  </button>
                </div>
              </div>
              <div className="product-filter">
                <h3>Order List</h3>
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
              <div className="dashBoredOrder">
                <div className="vendorDashBoradOrderHeadingOrder">
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>Order ID</p>
                  </div>
                  <div className="Vendor_Order-lineName">
                    {" "}
                    <p>Name</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    <p>Qty</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>GST</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>Total</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>Status</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    <p>Action</p>
                  </div>
                </div>
                <div className="orders-list-container">
                  {orderedProducts.map((item) => (
                    <ProductType
                      item={item}
                      toggleModal={toggleModal}
                      toggleViewModal={toggleViewModal}
                      setCurrentItem={setCurrentItem}
                    />
                  ))}
                </div>
                <div className={classes.root}>
                  <Pagination
                    count={Math.round(totalOrders / 5)}
                    defaultPage={pageNumber}
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, pn) => setPageNumber(pn)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={toggleModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div className="order-productModal__wrapper">
                <div className="order-productModal__container">
                  <div className="order-productModal__heading">
                    <h3>Quick Edit</h3>
                    <p onClick={() => toggleModal()}>X</p>
                  </div>
                  <div className="order-productModal__content">
                    <div className="order-productModal__image">
                      <img src={currentItem.picture} />
                    </div>
                    <div className="order-productModal__details">
                      <div className="order-productModal__detailsInfo">
                        <div className="order-productModal__orderId">
                          <p>Order ID</p>
                          <input
                            className="orderEditInput"
                            value={currentItem.order_id}
                          />
                        </div>
                        <div className="order-productModal__date">
                          <p>Order Date</p>
                          <input
                            className="orderEditInput"
                            value={currentItem.date}
                          />
                        </div>
                      </div>
                      <div className="order-productModal__detailsInfo">
                        <div className="order-productModal__productName">
                          <p>Product Name</p>
                          <input
                            className="orderEditInput"
                            value={currentItem.name}
                          />
                        </div>
                        <div className="order-productModal__color">
                          <p>Color</p>
                          <input
                            className="orderEditInput"
                            value={currentItem.quantity}
                          />
                        </div>
                      </div>
                      <div className="order-productModal__detailsInfo">
                        <div className="order-productModal__orderId">
                          <p>Status</p>
                          <div className="order-productModal__update">
                            <select className="order-productModal__select">
                              <option value="volvo">Delivered</option>
                              <option value="saab">Dispatch</option>
                              <option value="opel">Pending</option>
                              <option value="audi">Cancelled</option>
                            </select>
                          </div>
                        </div>
                        <div className="order-productModal__date">
                          <p>Customer Name</p>
                          <input
                            className="orderEditInput"
                            value={currentItem.customer_name}
                          />
                        </div>
                      </div>
                      <div className="order-productModal__detailsInfo">
                        <div className="order-productModal__orderId">
                          <p>Price</p>
                          <input
                            className="orderEditInputPrice"
                            value={currentItem.price}
                          />
                        </div>
                        <div className="order-productModal__date">
                          <p>GST</p>
                          <input
                            className="orderEditInputPrice"
                            value={Math.ceil(currentItem.gst_amount)}
                          />
                        </div>
                        <div className="order-productModal__date">
                          <p>Total</p>
                          <input
                            className="orderEditInputPrice"
                            value={currentItem.total_price}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-productModal__btn-Container">
                    <button className="order-productModal__viewDetails">
                      View Details
                    </button>
                    <button className="order-productModal__updateStatus">
                      Update Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
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
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={orderViewModal}
          onClose={toggleViewModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={orderViewModal}>
            <div className={classes.paper}>
              <div className="order-productViewModal__wrapper">
                <div className="order-productModal__container">
                  <div className="order-productModal__heading">
                    <h3>View</h3>
                    <p onClick={() => toggleViewModal()}>X</p>
                  </div>
                  <div className="order-OrderViewModal__content">
                    <div className="order-OrderViewModal__image">
                      <img src={currentItem.picture} />
                      <div className="pendingColorStatus__container">
                        <div className="pendingColorStatus"></div>
                        <span>Pending</span>
                      </div>
                    </div>
                    <div className="order-OrderViewModal__inputContainer">
                      <div className="order-OrderViewModal__inputContainer1">
                        <div className="order-OrderViewModal__info">
                          <p>Product</p>
                          <span>Sony Wireless Headset</span>
                        </div>
                        <div className="order-OrderViewModal__info">
                          <p>Status</p>
                          <span>Pending</span>
                        </div>
                        <div className="order-OrderViewModal__info">
                          <p>Order Date</p>
                          <span>12-5-2021</span>
                        </div>
                      </div>
                      <div className="order-OrderViewModal__inputContainer2">
                        <div className="order-OrderViewModal__info">
                          <p>Product</p>
                          <span>Sony Wireless Headset</span>
                        </div>
                        <div className="order-OrderViewModal__info">
                          <p>Status</p>
                          <span>Pending</span>
                        </div>
                        <div className="order-OrderViewModal__info">
                          <p>Order Date</p>
                          <span>12-5-2021</span>
                        </div>
                      </div>
                      <div className="order-OrderViewModal__inputContainer3">
                        <p className="order-OrderViewModal__address">Address</p>
                        <div className="order-OrderViewModal__addressText">
                          <p>
                            In publishing and graphic design, Lorem ipsum is a
                            placeholder text commonly used to demonstrate the
                            visual form of a document or a typeface without
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="addproductdetails__containerBtn">
                    <button className="addproduct__btn-cancel addDetails__btn-cancel holdText">
                      Hold Product{" "}
                    </button>
                    <button className="addproduct__btn-add addDetails__btn-cancel holdText">
                      Send Product
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

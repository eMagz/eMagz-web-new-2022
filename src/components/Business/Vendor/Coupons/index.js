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
import ProductType from "../Orders/OrderList";
import axios from "axios";
import { BaseUrl } from "../../../API";
import { Collapse } from "reactstrap";
import CurrentCouponComponent from "./CurrentCouponComponent";
import CouponTable from "./CouponTable";
// import deleteMeaage from "../../../../../../assets/deleteMeaage.png";
import deleteMeaage from "../../../../../src/assets/deleteMeaage.png";

const sampleData = [
  {
    code: "K6H45K6F456",
    value: 299,
    startTime: "12-02-2021; 04:30am",
    endTime: "12-02-2021; 04:30am",
    applyedUsers: 20,
    status: "OnGoing",
  },
  {
    code: "K6H45K6F456",
    value: 299,
    startTime: "12-02-2021; 04:30am",
    endTime: "12-02-2021; 04:30am",
    applyedUsers: 20,
    status: "Hold",
  },
  {
    code: "K6H45K6F456",
    value: 299,
    startTime: "12-02-2021; 04:30am",
    endTime: "12-02-2021; 04:30am",
    applyedUsers: 20,
    status: "OnGoing",
  },
  {
    code: "K6H45K6F456",
    value: 299,
    startTime: "12-02-2021; 04:30am",
    endTime: "12-02-2021; 04:30am",
    applyedUsers: 20,
    status: "OnGoing",
  },
  {
    code: "K6H45K6F456",
    value: 299,
    startTime: "12-02-2021; 04:30am",
    endTime: "12-02-2021; 04:30am",
    applyedUsers: 20,
    status: "Experid",
  },
  {
    code: "K6H45K6F456",
    value: 299,
    startTime: "12-02-2021; 04:30am",
    endTime: "12-02-2021; 04:30am",
    applyedUsers: 20,
    status: "OnGoing",
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
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentDetails, setCurrentDetails] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterTag, setFilterTag] = useState("");
  const [filterPrice, setFilterPrice] = useState(false);
  const [filterRangePriceTrack, setFilterRangePriceTrack] =
    useState("Below 500");
  // const [pageNumber, setPageNumber] = useState(1);
  // const [totalProducts, setTotalProducts] = useState("");

  // const toggleModal = () => setOpen(!open);
  // const toggleModalDelete = () => setDeleteModal(!deleteModal);
  const toggleFilterModal = () => setIsFilterOpen(!isFilterOpen);
  const togglePrice = () => setFilterPrice(!filterPrice);
  const handleFilterChange = (event) => {
    setFilterTag(event.target.value);
  };

  return (
    <>
      <div className="vendorManiContainer">
        <div className="vendorManiWrapper">
          <VendorMenu />
          <div className="productMainContent">
            <div className="vendorMainWrapper">
              <TopNavbar pageHeading="Coupon" />
              {/* coupon */}
              {/* <CurrentCouponComponent /> */}
              <h5 className="coupan_heading">On Going Coupons</h5>
              <div className="coupon_main">
                <div className="coupon_card">
                  <div className="coupon_left"></div>
                  <div className="coupon_right"></div>
                  <p>Coupon Code</p>
                  <div className="coupon_content">
                    <p>lorem lorem lorem lorem lorem lorem</p>
                    <p className="coupon_expire">02/05/21</p>
                  </div>
                  <span className="coupon_span">25%</span>
                  <p className="coupon_off">Off</p>
                  <button>Apply Code</button>
                </div>

                <div className="coupon_card">
                  <div className="coupon_left"></div>
                  <div className="coupon_right"></div>
                  <p>Coupon Code</p>
                  <div className="coupon_content">
                    <p>lorem lorem lorem lorem lorem lorem</p>
                    <p className="coupon_expire">02/05/21</p>
                  </div>
                  <span className="coupon_span">25%</span>
                  <p className="coupon_off">Off</p>
                  <button>Apply Code</button>
                </div>

                <div className="coupon_card">
                  <div className="coupon_left"></div>
                  <div className="coupon_right"></div>
                  <p>Coupon Code</p>
                  <div className="coupon_content">
                    <p>lorem lorem lorem lorem lorem lorem</p>
                    <p className="coupon_expire">02/05/21</p>
                  </div>
                  <span className="coupon_span">25%</span>
                  <p className="coupon_off">Off</p>
                  <button>Apply Code</button>
                </div>

                <div className="coupon_card">
                  <div className="coupon_left"></div>
                  <div className="coupon_right"></div>
                  <p>Coupon Code</p>
                  <div className="coupon_content">
                    <p>lorem lorem lorem lorem lorem lorem</p>
                    <p className="coupon_expire">02/05/21</p>
                  </div>
                  <span className="coupon_span">25%</span>
                  <p className="coupon_off">Off</p>
                  <button>Apply Code</button>
                </div>

                <div className="coupon_card">
                  <div className="coupon_left"></div>
                  <div className="coupon_right"></div>
                  <p>Coupon Code</p>
                  <div className="coupon_content">
                    <p>lorem lorem lorem lorem lorem lorem</p>
                    <p className="coupon_expire">02/05/21</p>
                  </div>
                  <span className="coupon_span">25%</span>
                  <p className="coupon_off">Off</p>
                  <button>Apply Code</button>
                </div>

                <div className="coupon_card">
                  <div className="coupon_left"></div>
                  <div className="coupon_right"></div>
                  <p>Coupon Code</p>
                  <div className="coupon_content">
                    <p>lorem lorem lorem lorem lorem lorem</p>
                    <p className="coupon_expire">02/05/21</p>
                  </div>
                  <span className="coupon_span">25%</span>
                  <p className="coupon_off">Off</p>
                  <button>Apply Code</button>
                </div>
              </div>
              <div className="order-btn__container payment-btn__extra-container">
                <h3 className="vendorCoupon__heading">Coupon List</h3>
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

              <div className="dashBoredOrder" id="coupon__table">
                <div className="vendorDashBoradOrderHeadingOrder">
                  <div className="Vendor_Order-lineName">
                    {" "}
                    <p>Coupon Code</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>Value</p>
                  </div>
                  <div className="Vendor_Order-lineName">
                    <p>Start Date &#38; Time</p>
                  </div>
                  <div className="Vendor_Order-lineName">
                    {" "}
                    <p>End Date &#38; Time</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>No. Users</p>
                  </div>
                  <div className="Vendor_Order-lineFlex">
                    {" "}
                    <p>Status</p>
                  </div>
                  <div className="Vendor_Order-lineName">
                    <p>Action</p>
                  </div>
                </div>
                <div className="coupon-list-container">
                  {sampleData.map((item) => (
                    <CouponTable item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      {/* 
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
              <div
                className="order-productModal__wrapper"
                style={{ height: "430px" }}
              >
                <div className="order-productModal__container">
                  <div className="order-productModal__heading">
                    <h3>Quick Edit</h3>
                    <p onClick={() => toggleModal()}>X</p>
                  </div>
                  <div className="order-productModal__content">
                    <div className="product-EditModal__image">
                      <img src={g3} />
                      <span>Update Picture</span>
                    </div>
                    <div className="product-EditModal__inputContainer">
                      <div className="product-EditModal__nameContainer">
                        <p>Name</p>
                        <input
                          value={currentDetails.name && currentDetails.name}
                        />
                      </div>
                      <div className="product-EditModal__priceContainer">
                        <div>
                          <p>Price</p>
                          <input />
                        </div>
                        <div>
                          <p>Size</p>
                          <input />
                        </div>
                      </div>
                      <div className="product-EditModal__stockContainer">
                        <div>
                          <p>Stock</p>
                          <input />
                        </div>
                        <div className="product-EditModal__colorCodeContainer">
                          <p>Color</p>
                          <div className="product-EditModal__colorCode">
                            <span style={{ backgroundColor: "#000000" }}></span>
                            <p>#000000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-productModal__btn-Container">
                    <button className="order-productModal__updateStatus">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div> */}
      {/* <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={deleteModal}
          onClose={toggleModalDelete}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={deleteModal}>
            <div className={classes.paper}>
              <div className="order-productModal__wrapper" style={{ height: "430px" }}>
                <div className="order-productModal__container">
                  <div className="order-deleteModal__container">
                    <div className="order-deleteModal__text">
                      <h3>Do you want to delete the product</h3>
                      <p>Once deleted, You will not able to recover it</p>
                    </div>
                    <div className="deleteIconImage">

                    </div>
                  </div>
                  <div className="order-deleteModal__btn-Container">
                    <button className="order-deleteModal__cancel">Cancel</button>
                    <button className="order-deleteModal__delete">
                      <img src={TrashSimple} /> Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div> */}
      {/* <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={deleteModal}
          onClose={toggleModalDelete}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={deleteModal}>
            <div className={classes.paper}>
              <div
                className="order-productModal__wrapper"
                style={{ height: "430px" }}
              >
                <div className="order-productModal__container">
                  <div className="order-addedProductModal__content">
                    <p onClick={() => toggleModalDelete()}>X</p>
                  </div>
                  <div className="order-deleteConfirmModal__container">
                    <div className="order-deleteConfirmModal__text">
                      <h3>You have succeessfully added your product</h3>
                      <p>You can edit this product later</p>
                    </div>
                    <div className="confirmIconImage">
                      <img src={deleteMeaage} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div> */}

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

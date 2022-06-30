import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Pagination from "@material-ui/lab/Pagination";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Backdrop from "@material-ui/core/Backdrop";
import "./index.css";
import TopNavbar from "../../../TopNavbar";
import VendorMenu from "../../../VendorMenu";
import g3 from "../../../../../../assets/s1.jpeg";
import filterIcon from "../../../../../../assets/filterIcon.png";
import manDeleteIcon from "../../../../../../assets/manDeleteIcon.png";

import deleteMeaage from "../../../../../../assets/deleteMeaage.png";
import ProductType from "./../../ProductTable";
import { api } from "../../../../../API";
import { Collapse } from "reactstrap";
import Trash from "../../../../../../assets/TrashW.svg";
import { useHistory } from "react-router-dom";
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
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState();
  const [currentDetails, setCurrentDetails] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterTag, setFilterTag] = useState("");
  const [filterPrice, setFilterPrice] = useState(false);
  const [productFilter, setProductFilter] = useState("");
  const [filterRangePriceTrack, setFilterRangePriceTrack] =
    useState("Below 500");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalProducts, setTotalProducts] = useState("");
  const toggleModal = () => setOpen(!open);
  const toggleModalDelete = () => setDeleteModal(!deleteModal);
  const toggleFilterModal = () => setIsFilterOpen(!isFilterOpen);
  const togglePrice = () => setFilterPrice(!filterPrice);
  const [filterWay, setFilterWay] = useState("");
  console.log("products", products);
  const historys = useHistory();
  const { loginReducer, vendorReducer } = useSelector((state) => ({
    ...state,
  }));
  const { vendorDetails } = vendorReducer;
  console.log("Productfilter", productFilter);
  const handleFilterChange = (event) => {
    setFilterTag(event.target.value);
  };

  products.map((item) => {
    console.log("myitemdata", item);
  });

  const byDate = () => {
    products.sort(function (x, y) {
      return new Date(y.createdAt) - new Date(x.createdAt);
    });
  };

  const byRecent = () => {
    products.sort(function (x, y) {
      const date = new Date();
      if (date) {
        return new Date(y.modifiedAt) - new Date(x.modifiedAt);
      }
    });
  };

  const aTOz = () => {
    const sortData = products.sort((a, b) => a.name.localeCompare(b.name));
    console.log("A to Z", sortData);
  };

  const byProduct = () => {
    const result = products.map((item) => item);
    console.log("result", result);
  };

  const allFilter = (e) => {
    console.log("my event", e);
    if (e == "aTOz") {
      aTOz();
    }
    if (e == "ByProduct") {
      byProduct();
    }
    if (e == "ByDate") {
      byDate();
    }

    if (e == "ByRecent") {
      byRecent();
    }
  };
  const viewFilter = () => {
    console.log("filterway", filterWay);
    // historys.push("/business/vendor-dashboard/products")
    // setIsFilterOpen(false)
    // (call=="aToz") ? aTOz() : "" ;
    // const allFilter = (e) =>{
    //   console.log("my event",e);
    //   if(e=="aTOz"){
    //       aTOz();
    //   }
    // }
    allFilter(filterWay);
    toggleFilterModal();
  };

  const getProducts = async () => {
    const TempData = [];
    isSetLoading(true);
    console.log("GEt products called");

    console.log("GEt products called2");
    api
      .get(
        `/vendor-all-products-list/${vendorDetails[0]._id}?page=${pageNumber}&limit=20`
      )
      .then((res) => {
        console.log("All products list: ", res);
        setProducts(res.data.data.productList);
        setTotalProducts(res.data.data.countvendorproducts);
        isSetLoading(false);
      });
  };

  useEffect(() => {
    if (vendorDetails.length > 0) {
      getProducts();
    }
  }, [pageNumber, vendorDetails, deleteModal]);

  console.log("CurrentValue", currentDetails);

  //   const deleteProduct = (id) =>{
  //     console.log("Product id is: ",id);
  //     axios.post(`${BaseUrl}/delete-product/${id}`).then((response)=>{
  //      console.log("delete successfull"+response);
  //     })
  // }
  const deleteProduct = (id) => {
    console.log("Product id is: ", id);
    api.post(`/delete-product/${id}`).then((response) => {
      toggleModalDelete();
      console.log("delete successfull" + response);
    });
  };

  return (
    <>
      <div className="vendorManiContainer">
        <div className="vendorManiWrapper">
          <VendorMenu />
          <div className="productMainContent">
            <div className="vendorMainWrapper">
              <TopNavbar pageHeading="Products" />
              <h3 className="top__products-text">Top Products</h3>
              <div className="top__products">
                {Array(10)
                  .fill(10)
                  .map((item) => (
                    <div className="top-products__img">
                      <img src={g3} />
                    </div>
                  ))}
              </div>
              <div className="product-filter">
                <h3>Product List</h3>
                <div className="filter-button__container">
                  <div
                    className="product-filter__section"
                    onClick={() => toggleFilterModal()}
                  >
                    <span> Filter</span>
                    <img src={filterIcon} />
                  </div>
                  <span
                    onClick={() =>
                      history.push(
                        "/business/vendor-dashboard/products/new-product"
                      )
                    }
                    className="add-product__section"
                  >
                    + Add Products
                  </span>
                </div>
              </div>
              <div className="dashBoredOrder" id="productlist__table">
                <div className="vendorDashBoradOrderProductHeading">
                  <div className="product-list-name Vendor_Order-lineImg">
                    {" "}
                    <p>Product Image</p>
                  </div>
                  <div className="product-list-name Vendor_Order-lineName">
                    {" "}
                    <p className="vendorDashBoradOrderHeadingName">
                      Product Name
                    </p>
                  </div>
                  <div className="product-list-name Vendor_Order-lineFlex">
                    <p>Stock</p>
                  </div>
                  <div className="product-list-name Vendor_Order-lineFlex">
                    {" "}
                    <p>GST %</p>
                  </div>
                  <div className="product-list-name Vendor_Order-lineFlex">
                    {" "}
                    <p>GST Type</p>
                  </div>
                  <div className="product-list-name Vendor_Order-lineFlex">
                    {" "}
                    <p>Actions</p>
                  </div>
                </div>
                <div className="product-list-container">
                  {products?.map((item) => (
                    <ProductType
                      item={item}
                      toggleModal={toggleModal}
                      setDeleteModalId={setDeleteModalId}
                      toggleModalDelete={toggleModalDelete}
                      setCurrentDetails={setCurrentDetails}
                      id={products}
                    />
                  ))}
                </div>
                {/* <div className={classes.root}>
                  <Pagination
                    count={Math.round(totalProducts / 5)}
                    defaultPage={pageNumber}
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, pn) => setPageNumber(pn)}
                  />
                </div> */}
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
                      <span className="letter">Update Picture</span>
                    </div>
                    <div className="product-EditModal__inputContainer">
                      <div className="product-EditModal__nameContainer">
                        <p>Name</p>
                        <input
                          value={currentDetails.name && currentDetails.name}
                        />
                      </div>
                      <div className="product-EditModal__priceContainer">
                        <div style={{ marginRight: "10px" }}>
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
      </div>
      <div>
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
                  <div className="order-deleteModal__container">
                    <div className="order-deleteModal__text">
                      <h3>Do you want to delete the product</h3>
                      <p>Once deleted, You will not able to recover it</p>
                    </div>
                    <div className="deleteIconImage"></div>
                  </div>
                  <div className="order-deleteModal__btn-Container">
                    <button className="order-deleteModal__cancel">
                      Cancel
                    </button>
                    <button
                      className="order-deleteModal__delete"
                      onClick={() => {
                        deleteProduct(deleteModalId);
                      }}
                    >
                      <img src={Trash} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>

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
                          value="ByProduct"
                          control={<Radio />}
                          label="By Product"
                          onClick={(e) => setFilterWay(e.target.value)}
                        />
                        <FormControlLabel
                          value="ByDate"
                          control={<Radio />}
                          label="By Date"
                          onClick={(e) => setFilterWay(e.target.value)}
                        />
                        <FormControlLabel
                          value="ByRecent"
                          control={<Radio />}
                          label="By Recent"
                          onClick={(e) => setFilterWay(e.target.value)}
                        />
                        <FormControlLabel
                          value="aTOz"
                          control={<Radio />}
                          label="By A-Z"
                          onClick={(e) => setFilterWay(e.target.value)}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="order-productModal__btn-Container">
                    <button
                      className="order-productModal__viewDetails"
                      onClick={() => viewFilter()}
                    >
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

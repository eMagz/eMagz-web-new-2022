import React, { useState, useEffect } from "react";
import "./index.css";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import TopNavbar from "../../../TopNavbar";
import VendorMenu from "../../../VendorMenu";
import g3 from "../../../../../../assets/g3.png";
import filterIcon from "../../../../../../assets/filterIcon.png";
import helpUpload from "../../../../../../assets/helpUpload.png";
import ProductDetailsTable from "./../../ProductDetailsTable";
import Pagination from "@material-ui/lab/Pagination";
import {api} from "../../../../../API";

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

const AddNewProductDetails = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, isSetLoading] = useState(false);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalProducts, setTotalProducts] = useState("");
  const [limit, setLimit] = useState(5);


  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentDetails, setCurrentDetails] = useState({});

  const toggleModal = () => setOpen(!open);
  const toggleModalDelete = () => setDeleteModal(!deleteModal);



  const { loginReducer, vendorReducer } = useSelector((state) => ({
    ...state,
  }));
  const { userDetails } = loginReducer;
  const { vendorDetails } = vendorReducer;

  const getOrderedProducts = () => {
    isSetLoading(true);
    api
      .get(
        `/vendor-product-details/${props.location.state}?page=${pageNumber}&limit=${limit}`
      )
      .then((res) => {
        console.log("orderedProducts: ", res);
        setOrderedProducts(res.data.data.ProuductDetailsList);
        setTotalProducts(res.data.data.countproductdetails);
        isSetLoading(false);
      });
  };
  useEffect(() => {
    getOrderedProducts();
  }, [pageNumber]);

  return (
    <div className="vendorManiContainer">
      <div className="vendorManiWrapper">
        <VendorMenu />
        <div className="productMainContent">
          <div className="vendorMainWrapper">
            <TopNavbar products="Products" />
          </div>
          <div className="add-product__headingDetails">
            <h3 >Product &#62; Sony Product Details</h3>
          </div>
          <div className="vendorDashBoradOrderProductHeading">
            <div className="product-list-name Vendor_Order-lineImg">
              {" "}
              <p>Image</p>
            </div>
            <div className="product-list-name Vendor_Order-lineName">
              {" "}
              <p>Product Name</p>
            </div>
            <div className="Vendor_Order-lineFlex">
              {" "}
              <p>Stock</p>
            </div>
            <div className="product-list-name Vendor_Order-lineFlex">
              <p>Color</p>
            </div>
            <div className="product-list-name Vendor_Order-lineFlex">
              <p>Size</p>
            </div>
            <div className="product-list-name Vendor_Order-lineFlex">
              <p>Price</p>
            </div>
            <div className="product-list-name Vendor_Order-lineFlex">
              {" "}
              <p>GST %</p>
            </div>
            <div className="product-list-name Vendor_Order-lineFlex">
              {" "}
              <p>Actions</p>
            </div>
          </div>
          <div className="product-destails__container">
            {orderedProducts.length > 0 ? (
              orderedProducts?.map((item) => (
                <ProductDetailsTable 
                item={item} 
                toggleModal={toggleModal}
                toggleModalDelete={toggleModalDelete}
                setCurrentDetails={setCurrentDetails}
                />
              ))
            ) : (
              <div className="product-destails__notavailable">
                <h3>No Products details available</h3>
              </div>
            )}
          </div>
          <div className="addproductdetails__containerBtn">
            <button className="addproduct__btn-cancel addDetails__btn-cancel">
              Manage
            </button>
            <button
              className="addproduct__btn-add addDetails__btn-cancel"
              onClick={() =>
                history.push(
                  "/business/vendor-dashboard/products/add-details",
                  props.location.state
                )
              }
            >
              + Add New
            </button>
          </div>
          {/* <div className={classes.root}>
            <Pagination
              count={Math.round(totalProducts / limit)}
              defaultPage={pageNumber}
              variant="outlined"
              shape="rounded"
              onChange={(e, pn) => setPageNumber(pn)}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddNewProductDetails;

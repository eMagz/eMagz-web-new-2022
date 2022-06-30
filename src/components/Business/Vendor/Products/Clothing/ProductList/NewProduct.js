import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import deleteMeaage from "../../../../../../assets/deleteMeaage.png";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import TopNavbar from "../../../TopNavbar";
import VendorMenu from "../../../VendorMenu";
import g3 from "../../../../../../assets/g3.png";
import filterIcon from "../../../../../../assets/filterIcon.png";
import helpUpload from "../../../../../../assets/helpUpload.png";
import ProductType from "./../../ProductTable";
import { api } from "../../../../../API";
import thumbImg from "../../../../../../assets/addprouduct_thumbnail.svg";
import swal from "@sweetalert/with-react";
import {useHistory} from "react-router-dom"
// import { getCategoryList, getSubategoryList, getGstPercentage } from "../../../utils"

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

const NewProduct = ({ history }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmited, setIsSubmited] = useState(false);
  const [message, setMessage] = useState("");
  const [textword, setTextWord] = useState("");
  const [productname, setProductname] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubategory] = useState("");
  const [gstpersen, setGstpersen] = useState("");
  const [gsttype, setGsttype] = useState("Include");
  const [categorylist, setCategorylist] = useState([]);
  const [subcategorylist, setSubcategorylist] = useState([]);
  const [gstlist, setGstlist] = useState([]);
  const [gsttypelist, setGsttypelist] = useState([]);
  const [description, setDescription] = useState("");
  console.log("product name",productname);
  console.log("category",category)
  console.log("subcategory",subcategory)
  console.log("gstpersen",gstpersen)
  console.log("gsttype",gsttype)
  console.log("categorylist",categorylist)
  console.log("subcategorylist",subcategorylist)
  console.log("description",description)
  // new image
  const [imageName1, setImageName1] = useState('');
  const [imageName2, setImageName2] = useState('');
  const [imageName3, setImageName3] = useState('');
  const [imageName4, setImageName4] = useState('');
  
  const [signaturephoto1, setSignaturephoto1] = useState("");
  const [signaturephoto2, setSignaturephoto2] = useState("");
  const [signaturephoto3, setSignaturephoto3] = useState("");
  const [signaturephoto4, setSignaturephoto4] = useState("");
  
  const [errors, setErrors] = useState({
    imageField1: false,
    imageField2: false,
    imageField3: false,
    imageField4: false,
    productName: false,
    categoryError: false,
    subSategoryError: false,
    percentage: false,
    gstType: false,
    description: false,
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadedImg, setUploadedImg] = useState([])
  const { loginReducer,vendorReducer } = useSelector((state) => ({ ...state }));
  const { vendorDetails } = vendorReducer;

  const signatureUploader1 = useRef(null);
  const signatureUploader2 = useRef(null);
  const signatureUploader3 = useRef(null);
  const signatureUploader4 = useRef(null);


  const onHandleSignatureChange1 = (e) => {
    const filesone = e.target.files[0];
    console.log('onHandleSignatureChange1', filesone.name, filesone)
    setSignaturephoto1(filesone);
    setImageName1(filesone.name.split(' ')[0])
    setErrors({ ...errors, imageField1: false })
};
const onHandleSignatureChange2 = (e) => {
    const filesone = e.target.files[0];
    console.log('onHandleSignatureChange2', filesone.name, filesone)
    setSignaturephoto2(filesone);
    setImageName2(filesone.name.split(' ')[0])
    setErrors({ ...errors, imageField2: false })
};
const onHandleSignatureChange3 = (e) => {
    const filesone = e.target.files[0];
    console.log('onHandleSignatureChange3', filesone.name, filesone)
    setSignaturephoto3(filesone);
    setImageName3(filesone.name.split(' ')[0])
    setErrors({ ...errors, imageField3: false })
};
const onHandleSignatureChange4 = (e) => {
    const filesone = e.target.files[0];
    setSignaturephoto4(filesone);
    console.log('onHandleSignatureChange4', filesone.name, filesone)
    setImageName4(filesone.name.split(' ')[0])
    setErrors({ ...errors, imageField4: false })
};

  const toggleModalDelete = () => setDeleteModal(!deleteModal);

  const getCategoryList = () => {
    api.get(`/view-business-category`).then((res) => {
      console.log("view-business-category: ", res);
      setCategorylist(res.data.data);
    });
  };
  const getSubategoryList = () => {
    api
      .get(`/view-business-sub-category/${category}`)
      .then((res) => {
        setSubcategorylist(res.data.data);
      });
  };
  const getGstPercentage = () => {
    api.get(`/viewgst`).then((res) => {
      setGstlist(res.data.data.gst);
      setGsttypelist(res.data.data.type);
    });
  };

  useEffect(() => {
    getCategoryList();
    getGstPercentage();
  }, []);

  useEffect(() => {
    if (category !== "") {
      getSubategoryList();
    }
  }, [category]);
const redirect = useHistory();
  const submitDetails = (e) => {
    e.preventDefault();
  if (!imageName1 != '') {
      return setErrors({ ...errors, imageField1: true })
  } else if (!imageName2 != '') {
      return setErrors({ ...errors, imageField2: true })
  }else if(!imageName3 != '') {
      return setErrors({ ...errors, imageField3: true })
  }else if (!imageName4 != '') {
      return setErrors({ ...errors, imageField4: true })
  } else if (!productname != "" && !productname.length < 3) {
      return setErrors({ ...errors, productName: true });
    } else if (!category != "") {
      return setErrors({ ...errors, categoryError: true });
    } else if (!subcategory != "") {
      return setErrors({ ...errors, subSategoryError: true });
    } else if (!gsttype != "") {
      return setErrors({ ...errors, gstType: true });
    } else if (!gstpersen != "") {
      return setErrors({ ...errors, percentage: true });
    } else if (!description != "") {
      return setErrors({ ...errors, description: true });
    }

    const body = {
      name: productname,
      description: description,
      vendor_id: vendorDetails[0]._id,
      category_id: category,
      sub_category_id: subcategory,
      gst_percentage: gstpersen,
      gst_type: gsttype,
    };
    api.post(`/add-product`, body).then((res) => {
      console.log("response",res);
       if (res.data.status === true) {
        toggleModalDelete();
        console.log('PRODUCT DETAILS ADDED', res.data.data)
        let formData = new FormData()
        formData.append("picture", signaturephoto1);
        formData.append("picture", signaturephoto2);
        formData.append("picture", signaturephoto3);
        formData.append("picture", signaturephoto4);
        formData.append("product_id", res.data.data.product_id);
        formData.append("vendor_id", res.data.data.vendor_id);
        formData.append("product_detail_id", res.data.data._id);
        api.post(`/add-product-images`, formData).then(res2 => {
          console.log('Res Details', res2)
          if (res2.data.status === true) {
              setIsLoading(false)
              swal('Details added')
              // toggleModalDelete();
              setProductname('')
              setCategory('')
              setSubategory('')
              setGstpersen('')
              setGsttype('')
              setCategorylist('')
              setDescription('')
              setImageName1('')
              setImageName2('')
              setImageName3('')
              setImageName4('')
          }
      })
        swal(res.data.msg)
        history.push('/business/vendor-dashboard/products')
      } else {
        swal(res.data.msg);
      }
    });
  };

  return (
    <>
      <div className="vendorManiContainer">
        <div className="vendorManiWrapper">
          <VendorMenu />
          <div className="productMainContent">
            <div className="vendorMainWrapper">
              <TopNavbar products="Products" />
            </div>
            <div className="add-product__heading">
              <h3>Add New Product</h3>
            </div>
            <div className="add-newProduct__container">
              <div className="add-newProduct__image">
                <div className="img__big">
                  <label className="pr__img" htmlFor="product__img__1">
                    <input
                      type="file"
                      id="product__img__1"
                      name="product_image"
                      required
                      multiple accept="image/*"
                      onChange={onHandleSignatureChange1}
                      ref={signatureUploader1}
                      style={{ display: "none" }}
                    />
                    <div className="__thumb"
                      onClick={() => signatureUploader1.current.click()}
                      className="addDetailsUploadSection"
                    >
                      {/* <img src={thumbImg} className="img__thumb__icon" alt="" />
                      <p className="label">Upload Image</p> */}

                      <img src={helpUpload} />
                      {
                            imageName1 != '' ? <span>{imageName1}</span> : <p>Upload Image</p>
                      }
                    </div>
                  </label>
                </div>
                <div className="img__small__box">
                  <label className="pr__img" htmlFor="product__img__small__1">
                    <input
                      type="file"
                      id="product__img__small__1"
                      name="product_image"
                      required
                      multiple accept="image/*"
                      onChange={onHandleSignatureChange2}
                      ref={signatureUploader2}
                      style={{ display: "none" }}
                    />
                    <div className="__thumb"
                      onClick={() => signatureUploader2.current.click()}
                      className="addDetailsUploadSection"
                    >
                      {/* <img src={thumbImg} className="img__thumb__icon" alt="" /> */}
                      <img src={thumbImg} className="img__thumb__icon" alt=""/>
                        {
                            imageName2 != '' ? <span>{imageName2}</span> : <p>Upload Image</p>
                        }
                    
                    </div>
                  </label>
                  <label className="pr__img" htmlFor="product__img__small__2">
                    <input
                      type="file"
                      id="product__img__small__2"
                      name="product_image"
                      required
                      multiple accept="image/*"
                      onChange={onHandleSignatureChange3}
                      ref={signatureUploader3}
                      style={{ display: "none" }}
                    />
                    <div className="__thumb"
                    onClick={() => signatureUploader3.current.click()}
                    className="addDetailsUploadSection"
                    >
                      {/* <img src={thumbImg} className="img__thumb__icon" alt="" /> */}
                      <img src={thumbImg} className="img__thumb__icon" alt=""/>
                      {
                          imageName3 != '' ? <span>{imageName3}</span> : <p>Upload Image</p>
                      }
                    </div>
                  </label>
                  <label className="pr__img" htmlFor="product__img__small__3">
                    <input
                      type="file"
                      id="product__img__small__3"
                      name="product_image"
                      required
                      multiple accept="image/*"
                      onChange={onHandleSignatureChange4}
                      ref={signatureUploader4}
                      style={{ display: "none" }}
                    />
                    <div className="__thumb"
                    onClick={() => signatureUploader4.current.click()}
                    className="addDetailsUploadSection"
                    >
                      {/* <img src={thumbImg} className="img__thumb__icon" alt="" /> */}
                      <img src={thumbImg} className="img__thumb__icon" alt="" />
                       {
                            imageName4 != '' ? <span>{imageName4}</span> : <p>Upload Image</p>
                        }
                    
                    
                    </div>
                  </label>
                </div>
              </div>
              <div className="add-newProduct__details">
                <form className="addproduct-container__form">
                  <div className="addproduct-container__input">
                    <p>Product Name*</p>
                    <input
                      style={
                        errors.productName ? { border: "1px solid red" } : {}
                      }
                      required
                      value={productname}
                      onChange={(e) => {
                        setProductname(e.target.value);
                        setErrors({ ...errors, productName: false });
                      }}
                      type="text"
                      className="addproduct__input"
                    />
                  </div>
                  <div className="addproduct-category">
                    <div className="cat">
                      <p>Select Category*</p>
                      <select
                        required
                        className="addproduct__select"
                        style={
                          errors.categoryError
                            ? { border: "1px solid red" }
                            : {}
                        }
                        //value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          console.log("category selected: ", category);
                          setErrors({ ...errors, categoryError: false });
                        }}
                      >
                        {categorylist?.length &&
                          categorylist.map((val) => {
                            return <option value={val._id}>{val.name}</option>;
                          })}
                      </select>
                    </div>
                    <div className="subcat">
                      <p>Select Subcategory*</p>
                      <select
                        required
                        className="addproduct__select"
                        style={
                          errors.subSategoryError
                            ? { border: "1px solid red" }
                            : {}
                        }
                        value={subcategory}
                        onChange={(e) => {
                          setSubategory(e.target.value);
                          setErrors({ ...errors, subSategoryError: false });
                        }}
                      >
                        {subcategorylist.map((val) => {
                          return <option value={val._id}>{val.name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="addproduct-gstType">
                    <div>
                      <p>GST Percentage</p>
                      <input
                        value={gstpersen}
                        style={
                          errors.percentage ? { border: "1px solid red" } : {}
                        }
                        onChange={(e) => {
                          setGstpersen(e.target.value);
                          setErrors({ ...errors, percentage: false });
                        }}
                        className="addproduct__input"
                      />
                    </div>

                    <div>
                      <p>GST Type</p>
                      <select
                        style={
                          errors.gstType ? { border: "1px solid red" } : {}
                        }
                        onChange={(e) => {
                          setGsttype(e.target.value);
                          setErrors({ ...errors, gstType: false });
                          console.log("gst type: ", gsttype)
                        }}
                        required
                        value={gsttype}
                        className="addproduct__select"
                      >
                        <option value="Include">Include</option>
                        <option value="Exclude">Exclude</option>
                      </select>
                    </div>
                    <div>
                      <p>Price</p>
                      <input
                        value={gstpersen}
                        style={
                          errors.percentage ? { border: "1px solid red" } : {}
                        }
                        onChange={(e) => {
                          setGstpersen(e.target.value);
                          setErrors({ ...errors, percentage: false });
                        }}
                        className="addproduct__input"
                      />
                    </div>
                  </div>
                  <div className="addproduct__descriptionContainer">
                    <p>Description</p>
                    <textarea
                      style={
                        errors.description ? { border: "1px solid red" } : {}
                      }
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors({ ...errors, description: false });
                      }}
                      className="addproduct__textarea"
                      rows="4"
                      name="comment"
                      form="usrform"
                    />
                  </div>
                  <div className="addproduct__btn-container">
                    <button
                      className="addproduct__btn-cancel"
                      onClick={() =>
                        redirect.push("/business/vendor-dashboard/products")
                      }
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={submitDetails}
                      className="addproduct__btn-add"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
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
                    <p onClick={() =>{ toggleModalDelete();history.push({pathname:"/business/vendor-dashboard/products"})}}>X</p>
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
      </div>
    </>
  );
};

export default NewProduct;

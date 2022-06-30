import React, { useState, useEffect, useRef } from 'react'
import "./index.css"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import TopNavbar from '../../../TopNavbar'
import VendorMenu from '../../../VendorMenu'
import g3 from "../../../../../../assets/g3.png"
import filterIcon from "../../../../../../assets/filterIcon.png"
import helpUpload from "../../../../../../assets/helpUpload.png"
import ProductDetailsTable from "./../../ProductDetailsTable"
import {api } from "../../../../../API"
import swal from "sweetalert"
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import deleteMeaage from "../../../../../../assets/deleteMeaage.png";
import { makeStyles } from "@material-ui/core/styles";
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
  
  
const AddDetails = (props) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [productName, setProductName] = useState('')
    const [productColor, setProductColor] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productStock, setProductStock] = useState('')
    const [productSize, setProductSize] = useState('')
    const [currentDetails, setCurrentDetails] = useState({});
    const history = useHistory()
    const [imageName1, setImageName1] = useState('');
    const [imageName2, setImageName2] = useState('');
    const [imageName3, setImageName3] = useState('');
    const [imageName4, setImageName4] = useState('');
    const [isSubmited, setIsSubmited] = useState(false);

    const [message, setMessage] = useState('')
    const [signaturephoto1, setSignaturephoto1] = useState("");
    const [signaturephoto2, setSignaturephoto2] = useState("");
    const [signaturephoto3, setSignaturephoto3] = useState("");
    const [signaturephoto4, setSignaturephoto4] = useState("");

    const [errors, setErrors] = useState({
        imageField1: false,
        imageField2: false,
        imageField3: false,
        imageField4: false,
        colour: false,
        size: false,
        price: false,
        name: false,
        stock: false
    });

    const [deleteModal, setDeleteModal] = useState(false);
    const toggleModalDelete = () => setDeleteModal(!deleteModal);
   
    const [imagePreview, setImagePreview] = useState(null)
    const [uploadedImg, setUploadedImg] = useState([])

    const { loginReducer, vendorReducer } = useSelector((state) => ({ ...state }))
    const { vendorDetails } = vendorReducer

    const signatureUploader1 = useRef(null);
    const signatureUploader2 = useRef(null);
    const signatureUploader3 = useRef(null);
    const signatureUploader4 = useRef(null);
    console.log("product size",productSize);
    console.log("product color",productColor);
    console.log("name",productName);
    console.log("product price",productPrice)
    console.log("product Stock",productStock)


    const onHandleSignatureChange1 = (e) => {
        const filesone = e.target.files[0];
        console.log('onHandleSignatureChange1', filesone.name, filesone)
        setSignaturephoto1(filesone);
        setImageName1(filesone.name.split(' ')[0])
        setErrors({ ...errors, imageField1: false })
    };
    const onHandleSignatureChange2 = (e) => {
        const filesone = e.target.files[0];
        setSignaturephoto2(filesone);
        setImageName2(filesone.name.split(' ')[0])
        setErrors({ ...errors, imageField2: false })
    };
    const onHandleSignatureChange3 = (e) => {
        const filesone = e.target.files[0];
        setSignaturephoto3(filesone);
        setImageName3(filesone.name.split(' ')[0])
        setErrors({ ...errors, imageField3: false })
    };
    const onHandleSignatureChange4 = (e) => {
        const filesone = e.target.files[0];
        setSignaturephoto4(filesone);
        setImageName4(filesone.name.split(' ')[0])
        setErrors({ ...errors, imageField4: false })
    };


    const submitDetails = (e) => {
        e.preventDefault()
        if (!productName != '' && !productName.length < 3) {
            return setErrors({ ...errors, name: true })
         } else if (!imageName1 != '') {
            return setErrors({ ...errors, imageField1: true })
        } else if (!imageName2 != '') {
            return setErrors({ ...errors, imageField2: true })
            return setErrors({ ...errors, imageField3: true })
        } else if (!imageName4 != '') {
            return setErrors({ ...errors, imageField4: true })
        } 
        else if (!productPrice != '') {
            return setErrors({ ...errors, price: true })
        } else if (!productColor != '') {
            return setErrors({ ...errors, color: true })
        } else if (!productStock != '') {
            return setErrors({ ...errors, stock: true })
        }
        const body = {
            vendor_id: vendorDetails[0]._id,
            size: productSize,
            colour: productColor,
            stock: productStock,
            price: productPrice,
            rest_stock: productStock,
        }

        setIsLoading(true)
        api.post(`/add-product-details/${props.location.state}`, body).then(res => {
            if (res.data.status === true) {
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
                        setProductColor('')
                        setProductPrice('')
                        setProductSize('')
                        setProductStock('')
                        setProductName('')
                        setImageName1('')
                        setImageName2('')
                        setImageName3('')
                        setImageName4('')
                    }
                })
                history.push('/business/vendor-dashboard/products/details-list', props.location.state) 
                console.log("props.location.state",props.location.state)
            } else {
                swal(res.data.error)
            }
        })
    }

    console.log("Fields", errors, errors.name)
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
                        <h3>Product</h3>
                    </div>

                    <div className="add-productDetails__container">
                        <div className="add-productDetails__imageUploader">
                            <div style={errors.imageField1 ? { border: "1px solid red" } : {}} className="add__productDetails-Upload">
                                <input
                                    required
                                    type="file"
                                    multiple accept="image/*"
                                    onChange={onHandleSignatureChange1}
                                    ref={signatureUploader1}
                                    style={{ display: "none" }}
                                />
                                <div
                                    onClick={() => signatureUploader1.current.click()}
                                    className="addDetailsUploadSection"
                                >
                                    <img src={helpUpload} />
                                    {
                                        imageName1 != '' ? <span>{imageName1}</span> : <p>Upload Image</p>
                                    }
                                </div>
                            </div>
                            <div style={errors.imageField2 ? { border: "1px solid red" } : {}}  className="add__productDetails-Upload">
                                <input
                                    required
                                    type="file"
                                    multiple accept="image/*"
                                    onChange={onHandleSignatureChange2}
                                    ref={signatureUploader2}
                                    style={{ display: "none" }}
                                />
                                <div
                                    onClick={() => signatureUploader2.current.click()}
                                    className="addDetailsUploadSection"
                                >
                                    <img src={helpUpload} />
                                    {
                                        imageName2 != '' ? <span>{imageName2}</span> : <p>Upload Image</p>
                                    }
                                </div>
                            </div>
                            <div style={errors.imageField3 ? { border: "1px solid red" } : {}} className="add__productDetails-Upload">
                                <input
                                    required
                                    type="file"
                                    multiple accept="image/*"
                                    onChange={onHandleSignatureChange3}
                                    ref={signatureUploader3}
                                    style={{ display: "none" }}
                                />
                                <div
                                    onClick={() => signatureUploader3.current.click()}
                                    className="addDetailsUploadSection"
                                >
                                   <img src={helpUpload} />
                                    {
                                        imageName3 != '' ? <span>{imageName3}</span> : <p>Upload Image</p>
                                    }
                                </div>
                            </div>
                            <div style={errors.imageField4 ? { border: "1px solid red" } : {}} className="add__productDetails-Upload">
                                <input
                                    required
                                    type="file"
                                    multiple accept="image/*"
                                    onChange={onHandleSignatureChange4}
                                    ref={signatureUploader4}
                                    style={{ display: "none" }}
                                />
                                <div
                                    onClick={() => signatureUploader4.current.click()}
                                    className="addDetailsUploadSection"
                                >
                                    <img src={helpUpload} />
                                    {
                                       imageName4 != '' ? <span>{imageName4}</span> : <p>Upload Image</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="add-productDetails__detailsContainer">
                            <div className="add-productDetails__inputContainer">
                                <div className="add-productDetails__inputNameContainer">
                                    <div className="add-productDetails__inputName">
                                        <p>Name</p>
                                        <input className={errors.name ? 'errorClassTrue' : ''} required value={productName} onChange={(e) => { setProductName(e.target.value); setErrors({ ...errors, name: false }) }} style={{width:"536px",height:"64px",marginRight:"50px",fontSize:"27px",paddingLeft:"5px"}}/>
                                    </div>
                                    <div className="add-productDetails__inputStockPriceContainer">
                                        <div className="add-productDetails__inputStockContainer">
                                            <p style={{marginLeft:"33px"}}>Price *</p>
                                            <input className={errors.name ? 'errorClassTrue' : ''} required value={productPrice} onChange={(e) => { setProductPrice(e.target.value); setErrors({ ...errors, price: true }) }} style={{width:"236px",height:"64px",marginLeft:"32px",fontSize:"27px",paddingLeft:"5px"}}/>
                                        </div>
                                        <div className="add-productDetails__inputStockContainer">
                                            <p style={{marginLeft:"22px"}}>Stock *</p>
                                            <input className={errors.name ? 'errorClassTrue' : ''} required value={productStock} onChange={(e) => { setProductStock(e.target.value); setErrors({ ...errors, stock: true }) }} style={{width:"236px",height:"64px",marginLeft:"24px",fontSize:"27px",paddingLeft:"5px"}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="add-productDetails__inputsizeColorContainer">
                                    <div className="add-productDetails__inputSizeContainer">
                                        <div>
                                            <p style={{fontSize: "27px"}}>Size *</p>
                                            <select className={errors.name ? 'errorClassTrue' : ''} required className="add-productDetails__size " value={productSize} onChange={(e) => { setProductSize(e.target.value); setErrors({ ...errors, size: true }) }}>
                                                <option value="M">M</option>
                                                <option value="S">S</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                <option value="XXL">XXL</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="add-productDetails__inputColorContainer">
                                        <p style={{fontSize: "27px"}} >Color *</p>
                                        <div className="color_main">
                                        <div className="color_div">
                                            <input className={errors.name ? 'errorClassTrue' : ''} type="color" required value={productColor} onChange={(e) => setProductColor(e.target.value)} />
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="addproductdetails__containerBtn">
                        <button className="addproduct__btn-cancel addDetails__btn-cancel" onClick={() => history.push('/business/vendor-dashboard/products/details-list', props.location.state)}>Cancel</button>
                        <button type="submit" onClick={(e)=>{submitDetails(e);toggleModalDelete()}} className="addproduct__btn-add addDetails__btn-cancel"> {isLoading && (
                            <div
                                class="spinner-border ml-3 text-danger"
                                role="status"
                            ></div>
                        )}{" "} Submit</button>
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
    )
}

export default AddDetails

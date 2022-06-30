import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import "./index.css"
import TopNavbar from '../TopNavbar'
import VendorMenu from '../VendorMenu'
import g3 from "../../../../assets/s1.jpeg"
import {api} from "../../../API";

const AddCoupon = ({ history }) => {

    const [couponCode, setCouponCode] = useState('')
    const [couponValue, setCouponValue] = useState('')
    const [couponColor, setCouponColor] = useState('')
    const [couponCategory, setCouponCategory] = useState('')
    const [couponSubCategory, setCouponSubCategory] = useState('')
    const [couponDiscount, setCouponDiscount] = useState('')
    const [couponAppliedFrom, setCouponAppliedFrom] = useState('')
    const [couponAppliedEnd, setCouponAppliedEnd] = useState('')
    const [couponUsers, setCouponUsers] = useState('')
   

    const [errors, setErrors] = useState({
        code: false,
        value: false,
        color: false,
        category: false,
        subCategory: false,
        discount: false,
        dateFrom: false,
        endDate: false,
        users: false
    })




    const   handleSubmit = (e) => {
        e.preventDefault()
        if (!couponCode != '' && !couponCode.length < 6) {
            return setErrors({ ...errors, code: true })
        } else if (!couponValue != '') {
            return setErrors({ ...errors, value: true })
        } else if (!couponColor != '') {
            return setErrors({ ...errors, color: true })
        } else if (!couponCategory != '') {
            return setErrors({ ...errors, category: true })
        } else if (!couponSubCategory != '') {
            return setErrors({ ...errors, subCategory: true })
        } else if (!couponDiscount != '') {
            return setErrors({ ...errors, discount: true })
        } else if (!couponAppliedFrom != '') {
            return setErrors({ ...errors, dateFrom: true })
        } else if (!couponAppliedEnd != '') {
            return setErrors({ ...errors, endDate: true })
        } else if (!couponUsers != '') {
            return setErrors({ ...errors, users: true })
        }

        console.log("couponCode",couponCode);
        console.log("couponValue",couponValue);
        console.log("couponColor",couponColor)
        console.log("couponCategory",couponCategory)
        console.log("couponSubCategory",couponSubCategory)
        console.log("couponDiscount",couponDiscount)
        console.log("couponAppliedFrom",couponAppliedFrom)
        console.log("couponAppliedEnd",couponAppliedEnd)
        console.log("couponUsers",couponUsers);
        const body = {
            "coupon_code": couponCode,
            "coupon_color":couponColor,
            "discount_type": 15,
            "coupon_value": couponValue,
            "startdate": couponAppliedFrom,
            "starttime":"12:00 am",
            "expiredate":couponAppliedEnd,
            "expiretime":"10:00 pm",
            "current_used": 1,
            "max_user": 1,
            "vendor_id": "5f8973a33d3a2445b7cc8a22",
            "category_id":couponCategory,
            "subcategory_id":couponSubCategory
        }

        api.post(`/add-coupon`,{body}).then((response)=>{
            console.log("successfully added",response);
        })
    }
    return (
        <>
            <div className="vendorManiContainer">
                <div className="vendorManiWrapper">
                    <VendorMenu />
                    <div className="productMainContent">
                        <div className="vendorMainWrapper">
                            <TopNavbar products="Products" products="Coupon" />
                            <div className="addNewCoupon__Maincontainer">
                                <div classname="addNewCoupon__heading">
                                    <h3 className="addNewCoupon__headingText">Coupon list &gt; Add New Coupon</h3>
                                </div>
                                <div className="addNewCoupon__container">
                                    <div className="addNewCoupon__containerBox">
                                        <div className="addNewCoupon__inputContainer">
                                            <p>coupon Code</p>
                                            <input style={errors.code ? { border: "1px solid red" } : {}} value={couponCode} onChange={(e) => { setCouponCode(e.target.value); setErrors({ ...errors, code: false }) }}/>
                                        </div>
                                        <div className="addNewCoupon__inputContainer">
                                            <p>coupon Value</p>
                                            <input style={errors.value ? { border: "1px solid red" } : {}} value={couponValue} onChange={(e) => { setCouponValue(e.target.value); setErrors({ ...errors, value: false }) }}/>
                                        </div>
                                        <div className="addNewCoupon__inputContainer">
                                            <p>coupon Value</p>
                                            <div className="addNewCoupon__colorPickerContainer">
                                                <span className="addNewCoupon__colorPicker1"  onClick={(e) =>{setCouponColor("#0F0AA4")}}></span>
                                                <span className="addNewCoupon__colorPicker2"  onClick={(e) =>{setCouponColor("#FFBE4E")}}></span>
                                                <span className="addNewCoupon__colorPicker3"  onClick={(e) =>{setCouponColor("#DB284C")}}></span>
                                                <span className="addNewCoupon__colorPicker4"  onClick={(e) =>{setCouponColor("#0DB2A4")}}></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="addNewCoupon__containerBox">
                                        <div className="addNewCoupon__inputContainer">
                                            <p>Select Category</p>
                                            <select style={errors.category ? { border: "1px solid red" } : {}} className="addNewCoupon__select" value={couponCategory} onChange={(e) => { setCouponCategory(e.target.value); setErrors({ ...errors, category: false }) }}>
                                                <option value="volvo">Volvo</option>
                                                <option value="saab">Saab</option>
                                                <option value="opel">Opel</option>
                                                <option value="audi">Audi</option>
                                            </select>
                                        </div>
                                        <div className="addNewCoupon__inputContainer">
                                            <p>Select Sub Category*</p>
                                            <select style={errors.subCategory ? { border: "1px solid red" } : {}} className="addNewCoupon__select" value={couponSubCategory} onChange={(e) => { setCouponSubCategory(e.target.value); setErrors({ ...errors, subCategory: false }) }}>
                                                <option value="volvo">Volvo</option>
                                                <option value="saab">Saab</option>
                                                <option value="opel">Opel</option>
                                                <option value="audi">Audi</option>
                                            </select>
                                        </div>
                                        <div className="addNewCoupon__inputContainer">
                                            <p>Discount Type</p>
                                            <select style={errors.discount ? { border: "1px solid red" } : {}} className="addNewCoupon__select" value={couponDiscount} onChange={(e) => setCouponDiscount(e.target.value)}>
                                                <option value="volvo">Volvo</option>
                                                <option value="saab">Saab</option>
                                                <option value="opel">Opel</option>
                                                <option value="audi">Audi</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="addNewCoupon__containerBox">
                                        <div className="addNewCoupon__inputContainer">
                                            <p>Applied From</p>
                                            <input style={errors.couponAppliedFrom ? { border: "1px solid red" } : {}} value={couponAppliedFrom} onChange={(e) => { setCouponAppliedFrom(e.target.value); setErrors({ ...errors, dateFrom: false }) }} placeholder="DD | MM | YY    Hr : mm" />
                                        </div>
                                        <div className="addNewCoupon__inputContainer">
                                            <p>Expire Date</p>
                                            <input style={errors.couponAppliedEnd ? { border: "1px solid red" } : {}} value={couponAppliedEnd} onChange={(e) => { setCouponAppliedEnd(e.target.value); setErrors({ ...errors, endDate: false }) }} placeholder="DD | MM | YY    Hr : mm" />
                                        </div>
                                        <div className="addNewCoupon__inputContainer">
                                            <p>Maximum users</p>
                                            <input style={errors.users ? { border: "1px solid red" } : {}} value={couponUsers} onChange={(e) => { setCouponUsers(e.target.value); setErrors({ ...errors, users: false }) }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="addproduct__btn-container" >
                                <button className="addproduct__btn-add addDetails__btn-cancel holdText" onClick={handleSubmit} style={{ backgroundColor: "#1943D8" }}>Add Coupon</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </>
    )
}


export default AddCoupon

import React, { useState } from "react";
import "./index.css";
import "./main.css";
import right__arrow from "../../../../assets/right_menu_arrow.svg";
import Header from "../Navbar";
import { useSelector, useDispatch } from "react-redux";
import swal from "@sweetalert/with-react";
import axios from "axios"
import { BaseUrl, api } from "../../../API";
const AddNewAddress = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const user = useSelector((state) => state.loginReducer.userDetails);
  console.log("user", user);
  const dispatch = useDispatch();
  console.log("user: ", user._id);
  console.log("name", name);
  console.log("Phone", phone);
  console.log("address", address);
  console.log("city", city);
  console.log("locality", locality);
  console.log("state", state);
  console.log("pincode", pincode);
  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      user_id: "61cc4fdb37a5860f216d6ce5",
      name: name,
      altphoneno: phone,
      pincode: pincode,
      address: address,
      locality: locality,
      city_id: city,
      state_id: state
    }
    console.log("body", body);
    api.post(`/add-user-address-details`, body).then((res) => {
      console.log("detail added successfully", res);
      if (res.data.status) {
        swal(res.data.msg);
        setName("")
        setPhone("")
        setAddress("")
        setCity("")
        setLocality("")
        setState("")
        setPincode("")
      } else {
        swal(res.data.msg);
      }
    })
  }
  return (
    <>
      <Header />
      <h3 className="wishlist__text">
        <span>My Account</span> <img src={right__arrow} alt="" />{" "}
        <span>Manage Address</span>
      </h3>
      <p className="page__heading">New Address</p>
      <div className="new__form__container">
        <form action="">
          <div className="input__row two__col">
            <div className="input__col">
              <label htmlFor="name">Name</label>
              <input type="text" name="" id="name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input__col">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" name="" id="phone" onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div className="input__row one__col">
            <div className="input__col">
              <label htmlFor="address">Address</label>
              <input type="text" name="" id="address" onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
          <div className="input__row two__col">
            <div className="input__col">
              <label htmlFor="city">City</label>
              <input type="text" name="" id="city" onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="input__col">
              <label htmlFor="locality">Locality</label>
              <input type="text" name="" id="locality" onChange={(e) => setLocality(e.target.value)} />
            </div>
          </div>
          <div className="input__row two__col">
            <div className="input__col">
              <label htmlFor="state">State</label>
              <input type="text" name="" id="state" onChange={(e) => setState(e.target.value)} />
            </div>
            <div className="input__col">
              <label htmlFor="pincode">Pincode</label>
              <input type="text" name="" id="pincode" onChange={(e) => setPincode(e.target.value)} />
            </div>
          </div>
          <div className="tick_box">
            <input type="checkbox" name="" id="set_current" />
            <label htmlFor="set_current">Set as current address</label>
          </div>
          <button type="submit" onClick={(e) => submitHandler(e)}>Add Address</button>
        </form>
      </div>
    </>
  );
};

export default AddNewAddress;

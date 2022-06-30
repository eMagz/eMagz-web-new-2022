import React, { useState, useEffect } from "react";
import "./index.css";
import "./main.css";
import AddIcon from "@material-ui/icons/Add";
import Header from "../Navbar";
import { BaseUrl,api } from "../../../API";
import Button from "@material-ui/core/Button";
import { Collapse } from "reactstrap";
import { Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import SaveIcon from "@material-ui/icons/Save";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import swal from "@sweetalert/with-react";
import arrowIcon from "../../../../assets/right_menu_arrow.svg";
import HouseIcon from "../../../../assets/address_house_icon.svg";
import EditIcon from "../../../../assets/edit_pencil_icon.svg";
import { useHistory } from "react-router";
const ManageAddress = ({ history }) => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState("");
  const [addtype, setAddtype] = useState("");
  const [useraddress, setUserAddress] = useState("");
  const [newname, setNewname] = useState("");
  const [newpin, setNewPin] = useState("");
  const [newmobile, setNewMobile] = useState("");
  const [newlocality, setNewlocality] = useState("");
  const [newaddress, setNewaddress] = useState("");
  const [newstates, setNewstates] = useState("");
  const [newcity, setNewcity] = useState("");
  const [newaddtype, setNewAddtype] = useState("");
  const [userid, setUserId] = useState("");
  const [getname, setGetname] = useState("");

  const toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState([]);
  const toggleModal = () => setModal(!modal);
  const historyx = useHistory();
  const[getAddressData,setAdressData] = useState([]);
  const addAddress = () => {
    const data = {
      name: name,
      address: address,
      city: city,
      address_type: addtype,
      state: states,
      pincode: pincode,
      mobile: mobile,
      locality: locality,
      user_id: userdata._id,
    };


    api.post("/add-user-address-details", data).then((res) => {
      if (res.data.status) {
        swal(res.data.msg);
      } else {
        swal(res.data.msg);
      }
    });

    setName("");
    setMobile("");
    setAddtype("");
    setCity("");
    setStates("");
    setLocality("");
    setMobile("");
    setPincode("");
    setAddress("");
  };

  useEffect(() => {
    getaddress();
    getName();
    getAllAddress();
  }, [getAddressData]);

  const getaddress = () => {
    api.get(`/user-address-details/${userdata._id}`).then((res) => {
      setDetails(res.data.data);
    });
  };

  const EditAddressDetails = () => {
    const data = {
      name: newname,
      address: newaddress,
      city: newcity,
      address_type: newaddtype,
      state: newstates,
      pincode: newpin,
      mobile: newmobile,
      locality: newlocality,
    };

    api.post(`/edit-user-address-details/${userid}`, data).then(
      (res) => {
        console.log("response",res);
        if (res.data.status) {
          swal(res.data.msg);
        } else {
          swal(res.data.msg);
        }
      }
    );

    toggleModal();
  };

  const getEditId = (val) => {
    console.log("val", val);
    setUserAddress(val);
    setNewname(val.name);
    setNewcity(val.city);
    setNewaddress(val.address);
    setNewPin(val.pincode);
    setNewstates(val.state);
    setNewlocality(val.locality);
    setNewMobile(val.mobile);
    setNewAddtype(val.address_type);
    setUserId(val._id);
    toggleModal();
  };

  const getName = () => {
    api.get(`/view-user-name/${userdata._id}`).then((res) => {
      console.log("response",res)
      setGetname(res.data.data);
    });
  };
  const deleteUser = (val) => {
    api.post(`/delete-user-address/${val}`).then((res) => {
      if (res.data.status) {
        swal(res.data.msg);
      } else {
        swal(res.data.msg);
      }
      getaddress();
    });
  };

  const getAllAddress = () =>{
      api.get(`/user-address-details/${userdata._id}`).then((res)=>{
        console.log("get data",res);
        setAdressData(res.data.data);
      })
  }
  console.log("getaddress",getAddressData);


  return (
    <>
      <Header />
      <h3 className="wishlist__text">
        <span>My Account</span> <img src={arrowIcon} alt="" />{" "}
        <span>Manage Address</span>
      </h3>
      <div className="userProfile__container">
          {
              getAddressData.map((item)=>{
                return(
                  <div className="wrapper__single">
                  <div className="address__wrapper">
                    <div className="address__headline">
                      <img src={HouseIcon} />
                      <p>{item.name}</p>
                    </div>
                    <div className="address_description">
                    
                        <p>Address : {item.address}</p>
                        <p>City : {item.city}</p>
                        <p>Locality : {item.locality}</p>
                        <p>Pincode : {item.pincode}</p>
                      
                    </div>
                  </div>
                  <div className="btn__wrapper">
                    <p className="edit__icon">
                      <img src={EditIcon} alt="" />
                      <span onClick={()=> historyx.push(`/business/user-dashboard/profile/address/edit`)}>Edit</span>
                    </p>
                    <p className="remove__btn" onClick={()=>deleteUser(item._id)}>Remove</p>
                  </div>
                </div>
                )
              })
          }

      </div>
      <div id="add__new__btn">
        <button
          onClick={() =>{
            historyx.push(`/business/user-dashboard/profile/address/add`);
            // addAddress={addAddress}
          }
        }
        >
          Add New Address
        </button>
      </div>
    </>
  );
};

export default ManageAddress;

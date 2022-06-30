import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import axios from 'axios';
import Header from '../../Header/index';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { BaseUrl, ImageUrl } from '../../../API'
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Col, FormGroup, Label, Input } from 'reactstrap';
const EditProfile = () => {
  const [user, setUser] = useState({});
  const fileProfile = useRef("");
  const fileBanner = useRef("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");  
  const [mobile, setMobile] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [status, setStatus] = useState("We are using eMagz Live");
  const [banner, setBanner] = useState("assets/banners/1607519225715.jpg");
  const [picture, setPicture] = useState("assets/profile/avatar-icon.png");
  const history = useHistory();
  const redirect = (url) => {
    history.push(url)
  }
  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user != null) {
      user = JSON.parse(user);
      setUser(user);
      axios.get(`${BaseUrl}/social-profile/${user._id}`).then
        (res => {
          if (res.data.status) {
            let profile = res.data.data;
            setName(profile.name);
            setUsername(profile.username);
            setStatus(profile.status);
            setMobile(profile.mobile);
            setAbout(profile.about);
            setGender(profile.gender);
            setAddress(profile.address);
            setBanner(profile.banner!=null?profile.banner:banner);
            setPicture(profile.picture!=null?profile.picture:picture);
            setDob(profile.dob);

          } else {
            setName(user.name);
            setUsername(user.email);
            setStatus();
          }
        })
    }
  }, [])
  const onUploadBanner = () => { fileBanner.current.click(); }
  const uploadBanner = event => {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append(
        "bannerimage",
        event.target.files[0],
        event.target.files[0].name
      );
      axios.post(`${BaseUrl}/social-profile-banner/${user._id}`, formData).then(res => {
        if (res.data.status == true) {
          getProfile(user._id);
        }
      })
    }
  };
  const onUploadProfile = () => { fileProfile.current.click(); }

  const uploadProfile = event => {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append(
        "socialprofile",
        event.target.files[0],
        event.target.files[0].name
      );
      axios.post(`${BaseUrl}/social-profile-image/${user._id}`, formData).then(res => {
        if (res.data.status == true) {
          getProfile(user._id);
        }
      })
    }
  };
  
  function getProfile(user_id){
    axios.get(`${BaseUrl}/social-profile/${user_id}`).then(res => {
      setBanner(res.data.data.banner);
      setPicture(res.data.data.picture);
      localStorage.setItem("socialprofile", JSON.stringify(res.data.data));
      redirect("/eMagz/profile")
    })
  }
  function updateprofile() {
    let body = { name, username, status, mobile, about, gender, address, dob };
    axios.post(`${BaseUrl}/social-profile/${user._id}`, body).then(res => {
      if (res.data.status == true) {
        getProfile(user._id);
      }
    })
  }
  return (
    <>
      <div style={{ position: 'fixed', top: 0, margin: 'auto', width: '100%', zIndex: '400' }}   >
        <Header />
      </div>
      <div style={{ marginTop: 80 }} className='container' >
        <div className='editProf_card' >
          <div className='temp3_header' >
            <div className='back_img' >
              <img style={{ marginTop: '10px', width: '100%', height: '100%' }} src={banner} />
              <div className='camera_icon3' >
                <input type='file' id='file' onChange={uploadBanner} ref={fileBanner} style={{ display: 'none' }} />
                <IconButton onClick={onUploadBanner}  >
                  <PhotoCamera />
                </IconButton>
              </div>
            </div>
            <div className='temp3_main' >
              <img className='temp3_picture' src={picture} />
              <div className='camera_icon3' >
                <input type='file' id='file' onChange={uploadProfile} ref={fileProfile} style={{ display: 'none' }} />
                <IconButton onClick={onUploadProfile}  >
                  <PhotoCamera />
                </IconButton>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <Col sm={6}>
              <FormGroup row>
                <Label for="exampleEmail" sm={4}>Email</Label>
                <Col sm={8}>
                  <Input type="email" name="email" readOnly placeholder="Email" value={user.email} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Name</Label>
                <Col sm={8}>
                  <Input type="text" name="name" onChange={(e) => { setName(e.target.value) }} value={name} placeholder="Enter name" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Username</Label>
                <Col sm={8}>
                  <Input type="text" name="username" onChange={(e) => { setUsername(e.target.value) }} value={username} placeholder="Enter username" />

                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Status</Label>
                <Col sm={8}>
                  <Input type="text" name="status" onChange={(e) => { setStatus(e.target.value) }} value={status} placeholder="Enter status" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Mobile</Label>
                <Col sm={8}>
                  <Input type="text" name="mobile" onChange={(e) => { setMobile(e.target.value) }} value={mobile} placeholder="Enter mobile" />
                </Col>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup row>
                <Label for="exampleText" sm={4}>Bio</Label>
                <Col sm={8}>
                  <Input type="text" name="mobile" onChange={(e) => { setAbout(e.target.value) }} value={about} placeholder="Enter Bio" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>Address</Label>
                <Col sm={8}>
                  <Input type="text" name="address" onChange={(e) => { setAddress(e.target.value) }} value={address} placeholder="Enter address" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={4}>DOB</Label>
                <Col sm={8}>
                  <Input type="date" name="dob" onChange={(e) => { setDob(e.target.value) }} value={Moment(dob).format('YYYY-MM-DD')} placeholder="Enter dob" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleSelect" sm={4}>Gender</Label>
                <Col sm={8}>
                  <Input type="select" onChange={(e) => { setGender(e.target.value) }} value={gender} name="gender">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </Input>
                </Col>
              </FormGroup>
              <Button style={{ float: "right" }} onClick={() => { updateprofile() }} variant="contained" color="primary" >Update</Button>
            </Col>
          </div>
        </div>
      </div>
    </>
  )



}


export default EditProfile;












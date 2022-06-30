
import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Header from '../../Header';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import Videocam from '@material-ui/icons/Videocam';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faMailBulk, faImages, faMapMarkerAlt, faCalendarAlt, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'moment';
import { BaseUrl, ImageUrl } from '../../../API'
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import swal from 'sweetalert';
const TemplateThree = () => {
  const fileProfile = useRef("");
  const fileBanner = useRef("");
  const filePhoto = useRef("");
  const fileVideo = useRef("");
  const [activeTab, setActiveTab] = useState('1');
  const [selectFilePhoto, setSelectFilePhoto] = useState([]);
  const [selectFileVideo, setSelectFileVideo] = useState([]);
  const [user, setUser] = useState({});
  const [socialprofile, setSocialProfile] = useState({});
  const [modal, setModal] = useState(false);
  const [writePost, setWritePost] = useState("");
  const [postLists, setPostLists] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [socialSaves, setSocialSaves] = useState([]);
  const [tags, setTags] = useState("");
  const [banner, setBanner] = useState("assets/banners/1607519225715.jpg");
  const [picture, setPicture] = useState("assets/profile/avatar-icon.png");
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  const history = useHistory();
  const redirect = (url) => { history.push(url); }
  const closeBtn = <button className="close" onClick={() => { setModal(!modal) }}>&times;</button>;
  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user != null) {
      user = JSON.parse(user);
      setUser(user);
      axios.get(`${BaseUrl}/user-posts/${user._id}`).then(res => {
        if (res.data.status) {
          setPostLists(res.data.data);
        }
      })
      axios.get(`${BaseUrl}/saves/${user._id}`).then(res => {
        setSocialSaves(res.data.data);
    })
      followList(user._id)
      axios.get(`${BaseUrl}/social-profile/${user._id}`).then(res => {
        if (res.data.status) {
          setSocialProfile(res.data.data);
          localStorage.setItem("socialprofile", JSON.stringify(res.data.data));
        } else {
          redirect("/eMagz/edit-profile")
        }

      })
    }
  }, [])
  function followAction(following_id) {
    axios.get(`${BaseUrl}/follow/${user._id}/${following_id}`).then(res => {
      if (res.data.status == true) {
        followList(user._id)
      }
    })
  }
  function followList(user_id) {
    axios.get(`${BaseUrl}/followers/${user_id}`).then(res => {
      if (res.data.status == true) {
        setFollowers(res.data.data);
      }
    })
  }
  const onUploadBanner = () => { fileBanner.current.click(); }
  const onUploadPhoto = () => { filePhoto.current.click(); }
  const onUploadVideo = () => { fileVideo.current.click(); }
  const onUploadProfile = () => { fileProfile.current.click(); }
  const uploadBanner = event => {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append(
        "bannerimage",
        event.target.files[0],
        event.target.files[0].name
      );
      axios.post(`${BaseUrl}/social-profile-banner/${user._id}`, formData).then(res => {
        axios.get(`${BaseUrl}/social-profile/${user._id}`).then(res => {
          setSocialProfile(res.data.data);
          localStorage.setItem("socialprofile", JSON.stringify(res.data.data));
        })
      })
     
    }
  };
  const addPostStart = () => {
    axios.post(`${BaseUrl}/create-post`, { user_id: user._id, description: writePost, tags }).then(res => {
      if (selectFilePhoto.length > 0) {
        for (let i = 0; i < selectFilePhoto.length; i++) {
          let formImage = new FormData();
          formImage.append("post_image", selectFilePhoto[i], selectFilePhoto[i].name);
          axios.post(`${BaseUrl}/add-post-image/${res.data.data._id}`, formImage);
        }
      }
      if (selectFileVideo.length > 0) {
        let formVideo = new FormData();
        formVideo.append("video_file", selectFileVideo[0], selectFileVideo[0].name);
        axios.post(`${BaseUrl}/add-post-video/${res.data.data._id}`, formVideo);
      }
      swal(res.data.msg);
      setModal(false);
      setWritePost("")
      setTags("")
    })
  }

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
          axios.get(`${BaseUrl}/social-profile/${user._id}`).then(res => {
            setSocialProfile(res.data.data);
            localStorage.setItem("socialprofile", JSON.stringify(res.data.data));
          })
        }
      })
    }
  };
  return (
    <>
      <Header />
      <div style={{ marginTop: 20 }} className='container' >
        <div >
          <div className='temp3_header' >
            <div className='back_img' >
              <img style={{ marginTop: '10px', width: '100%', height: '100%' }} src={(socialprofile.banner == null ? banner : socialprofile.banner)} />
              <div className='camera_icon3' >
                <input type='file' id='file' onChange={uploadBanner} ref={fileBanner} style={{ display: 'none' }} />
                <IconButton onClick={onUploadBanner}  >
                  <PhotoCamera />
                </IconButton>
              </div>
            </div>
            <div className='temp3_main' >
              <img className='temp3_picture' src={(socialprofile.picture == null ? picture : socialprofile.picture)} />
              <div className='camera_icon3' >
                <input type='file' id='file' onChange={uploadProfile} ref={fileProfile} style={{ display: 'none' }} />
                <IconButton onClick={onUploadProfile}  >
                  <PhotoCamera />
                </IconButton>
              </div>
            </div>
          </div>
          <div className='profile_details3'  >
            <div className="profile-post">
              <div className='profName3' >{user.name}</div>
              <div className='addpost' >
                <button onClick={() => { setModal(!modal) }} className='post_btn edit3_btn1' >Create Post <FontAwesomeIcon icon={faImages} /> </button>
                <Modal isOpen={modal} toggle={() => { setModal(!modal) }} >
                  <ModalHeader toggle={() => { setModal(!modal) }} close={closeBtn}>Create Post</ModalHeader>
                  <ModalBody>

                    <FormGroup>
                      <Label>Write post</Label>
                      <textarea className="post_textarea" onChange={(e) => { setWritePost(e.target.value) }} placeholder="Write somthing" name="description" />
                    </FormGroup>
                    <FormGroup className="addfile">
                      <IconButton onClick={onUploadPhoto}  >
                        <input type='file' accept="image/*" onChange={(e) => { setSelectFilePhoto(e.target.files) }} ref={filePhoto} style={{ display: 'none' }} />
                        <PhotoCamera />
                      </IconButton>
                      <IconButton onClick={onUploadVideo}  >
                        <input type='file' accept="video/mp4,video/x-m4v,video/*" onChange={(e) => { setSelectFileVideo(e.target.files) }} ref={fileVideo} style={{ display: 'none' }} />
                        <Videocam />
                      </IconButton>
                    </FormGroup>
                    <FormGroup>
                      <Label>Tags</Label>
                      <Input onChange={(e) => { setTags(e.target.value) }} placeholder="Enter tags example(#tag1, #tag2)" name="tags" />
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={() => { setModal(!modal) }}>Cancel</Button>{' '}
                    <Button color="primary" onClick={addPostStart}>Create Now</Button>
                  </ModalFooter>
                </Modal>

              </div>
            </div>
            <div className='profMail3' >@{socialprofile.username}</div>
            <div className='profBio3' >{socialprofile.status}</div>
          </div>
          <div className='more_details3' >
            <div className="detail_div">
              <FontAwesomeIcon className="mt-1" icon={faMapMarkerAlt} />
              <div style={{ paddingLeft: '5px', color: 'gray' }}>
                {socialprofile.address != "" ? socialprofile.address : "Not Given"}
              </div>
            </div>
            <div className="detail_div" >
              <FontAwesomeIcon className="mt-1" icon={faMailBulk} />
              <div style={{ paddingLeft: '5px', color: 'gray' }}>
                {user.email}
              </div>
            </div>
            <div className="detail_div">
              <FontAwesomeIcon className="mt-1" icon={faBirthdayCake} />
              <div style={{ paddingLeft: '5px', height: 30, color: 'gray' }}>
                {socialprofile.dob != null ? Moment(socialprofile.dob).format('DD MMM YYYY') : "Not Given"}
              </div>
            </div>
            <div className="detail_div">
              <FontAwesomeIcon className="mt-1" icon={faCalendarAlt} />
              <div style={{ paddingLeft: '5px', height: 30, color: 'gray' }}>
                {Moment(socialprofile.createdAt).format('DD MMM YYYY')}
              </div>
            </div>
            <div className='profile3_edit_btn' >
              <button onClick={() => redirect("/eMagz/edit-profile")} className='edit3_btn edit3_btn1' >Edit Profile <FontAwesomeIcon icon={faUserCog} /> </button>
            </div>
          </div>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { toggle('1'); }}
                >
                  <h4>Posts</h4>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggle('2'); }}>
                  <h4>Followers</h4>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => { toggle('3'); }}>
                  <h4>Saved</h4>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                      {postLists.map((item) => {
                        return (<Card className='tabs_image' >
                          <div className="top-view">
                            {item.files.length > 0 ? <img className="post_image" src={item.files[0].fileUrl} /> : ""}
                            <p className="description">{item.description}</p>
                            <p className="tags">{item.tags}</p>
                          </div>
                          <div style={{ padding: 10 }}>
                            <IconButton>
                              <FavoriteIcon fontSize='default' style={{ color: 'red' }} />
                              <span>{item.like}</span>
                            </IconButton>
                            <IconButton>
                              <ChatBubbleOutlineIcon fontSize='default' style={{ color: 'blue', marginLeft: 10, marginRight: 10 }} />
                              <span>{item.comment}</span>
                            </IconButton>
                            {/* <IconButton>
                              <ShareOutlined fontSize='default' style={{ color: 'blue' }} />
                              <span>{item.share}</span>
                            </IconButton> */}
                          </div>
                        </Card>)
                      }
                      )}
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  {followers.map((item) => {
                    return (<Col sm="3" style={{ margin:"10px 0px",padding:"0px 8px" }}>
                      <Card >
                        <div className="cord-follower">
                          <Avatar src={ImageUrl + item.user[0].picture} />
                          <span>
                            <p className="follower-name">{item.user[0].name}</p>
                            <p className="follower-status">{item.user[0].status}</p>
                            <Button onClick={() => { followAction(item.user_id) }} className="unfollowbtn">Unfollow</Button>
                          </span>
                        </div>
                      </Card>
                    </Col>
                    )
                  })}
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                      {socialSaves.map((item) => {
                        return (<Card className='tabs_image' >
                          <div className="top-view">
                            {item.files.length > 0 ? <img className="post_image" src={item.files[0].fileUrl} /> : ""}
                            <p className="description">{item.post[0].description}</p>
                            <p className="tags">{item.post[0].tags}</p>
                          </div>
                          <div style={{ padding: 10 }}>
                            <IconButton>
                              <FavoriteIcon fontSize='default' style={{ color: 'red' }} />
                              <span>{item.post[0].like}</span>
                            </IconButton>
                            <IconButton>
                              <ChatBubbleOutlineIcon fontSize='default' style={{ color: 'blue', marginLeft: 10, marginRight: 10 }} />
                              <span>{item.post[0].comment}</span>
                            </IconButton>
                            {/* <IconButton>
                              <ShareOutlined fontSize='default' style={{ color: 'blue' }} />
                              <span>{item.share}</span>
                            </IconButton> */}
                          </div>
                        </Card>)
                      }
                      )}
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
        </div>
      </div>
    </>
  )




}


export default TemplateThree;















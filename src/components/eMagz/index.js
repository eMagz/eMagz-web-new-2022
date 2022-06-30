import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { BaseUrl, ImageUrl } from '../API'
import axios from 'axios';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, ButtonGroup, FormGroup, Label, Input } from 'reactstrap';
import Videocam from '@material-ui/icons/Videocam';
import swal from 'sweetalert';
import RBCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "video-react/dist/video-react.css";
import { Player } from 'video-react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    border: '5px solid #e8b0b1'
  },
}));

const Socialmedia = () => {
  const filePhoto = useRef("");
  const fileVideo = useRef("");
  const filePhotoStatus = useRef("");
  const fileVideoStatus = useRef("");
  const slider = useRef("");
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalSend, setModalSend] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [viewStatus, setViewStatus] = useState(false);
  const [social, setSocial] = useState({});
  const [sendDetails, setSendDetails] = useState({});
  const [sendIndex, setSendIndex] = useState({});
  const [sendUsers, setSendUsers] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [followerSuggetion, setFollowerSuggetion] = useState([]);
  const [listposts, setListPosts] = useState([]);
  const [user, setUser] = useState({});
  const [writePost, setWritePost] = useState("");
  const [writeStatus, setWriteStatus] = useState("");
  const [tags, setTags] = useState("");
  const [comment, setComments] = useState("");
  const closeBtn = <button className="close" onClick={() => { setModal(!modal) }}>&times;</button>;
  const styles = { height: 400, width: "100%" };
  const [usersStatus, setUsersStatus] = useState([]);
  const [currentInsex, setCurrenInsex] = useState(0);
  const [currentStatus, setCurrentStatus] = useState([]);
  const [profileStatus, setProfileStatus] = useState([]);
  const [selectFilePhoto, setSelectFilePhoto] = useState([]);
  const [selectFileVideo, setSelectFileVideo] = useState([]);
  const [selectFilePhotoStatus, setSelectFilePhotoStatus] = useState([]);
  const [selectFileVideoStatus, setSelectFileVideoStatus] = useState([]);
  const onUploadPhoto = () => { filePhoto.current.click(); }
  const onUploadVideo = () => { fileVideo.current.click(); }
  const onUploadPhotoStatus = () => { filePhotoStatus.current.click(); }
  const onUploadVideoStatus = () => { fileVideoStatus.current.click(); }
  const history = useHistory();
  const redirect = (url, data) => {
    history.push(url + "/" + data._id, data)
  }
  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user != null) {
      user = JSON.parse(user);
      setUser(user);
      axios.get(`${BaseUrl}/social-profile/${user._id}`).then(res => {
        if (res.data.status == false) {
          setSocial(user)
          let body = { name: user.name, username: user.email, status: "We are using eMagz Live", mobile: "", about: "We are using eMagz Live", gender: "Male", address: "", dob: "" };
          axios.post(`${BaseUrl}/social-profile/${user._id}`, body);
        } else {
          setSocial(res.data.data)
        }
      })
      getSendUser("a");
      followSuggetion(user._id)
      getUsersStatus(user._id);
    }
    getPostList(20, 0, user);
  }, [])
  function _onSelect(active, direction) {
    console.log(`active=${active} && direction=${direction}`);
  };

  const addStatus = () => {
    console.log(selectFileVideoStatus, selectFilePhotoStatus)
    if (selectFilePhotoStatus.length > 0) {
      let formImage = new FormData();
      formImage.append("statusfile", selectFilePhotoStatus[0], selectFilePhotoStatus[0].name);
      formImage.append("type", "image");
      formImage.append("user_id", user._id);
      formImage.append("text", writeStatus);
      axios.post(`${BaseUrl}/add-status`, formImage).then(res => {
        getUsersStatus(user._id);
      })
    }
    if (selectFileVideoStatus.length > 0) {
      let formVideo = new FormData();
      formVideo.append("type", "video");
      formVideo.append("user_id", user._id);
      formVideo.append("text", writeStatus);
      formVideo.append("statusfile", selectFileVideoStatus[0], selectFileVideoStatus[0].name);
      axios.post(`${BaseUrl}/add-status`, formVideo).then(res => {
        getUsersStatus(user._id);
      })

    }
    if (writeStatus.trim() != "" && selectFileVideoStatus.length == 0 && selectFilePhotoStatus.length == 0) {
      axios.post(`${BaseUrl}/add-status-text`, { user_id: user._id, type: "text", text: writeStatus }).then(res => {
        getUsersStatus(user._id);
      })

    }
    setModalStatus(false);
    setWriteStatus("")
  }
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
  function getSendUser(text) {
    axios.get(`${BaseUrl}/send-users/${text}`).then(res => {
      if (res.data.status == true) {
        setSendUsers(res.data.data);
      }
    })
  }
  function getUsersStatus(user_id) {
    axios.get(`${BaseUrl}/user-status/${user_id}`).then(res => {
      if (res.data.status == true) {
        setUsersStatus(res.data.user);
        setProfileStatus(res.data.data);
      }
    })
  }
  function getPostList(limit, skip, user) {
    axios.get(`${BaseUrl}/posts/${user._id}?limit=${limit}&skip=${skip}`).then(res => {
      if (res.data.status == true) {
        console.log("My Post", res)
        if (skip == 0) {
          setListPosts(res.data.data);
        } else {
          let list = listposts;
          res.data.data.forEach(element => {
            list.push(element)
          });
          setListPosts(list);
        }
      }
    })
  }
  const maxNames = usersStatus.length;
  const handleNext = () => {
    activeStep === 0 ? setActiveStep(-200 * (maxNames - 1)) : setActiveStep(activeStep + 200);
    setActiveStep(activeStep + 200);
  };

  const handleBack = () => {
    activeStep === -200 * (maxNames - 1) ? setActiveStep(0) : setActiveStep(activeStep - 200);
    setActiveStep(activeStep - 200);
  };
  function followSuggetion(user_id) {
    axios.get(`${BaseUrl}/follower-suggetion/${user_id}`).then(res => {
      if (res.data.status == true) {
        setFollowerSuggetion(res.data.data);
      }
    })
  }
  function sentComments(post_id, index) {
    axios.post(`${BaseUrl}/add-comment`, { post_id, user_id: user._id, comment }).then(res => {
      if (res.data.status == true) {
        let posts = listposts;
        posts[index].comment += 1;
        let result = posts.filter(item => true);
        setListPosts(result)
        setComments("");
      }
    })
  }
  function likeAction(post_id, index) {
    axios.get(`${BaseUrl}/likes/${post_id}/${user._id}`).then(res => {
      if (res.data.status == true) {
        let posts = listposts;
        posts[index].is_like = res.data.like;
        if (res.data.like) {
          posts[index].like += 1;
        } else {
          posts[index].like -= 1;
        }
        let result = posts.filter(item => true);
        setListPosts(result)
      }
    })
  }
  function savesAction(post_id, index) {
    axios.get(`${BaseUrl}/saves/${post_id}/${user._id}`).then(res => {
      if (res.data.status == true) {
        let posts = listposts;
        posts[index].is_save = res.data.save;
        let result = posts.filter(item => true);
        setListPosts(result)
      }
    })
  }
  function followAction(following_id) {
    axios.get(`${BaseUrl}/follow/${user._id}/${following_id}`).then(res => {
      if (res.data.status == true) {
        followSuggetion(user._id)
      }
    })
  }
  function sendAction(item, index) {
    setSendDetails(item);
    setSendIndex(index);
    setModalSend(true);
  }
  function sendPostAction(item) {
    console.log(item)
  }
  function clickViewStatus(item, index) {
    setViewStatus(true)
    setCurrentStatus(item)
    setCurrenInsex(index)
  }
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', marginBottom: '30px', zIndex: 400 }} >
        <Header />
      </div>

      <div className='mainbody' >

        <div className='mainchatbody' >
          <div className='storybox' >
            <div className='chatbox' >
              <div style={{ width: '100%', height: '100px', overflowX: 'hidden', marginTop: '10px', scrollBehavior: 'smooth', position: 'relative', transition: 0.5 }} className={classes.root} >
                <div onClick={() => { setModalStatus(true) }} style={{ transform: `translateX(${activeStep}%)`, transition: '0.5s' }} >
                  <Avatar alt={user.name} src={social.picture == null ? user.image : social.picture} className={classes.large} />
                  <p className='icontext' >
                    {user.name}
                  </p>
                </div>
                {usersStatus.map((person, index) => {
                  return (
                    <div onClick={() => { clickViewStatus(person, index) }} style={{ transform: `translateX(${activeStep}%)`, transition: '0.5s' }} >
                      <Avatar alt={person.user.name} src={person.user.picture == null ? "" : person.user.picture} className={classes.large} />
                      <p className='icontext' >
                        {person.user.name}
                      </p>
                    </div>
                  )
                })}
                <div style={{ position: 'absolute', left: 0, zIndex: 100 }}>
                  {activeStep === 0 ? null : <IconButton onClick={handleNext} style={{ outline: 'none' }}  >
                    <ChevronLeftIcon style={{ backgroundColor: 'white', borderRadius: '50px', marginTop: '3px', outline: 'none' }} />
                  </IconButton>}
                </div>
                <div style={{ right: 0, position: 'absolute', zIndex: 100 }} >
                  {activeStep === (-200 * (maxNames + 1)) + 2800 ? null : <IconButton style={{ outline: 'none' }} onClick={handleBack} >
                    <ChevronRightIcon style={{ backgroundColor: 'white', borderRadius: '50px', marginTop: '3px', outline: 'none' }} />
                  </IconButton>}
                </div>
              </div>

            </div>
            <Modal isOpen={modalSend} toggle={() => { setModalSend(!modalSend) }} >
              <ModalHeader toggle={() => { setModalSend(!modalSend) }} close={<button className="close" onClick={() => { setModalSend(!modalSend) }}>&times;</button>}>Share <input onKeyUp={(e) => { getSendUser(e.target.value) }} placeholder="Search....." className="search_user" /></ModalHeader>
              <ModalBody>

                {sendUsers.map((item, index) => {
                  return (<div className='mainprofile' >

                    <Avatar src={item.picture == null ? "" : item.picture} style={{ border: '2px solid #e8b0b1' }} />
                    <div style={{ marginLeft: 15, width: "70%" }} >
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', float: 'left', overflow: 'hidden', width: '100%', whiteSpace: 'nowrap', display: 'flex' }} >{item.name}</div>
                      <div style={{ color: 'gray' }}  > {item.status} </div>
                    </div>
                    <Button onClick={() => { sendPostAction(item) }} color="link">Send</Button>
                  </div>)
                })}
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => { setModalSend(!modalSend) }}>Cancel</Button>{' '}
              </ModalFooter>
            </Modal>
            <Modal isOpen={viewStatus} toggle={() => { setViewStatus(!viewStatus) }} >
              <ModalBody>
                <div className="container-fluid" style={{ paddingBottom: 20 }}>
                  <Row>
                    <Col span={12}>
                      {currentStatus.stories != undefined ? <RBCarousel
                        slidePrev={(e) => { console.log(e, "p") }}
                        slideNext={(e) => { console.log(e, "p") }}
                        animation={true}
                        autoplay={autoplay}
                        slideshowSpeed={2000}
                        defaultActiveIndex={0}
                        onSelect={_onSelect}
                        ref={slider}
                        version={4}
                      >
                        {currentStatus.stories.map((item, index) => {
                          return (<>
                            {item.type == "image" ? <div style={{ height: 400 }}>
                              <img
                                style={{ width: "100%", height: "100%" }}
                                src={item.fileUrl}
                              />
                              <div className="carousel-caption"
                              >{item.text}</div>
                            </div> : null}
                            {item.type == "video" ? <div style={{ ...styles, backgroundColor: "aqua" }}>
                              <video
                                className="carousel-center"
                                controls
                                style={{ width: "75%" }}
                                height="250"
                              >
                                <source
                                  src={ImageUrl + item.fileUrl}
                                  type="video/mp4"
                                />
                              </video>
                              <div className="carousel-caption">{item.text}</div>
                            </div> : null}
                            {item.type == "text" ? <div style={{ ...styles, backgroundColor: "lightpink" }}>
                              <div className="carousel-center">{item.text}</div>
                            </div> : null}

                          </>)
                        })}
                      </RBCarousel> : null}
                    </Col>
                  </Row>
                </div>
              </ModalBody>
            </Modal>
            <Modal isOpen={modalStatus} toggle={() => { setModalStatus(!modalStatus) }} >

              <ModalBody>
                <div className="container-fluid" style={{ paddingBottom: 20 }}>
                  <Row>
                    <Col span={12}>
                      <RBCarousel
                        animation={true}
                        autoplay={autoplay}
                        slideshowSpeed={2000}
                        defaultActiveIndex={0}
                        onSelect={_onSelect}
                        ref={slider}
                        version={4}
                      >
                        {profileStatus.map((item, index) => {
                          return (<>
                            {item.type == "image" ? <div style={{ height: 400 }}>
                              <img
                                style={{ width: "100%", height: "100%" }}
                                src={item.fileUrl}
                              />
                              <div className="carousel-caption"
                              >{item.text}</div>
                            </div> : null}
                            {item.type == "video" ? <div style={{ ...styles, backgroundColor: "aqua" }}>
                              <video
                                className="carousel-center"
                                controls
                                style={{ width: "75%" }}
                                height="250"
                              >
                                <source
                                  src={ImageUrl + item.fileUrl}
                                  type="video/mp4"
                                />
                              </video>
                              <div className="carousel-caption">{item.text}</div>
                            </div> : null}
                            {item.type == "text" ? <div style={{ ...styles, backgroundColor: "lightpink" }}>
                              <div className="carousel-center">{item.text}</div>
                            </div> : null}

                          </>)
                        })}
                      </RBCarousel>
                    </Col>
                  </Row>
                </div>

              </ModalBody>
              <ModalHeader toggle={() => { setModalStatus(!modalStatus) }} close={<button className="close" onClick={() => { setModalStatus(!modalStatus) }}>&times;</button>}>
                <FormGroup className="addfile" style={{ marginBottom: 0 }}>
                  <input onChange={(e) => { setWriteStatus(e.target.value) }} placeholder="Write somthing here" className="status_text" name="description" />
                  <IconButton onClick={onUploadPhotoStatus}  >
                    <input type='file' accept="image/*" onChange={(e) => { setSelectFilePhotoStatus(e.target.files) }} ref={filePhotoStatus} style={{ display: 'none' }} />
                    <PhotoCamera />
                  </IconButton>
                  <IconButton onClick={onUploadVideoStatus}  >
                    <input type='file' accept="video/mp4,video/x-m4v,video/*" onChange={(e) => { setSelectFileVideoStatus(e.target.files) }} ref={fileVideoStatus} style={{ display: 'none' }} />
                    <Videocam />
                  </IconButton>
                  <Button color="primary" style={{ float: "right", marginRight: 5, marginTop: 5 }} onClick={() => { addStatus() }}>Add eMAGAZINE</Button>
                </FormGroup>
              </ModalHeader>
            </Modal>
            <Modal isOpen={modal} toggle={() => { setModal(!modal) }} >
              <ModalHeader toggle={() => { setModal(!modal) }} close={closeBtn}>New Post</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label>Write post</Label>
                  <textarea className="post_textarea"  onChange={(e) => { setWritePost(e.target.value) }} placeholder="Write somthing" name="description" />
                </FormGroup>
                <FormGroup className="addfile">
                  <IconButton onClick={onUploadPhoto}  >
                    <input type='file' multiple accept="image/*" onChange={(e) => { setSelectFilePhoto(e.target.files) }} ref={filePhoto} style={{ display: 'none' }} />
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
                <Button color="primary" onClick={() => { addPostStart() }}>Create Now</Button>
              </ModalFooter>
            </Modal>
            <div className='storyblock' >
              <FormGroup onClick={() => setModal(!modal)} className="addfile">
                <span style={{ marginLeft: 20 }}>Write somthing here</span>
                <IconButton >
                  <PhotoCamera />
                </IconButton>
                <IconButton>
                  <Videocam />
                </IconButton>
              </FormGroup>
              {listposts.map((item, index) => {
                return (<div className='storycard' >
                  <a className='cardnav' onClick={() => { history.push("/eMagz/user-profile", item.user[0]) }}>
                    <div style={{ marginLeft: '10px', marginTop: '10px' }} >
                      <Avatar src={item.user.picture == null ? "" : item.user.picture} style={{ border: '2px solid #e8b0b1' }} />
                    </div>
                    <div style={{ flex: 1 }} >
                      <p className="post_name">{item.user[0].name}</p>
                      <p className="post_status">{item.user[0].status}</p>
                    </div>
                  </a>
                  <div className='cardbody' >
                    {item.files.length > 0 ? <>
                      <RBCarousel
                        slidePrev={(e) => { console.log(e) }}
                        slideNext={(e) => { console.log(e) }}
                        autoplay={autoplay}
                        animation={true}
                        indicators={false}
                        slideshowSpeed={2000}
                        defaultActiveIndex={0}
                        onSelect={_onSelect}
                        ref={slider}
                        version={4}
                      >
                        {item.files.map((file, index) => {
                          return (<>
                            {file.type == "image" ? <img className='cardimg' src={file.fileUrl} /> : null}
                            {file.type == "video" ? <Player
                              playsInline className='cardvideo'
                              poster="/assets/poster.png"
                              src={file.fileUrl}
                            /> : null}
                          </>)
                        })}
                      </RBCarousel></> : null}
                    <p className="tags">{item.tags}</p>
                    <p className="description">{item.description}</p>
                  </div>


                  <div className='groupicons' >
                    <div>
                      {item.is_like ?
                        <Favorite onClick={() => { likeAction(item._id, index) }} fontSize='large' style={{ marginLeft: 15, color: 'red' }} />
                        :
                        <FavoriteIcon style={{ marginLeft: 15 }} onClick={() => { likeAction(item._id, index) }} fontSize='large' />
                      }

                      <ChatBubbleOutlineIcon onClick={() => { redirect("eMagz/posts", item) }} style={{ margin: "0px 15px" }} fontSize='large' />
                      <SendIcon onClick={() => { sendAction(item, index) }} style={{ marginTop: -5 }} fontSize='large' />
                    </div>
                    <div style={{ flex: 1 }} />
                    <div>
                      <IconButton>
                        {item.is_save ? <BookmarkIcon style={{ color: 'blue' }} onClick={() => { savesAction(item._id, index) }} fontSize='large' />
                          : <BookmarkBorderIcon onClick={() => { savesAction(item._id, index) }} fontSize='large' />}
                      </IconButton>
                    </div>
                  </div>
                  <div style={{ float: 'left', marginLeft: '10px', display: "flex" }} >
                    <p className='textcolor'><b>{item.like} Likes</b></p>
                    <p className='textcolor'><b>{item.comment} Comment</b></p>
                    {/* <p className='textcolor'><b>{item.share} Shares</b></p> */}
                  </div>
                  <div className='postname'>
                    <p className='persontext'><strong style={{ paddingRight: 10 }} >{user.name}</strong>Some text here... </p>
                  </div>
                  <div className='msgfooter' >
                    <hr />
                    <div className='textbox' >
                      <form>
                        <textarea onChange={(e) => { setComments(e.target.value) }} className='textinput' placeholder='Add a comment...' ></textarea>
                        <IconButton style={{ transform: 'translateY(-25px)' }} >
                          <SendIcon onClick={() => { sentComments(item._id, index) }} fontSize='large' />
                        </IconButton>
                      </form>
                    </div>
                  </div>
                </div>)
              }
              )}
            </div>
          </div>

          <div className='profiledetails' >
            <div className='mainprofile' >
              <Avatar src={user.image} style={{ border: '2px solid #e8b0b1' }} />
              <div style={{ marginLeft: '10px' }} >
                <div style={{ fontSize: '1rem', fontWeight: 'bold', float: 'left', overflow: 'hidden', width: '100%', whiteSpace: 'nowrap', display: 'flex' }} >{user.name}</div>
                <div style={{ color: 'gray' }}  >
                  {user.email}
                </div>
              </div>
            </div>
            <div className='suggestion_box' >
              <div className='suggestion_head' >
                <b>Suggestions for You</b>
              </div>
              <div style={{ flex: 1 }} />
              <div>
                <Button style={{ textDecoration: 'none', paddingTop: '0px', color: 'black', backgroundColor: 'white', border: 'none', outline: 'none' }}><b>See All</b></Button>
              </div>
            </div>
            {followerSuggetion.map((item) => {
              return (<>
                <a className='suggestion_list' >
                  <Avatar onClick={() => { history.push("/eMagz/user-profile", item) }} alt={item.name} src={item.picture} />
                  <div onClick={() => { history.push("/eMagz/user-profile", item) }} className='followers' >
                    {item.name}
                    <div className='follow' >{item.status}</div>
                  </div>
                  <div style={{ flex: 1 }} />
                  <div> <Button onClick={() => { followAction(item.user_id) }} color="link">Follow</Button> </div>
                </a>
              </>)
            })}

          </div>

        </div>

      </div>

    </>
  )



}



export default Socialmedia;



















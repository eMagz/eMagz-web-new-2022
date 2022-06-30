import React, { useState, useEffect, useRef } from 'react';

import './index.css';
import Header from './../Header';
import Avatar from '@material-ui/core/Avatar';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { BaseUrl, ImageUrl } from '../../API';
import { Card, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import RBCarousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
const SocialMediaPost = (props) => {
  const post = useState(props.location.state);
  const [postDetails, setPostDetails] = useState(null);
  const [user, setUser] = useState({});
  const slider = useRef("");
  const [autoplay, setAutoplay] = useState(false);
  const [comment, setComments] = useState("");
  const [modalSend, setModalSend] = useState(false);
  const [sendDetails, setSendDetails] = useState({});
  const [sendIndex, setSendIndex] = useState({});
  const [sendUsers, setSendUsers] = useState([]);
  const closeBtn = <button className="close" onClick={() => { setModalSend(!modalSend) }}>&times;</button>;
  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user != null) {
      user = JSON.parse(user);
      setUser(user);
      getSendUser("a");
      getPostDetails(user._id);
    }
  }, [])
  const history = useHistory();
  const redirect = (post_id) => {
    axios.get(`${BaseUrl}/post-details/${post_id}/${user._id}`).then(res => {
      if (res.data.status == true) {
        setPostDetails(res.data.data);
      }
    })
  }
  function getPostDetails(user_id) {
    axios.get(`${BaseUrl}/post-details/${post[0]._id}/${user_id}`).then(res => {
      if (res.data.status == true) {
        setPostDetails(res.data.data);
      }
    })
  }
  function getSendUser(text) {
    axios.get(`${BaseUrl}/send-users/${text}`).then(res => {
      if (res.data.status == true) {
        setSendUsers(res.data.data);
      }
    })
  }
  function sentComments(post_id) {
    axios.post(`${BaseUrl}/add-comment`, { post_id, user_id: user._id, comment }).then(res => {
      if (res.data.status == true) {
        setComments("")
        getPostDetails(user._id);

      }
    })
  }
  function savesAction(post_id) {
    axios.get(`${BaseUrl}/saves/${post_id}/${user._id}`).then(res => {
      if (res.data.status == true) {
        getPostDetails(user._id);
      }
    })
  }
  function likeAction(post_id) {
    axios.get(`${BaseUrl}/likes/${post_id}/${user._id}`).then(res => {
      if (res.data.status == true) {
        getPostDetails(user._id);
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
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', marginBottom: '30px', zIndex: 400 }} >
        <Header />
      </div>
      <Modal isOpen={modalSend} toggle={() => { setModalSend(!modalSend) }} >
        <ModalHeader toggle={() => { setModalSend(!modalSend) }} close={closeBtn}>Share <input onKeyUp={(e) => { getSendUser(e.target.value) }} placeholder="Search....." className="search_user" /></ModalHeader>
        <ModalBody>

          {sendUsers.map((item, index) => {
            return (<div className='mainprofile' >

              <Avatar src={item.picture == null ? "" : ImageUrl + item.picture} style={{ border: '2px solid #e8b0b1' }} />
              <div style={{ marginLeft: 15, width: "70%" }} >
                <div style={{ fontSize: '1rem',textTransform: "capitalize", fontWeight: 'bold', float: 'left', overflow: 'hidden', width: '100%', whiteSpace: 'nowrap', display: 'flex' }} >{item.name}</div>
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
      {postDetails != null ? <div className='mainbody' >

        <div className='mainchatbody' >
          <div className='storybox' >
            <div className='storyblock' >
              <div className='storycard' >
                <><div className='cardbody' >
                  {postDetails.files.length > 0 ? <>
                      <RBCarousel
                        autoplay={autoplay}
                        animation={true}
                        indicators={false}
                        slideshowSpeed={2000}
                        defaultActiveIndex={0}
                        ref={slider}
                        version={4}
                      >
                      {postDetails.files.map((file, index) => {
                        return (<>
                          {file.type == "image" ? <img className='cardimg' src={ImageUrl + file.fileUrl} /> : null}
                          {file.type == "video" ? <Player
                            playsInline className='cardvideo'
                            poster="/assets/poster.png"
                            src={ImageUrl + file.fileUrl}
                          /> : null}
                        </>)
                      })}
                    </RBCarousel></> : null}
                  <p className="tags">{postDetails.tags}</p>
                  <p className="description">{postDetails.description}</p>
                </div>
                </>
              </div>
            </div>
          </div>
          <div className='profiledetails' >
            <div className='mainprofile' >
              <div style={{ marginLeft: '10px', width: "100%" }} >
                <div style={{ fontSize: '1rem', width: "100%", fontWeight: 'bold', float: 'left', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', textTransform: "capitalize" }} >{"Post Comments"}</div>
              </div>
            </div>
            <div className='comment_box' >
              {postDetails.comments.map((item) => {
                return (<>
                  <div className='suggestion_list' >
                    <Avatar style={{ width: 30, height: 30 }} src={ImageUrl + item.user[0].picture} />
                    <div className='postcomment' >
                      <div className='commentuser' >{item.user[0].name}</div>
                      <div className='post_comment' >{item.comment}</div>
                    </div>
                  </div>
                </>)
              })}
            </div>
            <div className='groupicons' >
              <div>
                {postDetails.is_like ? <Favorite onClick={() => { likeAction(postDetails._id) }} fontSize='large' style={{ marginLeft: 15, color: 'red' }} />
                  : <FavoriteIcon style={{ marginLeft: 15 }} onClick={() => { likeAction(postDetails._id) }} fontSize='large' />}

                <ChatBubbleOutlineIcon onClick={() => { redirect(post._id) }} style={{ margin: "0px 15px" }} fontSize='large' />
                <SendIcon onClick={() => { sendAction(postDetails) }} style={{ marginTop: -5 }} fontSize='large' />
              </div>
              <div style={{ flex: 1 }} />
              <div>
                <IconButton>
                  {postDetails.is_save ? <BookmarkIcon onClick={() => { savesAction(postDetails._id) }} style={{ color: 'blue' }} fontSize='large' />
                    : <BookmarkBorderIcon onClick={() => { savesAction(postDetails._id) }} fontSize='large' />}
                </IconButton>
              </div>
            </div>
            <div style={{ float: 'left', marginLeft: '10px', display: "flex" }} >
              <p className='textcolor'><b>{postDetails.like} Likes</b></p>
              <p className='textcolor'><b>{postDetails.comment} Comment</b></p>
              {/* <p className='textcolor'><b>{postDetails.share} Shares</b></p> */}
            </div>
            <div className='msgfooter' >
              <hr />
              <div className='textbox' >
                <form>
                  <textarea onChange={(e) => { setComments(e.target.value) }} value={comment} className='textinput' placeholder='Add a comment...' ></textarea>
                  <IconButton style={{ transform: 'translateY(-25px)' }} >
                    <SendIcon onClick={() => { sentComments(postDetails._id) }} fontSize='large' />
                  </IconButton>
                </form>
              </div>
            </div>

          </div>

        </div>
        <div className='post_user' >
          <Avatar src={user.picture == null ? "" : ImageUrl + user.picture} style={{ border: '2px solid #e8b0b1' }} />
          <div style={{ marginLeft: '10px', width: "80%" }} >
            <div style={{ fontSize: '1rem', width: "100%", fontWeight: 'bold', float: 'left', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', textTransform: "capitalize" }} >{postDetails.user[0].name}</div>
            <div style={{ color: "#5294e2" }}  > {postDetails.user[0].status} </div>
          </div>
        </div>
        <hr />
        <Row style={{ width: "100%" }}>
          <Col sm="12">
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
              {postDetails.socials.map((item) => {
                return (<Col sm="3" onClick={() => { redirect(item._id) }}>
                  <Card className='tabs_image' >
                    <div className="top-view">
                      {item.files.length > 0 ? <img className="post_image" src={ImageUrl + item.files[0].fileUrl} /> : ""}
                      <p className="description">{item.description}</p>
                      <p className="tags">{item.tags}</p>
                    </div>

                  </Card>
                </Col>
                )
              }
              )}
            </div>
          </Col>
        </Row>
      </div> : null}

    </>
  )



}



export default SocialMediaPost;



















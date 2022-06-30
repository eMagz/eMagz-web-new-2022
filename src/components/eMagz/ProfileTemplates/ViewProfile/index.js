
import React, { useState, useEffect } from 'react'
import './index.css'
import Header from '../../Header';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'moment';
import { BaseUrl, ImageUrl } from '../../../API'
const TemplateThree = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const userProfile = useState(props.location.state);
  const [socialprofile, setSocialProfile] = useState({});
  const [user, setUser] = useState({});
  const [postLists, setPostLists] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [banner, setBanner] = useState("assets/banners/1607519225715.jpg");
  const [picture, setPicture] = useState("assets/profile/avatar-icon.png");
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  useEffect(() => {
    console.log(userProfile)
    axios.get(`${BaseUrl}/user-posts/${userProfile[0].user_id}`).then(res => {
      if (res.data.status) {
        setPostLists(res.data.data);
      }
    })

    followList(userProfile[0].user_id)
    axios.get(`${BaseUrl}/social-profile/${userProfile[0].user_id}`).then(res => {
      if (res.data.status) {
        setSocialProfile(res.data.data);
        localStorage.setItem("socialprofile", JSON.stringify(res.data.data));
      }
    })
    let user = localStorage.getItem('user');
    if (user != null) {
      user = JSON.parse(user);
      setUser(user);
    }
  }, [])
  function followAction(following_id) {
    axios.get(`${BaseUrl}/follow/${user._id}/${following_id}`).then(res => {

    })
  }
  function followList(user_id) {
    axios.get(`${BaseUrl}/followers/${user_id}`).then(res => {
      if (res.data.status == true) {
        setFollowers(res.data.data);
      }
    })
  }


  return (
    <>
      <Header />
      <div style={{ marginTop: 20 }} className='container' >
        <div style={{ width:"100%" }}>
          <div className='temp3_header' >
            <div className='back_img' >
              <img style={{ marginTop: '10px', width: '100%', height: '100%' }} src={ImageUrl + (socialprofile.banner == null ? banner : socialprofile.banner)} />

            </div>
            <div className='temp3_main' >
              <img className='temp3_picture' src={ImageUrl + (socialprofile.picture == null ? picture : socialprofile.picture)} />

            </div>
          </div>
          <div className='profile_details3'  >
            <div className="profile-post">
              <div className='profName3' >{user.name}</div>

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
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                      {postLists.map((item) => {
                        return (<Card className='tabs_image' >
                          <div className="top-view">
                            {item.files.length > 0 ? <img className="post_image" src={ImageUrl + item.files[0].fileUrl} /> : ""}
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
                    return (<Col sm="3" style={{ margin: "10px 0px", padding: "0px 8px"}}>
                      <Card >
                        <div className="cord-follower">
                          <Avatar src={ImageUrl + item.user[0].picture} />
                          <span>
                            <p className="follower-name">{item.user[0].name}</p>
                            <p className="follower-status">{item.user[0].status}</p>
                            <Button onClick={() => { followAction(item.user_id) }} className="unfollowbtn">Follow</Button>
                          </span>
                        </div>
                      </Card>
                    </Col>
                    )
                  })}
                </Row>
              </TabPane>
            </TabContent>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  )




}


export default TemplateThree;















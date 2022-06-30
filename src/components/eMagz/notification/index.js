import React, { useState, useEffect, useRef } from 'react';

import './index.css';
import Header from './../Header';
import Avatar from '@material-ui/core/Avatar';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import IconButton from '@material-ui/core/IconButton';
import { BaseUrl, ImageUrl } from '../../API';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const SocialMediaPost = (props) => {
  const [notifications, setNotification] = useState([]);
  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user != null) {
      user = JSON.parse(user);
      getNotification(user._id);
    }
  }, [])
  const history = useHistory();
  const redirect = (url, data) => {
    history.push(url + "/" + data._id, data)
  }
  function getNotification(user_id) {
    axios.get(`${BaseUrl}/user-notification/${user_id}`).then(res => {
      if (res.data.status == true) {
        setNotification(res.data.data);
      }
    })
  }

  return (
    <>
      <div style={{ position: 'fixed', width: '100%', marginBottom: '30px', zIndex: 400 }} >
        <Header />
      </div>
      <div className='mainbody' >

        <div className='mainchatbody' >
          <div className='notification_list' >
            <div className='mainprofile' >
              <div style={{ marginLeft: '10px', width: "100%" }} >
                <div style={{ fontSize: '1rem', width: "100%", fontWeight: 'bold', float: 'left', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', textTransform: "capitalize" }} >{"Notifications"}</div>
              </div>
            </div>
            <div className='comment_box' style={{height:"100%"}} >
              {notifications.map((item) => {
                return (<>
                  <div className='suggestion_list'  onClick={() => { redirect("/eMagz/posts", item.post[0]) }} >
                    <Avatar style={{ width: 30, height: 30 }} src={ImageUrl + item.user[0].picture} />
                    <div className='postcomment' >
                      <div className='notifyuser' >{item.user[0].name+" "+item.message}</div>
                      <div className='post_description' >{item.post[0].description}</div>
                    </div>
                    {item.files.length>0?<>
                     {item.files[0].type == "video" ?<img style={{ width: 50, height: 50,marginTop:0 }} src={"https://blog.majestic.com/wp-content/uploads/2010/10/Video-Icon-crop.png"} />:null}
                     {item.files[0].type == "image" ? <img style={{ width: 50, height: 50,marginTop:0 }} src={ImageUrl + item.files[0].fileUrl} />:null}</>:null}
                  </div>
                </>)
              })}
            </div>
          </div>
        </div>
      </div> 
    </>
  )



}



export default SocialMediaPost;



















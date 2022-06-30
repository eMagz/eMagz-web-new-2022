import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import {useSelector} from "react-redux"
import { BaseUrl, ImageUrl } from "../../API"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import CommentIcon from '@material-ui/icons/Comment';
import FilterListIcon from '@material-ui/icons/FilterList';
import Avatar from '@material-ui/core/Avatar';
import { Input } from "reactstrap"
import { Button } from "@material-ui/core"
import Axios from "axios"
import socket from '../../socket';
import SendIcon from '@material-ui/icons/Send';
import moment from "moment"
import Header from "../Header"
let Admin = JSON.parse(localStorage.getItem('Admin'));
const orderUsers = []

const NewChat = (props) => {
  const admin = props.location.state
  const [message, setMessage] = useState('')
  const [prevMessage, setPrevMessage] = useState([])
  const [chatData, setChatData] = useState('')
  const [RoomID, setRoomID] = useState('')
  const [receiverPic, setReceiverPic] = useState('')
  const [senderPic, setSenderPic] = useState('')
  const [userList, setUserList] = useState([])
  const [currentUser, seCurrentUser] = useState({})
  const [searchText, setSearchText] = useState('')
  const [profileList, setProfileList] = useState([])
  const [currentChat, setCurrentChat] = useState([])
  let userData = useSelector((state)=>state.loginReducer.adminDetails)

  if(userData){
    Admin = userData
  }

  useEffect(() => {
    const results = profileList.filter(person =>
      person.name.toLowerCase().includes(searchText.toLocaleLowerCase())

    );
    setUserList(results);
  }, [searchText])

  const getAllUserList = () => {
    Axios.get(`${BaseUrl}/order-users-list`).then((res) => {
      let tempArray = []
      tempArray =  res.data.data.orderDetails
      tempArray.forEach((data, index)=>{
        orderUsers.push(data.users[0])
      })
      console.log('Users', orderUsers)
      setUserList(orderUsers)
      setProfileList(orderUsers)
      seCurrentUser(orderUsers[0])
    })
  }
  const letsStartChat = (currentUser) => {
    console.log('Clicked', currentUser)
    seCurrentUser(currentUser)

    console.log('User ID', Admin)
    console.log('Admin', admin)
    Axios.get(`${BaseUrl}/get-all-message/${currentUser._id}/${Admin._id}`).then(
      res => {
        if (res.data.data.length > 0) {
          console.log('All Message', res.data.data)
          setReceiverPic(res.data.data[0].ReceiverPhoto)
          setSenderPic(res.data.data[0].SenderPhoto)
          console.log('Already Message', res.data.data)
          setPrevMessage(res.data.data[0].message)
          socket.emit('JoinRoom', res.data.data[0]._id)
          setRoomID(res.data.data[0]._id)
        } else {
          let roomCreate = {
            SenderId: Admin._id,
            ReceiverId: currentUser._id,
            SenderPhoto: Admin.image,
            ReceiverPhoto: currentUser.image,
          }
          console.log("Room Create ", roomCreate)
          Axios.post(`${BaseUrl}/create-room`, roomCreate).then((res) => {
            setRoomID(res.data.data._id)
            console.log('Room Create API', res)
            socket.emit('JoinRoom', res.data.data._id)
          })
        }
      }
    )
  }

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    return messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    getAllUserList()
    socket.on('connection', () => {
      console.log(`I'm connected with the back-end`)
      console.log('zx', socket.id);
      console.log('conn', socket.connected)
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [prevMessage]);

  const sendMessage = (e) => {
    e.preventDefault()
    console.log("Message Sended", RoomID)
    let messageData = {
      SenderId: Admin._id,
      RoomId: RoomID,
      ReceiverId: currentUser.user_id,
      message: {
        Message: message,
        SenderId: Admin._id,
        ReceiverId: currentUser.user_id,
        ReceiverName: currentUser.name,
        SenderName: Admin.name,
      }
    }
    setMessage('')
    //console.log("Message Sended", previousMessage)
    let m = [...prevMessage];
    m.push(messageData.message)
    setPrevMessage(m)
    setMessage('')
    console.log("Message Sended", prevMessage)
    socket.emit('SendBusinessMessage', messageData)
    Axios.post(`${BaseUrl}/send-message/${RoomID}`, messageData).then(
      res => {
      }
    )
  }
  socket.on('RecieveBusinessMessage', data => {
    setCurrentChat(data.message)
    console.log('dt', data);
    if (prevMessage.indexOf(data.message) == -1) {
      let m = prevMessage;
      m.push(data.message);
      setPrevMessage(m)
    }
  })
  return (
    <>
     <Header />
      <div className='chat_container' >
        <div className='chat_main_container' >
          <div className='chatLeft1' >
            <div className='chat_listbar'>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <h4>Admin Chats</h4>
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <div className='chat_profilebar' >
            <div  >
              <img src={ImageUrl + currentUser.image} style={{ marginTop: '0px' }} className='chat_profile_picture' />
            </div>
            <div className='chat_name' >
              {currentUser.name}
            </div>
            <div style={{ flex: 1 }} />
            <div>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className='main_text_area'>
          <div className='text_area'>
            {
              prevMessage.map((message, index) => {
                if (Admin._id === message.SenderId) {
                  return (
                    <div className='Susertwo'>
                      <div>
                        <img className="userPic" alt="Remy Sharp" src={Admin.image} />
                      </div>
                      <div>
                        <p className='usertwotext'>{message.Message}</p>
                        <p className="Date_Time"> {moment(message.MessageAt).fromNow()} </p>
                      </div>
                      <div ref={messagesEndRef} />
                    </div>
                  )
                } else {
                  return (
                    <div>
                      <div  className='Suserone'>
                        <div>
                          <img className="userPic" alt="Remy Sharp" src={ImageUrl + receiverPic} />
                        </div>
                        <div>
                          <p className='useronetext' >{message.Message}</p>
                          <p className="Date_Time" style={{ color: "black" }}> {moment(message.MessageAt).fromNow()}</p>
                        </div>
                        <div ref={messagesEndRef} />
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
          <div className='chatfoot' >
            <form onSubmit={sendMessage} style={{ display: "flex", backgroundColor: "#eadede" }}>
              <Input
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                style={{ borderRadius: '30px', minHeight: '50px', margin: '5px 0px 0px 6px', border: 'none' }}
                placeholder="Type Text Here..." />
              <Button type="submit"><SendIcon /></Button>
            </form>
          </div>
        </div>
        <div className='chat_search'>
          <div className='chat_search_bar' >
            <FontAwesomeIcon className='search_icon' icon={faSearch} />
            <form>
              <input autoComplete="off" value={searchText} onChange={(e) => setSearchText(e.target.value)} className='chat_header_input' placeholder='search products...' />
            </form>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </div>
        </div>
        <div className='main_chat_list'  >
          {
            userList.map((user) => {
              return (
                <div onClick={() => letsStartChat(user)} className='list_section'>
                  <div className='prof_image_div'>
                    <img src={ImageUrl + user.image} style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
                  </div>
                  <div className='maintext_head' >
                    <div className='name_text'>
                      {user.name}
                      <div className='msg'>
                  </div>
                    </div>
                    <div className='time'>
                      2:30
                </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
export default NewChat;
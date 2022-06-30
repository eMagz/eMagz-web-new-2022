import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BaseUrl, ImageUrl } from "../../API"
import {useSelector} from "react-redux"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { Input, } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import './index.css';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Header from '../Header';
import Axios from "axios"
import ChatDetails from "./ChatDetails"
import './index.css';

let userdata = JSON.parse(localStorage.getItem('user'))

const useStyles = makeStyles((theme) => ({

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  smallone: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: '4px 0px 0px 10px'
  },
  smalltwo: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: '4px 10px 0px 0px'
  }
}));

export default function SocialChat() {
  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [usersList, setUsersList] = useState([])
  const [name, setName] = useState('')
  const [chatUser, setChatUser] = useState(null)
  const [chats, setChats] = useState('')
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState('')

  let userData = useSelector((state)=>state.loginReducer.userDetails)
  console.log('Use Selector', userData)
  if(userData.isActive === 1){
    console.log('Internal Selector', userData.isActive)
    userdata =  userData
  }

  useEffect(()=>{
    console.log('User Data', userdata)
      if(userdata){
        Axios.get(`${BaseUrl}/social-profile-list/${userdata._id}`).then((res) => {
          setUsers(res.data.data) 
          setUsersList(res.data.data) 
          setChatUser(res.data.data[0])
        })
      }
      
  },[userdata])

  const handleUserProfile = (user) => {
    setChatUser(user)
  }
  useEffect(()=>{
    const results = usersList.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setUsers(results);
  },[searchTerm])
  return (
    <>
      <Header />
      <div>
        <Grid container>
          <Grid item xs={4}>
              <div className='attendiesSearch' >
                <input autoComplete="off" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='Sociaslinput' type="email" name="email" id="exampleEmail" placeholder="Search..." />
                <div style={{ transform: 'translateX(-30px)' }} >
                  <SearchIcon />
                </div>
              </div>
              <br />
              <br />
              <div className="rootSocialChat">
                {
                  users.map((user) => {
                    return <div className='Social_paper' >
                      <div className='SocialChatList' onClick={() => handleUserProfile(user)} >
                        <div>
                          <ListItemAvatar>
                            <Avatar src={user.picture} alt="Remy Sharp" />
                          </ListItemAvatar>
                        </div>
                        <div>
                          <h5>{user.name}</h5>
                        </div>
                      </div>
                      <div className='line' />
                    </div>
                  })
                }
              </div>
          </Grid>
         {chatUser !==null ? <ChatDetails chatUserDetails={chatUser} />: null}
        </Grid>
      </div>
    </>
  );
}
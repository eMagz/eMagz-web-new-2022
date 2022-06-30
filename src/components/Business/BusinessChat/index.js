import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BaseUrl, ImageUrl } from "../../API"
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
import ChatDetails from "./Business"
import './index.css';

let userdata = 0;
const user = JSON.parse(localStorage.getItem('user'))
if(user){
  userdata = user 
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    top: '5rem',
    left: 0,
    right: 0,
    bottom: 0
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // backgroundColor: '#F5F5F5',
    height: '520px',
    overflowY: 'hidden'
  },
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

export default function Index() {
  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [chatUser, setChatUser] = useState(null)
  const [chats, setChats] = useState('')
  const [message, setMessage] = useState("");

  useEffect(() => {
    Axios.get(`${BaseUrl}/social-profile-list/${userdata._id}`).then((res) => {
      setUsers(res.data.data)
      setChatUser(res.data.data[0])
    })
  }, [])

  const handleUserProfile = (user) => {
    setChatUser(user)
  }
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <div className='attendiesSearch' >
                <Input className='input' type="email" name="email" id="exampleEmail" placeholder="Search..." />
                <div style={{ transform: 'translateX(-30px)' }} >
                  <SearchIcon />
                </div>
              </div>
              <br />
              <br />
              <div className='root'>
                {
                  users.map((user) => {
                    return <div className='paper' >
                      <div className='list' onClick={() => handleUserProfile(user)} >
                        <div>
                          <ListItemAvatar>
                            <Avatar src={ImageUrl + user.picture} alt="Remy Sharp" />
                          </ListItemAvatar>
                        </div>
                        <div>
                          <h5>{user.name}</h5>
                        </div>
                      </div>
                    </div>
                  })
                }
              </div>
            </Paper>
          </Grid>
         {chatUser !==null ? <ChatDetails chatUserDetails={chatUser} />: null}
        </Grid>
      </div>
    </>
  );
}
import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BaseUrl, ImageUrl } from "../../API";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { Input } from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import "./index.css";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Header from "../Header";
import axios from "axios";
import moment from "moment";
import socketIOClient from "socket.io-client";
const userdata = JSON.parse(localStorage.getItem("user"));

var socket = socketIOClient(ImageUrl);
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // backgroundColor: '#F5F5F5',
    height: "520px",
    overflowY: "hidden",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  smallone: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: "4px 0px 0px 10px",
  },
  smalltwo: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: "4px 10px 0px 0px",
  },
}));

const Business = ({ chatUserDetails }) => {
  console.log("UserData", chatUserDetails);
  const finalMessage = [];
  const classes = useStyles();
  const [CurrentMessage, setCurrentMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isMessageSend, setIsMessageSend] = useState(false);
  const [chatUser, setChatUser] = useState([]);
  const [chatdata, setChatdata] = useState([]);
  const [RoomID, setRoomID] = useState("");
  const [previousMessage, setPreviousMessage] = useState([]);
  const [receiverPic, setReceiverPic] = useState("");
  const [senderPic, setSenderPic] = useState("");

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    return messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const getAdmindata = () => {
    console.log("User ID", userdata);
    axios
      .get(
        `${BaseUrl}/get-all-message/${userdata._id}/${chatUserDetails.user_id}`
      )
      .then((res) => {
        console.log("res.data.data");
        if (res.data.data.length > 0) {
          setReceiverPic(res.data.data[0].ReceiverPhoto);
          setSenderPic(res.data.data[0].SenderPhoto);
          setPreviousMessage(res.data.data[0].message);
          console.log("res esage.data.data", res.data.data[0].message);
          console.log("res.data.data", res.data.data);
          socket.emit("JoinRoom", res.data.data[0]._id);
          setRoomID(res.data.data[0]._id);
          setChatdata(res.data.data);
        } else {
          let roomCreate = {
            SenderId: userdata._id,
            ReceiverId: chatUserDetails.user_id,
            SenderPhoto: userdata.image,
            ReceiverPhoto: chatUserDetails.picture,
          };
          axios.post(`${BaseUrl}/create-room`, roomCreate).then((res) => {
            console.log("Room Create API", res);
            socket.emit("JoinRoom", res.data.data._id);
            setRoomID(res.data.data._id);
          });
        }
      });
  };
  useEffect(() => {
    getAdmindata();
  }, [chatUserDetails]);

  useEffect(() => {
    scrollToBottom();
  }, [previousMessage]);

  useEffect(() => {
    socket.on("connection", () => {
      console.log(`I'm connected with the back-end`);
      console.log("zx", socket.id);
      console.log("conn", socket.connected);
    });
  }, []);

  socket.on("RecieveMessage", (data) => {
    if (previousMessage.indexOf(data.message) == -1) {
      let m = previousMessage;
      m.push(data.message);
      setPreviousMessage(m);
    }
    console.log("dt", data);
  });
  const sendMessage = (e) => {
    e.preventDefault();
    let messageData = {
      SenderId: userdata._id,
      RoomId: RoomID,
      ReceiverId: chatUserDetails.user_id,
      message: {
        Message: CurrentMessage,
        SenderId: userdata._id,
        ReceiverId: chatUserDetails.user_id,
        ReceiverName: chatUserDetails.name,
        SenderName: userdata.name,
      },
    };
    let m = [...previousMessage];
    m.push(messageData.message);
    setPreviousMessage(m);
    setCurrentMessage("");
    console.log("Message Sended", previousMessage);
    socket.emit("SendMessage", messageData);
    axios
      .post(`${BaseUrl}/send-message/${RoomID}`, messageData)
      .then((res) => {});
  };
  const setMessage = (e) => {
    setCurrentMessage(e.target.value);
  };
  return (
    <Grid item xs={8}>
      <Paper className={classes.paper}>
        <div className="mainbox">
          <div className="Businesschathead">
            <Avatar
              alt="Remy Sharp"
              src={ImageUrl + chatUserDetails.picture}
              className={classes.large}
            />
            <p className="chatUsername">{chatUserDetails.name}</p>
          </div>
          <div className="line" />
          <div className="chatbody">
            {previousMessage.map((message, index) => {
              if (message.SenderId === userdata._id) {
                return (
                  <div className="usertwo" key={index}>
                    <div>
                      <Avatar
                        alt={userdata.name}
                        src={userdata.image}
                        className={classes.smallone}
                      />
                    </div>
                    <p className="usertwotext">{message.Message}</p>
                    <p> {moment(message.AtMessage).format("MM DD YYYY")} </p>

                    <div ref={messagesEndRef} />
                  </div>
                );
              } else {
                return (
                  <div className="userone">
                    <Avatar
                      alt="name"
                      src={userdata.image}
                      className={classes.smalltwo}
                    />
                    <p className="useronetext">{message.Message}</p>
                    <p> {moment(message.AtMessage).format("MMM Do YY")} </p>
                    <div ref={messagesEndRef} />
                  </div>
                );
              }
            })}
          </div>
          <div className="chatfoot">
            <form onSubmit={sendMessage} style={{ display: "flex" }}>
              <Input
                onChange={(e) => setMessage(e)}
                value={CurrentMessage}
                style={{
                  borderRadius: "30px",
                  minHeight: "50px",
                  margin: "5px 0px 0px 6px",
                  border: "none",
                }}
                placeholder="Type Text Here..."
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default Business;

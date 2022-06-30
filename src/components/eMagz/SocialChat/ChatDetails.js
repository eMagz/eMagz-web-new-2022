import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BaseUrl } from "../../API";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { Input } from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import "./index.css";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import moment from "moment";
import socket from "../../socket";
import VoiceChatIcon from "@material-ui/icons/VoiceChat";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

let userdata = JSON.parse(localStorage.getItem("socialprofile"));

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginLeft: theme.spacing(1),
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

const ChatDetails = ({ chatUserDetails }) => {
  const history = useHistory();

  const classes = useStyles();
  const [CurrentMessage, setCurrentMessage] = useState("");

  const [chatdata, setChatdata] = useState([]);
  const [RoomID, setRoomID] = useState("");
  const [previousMessage, setPreviousMessage] = useState([]);
  const [receiverPic, setReceiverPic] = useState("");
  const [senderPic, setSenderPic] = useState("");
  const [isText, setIsText] = useState(true);
  const [videoCallReq, setVideoCallReq] = useState([]);
  const [open, setOpen] = useState(false);
  const [openReceive, setOpenReveive] = useState(false);
  const [acceptedRequest, setAcceptedRequest] = useState(false);

  useEffect(() => {
    if (acceptedRequest) {
      history.push("/eMagz/chat/video-calling");
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReveiveClose = () => {
    setOpenReveive(false);
  };

  let userData = useSelector((state) => state.loginReducer.userDetails);
  if (userData.isActive === 1) {
    console.log("Internal Selector", userData.isActive);
    userdata = userData;
  }

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    return messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getAdmindata = () => {
    axios
      .get(`${BaseUrl}/get-all-message/${userdata._id}/${chatUserDetails._id}`)
      .then((res) => {
        console.log("Room Data", res.data.data > 0, res.data.data);
        if (res.data.data.length > 0) {
          setReceiverPic(res.data.data[0].ReceiverPhoto);
          setSenderPic(res.data.data[0].SenderPhoto);
          setPreviousMessage(res.data.data[0].message);
          socket.emit("JoinRoom", res.data.data[0]._id);
          setRoomID(res.data.data[0]._id);
          setChatdata(res.data.data);
        } else {
          let roomCreate = {
            SenderId: userdata._id,
            ReceiverId: chatUserDetails._id,
            SenderPhoto: userdata.picture,
            ReceiverPhoto: chatUserDetails.picture,
          };
          axios.post(`${BaseUrl}/create-room`, roomCreate).then((res) => {
            socket.emit("JoinRoom", res.data.data._id);
            setRoomID(res.data.data._id);
          });
        }
      });
  };
  useEffect(() => {
    userdata = JSON.parse(localStorage.getItem("socialprofile"));
    if (userdata) {
      getAdmindata();
    }
  }, [chatUserDetails, userdata]);

  useEffect(() => {
    scrollToBottom();
  }, [previousMessage]);

  useEffect(() => {
    socket.on("connection", () => {});
  }, []);

  socket.on("RecieveMessage", (data) => {
    if (previousMessage.indexOf(data.message) == -1) {
      let m = previousMessage;
      m.push(data.message);
      setPreviousMessage(m);
    }
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
    setIsText(true);
    setCurrentMessage("");
    socket.emit("SendMessage", messageData);
    axios
      .post(`${BaseUrl}/send-message/${RoomID}`, messageData)
      .then((res) => {});
  };

  const handleMessageChange = (e) => {
    setCurrentMessage(e.target.value);
    let text = e.target.value;
    if (text.length > 0) {
      setIsText(false);
    } else {
      setIsText(true);
    }
  };

  socket.on("ReceiveVideoCall", (data) => {
    let m = videoCallReq;
    m.push(data.message);
    setVideoCallReq(m);
    setOpenReveive(true);
  });

  const sendVideoCallingRequest = () => {
    let messageData = {
      SenderId: userdata._id,
      RoomId: RoomID,
      ReceiverId: chatUserDetails.user_id,
      message: {
        Message: true,
        image: userdata.image,
        SenderName: userdata.name,
      },
    };
    console.log("SendSocialVideoCall", messageData);
    socket.emit("SendSocialVideoCall", messageData);
  };

  socket.on("RecieveSocialVideoCallAcceptMessage", (data) => {
    setAcceptedRequest(data.message);
  });

  const redirectToCall = () => {
    let messageData = {
      RoomId: RoomID,
      message: true,
    };
    socket.emit("SendSocialVideoCallAcceptMessage", messageData);
    history.push("/eMagz/chat/video-calling");
  };
  return (
    <Grid item xs={8}>
      <div className="mainbox">
        <div className="chathead">
          <Avatar
            alt="Remy Sharp"
            src={chatUserDetails.picture}
            className={classes.large}
          />
          <p className="chatUsername">{chatUserDetails.name}</p>
        </div>
        <div className="line" />
        <div className="chatbody">
          {previousMessage.map((message, index) => {
            if (message.SenderId === userdata._id) {
              return (
                <div className="Susertwo" key={index}>
                  <div>
                    <img
                      className="userPic"
                      style={{ borderRadius: "50%" }}
                      alt="Remy Sharp"
                      src={senderPic}
                    />
                  </div>
                  <div>
                    <p className="usertwotext">{message.Message}</p>
                    <p className="Date_Time">
                      {" "}
                      {moment(message.MessageAt).fromNow()}{" "}
                    </p>
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              );
            } else {
              return (
                <div className="Suserone">
                  <div>
                    <img
                      className="userPic"
                      style={{ borderRadius: "50%" }}
                      alt="Remy Sharp"
                      src={receiverPic}
                    />
                  </div>
                  <div>
                    <p className="useronetext">{message.Message}</p>
                    <p className="Date_Time" style={{ color: "black" }}>
                      {" "}
                      {moment(message.MessageAt).fromNow()}
                    </p>
                  </div>
                  <div ref={messagesEndRef} />
                </div>
              );
            }
          })}
        </div>
        <div className="chatfoot">
          <form
            onSubmit={sendMessage}
            style={{ display: "flex", backgroundColor: "#eadede" }}
          >
            <Input
              onChange={(e) => handleMessageChange(e)}
              value={CurrentMessage}
              style={{
                borderRadius: "30px",
                minHeight: "50px",
                margin: "5px 0px 0px 6px",
                border: "none",
              }}
              placeholder="Type Text Here..."
            />
            <Button disabled={isText} type="submit">
              <SendIcon />
            </Button>
            <Button
              onClick={() => {
                handleClickOpen();
                sendVideoCallingRequest();
              }}
            >
              <VoiceChatIcon />
            </Button>
          </form>
        </div>
      </div>
      {!videoCallReq.length > 0 ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id="alert-dialog-title">
            {"Video calling...."}
          </DialogTitle>
          <DialogContent style={{ display: "flex" }}>
            <div style={{ marginRight: "20px" }}>
              <Avatar
                alt="Remy Sharp"
                src={chatUserDetails.picture}
                className={classes.large}
              />
            </div>
            <div>
              <DialogContentText
                style={{ marginTop: "15px" }}
                id="alert-dialog-description"
              >
                {chatUserDetails.name}
              </DialogContentText>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={openReceive}
          onClose={handleReveiveClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle id="alert-dialog-title">
            {"Incomming video calling..."}
          </DialogTitle>
          <DialogContent style={{ display: "flex" }}>
            <div style={{ marginRight: "20px" }}>
              <Avatar
                alt="Remy Sharp"
                src={videoCallReq[0].image}
                className={classes.large}
              />
            </div>
            <div>
              <DialogContentText
                style={{ marginTop: "15px" }}
                id="alert-dialog-description"
              >
                {videoCallReq[0].SenderName}
              </DialogContentText>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReveiveClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleReveiveClose();
                redirectToCall();
              }}
              color="primary"
            >
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
};

export default ChatDetails;

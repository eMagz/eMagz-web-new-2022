import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import CommentIcon from "@material-ui/icons/Comment";
import FilterListIcon from "@material-ui/icons/FilterList";
import Avatar from "@material-ui/core/Avatar";
import { Input } from "reactstrap";
import { Button } from "@material-ui/core";
import { BaseUrl, ImageUrl } from "../../API";
import axios from "axios";
import socket from "../../socket";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { forEach } from "lodash-es";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

let user = JSON.parse(localStorage.getItem("user"));
let education = JSON.parse(localStorage.getItem("education"));

const Index = (props) => {
  const classes = useStyles();

  const [educationData, setEducationData] = useState(education);
  const [textMessage, setTextMessage] = useState("");
  const [teacherList, setTeacherList] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [isText, setIsText] = useState(true);
  const [prevMessage, setPrevMessage] = useState([]);
  const [RoomID, setRoomID] = useState("");
  const [receiverPic, setReceiverPic] = useState("");
  const [senderPic, setSenderPic] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [pImage, setPImage] = useState("");

  const getTeachersList = () => {
    setIsLoading(true);
    axios
      .get(`${BaseUrl}/viewteacherlist/${education.data.school_id}`)
      .then((res) => {
        setTeacherList(res.data.data.teacherDetails);
        setUsersList(res.data.data.teacherDetails);
        setCurrentTeacher(res.data.data.teacherDetails[0]);
        letsStartChat(
          res.data.data.teacherDetails[0]._id,
          res.data.data.teacherDetails[0]._teacher_image
        );
        setIsLoading(false);
      });
  };

  const principalBasicInfo = (data) => {
    setPImage(data.data.principal_image);
  };

  useEffect(() => {
    if (teacherList !== null) {
      const results = usersList.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
      setTeacherList(results);
    }
  }, [searchTerm]);

  useEffect(() => {
    education = JSON.parse(localStorage.getItem("education"));
    setEducationData(education);
    principalBasicInfo(education);
    getTeachersList();
  }, []);

  const letsStartChat = (CurrentTeacherId, CurrentTeacherImage) => {
    axios
      .get(
        `${BaseUrl}/get-all-message/${education.data._id}/${CurrentTeacherId}`
      )
      .then((res) => {

        if (res.data.data.length > 0) {
          console.log("Alreday created Rommm", res.data.data);
          setPrevMessage(res.data.data[0].message);
          setReceiverPic(res.data.data[0].ReceiverPhoto);
          setSenderPic(res.data.data[0].SenderPhoto);
          socket.emit("JoinRoom", res.data.data[0]._id);
          setRoomID(res.data.data[0]._id);
        } else {
          let roomCreate = {
            SenderId: education.data._id,
            SenderPhoto: education.data.principal_image,
            ReceiverId: CurrentTeacherId,
            ReceiverPhoto: CurrentTeacherImage,
          };
          console.log("roomCreate", roomCreate);
          axios.post(`${BaseUrl}/create-room`, roomCreate).then((res) => {
            setRoomID(res.data.data._id);
            socket.emit("JoinRoom", res.data.data._id);
          });
        }
      });
  };
  const handleMessageChange = (e) => {
    setIsText(false);
    setTextMessage(e.target.value);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    let messageData = {
      SenderId: education.data._id,
      RoomId: RoomID,
      ReceiverId: currentTeacher._id,
      message: {
        Message: textMessage,
        SenderId: education.data._id,
        ReceiverId: currentTeacher._id,
        ReceiverName: currentTeacher.name,
        SenderName: education.data.name,
      },
    };
    let m = [...prevMessage];
    m.push(messageData.message);
    setPrevMessage(m);
    setTextMessage("");
    socket.emit("SendEducationMessage", messageData);
    axios
      .post(`${BaseUrl}/send-message/${RoomID}`, messageData)
      .then((res) => {});
    setIsText(true);
  };

  useEffect(() => {
    if (currentTeacher !== null) {
      letsStartChat(currentTeacher._id);
    }
  }, [currentTeacher]);

  socket.on("RecieveEducationMessage", (data) => {
    if (prevMessage.indexOf(data.message) == -1) {
      let m = prevMessage;
      m.push(data.message);
      setPrevMessage(m);
    }
  });

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    return messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {isLoading ? (
        <div className={classes.root}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className="chat_container">
          <div className="chat_main_container">
            <div className="chatLeft1">
              <div className="chat_listbar">
                <div>
                  <img alt="" className="chat_profile_picture" src={pImage} />
                </div>
                <div style={{ marginLeft: "15px", marginTop: "5px" }}>
                  {user.name}
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <IconButton>
                      <DataUsageIcon />
                    </IconButton>
                  </div>
                  <div>
                    <IconButton>
                      <CommentIcon />
                    </IconButton>
                  </div>
                  <div>
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }} />
            <div className="chat_profilebar">
              <div>
                <img
                  alt="img"
                  className="chat_profile_picture"
                  src={currentTeacher.teacher_image}
                />
              </div>
              <div className="chat_name">{currentTeacher.name}</div>
              <div style={{ flex: 1 }} />
              <div>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="main_text_area">
            <div className="text_area">
              {prevMessage.length > 0 &&
                prevMessage.map((message, index) => {
                  if (message.SenderId === education.data._id) {
                    return (
                      <div className="Susertwo" key={index}>
                        <div>
                          <img
                            className="userPic"
                            style={{ borderRadius: "50%" }}
                            alt="Just"
                            src={receiverPic}
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
                            src={senderPic}
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
                  value={textMessage}
                  style={{
                    borderRadius: "30px",
                    minHeight: "50px",
                    margin: "5px 0px 0px 6px",
                    border: "none",
                  }}
                  placeholder="Type Text Here..."
                />
                <Button disabled={isText} type="submit">
                  Send
                </Button>
              </form>
            </div>
          </div>
          <div className="chat_search">
            <div className="chat_search_bar">
              <FontAwesomeIcon className="search_icon" icon={faSearch} />
              <form>
                <input
                  autoComplete="off"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="chat_header_input"
                  placeholder="search teachers..."
                />
              </form>
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </div>
          </div>
          <div className="main_chat_list">
            {teacherList.map((data) => {
              return (
                <div
                  className="list_section"
                  onClick={() => setCurrentTeacher(data)}
                >
                  <div className="prof_image_div">
                    <img
                      alt=""
                      className="chat_profile_picture"
                      src={data.teacher_image}
                    />
                  </div>
                  <div className="maintext_head">
                    <div className="name_text">
                      {data.name}
                      <div className="msg">Recent messages</div>
                    </div>
                    <div className="time">2:30</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Index;

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

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

let education = JSON.parse(localStorage.getItem("education"));
let user = JSON.parse(localStorage.getItem("user"));
const Index = () => {
  const classes = useStyles();
  const [textMessage, setTextMessage] = useState("");
  const [teacherList, setTeacherList] = useState(null);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [isText, setIsText] = useState(true);
  const [prevMessage, setPrevMessage] = useState([]);
  const [RoomID, setRoomID] = useState("");
  const [receiverPic, setReceiverPic] = useState("");
  const [senderPic, setSenderPic] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [educationAccess, setEducationAccess] = useState(education);
  const [teacherAndStudentList, setTeacherAndStudentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersList, setUsersList] = useState([]);

  const getTeachersAndStudentList = (id) => {
    setIsLoading(true);
    axios
      .get(`${BaseUrl}/teacher-chat-list/${education.data.school_id}`)
      .then((res) => {
        const temp = [];
        let td = res.data.data.teacherslist;
        td.forEach((data, index) => {
          data.pic = data.teacher_image;
          temp.push(data);
        });
        let sd = res.data.data.studentlist;
        sd.forEach((data, index) => {
          data.pic = data.student_image;
          temp.push(data);
        });
        let exceptUser = temp.filter((data) => data.user_id !== user._id);
        console.log("User and Teacher", exceptUser);
        setCurrentTeacher(exceptUser[0]);
        setUsersList(exceptUser);
        letsStartChat(exceptUser[0]._id, exceptUser[0].pic);
        setTeacherList(exceptUser);
        setIsLoading(false);
        setTeacherAndStudentList(exceptUser);
      });
  };

  useEffect(() => {
    let education = JSON.parse(localStorage.getItem("education"));
    setEducationAccess(education);
    getTeachersAndStudentList();
    let user = JSON.parse(localStorage.getItem("user"));
    if (teacherList !== null) {
      const results = usersList.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
      setTeacherList(results);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (currentTeacher !== null) {
      letsStartChat(currentTeacher.user_id);
    }
  }, [currentTeacher]);

  const letsStartChat = (currentTeacherID, currentTeacherPic) => {
    axios
      .get(
        `${BaseUrl}/get-all-message/${educationAccess.data._id}/${currentTeacherID}`
      )
      .then((res) => {
        if (res.data.data.length > 0) {
          console.log("roomCreate", res.data.data[0]);
          setPrevMessage(res.data.data[0].message);
          setReceiverPic(res.data.data[0].ReceiverPhoto);
          setSenderPic(res.data.data[0].SenderPhoto);
          socket.emit("JoinRoom", res.data.data[0]._id);
          setRoomID(res.data.data[0]._id);
        } else {
          let roomCreate = {
            SenderId: educationAccess.data._id,
            SenderPhoto: educationAccess.data.student_image,
            ReceiverId: currentTeacherID,
            ReceiverPhoto: currentTeacherPic,
          };
          axios.post(`${BaseUrl}/create-room`, roomCreate).then((res) => {
            setRoomID(res.data.data._id);
            socket.emit("JoinRoom", res.data.data._id);
          });
        }
      });
  };
  const handleMessageChange = (e) => {
    setTextMessage(e.target.value);
    let text = e.target.value;
    if (text.length > 0) {
      setIsText(false);
    } else {
      setIsText(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    let messageData = {
      SenderId: educationAccess.data._id,
      RoomId: RoomID,
      ReceiverId: currentTeacher._id,
      message: {
        Message: textMessage,
        SenderId: educationAccess.data._id,
        SenderName: educationAccess.data.name,
        ReceiverId: currentTeacher._id,
        ReceiverName: currentTeacher.name,
      },
    };
    let m = [...prevMessage];
    m.push(messageData.message);
    setPrevMessage(m);
    setTextMessage("");
    console.log("Sender", messageData);
    socket.emit("SendEducationMessage", messageData);
    axios
      .post(`${BaseUrl}/send-message/${RoomID}`, messageData)
      .then((res) => {});
  };

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
  console.log("Current Teacher", currentTeacher);
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
                  <img
                    alt=""
                    className="chat_profile_picture"
                    src={education.data.student_image}
                  />
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
                  className="chat_profile_picture"
                  src={currentTeacher.pic}
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
                  if (message.SenderId === educationAccess.data._id) {
                    return (
                      <div className="Susertwo" key={index}>
                        <div>
                          <img
                            src={receiverPic}
                            className="userPic"
                            style={{ borderRadius: "50%" }}
                            alt={user.name}
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
                            alt="Receiver"
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
                  placeholder="Search teachers..."
                />
              </form>
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </div>
          </div>
          <div className="main_chat_list">
            {teacherList.length > 0 &&
              teacherList.map((data) => {
                return (
                  <div
                    className="list_section"
                    onClick={() => setCurrentTeacher(data)}
                  >
                    <div className="prof_image_div">
                      <img className="chat_profile_picture" src={data.pic} />
                    </div>
                    <div className="maintext_head">
                      <div className="name_text">
                        {data.name}
                        <div className="msg">recent messages</div>
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

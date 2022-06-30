import React, { useState, useEffect } from "react";
import Backdrop from "../Backdrop";
import Sidebar from "../Sidebar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import axios from "axios";
import ViewIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";
import { BaseUrl } from "../../API";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import "./index.css";
import Dictionary from "../../Dictionary";
import { useHistory } from "react-router-dom";
// import Translate from "../Language_Translation"
let temp = [];

const Header = ({ role }) => {
  const history = useHistory();
  const changePage = () => {
    console.log("Role", role);
    if (role === "principal") {
      history.push("/educations/principal/chat");
    } else if (role === "teacher") {
      history.push("/educations/teachers/chat");
    } else {
      history.push("/educations/student/chat");
    }
  };
  const [opendrawer, setOpendrawer] = useState(false);
  const [educationAccess, setEducationAccess] = useState({});
  const [searchdata, setSearchdata] = useState([]);
  const [searchtext, setSearchtext] = useState("");
  const [teacherList, setTeacherList] = useState([]);
  const [isRender, setIsRender] = useState(false);

  const handleSchoolPage = (data) => {
    console.log("data", data);
    history.push("/educations/home-page/", data);
  };

  const getTeachersList = (id) => {
    axios.get(`${BaseUrl}/viewteacherlist/${id}`).then((res) => {
      console.log("teacherList Header", res.data.data);
      setTeacherList(res.data.data.teacherDetails);
    });
  };

  function searchSchool(e) {
    setSearchtext(e.target.value);
    getsearchdata(e.target.value);
  }

  const getsearchdata = (searchtext) => {
    axios.get(`${BaseUrl}/searchschool/${searchtext}`).then((res) => {
      setSearchdata(res.data.data);
    });
  };

  useEffect(() => {
    const education = JSON.parse(localStorage.getItem("education"));
    if (education != null && education.role == "principal") {
      setEducationAccess(education);
      getTeachersList(education.data.school_id);
    } else if (education != null && education.role == "teacher") {
      // getTeachersAndStudentList(education.data.school_id)
    }
  }, []);
  const onClickopen = () => {
    setOpendrawer((prevStat) => {
      console.log(prevStat);
      return !prevStat;
    });
  };
  const onClickclose = () => {
    setOpendrawer(false);
  };
  let backEducationDrop;
  if (opendrawer) {
    backEducationDrop = <Backdrop close={onClickclose} />;
  }
  const handleClick = () => setIsRender(!isRender);
  function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }
  return (
    <>
      <div>
        {isRender && <Dictionary status="true" />}
        <div className="edu_appbar">
          <Sidebar close={onClickclose} open={opendrawer} />
          {backEducationDrop}
          <div style={{ marginTop: "10px", marginRight: "5rem" }}>
            <h5>{capitalize(role)}</h5>
          </div>
          <div className="mainpage_search" style={{ width: "auto" }}>
            <div className="mainpage_transition">
              <input
                class="form-control"
                value={searchtext}
                onChange={(e) => searchSchool(e)}
                style={{
                  width: "400px",
                  display: "inline",
                  borderRadius: "50px",
                  outline: "none",
                }}
                type="text"
                name="name"
                placeholder="search here..."
              />
              <IconButton
                onClick={() => getsearchdata(searchtext)}
                style={{ transform: "translateX(-50px)" }}
              >
                <SearchIcon />
              </IconButton>
            </div>
          </div>
          <div style={{ marginRight: "10px" }}>
            <IconButton onClick={() => handleClick()}>
              <MenuBookIcon style={{ color: "black" }} />
            </IconButton>
            <IconButton onClick={changePage} style={{ marginRight: "10px" }}>
              <ChatBubbleIcon style={{ color: "black" }} />
            </IconButton>
            <IconButton>
              <NotificationsIcon style={{ color: "black" }} />
            </IconButton>
            <IconButton onClick={onClickopen}>
              <MenuIcon style={{ color: "black" }} />
            </IconButton>
          </div>
        </div>
      </div>
      {searchdata.length > 0 ? (
        <div className="mainsection_div">
          <div className="school_list">
            <table style={{ width: "100%" }}>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Medium</th>
                <th>Board</th>
                <th>Contact No</th>
                <th>Action</th>
              </tr>
              {searchdata.map((school) => {
                return (
                  <tr>
                    <td>
                      <img
                        style={{ width: 80, height: 80 }}
                        src={school.logoimage}
                      />
                    </td>
                    <td>{school.name}</td>
                    <td>{school.medium}</td>
                    <td>{school.board}</td>
                    <td>{school.reg_no + " " + school.phonenumber}</td>
                    <td>
                      <div onClick={() => handleSchoolPage(school)}>
                        {<ViewIcon />}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Header;

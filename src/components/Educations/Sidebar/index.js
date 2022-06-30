import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./index.css";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import swal from "sweetalert";

let user = 0;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const EduSideDrawer = (props) => {
  const classes = useStyles();
  const [close, setClose] = useState(false);
  const history = useHistory();
  let edudrawerClasses = "side-edudrawer";

  if (props.open) {
    edudrawerClasses = "side-edudrawer open";
  }

  const [educationAccess, setEducationAccess] = useState({});
  const [school, setSchool] = useState({});

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    const education = JSON.parse(localStorage.getItem("education"));
    setEducationAccess(education);
  }, []);

  const handleClick = () => {
    setClose(!close);
  };
  const handleLogout = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("education");
        history.push("/");
      } else {
        swal("Your meeting will continue!");
      }
    });
  };
  console.log("User.Password", user.parent_password !== null);
  return (
    <>
      {educationAccess.role !== undefined ? (
        <div className={edudrawerClasses}>
          {educationAccess.role === "student" ? (
            <div className="heading">
              <div style={{ margin: "10px 0px 0px 10px" }}>
                <Avatar
                  alt="Remy Sharp"
                  src={educationAccess.data.student_image}
                />
              </div>
              <div>
                <p className="headingName">{educationAccess.data.name}</p>
              </div>
            </div>
          ) : educationAccess.role === "teacher" ? (
            <div className="heading">
              <div style={{ margin: "10px 0px 0px 10px" }}>
                <Avatar
                  alt="Remy Sharp"
                  src={educationAccess.data.teacher_image}
                />
              </div>
              <div
                style={{
                  paddingRight: "10px",
                  fontWeight: "bold",
                  paddingTop: "15px",
                }}
              >
                <p className="headingName">{educationAccess.data.name} </p>
              </div>
            </div>
          ) : educationAccess.role === "principal" ? (
            <div className="heading">
              <div style={{ margin: "10px 0px 0px 10px" }}>
                <img
                  className="chat_profile_picture"
                  alt="Remy Sharp"
                  src={educationAccess.data.principal_image}
                />
              </div>
              <div>
                <p className="headingName">{educationAccess.data.name}</p>
              </div>
            </div>
          ) : (
            <div>Nothing Exists...</div>
          )}
          <hr />
          <div className="main_list">
            {educationAccess.role === "student" &&
            user.parent_password === null ? (
              <>
                <List component="nav" aria-label="main mailbox folders">
                  <Link to="/educations/student/profile">
                    <ListItem button>
                      <ListItemText primary="My profile" />
                    </ListItem>
                  </Link>
                  <Link to="/educations">
                    <ListItem button>
                      <ListItemText primary="Home" />
                    </ListItem>
                  </Link>
                  <Link to="/educations">
                    <ListItem button>
                      <ListItemText primary="My profile" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/notice-board">
                    <ListItem button>
                      <ListItemText primary="Notice Board" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/home-works">
                    <ListItem button>
                      <ListItemText primary="Home Works" />
                    </ListItem>
                    <Link to="/educations/student/remarks">
                      <ListItem button>
                        <ListItemText primary="Remarks" />
                      </ListItem>
                    </Link>
                  </Link>
                  <Link to="/educations/declaration">
                    <ListItem button>
                      <ListItemText primary="Declaration" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/class-diary">
                    <ListItem button>
                      <ListItemText primary="Class Diary" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/take-a-test">
                    <ListItem button>
                      <ListItemText primary="Test Exam" />
                    </ListItem>
                  </Link>

                  <Link to="/educations/attendance">
                    <ListItem button>
                      <ListItemText primary="Attendance" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/apply-a-leave">
                    <ListItem button>
                      <ListItemText primary="Apply for Leave" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/timetable">
                    <ListItem button>
                      <ListItemText primary="Time Table" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/academic-reports">
                    <ListItem button>
                      <ListItemText primary="Academic Report" />
                    </ListItem>
                  </Link>

                  <Link to="/educations/fees">
                    <ListItem button>
                      <ListItemText primary="Fees" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/test-details">
                    <ListItem button>
                      <ListItemText primary="Give a Test" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/bus-tracking">
                    <ListItem button>
                      <ListItemText primary="Bus Tracking" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/feedback">
                    <ListItem button>
                      <ListItemText primary="Feedback" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/contact-us">
                    <ListItem button>
                      <ListItemText primary="Contact Us" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/principal/home-page">
                    <ListItem button>
                      <ListItemText primary="About Us" />
                    </ListItem>
                  </Link>
                  <ListItem button onClick={() => handleLogout()}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </>
            ) : educationAccess.role === "student" &&
              user.parent_password !== null ? (
              <>
                <List component="nav" aria-label="main mailbox folders">
                  <Link to="/educations/student/profile">
                    <ListItem button>
                      <ListItemText primary="My profile" />
                    </ListItem>
                  </Link>
                  <Link to="/educations">
                    <ListItem button>
                      <ListItemText primary="Home" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/notice-board">
                    <ListItem button>
                      <ListItemText primary="Notice Board" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/home-works">
                    <ListItem button>
                      <ListItemText primary="Home Works" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/student/remarks">
                    <ListItem button>
                      <ListItemText primary="Remarks" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/class-diary">
                    <ListItem button>
                      <ListItemText primary="Class Diary" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/take-a-test">
                    <ListItem button>
                      <ListItemText primary="Test Exam" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/declaration">
                    <ListItem button>
                      <ListItemText primary="Declaration" />
                    </ListItem>
                  </Link>

                  <Link to="/educations/attendance">
                    <ListItem button>
                      <ListItemText primary="Attendance" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/apply-a-leave">
                    <ListItem button>
                      <ListItemText primary="Apply for Leave" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/timetable">
                    <ListItem button>
                      <ListItemText primary="Time Table" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/academic-reports">
                    <ListItem button>
                      <ListItemText primary="Academic Report" />
                    </ListItem>
                  </Link>

                  <Link to="/educations/fees">
                    <ListItem button>
                      <ListItemText primary="Fees" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/bus-tracking">
                    <ListItem button>
                      <ListItemText primary="Bus Tracking" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/feedback">
                    <ListItem button>
                      <ListItemText primary="Feedback" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/contact-us">
                    <ListItem button>
                      <ListItemText primary="Contact Us" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/principal/home-page">
                    <ListItem button>
                      <ListItemText primary="About Us" />
                    </ListItem>
                  </Link>
                  <ListItem button onClick={() => handleLogout()}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </>
            ) : educationAccess.role === "teacher" ? (
              <>
                <List component="nav" aria-label="main mailbox folders">
                  <Link to="/educations/teacher/profile">
                    <ListItem button>
                      <ListItemText primary="My profile" />
                    </ListItem>
                  </Link>
                  <Link to="/educations">
                    <ListItem button>
                      <ListItemText primary="Home" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/teacher/noticeboard">
                    <ListItem button>
                      <ListItemText primary="Notice Board" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/teacher/home-works">
                    <ListItem button>
                      <ListItemText primary="Home Works" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/remarks">
                    <ListItem button>
                      <ListItemText primary="Remarks" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/teacher/class-diary">
                    <ListItem button>
                      <ListItemText primary="Class Diary" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/declaration">
                    <ListItem button>
                      <ListItemText primary="Declaration" />
                    </ListItem>
                  </Link>

                  <Link to="/educations/teacher/attendance">
                    <ListItem button>
                      <ListItemText primary="Attendance" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/teacher/apply-a-leave">
                    <ListItem button>
                      <ListItemText primary="Apply for Leave" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/teacher/timetable">
                    <ListItem button>
                      <ListItemText primary="Time Table" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/teacher/academic-reports">
                    <ListItem button>
                      <ListItemText primary="Academic Report" />
                    </ListItem>
                  </Link>

                  <Link to="/educations/teacher/test-list">
                    <ListItem button>
                      <ListItemText primary="Exam Section" />
                    </ListItem>
                  </Link>
                  <Link>
                    <ListItem button>
                      <ListItemText primary="Bus Tracking" />
                    </ListItem>
                  </Link>

                  <Link to="/educations/teacher/feedback">
                    <ListItem button>
                      <ListItemText primary="Feedback" />
                    </ListItem>
                  </Link>

                  <Link to="/educations/teacher/contact-us">
                    <ListItem button>
                      <ListItemText primary="Contact Us" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/principal/home-page">
                    <ListItem button>
                      <ListItemText primary="About Us" />
                    </ListItem>
                  </Link>
                  <ListItem button onClick={() => handleLogout()}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </>
            ) : educationAccess.role === "principal" ? (
              <>
                <List component="nav" aria-label="main mailbox folders">
                  <Link to="/educations/principal/profile">
                    <ListItem button>
                      <ListItemText primary="My profile" />
                    </ListItem>
                  </Link>

                  <Link to="/educations">
                    <ListItem button>
                      <ListItemText primary="Home" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/notice-board">
                    <ListItem button>
                      <ListItemText primary="Notice Board" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/home-works">
                    <ListItem button>
                      <ListItemText primary="Home Works" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/remarks">
                    <ListItem button>
                      <ListItemText primary="Remarks" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/class-diary">
                    <ListItem button>
                      <ListItemText primary="Class Diary" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/declaration">
                    <ListItem button>
                      <ListItemText primary="Declaration" />
                    </ListItem>
                  </Link>

                  <Link to="/education/principal/attendance">
                    <ListItem button>
                      <ListItemText primary="Attendance" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/apply-a-leave">
                    <ListItem button>
                      <ListItemText primary="Apply for Leave" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/principal/home-page">
                    <ListItem button>
                      <ListItemText primary="Time Table" />
                    </ListItem>
                  </Link>
                  <ListItem button onClick={handleClick}>
                    <ListItemText primary="School Settings" />
                    {close ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={close} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <Link to="/educations/principal/school-settings/add-class">
                        <ListItem button className={classes.nested}>
                          <ListItemText primary="Classes" />
                        </ListItem>
                      </Link>
                      <Link to="/educations/principal/school-settings/add-section">
                        <ListItem button className={classes.nested}>
                          <ListItemText primary="Section" />
                        </ListItem>
                      </Link>
                      <Link to="/educations/teacher/test-list">
                        <ListItem button>
                          <ListItemText primary="Exam Section" />
                        </ListItem>
                      </Link>
                      <Link to="/educations/principal/school-settings/add-subject">
                        <ListItem button className={classes.nested}>
                          <ListItemText primary="Subject" />
                        </ListItem>
                      </Link>
                    </List>
                  </Collapse>
                  <ListItem button>
                    <ListItemText primary="Academic Report" />
                  </ListItem>
                  <Link to="/educations/principal/deposit-fees">
                    <ListItem button>
                      <ListItemText primary="Deposit Fees" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/principal/add-fees">
                    <ListItem button>
                      <ListItemText primary="Add Fees" />
                    </ListItem>
                  </Link>
                  <Link>
                    <ListItem button>
                      <ListItemText primary="Bus Tracking" />
                    </ListItem>
                  </Link>

                  <Link to="/educations/feedback">
                    <ListItem button>
                      <ListItemText primary="Feedback" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/principal/home-page">
                    <ListItem button>
                      <ListItemText primary="About Us" />
                    </ListItem>
                  </Link>

                  <ListItem button>
                    <ListItemText primary="Contact Us" />
                  </ListItem>
                  <ListItem button onClick={() => handleLogout()}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </>
            ) : educationAccess.role === "admin" ? (
              <>
                <List component="nav" aria-label="main mailbox folders">
                  <Link to="/educations/admin/add-school">
                    <ListItem button>
                      <ListItemText primary="Add School" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/notice-board">
                    <ListItem button>
                      <ListItemText primary="Notice Board" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/home-works">
                    <ListItem button>
                      <ListItemText primary="Home Works" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/class-diary">
                    <ListItem button>
                      <ListItemText primary="Class Diary" />
                    </ListItem>
                  </Link>

                  <Link to="/educations/attendance">
                    <ListItem button>
                      <ListItemText primary="Attendance" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/apply-a-leave">
                    <ListItem button>
                      <ListItemText primary="Apply for Leave" />
                    </ListItem>
                  </Link>
                  <Link to="/educations/timetable">
                    <ListItem button>
                      <ListItemText primary="Time Table" />
                    </ListItem>
                  </Link>

                  <ListItem button>
                    <ListItemText primary="Academic Report" />
                  </ListItem>
                  <Link to="/educations/fees">
                    <ListItem button>
                      <ListItemText primary="Fees" />
                    </ListItem>
                  </Link>
                  <Link>
                    <ListItem button>
                      <ListItemText primary="Bus Tracking" />
                    </ListItem>
                  </Link>

                  <Link to="/educations/feedback">
                    <ListItem button>
                      <ListItemText primary="Feedback" />
                    </ListItem>
                  </Link>

                  <ListItem button>
                    <ListItemText primary="Contact Us" />
                  </ListItem>
                  <Link to="/educations">
                    <ListItem button>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </Link>
                </List>
              </>
            ) : (
              history.push("/education/register")
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EduSideDrawer;

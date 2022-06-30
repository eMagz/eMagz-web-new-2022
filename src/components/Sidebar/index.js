import React from "react";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import "./index.css";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import LockIcon from "@material-ui/icons/Lock";
import DescriptionIcon from "@material-ui/icons/Description";
import SecurityIcon from "@material-ui/icons/Security";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

let userDetails = JSON.parse(localStorage.getItem("user"));

const Sidebar = (props) => {
  const user = useSelector((state) => state.loginReducer.userDetails);
  if (Object.keys(user).length !== 0) {
    console.log(" From Redux", user);
    userDetails = user;
  }

  console.log("From LocalStorage", userDetails);

  const logout = () => {
    localStorage.clear();
    window.location.assign("/login");
  };
  let drawerClasses = "side-drawer";
  if (props.open) {
    drawerClasses = "side-drawer open";
  }
  return (
    <div className={drawerClasses}>
      <div className="heading">
        <div style={{ margin: "10px 0px 0px 10px" }}>
          <Avatar alt="Remy Sharp" src={userDetails.image} />
        </div>
        <div style={{ margin: "10px 0px 0px 10px" }}>
          <h5 style={{ color: "black" }}>{userDetails.name}</h5>
        </div>
        <div style={{ flex: 1 }} />
        <div>
          <IconButton
            style={{ float: "right", outline: "none" }}
            onClick={props.close}
          >
            <CloseRoundedIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
      <List component="nav" aria-label="main mailbox folders">
        <Link to="/dashboard">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/dashboard/profile">
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
        </Link>
        <Link to="/dashboard/change-password">
          <ListItem button>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItem>
        </Link>
        <Link to="/dashboard/term-conditions">
          <ListItem button>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Terms & Conditions" />
          </ListItem>
        </Link>
        <Link to="/dashboard/privacy-policy">
          <ListItem button>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Privacy Policy" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem onClick={logout} button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <div className="footer">Powered by eMagz</div>
    </div>
  );
};
export default Sidebar;

import React, { useState, useEffect, useRef } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import "./index.css";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Header from "../Header";
import axios from "axios";
import { BaseUrl } from "../API";
import swal from "sweetalert";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function MyProfile() {
  const fileProfile = useRef("");
  const [user, setUser] = useState({});
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    setEmail(user.email == null ? "" : user.email);
    setName(user.name == null ? "" : user.name);
    setLocation(user.location == null ? "" : user.location);
  }, []);

  const onUploadProfile = () => {
    fileProfile.current.click();
  };
  const uploadProfile = (event) => {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append(
        "userimage",
        event.target.files[0],
        event.target.files[0].name
      );
      axios
        .post(`${BaseUrl}/user-profile-image/${user._id}`, formData)
        .then((res) => {
          if (res.data.status === true) {
            setUser(res.data.data);
            localStorage.setItem("user", JSON.stringify(res.data.data));
          }
        });
    }
  };
  const onUpdateProfile = () => {
    axios
      .post(`${BaseUrl}/edit-profile/${user._id}`, { name, location })
      .then((res) => {
        if (res.data.status === true) {
          swal("Profile updated successfully.");
          let u = user;
          u.name = name;
          u.location = location;
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u));
        }
      });
  };

  const classes = useStyles();

  return (
    <>
      <Header title={"Profile"} />
      <div className="container">
        <div className="row rowView">
          <div className="column">
            <div className={classes.root}>
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <>
                    <input
                      type="file"
                      id="file"
                      onChange={uploadProfile}
                      ref={fileProfile}
                      style={{ display: "none" }}
                    />
                    <PhotoCamera
                      onClick={onUploadProfile}
                      style={{ transform: "translateX(90px)" }}
                    />
                  </>
                }
              >
                <Avatar
                  style={{
                    transform: "translateX(100px)",
                    height: "120px",
                    width: "120px",
                  }}
                  alt={user.name}
                  src={user.image}
                />
              </Badge>
            </div>
            <br />
            <br />
          </div>
          <div className="column">
            <div className="form2">
              <Form>
                <FormGroup>
                  <Input
                    readOnly
                    type="text"
                    value={email}
                    placeholder="Enter email"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    placeholder="Enter Name"
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    value={location}
                    placeholder="Enter Address"
                  />
                </FormGroup>
                <Button
                  className="ubtn"
                  onClick={onUpdateProfile}
                  variant="contained"
                  size="large"
                >
                  UPDATE
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import "./testdetails.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TestCards from "./testcards";
import Header from "../../Header";
import axios from "axios";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import { BaseUrl } from "../../../API";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f1f7f7",
    height: "83vh",
  },
}));

const TestDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const testdata = JSON.parse(localStorage.getItem("education"));
  const [resdata, setResdata] = useState([]);
  const history = useHistory();
  const [state, setState] = useState({
    checkedA: true,
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showTest = () => {
    axios
      .get(`${BaseUrl}/view-test/${testdata.data.classes_id}`)
      .then((res) => {
        console.log("zz", res.data);
        setResdata(res.data.data);
      });
  };

  useEffect(() => {
    showTest();
  }, []);

  const changeMainpage = (test) => {
    const body = {
      TestId: resdata[0]._id,
      user_id: testdata.data.user_id,
      school_id: testdata.data.school_id,
    };

    axios
      .post(`${BaseUrl}/testattend`, body)
      .then((res) => console.log("mom", res.data));

    console.log("bb", test);
    history.push("/educations/take-a-test/online-test", test._id);
  };

  return (
    <>
      <div>
        <Header />
      </div>

      <div className="testdetails_container">
        <div className="testdetails_tabs">
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange}>
                <Tab label="Today" {...a11yProps(0)} />
                <Tab label="Upcoming" {...a11yProps(1)} />
                <Tab label="Past Days" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <div className="tab_container">
                <div>
                  <div className="testCard_container">
                    {resdata.map((test) => {
                      return (
                        <div className="testcards">
                          <div className="card_top">
                            <FormGroup row>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={state.checkedA}
                                    onChange={handleChange}
                                    name="checkedA"
                                  />
                                }
                              />
                            </FormGroup>
                            <div
                              style={{
                                fontWeight: "bold",
                                margin: "10px 2px 0px 0px",
                                fontSize: "1rem",
                              }}
                            >
                              {test.testtype}
                            </div>
                            <div style={{ flex: 1 }} />
                            <div style={{ margin: "8px 8px 0px 0px" }}>
                              <button className="cardbtn cardbtn1">
                                {test.subject}
                              </button>
                            </div>
                          </div>
                          <div className="card_content">
                            <div style={{ fontSize: "0.8rem", color: "gray" }}>
                              Duration
                              <div
                                style={{ fontSize: "0.7rem", color: "black" }}
                              >
                                {test.duration}
                              </div>
                            </div>
                            <div style={{ flex: 1 }} />
                            <div style={{ fontSize: "0.8rem", color: "gray" }}>
                              Marks
                              <div
                                style={{ fontSize: "0.7rem", color: "black" }}
                              >
                                {test.marks}
                              </div>
                            </div>
                          </div>

                          <div className="bottom_line">
                            Cycle: April | Session: 2018-19
                          </div>
                          <div className="taketest_buttn">
                            <button
                              onClick={() => changeMainpage(test)}
                              className="cardbtn cardbtn1"
                            >
                              Take Test
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Upcoming
            </TabPanel>
            <TabPanel value={value} index={2}>
              Past Days
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestDetails;

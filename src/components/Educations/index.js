import React, { useState, useEffect } from "react";
import "./index.css";
import Header from "./Header";
import { Button } from "reactstrap";
import axios from "axios";
import { BaseUrl } from "../API";
import { Link, useHistory } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import DatePicker from "react-datepicker";
import moment from "moment";
import Loader from "../Loader/Loader";

const Education = () => {
  const [educationAccess, setEducationAccess] = useState({});
  const [upcommingMettings, setUpcommingMettings] = useState([]);
  const [mettings, setMettings] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [date, setDate] = useState(new Date());
  const [allNewsData, setAllNewsData] = useState([]);
  const [feedLoader, setFeedloader] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchInputResult, setSearchInputResult] = useState([]);
  const [searchNewText, setSearchNewText] = useState("");
  const history = useHistory();

  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

  const getAllNewFeed = (info) => {
    if (info.role === "student") {
      setFeedloader(true);
      const school = axios.get(
        `${BaseUrl}/school-news-feeds/${info.data.school_id}`
      );
      const allStudentsNews = axios.get(
        `${BaseUrl}/all-school-students-news-feeds/${info.data.school_id}`
      );
      const onlyClassSection = axios.get(
        `${BaseUrl}/student-news-feeds/${info.data.classes_id}/${info.data.section_id}`
      );
      const publicNews = axios.get(
        `${BaseUrl}/public-news-feeds/${info.data.school_id}`
      );
      axios
        .all([school, allStudentsNews, onlyClassSection, publicNews])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responesThree = responses[2];
            const responesFour = responses[3];
            console.log(
              "NEWS RESULT",
              responseOne,
              responseTwo,
              responesThree,
              responesFour
            );
            let temp = [
              ...responseTwo.data.data,
              ...responseOne.data.data,
              ...responesThree.data.data,
              ...responesFour.data.data,
            ];
            setAllNewsData(temp);
            setSearchResult(temp);
            setSearchInputResult(temp);
            setFeedloader(false);
            console.log("Student", temp);
          })
        )
        .catch((errors) => {
          console.log(errors);
        });
    } else if (info.role === "teacher") {
      const school = axios.get(
        `${BaseUrl}/school-news-feeds/${info.data.school_id}`
      );
      const allTeachersNews = axios.get(
        `${BaseUrl}/all-school-teachers-news-feeds/${info.data.school_id}`
      );
      const onlyClassSection = axios.get(
        `${BaseUrl}/teacher-news-feeds/${info.data.classes_id}/${info.data.section_id}`
      );
      const publicNews = axios.get(
        `${BaseUrl}/public-news-feeds/${info.data.school_id}`
      );
      axios
        .all([school, allTeachersNews, onlyClassSection, publicNews])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responesThree = responses[2];
            const responesFour = responses[3];
            console.log(
              "NEWS RESULT",
              responseOne,
              responseTwo,
              responesThree,
              responesFour
            );
            let temp = [
              ...responseTwo.data.data,
              ...responseOne.data.data,
              ...responesThree.data.data,
              ...responesFour.data.data,
            ];
            setAllNewsData(temp);
            setSearchResult(temp);
            setFeedloader(false);
            console.log("Teacher", temp);
          })
        )
        .catch((errors) => {
          // react on errors.
        });
    } else {
      const school = axios.get(
        `${BaseUrl}/school-news-feeds/${info.data.school_id}`
      );
      const allTeachersNews = axios.get(
        `${BaseUrl}/all-school-teachers-news-feeds/${info.data.school_id}`
      );
      const publicNews = axios.get(
        `${BaseUrl}/public-news-feeds/${info.data.school_id}`
      );
      axios
        .all([school, allTeachersNews, publicNews])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responesThree = responses[2];
            console.log("NEWS RESULT", responseOne, responseTwo, responesThree);
            let temp = [
              ...responseTwo.data.data,
              ...responseOne.data.data,
              ...responesThree.data.data,
            ];

            const searchedData = temp.filter((data) => {
              return data.role.toLowerCase() !== info.role.toLowerCase();
            });
            setAllNewsData(searchedData);
            setSearchResult(searchedData);
            setFeedloader(false);
            console.log("Else", searchedData);
          })
        )

        .catch((errors) => {
          // react on errors.
        });
    }
  };

  const getUpcommingClasses = (education) => {
    axios
      .get(
        `${BaseUrl}/class-section-wise-live-class/${education.data.classes_id}/${education.data.section_id}`
      )
      .then((res) => {
        setUpcommingMettings(res.data.data);
      });
  };

  const getAllHolidays = (id) => {
    axios.get(`${BaseUrl}/school-holidays-list/${id}`).then((res) => {
      setHolidays(res.data.data);
    });
  };

  const getMeetingList = (education) => {
    axios
      .get(`${BaseUrl}/view-live-class-list/${education.data.user_id}`)
      .then((res) => {
        setMettings(res.data.data);
      });
  };

  useEffect(() => {
    const education = JSON.parse(localStorage.getItem("education"));
    getAllNewFeed(education);
    setEducationAccess(education);
    getUpcommingClasses(education);
    getMeetingList(education);
    getAllHolidays(education.data.school_id);
  }, []);

  const handleFeedSearch = (e) => {
    const searchedData = searchResult.filter((data) => {
      return data.role.toLowerCase() === e.target.value.toLowerCase();
    });
    setAllNewsData(searchedData);
  };

  const handleNewSearch = (e) => {
    setSearchNewText(e.target.value);
    console.log("Input Search", e);
    const reault = searchInputResult.filter((data) =>
      data.description.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setAllNewsData(reault);

    console.log("TOp Input Search", reault);
  };
  return (
    <>
      <Header role={educationAccess.role} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="newsContainer">
          <div className="newFilter">
            <input
              className="inputSearch"
              value={searchNewText}
              onChange={(e) => handleNewSearch(e)}
              placeholder="Search college, coaching center..."
            />
            <div className="searchIcon">
              <i
                style={{ transform: "translateX(-30px)" }}
                class="fas fa-search"
              ></i>
            </div>
            <div className="SearchBy">
              <h5>Search By</h5>

              <select
                className="select-Option"
                aria-label=".form-select-lg example"
                onChange={(e) => handleFeedSearch(e)}
              >
                <option>School</option>
                {educationAccess.role !== "teacher" && <option>Teacher</option>}
                {educationAccess.role !== "student" && <option>Student</option>}

                <option>Coaching</option>
                {educationAccess.role !== "principal" && (
                  <option>Principal</option>
                )}
              </select>

              <div>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  onCalendarClose={handleCalendarClose}
                  onCalendarOpen={handleCalendarOpen}
                />
              </div>
            </div>
            <hr />
          </div>
          <div className="resultcontainer">
            {allNewsData.length > 0 ? (
              allNewsData.map((data, id) => {
                return feedLoader ? (
                  <Loader />
                ) : (
                  <>
                    <div className="my-result">
                      <p className="samewidth">{data.name}</p>
                      <p className="samewidth">{data.role}</p>
                      <p className="titlewidth">{data.title}</p>
                      <p className="decwidth" style={{ cursor: "pointer" }}>
                        {data.description}
                      </p>
                      <p className="samewidth">
                        <i class="fas fa-calendar-week"></i>{" "}
                        {moment(data.date).format("MMM Do YY")}
                      </p>
                      <p
                        className="samewidth"
                        onClick={() => history.push(`${data.newsfeedfile}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <i class="far fa-eye"></i>
                      </p>
                    </div>
                    <hr />
                  </>
                );
              })
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{ fontSize: "18px", textDecoration: "capitalization" }}
                >
                  Sorry, You don't have any news!
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="noteceBorad-Container">
          {upcommingMettings.length > 0 && (
            <div className="studenClassBorad">
              <h5 className="commingClass">Upcoming Classes</h5>
              {upcommingMettings.map((data) => (
                <div className="upcommingMetting">
                  <p className="mt-auto mb-auto">{data.title}</p>
                  <p className="mt-auto mb-auto">
                    <i class="fas fa-calendar-week"></i> {data.date}
                  </p>
                  <p className="mt-auto mb-auto">{`From: ${data.starttime} To: ${data.endtime}`}</p>

                  <Link
                    className="join-link mt-auto mb-auto"
                    to={`${data.meeting_link}`}
                  >
                    Join
                  </Link>
                </div>
              ))}
            </div>
          )}
          {mettings.length > 0 && (
            <div className="studenClassBorad">
              <h5 className="commingClass">Upcoming Meetings </h5>
              {mettings.map((data) => (
                <div className="upcommingMetting">
                  <p
                    style={{ width: "130px", textAlign: "start" }}
                    className="mt-auto mb-auto"
                  >
                    {data.title}
                  </p>
                  <p style={{ width: "86px" }} className="mt-auto mb-auto">
                    <i class="fas fa-calendar-week"></i> {data.date}
                  </p>
                  <p
                    style={{ width: "129px" }}
                    className="mt-auto mb-auto"
                  >{`From: ${data.starttime} To: ${data.endtime}`}</p>
                  <Link
                    className="join-link mt-auto mb-auto"
                    to={`${data.meeting_link}`}
                  >
                    Join
                  </Link>
                </div>
              ))}
            </div>
          )}

          {holidays.length > 0 && (
            <div>
              <h3 className="commingClass ">Upcoming Holidays </h3>
              <div className="holidaysClassBorad ">
                {holidays.map((data) => (
                  <div className="upcommingHolidays">
                    <p className=" mt-auto mb-auto">{data.description}</p>
                    <p className=" mt-auto mb-auto">{data.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Education;

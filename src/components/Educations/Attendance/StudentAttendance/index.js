import React, { useState } from "react";
import "./index.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "../../Header";
import {
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import axios from "axios";
import { BaseUrl } from "../../../API";
import { SettingsSystemDaydream } from "@material-ui/icons";

const StudentAttendance = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [resdata, setresdata] = useState([]);

  const userdata = JSON.parse(localStorage.getItem("education"));
  function handleSelect(selectedInfo) {
    //alert(selectedInfo.startStr)

    console.log("working!!", selectedInfo);
  }

  const eventList = [
    {
      title: "event1",
      start: "2021-06-12",
    },
    {
      title: "event2",
      start: "2021-06-20",
      end: "2021-06-25",
    },
    {
      title: "event3",
      start: "2021-07-20",
      end: "2021-06-25",
    },
    {
      title: "event4",
      start: "2021-06-27",
      allDay: false, // will make the time show
    },
  ];

  const getAttendanceData = () => {
    axios
      .get(
        `http://api.emagz.live/v1.0/viewattendance/${userdata.data.user_id}/${year}-${month}`
      )
      .then((res) => {
        let data = [];
        if (res.data.status) {
          let resdata = res.data.data[0];
          data = [
            {
              title: resdata.day1,
              date: `${year}-${month}-01`,
              color: resdata.day1 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day2,
              date: `${year}-${month}-02`,
              color: resdata.day2 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day3,
              date: `${year}-${month}-03`,
              color: resdata.day3 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day4,
              date: `${year}-${month}-04`,
              color: resdata.day4 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day5,
              date: `${year}-${month}-05`,
              color: resdata.day5 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day6,
              date: `${year}-${month}-06`,
              color: resdata.day6 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day7,
              date: `${year}-${month}-07`,
              color: resdata.day7 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day8,
              date: `${year}-${month}-08`,
              color: resdata.day8 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day9,
              date: `${year}-${month}-09`,
              color: resdata.day9 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day10,
              date: `${year}-${month}-10`,
              color: resdata.day10 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day11,
              date: `${year}-${month}-11`,
              color: resdata.day11 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day12,
              date: `${year}-${month}-12`,
              color: resdata.day12 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day13,
              date: `${year}-${month}-13`,
              color: resdata.day13 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day14,
              date: `${year}-${month}-14`,
              color: resdata.day14 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day15,
              date: `${year}-${month}-15`,
              color: resdata.day15 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day16,
              date: `${year}-${month}-16`,
              color: resdata.day16 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day17,
              date: `${year}-${month}-17`,
              color: resdata.day17 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day18,
              date: `${year}-${month}-18`,
              color: resdata.day18 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day19,
              date: `${year}-${month}-19`,
              color: resdata.day19 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day20,
              date: `${year}-${month}-20`,
              color: resdata.day20 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day21,
              date: `${year}-${month}-21`,
              color: resdata.day21 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day22,
              date: `${year}-${month}-22`,
              color: resdata.day22 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day23,
              date: `${year}-${month}-23`,
              color: resdata.day23 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day24,
              date: `${year}-${month}-24`,
              color: resdata.day24 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day25,
              date: `${year}-${month}-25`,
              color: resdata.day25 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day26,
              date: `${year}-${month}-26`,
              color: resdata.day26 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day27,
              date: `${year}-${month}-27`,
              color: resdata.day27 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day28,
              date: `${year}-${month}-28`,
              color: resdata.day28 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day29,
              date: `${year}-${month}-29`,
              color: resdata.day29 === "Y" ? "#0f0" : "#f00",
            },
            {
              title: resdata.day30,
              date: `${year}-${month}-30`,
              color: resdata.day30 === "Y" ? "#0f0" : "#f00",
            },
          ];
        }

        setresdata(data);
      });
  };

  const handleDateClick = () => {
    alert("please add Event");
  };

  return (
    <>
      <Header />
      <div className="form_data">
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleSelect">Year</Label>
                <Input
                  onChange={(e) => setYear(e.target.value)}
                  required
                  value={year}
                  type="select"
                  name="select"
                  id="exampleSelect"
                >
                  <option>--select--</option>
                  <option>2019</option>
                  <option>2018</option>
                  <option>2017</option>
                  <option>2020</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleSelect">Month</Label>
                <Input
                  required
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  type="select"
                  name="select"
                  id="exampleSelect"
                >
                  <option>--select--</option>
                  <option>12</option>
                  <option>15</option>
                  <option>11</option>
                  <option>2</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Button onClick={getAttendanceData}>Submit</Button>
        </Form>
      </div>
      <div className="fullCalendar ">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          selectable={true}
          selectMirror={true}
          selectOverlap={false}
          editable={true}
          select={handleSelect}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={eventList}
        />
      </div>
    </>
  );
};

export default StudentAttendance;

// setresdata([
//   { title: atn.day1, date: `${year}-${month}-01`,color:"#f00" },
//   { title: atn.day2, date: `${year}-${month}-02`,color:"#0f0" },
//   { title: atn.day3, date: `${year}-${month}-03`,color:"#00f" },
//   { title: atn.day4, date: `${year}-${month}-04`,color:"#00f" },
//   { title: atn.day5, date: `${year}-${month}-05`,color:"#00f" },
//   { title: atn.day6, date: `${year}-${month}-06`,color:"#00f" },
//   { title: atn.day7, date: `${year}-${month}-07`,color:"#00f" },
//   { title: atn.day8, date: `${year}-${month}-08`,color:"#00f" },
//   { title: atn.day9, date: `${year}-${month}-09`,color:"#00f" },
//   { title: atn.day10, date: `${year}-${month}-10`,color:"#00f" },
//   { title: atn.day11, date: `${year}-${month}-11`,color:"#00f" },
//   { title: atn.day12, date: `${year}-${month}-12`,color:"#00f" },
//   { title: atn.day13, date: `${year}-${month}-13`,color:"#00f" },
//   { title: atn.day14, date: `${year}-${month}-14`,color:"#00f" },
//   { title: atn.day15, date: `${year}-${month}-15`,color:"#00f" },
//   { title: atn.day16, date: `${year}-${month}-16`,color:"#00f" },
//   { title: atn.day17, date: `${year}-${month}-17`,color:"#00f" },
//   { title: atn.day18, date: `${year}-${month}-18`,color:"#00f" },
//   { title: atn.day19, date: `${year}-${month}-19`,color:"#00f" },
// ])

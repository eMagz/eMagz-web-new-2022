import React, { useEffect, useState } from "react";
import "./index.css";
import { BaseUrl } from "../../API";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import Header from "../Header";

const Index = () => {
  const [missionData, setMissionData] = useState({});

  const getDeclaration = (id) => {
    axios.get(`${BaseUrl}/view-declaration/${id}`).then((res) => {
      setMissionData(res.data.data);
    });
  };

  useEffect(() => {
    const education = JSON.parse(localStorage.getItem("education"));
    getDeclaration(education.data.school_id);
  }, []);
  return (
    <>
      <Header />
      <div className="our-declaration">
        <div className="dec-wraper">
          <h1 className="declaration-text">Our declaration</h1>
          <div className="declarationText">
            <h3 className="anthom">Anthom</h3>
            <p className="gaan">{ReactHtmlParser(missionData.declaration)}</p>
          </div>
          <div className="missionWraper">
            <div className="mission">
              <h3>OUR MISSION</h3>
              <p>{ReactHtmlParser(missionData.mission)}</p>
            </div>
            <div className="vission">
              <h3>OUR VISSION</h3>
              {ReactHtmlParser(missionData.vision)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

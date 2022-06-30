import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { BaseUrl } from "../../API";
import Header from "../Header";

const StudentRemarks = () => {
  const [remarks, setRemarks] = useState([]);

  const getAplication = (id) => {
    axios.get(`${BaseUrl}/student-own-remarks/${id}`).then((res) => {
      setRemarks(res.data.data);
    });
  };

  useEffect(() => {
    const education = JSON.parse(localStorage.getItem("education"));
    getAplication(education.data._id);
  }, []);

  return (
    <>
      <Header />
      <div style={{ margin: "5rem 5rem" }}>
        <MaterialTable
          title="Student Remark List"
          columns={[
            { title: "Given By", field: "role" },
            { title: "Name", field: "name" },
            { title: "Student Name", field: "student_name" },
            { title: "Date", field: "date" },
            { title: "Re-marks", field: "remarks" },
          ]}
          data={remarks}
          options={{
            actionsColumnIndex: -1,
            search: true,
          }}
        />
      </div>
    </>
  );
};

export default StudentRemarks;

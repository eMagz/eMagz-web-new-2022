import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faSearch,
  faThList,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

import Tooltip from "@material-ui/core/Tooltip";
import Header from "../../../Header";
import axios from "axios";
import { BaseUrl } from "../../../../API";
// import {ImageUrl} from '../../../API';
import swal from "@sweetalert/with-react";

// import {BaseUrl} from '../../API';

function TeacherHomeWork() {
  const [modal, setModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [viewmodal, setViewmodal] = useState(false);
  const [newdate, setNewdate] = useState("");
  const [date, setDate] = useState("");
  const [newdescription, setNewDescription] = useState("");
  const [description, setDescription] = useState("");
  const [classes, setClasses] = useState("");
  const [section, setSection] = useState("");
  //    const[studentlist,setStudentList]= useState([]);
  const [rowDta, setrowDta] = useState("");
  const [photo, setPhoto] = useState("");
  const [subject, setSubject] = useState("");
  const [newclasses, setNewclasses] = useState();
  const [newsection, setNewsection] = useState();
  //    const[newdescription,setNewdescription]=useState();
  const [newsubject, setNewsubject] = useState();
  const [newphoto, setNewphoto] = useState("");

  const [list, setList] = useState([]);
  //    const[]

  const toggleEditmodal = () => setEditModal(!editmodal);
  const viewtoggleModal = () => setViewmodal(!viewmodal);

  const closeBtnone = (
    <button className="close" onClick={toggleEditmodal}>
      &times;
    </button>
  );

  const homewrkdata = JSON.parse(localStorage.getItem("education"));

  const onHandlePhotoChange = (e) => {
    const files = e.target.files[0];
    setPhoto(files);
  };

  const onHandleNewPhotoChange = (e) => {
    const newfile = e.target.files[0];
    setNewphoto(newfile);
  };

  const onHandleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onHandleDateChange = (e) => {
    setDate(e.target.value);
  };
  const onHandleNewDateChange = (e) => {
    setNewdate(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${BaseUrl}/viewteacherhomework/${homewrkdata.data.school_id}`)
      .then((res) => {
        const list = res.data.data;
        setList(list);
      });
  }, []);

  const toggleModal = () => setModal(!modal);
  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      &times;
    </button>
  );
  return (
    <>
      <Header />
      <div className="hmwrkteacher_container">
        <div className="hmwrkteacher_table">
          <MaterialTable
            title="Students Homework Details"
            columns={[
              { title: "Home Work", field: "description" },
              { title: "Date", field: "date" },
            ]}
            data={list}
            // actions={[
            //   {
            //     icon: 'edit',
            //     tooltip: 'Edit Details',
            //     onClick: (event, rowData) => {
            //       console.log('raw',rowData);
            //       const rowDta = rowData;
            //       setrowDta(rowDta);
            //       setEditModal(!editmodal)

            //     }
            //   },

            // ]}
            options={{
              actionsColumnIndex: -1,
              search: false,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default TeacherHomeWork;

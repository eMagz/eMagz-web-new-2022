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
import Header from "../../../../Header";
import axios from "axios";
import { BaseUrl } from "../../../../../API";
// import {ImageUrl} from '../../../API';
import swal from "@sweetalert/with-react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useHistory } from "react-router-dom";
import StreetviewIcon from "@material-ui/icons/Streetview";
// import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ClothingList(props) {
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
  //  const[subject,setSubject]=useState('');
  //  const[newclasses,setNewclasses]=useState();
  //  const[newsection,setNewsection]=useState();
  const [newName, setNewName] = useState("");
  const [newgst, setNewgst] = useState("");
  const [gstPers, setNewgstPers] = useState("");
  const [newphoto, setNewphoto] = useState("");
  const history = useHistory();
  const [gstdata, setGstdata] = useState([]);
  const [gstpersdata, setGstpersdata] = useState([]);
  const [list, setList] = useState([]);
  const vendordata = JSON.parse(localStorage.getItem("vendor"));

  const toggle = () => setModal(!modal)

  useEffect(() => {
    getProductdetails();

    axios.get(`${BaseUrl}/viewgst`).then((res) => {
      console.log("gg", res.data.data.type);
      setGstdata(res.data.data.type);
      setGstpersdata(res.data.data.gst);
    });
  }, []);

  const getProductdetails = () => {
    axios.get(`${BaseUrl}/product-list/${vendordata._id}`).then((res) => {
      console.log("xd", res);
      setList(res.data.data);
    });
  };

  const changePage = () => {
    history.push("/business/vendor-dashboard/product-list/add-product");
  };

  const editDetails = () => {
    const data = {
      name: newName,
      description: newdescription,
      vendor_id: rowDta.vendor_id,
      user_id: rowDta.user_id,
      category_id: rowDta.category_id,
      sub_category_id: rowDta.sub_category_id,
      gst_type: newgst,
      gst_percentage: gstPers,
    };
    console.log("DATA", data);
    axios.post(`${BaseUrl}/edit-product/${rowDta._id}`, data).then((res) => {
      console.log("ee", res);
      if (res.data.status) {
        swal(res.data.msg);
      } else {
        swal(res.data.msg);
      }
      getProductdetails();
    });
    toggle();
  };

  const toggleModal = () => setModal(!modal);

  const deleteProduct = (data) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.post(`${BaseUrl}/delete-product/${data._id}`);
        axios.get(`${BaseUrl}/product-list/${vendordata._id}`).then((res) => {
          console.log("xd", res);
          setList(res.data.data);
        });
        swal("Poof! Your product has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your file is safe!");
      }
    });
  };
  const changeGSTPercentage = (value) => {
    console.log("gst percentage with fubc", value);
  };

  const handleProductList = (data) => {
    console.log("Propss Details", data);
    setrowDta(data);
    setEditModal(!editmodal);
    history.push(
      "/business/vendor-dashboard/product-list/product-details-list",
      data
    );
  };
  return (
    <>
      <Header pageName="Product Information" />
      <div className="clothinglist_container">
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Details</ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleEmail">Product Name</Label>
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="examplePassword">GST %</Label>
                    <Input
                      onChange={(e) => setNewgstPers(e.target.value)}
                      type="select"
                      placeholder="password placeholder"
                    >
                      {gstpersdata.map((val) => {
                        return (
                          <option value={val.gst_percentage}>
                            {val.gst_percentage}
                          </option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="examplePassword">GST Type</Label>
                    <Input
                      onChange={(e) => setNewgst(e.target.value)}
                      type="select"
                      placeholder="password placeholder"
                    >
                      {gstdata.map((val) => {
                        return (
                          <option value={val.gst_type}>{val.gst_type}</option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <ReactQuill
                value={newdescription}
                onChange={(value) => setNewDescription(value)}
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={editDetails}>
              Edit Details
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <div className="addlist_buttons">
          <Button onClick={changePage} variant="contained" color="primary">
            Add Product
            <AddBoxIcon />
          </Button>
        </div>

        <div className="clothinglist_table">
          <MaterialTable
            title="Products List"
            columns={[
              { title: "Product name", field: "name" },
              { title: "GST %", field: "gst_percentage" },
              { title: "Gst Type", field: "gst_type" },
            ]}
            data={list}
            actions={[
              {
                icon: "visibility",
                tooltip: "View Product Details",
                onClick: (event, rowData) => {
                  handleProductList(rowData);
                },
              },
              {
                icon: "edit",
                tooltip: "Edit Product",
                onClick: (event, rowData) => {
                  console.log("GST PERCENTAGE", rowData);
                  setNewName(rowData.name);
                  setNewDescription(rowData.description);
                  setNewgst(rowData.gst_type);
                  setNewgstPers(rowData.gst_percentage);
                  setrowDta(rowData);
                  toggle();
                  setEditModal(!editmodal);
                },
              },
              {
                icon: "delete",
                tooltip: "Delete Product Details",
                onClick: (event, rowData) => {
                  deleteProduct(rowData);
                },
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              search: true,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ClothingList;

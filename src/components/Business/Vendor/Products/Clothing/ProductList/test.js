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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../../../../Header";
import axios from "axios";
import { BaseUrl, ImageUrl } from "../../../../../API";
import swal from "@sweetalert/with-react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { useHistory } from "react-router-dom";
import StreetviewIcon from "@material-ui/icons/Streetview";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import CancelIcon from "@material-ui/icons/Cancel";

function ProductList(props) {
    console.log("NowProps", props);
    const [modal, setModal] = useState(false);
    const [editmodal, setEditModal] = useState(false);
    const [viewmodal, setViewmodal] = useState(false);
    const history = useHistory();
    const [list, setList] = useState([]);
    const [categoryID, setCategoryID] = useState("");
    const [imagedata, setImagedata] = useState([]);
    const [imageid, setImageid] = useState("");
    const toggleEditmodal = () => setEditModal(!editmodal);
    const viewtoggleModal = () => setViewmodal(!viewmodal);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [stock, setStock] = useState("");
    const [restStock, setResStock] = useState("");
    const [price, setPrice] = useState("");
    const [rowData, setRowdata] = useState("");
    const [catId, setCatId] = useState("");
    const [sizeList, setSizelist] = useState([]);

    const closeBtnone = (
        <button className="close" onClick={toggleEditmodal}>
            &times;
        </button>
    );

    const getProductdetails = () => {
        axios
            .get(`${BaseUrl}/product-details-list/${props.location.state._id}`)
            .then((res) => {
                if (res.data.data.length > 0) {
                    setCatId(res.data.data[0].category_id);
                    setList(res.data.data);
                    setCategoryID(res.data.data[0]);
                }
                axios
                    .get(
                        `${BaseUrl}/category-size-list/${props.location.state.category_id}`
                    )
                    .then((res) => {
                        setSizelist(res.data.data);
                    });
            });
    };

    useEffect(() => {
        getProductdetails();
    }, []);

    const getDeleteImages = (id) => {
        axios.post(`${BaseUrl}/delete-product-images/${id}`).then((res) => {
            if (res.data.status) {
                getAllImages(imageid);
            }
        });
    };

    const getAllImages = (data) => {
        axios.post(`${BaseUrl}/view-product-images/${data._id}`).then((res) => {
            setImagedata(res.data.data[0].productimages);
        });
    };

    const editVendorProductDetails = () => {
        const data = {
            price: price,
            colour: color,
            size: size,
            rest_stock: rowData.rest_stock,
            stock: stock,
            vendor_id: rowData.vendor_id,
            product_id: rowData.product_id,
        };
        axios
            .post(`${BaseUrl}/edit-product-details/${rowData._id}`, data)
            .then((res) => {
                console.log("dd", res);
                if (res.data.status) {
                    swal(res.data.msg);
                } else {
                    swal(res.data.msg);
                }
                getProductdetails();
            });
        toggle();
    };
    const changePage = () => {
        history.push(
            "/business/vendor-dashboard/product-list/add-details",
            props.location.state
        );
    };

    const deleteProductDetails = (data) => {
        console.log(data);
        swal({
            title: "Are you sure?",
            text:
                "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            axios.post(`${BaseUrl}/delete-product-details/${data._id}`);
            axios
                .get(`${BaseUrl}/product-details-list/${props.location.state._id}`)
                .then((res) => {
                    if (res.data.data.length > 0) {
                        setCatId(res.data.data[0].category_id);
                        setList(res.data.data);
                        setCategoryID(res.data.data[0]);
                    }

                    axios
                        .get(
                            `${BaseUrl}/category-size-list/${props.location.state.category_id}`
                        )
                        .then((res) => {
                            setSizelist(res.data.data);
                        });
                });
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    };

    const toggle = () => setModal(!modal);
    const toggleModal = () => setModal(!modal);
    const closeBtn = (
        <button className="close" onClick={toggleModal}>
            &times;
        </button>
    );
    const handleProductDetails = (rowData) => {
        console.log("raw", rowData);
        toggle();
    };
    return (
        <>
            <Header />
            <div className="clothinglist_container">
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Edit Details</ModalHeader>
                        <ModalBody>
                            {imagedata.length <= 0 ? (
                                <div>No image Found!</div>
                            ) : (
                                <div className="image_list">
                                    {imagedata.map((val, id) => {
                                        return (
                                            <div
                                                key={val._id}
                                                className="product_details_vendor_image"
                                            >
                                                <img src={ImageUrl + val.picture} />
                                                <IconButton
                                                    onClick={() => getDeleteImages(val._id)}
                                                    style={{ position: "absolute", right: 0 }}
                                                    color="primary"
                                                    component="span"
                                                >
                                                    <CancelIcon />
                                                </IconButton>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            <Form>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail">Size</Label>
                                            <Input
                                                value={size}
                                                onChange={(e) => setSize(e.target.value)}
                                                type="select"
                                            >
                                                {sizeList.map((val) => {
                                                    return <option>{val.size}</option>;
                                                })}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="examplePassword">Color</Label>
                                            <Input
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                type="color"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail">Price</Label>
                                            <Input
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                type="number"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="examplePassword">Stock</Label>
                                            <Input
                                                type="text"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={editVendorProductDetails}>
                                Submit
                            </Button>{" "}
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div className="addlist_buttons">
                    <Button onClick={changePage} variant="contained" color="primary">
                        ADD DETAILS
                        <AddBoxIcon />
                    </Button>
                </div>

                <div className="clothinglist_table">
                    <MaterialTable
                        title="Product Details List"
                        columns={[
                            { title: "Price", field: "price" },
                            { title: "Stock", field: "stock" },
                            { title: "Color", field: "colour" },
                            { title: "Size", field: "size" },
                            { title: "GST Amount", field: "gst_amount" },
                            { title: "Total Price", field: "total_price" },
                        ]}
                        data={list}
                        actions={[
                            {
                                icon: "visibility",
                                tooltip: "View Product Details",
                                onClick: (event, rowData) => {
                                    handleProductDetails(rowData);
                                },
                            },
                            {
                                icon: "edit",
                                tooltip: "Edit Details",
                                onClick: (event, rowData) => {
                                    toggle();
                                    console.log("raw", rowData);
                                    setRowdata(rowData);
                                    setColor(rowData.colour);
                                    setSize(rowData.size);
                                    setStock(rowData.stock);
                                    setPrice(rowData.price);
                                    setImageid(rowData);
                                    setEditModal(!editmodal);
                                    getAllImages(rowData);
                                },
                            },
                            {
                                icon: "delete",
                                tooltip: "Delete Product Details",
                                onClick: (event, rowData) => {
                                    deleteProductDetails(rowData);
                                },
                            },
                        ]}
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

export default ProductList;

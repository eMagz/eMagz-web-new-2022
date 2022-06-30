import React, { useState, useEffect } from "react";
import {
    Col,
    Row,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    CustomInput,
    FormText,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./index.css";
// import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input1 from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Header from "../../../../Header";
import axios from "axios";
import { BaseUrl } from "../../../../../API";
import swal from "@sweetalert/with-react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(7),
        width: "90%",
    },

    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ClothingsDetails = (props) => {
    const [size, setSize] = useState("");
    const [sizelist, setSizelist] = useState([]);
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [color, setColor] = useState("");
    const [photo, setPhoto] = useState(null);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const history = useHistory();
    console.log("zx", props);

    const onHandlePictureChange = (e) => {
        setPhoto(e.target.files);
        console.log("Upload Photo", e.target.files);
    };

    console.log("PROPS", props);

    useEffect(() => {
        getSizeList();
    }, []);

    const getSizeList = () => {
        axios
            .get(`${BaseUrl}/category-size-list/${props.location.state.category_id}`)
            .then((res) => {
                setSizelist(res.data.data);
            });
    };

    const submitDetailForm = () => {
        const body = {
            price: price,
            stock: stock,
            colour: color,
            size: size,
            vendor_id: props.location.state.vendor_id,
        };

        axios
            .post(`${BaseUrl}/add-product-details/${props.location.state._id}`, body)
            .then((res) => {
                console.log("zc", res);
                if (photo.length > 0) {
                    for (let i = 0; i < photo.length; i++) {
                        let formimage = new FormData();

                        formimage.append("picture", photo[i], photo[i].name);
                        formimage.append("product_id", res.data.data.product_id);
                        formimage.append("product_detail_id", res.data.data._id);
                        formimage.append("vendor_id", props.location.state.vendor_id);
                        axios
                            .post(`${BaseUrl}/add-product-images`, formimage)
                            .then((resone) => console.log("ss", resone));
                    }
                }
                if (res.data.status) {
                    swal(res.data.msg);
                    toggle();
                }
            });
    };

    const addMore = () => {
        setSize("");
        setPrice("");
        setStock("");
        setColor("");

        toggle();
    };

    const goTolist = () => {
        history.push(
            "/business/vendor-dashboard/product-list/product-details-list"
        );
    };
    return (
        <>
            <div>
                <Header />
            </div>
            <div className="product_container">
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}></ModalHeader>
                        <ModalBody>Do you want to add more?</ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={addMore}>
                                Add More
                            </Button>{" "}
                            <Button color="primary" onClick={goTolist}>
                                Go to List
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div className="products_card">
                    <div className="form_product">
                        <Form>
                            <FormGroup>
                                <Label for="exampleCustomFileBrowser">Product Images</Label>
                                <CustomInput
                                    onChange={onHandlePictureChange}
                                    multiple
                                    type="file"
                                    accept="images/*"
                                    name="images"
                                />
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Price</Label>
                                        <Input
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            type="number"
                                            name="price"
                                            placeholder="Rupees"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Stock</Label>
                                        <Input
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            type="text"
                                            name="stock"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleSelect">Size</Label>
                                        <Input
                                            value={size}
                                            onChange={(e) => setSize(e.target.value)}
                                            type="select"
                                            name="select"
                                            id="exampleSelect"
                                        >
                                            <option>--select--</option>
                                            {sizelist.map((val) => {
                                                return <option>{val.size}</option>;
                                            })}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="exampleColor">Color</Label>
                                        <Input
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                const color = e.target.value;
                                                setColor(color);
                                            }}
                                            type="color"
                                            name="color"
                                            id="exampleColor"
                                            placeholder="color placeholder"
                                        />
                                        <FormText color="muted">
                                            Please select any color as HEX mode. ex: #00000
                                        </FormText>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button onClick={submitDetailForm}>Add Product Details</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClothingsDetails;

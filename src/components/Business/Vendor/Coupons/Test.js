import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { BaseUrl, ImageUrl } from "../../../API"
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Header from "../../Header"
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from "axios"
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom"
import { Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SaveIcon from '@material-ui/icons/Save';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { DataGrid } from '@material-ui/data-grid';


const AdminData = JSON.parse(localStorage.getItem('Admin'));
let vendor = JSON.parse(localStorage.getItem('vendor'));

const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
];

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const Index = () => {
    const classes = useStyles();
    const history = useHistory()
    const [users, setUsers] = useState([]);
    const [coupon, setCoupon] = useState([]);
    const [status, setStatus] = useState('');
    const [schoolID, setSchoolID] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    const [appliedDate, setAppliedDate] = useState('')
    const [validTo, setValidTo] = useState('')
    const [couponType, setCouponType] = useState('')
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [value, setValue] = useState('')
    const [maxUsers, setMaxUsers] = useState('')
    const [appliedTime, setAppliedTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [valueDisabled, setValuedDisabled] = useState(true)
    const [selectedSubCategories, setSelectedSubCategories] = useState([])

    const toggle = () => setIsOpen(!isOpen)

    const getAllShop = (id) => {
        axios.get(`${BaseUrl}/vendor-coupons-list/${id}`).then((res) => {
            setUsers(res.data.data)
        })
    }

    const generateCouponCode = () => {
        axios.get(`${BaseUrl}/generate-coupon-code`).then((res) => {
            setCoupon(res.data.coupon_code)
        })
    }

    const getCategories = () => {
        axios.get(`${BaseUrl}/view-business-category`).then((res) => {
            setCategories(res.data.data)
        })
    }

    useEffect(() => {
        vendor = JSON.parse(localStorage.getItem('vendor'));
        getAllShop(vendor._id)
        generateCouponCode()
        getCategories()
    }, [])


    const handleCategory = (e) => {
        let id = e.target.value
        setCategory(id)
        categories.forEach((data) => {
            if (data._id === id) {
                setSubCategories(data.subcategories)
            }
        })
    }
    const getApprovedData = (data) => {
        setSchoolID(data._id)
    }

    const handleSubCategories = (data) => {
        setSelectedSubCategories(data)
    }

    const handleValueType = (e) => {
        setCouponType(e.target.value)
        setValuedDisabled(false)
    }

    const handleCouponClick = () => {
        let temp = []
        selectedSubCategories.forEach((data) => {
            let id = data._id
            temp.push({ subcategory_id: data._id })
        })

        let couponData = {
            vendor_id: vendor._id,
            apply_to: "any",
            category_id: category,
            subcategorieslist: temp,
            coupon_type: couponType,
            coupon_code: coupon,
            coupon_value: value,
            startdate: appliedDate,
            starttime: appliedTime,
            expiredate: validTo,
            expiretime: endTime,
            current_used: "",
            max_used: maxUsers
        }

        axios.post(`${BaseUrl}/create-sub-category-coupon`, couponData)
        toggle()
    }
    return (
        <>
            <Header />
            <div className='admin_container' >
                <div className='addlist_buttons' >
                    <Button onClick={toggle} variant="contained" color="primary">
                        Add Coupon<AddBoxIcon />
                    </Button>
                </div>
                <div className='fees_table' >
                    <MaterialTable
                        title="All Coupons"
                        columns={[
                            { title: 'Coupon Code', field: 'coupon_code' },
                            { title: 'Value', field: 'coupon_value' },
                            { title: 'Starting Date', field: 'startdate' },
                            { title: 'Starting Time', field: 'starttime' },
                            { title: 'End Date', field: 'expiredate' },
                            { title: 'End Time', field: 'expiretime' },
                        ]}
                        data={users}
                        actions={[
                            {
                                icon: 'visibility',
                                tooltip: 'Show Details',
                                onClick: (event, rowData) => history.push(`/admin/emagz/acvtive-users/${rowData._id}`, rowData)
                            },
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            search: true
                        }}
                    />
                </div>
            </div>
            <Modal isOpen={isOpen} toggle={toggle} >
                <ModalHeader toggle={toggle}>Create Coupon</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Categories</Label>
                                <Input onChange={(e) => handleCategory(e)} type="select" placeholder="password placeholder" >
                                    <option>-------select---------</option>
                                    {categories.map(val => {
                                        return (
                                            <option value={val._id}>{val.name}</option>
                                        )
                                    })}
                                    <option value="all">All Categories</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Coupon Code</Label>
                                <Input value={coupon} disabled style={{ cursor: 'not-allowed' }} type="text" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {
                                subCategories.length > 0
                                && <MaterialTable
                                    title="Subcategories"
                                    columns={[
                                        { title: 'Name', field: 'name' },
                                    ]}
                                    data={subCategories}
                                    onSelectionChange={(rows) => {
                                        handleSubCategories(rows)
                                    }}
                                    options={{
                                        actionsColumnIndex: -1,
                                        search: false,
                                        selection: true
                                    }}
                                />
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Discount Type</Label>
                                <Input type="select" onClick={(e) => handleValueType(e)} placeholder="password placeholder" >
                                    <option value="percentage">Percentage</option>
                                    <option value="amount">Amount</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Value</Label>
                                <Input value={value} disabled={valueDisabled} onChange={(e) => setValue(e.target.value)} type="text" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Applied From</Label>
                                <Input type="date" name="due date" placeholder="Due Date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Start Time</Label>
                                <TextField
                                    id="time"
                                    value={appliedTime}
                                    onChange={(e) => setAppliedTime(e.target.value)}
                                    type="time"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Expiry Date</Label>
                                <Input type="date" name="due date" placeholder="Due Date" value={validTo} onChange={(e) => setValidTo(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>End Time</Label>
                                <TextField
                                    id="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    type="time"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup>
                                <Label for="exampleEmail">Maximum users</Label>
                                <Input value={maxUsers} onChange={(e) => setMaxUsers(e.target.value)} type="number" />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleCouponClick}> Create</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default Index;
import React, { useState, useEffect } from 'react'
import './index.css';
import { BaseUrl } from "../../../API"
import axios from "axios"
import MaterialTable from 'material-table';
import Header from '../../Header';
import { useHistory } from 'react-router-dom';
import { Button, Input, FormFeedback, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const vendor = JSON.parse(localStorage.getItem('vendor'))
const user = JSON.parse(localStorage.getItem('user'))
const Orders = () => {

    const history = useHistory();
    const [orders, setOrders] = useState([])
    const [orderId, setOrderId] = useState('')
    const [orderExId, setOrderExId] = useState('')
    const [falseData, setFalseData] = useState()
    const [modal, setModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [status, setStatus] = useState('Delivered')
    const [statusData, setStatusData] = useState()

    let trackedData = {}
    const getOrders = () => {
        let newOrder = []
        axios.get(`${BaseUrl}/vendor-order-list/${vendor._id}`)
            .then(res => {
                console.log('Order Details', res)
                let responseData = res.data.data
                responseData.forEach((data, i) => {
                    console.log("First Details", data)
                    console.log('First ID', data._id)
                    data.order.forEach((newData) => {
                        newData.orderEx_id = data._id;
                        console.log("Second Details", newData)
                        newOrder.push(newData)
                    })
                })
                setOrders(newOrder)
            })
    }

    const handleUpdate = () => {
        console.log('*******************', orderId, orderExId)
        axios.post(`${BaseUrl}/change-order-status/${orderExId}/${orderId}`, { status }).then((res) => {
            //console.log('Res Data', res.data.data[0].order)
        })
        trackedData = {
            user_id: user._id,
            product_id: statusData.product_id,
            order_id: statusData.order_id,
            vendor_id: statusData.vendor_id,
            name: statusData.name,
            total_price: statusData.total_price,
            quantity: statusData.quantity,
            status: statusData.status,

        }
        console.log('Tracked Data', trackedData)
        axios.post(`${BaseUrl}/track-order-status`, trackedData).then((res) => {
            console.log('Tracked Data Response', res)
        })

    }

    useEffect(() => {
        getOrders()
    }, [])

    const toggle = () => setOpenModel(!openModel)

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const takeOrderId = (rowData) => {
        setStatusData(rowData)
        console.log('OrderID=>>>>>>', rowData)
        setOrderId(rowData._id)
        setOrderExId(rowData.orderEx_id)
        toggle()
    }
    return (
        <>
            <Header pageName="Order Details" />
            <div className='homework_container' >
                <div className='fees_table' >
                    <MaterialTable
                        title="Home Work Details"

                        columns={[
                            { title: 'Order ID', field: 'order_id' },
                            { title: ' Name', field: 'name' },
                            { title: ' Quantity', field: 'quantity' },
                            { title: 'Toal Price', field: 'total_price' },
                            { title: 'GST Amount', field: 'gst_amount' },
                            { title: 'Status', field: 'status' },
                        ]}
                        data={orders}
                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit Orders',
                                onClick: (event, rowData) => takeOrderId(rowData)
                            },
                            {
                                icon: 'visibility',
                                tooltip: 'View Your Stock Details',
                                onClick: (event, rowData) => {
                                    history.push('/business/orders-list/order-details')
                                }
                            },
                        ]}

                        options={{
                            actionsColumnIndex: -1,
                            search: false
                        }}
                    />
                </div>
                <Modal isOpen={openModel} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Select Status</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <InputLabel >Status</InputLabel>
                            <Select
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={status}
                                onChange={handleChange}
                            >
                                <MenuItem value="Status">
                                </MenuItem>
                                <MenuItem value="Dispatch">Dispatch</MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                                <MenuItem value="Pickup">Pickup</MenuItem>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: "#ac3333" }} onClick={() => { handleUpdate(); toggle() }}>Apply</Button>
                        <Button style={{ backgroundColor: "#ac3333" }} onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    )
}
export default Orders;

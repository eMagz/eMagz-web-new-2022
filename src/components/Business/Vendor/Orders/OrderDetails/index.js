import React,{useState,useEffect,useRef} from 'react'
import Header from '../../../Header'
import "./index.css"
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Collapse, CardBody, Card } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col,Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { BaseUrl } from '../../../../API';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector , useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Select from '@material-ui/core/Select';
import logoImg from "../../../../../assets/category.png"
import Receipt from "../../Receipt"

const PaymentGetway = () => {
const history = useHistory();
const [orders, setOrders] = useState([])
const [orderId, setOrderId] = useState('')
const [falseData, setFalseData] = useState()
const [modal, setModal] = useState(false);
const [open, setOpen] =  useState(false);
const [openModel, setOpenModel] =  useState(false);
const [status, setStatus] = useState('Delivered')



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

const handleUpdate = () =>{
    toggle()
}
    return (
        <>
            <div>
            <Header/>
            </div>
            <div className='addressContainer'>
            <div className="paymentContainer1">
              <div className='orderContainer_nav'>
                  <h3 className='orderAddress'>OEDER DETAILS</h3> 
                  <h4>ID: 45FGHDFH4546</h4>
                  <Button className="updateBtn" onClick={handleUpdate} >Update Status</Button>
               </div>
                <div>
                   <Receipt/>
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
          <Button style={{backgroundColor: "#ac3333"}} onClick={()=>{handleUpdate(); toggle()}}>Apply</Button>
          <Button style={{backgroundColor: "#ac3333"}} onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>  
        </div>
        </div>  
        </>
    )
}
export default PaymentGetway;

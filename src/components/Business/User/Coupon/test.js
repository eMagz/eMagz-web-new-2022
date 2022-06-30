import React, { useState, useEffect } from 'react';
import './index.css';
import AddIcon from '@material-ui/icons/Add';
import Header from '../Header';
import { BaseUrl, ImageUrl } from '../../../API';
import Button from '@material-ui/core/Button';
import { Collapse, CardBody, Card } from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SaveIcon from '@material-ui/icons/Save';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import StarsIcon from '@material-ui/icons/Stars';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import swal from '@sweetalert/with-react'
import wishlist from "../../../../assets/wishList.png"
import Rating from '@material-ui/lab/Rating';
import moment from "moment"


const Index = () => {
    const history = useHistory();
    const userdata = JSON.parse(localStorage.getItem('user'));
    const [isOpen, setIsOpen] = useState(false);
    const [coupon, setCoupon] = useState([]);
    const [specificCoupon, setSpecificCoupon] = useState([]);
    const [name, setName] = useState();

    const getName = () => {
        Axios.get(`${BaseUrl}/view-user-name/${userdata._id}`).then(
            res => {
                console.log('nm', res)
                setName(res.data.data.name)
            }
        )
    }

    const getCoupon = () => {
        Axios.get(`${BaseUrl}/view-coupon/${userdata._id}`).then(
            res => {
                if (res.data.data.specificusercoupon.length <= 0) {
                    console.log("AnyUser", res.data.data.anyusercoupon)
                    setSpecificCoupon(res.data.data.anyusercoupon)
                } else {
                    setSpecificCoupon(res.data.data.anyusercoupon)
                }
            }
        )
    }
    console.log('COUPON', specificCoupon)
    useEffect(() => {
        getCoupon()
        getName();

    }, [])

    return (
        <>
            <Header />

        </>
    )
}


export default Index;

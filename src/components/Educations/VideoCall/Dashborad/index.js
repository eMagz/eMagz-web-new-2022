import React from 'react'
import "./index.css"
import Header from "../../Header"
import ContactList from "../ContactList"
import { Row, Col } from "react-bootstrap"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
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

const index = () => {
    return (
        <div>
            <Header />
            <Row>
                <Col md={4}>
                    
                </Col>
                <Col md={8}>
                    <Router>
                        <Switch>
                         <Route path="/video-conference/dashborad/home" component={ContactList} />
                        </Switch>
                    </Router>
                </Col>
            </Row>
        </div>
    )
}

export default index

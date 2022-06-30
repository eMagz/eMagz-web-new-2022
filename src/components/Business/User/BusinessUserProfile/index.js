import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import './index.css';
import {ImageUrl} from '../../../API';
import {useHistory} from 'react-router-dom';
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
import PersonalInformation from '../PersonalInformation';
import ManageAdress from '../ManageAddress';
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import swal from "sweetalert"


const BusinessUserProfile=()=>{

const userdata = JSON.parse(localStorage.getItem('user'));
const history = useHistory();
const[geturl,setGetUrl]=useState('');

const changePage=(url)=>{
  setGetUrl(url)

history.push(url)
}

const logoutUserProfile = () =>{
  console.log('Clicked')
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warring",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
}
return(
    <>
    <Header/>
    <div  className='userProfile_container' >
        <div className='leftbar'>
          <div className='usercard'>
             <div className='profile_details'>
                 <div style={{marginTop:'20px'}}>
                 <img src={userdata.image} style={{width:50,height:50,borderRadius:'50%',marginTop:'0px'}} />
                 </div>
                 <div style={{marginTop:'20px'}}>
                     Hello,
                     <div style={{marginRight:20}}>
                         {userdata.name}
                     </div>
                 </div>
             </div>
          </div>
          <div className='setting_list'>
             <List component="nav">
             <ListItem onClick={()=>changePage('/business/profile/my-orders')} button>
          <ListItemIcon>
            <OpenInBrowserIcon />
          </ListItemIcon>
          <ListItemText primary="My Orders" />
        </ListItem>
        <Divider/>
       <Link to='/business/profile'>
       <ListItem  button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile Information" />
        </ListItem>
       </Link>
        <Link to='/business/profile/manage-address' >
        <ListItem button>
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Addresses" />
        </ListItem>
        </Link>
        <Divider/>
        <ListItem button>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="My Wishlist" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CardGiftcardIcon />
          </ListItemIcon>
          <ListItemText primary="My Coupons" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarsIcon />
          </ListItemIcon>
          <ListItemText primary="My Reviews & Ratings" />
        </ListItem>
        <Divider/>
        <ListItem button onClick={logoutUserProfile}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
        </List>
          </div>
        </div>
        <div className='rightbar'>
           <div className='rigtside_setting_card'>  
           </div>
        </div>
    </div>
    </>
    
)


}

export default BusinessUserProfile;




















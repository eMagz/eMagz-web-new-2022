import React, {useEffect} from 'react'
import Hamburger from '../HamburgerIcon';
import './index.css'
import { ImageUrl } from "../../API"
import { useSelector } from "react-redux"
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import SettingsIcon from '@material-ui/icons/Settings';
import DescriptionIcon from '@material-ui/icons/Description';
import SecurityIcon from '@material-ui/icons/Security';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router-dom";
import { Link, Switch, Route } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTshirt } from '@fortawesome/free-solid-svg-icons';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import PaymentIcon from '@material-ui/icons/Payment';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import PagesIcon from '@material-ui/icons/Pages';
import WebIcon from '@material-ui/icons/Web';

let vendor = JSON.parse(localStorage.getItem('vendor'))


const Sidebar = props => {
  const history = useHistory();
  const vendorDetails = useSelector(state =>state.vendorReducer.vendorDetails)
  if(Object.keys(vendorDetails).length !==0){
    vendor = vendorDetails
  }
  const changePage = () => {
    localStorage.removeItem('vendor')
    history.push('/')
  }
  let drawerClasses = 'side-businessdrawer';
  if (props.open) {
    drawerClasses = 'side-businessdrawer open';
  }
 useEffect(()=>{
   vendor = JSON.parse(localStorage.getItem('vendor'))
 }, [])
 
  return (
    <div className={drawerClasses}>
      <div className='buss_heading' >
        <div style={{ margin: '10px 0px 0px 10px' }} >
          <Avatar alt="Remy Sharp" src={vendor.logo} />
        </div>
        <div style={{ flex: 1 }} />
        <div className='hambutton1' onClick={props.close}>
          <Hamburger color="black" />
        </div>
      </div>
      <div className='prof'>
        <h5 className='name'>{vendor.name}</h5>
        <Link to="/business/edit-approve-form">
          <i class="fas fa-edit"></i>
        </Link>
      </div>
      <div className='email' >{vendor.gmail}</div>
      <div style={{ marginTop: '10px' }} >
        <List component="nav" >
        <Link to='/dashboard'  >
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Main Section" />
            </ListItem>
          </Link>
          <Link to='/bussiness/dashboard'  >
            <ListItem button>
              <ListItemIcon>
                <WebIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to='/business/vendor-dashboard/product-list'>
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon icon={faTshirt} />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </Link>
          <Link to='/business/vendor-dashboard/orders' >
            <ListItem button>
              <ListItemIcon>
                <OpenInBrowserIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          </Link>
          <Link to='/business/vendor-dashboard/coupons' >
            <ListItem button>
              <ListItemIcon>
                <OpenInBrowserIcon />
              </ListItemIcon>
              <ListItemText primary="Coupons" />
            </ListItem>
          </Link>
          <Link to='/business/vendor-dashboard/payments-view'  >
            <ListItem button>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary="Payments" />
            </ListItem>
          </Link>

        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemIcon   >
              <LiveHelpIcon />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItem>
          <ListItem onClick={changePage} button>
            <ListItemIcon   >
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </div>
  )
}
export default Sidebar;

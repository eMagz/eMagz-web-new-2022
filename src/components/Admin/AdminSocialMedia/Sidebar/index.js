import React from 'react'
import Hamburger from '../../HamburgerIcon';
import './index.css'
import { ImageUrl } from "../../../API"
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

let adminuser = JSON.parse(localStorage.getItem('Admin'))

let businessname

const Sidebar = props => {

  const admin = useSelector(state => state.loginReducer.adminDetails)
  if (Object.keys(admin).length !== 0) {
    adminuser = admin
  }
  const history = useHistory();

  const changePage = () => {
    localStorage.removeItem('Admin')
    history.push('/')
  }
  let drawerClasses = 'side-businessdrawer';
  if (props.open) {
    drawerClasses = 'side-businessdrawer open';
  }
  return (
    <div className={drawerClasses}>
      <div className='buss_heading' >
        <div style={{ margin: '10px 0px 0px 10px' }} >
          <Avatar alt="admin" src={adminuser.image} />
        </div>
        <div className='prof'>
        <h5 className='name'>{adminuser.name}</h5>
      </div>
        <div style={{ flex: 1 }} />
        <div className='hambutton1' onClick={props.close}>
          <Hamburger color="black" />
        </div>
      </div>
      <div className='email' >{adminuser.email}</div>
      <div style={{ marginTop: '10px' }} >
        <List component="nav" >
        <Link to='/admin/dashboard'  >
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Main Section" />
            </ListItem>
          </Link>
          <Link to='/admin/education/dashboard'>
            <ListItem button>
              <ListItemIcon>
                <WebIcon />
              </ListItemIcon>
              <ListItemText primary="Dashborad" />
            </ListItem>
          </Link>
          <Link to='/admin/emagz/acvtive-users'>
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon icon={faTshirt} />
              </ListItemIcon>
              <ListItemText primary="Active Users" />
            </ListItem>
          </Link>
          <Link to='/admin/emagz/deacvtive-users'>
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon icon={faTshirt} />
              </ListItemIcon>
              <ListItemText primary="Deactivated Users" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
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
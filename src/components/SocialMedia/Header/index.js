import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Logo from '../../../assets/newlogo.png';
import { Col, Row, Form, FormGroup,Input } from 'reactstrap';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Navbar() {


const history = useHistory();

const changePage=()=>{

history.push('/eMagz/myprofile')
}

const changeChatPage =()=>{


history.push('/eMagz/chat')

}


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={changePage}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton  aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
            <div style={{transform:'translateY(-10px)'}} >
            <img  style={{width:'40px',height:'40px',borderRadius:'50%'}}  src={Logo} />
            </div>
         <div style={{display:'flex',flexDirection:'row',marginTop:'10px'}} >
             <div  style={{transform:'translateX(70px)'}} >
             <Form>
      <Row form>
        <Col >
          <FormGroup>
           
            <Input type="email" name="email" id="exampleEmail" placeholder="Search..." />
          </FormGroup>
        </Col>
        </Row>
        </Form>
             </div>
             <div style={{transform:'translateX(30px)',marginTop:'6px'}} >
                 <SearchIcon/>
             </div>
        
         </div>
         
         
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
              <IconButton style={{outline:'none'}} color="inherit">
                  <HomeIcon/>
              </IconButton>
              <Link   to='/eMagz/chat' >
              <IconButton style={{outline:'none'}} onClick={changeChatPage}  >
                <SendIcon style={{color:'white'}}/>
            </IconButton>
              </Link>
            
            <IconButton style={{outline:'none'}} aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
            style={{outline:'none'}}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt="Remy Sharp" src="data:image/jpeg;base64,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" className={classes.small} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

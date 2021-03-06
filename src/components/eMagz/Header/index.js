import React, { useEffect, useState } from 'react';
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
import { Col, Row, Form, FormGroup, Input } from 'reactstrap';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import { BaseUrl, ImageUrl } from '../../API'
import axios from 'axios';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Dictionary from '../../Dictionary';
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
  const redirect = (url) => {
    history.push(url)
  }
  const [notify, setNotify] = useState(0);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const [social, setSocial] = useState({});
  const [isRender, setIsRender] = useState(false)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  useEffect(() => {
 
    let user = localStorage.getItem('user');
    if (user != null) {
      user = JSON.parse(user);
      setUser(user)
      axios.get(`${BaseUrl}/social-profile/${user._id}`).then(res => {
        if (res.data.status == false) {
          user.picture= user.image;
          setSocial(user)
        } else {
          setSocial(res.data.data)
        }
      })
      axios.get(`${BaseUrl}/notification-count/${user._id}`).then(res => {
        if (res.data.status == true) {
          setNotify(res.data.data);
        }
      })
    }
  }, [])
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
 
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  function logout(){
    localStorage.clear();
    redirect('/login')
  }
  const handleClick = () => setIsRender(!isRender)
  const menuId = 'primary-search-account-menu';
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
        <IconButton aria-label="show 4 new mails" color="inherit">
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
        {isRender  && <Dictionary status="true" />}
      <AppBar position="static">
        <Toolbar>
          <div style={{ transform: 'translateY(-10px)' }} >
            <img style={{ width: '50px', height: '50px', borderRadius: '50%',border:"4px solid #ffffff" }} src={Logo} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }} >
            <div style={{ transform: 'translateX(70px)' }} >
              <Form>
                <Row form>
                  <Col >
                    <FormGroup>
                      <Input style={{ minWidth: 300 }} type="email" name="email" id="exampleEmail" placeholder="Search..." />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </div>
            <div style={{ transform: 'translateX(30px)', marginTop: '6px' }} >
              <SearchIcon />
            </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            
            <IconButton style={{ outline: 'none',height:48 }} onClick={() => { redirect('/eMagz/chat') }}  >
              <SendIcon style={{ color: 'white' }} />
            </IconButton>
            <IconButton onClick={() => { redirect('/eMagz/notifications') }} style={{ outline: 'none',height:48 }} aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={notify} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton style={{ outline: 'none',height:48 }} color="inherit">
              <HomeIcon onClick={() => { redirect('/eMagz') }} />
            </IconButton>
            <IconButton style={{ outline: 'none',height:48 }} onClick={()=>handleClick()} color="inherit">
              <MenuBookIcon  />
            </IconButton>
            <IconButton style={{ outline: 'none',height:48 }} color="inherit">
              <Dropdown direction={"left"} isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle style={{ backgroundColor: "#f05458", border: 0 }} caret><Avatar alt={social.name} src={social.picture} /> </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem disabled>{social.name}</DropdownItem>
                  <DropdownItem onClick={() => { redirect('/eMagz/profile') }}>Profile</DropdownItem>
                  <DropdownItem onClick={() => logout()}>LogOut</DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
    </div>
  );
}

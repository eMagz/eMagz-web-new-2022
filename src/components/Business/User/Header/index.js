import React, { useEffect, useState,useRef } from 'react';
import './index.css';
import Logo from '../../../../assets/newlogo.png';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import HomeIcon from '@material-ui/icons/Home';
import Dictionary from "../../../Dictionary"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SendIcon from '@material-ui/icons/Send';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import { BaseUrl, ImageUrl } from '../../../API'
import { useHistory, Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { getCartData } from '../../../ReduxStore/Actions/CartActions';

const UserHeader = () => {
  // alert("userheader")
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [searchItems, setSearchItems] = useState([]);
const cartdata = useSelector(state=> state.cartReducer.cart)
const[cartnum,setCartnum]=useState(cartdata.length);
const[searchText,setSearchText]=useState('');
const anchorRef = useRef(null);
const [open, setOpen] = React.useState(false);
const [isRender, setIsRender] = useState(false)
const userdata = JSON.parse(localStorage.getItem('user'));


console.log('mm',userdata);

const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen);
};

const handleClose = (event) => {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
  }

  setOpen(false);
};

function handleListKeyDown(event) {
  if (event.key === 'Tab') {
    event.preventDefault();
    setOpen(false);
  }
}
const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleClick = () => setIsRender(!isRender)
  const history = useHistory();
  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user != null) {
      user = JSON.parse(user);
      setUser(user);
      axios.get(`${BaseUrl}/view-cart/${user._id}`).then(
      res=> {
          console.log('respnse', res.data.data)
          if(res.data.status=== true){
            dispatch(getCartData(res.data.data.cart))
          }
        }
      )
    }
  }, [])
  const redirect = (url) => { history.push(url) }
  const logout = () => { localStorage.clear(); redirect('/login') }
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

const changePage=(url)=>{
  history.push(url);
}


const handleSearch = (e) =>{

  e.preventDefault()
  setSearchText(e.target.value)
  if(e.target.value.length>0){
    console.log("e.target.value", e.target.value)
    axios.get(`${BaseUrl}/search-product/${e.target.value}`)
    .then((res)=>{
      setSearchItems(res.data.data.productDetails)
    })  
  }
}

 console.log("search Items", searchItems)
  return (
    <>
       {isRender  && <Dictionary status="true" />}
      <div className='user_header shadow' >
        <div className='user_header_container'>
          <div>
            <img style={{ width: '50px', height: '50px', borderRadius: '50%', border: "4px solid #ffffff", marginTop: 0 }} src={Logo} />
          </div>
          <div className='user_search' >
            <FontAwesomeIcon className='searchicon' icon={faSearch} />
            <form>
              <input value={searchText} onChange={(e)=>handleSearch(e)} className='user_header_input' placeholder='Search.....' />
              {searchItems.length > 0 ? <ul className='productSearchHeader' >
                    {searchItems.map((list) => {
                      return (
                        <Link to="/business/product-details"><li className="searchListItem">{list.name}</li></Link>
                      )
                    })}
                  </ul> : null}
            </form>
          </div>
          <div style={{ flex: 1 }} />
          <div  style={{display:'flex',flexDirection:'row',minWidth:'200px'}} >
          <div>
            <IconButton onClick={() => { redirect('/business/user-dashboard') }}>
              <HomeIcon style={{ color: 'white' }} />
            </IconButton>
          </div>
          <div>
            <IconButton onClick={()=>handleClick()}>
              <MenuBookIcon style={{ color: 'white' }} />
            </IconButton>
          </div>
          <div>
            <IconButton onClick={() => { 
              setCartnum(cartdata.length)
              redirect('/business/carts') }}>
              <Badge badgeContent={cartdata.length} color="secondary">
                <ShoppingCartIcon style={{ color: 'white' }} />
              </Badge>
            </IconButton>
          </div>
         <div>
          
              {/* <Dropdown  isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle style={{ backgroundColor: "#f05458", border: 0 }} caret><Avatar alt={user.name} src={ImageUrl + user.image} /> </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem disabled>{user.name}</DropdownItem>
                  <DropdownItem onClick={() => { redirect('/business/profile') }}>Profile</DropdownItem>
                  <DropdownItem onClick={() => logout()}>LogOut</DropdownItem>
                </DropdownMenu>
              </Dropdown>
             */}
         <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
         <MoreVertIcon/> 
        </IconButton>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={()=>changePage('/business/profile')}><img 
                    style={{width:28,height:28,borderRadius:'50%',marginTop:'0px',marginRight:'5px'}}
                     src={userdata.image} />{userdata.name}</MenuItem>
                    <MenuItem onClick={() => logout()}>
                     <ExitToAppIcon style={{marginRight:'5px'}} /> Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
         </div>
          </div>
          
        </div>
      </div>
    </>
  )


}



export default UserHeader;





{/* <div>
<Dropdown  isOpen={dropdownOpen} toggle={toggle}>
  <DropdownToggle style={{ backgroundColor: "#f05458", border: 0 }} caret><Avatar alt={user.name} src={ImageUrl + user.image} /> </DropdownToggle>
  <DropdownMenu>
    <DropdownItem disabled>{user.name}</DropdownItem>
    <DropdownItem onClick={() => { redirect('/business/profile') }}>Profile</DropdownItem>
    <DropdownItem onClick={() => logout()}>LogOut</DropdownItem>
  </DropdownMenu>
</Dropdown>
</div> */}




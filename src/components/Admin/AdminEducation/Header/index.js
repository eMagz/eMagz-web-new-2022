import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import './index.css';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Backdrop from '../../../Backdrop';
import Sidebar from '../Sidebar';
// import Logo from '../../assets/Logo.png';
import Hamburger from '../../HamburgerIcon';

export default function Dashboard(props) {
    console.log('Header Props ', props)
    const [opendrawer, setOpendrawer] = useState(false)
    const onClickopen = () => {
        setOpendrawer((prevStat) => {
            console.log(prevStat)
            return !prevStat
        })
    }
    const onClickclose = () => {
        setOpendrawer(false);
    }
    let backDrop;
    if (opendrawer) {
        backDrop = <Backdrop close={onClickclose} />
    }
    return (
        <div>
            <div className='navbusinessbar shedow'>
                <Sidebar close={onClickclose} open={opendrawer} />
                {backDrop}
                <div className='hambutton'  onClick={onClickopen}>    
                <Hamburger />
                </div>
                <div>
                    <Typography variant="h4" noWrap className="pageName">{props.pageName}</Typography>
                    {/* <img  src={Logo} /> */}
                </div>
                <div className='bellicon'  >
                    <IconButton>
                        <NotificationsActiveIcon style={{color: "white", marginTop: "10px"}} />
                    </IconButton>
                </div>
            </div>

        </div>
    )



}























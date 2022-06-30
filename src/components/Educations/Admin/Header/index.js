import React, { useState } from 'react'
import Backdrop from '../../../Backdrop';
import Sidebar from '../Adminsidebar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import './index.css';
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Header = () => {


const history = useHistory();

const changePage=()=>{
    history.push('/educations/chat')
}



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
    let backEducationDrop;
    if (opendrawer) {
        backEducationDrop = <Backdrop close={onClickclose} />
    }
    return (
        <>
            <div>
                <div className='edu_appbar' >
                    <Sidebar close={onClickclose} open={opendrawer} />
                    {backEducationDrop}
                    <div className='lefticons' >
                        <IconButton onClick={changePage} style={{ marginRight: '10px' }} >
                            <ChatBubbleIcon style={{ color: 'black' }} />
                        </IconButton>
                        <IconButton>
                            <NotificationsIcon style={{ color: 'black' }} />
                        </IconButton>
                        <div>
                            <form>
                                <input type='text' placeholder="Search..." />
                            </form>
                        </div>
                    </div>
                    <div style={{ marginRight: '10px' }} >
                        <IconButton onClick={onClickopen}  >
                            <MenuIcon style={{ color: 'black' }} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Header;










































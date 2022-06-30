import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import './index.css';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Backdrop from '../../../Backdrop';
import Sidebar from '../AdminSidebar';
import Logo from '../../../../assets/Logo.png';

export default function Dashboard(props) {
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
            <div className='navappbar shedow'  >
                <Sidebar close={onClickclose} open={opendrawer} />
                {backDrop}
                <div>
                    <IconButton onClick={onClickopen}  >
                        <MenuIcon fontSize='large' style={{ color: '#FFFFFF' }} />
                    </IconButton>
                </div>
                <div>
                    <Typography variant="h4" noWrap style={{ color: '#FFFFFF',marginTop:10 }} >{props.title}</Typography>
                </div>
                <div className='bellicon'  >
                    <IconButton>
                        <NotificationsActiveIcon style={{ color: '#FFFFFF',marginTop:10 }} />
                    </IconButton>
                </div>
            </div>

        </div>
    )
}























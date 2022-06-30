import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import IconButton from '@material-ui/core/IconButton';
import Header from '../Header';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import './home.css';




const useStyles = makeStyles((theme) => ({

    large: {
        marginTop: "0px !important",
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const Home = () => {
    const classes = useStyles();

    return (
        <>
            <Header />
            <div className='card_container' >
                <div className='main_card' >
                    <div className='cards' >
                        <div className='card_header' >
                            <div style={{ marginLeft: '5px' }} >
                                <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.large} />
                            </div>

                            <div   >
                                <h5>
                                    Debanjan Goswami
                     </h5>

                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px' }} ><div  ><LocationOnIcon style={{ fontSize: '15px', marginBottom: '5px' }} /></div><p>Kolkata,West Bengal, India</p></div>
                            </div>
                            <div style={{ flex: 1 }} />
                            <div  ><button className="edubtn edubtn1">Teacher</button></div>
                        </div>
                        <div className='subcards' >
                            <div className='textcontent' >
                                <p> Those who are not present in todays class shall download the notes from here.</p>
                            </div>
                            <div className='bttm_icons'>
                                <IconButton>
                                    <ThumbUpOutlinedIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='main_card' >
                    <div className='cards' >
                        <div className='card_header' >
                            <div style={{ marginLeft: '5px' }} >
                                <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.large} />
                            </div>

                            <div   >
                                <h5>
                                    Debanjan Goswami
                     </h5>

                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px' }} ><div  ><LocationOnIcon style={{ fontSize: '15px', marginBottom: '5px' }} /></div><p>Kolkata,West Bengal, India</p></div>
                            </div>
                            <div style={{ flex: 1 }} />
                            <div  ><button className="edubtn edubtn1">Teacher</button></div>
                        </div>
                        <div className='subcards' >
                            <div className='textcontent' >
                                <p> Those who are not present in todays class shall download the notes from here.</p>
                            </div>
                            <div className='bttm_icons'>
                                <IconButton>
                                    <ThumbUpOutlinedIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='main_card' >
                    <div className='cards' >
                        <div className='card_header' >
                            <div style={{ marginLeft: '5px' }} >
                                <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.large} />
                            </div>

                            <div   >
                                <h5>
                                    Debanjan Goswami
                     </h5>

                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px' }} ><div  ><LocationOnIcon style={{ fontSize: '15px', marginBottom: '5px' }} /></div><p>Kolkata,West Bengal, India</p></div>
                            </div>
                            <div style={{ flex: 1 }} />
                            <div  ><button className="edubtn edubtn1">Teacher</button></div>
                        </div>
                        <div className='subcards' >
                            <div className='textcontent' >
                                <p> Those who are not present in todays class shall download the notes from here.</p>
                            </div>
                            <div className='bttm_icons'>
                                <IconButton>
                                    <ThumbUpOutlinedIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='main_card' >
                    <div className='cards' >
                        <div className='card_header' >
                            <div style={{ marginLeft: '5px' }} >
                                <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.large} />
                            </div>

                            <div   >
                                <h5>
                                    Debanjan Goswami
                     </h5>

                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px' }} ><div  ><LocationOnIcon style={{ fontSize: '15px', marginBottom: '5px' }} /></div><p>Kolkata,West Bengal, India</p></div>
                            </div>
                            <div style={{ flex: 1 }} />
                            <div  ><button className="edubtn edubtn1">Teacher</button></div>
                        </div>
                        <div className='subcards' >
                            <div className='textcontent' >
                                <p> Those who are not present in todays class shall download the notes from here.</p>
                            </div>
                            <div className='bttm_icons'>
                                <IconButton>
                                    <ThumbUpOutlinedIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='main_card' >
                    <div className='cards' >
                        <div className='card_header' >
                            <div style={{ marginLeft: '5px' }} >
                                <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.large} />
                            </div>

                            <div   >
                                <h5>
                                    Debanjan Goswami
                     </h5>

                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px' }} ><div  ><LocationOnIcon style={{ fontSize: '15px', marginBottom: '5px' }} /></div><p>Kolkata,West Bengal, India</p></div>
                            </div>
                            <div style={{ flex: 1 }} />
                            <div  ><button className="edubtn edubtn1">Teacher</button></div>
                        </div>
                        <div className='subcards' >
                            <div className='textcontent' >
                                <p> Those who are not present in todays class shall download the notes from here.</p>
                            </div>
                            <div className='bttm_icons'>
                                <IconButton>
                                    <ThumbUpOutlinedIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='main_card' >
                    <div className='cards' >
                        <div className='card_header' >
                            <div style={{ marginLeft: '5px' }} >
                                <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className={classes.large} />
                            </div>

                            <div   >
                                <h5>
                                    Debanjan Goswami
                     </h5>

                                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px' }} ><div  ><LocationOnIcon style={{ fontSize: '15px', marginBottom: '5px' }} /></div><p>Kolkata,West Bengal, India</p></div>
                            </div>
                            <div style={{ flex: 1 }} />
                            <div  ><button className="edubtn edubtn1">Teacher</button></div>
                        </div>
                        <div className='subcards' >
                            <div className='textcontent' >
                                <p> Those who are not present in todays class shall download the notes from here.</p>
                            </div>
                            <div className='bttm_icons'>
                                <IconButton>
                                    <ThumbUpOutlinedIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                                <IconButton>
                                    <ChatBubbleIcon />
                                </IconButton>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )



}


export default Home;











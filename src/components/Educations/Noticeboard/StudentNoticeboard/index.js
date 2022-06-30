import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import IconButton from '@material-ui/core/IconButton';
import Header from '../../Header';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import './index.css';
import Button from '@material-ui/core/Button';
import Pin from '../../../../assets/pin.png'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { BaseUrl } from '../../../API';



const useStyles = makeStyles((theme) => ({

  large: {
    marginTop: "0px !important",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));





const StudentNoticeboard = (props) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [noticedata, setNoticedata] = useState([])
  const [notice, setNotice] = useState({})
  const toggle = () => setModal(!modal);

  const {
    buttonLabel,
    className
  } = props;


  const getNoticeboard = (school_id) => {


    axios.get(`${BaseUrl}/viewnoticeboard/${school_id}`).then
      (res => {
        const noticedata = res.data.data;
        console.log('ee', noticedata);
        setNoticedata(noticedata);
      })


  }

  useEffect(() => {
    const education = localStorage.getItem("education");
    if (education != null) {
     let  user=JSON.parse(education)
      getNoticeboard(user.data.school_id);
    }
   
  }, [])


  const ViewMore = (notice) => {
    setNotice(notice)
    console.log('dd', notice)

    toggle()
  }




  return (
    <>
      <Header />
      <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>{notice.description}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
      <div className='card_container' >
        {noticedata.map((notice, index) => {
          return (
            <>
              <div className='main_card' >
                <div className='cards' >
                  <div className='card_header' >
                    <div className='pindiv'>
                      <img className='pin' src={Pin} />
                    </div>
                    <div style={{ flex: 1 }} />
                    {notice.principal.length <= 0 ? <div className="edubtn edubtn1">Teacher</div> : <div className="edubtn edubtn1">Principal</div>}
                  </div>
                  <div className='card_body'>
                    <p>{notice.description}</p>
                  </div>
                  <div className='viewmore'>
                    <Button onClick={() => ViewMore(notice)} color="primary"><b>View More</b></Button>
                  </div>
                </div>
              </div>
            </>
          )
        })}







      </div>
    </>
  )



}


export default StudentNoticeboard;




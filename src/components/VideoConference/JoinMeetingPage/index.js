import React, {useState, useEffect} from 'react'
import "./index.css"
import Header from "../../Header"
import Loader from "./Loader"
import {useSelector} from "react-redux"
import {Row, Col, Button} from "reactstrap"
import { BaseUrl, ImageUrl } from '../../API';
import socket from '../../socket';
import axios from "axios"
import {useHistory} from "react-router-dom"

let userData = 0
let userDetails = JSON.parse(localStorage.getItem('user'))

const Index = ({match}) => {
    localStorage.setItem('meeting_id', match.params.id)
    const userInfo = useSelector((state)=>state.loginReducer.userDetails)
    if(Object.keys(userInfo).length !== 0){
        userDetails = userInfo
    }
    const history  = useHistory()
    const [mettingDetails, setMettingDetail] = useState({})
    const [acceptedMessage, setAcceptedMessage] = useState('')
    const [loading, setLoading] = useState(false)
    console.log('Props', match.params.id)

    const getMettingDetails = () =>{
        setLoading(true)
        axios.get(`${BaseUrl}/meeting-details/${match.params.id}`).then((res)=>{
            setLoading(false)
            setMettingDetail(res.data.data)
        })    
    }
    useEffect(() => {
        userData = JSON.parse(localStorage.getItem('user'))
        if(userData !== null){
            socket.emit('JoinRoom', match.params.id)
            getMettingDetails()
        }else{
            history.push('/')
        } 
    },[])
    const handleJoin = () =>{
        const messageText = 'Please accept me'
        let messageData = {
            RoomId: match.params.id,
            message: messageText,
            name: userData.name,
            user_id: userData._id,
            image: userData.image
          }
          console.log('Send Data', messageData)
        socket.emit('SendVideoConferenceMessage', messageData)
    }
      socket.on('RecieveAcceptMessage', data => {
        console.log('Accepted Message', data)
        setAcceptedMessage(data.RoomId)
      })
      useEffect(()=>{
         if(acceptedMessage !== ''){
            history.push('/video-conference/dashborad/connect', match.params.id)
         }
      }, [setAcceptedMessage,acceptedMessage])
    return (
        <>
        {
           userData && <Header /> 
        } 
            <div>
                {loading ? (<Loader />) : (
                    <div className="joinContainer">
                    <div style={{minWidth: "15rem"}}>
                      <Row>
                          <Col md={4}>Name</Col>
                          <Col md={8}>{mettingDetails.name}</Col>
                      </Row>
                      <Row>
                          <Col md={8}>Start Time: </Col>
                          <Col md={4}><strong>{mettingDetails.starttime}</strong></Col>
                      </Row>
                      <Row>
                          <Col md={8}>End Time: </Col>
                          <Col md={4}><strong>{mettingDetails.endtime}</strong></Col>
                      </Row>
                      <Row>
                          <Col md={4}>Today: </Col>
                          <Col md={8}>{mettingDetails.date}</Col>
                      </Row>
                      <Row style={{marginTop: "40px"}}> 
                         <Button onClick={handleJoin} text="center" color="primary">Join Now</Button> 
                      </Row>
                    </div>  
                </div>    
                )}
            </div>
        </>
    )
}

export default Index

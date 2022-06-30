import React, { useState, useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"
import CircularProgress from '@material-ui/core/CircularProgress';
import { BaseUrl } from "../API"
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Backdrop from '../Backdrop';
import Sidebar from '../Sidebar';
import Logo from '../../assets/Logo.png';
import EditIcon from '@material-ui/icons/Edit';
import { Modal, ModalHeader, ModalBody, Row, Col, FormGroup, Label, Input } from "reactstrap"
import { Button } from "@material-ui/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useLoggerFactory } from '@material-ui/data-grid';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Dictionary from "../Dictionary"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "30vh",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export default function Dashboard(props) {
    const [opendrawer, setOpendrawer] = useState(false)
    const [open, setOpen] = useState(false);
    const [dic, setDic] = useState([]);
    const [langCode, setLangCode] = useState('en-gb');
    const [isLoading, setIsLoading] = useState(true);
    const [empty, setEmpty] = useState('')
    const [word, setWord] = useState('');
    const [result, setResult] = useState(null)
    const [isRender, setIsRender] = useState(false)

    const [resultEntries, setResultEntries] = useState([])
    const classes = useStyles();
    const toggle = () => setOpen(!open)

    const onClickopen = () => {
        setOpendrawer((prevStat) => {
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


    const handleWordText = (e) => {
        setWord(e.target.value)
        // if(e.target.value.length>0){

        //     setIsLoading(true)
        // }else{
        //     setIsLoading(false)
        // }
    }
    const getLanguageCode = () => {
        axios.get(`${BaseUrl}/view-language-codes`).then((res) => {
            setDic(res.data.data)
        })
    }

    const handleDic = () => {
        toggle()
    }

    useEffect(() => {
        getLanguageCode()
    }, [])

    const handleLangCode = (e) => {
        setLangCode(e.target.value)
    }

    const handleClick = () => setIsRender(!isRender)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post(`${BaseUrl}/dictionary-data/${langCode}/${word}`).then((res) => {
            if (res.data.data == 0) {
                setEmpty('Data not found!')
                setIsLoading(false)
            } else {
                setResult(res.data.data[0].lexicalEntries[0])
                setResultEntries(res.data.data[0].lexicalEntries[0].entries[0])
                setIsLoading(false)
            }
        })
    }
    console.log('setResult', result)
    return (
        <div>
            {isRender  && <Dictionary status="true" />}
            <div className='navappbar shedow'  >
                <Sidebar close={onClickclose} open={opendrawer} />
                {backDrop}
                <div>
                    <IconButton onClick={onClickopen}  >
                        <MenuIcon fontSize='large' style={{ color: '#FFFFFF' }} />
                    </IconButton>
                </div>
                <div>
                    <Typography variant="h4" noWrap style={{ color: '#FFFFFF', marginTop: 10 }} >{props.title}</Typography>
                </div>
                <div className='bellicon'  >
                    <IconButton>
                        <NotificationsActiveIcon style={{ color: '#FFFFFF', marginTop: "5px"}} />
                    </IconButton>
                    <IconButton onClick={()=>handleClick()}>
                        <MenuBookIcon style={{ color: '#FFFFFF', marginTop: "5px"}} />
                    </IconButton>
                </div>
            </div>
           
        </div>
    )   
}























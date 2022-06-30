import React, {useState, useEffect} from "react"
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import { Modal, ModalHeader, ModalBody, Row, Col, FormGroup, Label, Input } from "reactstrap"
import { Button } from "@material-ui/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useLoggerFactory } from '@material-ui/data-grid';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BaseUrl } from "../API"
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';


const useStyles = makeStyles((theme) => ({
    root: {
        height: "30vh",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
}));

const Dictionary = (props) => {

    console.log("Props", props)
    const [opendrawer, setOpendrawer] = useState(props.isOpen)
    const [open, setOpen] = useState(props.status);
    const [dic, setDic] = useState([]);
    const [langCode, setLangCode] = useState('en-gb');
    const [isLoading, setIsLoading] = useState(true);
    const [empty, setEmpty] = useState('')
    const [word, setWord] = useState('');
    const [result, setResult] = useState(null)
    const [resultEntries, setResultEntries] = useState([])
    const classes = useStyles();

    const toggle = () => setOpen(!open)

    
    const handleWordText = (e) => {
        setWord(e.target.value)
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
       <>
        <div>

        </div>
          <Modal isOpen={open} toggle={toggle} >
                <ModalHeader toggle={toggle}>Dictionary</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label for="examplePassword">Select Language Region</Label>
                                <Input onChange={(e) => handleLangCode(e)} type="select" placeholder="password placeholder" >
                                    <option value={langCode}>English (UK)</option>
                                    {dic.map(val => {
                                        return (
                                            <option value={val.language_code}>{val.language_region}</option>
                                        )
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <div className='user_search' style={{ marginLeft: "0px" }}>
                                <FontAwesomeIcon className='searchicon' icon={faSearch} />
                                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                                    <input value={word} onChange={(e) => handleWordText(e)} className='user_header_input' style={{ width: "100%" }} placeholder='Type a word and hit enter' />
                                </form>
                            </div>
                        </Col>
                    </Row>
                    <div>
                        {
                            isLoading ? (
                                <div className={classes.root}>
                                    <CircularProgress color="secondary" />
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <p style={{textAlign: "start"}}><strong>{result.lexicalCategory.text}</strong></p>
                                    </div>
                                    <div>
                                        <p style={{textAlign: "start"}}><strong>Definitions: </strong> {resultEntries.senses[0].definitions}</p>
                                    </div>
                                   {
                                      resultEntries.inflections &&  (
                                                 <>
                                                    <h5><strong>Verv forms</strong></h5>
                                                    <ul className="inflections">
                                                        {
                                                            resultEntries.inflections.map((item) => (
                                                                <li>{item.inflectedForm}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                 </>
                                             )
                                   }
                                   {
                                       resultEntries.notes && <div><p style={{textAlign: "start"}}><strong>Notes: </strong>{resultEntries.notes[0].text}</p></div>
                                   }
                                    <h5><strong>Examples</strong></h5>
                                    <ol>
                                        {
                                            resultEntries.senses[0].examples && resultEntries.senses[0].examples.map((item) => (
                                                <li>{item.text}</li>
                                            ))
                                        }
                                    </ol>
                                    {
                                      resultEntries.senses[0].synonyms &&   (
                                                <>
                                                    <h5><strong>Synonyms</strong></h5>
                                                    <ol>
                                                        <li className="synonyms">{resultEntries.senses[0].synonyms.map(function (elem) {
                                                            return elem.text;
                                                        }).join(", ")}</li>
                                                    </ol>
                                                </>
                                        )
                                    }
                                    {
                                       result.phrasalVerbs &&  (
                                                <>
                                                    <h5><strong>Phrasal verbs</strong></h5>
                                                    <ol>
                                                        <li className="synonyms">{result.phrasalVerbs.map(function (elem) {
                                                            return elem.text;
                                                        }).join(", ")}</li>
                                                    </ol>
                                                </>
                                         )
                                    }
                                    {
                                        result.phrases && (
                                                <>
                                                    <h5><strong>Phrases</strong></h5>
                                                    <ol>
                                                        <li className="synonyms">{result.phrases.map(function (elem) {
                                                            return elem.text;
                                                        }).join(", ")}</li>
                                                    </ol>
                                                </>
                                        )
                                       
                                    }
                                   
                                    {
                                        result.derivatives && (
                                            <Row>
                                                <Col md="12">   Derivetives : <h5>{result.derivatives[0].text}</h5> </Col>
                                            </Row>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </ModalBody>
            </Modal>
       </>
    )
}

export default Dictionary

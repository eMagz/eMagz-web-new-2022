import React, { useState, useEffect } from 'react';
import './index.css';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Header from '../Header'
import SearchIcon from '@material-ui/icons/Search';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import ClearIcon from '@material-ui/icons/Clear';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BaseUrl } from '../../API'
import Axios from 'axios';

import swal from '@sweetalert/with-react'





const TeacherLeave = (props) => {

  const {
    buttonLabel,
    className
  } = props;
  const leavedata = JSON.parse(localStorage.getItem('education'))
  const [modal, setModal] = useState(false);
  const [newmodal, setNewModal] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [leavestart, setStartdate] = useState('');
  const [leaveend, setEnddate] = useState('');
  const [leavetype, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [name, setName] = useState(leavedata.data.name);
  const [section, setSection] = useState('');
  const [classes, setClasses] = useState('');
  const [studentlist, setStudentList] = useState([]);
  const [leavelist, setLeavelist] = useState([]);
  const [view, setview] = useState({});
  const [studentleavelist, setStudntleavelist] = useState([]);
  const [approve, setApprove] = useState([])
  const [reject, setReject] = useState([]);
  const[classdata,setClassdata]=useState([]);
   const[sectiondata,setSectiondata]=useState([]);
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const newtoggle = () => setNewModal(!newmodal);

  const settoggle = () => setModal(!modal);

  const homewrkdata = JSON.parse(localStorage.getItem('education'))


  const submitLeave = () => {


    const data = {

      name: leavedata.data.name,
      leavestart: leavestart,
      leaveend: leaveend,
      leavetype: leavetype,
      reason: reason,
      school_id: leavedata.data.school_id,
      user_id: leavedata.data.user_id
    }



    Axios.post(`${BaseUrl}/applyteacherleave`, data).then
      (res => {
        if (res.data.status === true) {
          swal(
            <h4>{res.data.msg}</h4>
          )
        } else {
          swal(
            <h4>{res.data.msg}</h4>
          )
        }
      })

    getAllLeaves();
    settoggle()


  }


  const getAllLeaves = () => {

    const data = {
      section_id: section,
      classes_id: classes
    }

    Axios.post(`${BaseUrl}/searchstudentleaves`, data).then
      (res => {
        console.log('data', res.data.data)
        const studentlist = res.data.data;
        setStudentList(studentlist);
      })

  }


  const getTeacherLeavedata = () => {




    Axios.get(`${BaseUrl}/viewleaves/${leavedata.data.user_id}/${leavedata.data.school_id}`).then
      (res => console.log('qq', res))


  }



  useEffect(()=>{


    Axios.get(`${BaseUrl}/viewclasseslist/${homewrkdata.data.school_id}`).then
    (res=> {
      setClassdata(res.data.data)
    })
    
    },[])
    
    useEffect(()=>{
    
    
      Axios.get(`${BaseUrl}/viewsectionlist/${homewrkdata.data.school_id}`).then
      (res=> {
        setSectiondata(res.data.data)
      })
      
      },[])







  useEffect(() => {



    Axios.get(`${BaseUrl}/viewteacherleaves/${leavedata.data.user_id}/${leavedata.data.school_id}`).then
      (res => {
        setLeavelist(res.data.data)
      })



  }, [])



  const ViewMore = (leaves) => {

    const view = leaves;
    console.log('aa', view);

    setview(view)


  }

  const studentdata = () => {

    Axios.get(`${BaseUrl}/viewstudentleaveslist/${leavedata.data.school_id}`).then
      (res => {
        console.log('stulve', res.data.data)
        setStudntleavelist(res.data.data)
      })



  }

  useEffect(() => {
    studentdata();
  }, [])



  const changeLeaveStatus = (user, status) => {
    Axios.post(`${BaseUrl}/changestudentleavestatus/${user._id}`, { status }).then
      (res => {
        if (res.data.status) {
          getAllLeaves();
        }
      })
    studentdata();

  }




  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <div>

          <Modal isOpen={newmodal} toggle={newtoggle} className={className}>
            <ModalHeader toggle={newtoggle}>Leave</ModalHeader>
            <ModalBody>
          {view.reason}   
           {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. */}
        </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={newtoggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
      <div>
        <Modal isOpen={modal} toggle={settoggle} className={className}>
          <ModalHeader toggle={settoggle}>Apply Leave form</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label style={{ float: 'left' }} for="exampleEmail"><b>Full Name</b></Label>
                <Input value={leavedata.data.name} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </FormGroup>
              <FormGroup>
                <Label style={{ float: 'left' }} for="exampleEmail"><b>Type of Leaves</b></Label>
                <Input onChange={(e) => setLeaveType(e.target.value)} required value={leavetype} type="select" name="select" id="exampleSelect">
                  <option>--Select--</option>
                  <option>Sick Leave</option>
                  <option>Conditional Leave</option>
                  <option>Optional Leave</option>

                </Input>
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label style={{ float: 'left' }} for="exampleEmail"><b>From</b></Label>
                    <Input onChange={(e) => setStartdate(e.target.value)} required value={leavestart}
                      type="date"
                      name="startdate"
                      id="exampleDate"
                      placeholder="date placeholder"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label style={{ float: 'left' }} for="examplePassword"><b>To</b></Label>
                    <Input onChange={(e) => setEnddate(e.target.value)} required value={leaveend}
                      type="date"
                      name="enddate"
                      id="exampleDate"
                      placeholder="date placeholder"
                    />


                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label style={{ float: 'left' }} for="exampleText"><b>Reason</b></Label>
                <Input onChange={(e) => setReason(e.target.value)} required value={reason} type="textarea" name="text" id="exampleText" />
              </FormGroup>


            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={submitLeave}>Add</Button>{' '}
            <Button color="secondary" onClick={settoggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
      <div className='techleave_container'>
        <div className='leave_header' >
          <div style={{ width: '40%' }}>
            <Form>

            </Form>
          </div>
          <div >
            <Button onClick={settoggle}
              variant="contained"
              color="primary" >
              Apply Leave<AddBoxIcon />
            </Button>



          </div>
        </div>

        <div className='leave_tabs'>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Your Leaves
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Students Leave
          </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row style={{ marginTop: '10px' }}>

                {leavelist.map(leaves => {
                  return (
                    <Col sm="4">
                      <Card style={{ marginTop: '10px' }} body>
                        <CardTitle>{leaves.leavetype}</CardTitle>
                        <CardText>{leaves.reason}</CardText>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Button onClick={() => ViewMore(leaves)} color="primary"><b>View More</b></Button>
                          {leaves.status === "pending" ? <Button style={{ backgroundColor: 'yellow' }}><b>Pending</b></Button> : leaves.status === "rejected" ? <Button color="secondary"><b>Rejected</b><ClearIcon /></Button> : leaves.status === "approved" ? <Button color="primary"><b>Approved</b><DoneOutlineIcon /></Button> : null}
                        </div>
                      </Card>
                    </Col>
                  )
                })}



              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleEmail">Class</Label>
                    <Input required value={classes} onChange={(e)=>setClasses(e.target.value)} type="select" name="select" id="exampleSelect">
        <option>--select--</option>
          {classdata.map(value=>{
            return(
            <option value={value._id}>{value.classes}</option>
            )
          })}
          
         
          
        </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="examplePassword">Section</Label>
                    <Input required value={section} onChange={(e)=>setSection(e.target.value)} type="select" name="select" id="exampleSelect">
        <option>--select--</option>
          {sectiondata.map(value=>{
            return(
            <option value={value._id}>{value.section}</option>
            )
          })}
        </Input>
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <FormGroup>
                    <Button style={{marginTop: 32}} onClick={getAllLeaves}
                      variant="contained"
                      color="primary" >
                      Search <SearchIcon />
                    </Button>
                  </FormGroup>
                </Col>
              </Row>

              <Row style={{ marginTop: '10px' }}>
                {studentlist.map((students, index) => {
                  return (
                    <Col sm="4">
                      <Card style={{ marginTop: '10px' }} body>
                        <CardTitle>{students.name}   </CardTitle>
                        <CardText>{students.reason}</CardText>
                        {students.status === "approved" ? <Button color="primary">Approved</Button> : students.status === "rejected" ? <Button color="secondary">Rejected</Button> :
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button onClick={() => changeLeaveStatus(students, "approved")} color="primary">Approve</Button>
                            <div style={{ flex: 1 }} />
                            <Button onClick={() => changeLeaveStatus(students, "rejected")} color="secondary">Reject</Button>

                          </div>}

                      </Card>
                    </Col>
                  )
                })}




              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </>
  )

}


export default TeacherLeave;












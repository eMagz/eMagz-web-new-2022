
import React, { useState } from 'react'
import './index.css';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from '../../Header'
import axios from 'axios';
import { BaseUrl } from '../../API';
import swal from '@sweetalert/with-react';
import { useHistory } from 'react-router-dom';

const AddQuestionPage = (props) => {
  const [testname, setTestName] = useState(props.location.state.testname);
  const [answer, setAnswer] = useState("");
  const [user_test_no, setUserTestNo] = useState('');
  const [optionalQuestions, setOptionalQuestions] = useState(false);
  const [marks, setMarks] = useState('');
  const [addQstn, setAddqstn] = useState('');
  const [optionone, setOptionone] = useState('');
  const [optiontwo, setOptiontwo] = useState('');
  const [optionthree, setOptionthree] = useState('');
  const [optionfour, setOptionfour] = useState('');
  const history = useHistory();
  const submitQuestionDetails = () => {
    const qstnData = {
      user_test_no: user_test_no,
      marks: marks,
      question: addQstn,
      option1: optionone,
      option2: optiontwo,
      optiont3: optionthree,
      option4: optionfour,
      is_long: optionalQuestions,
      answer: answer,
    }
    console.log(qstnData)
    if (user_test_no === '' || marks === "" || addQstn === "") {
      swal(
        <div>
          <h1>Please fill All Fields first!</h1>
        </div>
      )
    } else {
      axios.post(`${BaseUrl}/addquestion/${props.location.state._id}`, qstnData).then
        (res => {
          if (res.data.status === true) {
            swal(
              <div>
                <h1>{res.data.msg}</h1>
              </div>
            )
          } else {
            swal(
              <div>
                {res.data.msg}
              </div>
            )
          }
        })
    }
  }
  return (
    <>
      <Header />
      <div className='create_test_container'  >
        <div className='create_test_card' >
          <div className='add_question'   >
            Add Question
          </div>
          <Form>
            <FormGroup>
              <Label style={{ float: 'left' }} >Test Name</Label>
              <Input value={testname} onChange={(e) => setTestName(e.target.value)} readOnly />
            </FormGroup>
            <Row form >
              <Col md={6}>
                <FormGroup>
                  <Label style={{ float: 'left' }}  >Question No</Label>
                  <Input value={user_test_no} onChange={(e) => setUserTestNo(e.target.value)} type="text" placeholder="Enter question S.N" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label style={{ float: 'left' }} for="exampleZip">Marks</Label>
                  <Input value={marks} onChange={(e) => setMarks(e.target.value)} type='number' name="marks" />
                </FormGroup>
              </Col>
            </Row>
            <Row form >
              <Col md={12}>
                <FormGroup row style={{ width: "100%", marginLeft: 0 }}>
                  <Label >Question</Label>
                  <Input value={addQstn} onChange={(e) => setAddqstn(e.target.value)} type="textarea" name="text" id="exampleText" />
                </FormGroup>
              </Col>
            </Row>
            <Row form >
              <FormGroup row style={{ width: "100%", marginLeft: 10 }}>
                <Col sm={1}>
                  <Input type="checkbox" id="optional" onClick={(e) => setOptionalQuestions(!optionalQuestions)} variant="contained" color="primary" />
                </Col>
                <Label for="optional"  > Optional questions</Label>
              </FormGroup>
            </Row>
            <div>
            </div>
            {optionalQuestions ? <>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <div>Option 1.</div>
                    <Input value={optionone} onChange={(e) => setOptionone(e.target.value)} type="text" placeholder="Enter option one" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <div>Option 2.</div>
                    <Input value={optiontwo} onChange={(e) => setOptiontwo(e.target.value)} type="text" placeholder="Enter option two" />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <div>Option 3.</div>
                    <Input value={optionthree} onChange={(e) => setOptionthree(e.target.value)} type="text" placeholder="Enter option three" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <div>Option 4.</div>
                    <Input value={optionfour} onChange={(e) => setOptionfour(e.target.value)} type="text" placeholder="Enter option four" />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <div>Currect Answer</div>
                    <Input value={optionfour} onChange={(e) => setAnswer(e.target.value)} type="text" placeholder="Enter option Answer" />
                  </FormGroup>
                </Col>
              </Row>
            </> : null}
            <div className='add_answer' >
              <Button onClick={(e) => submitQuestionDetails()} variant="contained" color="primary">
                Add Question
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}
export default AddQuestionPage;













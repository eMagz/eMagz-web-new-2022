
import React from 'react'
import './questionpageTwo.css';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';




const QuestionPageTwo=()=>{


return(
    <>
    <div className='create_test_container'  >
        <div  className='create_test_card' >
         <Form>
         <Row form>
        <Col md={6}>
          <FormGroup>
            <Label style={{float:'left'}} for="exampleEmail">Test Name</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label style={{float:'left'}}  for="examplePassword">Test ID</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
        </Col>
      </Row>
     <Row form >
          <Col  md={6}>
              <FormGroup>
              <Label style={{float:'left'}}  >Select</Label>
              <Input type="select" name="select" >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
              </FormGroup>
          </Col>
          <Col md={6}>
                <FormGroup>
                <Label style={{float:'left'}} for="exampleZip">Marks</Label>
                      <Input type='number'  name="marks" />
                </FormGroup>
          </Col>
     </Row>
          <div className='add_question'   >
              Add Question
          </div>
          <FormGroup row>
        <Label for="exampleText" sm={2}>Question</Label>
        <Col sm={10}>
          <Input type="textarea" name="text" id="exampleText" />
        </Col>
      </FormGroup>
      <div>
      <Button variant="contained" color="primary">
       Add Question
      </Button>
      </div>
     <div  className='answer_section' >
         Answer
     </div>
         </Form>
         <Form>
         <Row form>
        <Col md={6}>
          <FormGroup>
            
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
           
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
           
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
          
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
        </Col>
      </Row> 
      <div  className='add_answer' >
         <Button variant="contained" color="primary">
       Add Answer
      </Button>
         </div>
         </Form>
         <div  >
         <Button variant="contained" color="primary">
       View
      </Button>
         </div>
        </div>
    </div>
    </>
)



}



export default QuestionPageTwo;













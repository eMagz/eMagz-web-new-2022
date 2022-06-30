import React from 'react'; 
import './marksheet.css';
import {Form,Row,Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';


const Marksheet=()=>{



return(
    <>
    <div className='marksheet_container' >
        <div className='marksheet_card' >
            <Form>
                <FormGroup>
                <Label style={{float:'left'}} for="exampleEmail">Name</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail">User ID</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="examplePassword">Classes</Label>
                        <Input type="select" name="select" id="exampleSelect">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                    </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail">Section</Label>
                        <Input type="select" name="select" id="exampleSelect">
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
                        <Label style={{float:'left'}} for="examplePassword">Subject</Label>
                        <Input type="select" name="select" id="exampleSelect">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                    </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail">Marks</Label>
                        <Input type="select" name="select" id="exampleSelect">
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
                        <Label style={{float:'left'}} for="examplePassword">Total Marks</Label>
                        <Input type="number" name="marks" />
                     <div className='marksheet_btn' >
                     <Button variant="contained" color="primary">
      Add to the Marksheet
      </Button>
                         </div>  
                    
                    </FormGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
    </>
)



}


export default Marksheet;








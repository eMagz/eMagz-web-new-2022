
import React from 'react'
import './expense.css';
import {Form,Row,Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';


const Expense=()=>{

return(
    <>
    <div className='expense_container' >
      <div className='expense_card' >
            <Form>
            <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail">Add New Category</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="examplePassword">Select Category</Label>
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
                        <Label style={{float:'left'}} for="exampleEmail">Amount</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="examplePassword">Date</Label>
                        <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                            />
                    </FormGroup>
                    </Col>
                </Row>
                <div>
      <Button variant="contained" color="primary">
     Add to The Expense
      </Button>
          </div>  
            </Form>
      </div>
    </div>
    </>
)



}



export default Expense;








import React from 'react';
import './homework_form.css';
import { Row,Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Header from '../Header';


const HomeworkForm=()=>{


const history = useHistory();

const changePage=()=>{


history.push('/educations/home-works/view-all')

}


return(

    <>
    <Header/>
    <div className='homewrkfrm_container' >
        <div className='homework_card' >
            <Form>
            <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail">Name</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="examplePassword">User ID</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>
                    </Col>
           </Row>
           <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="exampleEmail">Mobile Number</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label style={{float:'left'}} for="examplePassword">Submitted on</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>
                    </Col>
           </Row>
              <Button onClick={changePage}  >Submit</Button>
            </Form> 
        </div>
    </div>
    </>

)



}


export default HomeworkForm;












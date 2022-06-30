
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormText } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Header from '../../Header';
import axios from 'axios';
import { BaseUrl } from '../../../API';
import swal from '@sweetalert/with-react';
// import {BaseUrl} from '../../API';

function TestTeacher(props) {
  const [modal, setModal] = useState(false);
  const [resdata, setresdata] = useState([]);
  const testDetails = props.location.state;
  const history = useHistory();
  const addqstnpage = (url, data) => {
    history.push(url, data)
  }
  useEffect(() => {
    console.log(testDetails)
    axios.get(`${BaseUrl}/questionlist/${testDetails._id}`).then(res => {
        const resdata = res.data.data;
        setresdata(resdata)
      })

  },[])
  return (
    <>
      <Header />
      <div className='testteacher_container' >
        <div className='testteacher_header' style={{ width: "100%", textAlign: "right" }}>
          <div style={{ width: "80%", textAlign: "right" }}></div>
          <Tooltip title='Add Question' style={{ float: "right" }} >
            <Button onClick={() => addqstnpage("/educations/teacher/add-question", testDetails)} style={{ border: 'none', outline: 'none' }}    >Add Questions  <FontAwesomeIcon style={{ color: 'blue', fontSize: '1.5rem' }} icon={faPlusSquare} />  </Button >
          </Tooltip>
        </div>

        <div className='viewteacher_table' >
          <MaterialTable
            title={testDetails.testname+" questions"}
            columns={[
              { title: 'S.N.', field: 'questionno' },
              { title: 'Question', field: 'question' },
              { title: 'Answer', field: 'answer' },
              { title: 'Long Question', field: 'is_long' },
              { title: 'Marks', field: 'marks' },
            ]}
            data={resdata}
            // actions={[
            //   {
            //     icon: 'edit',
            //     tooltip: 'Edit Details',
            //     onClick: (event, rowData) => {



            //     }
            //   },
            //   {
            //     icon: 'add',
            //     tooltip: 'Add Question',
            //     onClick: (event, rowData) => {
            //       addqstnpage('/educations/teacher/list-question', rowData)

            //     }
            //   },
            // ]}
            options={{
              actionsColumnIndex: -1,
              search: false
            }}
          />
        </div>
      </div>
    </>
  )
}



export default TestTeacher;




















































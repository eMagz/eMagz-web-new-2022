import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faUsersSlash } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import Header from '../../Header';
import axios from 'axios';
import {BaseUrl} from '../../../API';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';





const StudentFees=()=>{


const [resdata,setResdata]= useState([])


const feesdata = JSON.parse(localStorage.getItem('education'))


const doc = new jsPDF({
  orientation: "landscape",
  unit: "in",
  format: [4, 2],
  
});






useEffect(
  ()=>{


    axios.get(`${BaseUrl}/viewfees/${feesdata.data.user_id}`).then
    (res=>{
      setResdata(res.data.data)
    })
  },[]
)



return(
    <>
    <Header/>
    <div className='studentfees_container'>
    <div className='fees_table' >
          <MaterialTable
            title="Fees Details"
            columns={[
              { title: 'Date', field: 'date' },
              { title: 'Paid Amount', field: 'amount' },
              { title: 'Total Fees', field: 'totalfees' },
              { title: 'Pending Amount', field: 'pendingfees' },
              { title: 'Receipt number', field: 'receiptnumber' },
              
            ]}
            data={resdata}
            // actions={[
            //   {
            //     icon: 'cloud_download',
            //     tooltip: 'Download file',
            //     onClick: (event, rowData) => {
            //       const doc = new jsPDF();
            //       doc.autoTable({ html: '#my-table' })
            //    console.log('rowdata',rowData)
            //   //  doc.text(["date:",rowData.date], 10,10);
            //   //   // doc.text(["Amount",rowData.amount], 10, 40);
            //   //  doc.text(["Receipt Number",rowData.receiptnumber], 10, 80);
            //   doc.setFont("helvetica", "bold");
            //   doc.text("RECEIPT", 105, 20, null, null, "center");
            //   doc.text("Date of Payment:", 20, 60);
            //   doc.text(rowData.date, 80, 60);
            //   doc.text("Paid Amount",20,95);
            //   doc.text("Pending Amount",80,95);
            //   doc.text("Total Amount",130,95);
            //   doc.setLineWidth(1);
            //   doc.setDrawColor(0,0,0)
             
            //   doc.line(5, 100, 210, 100);
            //    window.open(doc.output('bloburl'))
            //    doc.save(rowData.receiptnumber+".pdf");

            //     }
            //   },
              // {
              //   icon: 'visibility',
              //   tooltip: 'Preview file',
              //   onClick: (event, rowData) => {
              //     const doc = new jsPDF();
              //  console.log('rowdata',rowData)
              //   doc.text(<h1>{["date:",rowData.date]}</h1>, 10,10);
              //   // doc.text(["Amount",rowData.amount], 10, 40);
              //  doc.text(["Receipt Number",rowData.receiptnumber], 10, 80);
               
              //  window.open(doc.output('bloburl'))
              // //  doc.save(rowData.receiptnumber+".pdf");
              //   }
              // },
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

export default StudentFees;

























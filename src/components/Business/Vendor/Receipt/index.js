import { Link } from '@material-ui/core';
import React from 'react'
import './index.css';
import Button from '@material-ui/core/Button';
import logoImg from "../../../../assets/category.png"
import { Table } from 'reactstrap';
import {useHistory} from "react-router-dom"
import { PDFDownloadLink} from '@react-pdf/renderer';

import Print from "./Print"

const Receipt =()=>{

  const viewPdfViewer =()=>{
      window.print()
  }
    return(
        <>
        <div className='receipt_container' >
            <div className='receipt_card' >
            <div  className='receipt_header' >
           <div>
               <img src={logoImg} />
               <strong>Emagz</strong>
           </div>
           <div className='Thank_You' >
              <h4 className="invoice_text" style={{marginRight:"1rem"}}>Kazmi Cloths Collection</h4>
              <p><strong>Contact Us: </strong>1800 420 111 || cs@kazmi.com</p>
              <p style={{marginRight:"8rem"}}><strong>Date</strong>: February 3, 2021</p>
              <p style={{marginRight:"6rem"}}><strong>Due Date</strong>: February 3, 2021</p>
           </div>
           </div>
           <br/>
           <div className="borderLine" />
           <div  className='address_date' >
               <div>
                   <div><strong>Order ID</strong>: 24SDFSD435D</div>
                   <div  style={{display:'flex',flexDirection:'row'}} >
                    <div><strong>Order Date</strong>: 12-04-2021</div>

                   </div>
                   <div style={{display:'flex',flexDirection:'row'}} >
                     <div><strong>Invoice No: </strong>34234JGFHJ6</div>
                   </div>
                   <div style={{display:'flex',flexDirection:'row'}} >
                     <div><strong>Invoice Date: </strong>12-04-2021</div>
                   </div>
                  
               </div>
               <div>
                   <b className="invoice_text" style={{paddingLeft:'6px', marginLeft:"20px"}}>Billing Address</b>
                   <div style={{display:'flex',flexDirection:'row'}} >
                   <div style={{paddingLeft:'6px', marginLeft:"20px"}}><strong>Md Riyaz Ansari</strong><br/>5th Floor, Santosh Enclave,<br/> 14  Chinar Park, Tegharia,<br /> Rajarhat, Kolkata, West Bengal 700157</div>
                   </div>
                   <div style={{paddingLeft:'6px', marginLeft:"20px"}}><strong>Phone :</strong>6201031126</div>
               </div>
               <div className='bill' >
                   <b className="invoice_text">Shipping Address</b>
                   <div  className='bill_address' >
                   Md Riyaz Ansari <br/>5th Floor, Santosh Enclave,<br/> 14, Chinar Park, Tegharia, <br/>Rajarhat, Kolkata, West Bengal 700157
                   </div>
               </div>
            </div> 
            <div className="borderLine" />
            <div className='product_table_list'>
               <Table>
                   <thead>
                       <tr>
                       <th>NO.</th>
                        <th>Product</th>
                         <th>Title</th>
                         <th>Qty</th>
                         <th>Price</th>
                         <th>Tax</th>
                         <th>Total</th>
                       </tr>
                   </thead>
                   <tbody>
                   <tr>
                     <th scope="row">1</th>
                     <td>Wired headsets</td>
                     <td>Nokia Headset WH-205 (Black)</td>
                     <td>1</td>
                     <td>1200</td>
                     <td>20.54</td>
                     <td>1220.54</td>
                     </tr>
                     <tr>
                     <th scope="row">2</th>
                     <td>Wired headsets</td>
                     <td>Nokia Headset WH-205 (Black)</td>
                     <td>1</td>
                     <td>1200</td>
                     <td>20.54</td>
                     <td>1220.54</td>
                     </tr>
                     <tr>
                       <td colSpan={7}>Total</td>
                     </tr>
                   </tbody>
                </Table>  
                
            </div>
            <hr/>
            <div className='bottom_line'>
              This bill is auto generated if you have any query you can contact us via email support@eMagz.com or you can call us at +44353575
            </div>
            <div className='terms_button' >
                 <Link style={{marginRight:'10px'}}>terms of service</Link> <Link style={{marginRight:'10px'}}>Privacy Policy</Link>
            </div>
            <div style={{clear:'both',marginTop:'30px',margin:'auto'}} >
            <Button variant="contained" color="primary">
                Download
            </Button>
            <PDFDownloadLink document={<Print />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
             </PDFDownloadLink>
            </div>
            </div>
        </div>
        </>
    )
}


export default Receipt;











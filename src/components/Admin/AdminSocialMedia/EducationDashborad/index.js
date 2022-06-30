import React,{useState,useEffect} from 'react';
import './index.css';
import Header from '../Header'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LineChart,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Bar,Legend, Line,PieChart,Pie } from 'recharts';
import MaterialTable from 'material-table';
import { Form, FormGroup, Label, Input, FormText,Col, Row,Button } from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search';
import { BaseUrl } from '../../../API';
import axios from 'axios';

const data = [
  {
    "name": "Jan",
    "uv": 4000,
    "pv": 2400
  },
  {
    "name": "Feb",
    "uv": 3000,
    "pv": 1398
  },
  {
    "name": "Mar",
    "uv": 2000,
    "pv": 9800
  },
  {
    "name": "Apr",
    "uv": 2780,
    "pv": 3908
  },
  {
    "name": "May",
    "uv": 1890,
    "pv": 4800
  },
  {
    "name": "Jun",
    "uv": 2390,
    "pv": 3800
  },
  {
    "name": "Jul",
    "uv": 3490,
    "pv": 4300
  },
  {
    "name": "Aug",
    "uv": 3490,
    "pv": 4300
  },
  {
    "name": "Sep",
    "uv": 3490,
    "pv": 4300
  },
  {
    "name": "Oct",
    "uv": 3490,
    "pv": 4300
  },
  {
    "name": "Nov",
    "uv": 3490,
    "pv": 4300
  },
  {
    "name": "Dec",
    "uv": 3490,
    "pv": 4300
  }
  
]
const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  },
  {
    "name": "Group E",
    "value": 278
  },
  {
    "name": "Group F",
    "value": 189
  }
];
const data02 = [
  {
    "name": "Group A",
    "value": 2400
  },
  {
    "name": "Group B",
    "value": 4567
  },
  {
    "name": "Group C",
    "value": 1398
  },
  {
    "name": "Group D",
    "value": 9800
  },
  {
    "name": "Group E",
    "value": 3908
  },
  {
    "name": "Group F",
    "value": 4800
  }
];

const Index=()=>{

const vendordata=JSON.parse(localStorage.getItem('vendor'));

const history = useHistory();

const[qtydata,setQtydata]=useState([]);


useEffect(()=>{
  axios.get(`${BaseUrl}/vendor-order-data/601529abce3aa2b78a1d21db`).then(
  res=>{
    console.log('ff',res.data.data)
    var options = {  month: 'short' };
    // console.log('hh',qtydata[0]._id.getMonth());
    setQtydata(res.data.data);  
  }
)
},[])




// const changePage=(url)=>{
// history.push(url)
// }


return(
    <>
    <Header/>
    <div className='venDash_container'>
      <div className='venDash_search'>
        <Form>
        <Row form>
        <Col md={4}>
        <FormGroup>
        <Label for="exampleSelect">Search here:</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          
        </Input>
      </FormGroup> 
          </Col>
         
          <Col  md={4}>
          <Button style={{transform:'translateY(90%)'}}><SearchIcon/> Search</Button>
          </Col>
          </Row>
        </Form>

      </div>
     
          <div>
         <BarChart width={1100} height={250} data={qtydata}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="quantity" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="totalprice" fill="#8884d8" />
  {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
</BarChart>
         </div>
    
    
      <div className='venDash_gragh'>
         
         <div>
         <LineChart width={800} height={250} data={qtydata}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="quantity" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="totalprice" stroke="#8884d8" />
  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
</LineChart>
         </div>
         <div>
         <PieChart width={400} height={250}>
  <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
  <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
</PieChart>
          </div>
      </div>
      <div className='venDash_table'>
      <MaterialTable
            title="Payment Details"
            columns={[
              { title: 'Order Id', field: 'id' },
              { title: 'Amount', field: 'first_name' },
              { title: 'Transaction ID', field: 'last_name' },
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                let url = 'https://reqres.in/api/users?'
                url += 'per_page=' + query.pageSize
                url += '&page=' + (query.page + 1)
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    resolve({
                      data: result.data,
                      page: result.page - 1,
                      totalCount: result.total,
                    })
                  })
              })
            }
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Details',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              },

            ]}
            options={{
              actionsColumnIndex: -1,
              search: true
            }}
          />
      </div>
    
    </div>
    </>
)
}

export default Index;


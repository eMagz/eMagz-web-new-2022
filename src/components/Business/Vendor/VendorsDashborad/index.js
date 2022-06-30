import React, { useState, useEffect } from "react";
import "./index.css";
import Header from "../../Header";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  LineChart,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  Line,
  PieChart,
  Pie,
} from "recharts";
import MaterialTable from "material-table";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  Button,
} from "reactstrap";
import SearchIcon from "@material-ui/icons/Search";
import { BaseUrl } from "../../../API";
import axios from "axios";
import MonthlySels from "./MonthlySels";
import CategorySales from "./CategorySales";
import CategoryPercentage from "./CategoryPercentage";

const VendorDashboard = () => {
  const vendordata = JSON.parse(localStorage.getItem("vendor"));

  const history = useHistory();

  const [qtydata, setQtydata] = useState([]);

  useEffect(() => {
    axios
      .get(`${BaseUrl}/vendor-orders-on-day/5feac6e187518079cab3ffea/4-2-2021`)
      .then((res) => {
        console.log("res.data.data", res.data.data[0].order);
        setQtydata(res.data.data[0].order);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="venDash_container">
        <div className="venDash_search">
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

              <Col md={4}>
                <Button style={{ transform: "translateY(90%)" }}>
                  <SearchIcon /> Search
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Row>
          <Col md={6}>
            <CategorySales />
          </Col>
          <Col md={6}>
            <CategoryPercentage />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <MonthlySels />
          </Col>
        </Row>

        <div className="venDash_table">
          <MaterialTable
            title="Payment Details"
            columns={[
              { title: "Order ID", field: "order_id" },
              { title: "Amount", field: "name" },
              { title: "Qty", field: "quantity" },
              { title: "Total Price", field: "total_price" },
              { title: "GST", field: "gst_amount" },
              { title: "Seller Name", field: "vendor_name" },
              { title: "Status", field: "status" },
              { title: "Order Date", field: "date" },
            ]}
            data={qtydata}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Details",
                onClick: (event, rowData) => alert("You saved " + rowData.name),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
              search: true,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;

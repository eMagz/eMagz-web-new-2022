import React, { useState, useEffect } from "react";
import "./index.css";
import Header from "../Header";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import CategorySales from "./CategorySales";
import CategoryPercentage from "./CategoryPercentage";
import MonthlySels from "./MonthlySels";
import MaterialTable from "material-table";
import { Form, FormGroup, Label, Input, Col, Row, Button } from "reactstrap";
import SearchIcon from "@material-ui/icons/Search";
import { BaseUrl } from "../../API";
import axios from "axios";
import { order } from "scriptjs";

const Index = () => {
  const [approvedVendors, setApprovedVendors] = useState([]);
  const [selectedVendorProduct, setSelectedVendorProduct] = useState([]);
  const [singleVendorProducts, setSingleVendorProducts] = useState([]);

  const [qtydata, setQtydata] = useState([]);
  const [selectVendor, setSelectVendor] = useState("");

  const getAllApprovedVendors = () => {
    axios.get(`${BaseUrl}/approved-vendors`).then((res) => {
      setApprovedVendors(res.data.data);
    });
  };
  const getParticularVendorProducts = (vendor_id) => {
    const tempArray = [];
    const allObject = {};
    axios
      .get(`${BaseUrl}/vendor-all-products-list/${vendor_id}`)
      .then((res) => {
        console.log("Seletcec Vendor", res.data.data);
        res.data.data.forEach((data) => {
          console.log("Pushed Object", data);
          tempArray.push({
            price: data.price,
            gst_amount: data.gst_amount,
            stock: data.stock,
            vendor_id: data.vendor_id,
            total_price: data.total_price,
            _id: data._id,
            colour: data.colour,
            name: data.product_id.name,
            gst_percentage: data.product_id.gst_percentage,
            description: data.product_id.description,
            gst_type: data.product_id.gst_type,
          });
        });

        setSingleVendorProducts(tempArray);
      });
  };

  const getSelectedVendorDetails = (vendor_id) => {
    const temp = [];
    axios
      .get(`${BaseUrl}/vendor-sold-products-list/${vendor_id}`)
      .then((res) => {
        res.data.data.forEach((data) => {
          const { order } = data;
          temp.push(...order);
        });
        setSelectedVendorProduct(temp);
      });
  };

  useEffect(() => {
    getAllApprovedVendors();
  }, []);

  useEffect(() => {
    getSelectedVendorDetails(selectVendor);
    getParticularVendorProducts(selectVendor);
  }, [selectVendor]);

  // const changePage=(url)=>{
  // history.push(url)
  // }

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
                  <Input
                    type="select"
                    value={selectVendor}
                    onChange={(e) => setSelectVendor(e.target.value)}
                    name="select"
                  >
                    {approvedVendors.map((vendor) => (
                      <option value={vendor._id}>{vendor.business_name}</option>
                    ))}
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

        <div>
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
        </div>

        <div className="venDash_table">
          <MaterialTable
            title="Total Sold Products"
            columns={[
              { title: "Name", field: "name" },
              { title: "Quantity", field: "quantity" },
              { title: "total_price", field: "total_price" },
              { title: "Gst Amount", field: "gst_amount" },
              { title: "Vendor Name", field: "vendor_name" },
              { title: "Status", field: "status" },
            ]}
            data={selectedVendorProduct}
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

        <div className="venDash_table">
          <MaterialTable
            title="Total Stock Products"
            columns={[
              { title: "Name", field: "name" },
              { title: "Quantity", field: "quantity" },
              { title: "total_price", field: "total_price" },
              { title: "Gst Amount", field: "gst_amount" },
              { title: "Vendor Name", field: "vendor_name" },
              { title: "Stock", field: "stock" },
            ]}
            data={singleVendorProducts}
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

export default Index;

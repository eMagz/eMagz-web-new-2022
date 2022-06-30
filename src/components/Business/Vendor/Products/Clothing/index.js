
import React, { useEffect, useState } from 'react'
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import './index.css';
// import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input1 from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Header from '../../../Header';
import { useHistory } from 'react-router-dom';
import { BaseUrl } from '../../../../API';
import axios from 'axios';
import swal from '@sweetalert/with-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




const Clothings = () => {
  const [textword, setTextWord] = useState('');
  const [productname, setProductname] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubategory] = useState('');
  const [gstpersen, setGstpersen] = useState('');
  const [gsttype, setGsttype] = useState('');
  const [categorylist, setCategorylist] = useState([]);
  const [subcategorylist, setSubcategorylist] = useState([]);
  const [gstlist, setGstlist] = useState([]);
  const [gsttypelist, setGsttypelist] = useState([]);

  const history = useHistory();
  const vendordata = JSON.parse(localStorage.getItem('vendor'));
  const userdata = JSON.parse(localStorage.getItem('user'));

  const handleTextAreaChange = (value) => {

    console.log('tt', textword)
    setTextWord(value);
  }

  useEffect(
    () => {
      getcategorylist();
      getGstpercentage();
    }, []
  )

  useEffect(() => {
    getSubategorylist();
  }, [category])


  const getcategorylist = () => {
    axios.get(`${BaseUrl}/view-business-category`).then(
      res => {
        // console.log('xc',res)
        setCategorylist(res.data.data)

      }
    )
  }

  const getSubategorylist = () => {
    axios.get(`${BaseUrl}/view-business-sub-category/${category}`).then(
      res => {
        // console.log('xc',res)
        setSubcategorylist(res.data.data)

      }
    )
  }

  const getGstpercentage = () => {

    axios.get(`${BaseUrl}/viewgst`).then(
      res => {
        // console.log('vb',res)
        setGstlist(res.data.data.gst);
        setGsttypelist(res.data.data.type);
      }
    )

  }

  const submitDetails = () => {
    const body = {
      name: productname,
      description: textword,
      vendor_id: vendordata._id,
      category_id: category,
      sub_category_id: subcategory,
      gst_percentage: gstpersen,
      gst_type: gsttype,
      user_id: userdata._id
    }

    axios.post(`${BaseUrl}/add-product`, body).then(
      res => {
        console.log('op', res)
        if (res.data.status) {
          swal(res.data.msg)
          history.push('/business/vendor-dashboard/product-list/add-details', res.data.data)
        } else {
          swal(res.data.msg)
        }
      }
    )

  }


  console.log('aq', gstpersen)



  // history.push('/business/vendor-dashboard/clothing-list/create-product')

  return (
    <>
      <div>
        <Header />
      </div>
      <div className='product_container' >
        <div className='products_card'>
          <div className='form_product'>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Product Name</Label>
                    <Input value={productname} onChange={(e) => setProductname(e.target.value)} type="text" name="name" id="exampleEmail" placeholder="with a placeholder" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelectMulti">Select Category</Label>
                    <Input value={category} onChange={(e) => setCategory(e.target.value)}
                      type="select"
                    >
                      <option>--select category--</option>
                      {categorylist.map(val => {
                        return (
                          <option value={val._id}>{val.name}</option>
                        )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelectMulti">Select Subcategory</Label>
                    <Input value={subcategory} onChange={(e) => setSubategory(e.target.value)}
                      type="select">
                      <option>--select--</option>

                      {subcategorylist.map(val => {
                        return (
                          <option value={val._id}>{val.name}</option>
                        )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelectMulti">GST Percentage</Label>
                    <Input value={gstpersen} onChange={(e) => setGstpersen(e.target.value)}
                      type="select"
                    >
                      <option>--select</option>
                      {gstlist.map(val => {
                        return (
                          <option>{val.gst_percentage}</option>
                        )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelectMulti">GST Type</Label>
                    <Input value={gsttype} onChange={(e) => setGsttype(e.target.value)}
                      type="select">
                      <option>--select--</option>
                      {gsttypelist.map(val => {
                        return (
                          <option>{val.gst_type}</option>
                        )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <ReactQuill value={textword}
                    onChange={(value) => handleTextAreaChange(value)}
                  />
                  <div className='count' >
                    {textword.length}/500
                  </div>
                </Col>
              </Row>
              <Button onClick={submitDetails} >Submit Product</Button>
            </Form>
          </div>

        </div>
      </div>
    </>
  )
}




export default Clothings;























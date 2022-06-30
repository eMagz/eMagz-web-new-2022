import React,{useState} from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input ,CustomInput} from 'reactstrap';
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


const names = [
  'XXXL',
  'XXL',
  'XL',
  'L',
  'M',
  'S'
  
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    marginRight: theme.spacing(7),
    minWidth: 120,
    maxWidth: 500,
  },
  

  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

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




const Products=()=>{
  const classes = useStyles();
  const theme = useTheme();
  const[textword,setTextWord]=useState('');
  const [personName, setPersonName] = React.useState([]);




    
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };


  const handleTextAreaChange=(e)=>{

    console.log('tt',textword)
    
    setTextWord(e.target.value);
    
    }
    // const handleChangeMultiple = (event) => {
    //   const { options } = event.target;
    //   const value = [];
    //   for (let i = 0, l = options.length; i < l; i += 1) {
    //     if (options[i].selected) {
    //       value.push(options[i].value);
    //     }
    //   }
    //   setPersonName(value);
    // };  



return(
    <>
     <div className='product_container' >
       <div  className='products_card'>
       <div className='form_product'>
       <Form>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleEmail">Product Name</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup >
        <Label for="exampleText">Product Description:</Label>
        <Input value={textword}  onChange={handleTextAreaChange} type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <div className='count' >
{textword.length}/500
      </div>
        </Col>
       
      </Row>
      <Row form>
         <Col  md={6}>
         <FormGroup>
        <Label for="exampleSelectMulti">Select Category</Label>
        <Input
          type="select"
          
         
        >
          <option>Category</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
         </Col>
         <Col  md={6}>
         <FormGroup>
        <Label for="exampleSelectMulti">Select Subcategory</Label>
        <Input
          type="select">
          <option>Sub Category</option>
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
        <Label for="exampleCustomFileBrowser">Product Images</Label>
        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
      </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
        <Label for="exampleCustomFileBrowser">Product Images</Label>
        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
      </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
        <FormGroup>
        <Label for="exampleCustomFileBrowser">Product Images</Label>
        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
      </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
        <Label for="exampleCustomFileBrowser">Product Images</Label>
        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
      </FormGroup>
        </Col>
      </Row>
      
      
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label >Price</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Rupees" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            
            <Label for="exampleSelectMulti">Size</Label>
        <Input
          type="select">
          <option>XXXL</option>
          <option>XXL</option>
          <option>XL</option>
          <option>L</option>
          <option>M</option>
        </Input>
          </FormGroup>
        </Col>
        
      </Row>
      <Row form >
            <Col md={6} >
            <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Size</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input1 />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">Price</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input1 />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Col>
            <Col md={6}>
            <FormGroup>
        <Label for="exampleColor">Color</Label>
        <Input
          type="color"
          name="color"
          id="exampleColor"
          placeholder="color placeholder"
        />
      </FormGroup>
            </Col>
      </Row>
     <Row  form>
       <Col md={3}>
       <FormGroup>
        <Label for="exampleEmail">Stock</Label>
        <Input type="number" name="stock"  />
      </FormGroup>  
       </Col>
       <Col md={3}>
       <FormGroup>
            
            <Label for="exampleSelectMulti">Color</Label>
        <Input
          type="select">
          <option>Red</option>
          <option>Blue</option>
          <option>Green</option>
          <option>Yello</option>
          <option>White</option>
        </Input>
          </FormGroup>
       </Col>
       <Col md={4}>
       <FormGroup>
        <Label for="exampleEmail">Commission</Label>
        <div style={{display:'flex',flexDirection:'row'}}>
        <Input type="number" name="stock"  />
        of
        <Input type="number" name="stock"  />
        </div>
        
      </FormGroup>  
     </Col>
     </Row>
     
      <Button>Sign in</Button>
    </Form>
         </div>   
       
       </div>
    </div>
    </>
    

)





}




export default Products;




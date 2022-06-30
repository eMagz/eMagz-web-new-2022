import React,{useState,useEffect,useRef} from 'react'
import Header from '../Header'
import "./index.css"
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Collapse, CardBody, Card } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col,Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { BaseUrl } from '../../../API';
import axios from 'axios';
import swal from '@sweetalert/with-react'
import { getCartData } from '../../../ReduxStore/Actions/CartActions';
import { useSelector , useDispatch} from 'react-redux';

const userData = JSON.parse(localStorage.getItem('user'));
let addressInfo = {}
const PaymentGetway = () => {
    const [value, setValue] = useState(0);
    const [modal, setModal] = useState(false);
    const[newname,setNewname]=useState('');
    const[newpin,setNewPin]=useState('');
    const[newmobile,setNewMobile]=useState('');
    const[newlocality,setNewlocality]=useState('');
    const[newaddress,setNewaddress]=useState('');
    const[newstates,setNewstates]=useState('');
    const[newcity,setNewcity]=useState('');
    const[newaddtype,setNewAddtype]=useState('');
    const[userid,setUserId]=useState('');
    const[getname,setGetname]=useState('');
    const[addressdata,setAddressdata]=useState([]);
    const orderNowRef = useRef(false);
    const[ordernow,setOrdernow]=useState(false);
    const[cartID,setCartID]=useState('');
    const[trackedData,setTrackedData]=useState();

   
    const cartdata = useSelector(state=> state.cartReducer.cart)
    const dispatch = useDispatch()
    console.log('qas',cartdata);
   
if(cartdata.length!==0){
  console.log('po',cartdata[0].name);
}

    const handleChange = (event,id) => {
      let address=addressdata;
      address.forEach((e,index) => {
        address[index].is_selected=false;
        });
        address[id].is_selected=true;
        setAddressdata([...address])

        addressdata.filter((data)=>{
            if(data.is_selected === true){
               cartdata.forEach((item, i)=>{
                  cartdata[i].address = data.address
               })
            }
        })

      };
      console.log('New Address', cartdata)

       const toggleModal = () => setModal(!modal);
const userdta = JSON.parse(localStorage.getItem('user'));
console.log('yu',userdta);

useEffect(()=>{
  axios.get(`http://api.emagz.live/v1.0/view-cart/${userData._id}`).then((res)=>{
            setCartID(res.data.data._id)
        })
  allAddressDetails();
},[])
      const addNewAddress=()=>{  
      const addressData={
       name: newname,
       mobile:newmobile,
       pincode: newpin,
       locality: newlocality,
       city:newcity,
       address: newaddress,
       address_type: newaddtype,
       state: newstates,
       user_id:userdta._id
      }

        axios.post(`${BaseUrl}/add-user-address-details`,addressData).then(
          res=>{
            console.log('dd',res)
             if(res.data.status=== true){
               swal(res.data.msg)
               allAddressDetails();
             }
          }

        )
        toggleModal();
        setNewname('');
        setNewPin('');
        setNewMobile('');
        setNewaddress('');          
        setNewstates('');
        setNewAddtype('');
        setNewlocality('');
        setNewAddtype('');
      }    
const allAddressDetails=()=>{
  axios.get(`${BaseUrl}/user-address-details/${userdta._id}`).then(
    res=>{
      
      let address=res.data.data;
      if(address.length >0){
        address[0].is_selected=true;
        setAddressdata(address);
      }
      
    }
  )
}

const ChangeOrderStatus=()=>{
// console.log('cv',orderNowRef)
// orderNowRef.current = !orderNowRef.current;
setOrdernow(!ordernow)
}

console.log('Cart Data', cartdata)
const createOrderData=()=>{

if(cartdata.length !== 0){
  const data={
    order: cartdata, 
    user_id: userdta._id,
  }
  
  axios.post(`${BaseUrl}/add-order`,data).then(
    res=>{
      if(res.data.status){
        swal(res.data.msg)
        axios.post(`http://api.emagz.live/v1.0/remove-cart/${cartID}`).then((res)=>{
            console.log('REMOVE DATA', res)
           let cartData = cartdata
           cartData = []
           dispatch(getCartData(cartData))
        })
      }else{
        swal(res.data.msg)
      }
    }
  )
}
}
    return (
        <>
            <div>
            <Header/>
            </div>
            <div className='addressContainer'>
            <div className="paymentContainer">
             <Modal isOpen={modal} toggle={toggleModal} >
                <ModalHeader toggle={toggleModal}>Add New Address</ModalHeader>
                 <ModalBody>
                 <Form>
                      <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Name</Label>
                      <Input  type="text"  value={newname} onChange={(e)=>setNewname(e.target.value)}  />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplePassword">Phone Number(10 digit)</Label>
                      <Input value={newmobile} onChange={(e)=>setNewMobile(e.target.value)}
                      type="number" name="mobile"  />
                    </FormGroup>
                  </Col>
                </Row>  
                      <Row form>
                        <Col md={6}>
                          <FormGroup>
                            <Label >Pincode</Label>
                            <Input 
                          value={newpin} onChange={(e)=>setNewPin(e.target.value)}
                            type="number" name="pincode"  />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label >Locality</Label>
                            <Input  value={newlocality} onChange={(e)=>setNewlocality(e.target.value)}
                            type="text" name="locality"   />
                          </FormGroup>
                        </Col>
                      </Row>
      <FormGroup>
        <Label >Address</Label>
        <Col md={12}>
          <Input value={newaddress} onChange={(e)=>setNewaddress(e.target.value)}
           type="textarea" name="address"  />
        </Col>
      </FormGroup>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label >City/District/Town</Label>
            <Input value={newcity} onChange={(e)=>setNewcity(e.target.value)}
             type="text" name="city" />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label >State</Label>
            <Input value={newstates} onChange={(e)=>setNewstates(e.target.value)}
             type="text"  />
            
         
          </FormGroup>
        </Col>
        <Col md={3}>
        <FormGroup check>
          <Label check>
            <Input checked={newaddtype === 'Home'} value='Home'
            onChange={(e)=>setNewAddtype(e.target.value)}
             type="radio" />{' '}
            Home
          </Label>
        </FormGroup>
        </Col>
        <Col md={3}>
        <FormGroup check>
          <Label check>
            <Input checked={newaddtype === 'Office'} value='Office'
            onChange={(e)=>setNewAddtype(e.target.value)}
            type="radio"  />{' '}
            Office
          </Label>
        </FormGroup>
        </Col>
      </Row>
       </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addNewAddress}>Done</Button>{' '}
        </ModalFooter>
      </Modal>
            <div className='paymentContainer_nav'>
               <div className='address'>DELIVERY ADDRESS</div>
               <div style={{flex:1}}/>
               <div className='address_icon' >
               <IconButton onClick={toggleModal} color="primary" aria-label="upload picture" component="span">
          <AddBoxIcon />
        </IconButton>
               </div>
            </div>
            {addressdata.map((val,id)=>{
              return(
                <div className='address_list_container'>
                <div className='address_list'>
                   <div style={{marginTop:'3px'}}>
                       <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="gender1" >
                      <FormControlLabel  control={<Radio onClick={(e)=>handleChange(e,id)} checked={val.is_selected==true?true:false} />}/>
                   </RadioGroup>
                 </FormControl>
                   </div>
                   <div className='place_Order_name'>{val.name}</div>
                   <div className='home'>{val.address_type}</div>
                   <div className='mobile'>{val.mobile}</div>
                 </div>
                 <div className='address_list_description'>
                   {val.address}
                    <br/>
                    {val.pincode}
                 </div>
                 <Collapse isOpen={val.is_selected}>
                     <div className='placeOrder_button'>
                     <Button  onClick={ChangeOrderStatus} variant="contained" color="primary">
                    DELIVERY HERE
                </Button>
                     </div>
          </Collapse>
                </div>
                
              )
            })}
             </div>
             <div className='OrderNow_button'>
           {ordernow===false? <button  disabled style={{cursor:'not-allowed',backgroundColor:'#db8686'}}  className="OrderNow">Place Orders</button>:
       <button onClick={createOrderData}  className="OrderNow">Place Order</button>}
           {/* <button   className="OrderNow">Place Orders</button> */}
             </div>
            </div>             
        </>      
    )
}
export default PaymentGetway;

import React from 'react';
import './index.css';
import Header from '../../Header'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VendorDashboard=()=>{
// alert("vendor")
const history = useHistory();

const changePage=(url)=>{
history.push(url)
}

return(
    <>
    <Header/>
    <div className='venDash_container'>
        <div className='venDash_cardContainer'>
         <Link onClick={()=>changePage('/business/vendor-dashboard/clothing-list')} 
         style={{textDecoration:'none'}}
          className='venDash_card' to='/business/products/clothing'>
         
             <img  src='https://www.thoughtco.com/thmb/C7RiS4QG5TXcBG2d_Sh9i4hFpg0=/3620x2036/smart/filters:no_upscale()/close-up-of-clothes-hanging-in-row-739240657-5a78b11f8e1b6e003715c0ec.jpg'/>
             <div className='main_content' >
                   Clothings
             </div>
           
         </Link>
          <Link style={{textDecoration:'none'}} className='venDash_card' to='/business/products/books'>
          <img  src='https://st.depositphotos.com/1741875/1237/i/950/depositphotos_12376816-stock-photo-stack-of-old-books.jpg'/>
             <div className='main_content' >
                   Books
             </div>
          </Link>
           <Link style={{textDecoration:'none'}} className='venDash_card' to='/business/products/home&furniture'>
           <img  src='https://cdn11.bigcommerce.com/s-pkla4xn3/images/stencil/1280x1280/products/12920/127181/Genuine-leather-bed-frame-with-massage-and-safe-Modern-Soft-Beds-Home-Bedroom-Furniture-cama-muebles__67194.1542878684.jpg?c=2?imbypass=on'/>
             <div className='main_content' >
                   Home&Furniture
             </div>
           </Link>
           
           <Link style={{textDecoration:'none'}} className='venDash_card' to='/business/products/electronics'>
           <img  src='https://image.shutterstock.com/image-illustration/computer-devices-mobile-phone-laptop-260nw-217080976.jpg'/>
             <div className='main_content' >
                  Electronics
             </div>
           </Link>
           
           <Link style={{textDecoration:'none'}} className='venDash_card'  to='/business/products/grocery'>
           <img  src='https://img.etimg.com/thumb/width-640,height-480,imgsize-172382,resizemode-1,msid-75668135/industry/services/retail/grocery-sales-rise-fall-with-lockdown-fears/grocery-getty-f.jpg'/>
             <div className='main_content' >
                 Grocery
             </div>
           </Link>
           
           <Link style={{textDecoration:'none'}} className='venDash_card' to='/business/products/sports'>
               <img  src='data:image/jpeg;base64,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'/>
             <div className='main_content' >
                  Sports
             </div>
           </Link>
           
            
        
           <Link style={{textDecoration:'none'}} className='venDash_card' to='/business/products/tv&appliances'>
           <img  src='https://image.shutterstock.com/image-illustration/home-appliances-gas-cooker-tv-260nw-289426052.jpg'/>
             <div className='main_content' >
                 TV&Appliances
             </div>
           </Link>
          
            
           
        </div>
    </div>
   
    </>
)

}


export default VendorDashboard;

















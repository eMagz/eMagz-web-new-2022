import React from 'react'
import './index.css';
import { useHistory } from 'react-router-dom';
import {Link} from "react-router-dom";



const WelcomePage=()=>{


const history = useHistory();

const changePage=()=>{

history.push('/business/approve-form')

}

return(
    <>
    <div  className='welcomeHead'  >
       <div  className='welcomecard' >
        <div  className='avatarImg' >
            <img src='https://static.photocdn.pt/images/articles/2019/08/07/images/articles/2019/07/31/linkedin_profile_picture_tips-1.jpg' className='avtprof'      />

        </div>
        <div className=' WELCOME_BACK' >
            WELCOME BACK
        </div>
        <div className='profname' >
            Debanjan Goswami
        </div>
        <Link  to='/business/approve-form' >
        <div className='vendorbuttons' >
            <button onClick={changePage} className='vendorbtn vendorbtn1' >CONTINUE AS VENDOR</button>
           
        </div>
        </Link>
        
        <div className='vendorbuttons' >
        <button className='vendorbtn vendorbtn1' >CONTINUE AS DEBANJAN</button>
        </div>
        <div className='switchbuttons' >
        <button className='switchbtn switchbtn1' >SWITCH ACCOUNT</button>
        </div>

       </div>
    </div>
    </>
)


}


export default WelcomePage;















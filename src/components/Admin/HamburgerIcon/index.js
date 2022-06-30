import React from 'react'
import './index.css';


const Hamburger=({color})=>{


return(
    <>
    <div className='three' style={{backgroundColor: `${color}`}}></div>
    <div className='two' style={{backgroundColor: `${color}`}}></div>
    <div className='one' style={{backgroundColor: `${color}`}}></div>
    </>
)
}


export default Hamburger










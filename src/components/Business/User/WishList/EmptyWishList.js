import React from 'react'
import { useHistory } from "react-router-dom"
import EmptyWishImg from "../../../../assets/empty_wishlist.png"
import "./index.css"
const EmptyWishList = () => {
    const history = useHistory()
    return (
        <div className="wishWrapper">
            <div className="wishContainer">
                <img src={EmptyWishImg} alt="" />
            </div>
            <div className="wishTextContent">
                <h1 className="saveWishText">Save your Favorite here</h1>
                <p className="saveWishTextP">When you something you should buy it</p>
                <div className="saveWishBtn">
                    <button onClick={() => history.push('/business/user-dashboard')}>Let's save some</button>
                </div>
            </div>
        </div>
    )
}

export default EmptyWishList

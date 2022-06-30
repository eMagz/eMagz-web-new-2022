import React from 'react'
import "./index.css"
import newFashion from "../../../../../assets/newFashion.png"

const SelectFashion = () => {
    return (
        <div className="selectFashionContainer">
            <div className="selectFashionContent">
                <div className="selectFashionImg">
                    <img src={newFashion} />
                </div>
                <div className="selectFashionText">
                    <div className="selectFashionStyle">
                        <span># New Fashion</span>
                        <h1>Select Your Style</h1>
                    </div>
                    <div className="selectFashionLine">
                        <h3 className="shopNowLine newStyleShowNow">Shop Noew</h3>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SelectFashion

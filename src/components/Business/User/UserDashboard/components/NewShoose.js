import React from 'react'
import "./index.css"
import ProductCard from "./SimpleCard"

const NewShoose = ({ data, bigSchhose }) => {
    return (
        <div className="newShooseContainer">
            <div className="shooseProductContainer">
                {data.map((res) => (
                    <ProductCard item={res} />
                ))}
            </div>
            <div>
                <div className="largeShooseImg">
                    <img src={bigSchhose} />

                    <div className="halfCircleContainer">
                        <div className="shooseOfferZone">
                            <div className="halfCircle">
                                <div className="shoosOff">
                                    <h1>50%</h1>
                                    <span>Off</span>
                                </div>
                            </div>
                            <div className="liveShooseTime">
                                <div className="liveShooseText">
                                    <span>01</span>
                                    <p>Day</p>
                                </div>
                                <div className="liveShooseText">
                                    <span>18</span>
                                    <p>Hr</p>
                                </div>
                                <div className="liveShooseText">
                                    <span>14</span>
                                    <p>Min</p>
                                </div>
                                <div className="liveShooseText">
                                    <span>00</span>
                                    <p>Sec</p>
                                </div>
                            </div>
                        </div>
                        <div className="stayFearless">
                            <p>Stay</p>
                            <h1>Fearless</h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NewShoose

import React from "react";
import "./index.css"
import defaultImage from "../../../../../assets/new3.png";
import { useHistory } from "react-router-dom";


const SimpleCard = ({ item }) => {
    const history = useHistory();
    return (
        <div
            onClick={() =>
                history.push(`/business/user-dashboard/${item.name}`)
            }
            className="newShooseProduct"
        >
            <div className="newShooProductImg">
                <img
                    src={item.image}
                    alt=""
                />
            </div>
            <div className="newProductInfo">
                <h5>{item.name}</h5>
                <p>
                    <i class="fas fa-rupee-sign"></i> {item.price}
                </p>
            </div>
        </div>
    );
};

export default SimpleCard;

import React from 'react';
import './index.css';
import ProductImage from '../../../../../assets/product.png';
import { useHistory } from 'react-router-dom';
const ProductCard = () => {

    
    const history = useHistory();
    function ProductDetails(url) {
        history.push(url)
    }


    return (
        <>
            <div className='product_card_container'>
                <div className='product_card' onClick={() => { ProductDetails("product-details") }} >
                    <div className='product_card_head'>Gentle Skin Cleanser</div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
                        <div className='product_cost' > $12.36</div>
                        <div className='product_weight'>500 ML</div>
                    </div>
                    <div className='image_container' >
                        <img style={{ marginTop: '0px' }} className='product_image' src={ProductImage} />
                    </div>
                </div>
            </div>

        </>
    )



}



export default ProductCard;













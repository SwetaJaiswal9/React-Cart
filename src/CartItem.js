import React from 'react';
import { MdDelete } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";

const CartItem = (props) => {
        
    const {price, title, qty} = props.product;
    const {product, onIncreaseQuantity, onDecreaseQuantity, onDeleteProduct} = props;

    return(
        
        <div className='cart-item'> 
        
            <div className='left-block'>
                <LazyLoadImage style={styles.image} src={product.img} effect='blur'/>
            </div>

            <div className='right-block'>

                    <div style={ {fontSize: 30} }> {title} </div>
                    <div style={ {color: "#777"} }> Rs {price} </div>
                    <div style={ {color: "#777"} }> Qty: {qty}</div>
                    
                    <div className='cart-item-actions'>
                        {/*Action Buttons*/}

                        <AiOutlinePlusCircle                     
                         className='action-icons' 
                         onClick = { () => onIncreaseQuantity(product) }
                         />

                        <AiOutlineMinusCircle
                        className='action-icons' 
                        onClick = { () => onDecreaseQuantity(product) }
                        />
                        
                        <MdDelete
                        className='action-icons'                    
                        onClick = { () => onDeleteProduct(product.id) }
                        />

                    </div>       
            </div>
        </div>
    );
}

const styles = {
    image : {
        height: 110,
        width: 110,
        borderRadius: 4 ,
        background: '#ccc'
    }
}

export default CartItem;
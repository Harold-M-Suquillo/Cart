import React, { useContext } from 'react';
import { CartContext } from '../../Other/CartContext';
import styles from './ModalItem.module.css';
// itemName
// qty
// price
export function ModalItem(props){
    const cartCtx = useContext(CartContext);

    const decrementHandler = () =>{
        cartCtx.dispatchCart({"type": "REMOVE_ONE_ITEM", "payload": {"itemName": props.name}})
    };

    const incrementHandler = () =>{
        cartCtx.dispatchCart({"type": "ADD_ONE_ITEM", "payload": {"itemName": props.name}})
    };

    return(
        <div id={styles['main-container']}>
            <div>
                <h2>{props.name}</h2>
                <p>${props.price}</p>
                <p>{props.qty}</p>
            </div>
            <div id={styles['btn-container']}>
                <button className={`${styles['btn-close']} ${styles['btn-style']}`} onClick={decrementHandler}>-</button>
                <button className={`${styles['btn-close']} ${styles['btn-style']}`}  onClick={incrementHandler}>+</button>
            </div>
        </div>
    );
}
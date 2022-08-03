import React, { useContext, useState } from 'react';
import { CartContext } from '../../Other/CartContext';
import ReactDOM from 'react-dom';
import styles from './CartModal.module.css';
import { ModalItem } from './ModalItem';
import { Checkout } from './Checkout';

export function Backdrop(props){
    return(
        <div id={styles.backdrop} onClick={props.onClose}></div>
    );
}

export function CartModalOverlay(props){
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);
    
    const orderHandler = () => {
        if (cartCtx.totalPrice !== 0){
            setIsCheckout(true);
        }        
    }
    const submitOrderHandler = async(userData) => {
        fetch('https://react-http-7b0c4-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.cart
            })
        })

    };

    return(
        <div id={styles.modal} >
            <div id={styles['inner-container']}>
                {Object.keys(cartCtx.cart).map( (key, index) => {
                    return <ModalItem name={key} key={"value_" + index} qty={cartCtx.cart[key].qty} price={cartCtx.cart[key].price}/>
                })}
                <header id={styles['total-amount']}>
                    <h2>Total Amount</h2>
                    <h2>${Math.abs(cartCtx.totalPrice).toFixed(2)}</h2>
                </header>
                {isCheckout && Math.floor(cartCtx.totalPrice) !== 0 && <Checkout onSubmit={submitOrderHandler} onCancel={props.onClose}/>}
                {!isCheckout &&
                    <footer>
                        <button id={styles['btn-order']} className={styles['btn-style']} onClick={orderHandler}>Order</button>
                        <button id={styles['btn-close']} className={styles['btn-style']} onClick={props.onClose}>close</button>
                    </footer>
                }
            </div>
        </div>
    );
}


export function CartModal(props){
    return(
        <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById("backdrop-root"))}
        {ReactDOM.createPortal(<CartModalOverlay onClose={props.onClose}/>, document.getElementById("overlay-root"))}
        </>
    );
}




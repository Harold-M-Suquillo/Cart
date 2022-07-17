import React, { useContext } from 'react';
import { CartContext } from '../../Other/CartContext';
import ReactDOM from 'react-dom';
import styles from './CartModal.module.css';

export function Backdrop(props){
    return(
        <div id={styles.backdrop} onClick={props.onClose}></div>
    );
}

export function CartModalOverlay(props){
    const cartCtx = useContext(CartContext);
    
    const orderHandler = () => {
        console.log("ORDERING.....");
    }

    return(
        <div id={styles.modal} >
            <div id={styles['inner-container']}>
                <header id={styles['total-amount']}>
                    <h2>Total Amount</h2>
                    <h2>${cartCtx.totalPrice.toFixed(2)}</h2>
                </header>
                <footer>
                    <button id={styles['btn-order']} className={styles['btn-style']} onClick={orderHandler}>Order</button>
                    <button id={styles['btn-close']} className={styles['btn-style']} onClick={props.onClose}>close</button>
                </footer>
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




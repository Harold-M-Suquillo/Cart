import React, { useContext, useRef} from 'react';
import styles from './MenuItem.module.css';
import { CartContext } from '../../Other/CartContext';


// price, name, description
// 
export function MenuItem(props){
    const cartCtx = useContext(CartContext);
    const inputValue = useRef();

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        // Trying to submit duplicate value
        if (props.data.name in cartCtx.cart && cartCtx.cart[props.data.name].qty === +inputValue.current.value){
            return;
        }
        // 
        else{
            cartCtx.dispatchCart(
                {"type": "MODIFY_CART",
                 "payload": 
                    {"itemName": props.data.name,
                     "price": props.data.price, 
                     "qty": +inputValue.current.value}
                }
            );
        }
    }

    return (
        <div id={styles['item-main-container']}>
            <div>
                <h3>{props.data.name}</h3>
                <p>{props.data.description}</p>
                <p id={styles.price}>{props.data.price}</p>
            </div>

            <form onSubmit={formSubmissionHandler}> 
                <div id={styles['input-form-container']}>
                    <label>Amount</label>
                    <input ref={inputValue} type="number" placeholder="0" min="0" max="100" step="1" required/>
                </div>
                <button id={styles['btn-submit']} type="submit">+Add</button>

            </form>
        </div>
    );
}
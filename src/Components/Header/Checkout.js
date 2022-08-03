import React from 'react';
import styles from './Checkout.module.css';
import { useInput } from '../../Hooks/useInput';
import { useHttp } from '../../Hooks/useHttp';

const Checkout = props => {

    const {
        value: nameValue,
        inputIsValid: isNameValid,
        hasError: nameHasError,
        valueInputBlurHandler: nameInputBlurHandler,
        valueInputHandler: nameInputHandler,
        reset: resetName
    } = useInput ( value => value.trim() !== '');

    const {
        value: streetValue,
        inputIsValid: isStreetValid,
        hasError: streetHasError,
        valueInputBlurHandler: streetInputBlurHandler,
        valueInputHandler: streetInputHandler,
        reset: resetStreet
    } = useInput( value => value.match(/^[#.0-9a-zA-Z\s,-]+$/));

    const {
        value: postalValue,
        inputIsValid: isPostalValid,
        hasError: postalHasError,
        valueInputBlurHandler: postalInputBlurHandler,
        valueInputHandler: postalInputHandler,
        reset: resetPostal
    } = useInput ( value => value.match(/^[0-9]{5}(-[0-9]{4})?$/));

    const {
        value: cityValue,
        inputIsValid: isCityValid,
        hasError: cityHasError,
        valueInputBlurHandler: cityInputBlurHandler,
        valueInputHandler: cityInputHandler,
        reset: resetCity
    } = useInput( value => value.trim() !== '');


    // Overall Form state
    let formIsValid = false;
    if (isNameValid && isStreetValid && isPostalValid && isCityValid){
        formIsValid = true;
    }

    const submitFormHandler = (event) => {
        event.preventDefault();
        // Submit the Form
        props.onSubmit({ nameValue, streetValue, postalValue, cityValue });
        // Reset all the values
        resetName();
        resetStreet();
        resetPostal();
        resetCity();
    }

    const nameErrorClass = nameHasError ? 'control invalid' : 'control';
    const streetErrorClass = streetHasError ? 'control invalid' : 'control';
    const postalErrorClass = postalHasError ? 'control invalid' : 'control';
    const cityErrorClass = cityHasError ? 'control invalid' : 'control';

    return(
        <form onSubmit={submitFormHandler}>
            <div className={styles.control}>
                <label htmlFor="name">Your Name</label>
                <input className={nameErrorClass} type="text" id="name" value={nameValue} onBlur={nameInputBlurHandler} onChange={nameInputHandler}/>
            </div>
            <div className={styles.control}>
                <label htmlFor="street">Street</label>
                <input className={streetErrorClass} type="text" id="street" value={streetValue} onBlur={streetInputBlurHandler} onChange={streetInputHandler}/>
            </div>
            <div className={styles.control}>
                <label htmlFor="postal">Postal Code</label>
                <input className={postalErrorClass} type="text" id="postal" value={postalValue} onBlur={postalInputBlurHandler} onChange={postalInputHandler}/>
            </div>
            <div className={styles.control}>
                <label htmlFor="city">City</label>
                <input className={cityErrorClass} type="text" id="city" value={cityValue} onBlur={cityInputBlurHandler} onChange={cityInputHandler}/>
            </div>
            <button disabled={!formIsValid}>Confirm</button>
            <button onClick={props.onCancel}>Cancel</button>

        </form>
    );
};
export { Checkout }
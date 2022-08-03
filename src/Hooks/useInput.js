import { useState } from 'react';

const useInput = (validateInputHandler) => {
    const [value, setValue] = useState('');
    const [isTouched, setIstouched] = useState(false);

    const inputIsValid = validateInputHandler(value);
    const hasError = !inputIsValid && isTouched;

    const valueInputHandler = (e) =>{
        setValue(e.target.value);
        console.log("dfwf");
    };

    const valueInputBlurHandler = () =>{
        setIstouched(true);
    };

    const reset = () =>{
        setValue('');
        setIstouched(false);
    };

    return {
        value,
        inputIsValid,
        hasError,
        valueInputBlurHandler,
        valueInputHandler,
        reset
    }
};
export { useInput };
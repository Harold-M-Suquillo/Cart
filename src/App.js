import React, { useContext} from 'react';
import './App.css';
import { CartContext } from './Other/CartContext';
import { Header } from './Components/Header/Header';
function App() {
  const cartCtx = useContext(CartContext);

  const incrementHandler = () =>{

    cartCtx.dispatchCart(
      {
        'type': 'ADD_ONE_ITEM',
        payload: {
          'itemName': 'milk'

        }
      }
    );
    console.log(cartCtx);
  };

  return (
    <>  
      <Header/>
      <p>{JSON.stringify(cartCtx.cart)}</p>
      <p>{JSON.stringify(cartCtx.totalNumItems)}</p>
      <p>{JSON.stringify(cartCtx.totalPrice)}</p>
      <button>DECREMENT BY ONE</button>
      <button onClick={incrementHandler} >INCREMENT BY ONE</button>
    </>
  );
}

export default App;


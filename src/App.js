import React, { useContext} from 'react';
import './App.css';
import { CartContext } from './Other/CartContext';

function App() {
  const cartCtx = useContext(CartContext);

  const incrementHandler = () =>{
    cartCtx.dispatchCart(
      {
        'type': 'MODIFY_CART',
        payload: {
          'itemName': 'Milk',
          'price': 12,
          'qty': 2

        }
      }
    );
  };

  return (
    <div className="App">
      <p>{JSON.stringify(cartCtx.cart)}</p>
      <p>{JSON.stringify(cartCtx.totalNumItems)}</p>
      <button>DECREMENT BY ONE</button>
      <button onClick={incrementHandler} >INCREMENT BY ONE</button>
    </div>
  );
}

export default App;


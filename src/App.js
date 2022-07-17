import React, { useContext} from 'react';
import './App.css';
import { CartContext } from './Other/CartContext';
import { Header } from './Components/Header/Header';
function App() {
  const cartCtx = useContext(CartContext);

  const incrementHandler = () =>{
    cartCtx.dispatchCart(
      {
        'type': 'MODIFY_CART',
        payload: {
          'itemName': 'Milk',
          'price': 12,
          'qty': 4

        }
      }
    );
  };

  return (
    <>  
      <Header/>
      <p>{JSON.stringify(cartCtx.cart)}</p>
      <p>{JSON.stringify(cartCtx.totalNumItems)}</p>
      <p>loredfkmds dfk f kf dlv mfk ldms kljflksdkmf lgkmfs kdsml nkn fvkn vkn kv fv nmdv lkvn</p>
      <button>DECREMENT BY ONE</button>
      <button onClick={incrementHandler} >INCREMENT BY ONE</button>
    </>
  );
}

export default App;


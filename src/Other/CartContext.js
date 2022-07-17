import React, { useReducer } from 'react';
const CartContext = React.createContext(
    {
        'cart': {},
        'totalNumItems': 0,
        'totalPrice': 0.00,
        'dispatchCart': () => {}
    }
);
// SPECIAL CASE TO CONSIDER: IF Item is not in the Cart and User CLick from menu add 0 make sure to not add it to the Cart
const cartReducer = (state, action) => {
    const item = action.payload.itemName;
    switch(action.type){
        case 'MODIFY_CART':
            if (item in state.cart){
                // 0 items -> Remove
                if (action.payload.qty === 0){ // DONE
                    const updatedTotalPrice = state.totalPrice - (state.cart[item].price * state.cart[item].qty);
                    const NewCart = {...state.cart};
                    delete NewCart[item];
                    return {'cart': NewCart, 'totalNumItems': state.totalNumItems - state.cart[item].qty, 'totalPrice': updatedTotalPrice};
                }
                // Modify the old value with the new value
                else{ // DONE
                    const updatedTotalPrice = state.totalPrice + ((action.payload.qty - state.cart[item].qty) * action.payload.price);
                    const updatedItem = {"price": state.cart[item].price, "qty": action.payload.qty};
                    const updatedTotalItems = state.totalNumItems +  (action.payload.qty - state.cart[item].qty);
                    return {'cart': {...state.cart, [item]: updatedItem}, 'totalNumItems': updatedTotalItems, 'totalPrice': updatedTotalPrice};
                }
            }
            // Item not in cart -> add it updatedItem
            else{ // DONE
                const updatedTotalPrice = (action.payload.price * action.payload.qty) + state.totalPrice;
                const newItem = {"price": action.payload.price, "qty": action.payload.qty}
                const updatedTotalItems = state.totalNumItems + action.payload.qty;
                return {'cart': {...state.cart, [item]: newItem}, 'totalNumItems': updatedTotalItems, 'totalPrice': updatedTotalPrice};
            }
        case 'REMOVE_ONE_ITEM':
            // At least 1 is already in cart
            if (state.cart[item].qty > 1){
                const updatedTotalPrice = state.totalPrice - state.cart[item].price;
                const updatedItem = {"price": state.cart[item].price, "qty": state.cart[item].qty - 1};
                return {'cart': {...state.cart, [item]: updatedItem}, 'totalNumItems': state.totalNumItems - 1, 'totalPrice': updatedTotalPrice};
            }
            // Last item in cart -> remove it
            else{
                const updatedTotalPrice = state.totalPrice - state.cart[item].price;
                const NewCart = {...state.cart};
                delete NewCart[item]; 
                return {'cart': NewCart, 'totalNumItems': state.totalNumItems - 1, 'totalPrice': updatedTotalPrice};
            }
        case 'ADD_ONE_ITEM':
            // At least 1 is already in cart
            const updatedTotalPrice = state.totalPrice + state.cart[item].price;
            const updatedItem = {"price": state.cart[item].price, "qty": state.cart[item].qty + 1};
            return {'cart': {...state.cart, [item]: updatedItem}, 'totalNumItems': state.totalNumItems + 1, 'totalPrice': updatedTotalPrice};
        default:
            return state;
    }
};

const CartContextProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, {'cart': {}, 'totalNumItems': 0, "totalPrice": 0});
    
    return(
        <CartContext.Provider
            value={{
                'cart': cartState.cart,
                'totalNumItems': cartState.totalNumItems,
                'totalPrice': cartState.totalPrice,
                'dispatchCart': dispatchCart
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}
export {CartContext, cartReducer, CartContextProvider};


//          Data passed into Dispatch (Menu)
//  {
//      "type": "MENU_MODIFIER",
//      "payload": {
//          "itemName": "Item Name"
//          "price": ITEM_PRICE (FLOAT)
//          "qty": NUM_ITEMS (FLOAT)
//      }
//
//  }
//

//          Data passed into Dispatch (Modal)
//  {
//      "type": "MENU_MODIFIER"
//      "payload": {
//          "itemName": "Item Name"
//      }
//
//  }
//


//              How UseReducer Stores Data
//  {
//      "cart": {
//          "ITEMNAME": {"price": 123, "qty": 12323},
//          "ITEMNAME": {"price": 123, "qty": 12323},
//          "ITEMNAME": {"price": 123, "qty": 12323}
//      },
//      "totalItemsInCart": 112,
//      "amountTotal": 122.234
//  }
//
//
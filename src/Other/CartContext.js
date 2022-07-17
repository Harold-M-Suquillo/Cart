import React, { useReducer } from 'react';
const CartContext = React.createContext(
    {
        'cart': {},
        'totalNumItems': 0,
        'dispatchCart': () => {}
    }
);
// SPECIAL CASE TO CONSIDER: IF Item is not in the Cart and User CLick from menu add 0 make sure to not add it to the Cart
const cartReducer = (state, action) => {
    const item = action.payload.itemName;
    switch(action.type){
        case 'MODIFY_CART':
            // Check if in the cart
            if (item in state.cart){
                console.log("item in cart");

                // Check if we it to be 0 - Remove
                if (action.payload.qty === 0){
                    const NewCart = {...state.cart};
                    delete NewCart[item];
                    return {'cart': NewCart, 'totalNumItems': state.totalNumItems - state.cart[item].qty};
                }
                // Modify the old value with the new value
                else{
                    const updatedItem = {"price": state.cart[item].price, "qty": action.payload.qty};
                    const updatedTotalItems = state.totalNumItems - state.cart[item].qty + action.payload.qty;
                    return {'cart': {...state.cart, [item]: updatedItem}, 'totalNumItems': updatedTotalItems}
                }
            }
            // Add to cart if not in the cart
            else{
                const newItem = {"price": action.payload.price, "qty": action.payload.qty}
                const updatedTotalItems = state.totalNumItems + action.payload.qty;
                return {'cart': {...state.cart, [item]: newItem}, 'totalNumItems': updatedTotalItems};
            }
        case 'REMOVE_ONE_ITEM':
            // At least 1 is already in cart
            if (state.cart[item].qty > 1){
                const updatedItem = {"price": state.cart[item].price, "qty": state.cart[item].qty - 1};
                return {'cart': {...state.cart, [item]: updatedItem}, 'totalNumItems': state.totalNumItems - 1};
            }
            // Remove from cart (0 items)
            else{
                const NewCart = {...state.cart};
                delete NewCart[item]; 
                return {'cart': NewCart, 'totalNumItems': state.totalNumItems - 1};
            }
        case 'ADD_ONE_ITEM':
            // At least 1 is already in cart
            const updatedItem = {"price": state.cart[item].price, "qty": state.cart[item].qty + 1};
            return {'cart': {...state.cart, [item]: updatedItem}, 'totalNumItems': state.totalNumItems + 1};
        default:
            return state;
    }
};

const CartContextProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, {"cart": {}, "totalNumItems": 0,});

    return(
        <CartContext.Provider
            value={{
                'cart': cartState.cart,
                'totalNumItems': cartState.totalNumItems,
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
//      "totalItemsInCart": 112
//  }
//
//
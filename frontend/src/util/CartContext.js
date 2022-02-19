import React, { useState, useEffect } from 'react';

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        return (
            sessionStorage.setItem("cart", cart)
        )
    }, [cart])

    const addToCart = (newCartItem) => {
        console.log("CartContext - addToCart cart:", cart);
        /*
  //     Using a callback/wrapper function the spread operator and 
  //     the new item (props) to be added to the cartContent array.
  //     This is the proper way to add to an array in react useState hooks.
  //     ref: https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
  //     accessed Feb. 10, 2022.
  //     setCartContent(cartContent => [...cartContent, props])
  //   */
        if (newCartItem && newCartItem.id && newCartItem.qty) setCart(cartItems => [...cartItems, newCartItem]);
        else console.log("CartContext - addToCart: newCartItem missing id, qty, or both");
    }

    return (
        <CartContext.Provider value={{
            cart,
            addToCart
        }} >
            {children}
        </CartContext.Provider>
    )
}


const CartConsumer = ({ children }) => {
    return (
        <CartContext.Consumer>
            {children}
        </CartContext.Consumer>
    )
}

const Cart = ({ cartData }) => {
    const numberOfItems = cartData.cart ? cartData.cart.length : 0;
    console.log("CartContext - Cart - cartData", cartData);
    return (
        <div className="cart-wrapper">
            <div className="cart">
                {numberOfItems > 0
                    ? <><span className="material-icons cart">shopping_cart </span><i className="cart-items">{numberOfItems}</i></>
                    : <i className="material-icons-outlined cart">shopping_cart</i>
                }
            </div>
        </div>
    );
}


export {
    CartProvider,
    CartConsumer,
    Cart
}
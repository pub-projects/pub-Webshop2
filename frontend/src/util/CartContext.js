import React, { useState, useEffect, Profiler } from 'react';
import { CartItemListHover } from '../components/CartItemListHover';

const profilerCB = (id, phase) => {
    console.log("Profiler:", id + " " + phase);
}

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const tmpCart = sessionStorage.getItem("cart");
        setCart(() => (
            tmpCart
                ? JSON.parse(tmpCart)
                : []
        ));

    }, []);

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
        if (newCartItem && newCartItem.id && newCartItem.qty) {
            setCart(cartItems => [...cartItems, newCartItem]);
            const newCartArray = cart;
            newCartArray.push(newCartItem);
            sessionStorage.setItem("cart", JSON.stringify(newCartArray));
        }
        else console.log("CartContext - addToCart: newCartItem missing id, qty, or both");
    }

    return (
        <Profiler id="CartContext-CartProvider" onRender={profilerCB}>
            <CartContext.Provider value={{
                cart,
                addToCart
            }} >
                {children}
            </CartContext.Provider>
        </Profiler>
    )
}


const CartConsumer = ({ children }) => {
    return (
        <Profiler id="CartContext-CartConsumer" onRender={profilerCB}>
            <CartContext.Consumer>
                {children}
            </CartContext.Consumer>
        </Profiler>
    )
}

const Cart = ({ cartData }) => {
    const numberOfItems = cartData.cart ? cartData.cart.length : 0;
    console.log("CartContext - Cart - cartData", cartData);
    return (
        <Profiler id="CartContext-Cart" onRender={profilerCB}>
            <div className="cart-wrapper">
                <div className="cart">
                    {numberOfItems > 0
                        ? <><span className="material-icons cart">shopping_cart </span><i className="cart-items">{numberOfItems}</i></>
                        : <i className="material-icons-outlined cart">shopping_cart</i>
                    }
                </div>
                <CartItemListHover />
            </div>
        </Profiler>
    );
}


export {
    CartProvider,
    CartConsumer,
    Cart
}
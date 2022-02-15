import React, { useState, useEffect } from 'react';

const CartData = React.createContext();
const CartConsumer = CartData.Consumer;

const CartContext = props => {
    if (sessionStorage.getItem('cart') === 'undefined') sessionStorage.removeItem('cart');
    const cartStorage = sessionStorage.getItem('cart');
    const [cart, setCart] = useState(() => {
        return (
            cartStorage
                ? JSON.parse(cartStorage)
                : []
        );
    });

    useEffect(() => {
        CartItem();
    }, [cart]);

    const addToCart = ({ id, qty }) => {
        const newCartItem = { id, qty };
        const sessionCart = sessionStorage.getItem('cart');

        if (!sessionCart) {
            sessionStorage.setItem('cart', '[' + JSON.stringify(newCartItem) + ']');
        }
        else {
            const parsedCart = JSON.parse(sessionCart);
            const tmpCart = [];
            for (let i = 0; i < parsedCart.length; i++) {
                tmpCart.push(parsedCart[i]);
            }

            // Check if item is already added
            const objIndx = tmpCart.findIndex((obj => obj.id === newCartItem.id));
            objIndx < 0
                ? tmpCart.push(newCartItem)
                : tmpCart[objIndx].qty += Number(newCartItem.qty);

            sessionStorage.setItem('cart', JSON.stringify(tmpCart));

            setCart(tmpCart);
        }
    }

    return (
        <CartData.Provider value={{
            ...cart,
            addToCart
        }}>
            {props.children}
        </CartData.Provider>
    );
}

const CartItem = () => {
    const cartStorage = JSON.parse(sessionStorage.getItem('cart'));
    const x = cartStorage && cartStorage.length;

    return (
        <div className="cart">
            {
                x > 0
                    ? <><span className="material-icons">shopping_cart</span><i className="cart-items">{x}</i></>
                    : <span className="material-icons-outlined">shopping_cart</span>
            }
        </div>
    );
}

export {
    CartContext,
    CartConsumer,
    CartItem
}
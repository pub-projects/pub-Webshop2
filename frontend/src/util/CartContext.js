import React, { useState, useEffect } from 'react';

const CartData = React.createContext();
const CartConsumer = CartData.Consumer;

const CartContext = props => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cartStorage = sessionStorage.getItem('cart');
        console.log("CartContext - uesEffect cartStorage:", cartStorage);
        setCart(() => {
            return (
                cartStorage
                    ? JSON.parse(cartStorage)
                    : []
            );
        });

        setCart();
    }, []);

    const addToCart = ({ id, qty }) => {
        const newCartItem = { id, qty };
        const _sessionCart = sessionStorage.getItem('cart');

        console.log("CartContext - addToCart newCartItem:", newCartItem);
        console.log("CartContext - addToCart _sessionCart:", _sessionCart);

        if (!_sessionCart) {
            sessionStorage.setItem('cart', '[' + JSON.stringify(newCartItem) + ']');
        }
        else {
            const _parsedCart = JSON.parse(_sessionCart);
            const tmpCart = [];
            for (let i = 0; i < _parsedCart.length; i++) {
                tmpCart.push(_parsedCart[i]);
                console.log("_parsedCart i:", i);
            }
            console.log("CartContext - addToCart _parsedCart B4 Check:", _parsedCart);
            console.log("CartContext - addToCart tmpCart B4 Check:", tmpCart);
            // Check if item is already added
            const _objIndx = tmpCart.findIndex((obj => obj.id === newCartItem.id));
            // let _objIndx = -1;
            // for (let i = 0; i < tmpCart.length; i++) {
            //     if (tmpCart[i].id === newCartItem.id) _objIndx = i;
            //     console.log("index i:", i);
            // }

            console.log("CartContext - addToCart tmpCart B4 update:", tmpCart);
            console.log("CartContext - addToCart _objIndx:", _objIndx);

            _objIndx < 0
                ? tmpCart.push(newCartItem)
                : tmpCart[_objIndx].qty += Number(newCartItem.qty);

            console.log("CartContext - addToCart tmpCart.id:", tmpCart.id);
            console.log("CartContext - addToCart tmpCart.qty:", tmpCart.qty);
            // sessionStorage.removeItem('cart');
            sessionStorage.setItem('cart', JSON.stringify(tmpCart));
            setCart(tmpCart);
        }
        // const newCartItem = { id, qty };
        // console.log("CartContext - addToCart cart:", typeof cart);
        // cart !== undefined
        //     ? setCart(...cart, newCartItem)
        //     : setCart(newCartItem);
        // console.log("CartContext - addToCart cart:", cart);
        // sessionStorage.setItem('cart', JSON.stringify())
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
    return (
        <div className="cart">
            <span className="material-icons-outlined cart">
                shopping_cart
            </span>
        </div>
    );
}

export {
    CartContext,
    CartConsumer,
    CartItem
}
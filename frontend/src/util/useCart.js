import { useState } from 'react';

export const useCart = () => {
    const [cart, _setCart] = useState(() => {
        return localStorage.getItem('cart');
    });
    const setCart = cartItem => {
        localStorage.setItem('cart', cartItem);
        _setCart(cartItem);
    }

    return [cart, setCart];
}
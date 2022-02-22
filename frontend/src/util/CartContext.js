import React, { useState, useEffect, useRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import { CartItemListHover } from '../components/CartItemListHover';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Profiler, proCB } from '../util/Profiler';


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
        // console.log("CartContext - addToCart cart:", cart);
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
        <CartContext.Provider value={{
            cart,
            addToCart
        }} >
            {/* <Profiler id="CartProvider" onRender={proCB} /> */}
            {children}
        </CartContext.Provider>
    )
}


const CartConsumer = ({ children }) => {
    return (
        <><Profiler id="CartConsumer" onRender={proCB} />
            <CartContext.Consumer>

                {children}
            </CartContext.Consumer>
        </>
    )
}


const Cart = ({ cartData }) => {
    const numberOfItems = cartData.cart ? cartData.cart.length : 0;
    // console.log("CartContext - Cart - cartData", cartData);
    const [show, setShow] = useState(false);
    const handleOnMouseEnter = () => {
        setShow(true);
    }
    const handleOnMouseLeave = () => {
        setShow(false);
    }
    const ref = useRef(null);
    return (
        // <Profiler id="CartContext-Cart" onRender={profilerCB}>
        <OverlayTrigger
            //trigger={['hover', 'focus']}
            show={show} // Control trigger behavior with show instead of trigger.
            key='bottom'
            placement='bottom-end'
            container={ref}
            overlay={
                <Popover id={`popover-positioned-bottom`} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
                    <Popover.Header as="h4">Cart Items</Popover.Header>
                    <Popover.Body>
                        <CartItemListHover cartData={cartData} />
                    </Popover.Body>
                </Popover>
            }
        >
            {/* <Profiler id="Cart" onRender={proCB} /> */}
            <div className="cart-wrapper" ref={ref} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
                <Nav.Link href="/cart">
                    <div className="cart" >
                        {numberOfItems > 0
                            ? <><span className="material-icons cart">shopping_cart </span><i className="cart-items">{numberOfItems}</i></>
                            : <i className="material-icons-outlined cart">shopping_cart</i>
                        }
                    </div>
                </Nav.Link>
            </div>
        </OverlayTrigger>
        // </Profiler>
    );
}


export {
    CartProvider,
    CartConsumer,
    Cart
}
import { ProductConsumer } from '../util/ProductsContext';
import { useEffect, useState } from 'react';
import { Profiler, proCB } from '../util/Profiler';
import { DisplayPrice } from './DisplayPrice';

export const CartItemListHover = ({ cartData, removeItemFromCart }) => {
    const [cartTotalAmout, setCartTotalAmount] = useState(0);
    const addToCartTotalAmount = (amount => {
        let tmp = amount + cartTotalAmout;;
        setCartTotalAmount(tmp);
    });
    let product;
    const bundle = {};
    bundle.addToTotal = addToCartTotalAmount;
    bundle.removeFromCart = removeItemFromCart;
    bundle.cartData = cartData;
    bundle.cartTotal = 0;

    if (!cartData.cart || cartData.cart.length < 1) return <div></div>;
    //product={product} cart={item} cartData={cartData} removeItemFromCart={removeItemFromCart} addToTotal={addToCartTotalAmount}

    return (
        <><Profiler id="CartItemListHover" onRender={proCB} />
            <ProductConsumer>{(products) => (
                cartData.cart.map(item => {
                    //bundle.cart = item;
                    product = products.find(({ _id }) => _id === item.id)
                    return (
                        <CartItem key={item.id} bundle={bundle} cart={item} product={product} />
                    )
                })

            )}
            </ProductConsumer>
        </>
    );
}
//product, cart, cartData, removeItemFromCart, addToTotal
const CartItem = ({ bundle, cart, product }) => {
    console.log("CartItem - bundle", bundle);
    console.log("CartItem - cart", cart);
    const urlImageBase = "/api/images/";
    const [qty, setQty] = useState(cart.qty);
    const name = product.name.substring(0, 25);

    //bundle.addToTotal(qty * bundle.product.price);
    // bundle.cart.qty += qty * product.price;

    return (
        <div className="cart-hover-items">
            <Profiler id="CartItem" onRender={proCB} />
            <div className="cart-item-image cart-item"><img src={product.imgRef.match('=') ? urlImageBase + product.imgRef.split('=')[1] : product.imgRef} alt={product.name} className="image-small" /></div>
            <div className="cart-item-name cart-item">{name}</div>
            <div className="cart-item-price cart-item"><DisplayPrice displayStyle="regular" price={product.price} /></div>
            <div className="cart-item-qty cart-item"><input className="input-qty" type="number" step="1" value={qty} onChange={e => setQty(e.target.value)} /></div>
            <div className="cart-item-delete cart-item"><button className="material-icons cart-item-delete-icon" onClick={e => bundle.removeItemFromCart(bundle.product)}>remove_circle</button></div>
        </div>
    );
}


// export const CartItemListHover = ({ cartData }) => {
//     if (!cartData.cart || cartData.cart.length < 1) return <div></div>;
//     let product;
//     return (
//         cartData.cart.map(item => {
//             return (
//                 <ProductConsumer>{(products) => {
//                     {/* console.log("CartItemListHover - products:", products) */}
// product = products.find(({ _id }) => _id === item.id)
// {/* console.log("CartItemListHover - product", product) */ }
// return (
//     <CartItem product={product} cart={item} />
// )
//                 }}
//                 </ProductConsumer >
//             )
//         })
//     );
// }


//    cartData.cart.map(item => (
//             <ProductConsumer> {(products) => (
//                 <>{console.log(products)}

//                     {product = products.find(item.id)}
//                     <CartItem key={item.id} item={item} product={product} />
//                 </>
//             )}
//             </ProductConsumer>
//         ))
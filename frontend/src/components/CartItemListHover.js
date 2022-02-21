import { ProductConsumer } from '../util/ProductsContext';
import { useEffect, useState } from 'react';

export const CartItemListHover = ({ cartData }) => {
    if (!cartData.cart || cartData.cart.length < 1) return <div></div>;
    let product;
    let item;
    return (
        cartData.cart.map(item => {
            return (
                <ProductConsumer>{(products) => {
                    product = products.find(id => id === cartData.cart.id)
                    return (
                        <CartItem item={product} data={cartData} />
                    )
                }}
                </ProductConsumer>
            )
        })
    );
}

const CartItem = (props) => {
    return (
        <div>Item</div>
    );
}
//    cartData.cart.map(item => (
//             <ProductConsumer> {(products) => (
//                 <>{console.log(products)}

//                     {product = products.find(item.id)}
//                     <CartItem key={item.id} item={item} product={product} />
//                 </>
//             )}
//             </ProductConsumer>
//         ))
import { ProductConsumer } from '../util/ProductsContext';
import { useEffect, useState } from 'react';

export const CartItemListHover = ({ cartData }) => {
    if (!cartData.cart || cartData.cart.length < 1) return <div></div>;
    let product;
    return (
        cartData.cart.map(item => {
            return (
                <ProductConsumer>{(products) => {
                    console.log("CartItemsListHover - products:", products)
                    product = products.find(({ _id }) => _id === item.id)
                    console.log("CartItemListHover - product", product)
                    return (
                        <CartItem product={product} cart={item} />
                    )
                }}
                </ProductConsumer>
            )
        })
    );
}

const CartItem = ({ product, cart }) => {
    console.log("CartItem - product", product);
    console.log("CartItem - cart", cart);
    const [qty, setQty] = useState(cart.qty);
    return (
        <div><table>
            <tr>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td><input type="number" step="1" value={qty} onChange={e => setQty(e.target.value)} /></td>
            </tr>
        </table></div>
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
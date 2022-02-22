import { ProductConsumer } from '../util/ProductsContext';
import { useEffect, useState } from 'react';
import { Profiler, proCB } from '../util/Profiler';

export const CartItemListHover = ({ cartData }) => {
    if (!cartData.cart || cartData.cart.length < 1) return <div></div>;
    let product;
    return (
        <><Profiler id="CartItemListHover" onRender={proCB} />
            <ProductConsumer>{(products) => (
                cartData.cart.map(item => {
                    product = products.find(({ _id }) => _id === item.id)
                    return (
                        <CartItem key={item.id} product={product} cart={item} />
                    )
                })

            )}
            </ProductConsumer>
        </>
    );
}

const CartItem = ({ product, cart }) => {
    console.log("CartItem - product", product);
    console.log("CartItem - cart", cart);
    const urlImageBase = "/api/images/";
    const [qty, setQty] = useState(cart.qty);
    return (
        <div className="cart-hover-items">
            <Profiler id="CartItem" onRender={proCB} />
            <div><img src={product.imgRef.match('=') ? urlImageBase + product.imgRef.split('=')[1] : product.imgRef} alt={product.name} className="image-small" /></div>
            <div>{product.name}</div>
            <div>{product.price}</div>
            <div><input className="input-qty" type="number" step="1" value={qty} onChange={e => setQty(e.target.value)} /></div>
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
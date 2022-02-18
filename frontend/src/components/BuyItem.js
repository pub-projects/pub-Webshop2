import { useState, useEffect } from 'react';
import { DisplayPrice } from './DisplayPrice';
import { StarRating } from './StarRating';
import { CartConsumer } from '../util/CartContext';

export const BuyItem = (props) => {
    const product = props.product;
    const [quantity, setQuantity] = useState(1);

    const handleBuyClick = (id, qty) => {

    }

    return (
        <CartConsumer>
            {(cartData) => (
                < div className="card-body buy-item-wrapper" >
                    <div className="full-size-header">
                        <div>
                            {product.name}
                        </div>

                        <div className="price-wrapper" style={{ color: "red" }}>
                            <DisplayPrice
                                price={product.price}
                                displayStyle="amazon"
                                symbol="$"
                                symbolPlacement="pre"
                            />
                        </div>
                        <div className="star-rating-wrapper">
                            <StarRating showDetails={false} rating={product.rating ? product.rating : 0} />
                        </div>
                    </div>
                    <span className="input-style">
                        <span className="buyItem-qty">Qty.</span>
                        <input
                            id='item-qty'
                            type='number'
                            min='0'
                            max='99'
                            step='1'
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </span>

                    <div className="button-wrapper">
                        <input
                            type="button"
                            className="btn-style add-to-cart-btn-style"
                            value="Add to Cart"
                            // onClick={handleAddToCartClick}
                            onClick={e => cartData.addToCart({ id: product._id, qty: quantity })}
                        />
                        <input
                            type="button"
                            className="btn-style buy-btn-style"
                            value="Buy Now"
                            onClick={handleBuyClick}
                        />
                    </div>
                </div>
            )}
        </CartConsumer>
    )
}
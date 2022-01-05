import { useState } from 'react';
import { DisplayPrice } from './DisplayPrice';
import { StarRating } from './StarRating';

export const BuyItem = (props) => {
    const product = props.product;
    const [quantity, setQuantity] = useState(1);

    const handleAddToCartClick = () => {
        // Handle add to cart
        // Add the item and quantity to the cart.
    }

    const handleBuyClick = () => {
        // Handle buy click
        // Go direct to buy page.
    }

    return (
        <div className="card-body buy-item-wrapper" >
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
                    <StarRating rating={product.rating ? product.rating : 0} />
                </div>
            </div>
            <span className="input-style">
                <input
                    type='number'
                    className='input-style'
                    min='0'
                    max='25'
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
                    onClick={handleAddToCartClick}
                />
                <input
                    type="button"
                    className="btn-style buy-btn-style"
                    value="Buy Now"
                    onClick={handleBuyClick}
                />
            </div>
        </div >
    )
}
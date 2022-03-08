import { Profiler, proCB } from '../util/Profiler';
import { CartConsumer } from '../util/CartContext';
import { CartItem } from '../components/CartItemListHover';

export const CartPage = () => {
    return (
        <CartConsumer>
            <Profiler id="CartPage" onRender={proCB} />
            {(cartItems) => (
                <div className="cart-page-wrapper">
                    {cartItems.map((item) => {
                        return <CartItem cart={item} />
                    })}
                </div>
            )}
        </CartConsumer>
    )
}
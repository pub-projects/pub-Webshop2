import { Profiler, proCB } from '../util/Profiler';

export const CartPage = () => {
    return (
        <div className="cart-page-wrapper">
            <Profiler id="CartPage" onRender={proCB} />
            CartPage
        </div>
    )
}
import { ProductItem } from './ProductItem';
import { ProductConsumer } from '../util/ProductsContext';
import { Profiler, proCB } from '../util/Profiler';


export const ProductList = () => {
    return (
        <ProductConsumer>
            {(products) => (
                <div className="card-group">
                    <Profiler id="ProductList" onRender={proCB} />
                    {/* {console.log("ProductList - products", products)} */}
                    {
                        products ? products.map((item, key) => {
                            return (
                                <ProductItem key={key} product={item} />
                            )
                        }) :
                            <div>Couldn't retrieve products from server.</div>
                    }
                </div>
            )}
        </ProductConsumer>
    );
}
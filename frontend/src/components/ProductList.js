import { ProductItem } from './ProductItem';
import { ProductsContext, ProductConsumer } from '../util/ProductsContext';
import { Profiler } from 'react';
const profilerCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
) => {
    console.log("Profiler - ", id + " : " + phase);
}

export const ProductList = () => {
    //console.log("ProductList");
    return (
        <Profiler id="ProductList" onRender={profilerCallback}>
            <ProductConsumer>
                {(products) => (
                    <div className="card-group">
                        {console.log("ProductList - products", products)}
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
        </Profiler >
    );
}
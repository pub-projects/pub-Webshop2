import { ProductItem } from './ProductItem';
import { ProductsContext, ProductConsumer } from '../util/ProductsContext';



export const ProductList = () => {
    //console.log("ProductList");
    return (
        <ProductsContext>
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
        </ProductsContext>
    );
}
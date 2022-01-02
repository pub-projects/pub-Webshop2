import { ProductItem } from './ProductItem';
import { ProductConsumer } from '../App';



export const ProductList = () => {
    //console.log("ProductList");
    return (
        <ProductConsumer>
            {(products) => (
                <div className="card-group">
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
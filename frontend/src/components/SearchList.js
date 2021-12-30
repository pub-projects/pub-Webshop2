import { ProductItem } from "./ProductItem";
import { ProductConsumer } from '../App';

export const SearchList = (props) => {
    console.log("SearchTerm", props['searchTerm']);
    return (
        <ProductConsumer>
            {(products) => (


                < div className="card-group">{
                    products.filter(product =>
                        product.name.toLowerCase().includes(props['searchTerm'].toLowerCase())).map((item, key) => {
                            return (
                                <ProductItem key={key} product={item} />
                            );
                        })
                }
                </div>


            )
            }
        </ProductConsumer >
    );
}
/*products.filter(product =>
                            product.name.toLowerCase() === searchTerm.value.toLowerCase()
                        )
                        */
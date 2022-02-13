import { DisplayPrice } from './DisplayPrice';
import { StarRating } from './StarRating';

export const ProductItem = (props) => {
    const product = props.product;
    const urlImageBase = "/api/images/";
    const productUrl = "/product-page/" + product._id;

    // if (props.counter > -1) {
    //     props.setCounter(props.counter + 1);
    // }

    const test_rating = { "rating": { "5": 100, "4": 33, "3": 13, "2": 36, "1": 20 } };

    return !product ? (
        <div className="productItemWrapper">
            Cannot retrieve product from server.
        </div>
    ) : (
        <div className="card shadow ms-2 me-2 mb-4 pt-2">
            <div className="cardImageWrapper px-4 py-2">
                <div className="imageContainer">
                    <a href={productUrl}>
                        <img src={product.imgRef.match('=') ? urlImageBase + product.imgRef.split('=')[1] : product.imgRef} alt={product.name} className="card-img-top" />
                    </a>
                </div>
            </div>
            <div className="card-body px-2 pb-1">
                <h5 className="card-title">
                    <a href={productUrl}>{product.name}
                    </a>
                </h5>
                <StarRating showDetails={false} rating={test_rating} />
                <div className='itemPrice'>
                    <a href={productUrl}>
                        <DisplayPrice displayStyle="amazon" symbolPlacement="pre" symbol="$" price={product.price} />
                    </a>
                </div>
            </div>
        </div>
    )
}
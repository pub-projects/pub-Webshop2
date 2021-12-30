import { DisplayPrice } from './DisplayPrice';
import { StarRating } from './StarRating';

export const ProductItem = (item) => {
    const product = item.product;
    const urlBase = "/api/images/";
    const productUrl = "/productpage/" + product._id;

    return !product ? (
        <div className="productItemWrapper">
            Cannot retrieve product from server.
        </div>
    ) : (
        <div className="card ms-2 me-2 shadow pt-2 pb-1 mb-4 rounded-3">
            <div className="cardImageWrapper px-4">
                <div className="imageContainer">
                    <a href={productUrl}>
                        <img src={product.imgRef.match('=') ? urlBase + product.imgRef.split('=')[1] : product.imgRef} alt={product.name} className="card-img-top" />
                    </a>
                </div>
            </div>
            <div className="card-body px-2">
                <h5 className="card-title">
                    <a href={productUrl}>{product.name}
                    </a>
                </h5>
                <StarRating rating="2.5" />
                <div className='itemPrice'>
                    <a href={productUrl}>
                        <DisplayPrice displayStyle="amazon" symbolPlacement="pre" symbol="$" price={product.price} />
                    </a>
                </div>
            </div>
        </div>

    )
}
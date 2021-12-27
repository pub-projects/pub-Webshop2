import ShowMoreText from 'react-show-more-text';

export const ProductItem = (item) => {
    const product = item.product;
    const urlBase = "/api/images/";

    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }

    return !product ? (
        <div className="productItemWrapper">
            Cannot retrieve product from server.
        </div>
    ) : (
        <div className="card mb-3" style={{ maxWidth: "540px", minWidth: "300px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={product.imgRef.match('=') ? urlBase + product.imgRef.split('=')[1] : product.imgRef} className="img-fluid rounded-start" alt={product.name} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted" >
                            <ShowMoreText
                                /* Default options */
                                lines={2}
                                more="Show more"
                                less="Show less"
                                className="content-css"
                                anchorClass="my-anchor-css-class"
                                onClick={executeOnClick()}
                                expanded={false}
                                width={280}
                                truncatedEndingComponent={"... "}
                            >
                                {product.shortDescription}
                            </ShowMoreText>
                        </h6>
                        <p className="card-text">
                            <ShowMoreText
                                /* Default options */
                                lines={2}
                                more="Show more"
                                less="Show less"
                                className="content-css"
                                anchorClass="my-anchor-css-class"
                                onClick={executeOnClick()}
                                expanded={false}
                                width={280}
                                truncatedEndingComponent={" ... "}
                            >
                                {product.description}
                            </ShowMoreText>
                        </p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
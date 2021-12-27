

export const ProductItem = (item) => {
    //console.log("ProductItem");
    //console.log("product:", item.product);
    const product = item.product;
    const urlBase = "/api/images/";

    return !product ? (
        <></>
    ) : (
        <div className="card mb-3" style={{ maxWidth: "540px", minWidth: "300px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={product.imgRef.match('=') ? urlBase + product.imgRef.split('=')[1] : product.imgRef} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div >
    )
}
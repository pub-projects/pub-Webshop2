import { useState } from 'react';
import { Modal, Col, Row } from 'react-bootstrap';
import { ProductConsumer } from '../App';
import { useParams } from 'react-router-dom';
import { StarRating } from '../components/StarRating';
import { DisplayPrice } from '../components/DisplayPrice';
import { BuyItem } from '../components/BuyItem';
import ShowMoreText from 'react-show-more-text';

export const ProductPage = () => {
    const { id } = useParams();
    const urlBase = "/api/images/";

    const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <ProductConsumer>{(products) => {
            //console.log("ProductPage:", products);
            const product = products.find(item => item._id === id);
            return (
                <>{product ? <>
                    <Modal show={show} onHide={handleClose} className="modal-button">
                        <Modal.Header closeButton style={{ lineHeight: "0.5em", fontSize: "0.5em", borderBottom: "0px" }}>
                        </Modal.Header>
                        <Modal.Body>
                            <img src={product.imgRef.match('=') ? urlBase + product.imgRef.split('=')[1] : product.imgRef} className="img-fluid rounded-start" alt={product.name} />
                        </Modal.Body>
                    </Modal>

                    <div className="product-card">
                        <div className="row g-0">
                            <div className="image-container col-md-3">
                                <button className="modal-image-button" onClick={handleShow}>
                                    <img src={product.imgRef.match('=') ? urlBase + product.imgRef.split('=')[1] : product.imgRef} className="img-fluid rounded-start" alt={product.name} />
                                </button>
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h4 className="card-title">{product.name}</h4>
                                    <StarRating rating={product.rating ? product.rating : 0} />
                                    <hr />

                                    <DisplayPrice
                                        price={product.price}
                                        displayStyle="amazon"
                                        symbol="$"
                                        symbolPlacement="pre"
                                    />
                                    <h6 className="items-in-stock text-muted">Items in stock: {product.itemsInStock}</h6>

                                </div>

                            </div>
                            <div className="col-md-3">
                                <BuyItem product={product} />
                            </div>
                        </div>
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>

                                <p style={{ fontWeight: "700" }}>About this item</p>
                                <ShowMoreText
                                    /* Default options */
                                    lines={3}
                                    more="(+) expand"
                                    less="(-) hide"
                                    className="content-css"
                                    anchorClass="show-more-text"
                                    onClick={executeOnClick}
                                    expanded={false}
                                    width={0}
                                    truncatedEndingComponent={"... "}
                                >
                                    <p className="card-text">{product.shortDescription}</p>
                                </ShowMoreText>
                                <p style={{ fontWeight: "700", marginTop: "1.3em" }}>Description</p>
                                <ShowMoreText
                                    /* Default options */
                                    lines={3}
                                    more="(+) expand"
                                    less="(-) hide"
                                    className="content-css"
                                    anchorClass="show-more-text"
                                    onClick={executeOnClick}
                                    expanded={false}
                                    width={0}
                                    truncatedEndingComponent={"... "}
                                >
                                    <p className="card-text">{product.description}</p>
                                </ShowMoreText>
                                <p className="card-text"><small className="text-muted"> <br /></small></p>
                            </Col>
                            <div className="col-md-3"></div>
                        </Row>
                    </div>
                </> :
                    <div className="card mb-3" style={{ maxWidth: "540px" }}>
                        No product data available.
                    </div>}</>
            );
        }}
        </ProductConsumer>
    );
}
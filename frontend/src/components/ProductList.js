import { useState, useEffect } from 'react';
import { ProductItem } from './ProductItem';
import { ProductConsumer } from '../App';



export const ProductList = () => {
    console.log("ProductList");
    return (
        <ProductConsumer>
            {(products) => (
                <div className="card-group">
                    {
                        products.map((item, key) => {
                            return (
                                <ProductItem key={key} product={item} />
                            );
                        })
                    }
                    <ProductItem />
                </div>
            )}
        </ProductConsumer>
    );
}
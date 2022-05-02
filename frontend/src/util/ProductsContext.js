import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Profiler, proCB } from '../util/Profiler';

const ProductData = React.createContext();
const ProductConsumer = ProductData.Consumer;

const ProductsContext = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // if (!products) {
        // console.log("ProductsContext - useEffect - products", products);
        const getData = async () => {
            console.log("ProductsContext - useEffect - getData");
            const data = await axios.get('/api/products/getProductList');
            const arr = await data.data;
            setProducts(arr);
            sessionStorage.setItem('products', JSON.stringify(arr));
        }

        sessionStorage.getItem('products') === null
            ? getData()
            : setProducts(JSON.parse(sessionStorage.getItem('products')));

        // }
        // console.log('context products', products);
        // return sessionStorage.removeItem("products");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /*
        Using Containment to pass calling element's children into the 
        output using the special children prop.
        ref: https://reactjs.org/docs/composition-vs-inheritance.html
    */
    return (
        <ProductData.Provider value={products}>
            {/* {console.log("productsContext - products", products)} */}
            <Profiler id="ProductsContext" onRender={proCB} />
            {props.children}
        </ProductData.Provider>
    );
}

export {
    ProductConsumer,
    ProductsContext,
}
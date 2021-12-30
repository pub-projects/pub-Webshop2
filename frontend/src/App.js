import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { Routing } from "./components/Routing";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

const ProductData = React.createContext();
export const ProductConsumer = ProductData.Consumer;




export const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await axios.get('/api/products/getProductList');
      const arr = await data.data;
      setProducts(arr);
    }

    getData();
  }, []);

  return (
    <div className="siteWrapper">
      <div className="container siteContent">
        <SiteHeader />
        <ProductData.Provider value={products}>
          <Routing />
        </ProductData.Provider>
        <SiteFooter />
      </div>
    </div>
  );
}


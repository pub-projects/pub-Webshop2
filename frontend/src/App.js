import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { Routing } from "./components/Routing";
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider } from './util/CartContext';
import { ProductsContext } from './util/ProductsContext';
import { Profiler, proCB } from './util/Profiler';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

export const App = () => {
  const [cartCookie, setCartCookie, rmvCartCookie] = useCookies([]);

  return (
    <div className="siteWrapper">
      <Profiler id="App" onRender={proCB} />
      <ProductsContext>
        <div className="container siteContent">
          <ErrorBoundary>
            <CartProvider>
              <SiteHeader />
              <Routing />
              <SiteFooter />
            </CartProvider>
          </ErrorBoundary>
        </div>
      </ProductsContext>
    </div>
  );
}


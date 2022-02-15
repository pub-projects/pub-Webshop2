import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { Routing } from "./components/Routing";
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';





export const App = () => {
  const [cartContent, setCartContent] = useState([]);
  const [cartCookie, setCartCookie, rmvCartCookie] = useCookies([]);
  // const addToCart = (props) => {

  //   // We must put the values into local storage to keep data between re-renderings.
  //   /*
  //     Using a callback/wrapper function the spread operator and 
  //     the new item (props) to be added to the cartContent array.
  //     This is the proper way to add to an array in react useState hooks.
  //     ref: https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
  //     accessed Feb. 10, 2022.
  //   */
  //   if (cartContent.length > 0) {
  //     setCartContent(cartContent => [...cartContent, props])
  //   }
  //   else {
  //     setCartContent([props]);
  //   }
  //   // localStorage.setItem("cart", JSON.stringify(cartContent));
  //   console.log("App - addToCart - cartContent", cartContent);
  // }

  /*
    Get cart data from cookie if exists and 
    persist cart data if it exists on App offload.
    I.e. store in a cookie.
  */
  useEffect(() => {
    const cName = 'cart';
    const cValue = sessionStorage.getItem('cart');
    const cOptions = { path: '/', maxAge: 30 * 24 * 60 * 60 };
    console.log("App - useEffect");
    console.log("App - useEffect - cValue", cValue);
    console.log("App - useEffect - cartCookie.cart", cartCookie.cart);

    if (!cValue) sessionStorage.setItem('cart', JSON.stringify(cartCookie.cart));

    // Clean up and store.
    return (() => {
      if (cValue !== null) {
        setCartCookie(cName, cValue, cOptions);
        console.log("App - useEffect-return - cValue", cValue);
      }
      console.log("App - useEffect - clean up");
      sessionStorage.clear();
    });
  }, [])



  return (
    <div className="siteWrapper">
      <div className="container siteContent">
        <ErrorBoundary>
          <SiteHeader />
          <Routing />
          <SiteFooter />
        </ErrorBoundary>
      </div>
    </div>
  );
}


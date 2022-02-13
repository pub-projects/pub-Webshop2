import React, { useState } from 'react';
import axios from 'axios';
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { Routing } from "./components/Routing";
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';


const CartData = React.createContext();
export const CartConsumer = CartData.Consumer;




export const App = () => {
  const [cartContent, setCartContent] = useState([]);

  const addToCart = (props) => {
    // We must put the values into local storage to keep data between re-renderings.
    /*
      Using a callback/wrapper function the spread operator and 
      the new item (props) to be added to the cartContent array.
      This is the proper way to add to an array in react useState hooks.
      ref: https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
      accessed Feb. 10, 2022.
    */

    console.log("App - props:", props);
    console.log("App - cartContent", cartContent);
    if (cartContent.length > 0) {
      setCartContent(cartContent => [...cartContent, props])
    }
    else {
      setCartContent([props]);
    }
    // localStorage.setItem("cart", JSON.stringify(cartContent));
    console.log("App - addToCart - cartContent", cartContent);
  }

  // useEffect(() => {
  //   setCartContent(JSON.parse(localStorage.cart));

  //   // console.log("App - useEffect - cartContent", cartContent);
  // }, [])



  return (
    <div className="siteWrapper">
      <div className="container siteContent">
        <ErrorBoundary>
          <SiteHeader />
          <CartData.Provider value={{
            ...cartContent,
            addToCart: addToCart
          }}>
            <Routing />
          </CartData.Provider>
          <SiteFooter />
        </ErrorBoundary>
      </div>
    </div>
  );
}


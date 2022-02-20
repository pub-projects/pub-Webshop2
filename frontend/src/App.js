import React, { useState, useEffect, Profiler } from 'react';
import { useCookies } from 'react-cookie';
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { Routing } from "./components/Routing";
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider } from './util/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';


const profilerCB = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
  interactions
) => {
  console.log("Profiler:", id + " " + phase);
  // console.log("Profiler - phase:", phase);
  // console.log("Profiler - actualDuration:", actualDuration);
  // console.log("Profiler - baseDuration:", baseDuration);
  // console.log("Profiler - startTime:", startTime);
  // console.log("Profiler - commitTime:", commitTime);
  // console.log("Profiler - interactions:", interactions);
}


export const App = () => {
  const [cartCookie, setCartCookie, rmvCartCookie] = useCookies([]);

  return (
    <Profiler id="App" onRender={profilerCB}>
      <div className="siteWrapper">
        <div className="container siteContent">
          <ErrorBoundary>
            <CartProvider>
              <SiteHeader />
              <Routing />
              <SiteFooter />
            </CartProvider>
          </ErrorBoundary>
        </div>
      </div>
    </Profiler>
  );
}


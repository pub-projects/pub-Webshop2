import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { CookiesProvider } from 'react-cookie';
import { Profiler, proCB } from './util/Profiler';

ReactDOM.render(
  <React.StrictMode>
    <Profiler id="index" onRender={proCB} />
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
  , document.getElementById('root')
);

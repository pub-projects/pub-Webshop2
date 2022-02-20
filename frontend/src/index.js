import React, { Profiler } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { CookiesProvider } from 'react-cookie';
import reportWebVitals from './reportWebVitals';

const proCB = (id, phase) => {
  console.log("Profiler - ", id + " : " + phase);
};

ReactDOM.render(
  <Profiler id="index-render" onRender={proCB}>
    <React.StrictMode>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </React.StrictMode>
  </Profiler>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

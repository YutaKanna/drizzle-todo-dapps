import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { Drizzle, generateStore } from '@drizzle/store';
import { DrizzleContext } from '@drizzle/react-plugin';
import CertificationInfo from "./contracts/CertificationInfo.json";
const options = { contracts: [ CertificationInfo ] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);
ReactDOM.render(
 <BrowserRouter>
    <DrizzleContext.Provider drizzle={drizzle}>
      <App />
    </DrizzleContext.Provider>
  </BrowserRouter>
, document.getElementById('root'));
serviceWorker.unregister();
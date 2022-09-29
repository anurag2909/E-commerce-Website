import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {store,persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
 
ReactDOM.render(
  
  // Basically we want to persist the user who has logged in. If we don't do that, we will be logged out after refreshing the page
  <Provider store={store}>
    <PersistGate loading = {null} persistor = {persistor}> 
    <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
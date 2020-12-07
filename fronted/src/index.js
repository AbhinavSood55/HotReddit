import React from "react";
import { render } from "react-dom";
import App from "./components/app";
import { createStore } from 'redux';
import allReducer from './reducers';
import { Provider } from 'react-redux';

const store = createStore(
    allReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
const appDiv = document.getElementById("app");
render(
    <Provider store = {store}>
        <App />
    </Provider>
    , 
    appDiv)
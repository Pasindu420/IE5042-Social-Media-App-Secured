import React from "react";
import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { GoogleOAuthProvider } from '@react-oauth/google'
import "./index.css"
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const container =document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}>
    <GoogleOAuthProvider clientId="733138908471-saedp0jrb7h82ite16o7ijkbi5fvbbfs.apps.googleusercontent.com">
        <App />    
    </GoogleOAuthProvider>;
    
</Provider>);
// ReactDOM.render(
    // <Provider store={store}>
    //     <App />
    // </Provider>,
//     document.getElementById("root")
//  );
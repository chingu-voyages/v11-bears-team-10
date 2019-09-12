import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureAppStore from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import { library } from '@fortawesome/fontawesome-svg-core'

import Dashboard from "./DashBoard";
import App from "./App";

import {faHome, faSearch, faTrash} from '@fortawesome/free-solid-svg-icons'
import "./index.scss";

library.add(faHome, faSearch, faTrash)

ReactDOM.render(
  <Provider
    store={configureAppStore({
      user: null,
      error: null // will be an object containing a message property , and a statusCode property
    })}
  >
    <BrowserRouter>
      <Dashboard />
      {/* <App /> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

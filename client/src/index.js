import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureAppStore from "./redux/store";
import AOS from "aos";

import * as serviceWorker from "./serviceWorker";

import "./stylesheets/css/styles.css";
import "aos/dist/aos.css";
import "./index.scss";
import "./images/icons/icons";


import App from "./App";


AOS.init({});

export const INITIAL_STATE = {
	user: null,
	error: {
		showError: false,
		statusCode: null,
		message: null,
		requestTimeout: false
	}
};

ReactDOM.render(
	<Provider store={configureAppStore(INITIAL_STATE)}>
		<App  />
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

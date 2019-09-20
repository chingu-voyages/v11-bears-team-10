import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureAppStore from "./redux/store";
import AOS from "aos";
import axios from "axios";

import * as serviceWorker from "./serviceWorker";

import "./stylesheets/css/styles.css";
import "aos/dist/aos.css";
import "./index.scss";
import "./images/icons/icons";

import App from "./App";
import { isStorageAvailable } from "./_helpers";

AOS.init();

export const IS_STORAGE_AVAILABLE = isStorageAvailable();

if (IS_STORAGE_AVAILABLE)
	axios.interceptors.request.use(function(config) {
		var authToken = localStorage.getItem("token");

		if (authToken) config.headers.Authorization = "Bearer " + authToken;

		return config;
	});

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_BASE_URL;

axios.defaults.timeout = parseInt(process.env.REACT_APP_REQUEST_TIMEOUT);

export const INITIAL_STATE = {
	user: null,

	/**
	 * null if no error , or an object containing 0 or more of these properties :
	 * message : string
	 * statusCode : int
	 * requestTimeout : bool
	 *
	 */
	error: null
};

ReactDOM.render(
	<Provider store={configureAppStore(INITIAL_STATE)}>
		<App />
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

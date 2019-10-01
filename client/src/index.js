import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureAppStore from "./redux/store";
import AOS from "aos";
import axios from "axios";

import * as serviceWorker from "./serviceWorker";

import "./stylesheets/main.scss";
import "./images/icons/icons";

import App from "./App";
import { getLocalStorageItems, removeLocalStorageItems } from "./_helpers";
import AppPlaceholder from "./AppPlaceholder";
import ErrorPage from "./errors/ErrorPage";
import Footer from "./components/Footer";

AOS.init();

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_BASE_URL;

axios.defaults.timeout = parseInt(process.env.REACT_APP_REQUEST_TIMEOUT);

const DEFAULT_INITIAL_STATE = {
	user: null,
	authToken: null,

	/**
	 * null if no error , or an object containing 0 or more of these properties :
	 * message : string
	 * statusCode : int
	 * requestTimeout : bool
	 */
	error: null,

	project: null
};

const renderApp = INITIAL_STATE =>
	render(
		<Provider store={configureAppStore(INITIAL_STATE)}>
			<App />
		</Provider>,
		document.getElementById("root")
	);

const renderPlaceholder = () => render(<AppPlaceholder />, document.getElementById("root"));

const renderErrorPage = error =>
	render(
		<>
			<ErrorPage error={error} />
			<Footer />
		</>,
		document.getElementById("root")
	);

// authentication before rendering the App component
const { user_id, authToken } = getLocalStorageItems("user_id", "authToken");

if (user_id && authToken) {
	renderPlaceholder();

	axios
		.get(`/users/${user_id}`, { headers: { Authorization: "Bearer " + authToken } })

		.then(response => {
			axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
			renderApp({ ...DEFAULT_INITIAL_STATE, authToken, user: response.data.user });
		})

		.catch(e => {
			if (e.response) {
				removeLocalStorageItems("authToken", "user_id");
				renderApp(DEFAULT_INITIAL_STATE);
			} else renderErrorPage({ requestTimeout: e.code === "ECONNABORTED" });
		});
} else renderApp(DEFAULT_INITIAL_STATE);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import { render } from "react-dom";
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
import { isStorageAvailable, getLocalStorageItems, removeLocalStorageItems } from "./_helpers";
import AppPlaceholder from "./AppPlaceholder";

AOS.init();

export const IS_STORAGE_AVAILABLE = isStorageAvailable();

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
	 *
	 */
	error: null
};

const renderApp = INITIAL_STATE =>
	render(
		<Provider store={configureAppStore(INITIAL_STATE)}>
			<App />
		</Provider>,
		document.getElementById("root")
	);

const renderPlaceholder = () => render(<AppPlaceholder />, document.getElementById("root"));

if (isStorageAvailable) {
	renderPlaceholder();
	const { user_id, authToken } = getLocalStorageItems("user_id", "authToken");
	if (user_id && authToken)
		axios
			.get(`/users/${user_id}`, {
				headers: {
					Authorization: "Bearer " + authToken
				}
			})
			.then(response => {
				axios.defaults.headers.common["Authorization"] = authToken;
				renderApp({ ...DEFAULT_INITIAL_STATE, authToken, user: response.data.user });
			})
			.catch(e => {
				removeLocalStorageItems("authToken", "user_id");
				renderApp(DEFAULT_INITIAL_STATE);
			});
	else renderApp(DEFAULT_INITIAL_STATE);
} else renderApp(DEFAULT_INITIAL_STATE);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

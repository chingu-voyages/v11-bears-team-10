import axios from "axios";
import { IS_STORAGE_AVAILABLE } from "..";

export const setUser = (user = null) => ({ type: "SET_USER", user });

export const setError = (statusCode = null, message = null, requestTimeout = false) => ({
	type: "SET_ERROR",
	statusCode,
	message,
	requestTimeout
});

export const resetError = () => ({ type: "RESET_ERROR" });

export const register = data => dispatch =>
	axios
		.post("/register", data)
		.then(response => {
			if (IS_STORAGE_AVAILABLE) localStorage.setItem("token", response.data.token);
			dispatch(setUser(response.data.user));
		})
		.catch(error => {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
			} else dispatch(setError());
		});

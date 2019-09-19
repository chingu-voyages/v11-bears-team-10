import axios from "axios";
import { IS_STORAGE_AVAILABLE } from "../index";

export const setUser = (user = null) => ({ type: "SET_USER", user });

export const setError = (statusCode = null, message = null, requestTimeout = false) => ({
	type: "SET_ERROR",
	statusCode,
	message,
	requestTimeout
});

export const resetError = () => ({ type: "RESET_ERROR" });

export const register = (data, invalidate) => dispatch =>
	axios
		.post("/register", data)
		.then(response => {
			if (IS_STORAGE_AVAILABLE) {
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("user_id", response.data.user._id);
			}
			dispatch(setUser(response.data.user));
		})
		.catch(e => {
			if (e.response) {
				const {
					status,
					data: { error }
				} = e.response;

				if (status === 401) {
					const errors = {};

					if (/username/i.test(error)) errors.username = error;
					else if (/email/i.test(error)) errors.email = error;
					else if (/password/i.test(error)) errors.password = error;

					return invalidate(errors);
				} else dispatch(setError(status));
			} else dispatch(setError(null, null, e.code === "ECONNABORTED"));

			invalidate();
			setTimeout(dispatch, 3000, resetError());
		});

export const login = (data, invalidate) => dispatch =>
	axios
		.post("/login", data)
		.then(response => {
			if (IS_STORAGE_AVAILABLE) {
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("user_id", response.data.user._id);
			}
			dispatch(setUser(response.data.user));
		})
		.catch(e => {
			if (e.response) {
				if (e.response.status === 401 || e.response.status === 400) {
					return invalidate(e.response.data.error);
				} else dispatch(setError(e.status));
			} else dispatch(setError(null, null, e.code === "ECONNABORTED"));

			invalidate();
			setTimeout(dispatch, 3000, resetError());
		});

export const logout = () => dispatch => {
	if (IS_STORAGE_AVAILABLE) {
		localStorage.removeItem("token");
		localStorage.removeItem("user_id");
	}
	dispatch(setUser(null));
};

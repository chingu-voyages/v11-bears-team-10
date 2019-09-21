import axios from "axios";
import Validation from "../validation";
import { IS_STORAGE_AVAILABLE } from "../index";

export const setUser = (user = null) => ({ type: "SET_USER", user });

export const setError = (statusCode = null, message = null, requestTimeout = false) => ({
	type: "SET_ERROR",
	statusCode,
	message,
	requestTimeout
});

export const resetError = () => ({ type: "RESET_ERROR" });

export const register = (data, invalidate) => dispatch => {
	const validation = new Validation(data, {
		username: ["min:4", "max:20", "alphanumeric"],
		password: ["min:8", "max:20", "password"],
		email: "email"
	});
	validation.validate();

	if (validation.passes)
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

					if (status === 401)
						// for this status code the server returns an 'already used' message
						// eslint-disable-next-line no-unused-vars
						for (const regex of [/username/i, /email/i, /password/i]) {
							let matches = error.match(regex);
							if (matches) {
								validation.addErrors("already used", matches[0].toLowerCase());
								break;
							}
						}
					else dispatch(setError(status));
				} else dispatch(setError(null, null, e.code === "ECONNABORTED"));

				invalidate(validation.errors);
			});
	else invalidate(validation.errors);
};

export const login = (data, invalidate) => dispatch => {
	const validation = new Validation(data, {
		username: "min:1",
		password: "min:1"
	});
	validation.validate();

	if (validation.passes)
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
					if (e.response.status === 401) return invalidate("invalid credentials");
					else dispatch(setError(e.response.status));
				} else dispatch(setError(null, null, e.code === "ECONNABORTED"));

				invalidate();
			});
	else invalidate("username or password is empty");
};

export const logout = () => dispatch => {
	if (IS_STORAGE_AVAILABLE) {
		localStorage.removeItem("token");
		localStorage.removeItem("user_id");
	}
	dispatch(setUser(null));
};

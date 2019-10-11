import axios from "axios";
import Validation from "../../validation";
import setUser from "./setUser";
import setToastError from "./setToastError";

export default function login(data, invalidate, invalidCredentials) {
	return dispatch => {
		const validation = new Validation(data, {
			username: "required",
			password: "required"
		});
		validation.validate();

		if (!validation.passes) return invalidate(validation.errors);

		axios
			.post("/login", data)

			.then(response => dispatch(setUser(response.data.user, response.data.token)))

			.catch(e => {
				if (e.response && (e.response.status === 401 || e.response.status === 422))
					return invalidCredentials();

				dispatch(setToastError(e));
				invalidate(); // stop the spinner
			});
	};
}

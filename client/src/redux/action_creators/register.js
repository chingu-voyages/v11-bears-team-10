import Validation from "../../validation";
import axios from "axios";
import setUser from "./setUser";
import setError from "./setError";

export default function register(data, invalidate) {
	return dispatch => {
		const validation = new Validation(data, {
			username: "required",
			password: "required",
			email: "required"
		});
		validation.validate();

		if (!validation.passes) return invalidate(validation.errors);

		axios
			.post("/register", data)

			.then(response => dispatch(setUser(response.data.user, response.data.token)))

			.catch(e => {
				if (!e.response)
					return dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));

				if (e.response.status === 401)
					// for this status code the server returns an 'already used' message
					// eslint-disable-next-line no-unused-vars
					for (const regex of [/username/i, /email/i, /password/i]) {
						let matches = e.response.data.error.match(regex);
						if (matches) {
							validation.addErrors("already used", matches[0].toLowerCase());
							break;
						}
					}
				else if (e.response.status === 422)
					e.response.data.errors.forEach(error =>
						validation.addErrors(error.msg, error.param)
					);
				else dispatch(setError({ statusCode: e.response.status }));

				// validation.errors is undefined if e.response doesn't exist
				invalidate(validation.errors);
			});
	};
}

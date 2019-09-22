import axios from "axios";
import Validation from "../../validation";
import setUser from "./setUser";
import setError from "./setError";

export default function login(data, invalidate) {
	return dispatch => {
		const validation = new Validation(data, {
			username: "min:1",
			password: "min:1"
		});
		validation.validate();

		if (!validation.passes) return invalidate("username or password is empty");

		axios
			.post("/login", data)

			.then(response => dispatch(setUser(response.data.user, response.data.token)))

			.catch(e => {
				if (!e.response) dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));
				else if (e.response.status !== 401)
					dispatch(setError({ statusCode: e.response.status }));

				invalidate(
					e.response && e.response.status === 401 ? "invalid credentials" : undefined
				);
			});
	};
}

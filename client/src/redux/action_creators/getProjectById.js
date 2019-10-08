import axios from "axios";
import setError from "./setError";

const getProjectById = (id, callback, error_callback) => dispatch =>
	axios
		.get(`project/${id}`)
		.then(r => callback(r.data.project))
		.catch(e => {
			if (!e.response) dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));
			else dispatch(setError({ statusCode: e.response.status }));

			error_callback();
		});

export default getProjectById;

import axios from "axios";
import setError from "./setError";

const updateProjectById = (project, callback, error_callback) => dispatch =>
	axios
		.put(`project/${project._id}`, project)
		.then(r => callback(r.data.project))
		.catch(e => {
			if (!e.response) dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));
			else dispatch(setError({ statusCode: e.response.status }));

			error_callback();
		});

export default updateProjectById;

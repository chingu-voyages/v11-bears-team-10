import axios from "axios";
import setToastError from "./setToastError";

const updateProjectById = (project, callback, error_callback) => dispatch =>
	axios
		.put(`project/${project._id}`, project)
		.then(r => callback(r.data.project))
		.catch(e => {
			dispatch(setToastError(e));
			error_callback();
		});

export default updateProjectById;

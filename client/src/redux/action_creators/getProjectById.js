import axios from "axios";
import setToastError from "./setToastError";

const getProjectById = (id, callback, error_callback) => dispatch =>
	axios
		.get(`project/${id}`)
		.then(r => callback(r.data.project))
		.catch(e => {
			dispatch(setToastError(e));
			error_callback();
		});

export default getProjectById;

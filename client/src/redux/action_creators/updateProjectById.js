import axios from "axios";
import setToastError from "./setToastError";
import setToastSuccess from "./setToastSuccess";

const updateProjectById = (project, callback, error_callback) => dispatch =>
	axios
		.put(`project/${project._id}`, project)
		.then(r => {
			dispatch(setToastSuccess('updated successfully'))
			callback(r.data.project)
		})
		.catch(e => {
			dispatch(setToastError(e));
			error_callback();
		});

export default updateProjectById;

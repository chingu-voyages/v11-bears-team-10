import axios from "axios";
import setToastError from "./setToastError";

const getAllUsers = (callback, error_callback) => dispatch => {
	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();

	axios
		.get(`users`, {
			cancelToken: source.token
		})
		.then(r => callback(r.data.users))
		.catch(e => {
			dispatch(setToastError(e));
			error_callback();
		});

	return source;
};

export default getAllUsers;

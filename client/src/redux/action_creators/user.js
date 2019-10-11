import axios from "axios";

import setToastError from "./setToastError";

export function fetchUpdatedUser(id) {
	return (dispatch, getState) => {
		axios
			.get(`/users/${id}`, {
				headers: {
					Authorization: "Bearer " + getState().authToken
				}
			})
			.then(response => {
				dispatch({
					type: "FETCH_USER",
					payload: response.data.user
				});
			})
			.catch(e => dispatch(setToastError(e)));
	};
}

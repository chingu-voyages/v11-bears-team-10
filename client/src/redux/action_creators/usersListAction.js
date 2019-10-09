import axios from "axios";
import setToastError from "./setToastError";

export function fetshUsers() {
	return (dispatch, getState) => {
		axios
			.get("/users", {
				headers: {
					Authorization: "Bearer " + getState().authToken
				}
			})
			.then(response => {
				dispatch({
					type: "SET_USERS",
					payload: response.data.users
				});
			})
			.catch(e => dispatch(setToastError(e)));
	};
}

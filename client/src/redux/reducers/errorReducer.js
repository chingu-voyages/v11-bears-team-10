import { INITIAL_STATE } from "../..";

const error = (state = {}, action) => {
	switch (action.type) {
		case "SET_ERROR":
			return {
				showError: true,
				statusCode: action.statusCode,
				message: action.message,
				requestTimeout: action.requestTimeout
			};

		case "RESET_ERROR":
			return INITIAL_STATE.error;

		default:
			return state;
	}
};

export default error;

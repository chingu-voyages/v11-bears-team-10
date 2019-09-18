const error = (state = null, action) => {
	switch (action.type) {
		case "SET_ERROR":
			return {
				statusCode: action.statusCode,
				message: action.message,
				requestTimeout: action.requestTimeout
			};

		case "RESET_ERROR":
			return null;

		default:
			return state;
	}
};

export default error;

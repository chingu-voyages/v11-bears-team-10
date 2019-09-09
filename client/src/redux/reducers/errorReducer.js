const error = (state = {}, action) => {
	switch (action.type) {
		case "SET_ERROR":
			if (action.message === null) return null;
			return { message: action.message, statusCode: action.statusCode };

		default:
			return state;
	}
};

export default error;

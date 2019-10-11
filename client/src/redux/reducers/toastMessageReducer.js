const toastMessage = (state = null, action) => {
	switch (action.type) {
		case "SET_TOAST_ERROR":
			return { type: "error", content: action.content };

		case "SET_TOAST_SUCCESS":
			return { type: "success", content: action.content };

		case "RESET_TOAST_MESSAGE":
			return null;

		default:
			return state;
	}
};

export default toastMessage;

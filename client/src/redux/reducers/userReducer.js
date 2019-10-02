const user = (state = null, action) => {
	switch (action.type) {
		case "SET_USER":
			localStorage.setItem("user_id", action.user._id);
			return action.user;

		case "RESET_USER":
			localStorage.removeItem("user_id");
			return null;

		case "FETCH_USER":
			return action.payload;

		case "UPDATE_USER":
			return {...state, ...action.payload}

		default:
			return state;
	}
};

export default user;

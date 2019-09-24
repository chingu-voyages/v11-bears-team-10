const user = (state = null, action) => {
	switch (action.type) {
		case "SET_USER":
			localStorage.setItem("user_id", action.user._id);
			return action.user;

		case "RESET_USER":
			localStorage.removeItem("user_id");
			return null;
			
		default:
			return state;
	}
};

export default user;

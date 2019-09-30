const projects = (state = null, action) => {
	switch (action.type) {
		case "SET_PROJECTS":
			return action.projects;

		case "RESET_USER":
			return null;

		default:
			return state;
	}
};

export default projects;

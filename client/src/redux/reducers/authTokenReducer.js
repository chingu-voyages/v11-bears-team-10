import axios from "axios";

const authToken = (state = null, action) => {
	switch (action.type) {
		case "SET_USER":
			console.log('set token reducer --------------------------------', action.authToken)
			// localStorage.setItem("authToken", action.authToken);
			// axios.defaults.headers.common["Authorization"] = "Bearer " + action.authToken;
			return action.authToken;

		case "RESET_USER":
			localStorage.removeItem("authToken");
			delete axios.defaults.headers.common["Authorization"];
			return null;

		default:
			return state;
	}
};

export default authToken;

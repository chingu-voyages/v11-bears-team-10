import axios from "axios";
import setProjects from "./setProjects";
import setError from "./setError";

const getUserProjects = () => (dispatch, getState) =>
	axios
		.get(`/project/user/${getState().user._id}`)

		.then(response => dispatch(setProjects(response.data.projects)))

		.catch(e => {
			dispatch(setProjects(false));

			if (e.response) dispatch(setError({ statusCode: e.response.status }));
			else dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));
		});

export default getUserProjects;

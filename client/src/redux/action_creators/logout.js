import resetUser from "./resetUser";

export default function logout() {
	return dispatch => dispatch(resetUser());
}

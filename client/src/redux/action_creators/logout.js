import resetUser from "./resetUser";

const logout = () => dispatch => dispatch(resetUser());
export default logout;

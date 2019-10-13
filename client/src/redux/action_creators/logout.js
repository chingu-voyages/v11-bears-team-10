import resetUser from "./resetUser";
import axios from 'axios'

const logout = () => dispatch => {
  dispatch(resetUser())
  localStorage.removeItem("authToken");
  localStorage.removeItem("user_id");
  delete axios.defaults.headers.common["Authorization"];
};
export default logout;

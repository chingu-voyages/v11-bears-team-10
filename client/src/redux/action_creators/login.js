import axios from "axios";
import Validation from "../../validation";
import setUser from "./setUser";
import setError from "./setError";

export default function login(data, invalidate, invalidCredentials) {
  return dispatch => {
    const validation = new Validation(data, {
      username: "required",
      password: "required"
    });
    validation.validate();

    if (!validation.passes) return invalidate(validation.errors);

    axios
      .post("/login", data)

      .then(response => {
        dispatch(setUser(response.data.user, response.data.token));
				localStorage.setItem("authToken", response.data.token);
				localStorage.setItem("user_id", response.data.user._id);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
      })

      .catch(e => {
        if (!e.response)
          return dispatch(
            setError({ requestTimeout: e.code === "ECONNABORTED" })
          );

        if (e.response.status === 401 || e.response.status === 422)
          return invalidCredentials();

        dispatch(setError({ statusCode: e.response.status }));
        invalidate(); // stop the spinner
      });
  };
}

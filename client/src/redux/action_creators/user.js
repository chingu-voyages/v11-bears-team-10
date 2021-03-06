import axios from "axios";

import setError from "./setError";

export function fetchUpdatedUser(id) {
  return (dispatch, getState) => {
    axios
      .get(`/users/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().authToken
        }
      })
      .then(response => {
				dispatch({
          type: "FETCH_USER",
          payload: response.data.user
        });
      })
      .catch(e => {
        if (!e.response)
          dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));
        else if (e.response.status !== 401)
          dispatch(setError({ statusCode: e.response.status }));
      });
  };
}
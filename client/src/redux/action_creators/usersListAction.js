import axios from 'axios'
import setError from "./setError";

export function fetshUsers(){
  return (dispatch, getState) =>{
    axios.get('/users', {
      headers: {
        Authorization: "Bearer " + getState().authToken
      }
    })
    .then(response => {
      dispatch({
        type: "SET_USERS",
        payload: response.data.users
      });
    }).catch(e => {
      if (!e.response)
        dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));
      else if (e.response.status !== 401)
        dispatch(setError({ statusCode: e.response.status }));
    });
  }
}
import axios from "axios";

import Validation from "../../validation";
import setError from "./setError";


export function createProject(data) {
  let title = data.title;
  let description = data.description;
  return (dispatch, getState) => {
    const validation = new Validation(data, {
      title: "min:4",
      description: "min:4"
    });
    validation.validate();
    axios
      .post(
        `/project/${data.userId}`,
        { title, description },
        {
          headers: {
            Authorization: "Bearer " + getState().authToken
          }
        }
      )
      .then(response => {
        dispatch({
          type: "ADD_PROJECT",
					payload: response.data
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

export function deleteProject(id) {
  return (dispatch, getState) => {
    axios
      .delete(`/project/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().authToken
        }
      })
      .then(response => {
        dispatch({
          type: "DELETE_PROJECT",
          payload: {
            payload: response.data,
            deleted: true
          }
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



export function updateProject(project, data) {
	let title = data.name;
  let description = data.description;
  return (dispatch, getState) => {
    axios
      .put(
        `/project/${data._id}`,
        { project, title, description },
        {
          headers: {
            Authorization: "Bearer " + getState().authToken
          }
        }
      )
      .then(response => {
        dispatch({
          type: "UPDATE_PROJECT",
          payload: response.data
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

import axios from "axios";

import Validation from "../../validation";
import setError from "./setError";

export function createProject(data) {
  let title = data.title;
  let description = data.description;
  return dispatch => {
    const validation = new Validation(data, {
      title: "min:4",
      description: "min:4"
    });
    validation.validate();
    axios
      .post(
        `/project/${data.userId}`,
        { title, description },
        { headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
					} 
				}
      )
			.then(response =>
				{
					dispatch({
						type: "ADD_PROJECT",
						payload: response.data
					})
				}
       
      )
      .catch(e => {
        if (!e.response)
          dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));
        else if (e.response.status !== 401)
          dispatch(setError({ statusCode: e.response.status }));
      });
  };
}



export function deleteProject(id){
	return dispatch => {
    axios
      .delete(
        `/project/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
					}
        }
      )
			.then(response =>
				{
					dispatch({
						type: "DELETE_PROJECT",
						payload: {
							data: response.data,
							isProjectDeleted: true
						}
					})
				}
       
      )
      .catch(e => {
        if (!e.response)
          dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));
        else if (e.response.status !== 401)
          dispatch(setError({ statusCode: e.response.status }));
      });
  };
}


export function getProject(id) {
  return dispatch => {
    axios
      .get(
        `/project/${id}`,
        { 
					headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
					} 
				}
      )
			.then(response =>
				{
					dispatch({
						type: "GET_PROJECT",
					})
					window.location=`/project/${id}`			
				}
      )
      .catch(e => {
        if (!e.response)
          dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));
        else if (e.response.status !== 401)
          dispatch(setError({ statusCode: e.response.status }));
      });
  };
}


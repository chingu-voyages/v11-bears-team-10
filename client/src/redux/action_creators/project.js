import axios from "axios";

import Validation from "../../validation";
import setToastError from "./setToastError";

export function createProject(project) {
	return (dispatch, getState) => {
		const validation = new Validation(project, {
			title: "min:1"
		});
		validation.validate();
		axios
			.post(`/project/${project.admin}`, project, {
				headers: {
					Authorization: "Bearer " + getState().authToken
				}
			})
			.then(response => {
				dispatch({
					type: "ADD_PROJECT",
					payload: response.data.project
				});
				dispatch({
					type: "UPDATE_USER",
					payload: { projectList: response.data.projectList }
				});
			})
			.catch(e => dispatch(setToastError(e)));
	};
}

export function getProject(id) {
	return (dispatch, getState) => {
		dispatch({ type: "SET_PROJECT", payload: null });
		axios
			.get(`/project/${id}`, {
				headers: {
					Authorization: "Bearer " + getState().authToken
				}
			})
			.then(response => {
				dispatch({ type: "SET_PROJECT", payload: response.data.project });
			})
			.catch(e => dispatch(setToastError(e)));
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
					payload: null
				});
				dispatch({
					type: "UPDATE_USER",
					payload: { projectList: response.data.projectList }
				});
			})
			.catch(e => dispatch(setToastError(e)));
	};
}

export function updateProject(project) {
	const { _id, ...update } = project;
	return (dispatch, getState) => {
		axios
			.put(`/project/${_id}`, update, {
				headers: {
					Authorization: "Bearer " + getState().authToken
				}
			})
			.then(response => {
				dispatch({
					type: "UPDATE_PROJECT",
					payload: response.data.project
				});
				dispatch({
					type: "UPDATE_USER",
					payload: { projectList: response.data.projectList }
				});
			})
			.catch(e => dispatch(setToastError(e)));
	};
}

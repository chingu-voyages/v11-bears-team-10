import React from "react";
import { Modal, Button, Form, Spinner, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Validation from "../../../validation";
import axios from "axios";

export default class AddTodoModal extends React.Component {
	constructor(props) {
		super(props);

		this.initialState = {
			submitting: false,
			show: false,
			usersList: [],
			assigned_user_search: "",
			assigned_users_suggestion: [],
			data: {
				title: "",
				description: "",
				date_due: "",
				assigned_users: []
			},
			validation: {
				title: [],
				date_due: []
			}
		};

		this.state = this.initialState;
	}

	componentDidMount() {
		axios.get("/users").then(r => this.setState({ usersList: r.data.users }));
	}

	show = () =>
		this.setState({
			show: true
		});

	close = () => this.setState({ show: false, submitting: false });

	afterClose = () =>
		this.setState(prevState => ({ ...this.initialState, usersList: prevState.usersList }));

	invalidate = (errors = {}) =>
		this.setState(({ validation }) => {
			return {
				submitting: false,
				validation: {
					...validation,
					...errors
				}
			};
		});

	onSubmit = () => {
		var validation = new Validation(this.state.data, {
			title: "required",
			date_due: "date"
		});
		validation.validate();

		if (validation.passes)
			this.setState(
				{ show: false, submitting: true },
				this.props.onSubmit.bind(null, this.state.data)
			);
		else this.invalidate(validation.errors);
	};

	onChange = ({ target: { id, value } }) =>
		this.setState(({ data, validation }) => ({
			data: { ...data, [id]: value },
			validation: {
				...validation,
				[id]: []
			}
		}));

	onChange_assigned_user_search = ({ target: { value } }) =>
		this.setState(prevState => ({
			assigned_user_search: value,
			assigned_users_suggestion: value
				? prevState.usersList.filter(user => user.username.includes(value))
				: []
		}));

	onFocus_assigned_user_search = () =>
		this.onChange_assigned_user_search({
			target: { value: this.state.assigned_user_search }
		});

	addAssignedUser = user =>
		this.setState(prevState => {
			// eslint-disable-next-line no-unused-vars
			for (let _user of prevState.data.assigned_users)
				if (_user.username === user.username) return null;

			return {
				data: {
					...prevState.data,
					assigned_users: [...prevState.data.assigned_users, user]
				}
			};
		});

	removeAssignedUser = user =>
		this.setState(prevState => ({
			data: {
				...prevState.data,
				assigned_users: prevState.data.assigned_users.filter(
					_user => _user.username !== user.username
				)
			}
		}));

	clearAssignedUsersSuggestion = () => this.setState({ assigned_users_suggestion: [] });

	render() {
		return (
			<>
				<Button onClick={this.show} className={this.props.className}>
					<FontAwesomeIcon icon="plus" className="mr-2" />
					add todo
				</Button>

				<Modal
					backdrop="static"
					show={this.state.show}
					onHide={this.close}
					onExited={this.afterClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add todo</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form id="add-todo-form">
							<Form.Group controlId="title">
								<Form.Label>Title</Form.Label>
								<Form.Control
									isInvalid={this.state.validation.title.length}
									onChange={this.onChange}
									value={this.state.data.title}
									placeholder="title"
								/>
								<Form.Control.Feedback type="invalid" as="ul">
									{this.state.validation.title.map(item => (
										<li key={item}>{item}</li>
									))}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group controlId="description">
								<Form.Label>Description</Form.Label>
								<Form.Control
									rows={5}
									onChange={this.onChange}
									value={this.state.data.description}
									as="textarea"
									placeholder="description"
								/>
							</Form.Group>

							<Form.Group controlId="date_due">
								<Form.Label>Due date</Form.Label>
								<Form.Control
									isInvalid={this.state.validation.date_due.length}
									onChange={this.onChange}
									value={this.state.data.date_due}
									placeholder="yyyy-mm-dd"
								/>
								<Form.Control.Feedback type="invalid" as="ul">
									{this.state.validation.date_due.map(item => (
										<li key={item}>{item}</li>
									))}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								controlId="assigned-users-search-bar"
								className="position-relative">
								<Form.Label>Assigned users</Form.Label>
								<Form.Control
									onBlur={this.clearAssignedUsersSuggestion}
									onFocus={this.onFocus_assigned_user_search}
									onChange={this.onChange_assigned_user_search}
									value={this.state.assigned_user_search}
									placeholder="type a name"
								/>
								<small className="text-muted my-2 px-2">only team members</small>
								{this.state.assigned_users_suggestion.length > 0 && (
									<ListGroup as="ul" id="assigned-user-suggestion-list">
										{this.state.assigned_users_suggestion.map(user => (
											<ListGroupItem
												key={"assigned-user-suggestion-" + user._id}
												onMouseDown={this.addAssignedUser.bind(this, user)}
												as="li">
												{user.username}
											</ListGroupItem>
										))}
									</ListGroup>
								)}
								{this.state.data.assigned_users.length > 0 && (
									<Row
										as="ul"
										noGutters
										id="assigned-users-list"
										className="p-0 mt-3">
										{this.state.data.assigned_users.map((user, index) => (
											<ListGroupItem
												as="li"
												key={"assigned-user-name-" + user._id}
												className="mr-2 mb-2">
												{user.username}
												<FontAwesomeIcon
													icon="times"
													className="times-red-circle ml-2 my-auto"
													onClick={this.removeAssignedUser.bind(
														this,
														user
													)}
												/>
											</ListGroupItem>
										))}
									</Row>
								)}
							</Form.Group>
						</Form>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={this.close}>
							Close
						</Button>
						<Button
							variant="primary"
							onClick={this.onSubmit}
							disabled={this.state.submitting}>
							{this.state.submitting ? (
								<Spinner
									className="mx-2"
									as="span"
									aria-hidden="true"
									animation="border"
									role="status"
									size="sm">
									<span className="sr-only">Submitting ...</span>
								</Spinner>
							) : (
								"Submit"
							)}
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

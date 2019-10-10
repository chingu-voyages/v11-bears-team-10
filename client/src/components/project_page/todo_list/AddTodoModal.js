import React from "react";
import { Modal, Button, Form, Spinner, ListGroupItem, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserSuggestionsFormGroup from "../../../reusable_components/UserSuggestionsFormGroup";
import Validation from "../../../validation";

export default class AddTodoModal extends React.Component {
	constructor(props) {
		super(props);

		this.initialState = {
			submitting: false,
			show: false,
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

	show = () =>
		this.setState({
			show: true
		});

	close = () => this.setState({ show: false, submitting: false });

	afterClose = () => this.setState(prevState => this.initialState);

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

	stopSpinner = () => this.setState({ submitting: false });

	onSubmit = () => {
		var rules = {
			title: "required"
		};

		if (this.state.data.date_due) rules.date_due = "date";

		var validation = new Validation(this.state.data, rules);
		validation.validate();

		if (validation.passes)
			this.setState({ submitting: true }, () =>
				this.props.onSubmit(this.state.data, this.close, this.stopSpinner)
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
								<Form.Label className="required">Title</Form.Label>
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

							{this.props.team.length ? (
								<UserSuggestionsFormGroup
									controlId="assigned-users-search-bar"
									label="Assigned users"
									placeholder="type a name"
									comment="only team members"
									usersToPickFrom={this.props.team}
									onSuggestionSelect={this.addAssignedUser}
									suggestionsGoingUp
								/>
							) : (
								<div className="text-muted">
									add team members to the project so you can assign them to the
									created todo
								</div>
							)}

							{this.state.data.assigned_users.length > 0 && (
								<Row
									as="ul"
									noGutters
									id="assigned-users-list"
									className="p-0 mt-3">
									{this.state.data.assigned_users.map(user => (
										<ListGroupItem
											as="li"
											key={"assigned-user-name-" + user.username}
											className="mr-2 mb-2">
											{user.username}
											<FontAwesomeIcon
												icon="times"
												className="times-red-circle ml-2 my-auto"
												onClick={this.removeAssignedUser.bind(this, user)}
											/>
										</ListGroupItem>
									))}
								</Row>
							)}
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

import React, { Component } from "react";
import { ListGroup, Row, Button, Spinner } from "react-bootstrap";
import TodoItem from "./TodoItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTodoModal from "./AddTodoModal";

function groupTodosByDateDue(todos) {
	if (!todos.length) return [];

	var without_date_due = [];
	var obj = {};

	// eslint-disable-next-line no-unused-vars
	for (let todo of todos) {
		if (!todo.title) continue;

		if (todo.date_due) {
			if (!obj[todo.date_due]) obj[todo.date_due] = [todo.date_due];
			obj[todo.date_due].push(todo);
		} else without_date_due.push(todo);
	}

	var _todos = Object.keys(obj)
		.sort()
		.map(key => obj[key]);

	if (without_date_due.length) _todos.unshift(without_date_due);
	return _todos;
}

export default class TodoList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			updatingProject: false
		};
	}

	stopSaveButtonSpinner = () => this.setState({ updatingProject: false });

	saveProject = () =>
		this.setState(
			{ updatingProject: true },
			this.props.updateProjectInDatabase(
				this.stopSaveButtonSpinner,
				this.stopSaveButtonSpinner
			)
		);

	render() {
		const { todos, team, removeTodo, addTodo, toggleTodoCompleted, admin_id } = this.props;
		return (
			<>
				<Row noGutters>
					<h1 className="section-title text-center my-auto mr-auto">Todo list</h1>
					<Button variant="success" className="mr-2" onClick={this.saveProject}>
						{this.state.updatingProject ? (
							<Spinner
								className="mx-2"
								as="span"
								aria-hidden="true"
								animation="border"
								role="status"
								size="sm">
								<span className="sr-only">Updating project ...</span>
							</Spinner>
						) : (
							<>
								<FontAwesomeIcon icon="save" className="mr-2" />
								save
							</>
						)}
					</Button>
					<AddTodoModal onSubmit={addTodo} team={team} admin_id={admin_id} />
				</Row>
				<hr className="w-100" />
				<ListGroup as="ul" className="py-2">
					{groupTodosByDateDue(todos).map(group =>
						group.map((elem, index) => {
							if (typeof elem === "string")
								return (
									<Row
										key={elem}
										noGutters
										className="text-muted my-4 mx-xl-4 mx-lg-3">
										Due {elem.substring(0, 10)}
										<hr className="ml-4 flex-fill" />
									</Row>
								);

							return (
								<TodoItem
									key={elem._id}
									className={
										(index !== group.length - 1 ? "mb-4 " : "") +
										"mx-auto rounded"
									}
									todo={elem}
									removeTodo={removeTodo}
									toggleTodoCompleted={toggleTodoCompleted}
								/>
							);
						})
					)}
				</ListGroup>
			</>
		);
	}
}

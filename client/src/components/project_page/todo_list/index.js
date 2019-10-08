import React from "react";
import { ListGroup, Row, Button } from "react-bootstrap";
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

export default function TodoList({ todos, removeTodo, addTodo, toggleTodoCompleted }) {
	return (
		<section className="px-3 pt-3 pb-4 bg-white flex-fill">
			<Row noGutters>
				<h1 className="section-title text-center my-auto mr-auto">Todo list</h1>
				<Button variant="success" className="mr-2">
					<FontAwesomeIcon icon="save" className="mr-2" />
					save
				</Button>
				<AddTodoModal onSubmit={addTodo} />
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
								className={(index > 1 ? "mt-4 " : "") + "mx-auto rounded"}
								todo={elem}
								removeTodo={removeTodo}
								toggleTodoCompleted={toggleTodoCompleted}
							/>
						);
					})
				)}
			</ListGroup>
		</section>
	);
}

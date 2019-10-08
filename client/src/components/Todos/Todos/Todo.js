import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

function Todo({ todo }) {
	return (
		<Link to={`/todo/${todo._id}`}>
			<section
				className="d-flex flex-row todo-body"
				data-aos="fade-up"
				//  onClick={history.push(`/todo/${todo._id}`)}
			>
				<div className="projects-summary d-flex flex-col project-list">
					<span className="d-flex flex-row">
						<span className="d-flex flex-col">
							<h3>{todo.title}</h3>
							<span className="date">{todo.date_create}</span>
						</span>

						<div className="flex-row-centered">
							<FontAwesomeIcon icon="tasks" className="todo-icon" />
							<span>{todo.completed && "completed"}</span>
						</div>
					</span>
					<hr />
				</div>
			</section>
		</Link>
	);
}

export default Todo;

import React from "react";
import { ListGroupItem, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../../../reusable_components/Avatar";
import TodoCheckBox from "./TodoCheckBox";

export default function TodoItem({
	className,
	todo,
	todo: { _id, assigned_users },
	removeTodo,
	toggleTodoCompleted
}) {
	var filtered_assigned_users = assigned_users.filter(user => !!user.username);

	return (
		<ListGroupItem as="li" className={className}>
			<Row noGutters className="flex-wrap-reverse">
				<Col>
					<TodoCheckBox
						todo={todo}
						onChange={toggleTodoCompleted.bind(null, _id)}
						className="mr-2 my-0"
					/>
				</Col>
				<FontAwesomeIcon
					icon="times"
					title="delete"
					className="times-red-circle mt-1 mb-auto"
					onClick={removeTodo.bind(null, _id)}
				/>
			</Row>
			{!!filtered_assigned_users.length && (
				<>
					<hr className="my-2" />
					<Row noGutters>
						<span className="mr-2 my-auto">assigned to :</span>
						{filtered_assigned_users.map(user => (
							<Avatar
								key={"avatar-todo-" + user._id}
								withTooltip
								withBorder
								sm
								username={user.username}
								className="bottom-shadow"
								pullRight
							/>
						))}
					</Row>
				</>
			)}
		</ListGroupItem>
	);
}

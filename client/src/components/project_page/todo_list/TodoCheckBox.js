import React from "react";
import { FormCheck, FormGroup, OverlayTrigger, Popover } from "react-bootstrap";

export default function TodoCheckBox({
	className,
	todo: { completed, description, title, _id },
	onChange
}) {
	var _checkbox = (
		<FormGroup className={className}>
			<FormCheck
				custom
				type="checkbox"
				id={"checkbox-todo-" + _id}
				label={title}
				className={completed && "line-through-primary"}
				onChange={onChange}
				checked={completed}
			/>
		</FormGroup>
	);

	if (!description) return _checkbox;

	return (
		<OverlayTrigger
			delay={{ show: 500 }}
			overlay={
				<Popover content id="tooltip-todo">
					<p className="mb-1">{description}</p>
					<div className="text-muted text-right">
						{completed ? "completed" : "not completed"}
					</div>
				</Popover>
			}>
			{_checkbox}
		</OverlayTrigger>
	);
}

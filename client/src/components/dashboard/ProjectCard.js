import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function onClick(history, project_id) {
	history.push("/project/" + project_id);
}

function ProjectCard({ project, history }) {
	return (
		<div
			onClick={onClick.bind(null, history, project._id)}
			className="project-card border border-secondary rounded p-3"
			data-aos="fade-down">
			<h2 className="text-center text-truncate mb-3">{project.title}</h2>
			<Row noGutters>
				<Col xs={12} xl={6} className="text-center mb-3">
					<small className="text-muted">
						<span>created at : </span>
						{project.date_create.substring(0, 10)}
					</small>
				</Col>
				<Col xs={12} xl={6} className="text-right">
					<i className="mr-4">
						<FontAwesomeIcon icon="users" id="team-members" />
						<span>{project.team.length}</span>
					</i>
					<i className="mr-4">
						<FontAwesomeIcon icon="comments" id="messages" />
						<span>{project.message_board.length}</span>
					</i>
					<i>
						<FontAwesomeIcon icon="clipboard-list" id="todos" />
						<span>{project.todos.length}</span>
					</i>
				</Col>
			</Row>
		</div>
	);
}

export default withRouter(ProjectCard);
